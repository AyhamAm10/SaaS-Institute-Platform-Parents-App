import { Pressable, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import type { AttendanceDay } from '@/core/api/types';
import { calendarCells } from '@/core/format/month';
import { todayYmd } from '@/core/format/date';
import { attendanceLabel, attendanceTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props {
  month: string;
  byDate: Record<string, AttendanceDay>;
  onSelect: (day: AttendanceDay) => void;
}

const CELL = 40;

export function CalendarGrid({ month, byDate, onSelect }: Props) {
  const theme = useTheme();
  const today = todayYmd();
  return (
    <Card padding={space.md}>
      <View style={{ flexDirection: 'row' }}>
        {ar.weekdaysShort.map((w) => (
          <View key={w} style={{ width: `${100 / 7}%`, alignItems: 'center', paddingBottom: space.sm }}>
            <AppText variant="micro" color="textMuted" numberOfLines={1}>{w}</AppText>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {calendarCells(month).map((date, i) => {
          if (!date) return <View key={`e${i}`} style={{ width: `${100 / 7}%`, height: CELL + 8 }} />;
          const rec = byDate[date];
          const tone = rec ? attendanceTone(rec.status) : 'neutral';
          const color = tone === 'neutral' ? theme.textMuted : theme[tone];
          const day = Number(date.slice(8));
          return (
            <View key={date} style={{ width: `${100 / 7}%`, height: CELL + 8, alignItems: 'center', justifyContent: 'center' }}>
              <Pressable
                disabled={!rec}
                accessibilityRole={rec ? 'button' : 'text'}
                accessibilityLabel={`${day}، ${rec ? attendanceLabel(rec.status) : ar.attendanceStatus.NONE}`}
                onPress={() => rec && onSelect(rec)}
                style={{
                  width: CELL, height: CELL, borderRadius: CELL / 2, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: rec ? theme.tints[tone === 'neutral' ? 'accent' : tone] : 'transparent',
                  borderWidth: date === today ? 2 : 0, borderColor: theme.accent,
                }}
              >
                <AppText variant="captionStrong" style={{ color: rec ? color : theme.textMuted }}>{String(day)}</AppText>
              </Pressable>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
