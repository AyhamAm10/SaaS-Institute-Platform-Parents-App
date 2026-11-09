/** Pure color math (hex only). The only place besides tokens.ts that handles hex. */
type Rgb = [number, number, number];

export function isHex(value: string | null | undefined): value is string {
  return !!value && /^#[0-9a-fA-F]{6}$/.test(value);
}

export function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]: Rgb): string {
  const h = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

/** Mixes `a` over `b`: weight 1 = all a. */
export function mix(a: string, b: string, weight: number): string {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return rgbToHex([0, 1, 2].map((i) => x[i] * weight + y[i] * (1 - weight)) as Rgb);
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Moves `color` toward black (light UI) or white (dark UI) until it reaches `min` contrast on `bg`. */
export function ensureContrast(color: string, bg: string, min: number, towardWhite: boolean): string {
  let out = color;
  for (let i = 0; i < 20 && contrast(out, bg) < min; i += 1) {
    out = mix(towardWhite ? '#ffffff' : '#000000', out, 0.12);
  }
  return out;
}

export function readableOn(bg: string): string {
  return contrast('#ffffff', bg) >= contrast('#101828', bg) ? '#ffffff' : '#101828';
}

export function withAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
