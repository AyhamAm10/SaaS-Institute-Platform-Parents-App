import type { ReactNode } from 'react';
import { View } from 'react-native';
import { radius as radii, space, type Space } from '@/core/theme/metrics';
import { toneColors, type ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { GlassSurface } from '../glass';
import { Stack } from '../layout';
import { CardBody, CardHeader } from './ui/CardParts';

export type CardVariant = 'glass' | 'solid' | 'hero' | 'tinted';

interface Props {
  children?: ReactNode;
  variant?: CardVariant;
  /** Tone of the `tinted` variant. */
  tone?: ToneKey;
  padding?: Space;
  gap?: Space;
  onPress?: () => void;
  label?: string;
  /** Stretch to fill a grid cell. */
  fill?: boolean;
}

/** Surface container. Compound: Card.Header, Card.Body. Pressable (scale + haptic) when `onPress` is set. */
export function Card({
  children, variant = 'glass', tone = 'accent', padding = 'lg', gap = 'md', onPress, label, fill,
}: Props) {
  const theme = useTheme();
  const t = toneColors(theme, tone);
  let body: ReactNode;
  if (variant === 'solid' || variant === 'tinted') {
    const solid = variant === 'solid';
    body = (
      <View
        style={{
          borderRadius: radii.xl, padding: space[padding], gap: space[gap], flex: fill ? 1 : undefined,
          backgroundColor: solid ? theme.surfaceSolid : t.bg, borderWidth: 1, borderColor: solid ? theme.border : t.border,
          boxShadow: solid ? theme.elev1 : undefined,
        }}
      >
        {children}
      </View>
    );
  } else {
    body = (
      <GlassSurface
        strength={variant === 'hero' ? 'strong' : 'soft'} shadow={variant === 'hero' ? 'elev2' : 'card'}
        glow={variant === 'hero'} padding={padding} gap={gap} flex={fill ? 1 : undefined}
      >
        {children}
      </GlassSurface>
    );
  }
  if (!onPress) return <Stack align="stretch" flex={fill ? 1 : undefined}>{body}</Stack>;
  return (
    <PressableScale label={label} onPress={onPress} scaleTo={0.97} outer={fill ? { flex: 1 } : undefined} inner={fill ? { flex: 1 } : undefined}>
      {body}
    </PressableScale>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
