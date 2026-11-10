import { Card, ListItem, SectionHeader, Stack, Text } from '@/components/controllers';
import type { UpcomingExam } from '@/core/api/types';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';

export function UpcomingExams({ items }: { items: UpcomingExam[] }) {
  return (
    <Stack gap="sm">
      <SectionHeader title={ar.marks.upcoming} />
      <Card padding="sm" gap="none">
        {items.length === 0 ? <Text tone="muted">{ar.marks.noUpcoming}</Text> : items.map((e) => (
          <ListItem key={e.examId} icon="document-text" tone="danger" title={e.subject} subtitle={e.title} meta={relativeDay(e.date)} />
        ))}
      </Card>
    </Stack>
  );
}
