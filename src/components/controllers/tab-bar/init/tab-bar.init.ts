import type { IconName } from '../../icon';

export const TAB_BAR_HEIGHT = 72;

export interface TabMeta { icon: IconName; label: string }

/** Route name -> icon and label (supplied by the app shell, so this controller has no strings). */
export type TabItems = Record<string, TabMeta>;
