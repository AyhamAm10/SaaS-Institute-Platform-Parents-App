import { useState } from 'react';
import { View } from 'react-native';
import { Card } from '@/components/Card';
import { QueryBoundary } from '@/components/QueryBoundary';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Skeleton } from '@/components/Skeleton';
import type { AttendanceDay } from '@/core/api/types';
import { monthKeyOf } from '@/core/format/month';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { ChildPill } from '@/features/children/ui/ChildPill';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';
import { useAttendanceMonth } from '../hooks/useAttendanceMonth';
import { indexByDate } from '../utils/days';
import { CalendarGrid } from './CalendarGrid';
import { CountsCard } from './CountsCard';
import { DaySheet } from './DaySheet';
import { IssuesList } from './IssuesList';
import { MonthNavigator } from './MonthNavigator';

function AttendanceSkeleton() {
  return (
    <View style={{ gap: space.lg }}>
      <Card><Skeleton height={84} round={24} /></Card>
      <Card><Skeleton height={260} round={24} /></Card>
    </View>
  );
}

export function AttendanceScreen() {
  const [month, setMonth] = useState(monthKeyOf());
  const [selected, setSelected] = useState<AttendanceDay | null>(null);
  const query = useAttendanceMonth(month);
  return (
    <Screen
      withTabBar
      header={<ScreenHeader start={<ChildPill />} end={<HeaderBell />} />}
      refreshing={query.isRefetching && !query.isPlaceholderData}
      onRefresh={() => void query.refetch()}
    >
      <MonthNavigator month={month} onChange={setMonth} />
      <QueryBoundary query={query} skeleton={<AttendanceSkeleton />}>
        {(data) => (
          <View style={{ gap: space.lg, opacity: query.isPlaceholderData ? 0.6 : 1 }} accessibilityLabel={ar.attendance.title}>
            <CountsCard data={data} />
            <CalendarGrid month={month} byDate={indexByDate(data.days)} onSelect={setSelected} />
            <IssuesList days={data.days} onSelect={setSelected} />
          </View>
        )}
      </QueryBoundary>
      <DaySheet day={selected} onClose={() => setSelected(null)} />
    </Screen>
  );
}
