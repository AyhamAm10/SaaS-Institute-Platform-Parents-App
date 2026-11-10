import { radius, space } from '@/core/theme/metrics';
import { toneColors, type ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { View } from 'react-native';
import { Icon, type IconName } from '../icon';
import { Text } from '../text';

interface Props {
  label: string;
  tone?: ToneKey;
  icon?: IconName;
  /** Larger pill for hero placement. */
  large?: boolean;
}

/** Tinted status pill: text + optional icon (color is never the only signal). */
export function StatusPill({ label, tone = 'neutral', icon, large }: Props) {
  const theme = useTheme();
  const t = toneColors(theme, tone);
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={{
        flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: space.xs,
        paddingHorizontal: large ? space.lg : space.md, paddingVertical: large ? space.sm : space.xs,
        borderRadius: radius.pill, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border,
      }}
    >
      {icon ? <Icon name={icon} size="xs" tone={tone} /> : null}
      <Text variant="label" tone={tone}>{label}</Text>
    </View>
  );
}
