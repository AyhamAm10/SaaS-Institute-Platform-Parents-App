import { pickChildId } from '@/core/auth/store-logic';
import { loginSchema, normalizeDigits } from '@/features/auth/utils/schema';
import { buildStatement } from '@/features/finance/utils/statement';
import { attendanceShares, nextLesson, trendValues } from '@/features/home/utils/home';
import { whatsappNumber } from '@/features/more/utils/contact-format';
import { groupByDay } from '@/features/notifications/utils/group';
import { isCurrentSlot, slotsFor } from '@/features/timetable/utils/slots';
import { financeFor } from '@/core/api/mock/finance';
import { toArabicMessage } from '@/core/api/errors';
import { AxiosError, type AxiosResponse } from 'axios';

describe('login schema', () => {
  it('normalizes Arabic digits', () => {
    expect(normalizeDigits('٠٩١١١١١١١١')).toBe('0911111111');
  });
  it('requires phone and password, and the code only when needed', async () => {
    await expect(loginSchema(false).validate({ phone: '', password: '' }, { abortEarly: false })).rejects.toBeTruthy();
    await expect(loginSchema(false).validate({ phone: '0911111111', password: 'x' })).resolves.toBeTruthy();
    await expect(loginSchema(true).validate({ phone: '0911111111', password: 'x', instituteCode: '' })).rejects.toBeTruthy();
    await expect(loginSchema(true).validate({ phone: '0911111111', password: 'x', instituteCode: 'ABC' })).resolves.toBeTruthy();
  });
});

describe('session helpers', () => {
  const kids = [{ id: 1 }, { id: 2 }] as never[];
  it('keeps the remembered child or falls back to the first', () => {
    expect(pickChildId(kids, 2)).toBe(2);
    expect(pickChildId(kids, 9)).toBe(1);
    expect(pickChildId([], null)).toBeNull();
  });
});

describe('home utils', () => {
  const lessons = [
    { id: 2, subject: 'ب', startTime: '10:00', endTime: '10:45', room: null, teacher: null },
    { id: 1, subject: 'أ', startTime: '08:00', endTime: '08:45', room: null, teacher: null },
  ];
  it('finds the next or ongoing lesson', () => {
    expect(nextLesson(lessons, '07:00')?.lesson.id).toBe(1);
    expect(nextLesson(lessons, '08:10')).toMatchObject({ ongoing: true });
    expect(nextLesson(lessons, '09:00')?.lesson.id).toBe(2);
    expect(nextLesson(lessons, '12:00')).toBeNull();
  });
  it('computes shares and trend order', () => {
    const s = attendanceShares({ present: 6, late: 2, absent: 1, excused: 1, ratePercent: 80 });
    expect(s[0].percent).toBe(60);
    expect(attendanceShares({ present: 0, late: 0, absent: 0, excused: 0, ratePercent: null })[0].percent).toBe(0);
    expect(trendValues([{ percent: 90 }, { percent: 80 }])).toEqual([80, 90]);
  });
});

describe('timetable, notifications, contacts', () => {
  it('sorts slots and detects current', () => {
    const tt = { days: [{ weekday: 'SUNDAY' as const, slots: [
      { startTime: '10:00', endTime: '11:00', subject: 'x', teacher: null, room: null },
      { startTime: '08:00', endTime: '09:00', subject: 'y', teacher: null, room: null }] }] };
    expect(slotsFor(tt, 'SUNDAY')[0].startTime).toBe('08:00');
    expect(slotsFor(tt, 'MONDAY')).toEqual([]);
    expect(isCurrentSlot(tt.days[0].slots[1], '08:30')).toBe(true);
    expect(isCurrentSlot(tt.days[0].slots[1], '09:00')).toBe(false);
  });
  it('groups notifications newest day first', () => {
    const mk = (id: string, date: string, time: string) => ({ id, type: 'mark' as const, title: '', body: '', date, time, read: false });
    const g = groupByDay([mk('a', '2026-11-01', '09:00'), mk('b', '2026-11-02', '08:00'), mk('c', '2026-11-02', '10:00')]);
    expect(g.map((x) => x.date)).toEqual(['2026-11-02', '2026-11-01']);
    expect(g[0].items.map((i) => i.id)).toEqual(['c', 'b']);
  });
  it('converts Syrian numbers for WhatsApp', () => {
    expect(whatsappNumber('0933 445 566')).toBe('963933445566');
    expect(whatsappNumber('+963933445566')).toBe('963933445566');
  });
});

describe('finance statement', () => {
  it('lists currencies separately and skips cancelled payments', () => {
    const text = buildStatement('سارة', 'معهد', financeFor(), '2026-11-08');
    expect(text).toContain('SYP');
    expect(text).toContain('USD');
    expect(text).toContain('412');
    expect(text).not.toContain('350');
  });
});

describe('error messages', () => {
  const err = (status: number, message: string) =>
    new AxiosError('x', String(status), undefined, null, { status, data: { message } } as AxiosResponse);
  it('maps known codes and statuses to Arabic', () => {
    expect(toArabicMessage(err(401, 'invalid_credentials'))).toContain('غير صحيحة');
    expect(toArabicMessage(err(400, 'رسالة من الخادم'))).toBe('رسالة من الخادم');
    expect(toArabicMessage(err(500, 'Internal'))).toContain('الخادم');
    expect(toArabicMessage(new Error('boom'))).toContain('خطأ');
  });
});
