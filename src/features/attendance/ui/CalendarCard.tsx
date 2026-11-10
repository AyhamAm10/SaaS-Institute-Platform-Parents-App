import { useMemo } from 'react';
import { CalendarGrid, Card } from '@/components/controllers';
import type { AttendanceDay } from '@/core/api/types';
import { todayYmd } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { buildCells } from '../utils/cells';

interface Props {
  month: string;
  byDate: Record<string, AttendanceDay>;
  onSelect: (day: AttendanceDay) => void;
}

/** Month calendar with a colored marker per recorded day. */
export function CalendarCard({ month, byDate, onSelect }: Props) {
  const cells = useMemo(() => buildCells(month, byDate, todayYmd(), onSelect), [month, byDate, onSelect]);
  return (
    <Card padding="md">
      <CalendarGrid weekdays={ar.weekdaysShort} cells={cells} />
    </Card>
  );
}
