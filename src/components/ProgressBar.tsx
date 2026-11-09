import { View } from 'react-native';
import { clampPercent } from '@/core/format/number';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';

interface Props {
  label: string;
  /** Right-hand value text (e.g. count). */
  valueText: string;
  percent: number;
  color: string;
}

/** Slim labelled bar: label + value on one line, thin rounded track underneath. */
export function ProgressBar({ label, valueText, percent, color }: Props) {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${label}: ${valueText}`}
      style={{ flex: 1, gap: space.xs + 2 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: space.xs }}>
        <AppText variant="captionStrong" numberOfLines={1}>{label}</AppText>
        <AppText variant="micro" color="textMuted">{valueText}</AppText>
      </View>
      <View style={{ height: 6, borderRadius: radius.pill, backgroundColor: theme.track, overflow: 'hidden' }}>
        <View
          style={{
            width: `${clampPercent(percent)}%`,
            height: '100%',
            borderRadius: radius.pill,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}
