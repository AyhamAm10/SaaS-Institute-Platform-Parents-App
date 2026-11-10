import { useEffect, useId } from 'react';
import Animated, {
  Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, Path, RadialGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/core/theme/ThemeProvider';
import { BLOB_PATHS, type BlobConfig } from '../init/ambient.init';

/** One soft orange liquid blob that drifts slowly (static under Reduce Motion). */
export function AmbientBlob({ blob }: { blob: BlobConfig }) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const id = `b${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const t = useSharedValue(0);

  useEffect(() => {
    if (reduce) return;
    t.set(withRepeat(withTiming(1, { duration: blob.seconds * 1000, easing: Easing.inOut(Easing.sin) }), -1, true));
  }, [reduce, blob.seconds, t]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: t.value * blob.drift.x },
      { translateY: t.value * blob.drift.y },
      { rotate: `${t.value * blob.drift.rotate}deg` },
      { scale: 1 + t.value * 0.06 },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute', top: blob.top, bottom: blob.bottom, start: blob.start, end: blob.end,
          width: blob.size * 1.3, height: blob.size * 1.3, opacity: Math.min(1, theme.blobOpacity * blob.opacity),
        },
        style,
      ]}
    >
      <Svg viewBox="0 0 200 200" width="100%" height="100%">
        <Defs>
          <RadialGradient id={id} cx="42%" cy="38%" r="62%">
            <Stop offset="0%" stopColor={theme.blobStart} stopOpacity={1} />
            <Stop offset="34%" stopColor={theme.blobMid} stopOpacity={0.62} />
            <Stop offset="60%" stopColor={theme.blobEnd} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Path d={BLOB_PATHS[blob.shape]} fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}
