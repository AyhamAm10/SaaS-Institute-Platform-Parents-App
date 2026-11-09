import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { QueryBoundary } from '@/components/QueryBoundary';
import { Skeleton } from '@/components/Skeleton';
import { formatFullDate } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { Avatar } from '@/features/children/ui/Avatar';
import { useProfile } from '../hooks/useProfile';
import { openUrl, telUrl } from '../utils/contact';
import { InfoRow } from './InfoRow';

export function ProfileCard() {
  const query = useProfile();
  return (
    <QueryBoundary query={query} skeleton={<Card><Skeleton height={180} round={24} /></Card>}>
      {(p) => (
        <Card style={{ gap: space.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
            <Avatar name={p.fullName} size={52} />
            <View style={{ flex: 1 }}>
              <AppText variant="heading" accessibilityRole="header">{p.fullName}</AppText>
              <AppText variant="caption" color="textMuted">{ar.more.profile}</AppText>
            </View>
          </View>
          <View>
            {p.section ? <InfoRow label={ar.more.section} value={p.section.name} /> : null}
            <InfoRow label={ar.more.branch} value={p.branch.name} />
            {p.statusName ? <InfoRow label={ar.more.status} value={p.statusName} /> : null}
            {p.birthDate ? <InfoRow label={ar.more.birth} value={formatFullDate(p.birthDate)} /> : null}
            {p.bus ? <InfoRow label={ar.more.bus} value={p.bus.name} /> : null}
            {p.bus?.driverName ? <InfoRow label={ar.more.driver} value={p.bus.driverName} /> : null}
          </View>
          {p.bus?.driverPhone ? (
            <Button label={ar.more.callDriver} icon="call" variant="soft" onPress={() => void openUrl(telUrl(p.bus?.driverPhone ?? ''))} />
          ) : null}
        </Card>
      )}
    </QueryBoundary>
  );
}
