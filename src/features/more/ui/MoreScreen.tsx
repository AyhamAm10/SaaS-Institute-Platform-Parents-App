import { useState } from 'react';
import Constants from 'expo-constants';
import { Card, ListItem, Reveal, Screen, Stack, Text } from '@/components/controllers';
import { useCanSwitchChild } from '@/core/auth/hooks';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { useSheets } from '@/features/children/hooks/useSheets';
import { TabHeader } from '@/features/shell/ui/TabHeader';
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
    <Screen withTabBar ambient="calm" header={<TabHeader />}>
      <Reveal index={0}>
        <Stack px="xs"><Text variant="title" accessibilityRole="header">{ar.more.title}</Text></Stack>
      </Reveal>
      <Reveal index={1}><ProfileCard /></Reveal>
      <Reveal index={2}><InstituteCard /></Reveal>
      <Reveal index={3}><PrefsCard /></Reveal>
      <Reveal index={4}>
        <Card padding="sm" gap="none">
          {canSwitch ? <ListItem icon="swap-horizontal" title={ar.more.switchChild} onPress={openChild} /> : null}
          <ListItem
            icon="information-circle"
            tone="info"
            title={ar.more.about}
            subtitle={`${ar.more.version} ${Constants.expoConfig?.version ?? '1.0.0'}${me ? ` · ${me.displayName}` : ''}`}
          />
          <ListItem icon="log-out" tone="danger" title={ar.more.logout} onPress={() => setLogoutOpen(true)} />
        </Card>
      </Reveal>
      <LogoutSheet visible={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </Screen>
  );
}
