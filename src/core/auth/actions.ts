import { fetchMe, login, logoutRequest } from '@/core/api/auth.api';
import { setAuthFailureHandler } from '@/core/api/client';
import type { LoginInput } from '@/core/api/types';
import { queryClient } from '@/core/api/query-client';
import { loadSelectedChildId, saveSelectedChildId } from '@/core/storage/preferences';
import { clearTokens, loadTokens, saveTokens } from '@/core/storage/tokens';
import { useSession } from './store';

async function loadProfile(): Promise<void> {
  const me = await fetchMe();
  const preferred = await loadSelectedChildId();
  useSession.getState().setSignedIn(me, preferred);
}

/** App start: restore a stored session (splash is shown while status === 'restoring'). */
export async function restoreSession(): Promise<void> {
  setAuthFailureHandler(() => {
    queryClient.clear();
    useSession.getState().setSignedOut();
  });
  const tokens = await loadTokens();
  if (!tokens) {
    useSession.getState().setSignedOut();
    return;
  }
  try {
    await loadProfile();
  } catch {
    // 401 already handled by the interceptor (refresh once, then logout); other errors: stay signed out.
    if (useSession.getState().status !== 'signedIn') useSession.getState().setSignedOut();
  }
}

/** Throws the axios error on failure so the login form can show a message. */
export async function signIn(input: LoginInput): Promise<void> {
  const res = await login(input);
  await saveTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
  try {
    await loadProfile();
  } catch (error) {
    await clearTokens();
    throw error;
  }
}

export async function signOut(): Promise<void> {
  await logoutRequest();
  await clearTokens();
  queryClient.clear();
  useSession.getState().setSignedOut();
}

export function selectChild(id: number): void {
  useSession.getState().setSelectedChild(id);
  void saveSelectedChildId(id);
}
