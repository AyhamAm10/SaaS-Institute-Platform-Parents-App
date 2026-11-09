import type { Counts30, Lesson } from '@/core/api/types';

/** First lesson that has not ended yet (it may be ongoing). Null when all are over or none exist. */
export function nextLesson(lessons: Lesson[], hm: string): { lesson: Lesson; ongoing: boolean } | null {
  const sorted = [...lessons].sort((a, b) => a.startTime.localeCompare(b.startTime));
  const found = sorted.find((l) => l.endTime > hm);
  return found ? { lesson: found, ongoing: found.startTime <= hm } : null;
}

export interface CountShare { key: 'present' | 'late' | 'absent'; count: number; percent: number }

/** Share of each status among recorded days of the last 30 days (excused counts in the total). */
export function attendanceShares(c: Counts30): CountShare[] {
  const total = c.present + c.late + c.absent + c.excused;
  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100);
  return [
    { key: 'present', count: c.present, percent: pct(c.present) },
    { key: 'late', count: c.late, percent: pct(c.late) },
    { key: 'absent', count: c.absent, percent: pct(c.absent) },
  ];
}

/** Chronological percent series for a sparkline (API returns newest first). */
export function trendValues(latest: { percent: number }[]): number[] {
  return [...latest].reverse().map((m) => m.percent);
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}
