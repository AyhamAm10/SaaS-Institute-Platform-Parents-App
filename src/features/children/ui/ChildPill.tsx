import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { useCanSwitchChild, useSelectedChild } from '@/core/auth/hooks';
import { ar } from '@/core/strings/ar';
import { tapHaptic } from '@/core/layout/haptics';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useSheets } from '../hooks/useSheets';
import { Avatar } from './Avatar';

/** Header pill: avatar initial + first names. Opens the child switcher only for families with several children. */
export function ChildPill() {
  const theme = useTheme();
  const child = useSelectedChild();
  const canSwitch = useCanSwitchChild();
  const openChild = useSheets((s) => s.openChild);
  if (!child) return null;
  const shortName = child.fullName.split(' ').slice(0, 2).join(' ');

  const body = (
    <View
      style={{
        minHeight: HIT + 4, flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingStart: space.sm,
        paddingEnd: space.md, borderRadius: radius.pill, backgroundColor: theme.surface, boxShadow: theme.shadow, maxWidth: 240,
      }}
    >
      <Avatar name={child.fullName} />
      <AppText variant="bodyStrong" numberOfLines={1} style={{ flexShrink: 1 }}>{shortName}</AppText>
      {canSwitch ? <Ionicons name="chevron-down" size={16} color={theme.textMuted} /> : null}
    </View>
  );
  if (!canSwitch) return <View accessible accessibilityLabel={child.fullName}>{body}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${ar.children.switchLabel}، ${child.fullName}`}
      onPress={() => {
        tapHaptic();
        openChild();
      }}
    >
      {body}
    </Pressable>
  );
}
