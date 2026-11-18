import { Card, MiniRing, Row, Stack, StatusPill, Text } from '@/components/controllers';
import type { CurrencyTotals } from '@/core/api/types';
import { formatMoney, formatNumber } from '@/core/format/number';
import { ar } from '@/core/strings/ar';

/**
 * One currency's balance. The currency is named once (pill next to "remaining") and the amounts are bare
 * numbers, so big Syrian-pound figures never get truncated or wrap their unit onto a second line.
 */
export function TotalsCard({ t }: { t: CurrencyTotals }) {
  const paidPercent = t.total > 0 ? (t.paid / t.total) * 100 : 0;
  const digits = t.currency === 'USD' ? 2 : 0;
  const rows = [
    { label: ar.finance.total, value: t.total, tone: 'primary' },
    { label: ar.finance.paid, value: t.paid, tone: 'success' },
    ...(t.overdue > 0 ? [{ label: ar.finance.overdue, value: t.overdue, tone: 'danger' } as const] : []),
  ] as const;
  return (
    <Card variant="hero" gap="lg">
      <Row gap="lg">
        <MiniRing percent={paidPercent} tone="success" size="md" />
        <Stack flex={1} gap="xs" accessible accessibilityLabel={`${ar.finance.remaining} ${formatMoney(t.remaining, t.currency)}`}>
          <Row gap="sm">
            <Text variant="caption" tone="muted">{ar.finance.remaining}</Text>
            <StatusPill label={ar.finance.currencyName[t.currency]} tone="neutral" />
          </Row>
          <Text variant="title" adjustsFontSizeToFit numberOfLines={1} tabular>{formatNumber(t.remaining, digits)}</Text>
        </Stack>
      </Row>
      <Row justify="between" gap="md" align="start">
        {rows.map((r) => (
          <Stack key={r.label} flex={1} accessible accessibilityLabel={`${r.label} ${formatMoney(r.value, t.currency)}`}>
            <Text variant="caption" tone="muted">{r.label}</Text>
            <Text variant="label" tone={r.tone} tabular numberOfLines={1}>{formatNumber(r.value, digits)}</Text>
          </Stack>
        ))}
      </Row>
    </Card>
  );
}
