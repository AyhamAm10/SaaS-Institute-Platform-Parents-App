import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Tone } from '@/core/format/status';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';

export function useToneColors(tone: Tone) {
  const theme = useTheme();
  if (tone === 'neutral') return { fg: theme.textMuted, bg: theme.track };
  return { fg: theme[tone], bg: theme.tints[tone] };
}

interface Props {
  label: string;
  tone?: Tone;
  icon?: keyof typeof Ionicons.glyphMap;
}

/** Small tinted status chip (text + optional icon; color is never the only signal). */
export function StatChip({ label, tone = 'neutral', icon }: Props) {
  const { fg, bg } = useToneColors(tone);
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={{
        flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: space.xs,
        paddingHorizontal: space.md, paddingVertical: space.xs + 1, borderRadius: radius.pill, backgroundColor: bg,
      }}
    >
      {icon ? <Ionicons name={icon} size={14} color={fg} /> : null}
      <AppText variant="captionStrong" style={{ color: fg }}>{label}</AppText>
    </View>
  );
}
