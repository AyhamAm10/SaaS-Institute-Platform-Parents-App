import { useRouter } from 'expo-router';
import { ListItem, Sheet } from '@/components/controllers';
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

  const go = (path: '/timetable' | '/finance' | '/notes' | '/notifications') => {
    close();
    router.push(path);
  };

  return (
    <Sheet visible={open} title={ar.quick.title} onClose={close}>
      {canSwitch ? (
        <ListItem icon="swap-horizontal" title={ar.quick.switchChild} onPress={() => { close(); setTimeout(openChild, 250); }} />
      ) : null}
      <ListItem icon="time" title={ar.quick.timetable} onPress={() => go('/timetable')} />
      {isFamily ? <ListItem icon="wallet" tone="success" title={ar.quick.finance} onPress={() => go('/finance')} /> : null}
      {isFamily ? <ListItem icon="megaphone" tone="accent" title={ar.quick.notes} onPress={() => go('/notes')} /> : null}
      <ListItem icon="notifications" tone="info" title={ar.quick.notifications} onPress={() => go('/notifications')} />
      {phone ? (
        <ListItem icon="call" tone="success" title={ar.quick.contact} subtitle={phone} onPress={() => { close(); void openUrl(telUrl(phone)); }} />
      ) : null}
    </Sheet>
  );
}
