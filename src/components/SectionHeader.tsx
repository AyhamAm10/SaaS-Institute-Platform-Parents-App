import { Pressable, View } from 'react-native';
import { ar } from '@/core/strings/ar';
import { HIT, space } from '@/core/theme/metrics';
import { AppText } from './AppText';

interface Props { title: string; actionLabel?: string; onAction?: () => void }

export function SectionHeader({ title, actionLabel = ar.common.seeAll, onAction }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: HIT, paddingHorizontal: space.xs }}>
      <AppText variant="heading" accessibilityRole="header">{title}</AppText>
      {onAction ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`${actionLabel} ${title}`} onPress={onAction}
          style={{ minHeight: HIT, justifyContent: 'center' }} hitSlop={8}>
          <AppText variant="captionStrong" color="textMuted">{actionLabel}</AppText>
        </Pressable>
      ) : null}
    </View>
  );
}
