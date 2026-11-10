import { Card, EmptyState, HeroStat, QueryBoundary, Reveal, Screen, SectionHeader, Skeleton, Stack } from '@/components/controllers';
import { useSelectedChildId } from '@/core/auth/hooks';
import { ar } from '@/core/strings/ar';
import { TabHeader } from '@/features/shell/ui/TabHeader';
import { useResults } from '../hooks/useResults';
import { SubjectCard } from './SubjectCard';
import { UpcomingExams } from './UpcomingExams';

export function MarksScreen() {
  const query = useResults();
  const studentId = useSelectedChildId();
  return (
    <Screen
      withTabBar
      ambient="glow"
      header={<TabHeader />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<Stack gap="lg"><Card variant="hero"><Skeleton height={220} round="xl" /></Card><Card><Skeleton height={60} /></Card></Stack>}
      >
        {(data) => (
          <>
            <Reveal index={0} replayKey={studentId}>
              <Card variant="hero" padding="xl">
                <HeroStat>
                  <HeroStat.Ring
                    percent={data.averagePercent}
                    caption={ar.marks.overall}
                    suffix={ar.common.percent}
                    label={`${ar.marks.overall}: ${data.averagePercent === null ? ar.marks.noAverage : `${data.averagePercent}${ar.common.percent}`}`}
                    replayKey={studentId}
                  />
                </HeroStat>
              </Card>
            </Reveal>
            <SectionHeader title={ar.marks.subjects} />
            {data.subjects.length === 0
              ? <Card><EmptyState art="medal" title={ar.marks.empty} /></Card>
              : data.subjects.map((s, i) => <Reveal key={s.subjectId} index={i + 1}><SubjectCard item={s} /></Reveal>)}
            <UpcomingExams items={data.upcoming} />
          </>
        )}
      </QueryBoundary>
    </Screen>
  );
}
