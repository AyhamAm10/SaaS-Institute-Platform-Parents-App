import { Card, ListItem, SectionHeader, Stack, StatusPill, Text } from '@/components/controllers';
import type { PaymentRow } from '@/core/api/types';
import { formatFullDate } from '@/core/format/date';
import { formatMoney } from '@/core/format/number';
import { paymentMethodLabel } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

export function PaymentsList({ payments }: { payments: PaymentRow[] }) {
  return (
    <Stack gap="sm">
      <SectionHeader title={ar.finance.payments} />
      <Card padding="sm" gap="none">
        {payments.length === 0 ? <Text tone="muted">{ar.finance.noPayments}</Text> : payments.map((p) => {
          const cancelled = p.status === 'CANCELLED';
          return (
            <ListItem
              key={p.id}
              icon="receipt"
              tone={cancelled ? 'neutral' : 'success'}
              title={`${ar.finance.receipt} ${p.receiptNumber}`}
              subtitle={`${formatFullDate(p.date)} · ${paymentMethodLabel(p.method)}`}
              label={`${ar.finance.receipt} ${p.receiptNumber}، ${formatFullDate(p.date)}، ${paymentMethodLabel(p.method)}، ${formatMoney(p.amount, p.currency)}${cancelled ? `، ${ar.finance.cancelledPayment}` : ''}`}
              end={
                <Stack align="end" gap="xs">
                  <Text variant="label" tone={cancelled ? 'muted' : 'success'} strike={cancelled} tabular>{formatMoney(p.amount, p.currency)}</Text>
                  {cancelled ? <StatusPill label={ar.finance.cancelledPayment} tone="danger" /> : null}
                </Stack>
              }
            />
          );
        })}
      </Card>
    </Stack>
  );
}
