/** Icon set: Ionicons only. Duotone = filled glyph (faint) under the outline glyph (full). */
export const DUOTONE_ICONS = [
  'home', 'calendar', 'ribbon', 'person-circle', 'notifications', 'time', 'wallet', 'document-text',
  'information-circle', 'log-out', 'location', 'call', 'people', 'school', 'card', 'megaphone',
  'close-circle', 'checkmark-circle', 'happy', 'cafe', 'calendar-clear', 'cloud-offline', 'share-social',
  'person', 'swap-horizontal', 'notifications-off', 'bus', 'receipt', 'alert-circle', 'sparkles',
  'trending-up', 'shield-checkmark', 'book', 'ellipse', 'refresh', 'moon',
] as const;

export const PLAIN_ICONS = [
  'add', 'close', 'checkmark', 'chevron-back', 'chevron-forward', 'chevron-down', 'chevron-up',
  'eye', 'eye-off', 'logo-whatsapp',
] as const;

export type DuotoneIconName = (typeof DUOTONE_ICONS)[number];
export type PlainIconName = (typeof PLAIN_ICONS)[number];
export type IconName = DuotoneIconName | PlainIconName;

export const ICON_PX = { xs: 14, sm: 18, md: 22, lg: 28, xl: 36 } as const;
export type IconSize = keyof typeof ICON_PX;

export function isPlain(name: IconName): name is PlainIconName {
  return (PLAIN_ICONS as readonly string[]).includes(name);
}

/** Navigation chevrons that follow the Arabic reading flow. */
export const FORWARD_ICON: IconName = 'chevron-back';
export const BACK_ICON: IconName = 'chevron-forward';
