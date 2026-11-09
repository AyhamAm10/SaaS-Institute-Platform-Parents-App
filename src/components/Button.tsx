import { ActivityIndicator, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { tapHaptic } from '@/core/layout/haptics';
import { AppText } from './AppText';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'soft' | 'danger';
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = 'primary', icon, loading, disabled }: Props) {
  const theme = useTheme();
  const bg = variant === 'primary' ? theme.accent : variant === 'danger' ? theme.tints.danger : theme.tints.accent;
  const fg = variant === 'primary' ? theme.onAccent : variant === 'danger' ? theme.danger : theme.accent;
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      disabled={inactive}
      onPress={() => {
        tapHaptic();
        onPress();
      }}
      style={({ pressed }) => ({
        minHeight: 52, minWidth: HIT, borderRadius: radius.pill, backgroundColor: bg,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm,
        paddingHorizontal: space.xl, opacity: inactive ? 0.55 : pressed ? 0.85 : 1,
      })}
    >
      {loading ? <ActivityIndicator color={fg} /> : icon ? <Ionicons name={icon} size={20} color={fg} /> : null}
      <AppText variant="bodyStrong" style={{ color: fg }}>{label}</AppText>
    </Pressable>
  );
}
