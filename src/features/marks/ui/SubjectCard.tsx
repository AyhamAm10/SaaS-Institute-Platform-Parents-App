import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { StatChip } from '@/components/StatChip';
import type { SubjectResults } from '@/core/api/types';
import { formatDayMonth } from '@/core/format/date';
import { formatNumber, formatPercent } from '@/core/format/number';
import { percentTone } from '@/core/format/status';
import { ar } from '@/core/strings/ar';
import { HIT, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { tapHaptic } from '@/core/layout/haptics';
import { MiniRing } from '@/components/MiniRing';

export function SubjectCard({ item }: { item: SubjectResults }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const tone = percentTone(item.averagePercent);
  const color = tone === 'neutral' ? theme.accent : theme[tone];
  return (
    <Card padding={space.lg} style={{ gap: space.md }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${item.subject}، ${ar.home.average} ${formatPercent(item.averagePercent)}، ${formatNumber(item.results.length, 0)} ${ar.marks.exams}`}
        onPress={() => {
          tapHaptic();
          setOpen((v) => !v);
        }}
        style={{ minHeight: HIT + 20, flexDirection: 'row', alignItems: 'center', gap: space.md }}
      >
        <MiniRing percent={item.averagePercent} color={color} size={60} />
        <View style={{ flex: 1 }}>
          <AppText variant="heading">{item.subject}</AppText>
          <AppText variant="caption" color="textMuted">{`${formatNumber(item.results.length, 0)} ${ar.marks.exams}`}</AppText>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={theme.textMuted} />
      </Pressable>
      {open ? (
        <View style={{ gap: space.sm, borderTopWidth: 1, borderTopColor: theme.border, paddingTop: space.md }}>
          {item.results.map((r) => {
            const missed = r.score === null;
            return (
              <View key={r.examId} accessible style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, minHeight: 48 }}>
                <View style={{ flex: 1 }}>
                  <AppText variant="bodyStrong">{r.title}</AppText>
                  <AppText variant="caption" color="textMuted">{formatDayMonth(r.date)}</AppText>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <AppText variant="bodyStrong">{missed ? '—' : `${formatNumber(r.score ?? 0)} / ${formatNumber(r.max)}`}</AppText>
                  {missed
                    ? <StatChip label={r.status === 'ABSENT' ? ar.marks.absent : ar.marks.pending} tone="neutral" />
                    : <StatChip label={formatPercent(r.percent)} tone={percentTone(r.percent)} />}
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
    </Card>
  );
}
