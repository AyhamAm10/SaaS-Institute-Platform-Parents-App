import { HIT } from '@/core/theme/metrics';
import { PressableScale } from '../_shared/PressableScale';
import { Box, Row } from '../layout';
import { Text } from '../text';

interface Props { title: string; actionLabel?: string; onAction?: () => void }

/** Section title with a small orange accent bar and an optional trailing action. */
export function SectionHeader({ title, actionLabel, onAction }: Props) {
  return (
    <Row justify="between" minHeight={HIT} px="xs">
      <Row gap="sm">
        <Box width={4} height={18} radius="pill" bg="brandAccent" aria-hidden />
        <Text variant="heading" accessibilityRole="header">{title}</Text>
      </Row>
      {onAction && actionLabel ? (
        <PressableScale label={`${actionLabel} ${title}`} onPress={onAction} hitSlop={8} inner={{ minHeight: HIT, justifyContent: 'center' }}>
          <Text variant="label" tone="accent">{actionLabel}</Text>
        </PressableScale>
      ) : null}
    </Row>
  );
}
