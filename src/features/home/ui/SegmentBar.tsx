import { Box, Row, Stack, Text } from '@/components/controllers';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

interface Props { present: number; late: number; absent: number; excused: number }

/**
 * Stacked bar of the 30-day statuses with a legend of three equal columns (number over label),
 * so it never wraps mid-phrase in a narrow tile; color is not the only cue.
 */
export function SegmentBar({ present, late, absent, excused }: Props) {
  const total = present + late + absent + excused;
  const parts = [
    { n: present, tone: 'success' }, { n: late, tone: 'warning' },
    { n: absent, tone: 'danger' }, { n: excused, tone: 'info' },
  ] as const;
  const legend = [
    { label: ar.home.present, n: present, tone: 'success' },
    { label: ar.home.late, n: late, tone: 'warning' },
    { label: ar.home.absent, n: absent, tone: 'danger' },
  ] as const;
  return (
    <Stack gap="sm" self="stretch">
      <Row gap="xs" height={8} radius="pill" overflow="hidden" bg="track">
        {total > 0 ? parts.filter((p) => p.n > 0).map((p) => <Box key={p.tone} flex={p.n} height={8} solid={p.tone} />) : null}
      </Row>
      <Row>
        {legend.map((l) => (
          <Stack key={l.label} flex={1} gap="none" accessible accessibilityLabel={`${l.label} ${l.n}`}>
            <Text variant="label" tone={l.tone} tabular>{formatNumber(l.n, 0)}</Text>
            <Text variant="caption" tone="muted" numberOfLines={1}>{l.label}</Text>
          </Stack>
        ))}
      </Row>
    </Stack>
  );
}
