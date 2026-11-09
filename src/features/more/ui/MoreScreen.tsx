import { useState } from 'react';
import Constants from 'expo-constants';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SheetRow } from '@/components/SheetRow';
import { AppText } from '@/components/AppText';
import { useCanSwitchChild } from '@/core/auth/hooks';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useSheets } from '@/features/children/hooks/useSheets';
import { ChildPill } from '@/features/children/ui/ChildPill';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';
import { InstituteCard } from './InstituteCard';
import { LogoutSheet } from './LogoutSheet';
import { PrefsCard } from './PrefsCard';
import { ProfileCard } from './ProfileCard';

export function MoreScreen() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const canSwitch = useCanSwitchChild();
  const openChild = useSheets((s) => s.openChild);
  const me = useSession((s) => s.me);
  return (
    <Screen withTabBar header={<ScreenHeader start={<ChildPill />} end={<HeaderBell />} />}>
      <AppText variant="title" accessibilityRole="header" style={{ paddingHorizontal: space.xs }}>{ar.more.title}</AppText>
      <ProfileCard />
      <InstituteCard />
      <PrefsCard />
      <Card padding={space.sm}>
        {canSwitch ? <SheetRow icon="swap-horizontal" title={ar.more.switchChild} onPress={openChild} /> : null}
        <SheetRow icon="information-circle" tone="info" title={ar.more.about}
          subtitle={`${ar.more.version} ${Constants.expoConfig?.version ?? '1.0.0'}${me ? ` · ${me.displayName}` : ''}`}
          chevron={false} onPress={() => undefined} />
        <SheetRow icon="log-out-outline" tone="danger" title={ar.more.logout} onPress={() => setLogoutOpen(true)} />
      </Card>
      <LogoutSheet visible={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </Screen>
  );
}
