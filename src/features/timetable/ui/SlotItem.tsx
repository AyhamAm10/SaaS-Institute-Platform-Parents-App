import { Card, Icon, Row, Stack, Text, Timeline } from '@/components/controllers';
import type { TimetableSlot } from '@/core/api/types';
import { ar } from '@/core/strings/ar';

interface Props { slot: TimetableSlot; current: boolean; last: boolean }

/** One lesson on the time rail: start/end times, a marker (orange halo when current), the subject card. */
export function SlotItem({ slot, current, last }: Props) {
  const label = `${slot.subject}، ${slot.startTime} - ${slot.endTime}${slot.teacher ? `، ${slot.teacher}` : ''}${slot.room ? `، ${slot.room}` : ''}`;
  return (
    <Timeline.Item
      tone={current ? 'accent' : 'neutral'}
      active={current}
      last={last}
      label={label}
      start={
        <Stack align="center" gap="xs">
          <Text variant="label" tone={current ? 'accent' : 'primary'} tabular>{slot.startTime}</Text>
          <Text variant="caption" tone="muted" tabular>{slot.endTime}</Text>
        </Stack>
      }
    >
      <Card variant={current ? 'tinted' : 'glass'} tone="accent" padding="lg" gap="xs">
        <Text variant="heading">{slot.subject}</Text>
        {slot.teacher ? (
          <Row gap="xs">
            <Icon name="person" size="xs" tone="muted" />
            <Text variant="caption" tone="muted">{`${ar.timetable.teacher}: ${slot.teacher}`}</Text>
          </Row>
        ) : null}
        {slot.room ? (
          <Row gap="xs">
            <Icon name="location" size="xs" tone="muted" />
            <Text variant="caption" tone="muted">{slot.room}</Text>
          </Row>
        ) : null}
      </Card>
    </Timeline.Item>
  );
}
