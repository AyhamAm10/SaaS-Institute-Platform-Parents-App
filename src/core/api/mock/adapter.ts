import { AxiosError, type AxiosAdapter, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { attendanceFor } from './attendance';
import { monthKey } from './dates';
import { notesFor } from './notes';
import { notificationsRoute } from './notifications';
import { financeFor } from './finance';
import { familyMe, studentMe } from './me';
import { overviewFor } from './overview';
import { profileFor } from './profile';
import { resultsFor } from './results';
import { timetableFor } from './timetable';

type Config = InternalAxiosRequestConfig;
type MockRole = 'FAMILY' | 'STUDENT';

/** Dev-only fake backend. Tokens encode the role: mock-access-FAMILY / mock-access-STUDENT. */
const fail = (config: Config, status: number, message: string) =>
  Promise.reject(
    new AxiosError(message, String(status), config, null, {
      status, statusText: message, headers: {}, config, data: { statusCode: status, message },
    } as AxiosResponse),
  );

const ok = <T>(config: Config, data: T): Promise<AxiosResponse<T>> =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data, status: 200, statusText: 'OK', headers: {}, config }), 350),
  );

function roleOf(config: Config): MockRole | null {
  const auth = String(config.headers?.Authorization ?? '');
  if (auth.endsWith('FAMILY')) return 'FAMILY';
  if (auth.endsWith('STUDENT')) return 'STUDENT';
  return null;
}

const tokensFor = (role: MockRole) => ({ accessToken: `mock-access-${role}`, refreshToken: `mock-refresh-${role}` });

/** Demo account 0911111112 (family) starts on the default password (12345678) and must change it. */
let forced = false;

function authRoute(url: string, body: Record<string, unknown>, config: Config) {
  if (url.endsWith('/auth/login')) {
    const isForced = body.phone === '0911111112';
    const role: MockRole | null = body.phone === '0911111111' || isForced ? 'FAMILY' : body.phone === '0922222222' ? 'STUDENT' : null;
    if (!role || !body.password) return fail(config, 401, 'invalid_credentials');
    forced = isForced;
    return ok(config, { ...tokensFor(role), user: { id: 1, role, mustChangePassword: isForced } });
  }
  if (url.endsWith('/auth/me')) return ok(config, { mustChangePassword: forced });
  if (url.endsWith('/auth/change-password')) {
    if (body.currentPassword !== '12345678') return fail(config, 401, 'current_password_wrong');
    forced = false;
    return ok(config, { ...tokensFor('FAMILY'), user: { id: 1, role: 'FAMILY', mustChangePassword: false } });
  }
  if (url.endsWith('/auth/refresh')) {
    const role = String(body.refreshToken ?? '').replace('mock-refresh-', '');
    return role === 'FAMILY' || role === 'STUDENT' ? ok(config, tokensFor(role)) : fail(config, 401, 'token_invalid');
  }
  return ok(config, {});
}

export const mockAdapter: AxiosAdapter = async (config) => {
  const url = config.url ?? '';
  const body = (typeof config.data === 'string' ? JSON.parse(config.data) : (config.data ?? {})) as Record<string, unknown>;
  if (url.includes('/auth/')) return authRoute(url, body, config);

  const role = roleOf(config);
  if (!role) return fail(config, 401, 'unauthorized');
  if (forced) return fail(config, 403, 'password_change_required');
  if (url.endsWith('/mobile/me')) return ok(config, role === 'FAMILY' ? familyMe : studentMe);
  const inbox = notificationsRoute(url, config.method ?? 'get', body);
  if (inbox !== null) return ok(config, inbox);

  const match = url.match(/\/mobile\/students\/(\d+)\/(\w+)/);
  if (!match) return fail(config, 404, 'not found');
  const id = Number(match[1]);
  if (!(role === 'FAMILY' ? [11, 12] : [11]).includes(id)) return fail(config, 404, 'Student not found');

  switch (match[2]) {
    case 'overview': return ok(config, overviewFor(id, role === 'FAMILY'));
    case 'attendance': return ok(config, attendanceFor(id, String(config.params?.month ?? monthKey())));
    case 'timetable': return ok(config, timetableFor());
    case 'results': return ok(config, resultsFor());
    case 'profile': return ok(config, profileFor(id, role === 'FAMILY'));
    case 'notes': return role === 'FAMILY' ? ok(config, notesFor()) : fail(config, 403, 'forbidden');
    case 'finance': return role === 'FAMILY' ? ok(config, financeFor()) : fail(config, 403, 'forbidden');
    default: return fail(config, 404, 'not found');
  }
};
