import { Card, MiniRing, Row, Stack, Text } from '@/components/controllers';
import type { CurrencyTotals } from '@/core/api/types';
import { formatMoney } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

export function TotalsCard({ t }: { t: CurrencyTotals }) {
  const paidPercent = t.total > 0 ? (t.paid / t.total) * 100 : 0;
  const rows = [
    { label: ar.finance.total, value: t.total, tone: 'primary' },
    { label: ar.finance.paid, value: t.paid, tone: 'success' },
    ...(t.overdue > 0 ? [{ label: ar.finance.overdue, value: t.overdue, tone: 'danger' } as const] : []),
  ] as const;
  return (
    <Card variant="hero" gap="lg">
      <Row gap="lg">
        <MiniRing percent={paidPercent} tone="success" size="md" />
        <Stack flex={1} accessible accessibilityLabel={`${ar.finance.remaining} ${formatMoney(t.remaining, t.currency)}`}>
          <Text variant="caption" tone="muted">{ar.finance.remaining}</Text>
          <Text variant="title" adjustsFontSizeToFit numberOfLines={1} tabular>{formatMoney(t.remaining, t.currency)}</Text>
        </Stack>
      </Row>
      <Row justify="between" gap="md" align="start">
        {rows.map((r) => (
          <Stack key={r.label} flex={1}>
            <Text variant="caption" tone="muted">{r.label}</Text>
            <Text variant="label" tone={r.tone} tabular>{formatMoney(r.value, t.currency)}</Text>
          </Stack>
        ))}
      </Row>
    </Card>
  );
}
