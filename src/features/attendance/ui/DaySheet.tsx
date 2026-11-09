import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { BottomSheet } from '@/components/BottomSheet';
import { StatChip } from '@/components/StatChip';
import type { AttendanceDay } from '@/core/api/types';
import { formatClock, formatLongDate } from '@/core/format/date';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';

function Line({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: space.xs }}>
      <AppText color="textMuted">{label}</AppText>
      <AppText variant="bodyStrong" style={{ flexShrink: 1 }}>{value}</AppText>
    </View>
  );
}

export function DaySheet({ day, onClose }: { day: AttendanceDay | null; onClose: () => void }) {
  return (
    <BottomSheet visible={!!day} title={day ? formatLongDate(day.date) : ar.attendance.details} onClose={onClose}>
      {day ? (
        <View style={{ gap: space.sm, paddingBottom: space.md }}>
          <StatChip label={attendanceLabel(day.status)} tone={attendanceTone(day.status)} />
          <Line label={ar.home.checkIn} value={formatClock(day.checkInAt)} />
          <Line label={ar.home.checkOut} value={formatClock(day.checkOutAt)} />
          <Line label={ar.attendance.note} value={day.note ?? ar.attendance.noNote} />
        </View>
      ) : null}
    </BottomSheet>
  );
}
