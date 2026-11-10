import { ScrollView, View } from 'react-native';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { PressableScale } from '../_shared/PressableScale';
import { Text } from '../text';

export interface ChipItem {
  key: string;
  label: string;
  /** Small orange dot (e.g. "today"). */
  marker?: boolean;
  /** Spoken label when different from the visible one. */
  a11yLabel?: string;
}

interface Props {
  items: ChipItem[];
  value: string;
  onChange: (key: string) => void;
}

/** Horizontal pill tabs: the selected chip is an ink pill. Follows the order given. */
export function SegmentedChips({ items, value, onChange }: Props) {
  const theme = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm, paddingHorizontal: space.xs, paddingVertical: space.sm }}>
      {items.map((it) => {
        const active = it.key === value;
        return (
          <PressableScale
            key={it.key} role="tab" state={{ selected: active }} label={it.a11yLabel ?? it.label} onPress={() => onChange(it.key)}
            inner={{
              minHeight: HIT, minWidth: 72, paddingHorizontal: space.lg, borderRadius: radius.pill, alignItems: 'center',
              justifyContent: 'center', flexDirection: 'row', gap: space.xs, borderWidth: 1,
              backgroundColor: active ? theme.brandPrimary : theme.glassBgStrong,
              borderColor: active ? theme.brandPrimary : theme.glassBorder, boxShadow: active ? theme.elev2 : theme.elev1,
            }}
          >
            <Text variant="label" tone={active ? 'onPrimary' : 'primary'}>{it.label}</Text>
            {it.marker ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.brandAccent }} /> : null}
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}
