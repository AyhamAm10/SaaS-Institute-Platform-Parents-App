import { sizes, type Size } from '@/core/theme/metrics';
import type { ToneKey } from '@/core/theme/tones';
import { Box } from '../layout';
import { Icon, type IconName } from '../icon';

interface Props {
  icon: IconName;
  tone?: ToneKey;
  size?: Extract<Size, 'sm' | 'md' | 'lg'>;
}

/** Pastel tinted rounded tile holding a duotone icon. */
export function IconTile({ icon, tone = 'accent', size = 'md' }: Props) {
  const px = sizes[size];
  const vivid = tone === 'accent' || tone === 'warning';
  return (
    <Box width={px} height={px} radius="md" align="center" justify="center" aria-hidden soft={tone}>
      <Icon name={icon} size={size === 'lg' ? 'lg' : size === 'md' ? 'md' : 'sm'} tone={vivid ? 'accentSolid' : tone === 'neutral' ? 'secondary' : tone} />
    </Box>
  );
}
