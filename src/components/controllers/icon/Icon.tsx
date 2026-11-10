import type { ComponentProps } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { roleColor, type ColorRole } from '@/core/theme/roles';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Box } from '../layout';
import { ICON_PX, isPlain, type IconName, type IconSize } from './init/icon.init';

type Glyph = ComponentProps<typeof Ionicons>['name'];

interface Props {
  name: IconName;
  size?: IconSize;
  tone?: ColorRole;
  /** Duotone (default) layers a faint filled glyph under the outline. */
  duotone?: boolean;
}

/** Decorative icon (hidden from screen readers; the parent control carries the label). */
export function Icon({ name, size = 'md', tone = 'primary', duotone = true }: Props) {
  const theme = useTheme();
  const px = ICON_PX[size];
  const color = roleColor(theme, tone);
  const two = duotone && !isPlain(name);
  return (
    <Box width={px} height={px} align="center" justify="center" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden>
      {two ? (
        <Box fill align="center" justify="center" opacity={0.28}>
          <Ionicons name={name as Glyph} size={px} color={color} />
        </Box>
      ) : null}
      <Ionicons name={(two ? `${name}-outline` : name) as Glyph} size={px} color={color} />
    </Box>
  );
}
