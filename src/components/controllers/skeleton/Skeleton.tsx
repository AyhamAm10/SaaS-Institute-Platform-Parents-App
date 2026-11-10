import { useEffect, useState } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, {
  Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { radius, type Radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props {
  width?: DimensionValue;
  height?: number;
  round?: Radius;
}

/** Placeholder block with a soft shimmer sweep (static when Reduce Motion is on). */
export function Skeleton({ width = '100%', height = 16, round = 'sm' }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const [w, setW] = useState(0);
  const x = useSharedValue(-1);

  useEffect(() => {
    if (reduce) return;
    x.set(-1);
    x.set(withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }), -1, false));
  }, [reduce, x]);

  const sweep = useAnimatedStyle(() => ({ transform: [{ translateX: x.value * w }] }));
  return (
    <View
      aria-hidden
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={{ width, height, borderRadius: radius[round], backgroundColor: theme.track, overflow: 'hidden' }}
    >
      {reduce ? null : (
        <Animated.View style={[{ position: 'absolute', top: 0, bottom: 0, width: '60%', start: '20%' }, sweep]}>
          <LinearGradient
            colors={['transparent', theme.glassBgStrong, 'transparent']}
            start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1 }}
          />
        </Animated.View>
      )}
    </View>
  );
}
