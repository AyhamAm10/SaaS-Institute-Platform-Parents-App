import { Text as RNText, type TextProps } from 'react-native';
import { type } from '@/core/theme/metrics';
import { roleColor } from '@/core/theme/roles';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { AppTextProps } from './init/text.init';

/** Forces an RTL base direction on web (react-native-web defaults to dir=auto, which left-aligns numbers/phones). */
const RTL = { dir: 'rtl' } as unknown as TextProps;

/** Themed Alexandria text. Dynamic Type stays on (capped); color comes from `tone`. */
export function Text({ variant = 'body', tone = 'primary', align, strike, tabular, ...rest }: AppTextProps) {
  const theme = useTheme();
  return (
    <RNText
      {...RTL}
      maxFontSizeMultiplier={variant === 'display' ? 1.2 : 1.5}
      {...rest}
      style={[
        type[variant],
        { color: roleColor(theme, tone) },
        align ? { textAlign: align === 'start' ? 'auto' : align === 'end' ? 'right' : 'center' } : null,
        strike ? { textDecorationLine: 'line-through' } : null,
        tabular ? { fontVariant: ['tabular-nums'] } : null,
      ]}
    />
  );
}
