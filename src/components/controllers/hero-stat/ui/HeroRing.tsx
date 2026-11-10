import { Stack } from '../../layout';
import { Ring } from '../../ring';
import { Text } from '../../text';

interface Props {
  /** 0-100 or null. */
  percent: number | null;
  /** Caption under the number. */
  caption: string;
  suffix: string;
  /** Spoken description of the whole ring. */
  label: string;
  replayKey?: string | number;
}

export function HeroRing({ percent, caption, suffix, label, replayKey }: Props) {
  const value = percent === null ? null : Math.round(percent);
  return (
    <Stack align="center" accessible accessibilityRole="image" accessibilityLabel={label}>
      <Ring percent={percent} size="xl" glow replayKey={replayKey}>
        <Stack align="center" maxWidth={130}>
          <Ring.Value value={value} suffix={suffix} replayKey={replayKey} />
          <Text variant="caption" tone="muted" align="center">{caption}</Text>
        </Stack>
      </Ring>
    </Stack>
  );
}
