import { ar } from '@/core/strings/ar';

const pad = (n: number) => String(n).padStart(2, '0');

export function monthKeyOf(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

function parts(key: string): [number, number] {
  const [y, m] = key.split('-').map(Number);
  return [y, m];
}

export function addMonths(key: string, delta: number): string {
  const [y, m] = parts(key);
  const total = y * 12 + (m - 1) + delta;
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`;
}

export function monthLabel(key: string): string {
  const [y, m] = parts(key);
  return `${ar.months[m - 1]} ${y}`;
}

export function daysInMonth(key: string): number {
  const [y, m] = parts(key);
  return new Date(y, m, 0).getDate();
}

/** Column of the 1st day with Sunday = 0 (week starts Sunday). */
export function firstWeekdayIndex(key: string): number {
  const [y, m] = parts(key);
  return new Date(y, m - 1, 1).getDay();
}

/** Calendar cells: leading nulls for alignment, then YYYY-MM-DD for each day. */
export function calendarCells(key: string): (string | null)[] {
  const lead = Array.from({ length: firstWeekdayIndex(key) }, () => null);
  const days = Array.from({ length: daysInMonth(key) }, (_, i) => `${key}-${pad(i + 1)}`);
  return [...lead, ...days];
}

export function compareMonths(a: string, b: string): number {
  const [ay, am] = parts(a);
  const [by, bm] = parts(b);
  return ay * 12 + am - (by * 12 + bm);
}
