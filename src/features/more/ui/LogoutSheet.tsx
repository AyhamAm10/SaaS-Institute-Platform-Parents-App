import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { signOut } from '@/core/auth/actions';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';

export function LogoutSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <BottomSheet visible={visible} title={ar.more.logoutTitle} onClose={onClose}>
      <View style={{ gap: space.lg, paddingBottom: space.md }}>
        <AppText color="textMuted">{ar.more.logoutMessage}</AppText>
        <Button
          label={ar.more.logout}
          variant="danger"
          icon="log-out-outline"
          loading={busy}
          onPress={async () => {
            setBusy(true);
            await signOut();
          }}
        />
        <Button label={ar.common.cancel} variant="soft" onPress={onClose} />
      </View>
    </BottomSheet>
  );
}
