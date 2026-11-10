import { useState } from 'react';
import { Card, EmptyState, QueryBoundary, Reveal, Screen, SegmentedChips, Skeleton, Stack, Timeline } from '@/components/controllers';
import type { Weekday } from '@/core/api/types';
import { nowHm, weekdayFromIndex } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { StackHeader } from '@/features/shell/ui/StackHeader';
import { useTimetable } from '../hooks/useTimetable';
import { isCurrentSlot, slotsFor } from '../utils/slots';
import { SlotItem } from './SlotItem';

export function TimetableScreen() {
  const query = useTimetable();
  const today = weekdayFromIndex(new Date().getDay());
  const [picked, setPicked] = useState<Weekday | null>(null);
  return (
    <Screen
      ambient="pool"
      header={<StackHeader title={ar.timetable.title} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<Stack gap="md">{[0, 1, 2].map((i) => <Card key={i}><Skeleton height={56} round="lg" /></Card>)}</Stack>}
      >
        {(data) => {
          if (data.days.every((d) => d.slots.length === 0)) {
            return <Card><EmptyState art="calendar" title={ar.timetable.empty} hint={ar.timetable.emptyHint} /></Card>;
          }
          const days = data.days.map((d) => d.weekday);
          const selected = picked ?? (days.includes(today) ? today : (days[0] ?? today));
          const slots = slotsFor(data, selected);
          return (
            <>
              <Reveal index={0}>
                <SegmentedChips
                  value={selected}
                  onChange={(k) => setPicked(k as Weekday)}
                  items={days.map((d) => ({
                    key: d,
                    label: ar.weekdays[d],
                    marker: d === today,
                    a11yLabel: d === today ? `${ar.weekdays[d]}، ${ar.common.today}` : ar.weekdays[d],
                  }))}
                />
              </Reveal>
              {slots.length === 0 ? (
                <Card><EmptyState art="rest" title={ar.timetable.emptyDay} /></Card>
              ) : (
                <Timeline>
                  {slots.map((s, i) => (
                    <Reveal key={`${selected}-${s.startTime}-${i}`} index={i + 1}>
                      <SlotItem slot={s} last={i === slots.length - 1} current={selected === today && isCurrentSlot(s, nowHm())} />
                    </Reveal>
                  ))}
                </Timeline>
              )}
            </>
          );
        }}
      </QueryBoundary>
    </Screen>
  );
}
