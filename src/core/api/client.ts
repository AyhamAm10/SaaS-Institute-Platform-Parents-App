import { create, isAxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, USE_MOCK } from './config';
import { mockAdapter } from './mock/adapter';
import { createRefresher } from './refresh';
import type { AuthTokens } from './types';
import { clearTokens, currentTokens, saveTokens } from '@/core/storage/tokens';

export const api = create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { 'X-Client-Type': 'mobile' },
  ...(USE_MOCK ? { adapter: mockAdapter } : {}),
});

type Retriable = InternalAxiosRequestConfig & { _retried?: boolean };

let onAuthFailure: () => void = () => undefined;
/** The session store registers what happens when refresh fails (logout). */
export function setAuthFailureHandler(handler: () => void): void {
  onAuthFailure = handler;
}

const isAuthUrl = (url?: string) => !!url && /\/auth\/(login|refresh)/.test(url);

const refreshAccessToken = createRefresher({
  getTokens: currentTokens,
  requestRefresh: async (refreshToken) => {
    const res = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    return { accessToken: res.data.accessToken, refreshToken: res.data.refreshToken };
  },
  saveTokens,
  onFailure: async () => {
    await clearTokens();
    onAuthFailure();
  },
});

api.interceptors.request.use((config) => {
  const tokens = currentTokens();
  if (tokens && !isAuthUrl(config.url)) config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  config.headers['Accept-Language'] = 'ar'; // the backend localizes error messages from this header
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || !error.config) throw error;
    const config = error.config as Retriable;
    if (error.response?.status !== 401 || config._retried || isAuthUrl(config.url)) throw error;
    config._retried = true;
    const token = await refreshAccessToken();
    if (!token) throw error;
    config.headers.Authorization = `Bearer ${token}`;
    return api(config as AxiosRequestConfig);
  },
);

export async function get<T>(url: string, params?: Record<string, string>): Promise<T> {
  const res = await api.get<T>(url, { params });
  return res.data;
}
