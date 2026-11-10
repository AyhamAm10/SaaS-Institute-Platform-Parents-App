import { Card, Row, Stack, StatusPill, Text, Timeline } from '@/components/controllers';
import type { Contract, Installment } from '@/core/api/types';
import { formatFullDate } from '@/core/format/date';
import { isolateLtr } from '@/core/format/bidi';
import { formatMoney } from '@/core/format/number';
import { installmentLabel, installmentTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

function InstallmentItem({ i, currency, last }: { i: Installment; currency: Contract['currency']; last: boolean }) {
  const tone = installmentTone(i.status);
  return (
    <Timeline.Item
      tone={tone}
      active={i.status === 'DUE'}
      last={last}
      label={`${ar.finance.installment} ${i.number}، ${formatFullDate(i.dueDate)}، ${formatMoney(i.amount, currency)}، ${installmentLabel(i.status)}`}
    >
      <Stack gap="xs">
        <Row justify="between" gap="sm">
          <Text variant="label">{`${ar.finance.installment} ${i.number}`}</Text>
          <StatusPill label={installmentLabel(i.status)} tone={tone} />
        </Row>
        <Text variant="caption" tone="muted">{formatFullDate(i.dueDate)}</Text>
        <Text variant="label" tabular>
          {formatMoney(i.amount, currency)}
          {i.status === 'PARTIAL' ? `  ·  ${ar.finance.remaining} ${formatMoney(i.remaining, currency)}` : ''}
        </Text>
      </Stack>
    </Timeline.Item>
  );
}

/** Contract summary + installment timeline with status chips. */
export function ContractCard({ c }: { c: Contract }) {
  return (
    <Card gap="lg">
      <Card.Header
        title={isolateLtr(c.yearName)}
        subtitle={`${ar.finance.total} ${formatMoney(c.total, c.currency)}${c.discount > 0 ? `  ·  ${ar.finance.discount} ${formatMoney(c.discount, c.currency)}` : ''}`}
      />
      <Timeline>
        {c.installments.map((i, idx) => <InstallmentItem key={i.id} i={i} currency={c.currency} last={idx === c.installments.length - 1} />)}
      </Timeline>
    </Card>
  );
}
