import { formatPercent } from '@/core/format/number';
import type { ToneKey } from '@/core/theme/tones';
import { Ring } from '../ring';
import { Text } from '../text';

interface Props {
  percent: number | null;
  tone?: ToneKey | 'brand';
  size?: 'sm' | 'md';
}

/** Compact ring with the percent inside, for tiles and subject cards. */
export function MiniRing({ percent, tone = 'brand', size = 'sm' }: Props) {
  return (
    <Ring percent={percent} size={size} tone={tone}>
      <Text variant={size === 'sm' ? 'label' : 'heading'} tabular>{formatPercent(percent)}</Text>
    </Ring>
  );
}
