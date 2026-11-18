import { Button, Card, IconTile, Row, Stack, StatusPill, Text } from '@/components/controllers';
import type { IconName } from '@/components/controllers';
import type { PushPermission } from '@/core/push/types';
import { ar } from '@/core/strings/ar';
import type { ToneKey } from '@/core/theme/tones';
import { usePushStatus } from '../hooks/usePushStatus';

const LOOK: Record<Exclude<PushPermission, 'granted'>, { icon: IconName; tone: ToneKey }> = {
  default: { icon: 'notifications', tone: 'accent' },
  needsInstall: { icon: 'phone-portrait', tone: 'info' },
  expoGo: { icon: 'phone-portrait', tone: 'warning' },
  denied: { icon: 'notifications-off', tone: 'warning' },
  unsupported: { icon: 'notifications-off', tone: 'neutral' },
};

/**
 * This device's push state: a button to turn notifications on, how to install
 * the web app on iPhone (web push needs it), or how to unblock them.
 */
export function PushCard({ compact = false }: { compact?: boolean }) {
  const { permission, enable, enabling } = usePushStatus();
  if (permission === null) return null;
  if (permission === 'granted') {
    return compact ? null : <StatusPill label={ar.notifications.push.granted} tone="success" icon="checkmark-circle" />;
  }
  const text = ar.notifications.push[permission];
  const look = LOOK[permission];
  return (
    <Card padding="lg" gap="md">
      <Row gap="md" align="start">
        <IconTile icon={look.icon} tone={look.tone} />
        <Stack gap="xs" flex={1}>
          <Text variant="heading">{text.title}</Text>
          <Text variant="caption" tone="muted">{text.hint}</Text>
        </Stack>
      </Row>
      {permission === 'default' ? (
        <Button label={ar.notifications.push.enable} icon="notifications" onPress={enable} loading={enabling} />
      ) : null}
    </Card>
  );
}
