import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../../_shared/PressableScale';
import { Icon } from '../../icon';

interface Props { label: string; open: boolean; onPress: () => void }

const SIZE = 58;

/** Center button: orange circle, glow, "+" that rotates 45deg while the sheet is open. */
export function ActionButton({ label, open, onPress }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const turn = useSharedValue(0);
  useEffect(() => {
    turn.set(reduce ? (open ? 1 : 0) : withSpring(open ? 1 : 0, { damping: 13, stiffness: 180 }));
  }, [open, reduce, turn]);
  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${turn.value * 45}deg` }] }));
  return (
    <PressableScale
      label={label} onPress={onPress} scaleTo={0.93}
      inner={{
        width: SIZE, height: SIZE, borderRadius: radius.pill, backgroundColor: theme.brandAccent, alignItems: 'center',
        justifyContent: 'center', borderWidth: 4, borderColor: theme.dockBg,
        boxShadow: theme.brandGlow,
      }}
    >
      <Animated.View style={spin}><Icon name="add" size="lg" tone="inverse" duotone={false} /></Animated.View>
    </PressableScale>
  );
}
