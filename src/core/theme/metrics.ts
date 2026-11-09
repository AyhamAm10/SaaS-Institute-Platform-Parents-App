export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, huge: 40 } as const;

export const radius = { sm: 12, md: 18, lg: 24, card: 28, pill: 999 } as const;

export const type = {
  display: { fontSize: 44, lineHeight: 52, fontWeight: '800' },
  title: { fontSize: 22, lineHeight: 30, fontWeight: '700' },
  heading: { fontSize: 17, lineHeight: 24, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  captionStrong: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
  micro: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
} as const;

export type TypeVariant = keyof typeof type;

/** Minimum touch target (pt/dp). */
export const HIT = 44;

/** Max content width so tablets and the web preview keep a phone-like column. */
export const MAX_WIDTH = 560;
