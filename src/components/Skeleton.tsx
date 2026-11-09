import { useEffect } from 'react';
import { type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming,
} from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props {
  width?: DimensionValue;
  height?: number;
  round?: number;
  style?: StyleProp<ViewStyle>;
}

/** Placeholder block that gently pulses (static when reduced motion is on). */
export function Skeleton({ width = '100%', height = 16, round = radius.sm, style }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!reduce) opacity.value = withRepeat(withTiming(0.5, { duration: 800 }), -1, true);
  }, [reduce, opacity]);

  const animated = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return (
    <Animated.View
      aria-hidden
      style={[{ width, height, borderRadius: round, backgroundColor: theme.track }, animated, style]}
    />
  );
}
