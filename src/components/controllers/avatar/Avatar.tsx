import { sizes, type Size } from '@/core/theme/metrics';
import { Box } from '../layout';
import { Text } from '../text';

interface Props {
  name: string;
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
}

/** Initial-letter avatar on a soft orange disc (the API has no photos). */
export function Avatar({ name, size = 'sm' }: Props) {
  const px = sizes[size];
  return (
    <Box width={px} height={px} radius="pill" bg="brandAccentSoft" align="center" justify="center" aria-hidden>
      <Text variant={size === 'sm' ? 'label' : 'heading'} tone="accent">{name.trim().charAt(0)}</Text>
    </Box>
  );
}
