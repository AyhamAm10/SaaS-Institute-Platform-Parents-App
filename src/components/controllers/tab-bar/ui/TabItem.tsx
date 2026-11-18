import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../../_shared/PressableScale';
import { Icon } from '../../icon';
import { Text } from '../../text';
import { TAB_BAR_HEIGHT, type TabMeta } from '../init/tab-bar.init';

interface Props { meta: TabMeta; focused: boolean; onPress: () => void }

/** Active bubble size and how far it floats above the dock. */
const BUBBLE = 50;
const LIFT = 22;
/** Damping ratio ~0.57: overshoot about 11% (three quarters of the earlier bounce). */
const SPRING = { damping: 17, stiffness: 210 } as const;

/**
 * One tab in a fixed, equal slot (neighbours never move). Inactive: an outline icon. Active: the icon rises in
 * an ink bubble ringed with the page colour (a notch in the dock) and the label fades in under it.
 */
export function TabItem({ meta, focused, onPress }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const lift = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    lift.set(reduce ? (focused ? 1 : 0) : withSpring(focused ? 1 : 0, SPRING));
  }, [focused, reduce, lift]);
  const bubble = useAnimatedStyle(() => ({
    transform: [{ translateY: -LIFT * lift.value }],
    borderWidth: 4 * lift.value,
    backgroundColor: lift.value > 0.05 ? theme.dockBg : 'transparent',
  }));
  const caption = useAnimatedStyle(() => ({ opacity: lift.value, transform: [{ translateY: 6 * (1 - lift.value) }] }));

  return (
    <PressableScale
      role="tab" label={meta.label} state={{ selected: focused }} onPress={onPress} scaleTo={0.92}
      outer={{ flex: 1 }}
      inner={{ height: TAB_BAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View
        style={[{
          width: BUBBLE, height: BUBBLE, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center',
          borderColor: theme.bg, boxShadow: focused ? theme.brandGlow : undefined,
        }, bubble]}
      >
        <Icon name={meta.icon} tone={focused ? 'accentSolid' : 'inverse'} duotone={!focused} />
      </Animated.View>
      <Animated.View pointerEvents="none" style={[{ position: 'absolute', bottom: 8, start: 0, end: 0, alignItems: 'center' }, caption]}>
        <Text variant="caption" tone="inverse" numberOfLines={1}>{meta.label}</Text>
      </Animated.View>
    </PressableScale>
  );
}
