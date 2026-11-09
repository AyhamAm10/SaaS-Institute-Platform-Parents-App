import type { AttendanceStatus, UpcomingExam, Weekday } from './base';
export interface AttendanceDay {
  date: string;
  status: AttendanceStatus;
  checkInAt: string | null;
  checkOutAt: string | null;
  note: string | null;
}

export interface AttendanceMonth {
  month: string;
  days: AttendanceDay[];
  counts: { present: number; late: number; absent: number; excused: number };
  ratePercent: number | null;
}

export interface TimetableSlot {
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string | null;
  room: string | null;
}

export interface Timetable { days: { weekday: Weekday; slots: TimetableSlot[] }[] }

export interface ExamResult {
  examId: number;
  title: string;
  date: string;
  score: number | null;
  max: number;
  percent: number | null;
  status: string;
}

export interface SubjectResults {
  subjectId: number;
  subject: string;
  averagePercent: number | null;
  results: ExamResult[];
}

export interface Results {
  averagePercent: number | null;
  subjects: SubjectResults[];
  upcoming: UpcomingExam[];
}

