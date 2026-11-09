import type { Timetable, TimetableSlot, Weekday } from '../types';

const slot = (startTime: string, endTime: string, subject: string, teacher: string, room: string): TimetableSlot => ({
  startTime, endTime, subject, teacher, room,
});

const base: TimetableSlot[] = [
  slot('08:00', '08:45', 'الرياضيات', 'أ. هالة منصور', 'قاعة 3'),
  slot('08:50', '09:35', 'اللغة العربية', 'أ. خالد سليمان', 'قاعة 3'),
  slot('10:00', '10:45', 'الفيزياء', 'أ. ريم حداد', 'مخبر 1'),
  slot('11:00', '11:45', 'اللغة الإنكليزية', 'أ. سامر ناصر', 'قاعة 3'),
  slot('12:00', '12:45', 'الكيمياء', 'أ. ليلى عباس', 'مخبر 2'),
];

const weekdays: Weekday[] = ['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'];

export function timetableFor(): Timetable {
  return {
    days: weekdays.map((weekday, i) => ({
      weekday,
      slots: i === 0 ? base.slice(0, 3) : base.filter((_, k) => (k + i) % 6 !== 5),
    })),
  };
}
