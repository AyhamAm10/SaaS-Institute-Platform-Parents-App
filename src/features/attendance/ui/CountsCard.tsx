import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { MiniRing } from '@/components/MiniRing';
import type { AttendanceMonth } from '@/core/api/types';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

export function CountsCard({ data }: { data: AttendanceMonth }) {
  const theme = useTheme();
  const items = [
    { label: ar.attendanceStatus.PRESENT, n: data.counts.present, color: theme.success },
    { label: ar.attendanceStatus.LATE, n: data.counts.late, color: theme.warning },
    { label: ar.attendanceStatus.ABSENT, n: data.counts.absent, color: theme.danger },
    { label: ar.attendanceStatus.EXCUSED, n: data.counts.excused, color: theme.info },
  ];
  return (
    <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.xl }}>
      <View style={{ alignItems: 'center', gap: space.xs }}>
        <MiniRing percent={data.ratePercent} size={84} />
        <AppText variant="micro" color="textMuted">{ar.attendance.rate}</AppText>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', rowGap: space.md }}>
        {items.map((it) => (
          <View key={it.label} accessible accessibilityLabel={`${it.label}: ${it.n}`} style={{ width: '50%', gap: 2 }}>
            <AppText variant="title" style={{ color: it.color }}>{formatNumber(it.n, 0)}</AppText>
            <AppText variant="caption" color="textMuted">{it.label}</AppText>
          </View>
        ))}
      </View>
    </Card>
  );
}
