import { useMemo, useState } from 'react';
import {
  Button, Card, EmptyState, Reveal, Row, Screen, SectionHeader, StatusPill, Text, Toggle,
} from '@/components/controllers';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { StackHeader } from '@/features/shell/ui/StackHeader';
import { useNotifications } from '../hooks/useNotifications';
import { groupByDay } from '../utils/group';
import { NotificationRow } from './NotificationRow';

export function NotificationsScreen() {
  const { items, unreadCount, markRead, markAllRead } = useNotifications();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const groups = useMemo(() => groupByDay(unreadOnly ? items.filter((n) => !n.read) : items), [items, unreadOnly]);

  return (
    <Screen ambient="calm" header={<StackHeader title={ar.notifications.title} bell={false} />}>
      <Reveal index={0}><StatusPill label={ar.notifications.placeholder} tone="info" icon="information-circle" /></Reveal>
      <Reveal index={1}>
        <Card padding="lg" gap="sm">
          <Row justify="between" minHeight={44}>
            <Text variant="label">{ar.notifications.unreadOnly}</Text>
            <Toggle value={unreadOnly} onChange={setUnreadOnly} label={ar.notifications.unreadOnly} />
          </Row>
          {unreadCount > 0 ? <Button variant="ghost" compact label={ar.notifications.markAllRead} onPress={markAllRead} /> : null}
        </Card>
      </Reveal>
      {groups.length === 0 ? (
        <EmptyState art="bell" title={ar.notifications.empty} hint={ar.notifications.emptyHint} />
      ) : (
        groups.map((g, i) => (
          <Reveal key={g.date} index={i + 2}>
            <SectionHeader title={relativeDay(g.date)} />
            <Card padding="sm" gap="none">
              {g.items.map((item) => <NotificationRow key={item.id} item={item} onPress={() => markRead(item.id)} />)}
            </Card>
          </Reveal>
        ))
      )}
    </Screen>
  );
}
