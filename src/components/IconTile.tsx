import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Tone } from '@/core/format/status';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useToneColors } from './StatChip';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  tone?: Tone | 'accent';
  size?: number;
}

/** Pastel rounded-square tile holding an icon. */
export function IconTile({ icon, tone = 'accent', size = 40 }: Props) {
  const theme = useTheme();
  const t = useToneColors(tone === 'accent' ? 'neutral' : tone);
  const fg = tone === 'accent' ? theme.accent : t.fg;
  const bg = tone === 'accent' ? theme.tints.accent : t.bg;
  return (
    <View
      aria-hidden
      style={{ width: size, height: size, borderRadius: size * 0.35, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}
    >
      <Ionicons name={icon} size={size * 0.5} color={fg} />
    </View>
  );
}
