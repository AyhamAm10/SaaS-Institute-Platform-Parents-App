import type { ToneKey } from '@/core/theme/tones';
import { Row } from '../../layout';
import { ProgressBar } from '../../progress-bar';

export interface LegendItem { key: string; label: string; valueText: string; percent: number; tone: ToneKey }

/** Three (or more) status bars side by side. */
export function HeroLegend({ items }: { items: LegendItem[] }) {
  return (
    <Row gap="lg" align="start">
      {items.map((it) => <ProgressBar key={it.key} label={it.label} valueText={it.valueText} percent={it.percent} tone={it.tone} />)}
    </Row>
  );
}
