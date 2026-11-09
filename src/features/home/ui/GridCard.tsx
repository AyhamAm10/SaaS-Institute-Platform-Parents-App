import { View } from 'react-native';
import type { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { IconTile } from '@/components/IconTile';
import type { Tone } from '@/core/format/status';
import { space } from '@/core/theme/metrics';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  tone?: Tone | 'accent';
  title: string;
  sentence: string;
  onPress: () => void;
  /** Tiny visual (mini ring, sparkline...) pinned to the bottom. */
  visual?: React.ReactNode;
}

/** Compact card of the 2-column grid: pastel tile + title, one short sentence, tiny visual. */
export function GridCard({ icon, tone = 'accent', title, sentence, onPress, visual }: Props) {
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${title}. ${sentence}`}
      padding={space.lg}
      style={{ flexBasis: '47%', flexGrow: 1, minHeight: 176, gap: space.md }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
        <IconTile icon={icon} tone={tone} size={36} />
        <AppText variant="bodyStrong" numberOfLines={1} style={{ flex: 1 }}>{title}</AppText>
      </View>
      <AppText variant="caption" color="textMuted" numberOfLines={3}>{sentence}</AppText>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' }}>{visual}</View>
    </Card>
  );
}
