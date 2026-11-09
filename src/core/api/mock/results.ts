import type { Results } from '../types';
import { daysFromToday } from './dates';

export function resultsFor(): Results {
  return {
    averagePercent: 84,
    subjects: [
      { subjectId: 1, subject: 'الرياضيات', averagePercent: 91, results: [
        { examId: 1, title: 'مذاكرة الفصل الأول', date: daysFromToday(-3), score: 46, max: 50, percent: 92, status: 'PRESENT' },
        { examId: 11, title: 'اختبار الجبر', date: daysFromToday(-30), score: 18, max: 20, percent: 90, status: 'PRESENT' },
      ] },
      { subjectId: 2, subject: 'الفيزياء', averagePercent: 85, results: [
        { examId: 2, title: 'اختبار قصير', date: daysFromToday(-8), score: 17, max: 20, percent: 85, status: 'PRESENT' },
      ] },
      { subjectId: 3, subject: 'اللغة العربية', averagePercent: 76, results: [
        { examId: 3, title: 'مذاكرة النحو', date: daysFromToday(-15), score: 38, max: 50, percent: 76, status: 'PRESENT' },
        { examId: 12, title: 'اختبار الإملاء', date: daysFromToday(-40), score: null, max: 20, percent: null, status: 'ABSENT' },
      ] },
      { subjectId: 4, subject: 'اللغة الإنكليزية', averagePercent: 58, results: [
        { examId: 13, title: 'اختبار القواعد', date: daysFromToday(-20), score: 29, max: 50, percent: 58, status: 'PRESENT' },
      ] },
    ],
    upcoming: [
      { examId: 9, subject: 'الكيمياء', title: 'مذاكرة الفصل الثاني', date: daysFromToday(2) },
      { examId: 10, subject: 'اللغة الإنكليزية', title: 'اختبار المحادثة', date: daysFromToday(6) },
    ],
  };
}
