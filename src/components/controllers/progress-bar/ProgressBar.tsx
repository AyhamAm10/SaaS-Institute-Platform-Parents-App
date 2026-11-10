import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { clampPercent } from '@/core/format/number';
import { durations, radius } from '@/core/theme/metrics';
import { toneColors, type ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Row, Stack } from '../layout';
import { Text } from '../text';

interface Props {
  label: string;
  /** Value text shown at the end of the label line (e.g. a count). */
  valueText: string;
  percent: number;
  tone: ToneKey;
}

/** Slim labelled bar with an animated fill. */
export function ProgressBar({ label, valueText, percent, tone }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const [w, setW] = useState(0);
  const p = useSharedValue(0);
  useEffect(() => {
    const target = clampPercent(percent) / 100;
    p.set(reduce ? target : withTiming(target, { duration: durations.sweep, easing: Easing.out(Easing.cubic) }));
  }, [percent, reduce, p]);
  const fill = useAnimatedStyle(() => ({ width: p.value * w }));
  return (
    <Stack flex={1} gap="sm" accessible accessibilityRole="progressbar" accessibilityLabel={`${label}: ${valueText}`}>
      <Row justify="between" gap="xs">
        <Text variant="label" numberOfLines={1}>{label}</Text>
        <Text variant="caption" tone="muted" tabular>{valueText}</Text>
      </Row>
      <View
        onLayout={(e) => setW(e.nativeEvent.layout.width)}
        style={{ height: 8, borderRadius: radius.pill, backgroundColor: theme.track, overflow: 'hidden' }}
      >
        <Animated.View style={[{ height: '100%', borderRadius: radius.pill, backgroundColor: toneColors(theme, tone).solid }, fill]} />
      </View>
    </Stack>
  );
}
