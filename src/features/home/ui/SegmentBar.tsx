import { Box, Row, Stack, Text } from '@/components/controllers';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

interface Props { present: number; late: number; absent: number; excused: number }

/** Stacked bar of the 30-day statuses plus a plain-text summary (color is not the only cue). */
export function SegmentBar({ present, late, absent, excused }: Props) {
  const total = present + late + absent + excused;
  const parts = [
    { n: present, tone: 'success' }, { n: late, tone: 'warning' },
    { n: absent, tone: 'danger' }, { n: excused, tone: 'info' },
  ] as const;
  return (
    <Stack gap="xs" self="stretch">
      <Row gap="xs" height={8} radius="pill" overflow="hidden" bg="track">
        {total > 0 ? parts.filter((p) => p.n > 0).map((p) => <Box key={p.tone} flex={p.n} height={8} solid={p.tone} />) : null}
      </Row>
      <Text variant="caption" tone="muted">
        {`${ar.home.present} ${formatNumber(present, 0)} · ${ar.home.late} ${formatNumber(late, 0)} · ${ar.home.absent} ${formatNumber(absent, 0)}`}
      </Text>
    </Stack>
  );
}
