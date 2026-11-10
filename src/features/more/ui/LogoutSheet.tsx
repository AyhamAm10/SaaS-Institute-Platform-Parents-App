import { useState } from 'react';
import { Button, Sheet, Stack, Text } from '@/components/controllers';
import { signOut } from '@/core/auth/actions';
import { ar } from '@/core/strings/ar';

export function LogoutSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <Sheet visible={visible} title={ar.more.logoutTitle} onClose={onClose}>
      <Stack gap="lg" px="sm">
        <Text tone="muted">{ar.more.logoutMessage}</Text>
        <Button
          label={ar.more.logout}
          variant="danger"
          icon="log-out"
          loading={busy}
          onPress={async () => {
            setBusy(true);
            await signOut();
          }}
        />
        <Button label={ar.common.cancel} variant="ghost" onPress={onClose} />
      </Stack>
    </Sheet>
  );
}
