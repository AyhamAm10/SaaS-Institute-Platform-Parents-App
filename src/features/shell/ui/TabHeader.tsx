import { BrandMark, Header } from '@/components/controllers';
import { ChildPill } from '@/features/children/ui/ChildPill';
import { HeaderBell } from '@/features/notifications/ui/HeaderBell';

/** Header of the tab screens: logo mark and child pill at the start, bell at the end. */
export function TabHeader() {
  return <Header start={<><BrandMark /><ChildPill /></>} end={<HeaderBell />} />;
}
