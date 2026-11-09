import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FORWARD_ICON } from '@/core/layout/rtl';
import { tapHaptic } from '@/core/layout/haptics';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';
import { IconTile } from './IconTile';
import type { Tone } from '@/core/format/status';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  tone?: Tone | 'accent';
  selected?: boolean;
  chevron?: boolean;
}

/** Tappable list row (icon tile + text + chevron/check), used in sheets and the More screen. */
export function SheetRow({ icon, title, subtitle, onPress, tone = 'accent', selected, chevron = true }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}، ${subtitle}` : title}
      accessibilityState={{ selected: !!selected }}
      onPress={() => {
        tapHaptic();
        onPress();
      }}
      style={({ pressed }) => ({
        minHeight: HIT + 16, flexDirection: 'row', alignItems: 'center', gap: space.md,
        paddingVertical: space.sm, paddingHorizontal: space.md, borderRadius: radius.md,
        backgroundColor: selected ? theme.tints.accent : pressed ? theme.track : 'transparent',
      })}
    >
      <IconTile icon={icon} tone={tone} />
      <View style={{ flex: 1 }}>
        <AppText variant="bodyStrong">{title}</AppText>
        {subtitle ? <AppText variant="caption" color="textMuted">{subtitle}</AppText> : null}
      </View>
      {selected ? <Ionicons name="checkmark-circle" size={22} color={theme.accent} /> : chevron ? <Ionicons name={FORWARD_ICON} size={18} color={theme.textMuted} /> : null}
    </Pressable>
  );
}
