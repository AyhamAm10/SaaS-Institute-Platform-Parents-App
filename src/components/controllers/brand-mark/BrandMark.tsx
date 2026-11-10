import { Image, View } from 'react-native';
import { BRAND } from '@/core/brand';
import { BRAND_LOGO } from '@/core/brand/logo';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

const SIZE = { sm: 40, lg: 96, xl: 128 } as const;

interface Props {
  size?: keyof typeof SIZE;
  /** Orange glow under the mark (login, splash). */
  glow?: boolean;
}

/** The institute logo in a rounded square (radius ~ 35% of its size; 14 at 40px). */
export function BrandMark({ size = 'sm', glow }: Props) {
  const theme = useTheme();
  const px = SIZE[size];
  const r = size === 'sm' ? radius.md : Math.round(px * 0.3);
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={BRAND.logoLabel}
      style={{ width: px, height: px, borderRadius: r, boxShadow: glow ? theme.brandGlow : theme.elev1 }}
    >
      <Image source={BRAND_LOGO} style={{ width: px, height: px, borderRadius: r }} resizeMode="cover" />
    </View>
  );
}
