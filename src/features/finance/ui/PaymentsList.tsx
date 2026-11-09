import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { StatChip } from '@/components/StatChip';
import type { PaymentRow } from '@/core/api/types';
import { formatFullDate } from '@/core/format/date';
import { formatMoney } from '@/core/format/number';
import { paymentMethodLabel } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

export function PaymentsList({ payments }: { payments: PaymentRow[] }) {
  const theme = useTheme();
  return (
    <View style={{ gap: space.sm }}>
      <SectionHeader title={ar.finance.payments} />
      <Card padding={space.lg} style={{ gap: space.lg }}>
        {payments.length === 0 ? <AppText color="textMuted">{ar.finance.noPayments}</AppText> : payments.map((p) => {
          const cancelled = p.status === 'CANCELLED';
          return (
            <View key={p.id} accessible accessibilityLabel={`${ar.finance.receipt} ${p.receiptNumber}، ${formatFullDate(p.date)}، ${paymentMethodLabel(p.method)}، ${formatMoney(p.amount, p.currency)}${cancelled ? `، ${ar.finance.cancelledPayment}` : ''}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText variant="bodyStrong">{`${ar.finance.receipt} ${p.receiptNumber}`}</AppText>
                <AppText variant="caption" color="textMuted">{`${formatFullDate(p.date)} · ${paymentMethodLabel(p.method)}`}</AppText>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <AppText variant="bodyStrong" style={{ color: cancelled ? theme.textMuted : theme.success, textDecorationLine: cancelled ? 'line-through' : 'none' }}>
                  {formatMoney(p.amount, p.currency)}
                </AppText>
                {cancelled ? <StatChip label={ar.finance.cancelledPayment} tone="danger" /> : null}
              </View>
            </View>
          );
        })}
      </Card>
    </View>
  );
}
