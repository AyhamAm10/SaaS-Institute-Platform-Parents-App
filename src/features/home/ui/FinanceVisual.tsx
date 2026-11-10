import { Stack, Text } from '@/components/controllers';
import type { Overview } from '@/core/api/types';
import { formatMoney } from '@/core/format/number';

/** Remaining balance per currency (never summed across currencies). */
export function FinanceVisual({ finance }: { finance: NonNullable<Overview['finance']> }) {
  return (
    <Stack>
      {finance.currencies.map((x) => (
        <Text key={x.currency} variant="label" tabular>{formatMoney(x.remaining, x.currency)}</Text>
      ))}
    </Stack>
  );
}
