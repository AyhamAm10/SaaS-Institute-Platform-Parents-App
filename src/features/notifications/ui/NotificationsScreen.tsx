import { useMemo, useState } from 'react';
import { useRouter, type Href } from 'expo-router';
import { Button, Card, Reveal, Row, Screen, Text, Toggle } from '@/components/controllers';
import { selectChild } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { StackHeader } from '@/features/shell/ui/StackHeader';
import { useNotifications } from '../hooks/useNotifications';
import type { NotificationItem } from '../types';
import { groupByDay } from '../utils/group';
import { NotificationList } from './NotificationList';
import { PushCard } from './PushCard';

export function NotificationsScreen() {
  const router = useRouter();
  const children = useSession((s) => s.me?.children);
  const { query, items, unreadCount, markRead, markAllRead } = useNotifications();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const groups = useMemo(() => groupByDay(unreadOnly ? items.filter((n) => !n.read) : items), [items, unreadOnly]);

  /** Marks it read, switches to its child and opens its screen. */
  const open = (item: NotificationItem) => {
    if (!item.read) markRead(item.id);
    if (!item.path || item.path === '/notifications') return;
    if (item.studentId && children?.some((c) => c.id === item.studentId)) selectChild(item.studentId);
    router.push(item.path as Href);
  };

  return (
    <Screen ambient="calm" header={<StackHeader title={ar.notifications.title} bell={false} />}>
      <Reveal index={0}><PushCard /></Reveal>
      <Reveal index={1}>
        <Card padding="lg" gap="sm">
          <Row justify="between" minHeight={44}>
            <Text variant="label">{ar.notifications.unreadOnly}</Text>
            <Toggle value={unreadOnly} onChange={setUnreadOnly} label={ar.notifications.unreadOnly} />
          </Row>
          {unreadCount > 0 ? <Button variant="ghost" compact label={ar.notifications.markAllRead} onPress={markAllRead} /> : null}
        </Card>
      </Reveal>
      <NotificationList query={query} groups={groups} onOpen={open} />
    </Screen>
  );
}
