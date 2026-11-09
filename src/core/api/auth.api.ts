import { api, get } from './client';
import type { LoginInput, LoginResponse, MobileMe } from './types';

export async function login(input: LoginInput): Promise<LoginResponse> {
  const code = input.instituteCode?.trim();
  const body = {
    phone: input.phone.trim(),
    password: input.password,
    ...(code ? { instituteCode: code } : {}),
  };
  const res = await api.post<LoginResponse>('/auth/login', body);
  return res.data;
}

export async function logoutRequest(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch {
    /* local logout proceeds regardless */
  }
}

export const fetchMe = () => get<MobileMe>('/mobile/me');
