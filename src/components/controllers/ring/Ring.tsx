import { useEffect, useId } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing, useAnimatedProps, useReducedMotion, useSharedValue, withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';
import { clampPercent } from '@/core/format/number';
import { ringGeometry } from '@/core/format/ring';
import { durations } from '@/core/theme/metrics';
import { toneColors } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { glowPad, RING_SIZE, RING_STROKE, type RingProps } from './init/ring.init';
import { RingValue } from './ui/RingValue';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** Progress ring with a thick rounded gradient stroke, animated sweep and an optional orange glow. */
export function Ring({ percent, size = 'lg', tone = 'brand', glow, replayKey, children }: RingProps) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const dim = RING_SIZE[size];
  const stroke = RING_STROKE[size];
  const pad = glowPad(size, glow);
  const canvas = dim + pad * 2;
  const geo = ringGeometry(dim, stroke, percent);
  const progress = useSharedValue(reduce ? clampPercent(percent) : 0);

  useEffect(() => {
    const target = clampPercent(percent);
    if (reduce) {
      progress.set(target);
      return;
    }
    progress.set(0);
    progress.set(withTiming(target, { duration: durations.sweep, easing: Easing.out(Easing.cubic) }));
  }, [percent, replayKey, reduce, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: geo.circumference * (1 - progress.value / 100),
  }));

  const solid = toneColors(theme, tone === 'brand' ? 'accent' : tone).solid;
  const stops = tone === 'brand' ? [theme.ringStart, theme.ringMid, theme.ringEnd] : [solid, solid];
  const c = canvas / 2;
  return (
    <View style={{ width: canvas, height: canvas, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={canvas} height={canvas} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
            {stops.map((color, i) => (
              <Stop key={i} offset={`${(i / (stops.length - 1)) * 100}%`} stopColor={color} />
            ))}
          </LinearGradient>
          <RadialGradient id={`r${uid}`} cx="50%" cy="50%" r="50%">
            <Stop offset="62%" stopColor={theme.brandAccent} stopOpacity={theme.scheme === 'dark' ? 0.32 : 0.28} />
            <Stop offset="100%" stopColor={theme.brandAccent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        {glow ? <Circle cx={c} cy={c} r={c} fill={`url(#r${uid})`} /> : null}
        <Circle cx={c} cy={c} r={geo.radius} stroke={theme.track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={c} cy={c} r={geo.radius} stroke={`url(#g${uid})`} strokeWidth={stroke} strokeLinecap="round"
          fill="none" strokeDasharray={geo.circumference} animatedProps={animatedProps}
          transform={`rotate(-90 ${c} ${c})`}
        />
      </Svg>
      {children}
    </View>
  );
}

Ring.Value = RingValue;
