import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { StatChip } from '@/components/StatChip';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import type { Overview } from '@/core/api/types';
import { formatClock } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';

const ICON = { PRESENT: 'checkmark-circle', LATE: 'time', ABSENT: 'close-circle', EXCUSED: 'document-text' } as const;

export function TodayStatus({ today }: { today: Overview['today'] }) {
  const { status, checkInAt, checkOutAt } = today.attendance;
  return (
    <View style={{ gap: space.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, flexWrap: 'wrap' }}>
        <AppText variant="captionStrong" color="textMuted">{ar.home.todayStatus}</AppText>
        <StatChip
          label={today.isWorkingDay || status ? attendanceLabel(status) : ar.home.notWorkingDay}
          tone={attendanceTone(status)}
          icon={status ? ICON[status] : 'ellipse-outline'}
        />
        {checkInAt ? <AppText variant="caption" color="textMuted">{`${ar.home.checkIn} ${formatClock(checkInAt)}`}</AppText> : null}
      </View>
      {checkOutAt ? (
        <AppText variant="caption" color="textMuted">{`${ar.home.leftAt} ${formatClock(checkOutAt)}`}</AppText>
      ) : null}
    </View>
  );
}
