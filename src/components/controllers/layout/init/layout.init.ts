import type { DimensionValue, FlexStyle, ViewProps, ViewStyle } from 'react-native';
import { radius, space, type Radius, type Space } from '@/core/theme/metrics';
import type { Theme } from '@/core/theme/ThemeProvider';
import { toneColors, type ToneKey } from '@/core/theme/tones';

export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around';
export type Surface =
  | 'surface' | 'surfaceSolid' | 'subtle' | 'track' | 'brandPrimary' | 'brandAccent' | 'brandAccentSoft'
  | 'successSoft' | 'dangerSoft' | 'infoSoft' | 'border';

export interface BoxProps extends Omit<ViewProps, 'style'> {
  children?: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: Space;
  padding?: Space;
  px?: Space;
  py?: Space;
  pt?: Space;
  pb?: Space;
  align?: Align;
  justify?: Justify;
  self?: Align;
  wrap?: boolean;
  flex?: number;
  grow?: number;
  width?: DimensionValue;
  height?: DimensionValue;
  minHeight?: number;
  maxWidth?: number;
  bg?: Surface;
  /** Solid tone color background (status bars, dots). */
  solid?: ToneKey;
  /** Soft tinted tone background. */
  soft?: ToneKey;
  radius?: Radius;
  overflow?: 'hidden' | 'visible';
  opacity?: number;
  /** Absolutely fills the parent (decorative layers). */
  fill?: boolean;
}

const ALIGN: Record<Align, FlexStyle['alignItems']> = {
  start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline',
};
const JUSTIFY: Record<Justify, FlexStyle['justifyContent']> = {
  start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around',
};

/** Resolves token-typed layout props into a native style object (the only style source for layout). */
export function resolveBox(p: BoxProps, theme: Theme): ViewStyle {
  const s: ViewStyle = { flexDirection: p.direction ?? 'column' };
  if (p.gap) s.gap = space[p.gap];
  if (p.padding) s.padding = space[p.padding];
  if (p.px) s.paddingHorizontal = space[p.px];
  if (p.py) s.paddingVertical = space[p.py];
  if (p.pt) s.paddingTop = space[p.pt];
  if (p.pb) s.paddingBottom = space[p.pb];
  if (p.align) s.alignItems = ALIGN[p.align];
  if (p.justify) s.justifyContent = JUSTIFY[p.justify];
  if (p.self) s.alignSelf = ALIGN[p.self];
  if (p.wrap) s.flexWrap = 'wrap';
  if (p.flex !== undefined) s.flex = p.flex;
  if (p.grow !== undefined) s.flexGrow = p.grow;
  if (p.width !== undefined) s.width = p.width;
  if (p.height !== undefined) s.height = p.height;
  if (p.minHeight !== undefined) s.minHeight = p.minHeight;
  if (p.maxWidth !== undefined) s.maxWidth = p.maxWidth;
  if (p.bg) s.backgroundColor = theme[p.bg];
  if (p.solid) s.backgroundColor = toneColors(theme, p.solid).solid;
  if (p.soft) s.backgroundColor = toneColors(theme, p.soft).bg;
  if (p.radius) s.borderRadius = radius[p.radius];
  if (p.overflow) s.overflow = p.overflow;
  if (p.opacity !== undefined) s.opacity = p.opacity;
  if (p.fill) Object.assign(s, { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 });
  return s;
}

/** Props that belong to Box itself (everything else is forwarded to the native View). */
export const BOX_KEYS = [
  'direction', 'gap', 'padding', 'px', 'py', 'pt', 'pb', 'align', 'justify', 'self', 'wrap', 'flex', 'grow',
  'width', 'height', 'minHeight', 'maxWidth', 'bg', 'solid', 'soft', 'radius', 'overflow', 'opacity', 'fill',
] as const;
