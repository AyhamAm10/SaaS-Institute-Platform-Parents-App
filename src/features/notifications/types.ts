import type { ServerNotificationType } from '@/core/api/types';

/** An inbox row ready for the screen (local date and time of the device). */
export interface NotificationItem {
  id: number;
  type: ServerNotificationType;
  title: string;
  body: string;
  /** YYYY-MM-DD (local). */
  date: string;
  /** HH:mm (local). */
  time: string;
  read: boolean;
  /** App screen to open, e.g. `/attendance`. */
  path: string | null;
  studentId: number | null;
}

export interface NotificationGroup { date: string; items: NotificationItem[] }
