import { daysFromToday } from '@/core/api/mock/dates';
import type { NotificationItem } from '../types';

/**
 * PLACEHOLDER DATA: there is no notifications backend and no push yet.
 * Replace the body of `useNotifications` with a real query and delete this file.
 */
export function placeholderNotifications(): NotificationItem[] {
  return [
    { id: 'n1', type: 'absence', title: 'غياب اليوم', body: 'تم تسجيل غياب الطالب عن الدوام اليوم.', date: daysFromToday(0), time: '09:10', read: false },
    { id: 'n2', type: 'mark', title: 'علامة جديدة', body: 'صدرت علامة مذاكرة الرياضيات: 46 من 50.', date: daysFromToday(0), time: '08:05', read: false },
    { id: 'n3', type: 'exam', title: 'مذاكرة غداً', body: 'مذاكرة الكيمياء غداً الساعة 10:00.', date: daysFromToday(-1), time: '18:30', read: false },
    { id: 'n4', type: 'late', title: 'تأخر عن الدوام', body: 'وصل الطالب بعد بدء الحصة الأولى (08:25).', date: daysFromToday(-1), time: '08:30', read: true },
    { id: 'n5', type: 'payment', title: 'تم استلام دفعة', body: 'استلمنا دفعة بقيمة 1,000,000 ل.س، إيصال 412.', date: daysFromToday(-3), time: '12:15', read: true },
    { id: 'n6', type: 'installment', title: 'قسط مستحق قريباً', body: 'يستحق القسط الرابع بعد 9 أيام.', date: daysFromToday(-3), time: '10:00', read: true },
    { id: 'n7', type: 'announcement', title: 'إعلان من المعهد', body: 'الدوام يوم الخميس القادم حتى الساعة 12:00 بسبب اجتماع الأهالي.', date: daysFromToday(-6), time: '14:00', read: true },
  ];
}
