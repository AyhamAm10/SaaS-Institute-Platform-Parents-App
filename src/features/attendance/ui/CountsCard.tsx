import { Card, Grid, MiniRing, Row, Stack, Text } from '@/components/controllers';
import type { AttendanceMonth } from '@/core/api/types';
import { formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

export function CountsCard({ data }: { data: AttendanceMonth }) {
  const items = [
    { label: ar.attendanceStatus.PRESENT, n: data.counts.present, tone: 'success' },
    { label: ar.attendanceStatus.LATE, n: data.counts.late, tone: 'warning' },
    { label: ar.attendanceStatus.ABSENT, n: data.counts.absent, tone: 'danger' },
    { label: ar.attendanceStatus.EXCUSED, n: data.counts.excused, tone: 'info' },
  ] as const;
  return (
    <Card variant="hero">
      <Row gap="xl">
        <Stack align="center" gap="xs">
          <MiniRing percent={data.ratePercent} size="md" />
          <Text variant="caption" tone="muted">{ar.attendance.rate}</Text>
        </Stack>
        <Stack flex={1}>
          <Grid gap="md">
            {items.map((it) => (
              <Stack key={it.label} accessible accessibilityLabel={`${it.label}: ${it.n}`}>
                <Text variant="number" tone={it.tone} tabular>{formatNumber(it.n, 0)}</Text>
                <Text variant="caption" tone="muted">{it.label}</Text>
              </Stack>
            ))}
          </Grid>
        </Stack>
      </Row>
    </Card>
  );
}
