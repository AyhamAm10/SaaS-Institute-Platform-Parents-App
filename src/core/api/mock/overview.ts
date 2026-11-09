import type { Overview } from '../types';
import { daysFromToday } from './dates';

export function overviewFor(studentId: number, withFinance: boolean): Overview {
  const sara = studentId === 11;
  return {
    student: {
      id: studentId,
      fullName: sara ? 'سارة أحمد الخطيب' : 'عمر أحمد الخطيب',
      section: { id: sara ? 1 : 2, name: sara ? 'التاسع - أ' : 'الخامس - ب' },
      branch: { id: 1, name: 'فرع المزة' },
    },
    today: {
      date: daysFromToday(0),
      isWorkingDay: true,
      attendance: sara
        ? { status: 'PRESENT', checkInAt: '07:52', checkOutAt: '13:40' }
        : { status: 'LATE', checkInAt: '08:25', checkOutAt: null },
      lessons: [
        { id: 1, subject: 'الرياضيات', startTime: '08:00', endTime: '08:45', room: 'قاعة 3', teacher: 'أ. هالة منصور' },
        { id: 2, subject: 'اللغة العربية', startTime: '08:50', endTime: '09:35', room: 'قاعة 3', teacher: 'أ. خالد سليمان' },
        { id: 3, subject: 'الفيزياء', startTime: '10:00', endTime: '10:45', room: 'مخبر 1', teacher: 'أ. ريم حداد' },
        { id: 4, subject: 'اللغة الإنكليزية', startTime: '11:00', endTime: '11:45', room: 'قاعة 3', teacher: 'أ. سامر ناصر' },
        { id: 5, subject: 'الكيمياء', startTime: '12:00', endTime: '12:45', room: 'مخبر 2', teacher: 'أ. ليلى عباس' },
      ],
    },
    attendance30d: sara
      ? { present: 21, late: 2, absent: 1, excused: 1, ratePercent: 92 }
      : { present: 17, late: 4, absent: 3, excused: 1, ratePercent: 84 },
    marks: {
      averagePercent: sara ? 86 : 74,
      latest: [
        { examId: 1, subject: 'الرياضيات', title: 'مذاكرة الفصل الأول', date: daysFromToday(-3), score: 46, max: 50, percent: 92 },
        { examId: 2, subject: 'الفيزياء', title: 'اختبار قصير', date: daysFromToday(-8), score: 17, max: 20, percent: 85 },
        { examId: 3, subject: 'اللغة العربية', title: 'مذاكرة النحو', date: daysFromToday(-15), score: 38, max: 50, percent: 76 },
      ],
      upcoming: [
        { examId: 9, subject: 'الكيمياء', title: 'مذاكرة الفصل الثاني', date: daysFromToday(2) },
        { examId: 10, subject: 'اللغة الإنكليزية', title: 'اختبار المحادثة', date: daysFromToday(6) },
      ],
    },
    finance: withFinance
      ? {
          currencies: [
            { currency: 'SYP', total: 4500000, paid: 3000000, remaining: 1500000, overdue: 500000 },
            { currency: 'USD', total: 600, paid: 400, remaining: 200, overdue: 0 },
          ],
          nextDue: { amount: 750000, currency: 'SYP', dueDate: daysFromToday(9) },
        }
      : null,
  };
}
