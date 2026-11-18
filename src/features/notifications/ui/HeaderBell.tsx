import { useRouter } from 'expo-router';
import { IconButton } from '@/components/controllers';
import { ar } from '@/core/strings/ar';
import { useUnreadCount } from '../hooks/useNotifications';

export function HeaderBell() {
  const router = useRouter();
  const unreadCount = useUnreadCount();
  return (
    <IconButton
      icon="notifications"
      label={unreadCount > 0 ? `${ar.notifications.title}، ${unreadCount} ${ar.notifications.unread}` : ar.notifications.title}
      dot={unreadCount > 0}
      onPress={() => router.push('/notifications')}
    />
  );
}
