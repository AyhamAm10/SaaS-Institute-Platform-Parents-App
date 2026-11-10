import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../../_shared/PressableScale';
import { Icon } from '../../icon';

interface Props { label: string; open: boolean; onPress: () => void }

const SIZE = 58;

/** Center button: ink circle, orange glow ring, "+" that rotates 45deg while the sheet is open. */
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
        width: SIZE, height: SIZE, borderRadius: radius.pill, backgroundColor: theme.fab, alignItems: 'center',
        justifyContent: 'center', borderWidth: 2, borderColor: theme.brandAccentRing,
        boxShadow: `${theme.brandGlow}, 0 0 0 5px ${theme.brandAccentSoft}`,
      }}
    >
      <Animated.View style={spin}><Icon name="add" size="lg" tone="inverse" duotone={false} /></Animated.View>
    </PressableScale>
  );
}
