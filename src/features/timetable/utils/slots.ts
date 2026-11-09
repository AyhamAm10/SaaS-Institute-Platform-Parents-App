import type { Timetable, TimetableSlot, Weekday } from '@/core/api/types';

/** Slots of one weekday sorted by start time (empty when the day is absent). */
export function slotsFor(timetable: Timetable, day: Weekday): TimetableSlot[] {
  const found = timetable.days.find((d) => d.weekday === day);
  return [...(found?.slots ?? [])].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function isCurrentSlot(slot: TimetableSlot, hm: string): boolean {
  return slot.startTime <= hm && hm < slot.endTime;
}
