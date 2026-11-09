import { Pressable, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { SectionHeader } from '@/components/SectionHeader';
import { StatChip } from '@/components/StatChip';
import type { AttendanceDay } from '@/core/api/types';
import { formatLongDate } from '@/core/format/date';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { HIT, space } from '@/core/theme/metrics';
import { issueDays } from '../utils/days';

export function IssuesList({ days, onSelect }: { days: AttendanceDay[]; onSelect: (d: AttendanceDay) => void }) {
  const issues = issueDays(days);
  return (
    <View style={{ gap: space.sm }}>
      <SectionHeader title={ar.attendance.absencesAndLates} />
      {issues.length === 0 ? (
        <Card><EmptyState icon="happy-outline" title={ar.attendance.none} /></Card>
      ) : (
        <Card padding={space.sm}>
          {issues.map((d) => (
            <Pressable
              key={d.date}
              accessibilityRole="button"
              accessibilityLabel={`${formatLongDate(d.date)}، ${attendanceLabel(d.status)}${d.note ? `، ${d.note}` : ''}`}
              onPress={() => onSelect(d)}
              style={{ minHeight: HIT + 12, padding: space.md, gap: space.xs }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm }}>
                <AppText variant="bodyStrong" style={{ flexShrink: 1 }}>{formatLongDate(d.date)}</AppText>
                <StatChip label={attendanceLabel(d.status)} tone={attendanceTone(d.status)} />
              </View>
              {d.note ? <AppText variant="caption" color="textMuted">{d.note}</AppText> : null}
            </Pressable>
          ))}
        </Card>
      )}
    </View>
  );
}
