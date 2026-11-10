import { ActivityIndicator } from 'react-native';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { Icon, type IconName } from '../icon';
import { Text } from '../text';
import type { TextTone } from '../text';

export type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'danger';

interface Props {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  /** Compact 44pt height instead of 52. */
  compact?: boolean;
}

/** primary = ink fill, accent = orange fill (ink text for contrast), ghost = glass, danger = soft red. */
export function Button({ label, onPress, variant = 'primary', icon, loading, disabled, compact }: Props) {
  const theme = useTheme();
  const look: Record<ButtonVariant, { bg: string; tone: TextTone; border: string; shadow?: string }> = {
    primary: { bg: theme.brandPrimary, tone: 'onPrimary', border: 'transparent', shadow: theme.elev2 },
    accent: { bg: theme.brandAccent, tone: 'ink', border: 'transparent', shadow: theme.brandGlow },
    ghost: { bg: theme.glassBgStrong, tone: 'primary', border: theme.glassBorder, shadow: theme.elev1 },
    danger: { bg: theme.dangerSoft, tone: 'danger', border: theme.dangerBorder },
  };
  const v = look[variant];
  const inactive = disabled || loading;
  return (
    <PressableScale
      label={label} onPress={onPress} disabled={inactive} state={{ busy: !!loading }}
      outer={{ alignSelf: 'stretch', opacity: inactive ? 0.55 : 1 }}
      inner={{
        minHeight: compact ? HIT : 52, minWidth: HIT, borderRadius: radius.pill, backgroundColor: v.bg, borderWidth: 1,
        borderColor: v.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm,
        paddingHorizontal: space.xl, boxShadow: v.shadow,
      }}
    >
      {loading ? <ActivityIndicator color={variant === 'primary' ? theme.onBrandPrimary : theme.textPrimary} /> : icon ? <Icon name={icon} size="sm" tone={v.tone} /> : null}
      <Text variant="label" tone={v.tone}>{label}</Text>
    </PressableScale>
  );
}
