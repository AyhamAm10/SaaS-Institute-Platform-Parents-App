import { Redirect } from 'expo-router';
import { Share, View } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { QueryBoundary } from '@/components/QueryBoundary';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/EmptyState';
import { useSelectedChild } from '@/core/auth/hooks';
import { useIsFamily, useSession } from '@/core/auth/store';
import { todayYmd } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';
import { useFinance } from '../hooks/useFinance';
import { buildStatement } from '../utils/statement';
import { ContractCard } from './ContractCard';
import { PaymentsList } from './PaymentsList';
import { TotalsCard } from './TotalsCard';

export function FinanceScreen() {
  const isFamily = useIsFamily();
  const query = useFinance();
  const child = useSelectedChild();
  const institute = useSession((s) => s.me?.institute.name ?? '');
  if (!isFamily) return <Redirect href="/" />;

  return (
    <Screen
      header={<ScreenHeader back title={ar.finance.title} end={<HeaderBell />} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<View style={{ gap: space.lg }}>{[0, 1].map((i) => <Card key={i}><Skeleton height={110} round={24} /></Card>)}</View>}
      >
        {(data) => (
          data.totals.length === 0 && data.contracts.length === 0 ? (
            <Card><EmptyState icon="wallet-outline" title={ar.finance.empty} /></Card>
          ) : (
            <>
              <Button
                label={ar.finance.share}
                icon="share-outline"
                variant="soft"
                onPress={() => void Share.share({ message: buildStatement(child?.fullName ?? '', institute, data, todayYmd()) })}
              />
              <SectionHeader title={ar.finance.summary} />
              {data.totals.map((t) => <TotalsCard key={t.currency} t={t} />)}
              <SectionHeader title={ar.finance.contracts} />
              {data.contracts.map((c) => <ContractCard key={c.id} c={c} />)}
              <PaymentsList payments={data.payments} />
            </>
          )
        )}
      </QueryBoundary>
    </Screen>
  );
}
