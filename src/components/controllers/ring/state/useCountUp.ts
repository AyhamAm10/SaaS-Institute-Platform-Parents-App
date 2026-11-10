import { useEffect, useState } from 'react';
import {
  Easing, useAnimatedReaction, useReducedMotion, useSharedValue, withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { durations } from '@/core/theme/metrics';

/** Counts from 0 to `target` (reanimated shared value mirrored to React). Immediate under Reduce Motion. */
export function useCountUp(target: number, replayKey?: string | number): number {
  const reduce = useReducedMotion();
  const value = useSharedValue(reduce ? target : 0);
  const [shown, setShown] = useState(reduce ? target : 0);

  useAnimatedReaction(
    () => Math.round(value.value),
    (current, previous) => {
      if (current !== previous) scheduleOnRN(setShown, current);
    },
  );

  useEffect(() => {
    if (reduce) {
      value.set(target);
      return;
    }
    value.set(0);
    value.set(withTiming(target, { duration: durations.sweep, easing: Easing.out(Easing.cubic) }));
  }, [target, replayKey, reduce, value]);

  return reduce ? target : shown;
}
