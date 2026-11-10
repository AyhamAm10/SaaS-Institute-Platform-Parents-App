import type { ReactNode } from 'react';
import { Stack } from '../layout';
import { HeroLegend } from './ui/HeroLegend';
import { HeroRing } from './ui/HeroRing';

/** Hero statistic block. Compound: HeroStat.Ring (big gradient ring + count-up), HeroStat.Legend (status bars). */
export function HeroStat({ children }: { children: ReactNode }) {
  return <Stack gap="xl" align="stretch">{children}</Stack>;
}

HeroStat.Ring = HeroRing;
HeroStat.Legend = HeroLegend;
