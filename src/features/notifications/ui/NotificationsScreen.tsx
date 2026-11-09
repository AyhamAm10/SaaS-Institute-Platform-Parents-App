import { useMemo, useState } from 'react';
import { Pressable, Switch, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StatChip } from '@/components/StatChip';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { HIT, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useNotifications } from '../hooks/useNotifications';
import { groupByDay } from '../utils/group';
import { NotificationRow } from './NotificationRow';

export function NotificationsScreen() {
  const theme = useTheme();
  const { items, unreadCount, markRead, markAllRead } = useNotifications();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const groups = useMemo(() => groupByDay(unreadOnly ? items.filter((n) => !n.read) : items), [items, unreadOnly]);

  return (
    <Screen header={<ScreenHeader back title={ar.notifications.title} />}>
      <StatChip label={ar.notifications.placeholder} tone="info" icon="information-circle" />
      <Card padding={space.lg}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: HIT }}>
          <AppText variant="bodyStrong">{ar.notifications.unreadOnly}</AppText>
          <Switch
            value={unreadOnly}
            onValueChange={setUnreadOnly}
            accessibilityLabel={ar.notifications.unreadOnly}
            trackColor={{ true: theme.accent, false: theme.track }}
          />
        </View>
        {unreadCount > 0 ? (
          <Pressable accessibilityRole="button" onPress={markAllRead} style={{ minHeight: HIT, justifyContent: 'center' }}>
            <AppText variant="captionStrong" color="accent">{ar.notifications.markAllRead}</AppText>
          </Pressable>
        ) : null}
      </Card>
      {groups.length === 0 ? (
        <EmptyState icon="notifications-off-outline" title={ar.notifications.empty} hint={ar.notifications.emptyHint} />
      ) : (
        groups.map((g) => (
          <View key={g.date} style={{ gap: space.sm }}>
            <AppText variant="captionStrong" color="textMuted" style={{ paddingHorizontal: space.xs }}>{relativeDay(g.date)}</AppText>
            <Card padding={space.sm}>
              {g.items.map((item) => <NotificationRow key={item.id} item={item} onPress={() => markRead(item.id)} />)}
            </Card>
          </View>
        ))
      )}
    </Screen>
  );
}
