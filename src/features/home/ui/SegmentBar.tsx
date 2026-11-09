import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { present: number; late: number; absent: number; excused: number }

/** Stacked bar of the 30-day statuses plus a plain-text summary (color is not the only cue). */
export function SegmentBar({ present, late, absent, excused }: Props) {
  const theme = useTheme();
  const total = present + late + absent + excused;
  const parts = [
    { n: present, c: theme.success }, { n: late, c: theme.warning },
    { n: absent, c: theme.danger }, { n: excused, c: theme.info },
  ];
  return (
    <View style={{ width: '100%', gap: space.xs }}>
      <View style={{ flexDirection: 'row', height: 8, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: theme.track, gap: 2 }}>
        {total > 0 ? parts.filter((p) => p.n > 0).map((p, i) => <View key={i} style={{ flex: p.n, backgroundColor: p.c }} />) : null}
      </View>
      <AppText variant="micro" color="textMuted">
        {`${ar.home.present} ${formatNumber(present, 0)} · ${ar.home.late} ${formatNumber(late, 0)} · ${ar.home.absent} ${formatNumber(absent, 0)}`}
      </AppText>
    </View>
  );
}
