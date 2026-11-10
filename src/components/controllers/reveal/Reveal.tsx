import { useEffect, type ReactNode } from 'react';
import Animated, {
  Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming,
} from 'react-native-reanimated';
import { durations } from '@/core/theme/metrics';

interface Props {
  children: ReactNode;
  /** Position in the staggered sequence (0 = first). Delay = index x 60ms. */
  index?: number;
  /** Re-run the entrance when this changes (e.g. selected child). */
  replayKey?: string | number;
  stretch?: boolean;
  /** Fill the parent cell (equal-height grid tiles). */
  fill?: boolean;
}

/** Entrance: fade in + translateY 12 -> 0, staggered. Instant when Reduce Motion is on. */
export function Reveal({ children, index = 0, replayKey, stretch, fill }: Props) {
  const reduce = useReducedMotion();
  const progress = useSharedValue(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    progress.set(0);
    progress.set(
      withDelay(
        Math.min(index, 8) * durations.stagger,
        withTiming(1, { duration: durations.slow, easing: Easing.out(Easing.cubic) }),
      ),
    );
  }, [index, replayKey, reduce, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 12 }],
  }));
  return <Animated.View style={[style, stretch ? { alignSelf: 'stretch' } : null, fill ? { flex: 1 } : null]}>{children}</Animated.View>;
}
