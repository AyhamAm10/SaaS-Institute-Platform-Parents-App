import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { BottomSheet } from '@/components/BottomSheet';
import { selectChild } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { tapHaptic } from '@/core/layout/haptics';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useSheets } from '../hooks/useSheets';
import { Avatar } from './Avatar';

export function ChildSheet() {
  const theme = useTheme();
  const open = useSheets((s) => s.childOpen);
  const close = useSheets((s) => s.closeChild);
  const children = useSession((s) => s.me?.children ?? []);
  const selected = useSession((s) => s.selectedChildId);
  return (
    <BottomSheet visible={open} title={ar.children.pick} onClose={close}>
      {children.map((c) => (
        <Pressable
          key={c.id}
          accessibilityRole="button"
          accessibilityState={{ selected: c.id === selected }}
          accessibilityLabel={`${c.fullName}${c.section ? `، ${c.section.name}` : ''}`}
          onPress={() => {
            tapHaptic();
            selectChild(c.id);
            close();
          }}
          style={{
            minHeight: HIT + 20, flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md,
            borderRadius: radius.md, backgroundColor: c.id === selected ? theme.tints.accent : theme.background,
          }}
        >
          <Avatar name={c.fullName} size={44} />
          <View style={{ flex: 1 }}>
            <AppText variant="bodyStrong">{c.fullName}</AppText>
            <AppText variant="caption" color="textMuted">{c.section?.name ?? c.branch.name}</AppText>
          </View>
          {c.id === selected ? <Ionicons name="checkmark-circle" size={24} color={theme.accent} /> : null}
        </Pressable>
      ))}
    </BottomSheet>
  );
}
