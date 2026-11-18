import type { ReactNode } from 'react';
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
  /**
   * Equal-width chips in one row that always fit the screen (no scrolling, so the selected one is never
   * hidden off-screen). Use with short labels (e.g. weekday abbreviations).
   */
  fill?: boolean;
}

/** Horizontal pill tabs: the selected chip is an ink pill. Follows the order given. */
export function SegmentedChips({ items, value, onChange, fill = false }: Props) {
  const theme = useTheme();
  const chips = items.map((it) => {
    const active = it.key === value;
    const dot = it.marker ? (
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.brandAccent }} />
    ) : null;
    return (
      <PressableScale
        key={it.key} role="tab" state={{ selected: active }} label={it.a11yLabel ?? it.label} onPress={() => onChange(it.key)}
        outer={fill ? { flex: 1, minWidth: 0 } : undefined}
        inner={{
          minHeight: HIT, minWidth: fill ? 0 : 72, paddingHorizontal: fill ? space.xs : space.lg, borderRadius: radius.pill,
          alignItems: 'center', justifyContent: 'center', flexDirection: fill ? 'column' : 'row', gap: fill ? 2 : space.xs,
          borderWidth: 1, backgroundColor: active ? theme.brandPrimary : theme.glassBgStrong,
          borderColor: active ? theme.brandPrimary : theme.glassBorder, boxShadow: active ? theme.elev2 : theme.elev1,
        }}
      >
        <Text variant={fill ? 'caption' : 'label'} tone={active ? 'onPrimary' : 'primary'} numberOfLines={1}>{it.label}</Text>
        {dot}
      </PressableScale>
    );
  });
  if (fill) return <Row>{chips}</Row>;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm, paddingHorizontal: space.xs, paddingVertical: space.sm }}>
      {chips}
    </ScrollView>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: 'row', gap: space.xs, paddingVertical: space.sm }}>{children}</View>;
}
