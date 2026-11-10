import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { tapHaptic } from '@/core/layout/haptics';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  label?: string;
  role?: PressableProps['accessibilityRole'];
  state?: PressableProps['accessibilityState'];
  hint?: string;
  disabled?: boolean;
  haptic?: boolean;
  scaleTo?: number;
  hitSlop?: number;
  /** Layout style of the outer pressable (flex, alignSelf, width...). */
  outer?: StyleProp<ViewStyle>;
  /** Style of the scaling surface. */
  inner?: StyleProp<ViewStyle>;
}

const SPRING = { damping: 18, stiffness: 320, mass: 0.6 } as const;

/** Pressable that scales to `scaleTo` (0.97) with a spring and a light haptic. Respects Reduce Motion. */
export function PressableScale({
  children, onPress, label, role = 'button', state, hint, disabled, haptic = true, scaleTo = 0.97, hitSlop, outer, inner,
}: Props) {
  const reduce = useReducedMotion();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ disabled: !!disabled, ...state }}
      disabled={disabled}
      hitSlop={hitSlop}
      onPressIn={() => { if (!reduce) scale.set(withSpring(scaleTo, SPRING)); }}
      onPressOut={() => { scale.set(withSpring(1, SPRING)); }}
      onPress={() => {
        if (haptic) tapHaptic();
        onPress?.();
      }}
      style={outer}
    >
      <Animated.View style={[inner, animated]}>{children}</Animated.View>
    </Pressable>
  );
}
