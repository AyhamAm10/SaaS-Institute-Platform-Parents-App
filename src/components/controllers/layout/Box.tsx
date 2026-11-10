import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { BOX_KEYS, resolveBox, type BoxProps } from './init/layout.init';

/** Generic token-typed container. Stack, Row and Grid are specializations of it. */
export function Box({ children, ...props }: BoxProps) {
  const theme = useTheme();
  const layout: Record<string, unknown> = {};
  const native: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    (BOX_KEYS.includes(key as (typeof BOX_KEYS)[number]) ? layout : native)[key] = value;
  }
  const style = resolveBox(layout as BoxProps, theme);
  return <View {...(native as ViewProps)} style={style}>{children}</View>;
}

/** Vertical stack: `<Stack gap="lg" align="center">`. */
export function Stack(props: BoxProps) {
  return <Box {...props} direction="column" />;
}

/** Horizontal row (mirrors in RTL): items are vertically centered by default. */
export function Row({ align = 'center', ...props }: BoxProps) {
  return <Box {...props} align={align} direction="row" />;
}
