import { formatNumber } from '@/core/format/number';
import { Row } from '../../layout';
import { Text } from '../../text';
import { useCountUp } from '../state/useCountUp';

interface Props {
  /** Number to count up to; null renders an em dash. */
  value: number | null;
  suffix?: string;
  replayKey?: string | number;
}

/** Big centered number (Alexandria 600) that counts up with the ring sweep. */
export function RingValue({ value, suffix, replayKey }: Props) {
  const shown = useCountUp(value ?? 0, replayKey);
  return (
    <Row align="start" gap="xs" aria-hidden>
      <Text variant="display" tabular>{value === null ? '—' : formatNumber(shown, 0)}</Text>
      {value !== null && suffix ? <Text variant="heading" tone="muted">{suffix}</Text> : null}
    </Row>
  );
}
