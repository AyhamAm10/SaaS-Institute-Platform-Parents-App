import { Children } from 'react';
import { Box } from './Box';
import type { BoxProps } from './init/layout.init';

interface GridProps extends Omit<BoxProps, 'direction' | 'wrap'> {
  /** Number of equal columns (default 2). */
  columns?: number;
}

/** Equal-column grid built from wrapping flex cells (cells grow when a row is not full). */
export function Grid({ columns = 2, gap = 'md', children, ...rest }: GridProps) {
  const basis = `${100 / columns - 3}%` as const;
  return (
    <Box {...rest} gap={gap} direction="row" wrap align="stretch">
      {Children.toArray(children).map((child, i) => (
        <Box key={i} grow={1} width={basis} align="stretch">{child}</Box>
      ))}
    </Box>
  );
}
