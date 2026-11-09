import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { tapHaptic } from '@/core/layout/haptics';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

/** Large white rounded surface with a very soft shadow. Pressable when onPress is given. */
export function Card({ children, onPress, accessibilityLabel, padding = space.xl, style }: Props) {
  const theme = useTheme();
  const base: ViewStyle = {
    backgroundColor: theme.surface,
    borderRadius: radius.card,
    padding,
    boxShadow: theme.shadow,
  };
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        tapHaptic();
        onPress();
      }}
      style={({ pressed }) => [base, pressed && { opacity: 0.85, transform: [{ scale: 0.985 }] }, style]}
    >
      {children}
    </Pressable>
  );
}
