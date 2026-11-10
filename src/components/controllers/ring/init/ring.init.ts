import type { ToneKey } from '@/core/theme/tones';

export const RING_SIZE = { sm: 64, md: 92, lg: 188, xl: 220 } as const;
export const RING_STROKE = { sm: 7, md: 10, lg: 18, xl: 22 } as const;
export type RingSize = keyof typeof RING_SIZE;

export interface RingProps {
  /** 0-100, or null when unknown (draws an empty track). */
  percent: number | null;
  size?: RingSize;
  /** `brand` = orange gradient (#F9A272 -> #F16726 -> #D4541A); any other tone = that tone's color. */
  tone?: ToneKey | 'brand';
  /** Soft orange glow behind the ring. */
  glow?: boolean;
  /** Replays the sweep when it changes (e.g. selected child). */
  replayKey?: string | number;
  children?: React.ReactNode;
}

/** Extra canvas around the ring so the glow can bleed outside the stroke. */
export function glowPad(size: RingSize, glow?: boolean): number {
  return glow ? Math.round(RING_STROKE[size] * 1.6) : 0;
}
