import { Avatar, Pill } from '@/components/controllers';
import { useCanSwitchChild, useSelectedChild } from '@/core/auth/hooks';
import { ar } from '@/core/strings/ar';
import { useSheets } from '../hooks/useSheets';

/** Header pill: avatar initial + first names. Opens the child switcher only for families with several children. */
export function ChildPill() {
  const child = useSelectedChild();
  const canSwitch = useCanSwitchChild();
  const openChild = useSheets((s) => s.openChild);
  if (!child) return null;
  return (
    <Pill
      label={child.fullName.split(' ').slice(0, 2).join(' ')}
      leading={<Avatar name={child.fullName} />}
      onPress={canSwitch ? openChild : undefined}
      a11yLabel={canSwitch ? `${ar.children.switchLabel}، ${child.fullName}` : child.fullName}
    />
  );
}
