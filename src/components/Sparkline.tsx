import Svg, { Polyline } from 'react-native-svg';
import { sparklinePoints } from '@/core/format/ring';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { values: number[]; width?: number; height?: number; color?: string }

/** Tiny decorative trend line (values 0-100); the number next to it carries the meaning. */
export function Sparkline({ values, width = 96, height = 40, color }: Props) {
  const theme = useTheme();
  return (
    <Svg width={width} height={height} aria-hidden>
      <Polyline
        points={sparklinePoints(values, width, height - 6).split(' ').map((p) => { const [x, y] = p.split(','); return `${x},${Number(y) + 3}`; }).join(' ')}
        fill="none"
        stroke={color ?? theme.accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
