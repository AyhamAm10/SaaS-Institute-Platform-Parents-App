import type { ReactNode } from 'react';
import { View } from 'react-native';
import { toneColors, type ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Row, Stack } from '../layout';

interface ItemProps {
  tone?: ToneKey;
  /** Highlights the marker with a soft halo (current lesson, next due). */
  active?: boolean;
  last?: boolean;
  /** Column before the rail (time labels). */
  start?: ReactNode;
  children: ReactNode;
  label?: string;
}

function TimelineItem({ tone = 'neutral', active, last, start, children, label }: ItemProps) {
  const theme = useTheme();
  const t = toneColors(theme, tone);
  return (
    <Row align="stretch" gap="md" accessible={!!label} accessibilityLabel={label}>
      {start ? <Stack width={52} align="center" py="xs">{start}</Stack> : null}
      <View style={{ width: 22, alignItems: 'center' }}>
        <View
          style={{
            width: active ? 22 : 14, height: active ? 22 : 14, borderRadius: 11, marginTop: active ? 2 : 6,
            alignItems: 'center', justifyContent: 'center', backgroundColor: active ? t.bg : 'transparent',
            boxShadow: active ? `0 0 0 4px ${t.bg}` : undefined,
          }}
        >
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: t.solid, borderWidth: 2, borderColor: theme.surfaceSolid }} />
        </View>
        {last ? null : <View style={{ flex: 1, width: 2, marginTop: 4, borderRadius: 1, backgroundColor: theme.border }} />}
      </View>
      <Stack flex={1} pb={last ? 'none' : 'lg'}>{children}</Stack>
    </Row>
  );
}

/** Vertical timeline. Compound: Timeline.Item. */
export function Timeline({ children }: { children: ReactNode }) {
  return <Stack align="stretch">{children}</Stack>;
}

Timeline.Item = TimelineItem;
