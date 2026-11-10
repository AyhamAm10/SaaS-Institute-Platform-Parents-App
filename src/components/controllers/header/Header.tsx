import type { ReactNode } from 'react';
import { ar } from '@/core/strings/ar';
import { BACK_ICON } from '../icon';
import { IconButton } from '../icon-button';
import { Row, Stack } from '../layout';
import { Text } from '../text';

interface Props {
  /** Centered title (sub screens). */
  title?: string;
  /** Shows the round back button (sub screens). */
  onBack?: () => void;
  /** Reading-start content when there is no back button (logo mark, child pill). */
  start?: ReactNode;
  /** Reading-end content (notification bell). */
  end?: ReactNode;
}

const SLOT = 52;

/** Header row: back button or start content, optional centered title, end content. */
export function Header({ title, onBack, start, end }: Props) {
  return (
    <Row gap="md" minHeight={SLOT}>
      <Row flex={title ? undefined : 1} gap="sm" minHeight={SLOT} width={title ? SLOT : undefined}>
        {onBack ? <IconButton icon={BACK_ICON} label={ar.common.back} onPress={onBack} /> : start}
      </Row>
      {title ? <Stack flex={1} align="center"><Text variant="heading" align="center" numberOfLines={1} accessibilityRole="header">{title}</Text></Stack> : null}
      <Row justify="end" minHeight={SLOT} width={title ? SLOT : undefined}>{end}</Row>
    </Row>
  );
}
