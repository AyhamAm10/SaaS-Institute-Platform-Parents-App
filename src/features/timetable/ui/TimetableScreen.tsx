import { useState } from 'react';
import { View } from 'react-native';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { QueryBoundary } from '@/components/QueryBoundary';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Skeleton } from '@/components/Skeleton';
import type { Weekday } from '@/core/api/types';
import { nowHm, weekdayFromIndex } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';
import { useTimetable } from '../hooks/useTimetable';
import { slotsFor, isCurrentSlot } from '../utils/slots';
import { SlotCard } from './SlotCard';
import { WeekdayChips } from './WeekdayChips';

export function TimetableScreen() {
  const query = useTimetable();
  const today = weekdayFromIndex(new Date().getDay());
  const [picked, setPicked] = useState<Weekday | null>(null);
  return (
    <Screen
      header={<ScreenHeader back title={ar.timetable.title} end={<HeaderBell />} />}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
    >
      <QueryBoundary
        query={query}
        skeleton={<View style={{ gap: space.md }}>{[0, 1, 2].map((i) => <Card key={i}><Skeleton height={56} round={20} /></Card>)}</View>}
      >
        {(data) => {
          if (data.days.every((d) => d.slots.length === 0)) {
            return <Card><EmptyState icon="calendar-clear-outline" title={ar.timetable.empty} hint={ar.timetable.emptyHint} /></Card>;
          }
          const days = data.days.map((d) => d.weekday);
          const selected = picked ?? (days.includes(today) ? today : (days[0] ?? today));
          const slots = slotsFor(data, selected);
          return (
            <>
              <WeekdayChips days={days} selected={selected} today={today} onSelect={setPicked} />
              {slots.length === 0 ? (
                <Card><EmptyState icon="cafe-outline" title={ar.timetable.emptyDay} /></Card>
              ) : (
                slots.map((s, i) => (
                  <SlotCard key={`${s.startTime}-${i}`} slot={s} last={i === slots.length - 1}
                    current={selected === today && isCurrentSlot(s, nowHm())} />
                ))
              )}
            </>
          );
        }}
      </QueryBoundary>
    </Screen>
  );
}
