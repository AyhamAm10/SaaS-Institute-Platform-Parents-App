import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { QueryBoundary } from '@/components/QueryBoundary';
import { Ring } from '@/components/Ring';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { Skeleton } from '@/components/Skeleton';
import { formatNumber } from '@/core/format/number';
import { percentTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ChildPill } from '@/features/children/ui/ChildPill';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';
import { useResults } from '../hooks/useResults';
import { SubjectCard } from './SubjectCard';
import { UpcomingExams } from './UpcomingExams';

export function MarksScreen() {
  const theme = useTheme();
  const query = useResults();
  return (
    <Screen
      withTabBar
      header={<ScreenHeader start={<ChildPill />} end={<HeaderBell />} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<View style={{ gap: space.lg }}><Card><Skeleton height={200} round={100} width={200} style={{ alignSelf: 'center' }} /></Card><Card><Skeleton height={60} /></Card></View>}
      >
        {(data) => {
          const tone = percentTone(data.averagePercent);
          return (
            <>
              <Card style={{ alignItems: 'center' }}>
                <Ring percent={data.averagePercent} size={188} stroke={18} color={tone === 'neutral' ? theme.accent : theme[tone]}>
                  <View accessible accessibilityLabel={`${ar.marks.overall}: ${data.averagePercent === null ? ar.marks.noAverage : `${data.averagePercent}${ar.common.percent}`}`} style={{ alignItems: 'center' }}>
                    <AppText variant="display">{data.averagePercent === null ? '—' : formatNumber(Math.round(data.averagePercent), 0)}</AppText>
                    <AppText variant="caption" color="textMuted">{ar.marks.overall}</AppText>
                  </View>
                </Ring>
              </Card>
              <SectionHeader title={ar.marks.subjects} />
              {data.subjects.length === 0
                ? <Card><EmptyState icon="ribbon-outline" title={ar.marks.empty} /></Card>
                : data.subjects.map((s) => <SubjectCard key={s.subjectId} item={s} />)}
              <UpcomingExams items={data.upcoming} />
            </>
          );
        }}
      </QueryBoundary>
    </Screen>
  );
}
