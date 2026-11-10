import type { TabItems } from '@/components/controllers';
import { ar } from '@/core/strings/ar';

/** Route name -> icon + Arabic label for the floating tab bar. */
export const TAB_ITEMS: TabItems = {
  index: { icon: 'home', label: ar.tabs.home },
  attendance: { icon: 'calendar', label: ar.tabs.attendance },
  marks: { icon: 'ribbon', label: ar.tabs.marks },
  more: { icon: 'person-circle', label: ar.tabs.more },
};
