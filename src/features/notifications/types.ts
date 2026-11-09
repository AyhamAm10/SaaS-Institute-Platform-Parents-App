export type NotificationType =
  | 'absence' | 'late' | 'mark' | 'payment' | 'installment' | 'exam' | 'announcement';

/** Shape the future backend/push feed should return. */
export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm */
  time: string;
  read: boolean;
}

export interface NotificationGroup { date: string; items: NotificationItem[] }
