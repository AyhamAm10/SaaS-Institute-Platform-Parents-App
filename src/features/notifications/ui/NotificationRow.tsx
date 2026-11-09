import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { IconTile } from '@/components/IconTile';
import type { Tone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { NotificationItem, NotificationType } from '../types';

const META: Record<NotificationType, { icon: keyof typeof Ionicons.glyphMap; tone: Tone }> = {
  absence: { icon: 'close-circle', tone: 'danger' },
  late: { icon: 'time', tone: 'warning' },
  mark: { icon: 'ribbon', tone: 'success' },
  payment: { icon: 'wallet', tone: 'success' },
  installment: { icon: 'card', tone: 'warning' },
  exam: { icon: 'document-text', tone: 'info' },
  announcement: { icon: 'megaphone', tone: 'info' },
};

export function NotificationRow({ item, onPress }: { item: NotificationItem; onPress: () => void }) {
  const theme = useTheme();
  const meta = META[item.type];
  const typeLabel = ar.notifications.types[item.type];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.read ? '' : 'غير مقروء، '}${typeLabel}، ${item.title}، ${item.body}`}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row', gap: space.md, padding: space.md, borderRadius: radius.md, minHeight: 64,
        backgroundColor: pressed ? theme.track : 'transparent',
      })}
    >
      <IconTile icon={meta.icon} tone={meta.tone} size={44} />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
          <AppText variant="bodyStrong" style={{ flex: 1 }} numberOfLines={1}>{item.title}</AppText>
          <AppText variant="micro" color="textMuted">{item.time}</AppText>
        </View>
        <AppText variant="caption" color="textMuted">{item.body}</AppText>
      </View>
      <View style={{ width: 10, paddingTop: 6 }}>
        {item.read ? null : <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.accent }} />}
      </View>
    </Pressable>
  );
}
