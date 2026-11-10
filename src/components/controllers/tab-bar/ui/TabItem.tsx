import Animated, { LinearTransition, useReducedMotion } from 'react-native-reanimated';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../../_shared/PressableScale';
import { Icon } from '../../icon';
import { Box } from '../../layout';
import { Text } from '../../text';
import type { TabMeta } from '../init/tab-bar.init';

interface Props { meta: TabMeta; focused: boolean; onPress: () => void }

const SLIDE = LinearTransition.springify().damping(18).stiffness(220);

/**
 * One tab. Inactive: a bare outline icon. Active: the item grows into a soft white pill on the ink dock that holds the
 * filled icon and its label side by side (the neighbours glide over via a layout transition).
 */
export function TabItem({ meta, focused, onPress }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  return (
    <Animated.View layout={reduce ? undefined : SLIDE}>
      <PressableScale
        role="tab" label={meta.label} state={{ selected: focused }} onPress={onPress} scaleTo={0.92}
        inner={{
          height: 46, minWidth: 44, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
          gap: space.xs, paddingHorizontal: focused ? space.md : 0, backgroundColor: focused ? theme.dockActive : 'transparent',
        }}
      >
        <Box opacity={focused ? 1 : 0.6}>
          <Icon name={meta.icon} tone={focused ? 'accentSolid' : 'inverse'} duotone={!focused} />
        </Box>
        {focused ? <Text variant="label" tone="inverse" numberOfLines={1}>{meta.label}</Text> : null}
      </PressableScale>
    </Animated.View>
  );
}
