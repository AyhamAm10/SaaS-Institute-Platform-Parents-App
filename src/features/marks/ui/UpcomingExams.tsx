import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { IconTile } from '@/components/IconTile';
import { SectionHeader } from '@/components/SectionHeader';
import type { UpcomingExam } from '@/core/api/types';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';

export function UpcomingExams({ items }: { items: UpcomingExam[] }) {
  return (
    <View style={{ gap: space.sm }}>
      <SectionHeader title={ar.marks.upcoming} />
      <Card padding={space.lg} style={{ gap: space.md }}>
        {items.length === 0 ? <AppText color="textMuted">{ar.marks.noUpcoming}</AppText> : items.map((e) => (
          <View key={e.examId} accessible style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
            <IconTile icon="document-text" tone="warning" />
            <View style={{ flex: 1 }}>
              <AppText variant="bodyStrong">{e.subject}</AppText>
              <AppText variant="caption" color="textMuted">{e.title}</AppText>
            </View>
            <AppText variant="captionStrong" color="warning">{relativeDay(e.date)}</AppText>
          </View>
        ))}
      </Card>
    </View>
  );
}
