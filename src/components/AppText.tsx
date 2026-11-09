import { Text, type TextProps } from 'react-native';
import { type TypeVariant, type } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { Theme } from '@/core/theme/tokens';

type ColorRole = 'text' | 'textMuted' | 'accent' | 'onAccent' | 'success' | 'warning' | 'danger' | 'info' | 'onFab';

interface Props extends TextProps {
  variant?: TypeVariant;
  color?: ColorRole;
  center?: boolean;
}

/** Themed text. System font, respects Dynamic Type (font scaling stays on). */
export function AppText({ variant = 'body', color = 'text', center, style, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Text
      maxFontSizeMultiplier={variant === 'display' ? 1.2 : 1.5}
      {...rest}
      style={[type[variant], { color: theme[color as keyof Theme] as string }, center && { textAlign: 'center' }, style]}
    />
  );
}
