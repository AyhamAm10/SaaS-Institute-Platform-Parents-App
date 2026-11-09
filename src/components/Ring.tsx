import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedProps, useReducedMotion, useSharedValue, withTiming, Easing,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { ringGeometry } from '@/core/format/ring';
import { clampPercent } from '@/core/format/number';
import { useTheme } from '@/core/theme/ThemeProvider';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  percent: number | null;
  size?: number;
  stroke?: number;
  color?: string;
  children?: React.ReactNode;
}

/** Circular progress with a thick rounded stroke; children render centered. */
export function Ring({ percent, size = 200, stroke = 18, color, children }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const geo = ringGeometry(size, stroke, percent);
  const progress = useSharedValue(reduce ? clampPercent(percent) : 0);

  useEffect(() => {
    const target = clampPercent(percent);
    progress.value = reduce ? target : withTiming(target, { duration: 900, easing: Easing.out(Easing.cubic) });
  }, [percent, reduce, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: geo.circumference * (1 - progress.value / 100),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={size / 2} cy={size / 2} r={geo.radius} stroke={theme.track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={geo.radius}
          stroke={color ?? theme.accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={geo.circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children}
    </View>
  );
}
