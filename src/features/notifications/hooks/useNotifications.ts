import { useMemo } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/core/auth/store';
import { fetchInbox, fetchUnreadCount, markNotificationsRead } from '../api/notifications.api';
import { toItem } from '../utils/group';

export const NOTIFICATIONS_KEY = ['notifications'] as const;

/** The unread badge (header bell): refreshed every minute and on every push. */
export function useUnreadCount(): number {
  const signedIn = useSession((s) => s.status === 'signedIn');
  const { data } = useQuery({
    queryKey: [...NOTIFICATIONS_KEY, 'unread'],
    queryFn: fetchUnreadCount,
    enabled: signedIn,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    staleTime: 15_000,
  });
  return data?.unread ?? 0;
}

/** The inbox, newest first, loaded page by page. */
export function useNotifications() {
  const client = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: [...NOTIFICATIONS_KEY, 'inbox'],
    queryFn: ({ pageParam }) => fetchInbox(pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
  const items = useMemo(() => (query.data?.pages ?? []).flatMap((p) => p.data.map(toItem)), [query.data]);
  const unreadCount = query.data?.pages[0]?.unread ?? 0;

  const mark = useMutation({
    mutationFn: markNotificationsRead,
    onSettled: () => client.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
  });

  return {
    query,
    items,
    unreadCount,
    markRead: (id: number) => mark.mutate(id),
    markAllRead: () => mark.mutate(undefined),
  };
}
