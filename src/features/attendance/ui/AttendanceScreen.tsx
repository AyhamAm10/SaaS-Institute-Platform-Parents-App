import { useState } from 'react';
import { Card, QueryBoundary, Reveal, Screen, Skeleton, Stack } from '@/components/controllers';
import type { AttendanceDay } from '@/core/api/types';
import { useSelectedChildId } from '@/core/auth/hooks';
import { monthKeyOf } from '@/core/format/month';
import { ar } from '@/core/strings/ar';
import { TabHeader } from '@/features/shell/ui/TabHeader';
import { useAttendanceMonth } from '../hooks/useAttendanceMonth';
import { indexByDate } from '../utils/days';
import { CalendarCard } from './CalendarCard';
import { CountsCard } from './CountsCard';
import { DaySheet } from './DaySheet';
import { IssuesList } from './IssuesList';
import { MonthNavigator } from './MonthNavigator';

function AttendanceSkeleton() {
  return (
    <Stack gap="lg">
      <Card><Skeleton height={84} round="lg" /></Card>
      <Card><Skeleton height={300} round="lg" /></Card>
    </Stack>
  );
}

export function AttendanceScreen() {
  const [month, setMonth] = useState(monthKeyOf());
  const [selected, setSelected] = useState<AttendanceDay | null>(null);
  const studentId = useSelectedChildId();
  const query = useAttendanceMonth(month);
  return (
    <Screen
      withTabBar
      ambient="wave"
      header={<TabHeader />}
      refreshing={query.isRefetching && !query.isPlaceholderData}
      onRefresh={() => void query.refetch()}
    >
      <Reveal index={0} replayKey={studentId}><MonthNavigator month={month} onChange={setMonth} /></Reveal>
      <QueryBoundary query={query} skeleton={<AttendanceSkeleton />}>
        {(data) => (
          <Stack gap="lg" opacity={query.isPlaceholderData ? 0.6 : 1} accessibilityLabel={ar.attendance.title}>
            <Reveal index={1} replayKey={studentId}><CountsCard data={data} /></Reveal>
            <Reveal index={2} replayKey={studentId}>
              <CalendarCard month={month} byDate={indexByDate(data.days)} onSelect={setSelected} />
            </Reveal>
            <Reveal index={3} replayKey={studentId}><IssuesList days={data.days} onSelect={setSelected} /></Reveal>
          </Stack>
        )}
      </QueryBoundary>
      <DaySheet day={selected} onClose={() => setSelected(null)} />
    </Screen>
  );
}
