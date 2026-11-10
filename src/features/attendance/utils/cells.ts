import type { CalendarCell } from '@/components/controllers';
import type { AttendanceDay } from '@/core/api/types';
import { calendarCells } from '@/core/format/month';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

/** Calendar cells of a month: one per day with its status tone; days with a record are pressable. */
export function buildCells(
  month: string,
  byDate: Record<string, AttendanceDay>,
  today: string,
  onSelect: (day: AttendanceDay) => void,
): CalendarCell[] {
  return calendarCells(month).map((date, i) => {
    if (!date) return { key: `e${i}`, day: null, tone: null, label: '' };
    const rec = byDate[date];
    const day = Number(date.slice(8));
    return {
      key: date,
      day,
      tone: rec ? attendanceTone(rec.status) : null,
      today: date === today,
      label: `${day}، ${rec ? attendanceLabel(rec.status) : ar.attendanceStatus.NONE}`,
      onPress: rec ? () => onSelect(rec) : undefined,
    };
  });
}
