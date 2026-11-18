import { useState } from 'react';
import { Card, ListItem, MiniRing, Stack, StatusPill, Text } from '@/components/controllers';
import type { SubjectResults } from '@/core/api/types';
import { formatDayMonth } from '@/core/format/date';
import { countText, formatNumber, formatPercent } from '@/core/format/number';
import { percentTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';

/** Subject card with an average ring; tap to expand the exam results. */
export function SubjectCard({ item }: { item: SubjectResults }) {
  const [open, setOpen] = useState(false);
  const tone = percentTone(item.averagePercent);
  const exams = countText(item.results.length, ar.marks.exams);
  return (
    <Card padding="sm" gap="xs">
      <ListItem
        leading={<MiniRing percent={item.averagePercent} tone={tone === 'neutral' || tone === 'warning' ? 'brand' : tone} />}
        title={item.subject}
        subtitle={exams}
        trailing={open ? 'chevron-up' : 'chevron-down'}
        label={`${item.subject}، ${ar.home.average} ${formatPercent(item.averagePercent)}، ${exams}`}
        onPress={() => setOpen((v) => !v)}
      />
      {open ? (
        <Stack px="sm" pb="sm">
          {item.results.map((r) => {
            const missed = r.score === null;
            return (
              <ListItem
                key={r.examId}
                title={r.title}
                subtitle={formatDayMonth(r.date)}
                end={
                  <Stack align="end" gap="xs">
                    <Text variant="label" tabular>{missed ? '—' : `${formatNumber(r.score ?? 0)} / ${formatNumber(r.max)}`}</Text>
                    {missed
                      ? <StatusPill label={r.status === 'ABSENT' ? ar.marks.absent : ar.marks.pending} />
                      : <StatusPill label={formatPercent(r.percent)} tone={percentTone(r.percent)} />}
                  </Stack>
                }
              />
            );
          })}
        </Stack>
      ) : null}
    </Card>
  );
}
