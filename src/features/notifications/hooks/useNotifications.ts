import { useMemo } from 'react';
import { create } from 'zustand';
import { placeholderNotifications } from '../static-data/notifications.placeholder';
import type { NotificationItem } from '../types';

interface ReadState { readIds: string[]; markAllRead: (ids: string[]) => void; markRead: (id: string) => void }

const useReadState = create<ReadState>((set) => ({
  readIds: [],
  markAllRead: (ids) => set((s) => ({ readIds: [...new Set([...s.readIds, ...ids])] })),
  markRead: (id) => set((s) => ({ readIds: s.readIds.includes(id) ? s.readIds : [...s.readIds, id] })),
}));

const SOURCE = placeholderNotifications();

/**
 * The single entry point for notifications. Today it returns static placeholder data
 * (local read state only); wire the backend by replacing SOURCE with a query result.
 */
export function useNotifications() {
  const readIds = useReadState((s) => s.readIds);
  const { markAllRead, markRead } = useReadState.getState();
  const items: NotificationItem[] = useMemo(
    () => SOURCE.map((n) => ({ ...n, read: n.read || readIds.includes(n.id) })),
    [readIds],
  );
  const unreadCount = items.filter((n) => !n.read).length;
  return {
    items,
    unreadCount,
    isLoading: false,
    markRead,
    markAllRead: () => markAllRead(items.map((n) => n.id)),
  };
}
