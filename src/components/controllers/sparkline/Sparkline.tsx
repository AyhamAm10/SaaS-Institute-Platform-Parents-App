import { useId } from 'react';
import Svg, { Defs, LinearGradient, Path, Polyline, Stop } from 'react-native-svg';
import { sparklinePoints } from '@/core/format/ring';
import { toneColors, type ToneKey } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { values: number[]; tone?: ToneKey }

const W = 96;
const H = 40;
const PAD = 4;

/** Tiny decorative trend (values 0-100) with a soft area fill; the number beside it carries the meaning. */
export function Sparkline({ values, tone = 'accent' }: Props) {
  const theme = useTheme();
  const id = `s${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const color = toneColors(theme, tone).solid;
  const pts = sparklinePoints(values, W - PAD * 2, H - PAD * 2)
    .split(' ')
    .filter(Boolean)
    .map((p) => {
      const [x, y] = p.split(',').map(Number);
      return [x + PAD, y + PAD] as const;
    });
  if (pts.length < 2) return null;
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `M${pts[0][0]},${H} L${line.replace(/ /g, ' L')} L${pts[pts.length - 1][0]},${H} Z`;
  return (
    <Svg width={W} height={H} aria-hidden>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill={`url(#${id})`} />
      <Polyline points={line} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
