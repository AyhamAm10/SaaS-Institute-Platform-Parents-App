import { View } from 'react-native';
import { toneColors, type ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { Row, Stack } from '../layout';
import { Text } from '../text';

export interface CalendarCell {
  key: string;
  /** Day of month; null for the leading blanks. */
  day: number | null;
  /** Marker color of the day's status (null = no record). */
  tone: ToneKey | null;
  today?: boolean;
  label: string;
  onPress?: () => void;
}

interface Props { weekdays: readonly string[]; cells: CalendarCell[] }

const CELL = 44;

/** Month grid: tinted discs with a solid status dot, today ringed in orange. Week starts at the first label. */
export function CalendarGrid({ weekdays, cells }: Props) {
  const theme = useTheme();
  return (
    <Stack gap="xs">
      <Row>
        {weekdays.map((w) => (
          <Stack key={w} flex={1} align="center" py="sm"><Text variant="caption" tone="muted" numberOfLines={1}>{w}</Text></Stack>
        ))}
      </Row>
      <Row wrap align="start">
        {cells.map((c) => {
          if (c.day === null) return <View key={c.key} style={{ width: '14.285%', height: CELL + 8 }} />;
          const t = c.tone ? toneColors(theme, c.tone) : null;
          const disc = (
            <View
              style={{
                width: CELL, height: CELL, borderRadius: CELL / 2, alignItems: 'center', justifyContent: 'center',
                backgroundColor: t?.bg ?? 'transparent', borderWidth: c.today ? 2 : 1,
                borderColor: c.today ? theme.brandAccent : t?.border ?? 'transparent',
              }}
            >
              <Text variant="label" tone={c.tone ?? 'muted'} tabular>{String(c.day)}</Text>
              {t ? <View style={{ position: 'absolute', bottom: 5, width: 5, height: 5, borderRadius: 3, backgroundColor: t.solid }} /> : null}
            </View>
          );
          return (
            <View key={c.key} style={{ width: '14.285%', height: CELL + 8, alignItems: 'center', justifyContent: 'center' }}>
              {c.onPress ? (
                <PressableScale label={c.label} onPress={c.onPress} scaleTo={0.9}>{disc}</PressableScale>
              ) : (
                <View accessible accessibilityLabel={c.label}>{disc}</View>
              )}
            </View>
          );
        })}
      </Row>
    </Stack>
  );
}
