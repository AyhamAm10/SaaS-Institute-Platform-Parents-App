import { Ring } from './Ring';
import { AppText } from './AppText';
import { formatPercent } from '@/core/format/number';

/** Small ring with the percent inside, for compact cards. */
export function MiniRing({ percent, color, size = 64 }: { percent: number | null; color?: string; size?: number }) {
  return (
    <Ring percent={percent} size={size} stroke={7} color={color}>
      <AppText variant="captionStrong">{formatPercent(percent)}</AppText>
    </Ring>
  );
}
