import type { AttendanceDay } from '@/core/api/types';

export function indexByDate(days: AttendanceDay[]): Record<string, AttendanceDay> {
  return Object.fromEntries(days.map((d) => [d.date, d]));
}

/** Lates, absences and excused days of the month, newest first. */
export function issueDays(days: AttendanceDay[]): AttendanceDay[] {
  return days.filter((d) => d.status !== 'PRESENT').sort((a, b) => b.date.localeCompare(a.date));
}
