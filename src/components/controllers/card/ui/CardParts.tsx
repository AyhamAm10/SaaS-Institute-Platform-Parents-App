import type { ReactNode } from 'react';
import { Row, Stack } from '../../layout';
import { Text } from '../../text';

interface HeaderProps {
  title: string;
  subtitle?: string;
  /** Trailing slot (pill, button...). */
  end?: ReactNode;
  /** Leading slot (icon tile). */
  start?: ReactNode;
}

export function CardHeader({ title, subtitle, end, start }: HeaderProps) {
  return (
    <Row gap="md" justify="between">
      <Row gap="md" flex={1}>
        {start}
        <Stack flex={1}>
          <Text variant="heading" accessibilityRole="header" numberOfLines={1}>{title}</Text>
          {subtitle ? <Text variant="caption" tone="muted">{subtitle}</Text> : null}
        </Stack>
      </Row>
      {end}
    </Row>
  );
}

export function CardBody({ children, gap = 'md' }: { children: ReactNode; gap?: 'xs' | 'sm' | 'md' | 'lg' }) {
  return <Stack gap={gap} align="stretch">{children}</Stack>;
}
