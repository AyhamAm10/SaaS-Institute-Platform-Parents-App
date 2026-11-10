import { Card, EmptyState, ListItem, SectionHeader, Stack, StatusPill } from '@/components/controllers';
import type { IconName } from '@/components/controllers';
import type { AttendanceDay } from '@/core/api/types';
import { formatLongDate } from '@/core/format/date';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { issueDays } from '../utils/days';

const ICON: Record<string, IconName> = { LATE: 'time', ABSENT: 'close-circle', EXCUSED: 'document-text' };

export function IssuesList({ days, onSelect }: { days: AttendanceDay[]; onSelect: (d: AttendanceDay) => void }) {
  const issues = issueDays(days);
  return (
    <Stack gap="sm">
      <SectionHeader title={ar.attendance.absencesAndLates} />
      {issues.length === 0 ? (
        <Card><EmptyState art="smile" title={ar.attendance.none} /></Card>
      ) : (
        <Card padding="sm" gap="none">
          {issues.map((d) => (
            <ListItem
              key={d.date}
              icon={ICON[d.status] ?? 'time'}
              tone={attendanceTone(d.status)}
              title={formatLongDate(d.date)}
              subtitle={d.note ?? undefined}
              chevron={false}
              end={<StatusPill label={attendanceLabel(d.status)} tone={attendanceTone(d.status)} />}
              label={`${formatLongDate(d.date)}، ${attendanceLabel(d.status)}${d.note ? `، ${d.note}` : ''}`}
              onPress={() => onSelect(d)}
            />
          ))}
        </Card>
      )}
    </Stack>
  );
}
