import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../../_shared/PressableScale';
import { Icon } from '../../icon';
import { Stack } from '../../layout';
import { Text } from '../../text';
import type { TabMeta } from '../init/tab-bar.init';

interface Props { meta: TabMeta; focused: boolean; onPress: () => void }

const SPRING = { damping: 14, stiffness: 220, mass: 0.7 } as const;

/** One tab: duotone icon on a soft orange pill, label, and an orange dot that springs in when active. */
export function TabItem({ meta, focused, onPress }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const on = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    on.set(reduce ? (focused ? 1 : 0) : withSpring(focused ? 1 : 0, SPRING));
  }, [focused, reduce, on]);
  const pill = useAnimatedStyle(() => ({ opacity: on.value, transform: [{ scale: 0.6 + on.value * 0.4 }] }));
  const dot = useAnimatedStyle(() => ({ opacity: on.value, transform: [{ scale: on.value }] }));
  const lift = useAnimatedStyle(() => ({ transform: [{ translateY: -2 * on.value }] }));
  return (
    <PressableScale
      role="tab" label={meta.label} state={{ selected: focused }} onPress={onPress} scaleTo={0.92}
      outer={{ flex: 1 }} inner={{ minHeight: 56, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={[{ alignItems: 'center', gap: 2 }, lift]}>
        <Stack align="center" justify="center" width={48} height={30}>
          <Animated.View style={[{ position: 'absolute', width: 48, height: 30, borderRadius: radius.pill, backgroundColor: theme.brandAccentSoft }, pill]} />
          <Icon name={meta.icon} tone={focused ? 'accentSolid' : 'muted'} />
        </Stack>
        <Text variant="caption" tone={focused ? 'accent' : 'muted'} numberOfLines={1}>{meta.label}</Text>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', bottom: 3, width: 5, height: 5, borderRadius: 3, backgroundColor: theme.brandAccent }, dot]} />
    </PressableScale>
  );
}
