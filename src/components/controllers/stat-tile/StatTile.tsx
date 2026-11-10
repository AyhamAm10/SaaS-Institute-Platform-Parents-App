import type { ReactNode } from 'react';
import type { ToneKey } from '@/core/theme/tones';
import { Card } from '../card';
import type { IconName } from '../icon';
import { IconTile } from '../icon-tile';
import { Row, Stack } from '../layout';
import { Text } from '../text';

interface Props {
  icon: IconName;
  tone?: ToneKey;
  title: string;
  sentence: string;
  onPress: () => void;
  /** Tiny visual pinned to the bottom (mini ring, sparkline, number...). */
  visual?: ReactNode;
}

/** Cell of the 2-column home grid: tinted icon tile + title, one short sentence, tiny visual. */
export function StatTile({ icon, tone = 'accent', title, sentence, onPress, visual }: Props) {
  return (
    <Card fill padding="lg" gap="md" onPress={onPress} label={`${title}. ${sentence}`}>
      <Row gap="sm">
        <IconTile icon={icon} tone={tone} size="sm" />
        <Text variant="label" numberOfLines={1}>{title}</Text>
      </Row>
      <Text variant="caption" tone="muted" numberOfLines={3}>{sentence}</Text>
      <Stack flex={1} justify="end" align="start" minHeight={44}>{visual}</Stack>
    </Card>
  );
}
