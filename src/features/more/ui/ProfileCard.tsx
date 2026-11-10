import { Avatar, Button, Card, QueryBoundary, Row, Skeleton, Stack, Text } from '@/components/controllers';
import { formatFullDate } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { useProfile } from '../hooks/useProfile';
import { openUrl, telUrl } from '../utils/contact';
import { InfoRow } from './InfoRow';

export function ProfileCard() {
  const query = useProfile();
  return (
    <QueryBoundary query={query} skeleton={<Card variant="hero"><Skeleton height={180} round="lg" /></Card>}>
      {(p) => (
        <Card variant="hero" gap="md">
          <Row gap="md">
            <Avatar name={p.fullName} size="lg" />
            <Stack flex={1}>
              <Text variant="heading" accessibilityRole="header">{p.fullName}</Text>
              <Text variant="caption" tone="muted">{ar.more.profile}</Text>
            </Stack>
          </Row>
          <Stack>
            {p.section ? <InfoRow label={ar.more.section} value={p.section.name} /> : null}
            <InfoRow label={ar.more.branch} value={p.branch.name} />
            {p.statusName ? <InfoRow label={ar.more.status} value={p.statusName} /> : null}
            {p.birthDate ? <InfoRow label={ar.more.birth} value={formatFullDate(p.birthDate)} /> : null}
            {p.bus ? <InfoRow label={ar.more.bus} value={p.bus.name} /> : null}
            {p.bus?.driverName ? <InfoRow label={ar.more.driver} value={p.bus.driverName} /> : null}
          </Stack>
          {p.bus?.driverPhone ? (
            <Button label={ar.more.callDriver} icon="call" variant="ghost" onPress={() => void openUrl(telUrl(p.bus?.driverPhone ?? ''))} />
          ) : null}
        </Card>
      )}
    </QueryBoundary>
  );
}
