import { useEffect, useState } from 'react';
import {
  Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withSpring, withTiming,
} from 'react-native-reanimated';

const OFFSET = 420;

/** Spring-in / ease-out motion for a modal sheet; keeps it mounted until the exit finishes. */
export function useSheetMotion(visible: boolean) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setMounted(true), 0);
      progress.set(reduce ? 1 : withSpring(1, { damping: 20, stiffness: 190, mass: 0.9 }));
      return () => clearTimeout(t);
    }
    progress.set(reduce ? 0 : withTiming(0, { duration: 200, easing: Easing.in(Easing.cubic) }));
    const t = setTimeout(() => setMounted(false), reduce ? 0 : 210);
    return () => clearTimeout(t);
  }, [visible, reduce, progress]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - Math.min(progress.value, 1)) * OFFSET }],
    opacity: Math.min(1, 0.3 + progress.value * 0.7),
  }));
  const backdropStyle = useAnimatedStyle(() => ({ opacity: Math.min(progress.value, 1) }));
  return { rendered: visible || mounted, sheetStyle, backdropStyle };
}
