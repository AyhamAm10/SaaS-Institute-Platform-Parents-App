import { Card, Row, Skeleton, Stack, Text, Toggle } from '@/components/controllers';
import { ar } from '@/core/strings/ar';
import { useNotificationSettings } from '@/features/notifications/hooks/useNotificationSettings';
import { PushCard } from '@/features/notifications/ui/PushCard';

/** Which kinds of notifications reach this account (saved on the server), plus this device's push state. */
export function PrefsCard() {
  const { query, categories, toggle } = useNotificationSettings();
  return (
    <Stack gap="md">
      <PushCard compact />
      <Card gap="xs">
        <Stack gap="xs">
          <Text variant="heading" accessibilityRole="header">{ar.more.prefs}</Text>
          <Text variant="caption" tone="muted">{ar.more.prefsNote}</Text>
        </Stack>
        {query.isPending ? <Skeleton height={160} round="lg" /> : null}
        {categories.map((c) => (
          <Row key={c.key} justify="between" minHeight={48}>
            <Stack gap="none" flex={1}>
              <Text>{ar.notifications.categories[c.key].title}</Text>
              <Text variant="caption" tone="muted">{ar.notifications.categories[c.key].hint}</Text>
            </Stack>
            <Toggle value={c.enabled} onChange={(v) => toggle(c.key, v)} label={ar.notifications.categories[c.key].title} />
          </Row>
        ))}
      </Card>
    </Stack>
  );
}
