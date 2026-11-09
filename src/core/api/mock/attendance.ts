import type { AttendanceDay, AttendanceMonth, AttendanceStatus } from '../types';

const pad = (n: number) => String(n).padStart(2, '0');

function statusFor(day: number, studentId: number): AttendanceStatus | null {
  if (day % 7 === 5 || day % 7 === 6) return null; // weekend-like gaps
  const seed = (day * 7 + studentId) % 17;
  if (seed === 3) return 'ABSENT';
  if (seed === 8 || seed === 13) return 'LATE';
  if (seed === 11) return 'EXCUSED';
  return 'PRESENT';
}

const NOTES: Record<AttendanceStatus, string | null> = {
  ABSENT: 'غياب دون إشعار',
  EXCUSED: 'مراجعة طبية',
  LATE: 'تأخر عن الطابور',
  PRESENT: null,
};

function currentMonthKey(): string {
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}`;
}

export function attendanceFor(studentId: number, month: string): AttendanceMonth {
  const [y, m] = month.split('-').map(Number);
  const last = new Date(y, m, 0).getDate();
  const limit = month === currentMonthKey() ? new Date().getDate() : last;
  const days: AttendanceDay[] = [];
  for (let d = 1; d <= limit; d += 1) {
    const status = statusFor(d, studentId);
    if (!status) continue;
    const away = status === 'ABSENT' || status === 'EXCUSED';
    days.push({
      date: `${month}-${pad(d)}`,
      status,
      checkInAt: away ? null : status === 'LATE' ? '08:27' : '07:55',
      checkOutAt: away ? null : '13:35',
      note: NOTES[status],
    });
  }
  const count = (s: AttendanceStatus) => days.filter((x) => x.status === s).length;
  const counts = { present: count('PRESENT'), late: count('LATE'), absent: count('ABSENT'), excused: count('EXCUSED') };
  const ratePercent = days.length ? Math.round(((counts.present + counts.late) / days.length) * 100) : null;
  return { month, days, counts, ratePercent };
}
