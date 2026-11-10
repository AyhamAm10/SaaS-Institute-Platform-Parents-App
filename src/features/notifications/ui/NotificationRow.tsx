import type { IconName } from '@/components/controllers';
import { ListItem } from '@/components/controllers';
import type { ToneKey } from '@/core/theme/tones';
import { ar } from '@/core/strings/ar';
import type { NotificationItem, NotificationType } from '../types';

const META: Record<NotificationType, { icon: IconName; tone: ToneKey }> = {
  absence: { icon: 'close-circle', tone: 'danger' },
  late: { icon: 'time', tone: 'warning' },
  mark: { icon: 'ribbon', tone: 'success' },
  payment: { icon: 'wallet', tone: 'success' },
  installment: { icon: 'card', tone: 'warning' },
  exam: { icon: 'document-text', tone: 'info' },
  announcement: { icon: 'megaphone', tone: 'info' },
};

export function NotificationRow({ item, onPress }: { item: NotificationItem; onPress: () => void }) {
  const meta = META[item.type];
  return (
    <ListItem
      icon={meta.icon}
      tone={meta.tone}
      title={item.title}
      subtitle={item.body}
      meta={item.time}
      unread={!item.read}
      chevron={false}
      onPress={onPress}
      label={`${item.read ? '' : 'غير مقروء، '}${ar.notifications.types[item.type]}، ${item.title}، ${item.body}`}
    />
  );
}
