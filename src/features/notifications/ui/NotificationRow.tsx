import type { IconName } from '@/components/controllers';
import { ListItem } from '@/components/controllers';
import type { ServerNotificationType } from '@/core/api/types';
import type { ToneKey } from '@/core/theme/tones';
import { ar } from '@/core/strings/ar';
import type { NotificationItem } from '../types';

const META: Record<ServerNotificationType, { icon: IconName; tone: ToneKey }> = {
  ATTENDANCE_ARRIVAL: { icon: 'checkmark-circle', tone: 'success' },
  ATTENDANCE_LATE: { icon: 'time', tone: 'warning' },
  ATTENDANCE_ABSENT: { icon: 'close-circle', tone: 'danger' },
  ATTENDANCE_EARLY_EXIT: { icon: 'exit', tone: 'warning' },
  ATTENDANCE_EXCUSED: { icon: 'shield-checkmark', tone: 'info' },
  PAYMENT_RECEIVED: { icon: 'wallet', tone: 'success' },
  INSTALLMENT_DUE: { icon: 'card', tone: 'warning' },
  INSTALLMENT_OVERDUE: { icon: 'alert-circle', tone: 'danger' },
  EXAM_SCHEDULED: { icon: 'document-text', tone: 'info' },
  EXAM_RESULT: { icon: 'ribbon', tone: 'success' },
  TIMETABLE_CHANGED: { icon: 'calendar', tone: 'info' },
  STUDENT_NOTE: { icon: 'chatbubble-ellipses', tone: 'info' },
  CLOSURE: { icon: 'cafe', tone: 'info' },
  TEACHER_ASSIGNED: { icon: 'school', tone: 'info' },
  TEACHER_EXAM_CREATED: { icon: 'document-text', tone: 'info' },
  MARKS_REMINDER: { icon: 'ribbon', tone: 'warning' },
  LESSON_REMINDER: { icon: 'time', tone: 'accent' },
};

export function NotificationRow({ item, onPress }: { item: NotificationItem; onPress: () => void }) {
  const meta = META[item.type] ?? { icon: 'notifications', tone: 'info' };
  return (
    <ListItem
      icon={meta.icon}
      tone={meta.tone}
      title={item.title}
      subtitle={item.body}
      meta={item.time}
      unread={!item.read}
      chevron={item.path !== null && item.path !== '/notifications'}
      onPress={onPress}
      label={`${item.read ? '' : `${ar.notifications.unread}، `}${item.title}، ${item.body}، ${item.time}`}
    />
  );
}
