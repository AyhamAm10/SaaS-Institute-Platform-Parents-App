import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { Ring } from '@/components/Ring';
import { formatNumber } from '@/core/format/number';
import type { Overview } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { attendanceShares } from '../utils/home';
import { TodayStatus } from './TodayStatus';

export function HeroCard({ data }: { data: Overview }) {
  const theme = useTheme();
  const rate = data.attendance30d.ratePercent;
  const colors = { present: theme.success, late: theme.warning, absent: theme.danger } as const;
  const rateText = rate === null ? '—' : formatNumber(Math.round(rate), 0);
  return (
    <Card style={{ gap: space.xl }}>
      <View style={{ alignItems: 'center' }}>
        <Ring percent={rate} size={208} stroke={20}>
          <View
            accessible
            accessibilityLabel={`${ar.home.heroCaption}: ${rate === null ? ar.home.rateUnknown : `${rateText} ${ar.common.percent}`}`}
            style={{ alignItems: 'center', maxWidth: 140 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <AppText variant="display">{rateText}</AppText>
              {rate === null ? null : <AppText variant="heading" color="textMuted" style={{ marginTop: 6 }}>{ar.common.percent}</AppText>}
            </View>
            <AppText variant="caption" color="textMuted" center>{ar.home.heroCaption}</AppText>
          </View>
        </Ring>
      </View>
      <View style={{ flexDirection: 'row', gap: space.lg }}>
        {attendanceShares(data.attendance30d).map((s) => (
          <ProgressBar key={s.key} label={ar.home[s.key]} valueText={formatNumber(s.count, 0)} percent={s.percent} color={colors[s.key]} />
        ))}
      </View>
      <TodayStatus today={data.today} />
    </Card>
  );
}
