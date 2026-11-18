import type { FamilyNote } from '../types';
import { daysFromToday } from './dates';

export function notesFor(): FamilyNote[] {
  return [
    { id: 2, body: 'نرجو الانتباه إلى انتظام الطالب في الحضور هذا الأسبوع، وسنتواصل معكم عند الحاجة.', createdAt: `${daysFromToday(-1)}T09:30:00.000Z`, author: 'الإدارة' },
    { id: 1, body: 'تم تسليم كتاب الرياضيات للطالب. يرجى المحافظة عليه.', createdAt: `${daysFromToday(-9)}T11:00:00.000Z`, author: 'الإدارة' },
  ];
}
