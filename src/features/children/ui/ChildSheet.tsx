import { Avatar, ListItem, Sheet } from '@/components/controllers';
import { selectChild } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { useSheets } from '../hooks/useSheets';

export function ChildSheet() {
  const open = useSheets((s) => s.childOpen);
  const close = useSheets((s) => s.closeChild);
  const children = useSession((s) => s.me?.children ?? []);
  const selected = useSession((s) => s.selectedChildId);
  return (
    <Sheet visible={open} title={ar.children.pick} onClose={close}>
      {children.map((c) => (
        <ListItem
          key={c.id}
          leading={<Avatar name={c.fullName} size="md" />}
          title={c.fullName}
          subtitle={c.section?.name ?? c.branch.name}
          selected={c.id === selected}
          chevron={false}
          label={`${c.fullName}${c.section ? `، ${c.section.name}` : ''}`}
          onPress={() => {
            selectChild(c.id);
            close();
          }}
        />
      ))}
    </Sheet>
  );
}
