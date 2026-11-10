import { Card, HeroStat } from '@/components/controllers';
import type { Overview } from '@/core/api/types';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';
import { attendanceShares, heroLabel } from '../utils/home';
import { TodayStatus } from './TodayStatus';

const TONES = { present: 'success', late: 'warning', absent: 'danger' } as const;

/** Home hero: gradient attendance ring (30 days), three status bars, today's status pill. */
export function HeroCard({ data, replayKey }: { data: Overview; replayKey?: string | number }) {
  const rate = data.attendance30d.ratePercent;
  return (
    <Card variant="hero" padding="xl" gap="xl">
      <HeroStat>
        <HeroStat.Ring
          percent={rate}
          caption={ar.home.heroCaption}
          suffix={ar.common.percent}
          label={heroLabel(rate)}
          replayKey={replayKey}
        />
        <HeroStat.Legend
          items={attendanceShares(data.attendance30d).map((s) => ({
            key: s.key,
            label: ar.home[s.key],
            valueText: formatNumber(s.count, 0),
            percent: s.percent,
            tone: TONES[s.key],
          }))}
        />
      </HeroStat>
      <TodayStatus today={data.today} />
    </Card>
  );
}
