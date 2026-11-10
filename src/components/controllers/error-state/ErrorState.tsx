import { toArabicMessage } from '@/core/api/errors';
import { ar } from '@/core/strings/ar';
import { Button } from '../button';
import { Illustration } from '../empty-state/ui/Illustration';
import { Stack } from '../layout';
import { Text } from '../text';

interface Props { error: unknown; onRetry: () => void }

/** Arabic error message with a cloud illustration and a retry button. */
export function ErrorState({ error, onRetry }: Props) {
  return (
    <Stack accessibilityRole="alert" align="center" gap="md" py="xl" px="xl">
      <Illustration art="cloud" />
      <Text variant="heading" align="center">{ar.errors.loadFailed}</Text>
      <Text tone="muted" align="center">{toArabicMessage(error)}</Text>
      <Button label={ar.common.retry} icon="refresh" variant="ghost" compact onPress={onRetry} />
    </Stack>
  );
}
