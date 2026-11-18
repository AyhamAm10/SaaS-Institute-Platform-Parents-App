import {
  Button, Card, EmptyState, ErrorState, Reveal, SectionHeader, Skeleton, Stack,
} from '@/components/controllers';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import type { useNotifications } from '../hooks/useNotifications';
import type { NotificationGroup, NotificationItem } from '../types';
import { NotificationRow } from './NotificationRow';

interface Props {
  query: ReturnType<typeof useNotifications>['query'];
  groups: NotificationGroup[];
  onOpen: (item: NotificationItem) => void;
}

/** Inbox days (skeleton, error with retry, empty state, "load more"). */
export function NotificationList({ query, groups, onOpen }: Props) {
  if (query.isPending) {
    return (
      <Stack gap="lg">
        {[0, 1].map((i) => <Card key={i}><Skeleton height={96} round="lg" /></Card>)}
      </Stack>
    );
  }
  if (query.isError && query.data === undefined) {
    return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  }
  if (groups.length === 0) {
    return <EmptyState art="bell" title={ar.notifications.empty} hint={ar.notifications.emptyHint} />;
  }
  return (
    <>
      {groups.map((g, i) => (
        <Reveal key={g.date} index={i + 2}>
          <SectionHeader title={relativeDay(g.date)} />
          <Card padding="sm" gap="none">
            {g.items.map((item) => <NotificationRow key={item.id} item={item} onPress={() => onOpen(item)} />)}
          </Card>
        </Reveal>
      ))}
      {query.hasNextPage ? (
        <Button
          variant="ghost"
          label={ar.notifications.more}
          loading={query.isFetchingNextPage}
          onPress={() => void query.fetchNextPage()}
        />
      ) : null}
    </>
  );
}
