import { QueryBoundary, Reveal, Screen, Stack, Text } from '@/components/controllers';
import { formatLongDate, todayYmd } from '@/core/format/date';
import { useSelectedChild } from '@/core/auth/hooks';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { TabHeader } from '@/features/shell/ui/TabHeader';
import { useOverview } from '../hooks/useOverview';
import { firstName } from '../utils/home';
import { HeroCard } from './HeroCard';
import { HomeGrid } from './HomeGrid';
import { HomeSkeleton } from './HomeSkeleton';

export function HomeScreen() {
  const query = useOverview();
  const child = useSelectedChild();
  const role = useSession((s) => s.me?.role);
  const parent = useSession((s) => s.me?.displayName);
  const name = role === 'STUDENT' ? firstName(child?.fullName ?? '') : firstName(parent ?? '');

  return (
    <Screen
      withTabBar
      ambient="dawn"
      header={<TabHeader />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <Reveal index={0}>
        <Stack px="xs">
          <Text variant="title" accessibilityRole="header">{`${ar.home.greeting} ${name}`}</Text>
          <Text tone="muted">{formatLongDate(todayYmd())}</Text>
        </Stack>
      </Reveal>
      <QueryBoundary query={query} skeleton={<HomeSkeleton />}>
        {(data) => (
          <>
            <Reveal index={1} replayKey={child?.id}><HeroCard data={data} replayKey={child?.id} /></Reveal>
            <HomeGrid data={data} />
          </>
        )}
      </QueryBoundary>
    </Screen>
  );
}
