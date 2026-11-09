import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import type { TimetableSlot } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { slot: TimetableSlot; current: boolean; last: boolean }

/** One lesson: a time rail (start, line, end) next to the subject card. */
export function SlotCard({ slot, current, last }: Props) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: space.md }} accessible
      accessibilityLabel={`${slot.subject}، ${slot.startTime} - ${slot.endTime}${slot.teacher ? `، ${slot.teacher}` : ''}${slot.room ? `، ${slot.room}` : ''}`}>
      <View style={{ width: 52, alignItems: 'center' }}>
        <AppText variant="captionStrong" color={current ? 'accent' : 'text'}>{slot.startTime}</AppText>
        <View style={{ flex: 1, width: 3, minHeight: 24, marginVertical: 4, borderRadius: 2, backgroundColor: current ? theme.accent : theme.border, opacity: last ? 0.4 : 1 }} />
        <AppText variant="micro" color="textMuted">{slot.endTime}</AppText>
      </View>
      <Card padding={space.lg} style={{ flex: 1, gap: space.xs, borderWidth: current ? 1.5 : 0, borderColor: theme.accent }}>
        <AppText variant="heading">{slot.subject}</AppText>
        {slot.teacher ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.xs }}>
            <Ionicons name="person-outline" size={15} color={theme.textMuted} />
            <AppText variant="caption" color="textMuted">{`${ar.timetable.teacher}: ${slot.teacher}`}</AppText>
          </View>
        ) : null}
        {slot.room ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.xs }}>
            <Ionicons name="location-outline" size={15} color={theme.textMuted} />
            <AppText variant="caption" color="textMuted">{slot.room}</AppText>
          </View>
        ) : null}
      </Card>
    </View>
  );
}
