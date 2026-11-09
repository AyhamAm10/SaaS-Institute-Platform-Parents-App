import { useRouter } from 'expo-router';
import { RoundIconButton } from '@/components/RoundIconButton';
import { ar } from '@/core/strings/ar';
import { useNotifications } from '../hooks/useNotifications';

export function HeaderBell() {
  const router = useRouter();
  const { unreadCount } = useNotifications();
  return (
    <RoundIconButton
      icon="notifications-outline"
      label={unreadCount > 0 ? `${ar.notifications.title}، ${unreadCount}` : ar.notifications.title}
      dot={unreadCount > 0}
      onPress={() => router.push('/notifications')}
    />
  );
}
