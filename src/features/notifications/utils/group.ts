import type { NotificationGroup, NotificationItem } from '../types';

/** Groups by date (newest day first, newest item first inside a day). */
export function groupByDay(items: NotificationItem[]): NotificationGroup[] {
  const map = new Map<string, NotificationItem[]>();
  for (const item of items) map.set(item.date, [...(map.get(item.date) ?? []), item]);
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, list]) => ({ date, items: [...list].sort((a, b) => b.time.localeCompare(a.time)) }));
}
