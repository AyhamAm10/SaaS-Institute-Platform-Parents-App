import { Row, Stack, StatusPill, Text } from '@/components/controllers';
import type { IconName } from '@/components/controllers';
import type { Overview } from '@/core/api/types';
import { formatClock } from '@/core/format/date';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

const ICON: Record<string, IconName> = { PRESENT: 'checkmark-circle', LATE: 'time', ABSENT: 'close-circle', EXCUSED: 'document-text' };

/** "Today" status as a pill, with check-in / check-out times. */
export function TodayStatus({ today }: { today: Overview['today'] }) {
  const { status, checkInAt, checkOutAt } = today.attendance;
  return (
    <Stack gap="sm">
      <Row gap="sm" wrap>
        <Text variant="label" tone="muted">{ar.home.todayStatus}</Text>
        <StatusPill
          large
          label={today.isWorkingDay || status ? attendanceLabel(status) : ar.home.notWorkingDay}
          tone={attendanceTone(status)}
          icon={status ? ICON[status] : 'ellipse'}
        />
        {checkInAt ? <Text variant="caption" tone="muted">{`${ar.home.checkIn} ${formatClock(checkInAt)}`}</Text> : null}
      </Row>
      {checkOutAt ? <Text variant="caption" tone="muted">{`${ar.home.leftAt} ${formatClock(checkOutAt)}`}</Text> : null}
    </Stack>
  );
}
