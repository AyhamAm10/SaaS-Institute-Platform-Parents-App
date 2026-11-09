import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { MiniRing } from '@/components/MiniRing';
import type { CurrencyTotals } from '@/core/api/types';
import { formatMoney } from '@/core/format/number';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

export function TotalsCard({ t }: { t: CurrencyTotals }) {
  const theme = useTheme();
  const paidPercent = t.total > 0 ? (t.paid / t.total) * 100 : 0;
  const rows = [
    { label: ar.finance.total, value: t.total, color: theme.text },
    { label: ar.finance.paid, value: t.paid, color: theme.success },
    ...(t.overdue > 0 ? [{ label: ar.finance.overdue, value: t.overdue, color: theme.danger }] : []),
  ];
  return (
    <Card style={{ gap: space.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
        <MiniRing percent={paidPercent} color={theme.success} size={76} />
        <View style={{ flex: 1 }} accessible accessibilityLabel={`${ar.finance.remaining} ${formatMoney(t.remaining, t.currency)}`}>
          <AppText variant="caption" color="textMuted">{ar.finance.remaining}</AppText>
          <AppText variant="title" adjustsFontSizeToFit numberOfLines={1}>{formatMoney(t.remaining, t.currency)}</AppText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: space.md }}>
        {rows.map((r) => (
          <View key={r.label} style={{ flex: 1 }}>
            <AppText variant="micro" color="textMuted">{r.label}</AppText>
            <AppText variant="captionStrong" style={{ color: r.color }} numberOfLines={1}>{formatMoney(r.value, t.currency)}</AppText>
          </View>
        ))}
      </View>
    </Card>
  );
}
