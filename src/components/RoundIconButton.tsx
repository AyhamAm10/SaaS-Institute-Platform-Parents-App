import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HIT } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { tapHaptic } from '@/core/layout/haptics';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  /** Small unread dot at the corner. */
  dot?: boolean;
}

/** Round white icon button used in headers (back, bell). 48pt target. */
export function RoundIconButton({ icon, label, onPress, dot }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        tapHaptic();
        onPress();
      }}
      hitSlop={4}
      style={({ pressed }) => ({
        width: HIT + 4, height: HIT + 4, borderRadius: 26, backgroundColor: theme.surface,
        alignItems: 'center', justifyContent: 'center', boxShadow: theme.shadow, opacity: pressed ? 0.8 : 1,
      })}
    >
      <Ionicons name={icon} size={22} color={theme.text} />
      {dot ? (
        <View style={{ position: 'absolute', top: 11, end: 12, width: 10, height: 10, borderRadius: 5, backgroundColor: theme.danger, borderWidth: 2, borderColor: theme.surface }} />
      ) : null}
    </Pressable>
  );
}
