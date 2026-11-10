import type { Counts30, Lesson, Overview } from '@/core/api/types';
import { relativeDay } from '@/core/format/date';
import { formatMoney, formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

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

/** Spoken description of the hero ring. */
export function heroLabel(rate: number | null): string {
  const value = rate === null ? ar.home.rateUnknown : `${formatNumber(Math.round(rate), 0)} ${ar.common.percent}`;
  return `${ar.home.heroCaption}: ${value}`;
}

/** One short sentence for the timetable tile: lessons today and the next one. */
export function scheduleSentence(lessons: Lesson[], next: { lesson: Lesson } | null): string {
  if (lessons.length === 0) return ar.home.noLessons;
  const tail = next ? `، ${ar.home.nextLesson}: ${next.lesson.subject} ${next.lesson.startTime}` : '';
  return `${formatNumber(lessons.length, 0)} ${ar.home.lessonsToday}${tail}`;
}

/** One short sentence for the finance tile: settled, or the next due amount. */
export function financeSentence(fin: NonNullable<Overview['finance']>): string {
  if (fin.currencies.every((x) => x.remaining === 0)) return ar.home.settled;
  const due = fin.nextDue ? `${formatMoney(fin.nextDue.amount, fin.nextDue.currency)} ${relativeDay(fin.nextDue.dueDate)}` : '—';
  return `${ar.home.nextDue}: ${due}`;
}
