import { useRouter } from 'expo-router';
import { BottomSheet } from '@/components/BottomSheet';
import { SheetRow } from '@/components/SheetRow';
import { useCanSwitchChild } from '@/core/auth/hooks';
import { useIsFamily, useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { openUrl, telUrl } from '@/features/more/utils/contact';
import { useSheets } from '../hooks/useSheets';

/** Center-button sheet: switch child (family), timetable, finance (family), notifications, call institute. */
export function QuickActionsSheet() {
  const router = useRouter();
  const open = useSheets((s) => s.quickOpen);
  const close = useSheets((s) => s.closeQuick);
  const openChild = useSheets((s) => s.openChild);
  const canSwitch = useCanSwitchChild();
  const isFamily = useIsFamily();
  const phone = useSession((s) => s.me?.institute.phone);

  const go = (path: '/timetable' | '/finance' | '/notifications') => {
    close();
    router.push(path);
  };

  return (
    <BottomSheet visible={open} title={ar.quick.title} onClose={close}>
      {canSwitch ? (
        <SheetRow icon="swap-horizontal" title={ar.quick.switchChild} onPress={() => { close(); setTimeout(openChild, 250); }} />
      ) : null}
      <SheetRow icon="time" title={ar.quick.timetable} tone="info" onPress={() => go('/timetable')} />
      {isFamily ? <SheetRow icon="wallet" title={ar.quick.finance} tone="success" onPress={() => go('/finance')} /> : null}
      <SheetRow icon="notifications" title={ar.quick.notifications} tone="warning" onPress={() => go('/notifications')} />
      {phone ? (
        <SheetRow icon="call" title={ar.quick.contact} subtitle={phone} onPress={() => { close(); void openUrl(telUrl(phone)); }} />
      ) : null}
    </BottomSheet>
  );
}
