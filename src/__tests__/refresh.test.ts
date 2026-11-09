import { createRefresher } from '@/core/api/refresh';
import type { AuthTokens } from '@/core/api/types';

const tokens: AuthTokens = { accessToken: 'a1', refreshToken: 'r1' };

function setup(requestRefresh: (rt: string) => Promise<AuthTokens>, initial: AuthTokens | null = tokens) {
  const saved: AuthTokens[] = [];
  const onFailure = jest.fn();
  const refresh = createRefresher({
    getTokens: () => initial,
    requestRefresh,
    saveTokens: async (t) => { saved.push(t); },
    onFailure,
  });
  return { refresh, saved, onFailure };
}

describe('single-flight token refresh', () => {
  it('shares one refresh call between concurrent 401s and stores the rotated pair', async () => {
    const request = jest.fn(async () => ({ accessToken: 'a2', refreshToken: 'r2' }));
    const { refresh, saved, onFailure } = setup(request);
    const results = await Promise.all([refresh(), refresh(), refresh()]);
    expect(results).toEqual(['a2', 'a2', 'a2']);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith('r1');
    expect(saved).toEqual([{ accessToken: 'a2', refreshToken: 'r2' }]);
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('logs out (onFailure) when the refresh is rejected', async () => {
    const { refresh, saved, onFailure } = setup(async () => { throw new Error('401'); });
    expect(await refresh()).toBeNull();
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(saved).toHaveLength(0);
  });

  it('logs out when there are no stored tokens', async () => {
    const request = jest.fn();
    const { refresh, onFailure } = setup(request, null);
    expect(await refresh()).toBeNull();
    expect(request).not.toHaveBeenCalled();
    expect(onFailure).toHaveBeenCalledTimes(1);
  });

  it('allows a new refresh after the previous one settled', async () => {
    const request = jest.fn(async () => ({ accessToken: 'a2', refreshToken: 'r2' }));
    const { refresh } = setup(request);
    await refresh();
    await refresh();
    expect(request).toHaveBeenCalledTimes(2);
  });
});
