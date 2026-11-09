import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { QueryBoundary } from '@/components/QueryBoundary';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { formatLongDate, todayYmd } from '@/core/format/date';
import { useSelectedChild } from '@/core/auth/hooks';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { ChildPill } from '@/features/children/ui/ChildPill';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';
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
      header={<ScreenHeader start={<ChildPill />} end={<HeaderBell />} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <View style={{ gap: 2, paddingHorizontal: space.xs }}>
        <AppText variant="title" accessibilityRole="header">{`${ar.home.greeting} ${name}`}</AppText>
        <AppText color="textMuted">{formatLongDate(todayYmd())}</AppText>
      </View>
      <QueryBoundary query={query} skeleton={<HomeSkeleton />}>
        {(data) => (
          <>
            <HeroCard data={data} />
            <HomeGrid data={data} />
          </>
        )}
      </QueryBoundary>
    </Screen>
  );
}
