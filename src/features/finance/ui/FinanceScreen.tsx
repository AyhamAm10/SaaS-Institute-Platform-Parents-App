import { Redirect } from 'expo-router';
import { Share } from 'react-native';
import { BRAND } from '@/core/brand';
import { Button, Card, EmptyState, QueryBoundary, Reveal, Screen, SectionHeader, Skeleton, Stack } from '@/components/controllers';
import { useSelectedChild } from '@/core/auth/hooks';
import { useIsFamily } from '@/core/auth/store';
import { todayYmd } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { StackHeader } from '@/features/shell/ui/StackHeader';
import { useFinance } from '../hooks/useFinance';
import { buildStatement } from '../utils/statement';
import { ContractCard } from './ContractCard';
import { PaymentsList } from './PaymentsList';
import { TotalsCard } from './TotalsCard';

export function FinanceScreen() {
  const isFamily = useIsFamily();
  const query = useFinance();
  const child = useSelectedChild();
  if (!isFamily) return <Redirect href="/" />;

  return (
    <Screen
      ambient="ember"
      header={<StackHeader title={ar.finance.title} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<Stack gap="lg">{[0, 1].map((i) => <Card key={i}><Skeleton height={110} round="lg" /></Card>)}</Stack>}
      >
        {(data) => (
          data.totals.length === 0 && data.contracts.length === 0 ? (
            <Card><EmptyState art="wallet" title={ar.finance.empty} /></Card>
          ) : (
            <>
              <SectionHeader title={ar.finance.summary} />
              {data.totals.map((t, i) => <Reveal key={t.currency} index={i}><TotalsCard t={t} /></Reveal>)}
              <SectionHeader title={ar.finance.contracts} />
              {data.contracts.map((c, i) => <Reveal key={c.id} index={i + 2}><ContractCard c={c} /></Reveal>)}
              <PaymentsList payments={data.payments} />
              <Button
                label={ar.finance.share}
                icon="share-social"
                variant="ghost"
                onPress={() => void Share.share({ message: buildStatement(child?.fullName ?? '', BRAND.name, data, todayYmd()) })}
              />
            </>
          )
        )}
      </QueryBoundary>
    </Screen>
  );
}
