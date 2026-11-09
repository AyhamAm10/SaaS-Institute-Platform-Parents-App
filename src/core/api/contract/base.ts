/** API contract for the mobile module (/mobile/*). Dates YYYY-MM-DD, times HH:mm. */
export type Role = 'FAMILY' | 'STUDENT';
export type Currency = 'SYP' | 'USD';
export type Gender = 'MALE' | 'FEMALE';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
export type Weekday =
  | 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
export type InstallmentStatus = 'PAID' | 'PARTIAL' | 'DUE' | 'OVERDUE' | 'CANCELLED';

export interface IdName { id: number; name: string }

export interface Institute {
  id: number;
  name: string;
  logoUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  phone: string | null;
  address: string | null;
}

export interface Child {
  id: number;
  fullName: string;
  gender: Gender;
  section: IdName | null;
  branch: IdName;
  statusName: string | null;
}

export interface MobileMe {
  role: Role;
  userId: number;
  phone: string;
  displayName: string;
  institute: Institute;
  children: Child[];
}

export interface Lesson {
  id: number;
  subject: string;
  startTime: string;
  endTime: string;
  room: string | null;
  teacher: string | null;
}

export interface TodayAttendance {
  status: AttendanceStatus | null;
  checkInAt: string | null;
  checkOutAt: string | null;
}

export interface Counts30 {
  present: number;
  late: number;
  absent: number;
  excused: number;
  ratePercent: number | null;
}

export interface LatestMark {
  examId: number;
  subject: string;
  title: string;
  date: string;
  score: number;
  max: number;
  percent: number;
}

export interface UpcomingExam { examId: number; subject: string; title: string; date: string }

export interface CurrencyTotals {
  currency: Currency;
  total: number;
  paid: number;
  remaining: number;
  overdue: number;
}

export interface NextDue { amount: number; currency: Currency; dueDate: string }

export interface Overview {
  student: { id: number; fullName: string; section: IdName | null; branch: IdName };
  today: {
    date: string;
    isWorkingDay: boolean;
    attendance: TodayAttendance;
    lessons: Lesson[];
  };
  attendance30d: Counts30;
  marks: { averagePercent: number | null; latest: LatestMark[]; upcoming: UpcomingExam[] };
  finance: null | { currencies: CurrencyTotals[]; nextDue: NextDue | null };
}

