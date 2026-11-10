import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { radius as radii, space, type Radius, type Space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props {
  children?: ReactNode;
  /** `soft` = airy card glass, `strong` = sheets and the tab bar. */
  strength?: 'soft' | 'strong';
  radius?: Radius;
  padding?: Space;
  gap?: Space;
  shadow?: 'card' | 'elev2' | 'elev3' | 'none';
  /** Soft orange wash from the top, for hero surfaces. */
  glow?: boolean;
  flex?: number;
}

/**
 * Frosted surface: shadow holder > clipped layer [BlurView (where it works) + translucent fill + top highlight].
 * Legibility never depends on the blur: the translucent fill is always drawn.
 */
export function GlassSurface({
  children, strength = 'soft', radius = 'xl', padding = 'none', gap = 'none', shadow = 'card', glow, flex,
}: Props) {
  const theme = useTheme();
  const r = radii[radius];
  const useBlur = Platform.OS !== 'android';
  const fill = strength === 'strong' ? theme.glassBgStrong : theme.surface;
  const shadowValue = shadow === 'none' ? undefined : shadow === 'card' ? theme.cardShadow : theme[shadow];
  return (
    <View style={{ borderRadius: r, boxShadow: shadowValue, flex }}>
      <View style={{ borderRadius: r, overflow: 'hidden', borderWidth: 1, borderColor: theme.glassBorder, flex }}>
        {useBlur ? (
          <BlurView
            intensity={theme.glassBlur}
            tint={theme.scheme === 'dark' ? 'dark' : 'light'}
            style={{ position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 }}
          />
        ) : null}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, backgroundColor: fill,
            boxShadow: `inset 0 1px 0 ${theme.glassHighlight}`,
          }}
        />
        {glow ? (
          <LinearGradient
            pointerEvents="none"
            colors={[theme.brandAccentRing, 'transparent']}
            style={{ position: 'absolute', top: 0, start: 0, end: 0, height: '55%', opacity: 0.55 }}
          />
        ) : null}
        <View style={{ padding: space[padding], gap: space[gap], flex }}>{children}</View>
      </View>
    </View>
  );
}
