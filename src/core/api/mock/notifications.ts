import type { NotificationCategory, ServerNotification } from '../types';

const at = (daysAgo: number, hm: string) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const [h, m] = hm.split(':').map(Number);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const n = (
  id: number, type: ServerNotification['type'], title: string, body: string, path: string, when: string, read = false,
): ServerNotification => ({ id, type, title, body, data: { type, path, studentId: 11 }, studentId: 11, read, createdAt: when });

/** Mock inbox (both roles), newest first; read state and switches live in memory. */
const inbox: ServerNotification[] = [
  n(7, 'ATTENDANCE_ARRIVAL', 'وصل أحمد إلى المعهد', 'سُجّل الحضور الساعة 07:58', '/attendance', at(0, '07:58')),
  n(6, 'EXAM_RESULT', 'صدرت علامة الرياضيات', 'أحمد: 46 من 50 في المذاكرة الأولى', '/marks', at(0, '13:10')),
  n(5, 'EXAM_SCHEDULED', 'مذاكرة جديدة: الكيمياء', 'المذاكرة الثانية يوم 2026/11/20 - أحمد', '/marks', at(1, '18:30')),
  n(4, 'ATTENDANCE_LATE', 'أحمد متأخر اليوم', 'وصل إلى المعهد الساعة 08:25', '/attendance', at(1, '08:25'), true),
  n(3, 'PAYMENT_RECEIVED', 'تم استلام دفعة', 'إيصال رقم 412: 1,000,000 ل.س عن أحمد', '/finance', at(3, '12:15'), true),
  n(2, 'STUDENT_NOTE', 'ملاحظة من الإدارة', 'أحمد: نرجو الانتباه إلى انتظام الحضور هذا الأسبوع', '/notes', at(4, '10:00'), true),
  n(1, 'CLOSURE', 'عطلة: اجتماع الأهالي', 'يوم 2026/11/27', '/notifications', at(6, '14:00'), true),
];
let disabled: NotificationCategory[] = [];

const CATEGORIES: NotificationCategory[] = ['ATTENDANCE', 'FINANCE', 'STUDY', 'NOTES', 'GENERAL'];
const settings = () => ({ categories: CATEGORIES.map((key) => ({ key, enabled: !disabled.includes(key) })) });

/** Handles /notifications/* in mock mode (null = not a notifications route). */
export function notificationsRoute(url: string, method: string, body: Record<string, unknown>): unknown {
  if (!url.includes('/notifications')) return null;
  if (url.endsWith('/unread-count')) return { unread: inbox.filter((x) => !x.read).length };
  if (url.endsWith('/read-all')) {
    inbox.forEach((x) => { x.read = true; });
    return { updated: inbox.length };
  }
  const one = url.match(/\/notifications\/(\d+)\/read$/);
  if (one) {
    inbox.forEach((x) => { if (x.id === Number(one[1])) x.read = true; });
    return { updated: 1 };
  }
  if (url.endsWith('/devices')) return method === 'delete' ? { removed: 1 } : { registered: true };
  if (url.endsWith('/settings')) {
    if (method === 'put') disabled = (body.disabledCategories as NotificationCategory[]) ?? [];
    return settings();
  }
  return { data: inbox, total: inbox.length, unread: inbox.filter((x) => !x.read).length, page: 1, limit: 30, totalPages: 1 };
}
