import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { useTheme, type Theme } from '@/core/theme/ThemeProvider';

export type Art = 'calendar' | 'bell' | 'wallet' | 'medal' | 'smile' | 'rest' | 'cloud';

function Shape({ art, t }: { art: Art; t: Theme }) {
  const paper = t.surfaceSolid;
  const line = t.border;
  switch (art) {
    case 'calendar':
      return (
        <G>
          <Rect x={30} y={36} width={60} height={52} rx={12} fill={paper} stroke={line} strokeWidth={2} />
          <Path d="M30 52a12 12 0 0 1 12-16h36a12 12 0 0 1 12 16z" fill={t.brandAccent} />
          <Rect x={42} y={28} width={5} height={14} rx={2.5} fill={t.ringEnd} />
          <Rect x={73} y={28} width={5} height={14} rx={2.5} fill={t.ringEnd} />
          <Circle cx={46} cy={66} r={4} fill={t.brandAccentRing} />
          <Circle cx={60} cy={66} r={4} fill={t.brandAccent} />
          <Circle cx={74} cy={66} r={4} fill={t.brandAccentRing} />
          <Circle cx={46} cy={78} r={4} fill={t.brandAccentRing} />
          <Circle cx={60} cy={78} r={4} fill={t.brandAccentRing} />
        </G>
      );
    case 'bell':
      return (
        <G>
          <Path d="M60 32c-14 0-22 10-22 24v14l-6 8h56l-6-8V56c0-14-8-24-22-24z" fill={paper} stroke={line} strokeWidth={2} />
          <Path d="M60 32c-14 0-22 10-22 24v8h44v-8c0-14-8-24-22-24z" fill={t.brandAccent} opacity={0.9} />
          <Circle cx={60} cy={28} r={4} fill={t.ringEnd} />
          <Path d="M52 90a8 8 0 0 0 16 0z" fill={t.ringEnd} />
        </G>
      );
    case 'wallet':
      return (
        <G>
          <Rect x={28} y={42} width={64} height={44} rx={12} fill={paper} stroke={line} strokeWidth={2} />
          <Path d="M32 50a8 8 0 0 1 8-8h38l-6 8z" fill={t.brandAccent} />
          <Rect x={66} y={58} width={26} height={16} rx={8} fill={t.brandAccentSoft} stroke={t.brandAccent} strokeWidth={2} />
          <Circle cx={76} cy={66} r={3.5} fill={t.brandAccent} />
        </G>
      );
    case 'medal':
      return (
        <G>
          <Path d="M44 30l16 26 16-26" fill="none" stroke={t.ringEnd} strokeWidth={8} strokeLinejoin="round" />
          <Circle cx={60} cy={72} r={20} fill={paper} stroke={t.brandAccent} strokeWidth={5} />
          <Path d="M60 62l3.5 7 7.5 1-5.5 5.2 1.4 7.5-6.9-3.7-6.9 3.7 1.4-7.5L49 70l7.5-1z" fill={t.brandAccent} />
        </G>
      );
    case 'smile':
      return (
        <G>
          <Circle cx={60} cy={60} r={30} fill={paper} stroke={line} strokeWidth={2} />
          <Circle cx={50} cy={54} r={3.5} fill={t.textPrimary} />
          <Circle cx={70} cy={54} r={3.5} fill={t.textPrimary} />
          <Path d="M47 68c6 9 20 9 26 0" fill="none" stroke={t.brandAccent} strokeWidth={5} strokeLinecap="round" />
        </G>
      );
    case 'rest':
      return (
        <G>
          <Path d="M36 50h42v20a18 18 0 0 1-18 18h-6a18 18 0 0 1-18-18z" fill={paper} stroke={line} strokeWidth={2} />
          <Path d="M78 56h6a8 8 0 0 1 0 16h-8" fill="none" stroke={t.brandAccent} strokeWidth={5} strokeLinecap="round" />
          <Path d="M50 40c-3-5 3-7 0-12M62 40c-3-5 3-7 0-12" fill="none" stroke={t.brandAccent} strokeWidth={4} strokeLinecap="round" />
        </G>
      );
    default:
      return (
        <G>
          <Path d="M38 82a16 16 0 0 1-2-32 22 22 0 0 1 42-4 18 18 0 0 1 6 36z" fill={paper} stroke={line} strokeWidth={2} />
          <Path d="M52 58l16 16M68 58L52 74" stroke={t.dangerSolid} strokeWidth={5} strokeLinecap="round" />
        </G>
      );
  }
}

/** Composed SVG scene: soft orange disc + a simple object, all drawn from brand tokens. */
export function Illustration({ art }: { art: Art }) {
  const t = useTheme();
  return (
    <Svg width={140} height={120} viewBox="0 0 120 120" aria-hidden>
      <Circle cx={60} cy={62} r={50} fill={t.brandAccentSoft} />
      <Circle cx={60} cy={62} r={50} fill="none" stroke={t.brandAccentRing} strokeWidth={2} strokeDasharray="4 8" />
      <Circle cx={100} cy={30} r={5} fill={t.brandAccent} opacity={0.7} />
      <Circle cx={18} cy={86} r={3.5} fill={t.ringStart} />
      <Shape art={art} t={t} />
    </Svg>
  );
}
