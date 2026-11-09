import { ensureContrast, isHex, mix, readableOn } from './color';

export type Scheme = 'light' | 'dark';

export interface Brand { primary: string; secondary: string }

export const FALLBACK_BRAND: Brand = { primary: '#1a73e8', secondary: '#34a853' };

export function resolveBrand(primary?: string | null, secondary?: string | null): Brand {
  return {
    primary: isHex(primary) ? primary : FALLBACK_BRAND.primary,
    secondary: isHex(secondary) ? secondary : FALLBACK_BRAND.secondary,
  };
}

export interface Theme {
  scheme: Scheme;
  background: string;
  surface: string;
  elevated: string;
  text: string;
  textMuted: string;
  border: string;
  track: string;
  accent: string;
  onAccent: string;
  secondary: string;
  fab: string;
  onFab: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  overlay: string;
  shadow: string;
  tints: { accent: string; success: string; warning: string; danger: string; info: string; secondary: string };
}

const BASE = {
  light: {
    background: '#F3F5F9', surface: '#FFFFFF', elevated: '#FFFFFF', text: '#101828', textMuted: '#566074',
    border: '#E4E8EF', track: '#E9EDF4', fab: '#141A26',
    success: '#177A36', warning: '#B45309', danger: '#C62828', info: '#1A5FB4',
    overlay: 'rgba(16,24,40,0.45)', shadow: '0px 8px 28px rgba(16,24,40,0.07)',
  },
  dark: {
    background: '#0E1117', surface: '#171B23', elevated: '#1F2430', text: '#F2F4F8', textMuted: '#A3ACBD',
    border: '#2A3140', track: '#2A3140', fab: '#F2F4F8',
    success: '#4ADE80', warning: '#FBBF24', danger: '#F87171', info: '#60A5FA',
    overlay: 'rgba(0,0,0,0.62)', shadow: '0px 8px 28px rgba(0,0,0,0.35)',
  },
} as const;

/** Builds the full theme from the institute brand colors, for one scheme. */
export function buildTheme(brand: Brand, scheme: Scheme): Theme {
  const b = BASE[scheme];
  const dark = scheme === 'dark';
  const accent = ensureContrast(brand.primary, b.surface, 4.5, dark);
  const secondary = ensureContrast(brand.secondary, b.surface, 3, dark);
  const tint = (c: string) => mix(c, b.surface, dark ? 0.2 : 0.13);
  return {
    scheme,
    ...b,
    accent,
    onAccent: readableOn(accent),
    secondary,
    onFab: dark ? '#141A26' : '#FFFFFF',
    tints: {
      accent: tint(accent), secondary: tint(secondary), success: tint(b.success),
      warning: tint(b.warning), danger: tint(b.danger), info: tint(b.info),
    },
  };
}

