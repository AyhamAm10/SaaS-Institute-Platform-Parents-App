import type { ServerNotification } from '@/core/api/types';
import { nowHm, toYmd } from '@/core/format/date';
import type { NotificationGroup, NotificationItem } from '../types';

/** Screens this app has; a push about anything else opens the inbox. */
const APP_PATHS = ['/attendance', '/finance', '/marks', '/timetable', '/notes', '/notifications'];

export function toItem(n: ServerNotification): NotificationItem {
  const at = new Date(n.createdAt);
  const path = typeof n.data?.path === 'string' && APP_PATHS.includes(n.data.path) ? n.data.path : null;
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    date: toYmd(at),
    time: nowHm(at),
    read: n.read,
    path,
    studentId: n.studentId,
  };
}

/** Groups by date (newest day first, newest item first inside a day). */
export function groupByDay(items: NotificationItem[]): NotificationGroup[] {
  const map = new Map<string, NotificationItem[]>();
  for (const item of items) map.set(item.date, [...(map.get(item.date) ?? []), item]);
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, list]) => ({ date, items: [...list].sort((a, b) => b.time.localeCompare(a.time) || b.id - a.id) }));
}
