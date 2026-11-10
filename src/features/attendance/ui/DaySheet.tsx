import { Row, Sheet, Stack, StatusPill, Text } from '@/components/controllers';
import type { AttendanceDay } from '@/core/api/types';
import { formatClock, formatLongDate } from '@/core/format/date';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

function Line({ label, value }: { label: string; value: string }) {
  return (
    <Row justify="between" py="xs" gap="md">
      <Text tone="muted">{label}</Text>
      <Text variant="label">{value}</Text>
    </Row>
  );
}

export function DaySheet({ day, onClose }: { day: AttendanceDay | null; onClose: () => void }) {
  return (
    <Sheet visible={!!day} title={day ? formatLongDate(day.date) : ar.attendance.details} onClose={onClose}>
      {day ? (
        <Stack gap="sm" px="sm">
          <StatusPill large label={attendanceLabel(day.status)} tone={attendanceTone(day.status)} />
          <Line label={ar.home.checkIn} value={formatClock(day.checkInAt)} />
          <Line label={ar.home.checkOut} value={formatClock(day.checkOutAt)} />
          <Line label={ar.attendance.note} value={day.note ?? ar.attendance.noNote} />
        </Stack>
      ) : null}
    </Sheet>
  );
}
