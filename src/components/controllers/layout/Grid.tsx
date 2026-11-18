import { Children } from 'react';
import { Box } from './Box';
import type { BoxProps } from './init/layout.init';

interface GridProps extends Omit<BoxProps, 'direction' | 'wrap'> {
  /** Number of equal columns (default 2). */
  columns?: number;
}

/**
 * Equal-column grid: children are laid out in rows of `columns` equal cells
 * (flex 1 each), so the gap never pushes a cell onto its own line on narrow
 * screens. A last row that is not full keeps its cells at the same width.
 */
export function Grid({ columns = 2, gap = 'md', children, ...rest }: GridProps) {
  const cells = Children.toArray(children);
  const rows: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += columns) rows.push(cells.slice(i, i + columns));
  return (
    <Box {...rest} gap={gap} align="stretch">
      {rows.map((row, r) => (
        <Box key={r} direction="row" gap={gap} align="stretch">
          {row.map((child, c) => <Box key={c} flex={1} align="stretch">{child}</Box>)}
          {Array.from({ length: columns - row.length }, (_, k) => <Box key={`pad${k}`} flex={1} />)}
        </Box>
      ))}
    </Box>
  );
}
