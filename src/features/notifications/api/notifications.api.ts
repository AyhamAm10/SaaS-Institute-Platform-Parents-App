import { api, get } from '@/core/api/client';
import type { NotificationCategory, NotificationSettings, NotificationsPage } from '@/core/api/types';

export const PAGE_SIZE = 30;

export const fetchInbox = (page: number) =>
  get<NotificationsPage>('/notifications', { page: String(page), limit: String(PAGE_SIZE) });

export const fetchUnreadCount = () => get<{ unread: number }>('/notifications/unread-count');

/** Without an id: every notification of the user. */
export async function markNotificationsRead(id?: number): Promise<void> {
  await api.post(id ? `/notifications/${id}/read` : '/notifications/read-all');
}

export const fetchNotificationSettings = () => get<NotificationSettings>('/notifications/settings');

export async function saveNotificationSettings(disabledCategories: NotificationCategory[]): Promise<NotificationSettings> {
  const res = await api.put<NotificationSettings>('/notifications/settings', { disabledCategories });
  return res.data;
}
