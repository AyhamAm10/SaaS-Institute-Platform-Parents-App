import { Pressable, ScrollView } from 'react-native';
import { AppText } from '@/components/AppText';
import type { Weekday } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { tapHaptic } from '@/core/layout/haptics';

interface Props { days: Weekday[]; selected: Weekday; today: Weekday; onSelect: (d: Weekday) => void }

/** Chips follow the order the API returns (working days, Saturday first). */
export function WeekdayChips({ days, selected, today, onSelect }: Props) {
  const theme = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm, paddingHorizontal: space.xs }}>
      {days.map((d) => {
        const active = d === selected;
        return (
          <Pressable
            key={d}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={d === today ? `${ar.weekdays[d]}، ${ar.common.today}` : ar.weekdays[d]}
            onPress={() => {
              tapHaptic();
              onSelect(d);
            }}
            style={{
              minHeight: HIT, minWidth: 72, paddingHorizontal: space.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center',
              backgroundColor: active ? theme.accent : theme.surface, boxShadow: active ? undefined : theme.shadow,
              borderWidth: d === today && !active ? 1.5 : 0, borderColor: theme.accent,
            }}
          >
            <AppText variant="bodyStrong" color={active ? 'onAccent' : 'text'}>{ar.weekdays[d]}</AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
