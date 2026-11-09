import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { StatChip } from '@/components/StatChip';
import type { Contract, Installment } from '@/core/api/types';
import { formatFullDate } from '@/core/format/date';
import { formatMoney } from '@/core/format/number';
import { installmentLabel, installmentTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

function InstallmentRow({ i, currency, last }: { i: Installment; currency: Contract['currency']; last: boolean }) {
  const theme = useTheme();
  const tone = installmentTone(i.status);
  const dot = tone === 'neutral' ? theme.textMuted : theme[tone];
  return (
    <View accessible accessibilityLabel={`${ar.finance.installment} ${i.number}، ${formatFullDate(i.dueDate)}، ${formatMoney(i.amount, currency)}، ${installmentLabel(i.status)}`}
      style={{ flexDirection: 'row', gap: space.md }}>
      <View style={{ alignItems: 'center', width: 16 }}>
        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: dot, marginTop: 4 }} />
        {last ? null : <View style={{ flex: 1, width: 2, backgroundColor: theme.border }} />}
      </View>
      <View style={{ flex: 1, paddingBottom: last ? 0 : space.lg, gap: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: space.sm }}>
          <AppText variant="bodyStrong">{`${ar.finance.installment} ${i.number}`}</AppText>
          <StatChip label={installmentLabel(i.status)} tone={tone} />
        </View>
        <AppText variant="caption" color="textMuted">{formatFullDate(i.dueDate)}</AppText>
        <AppText variant="captionStrong">
          {formatMoney(i.amount, currency)}
          {i.status === 'PARTIAL' ? `  ·  ${ar.finance.remaining} ${formatMoney(i.remaining, currency)}` : ''}
        </AppText>
      </View>
    </View>
  );
}

export function ContractCard({ c }: { c: Contract }) {
  return (
    <Card style={{ gap: space.lg }}>
      <View style={{ gap: 2 }}>
        <AppText variant="heading">{c.yearName}</AppText>
        <AppText variant="caption" color="textMuted">
          {`${ar.finance.total} ${formatMoney(c.total, c.currency)}`}
          {c.discount > 0 ? `  ·  ${ar.finance.discount} ${formatMoney(c.discount, c.currency)}` : ''}
        </AppText>
      </View>
      <View>
        {c.installments.map((i, idx) => <InstallmentRow key={i.id} i={i} currency={c.currency} last={idx === c.installments.length - 1} />)}
      </View>
    </Card>
  );
}
