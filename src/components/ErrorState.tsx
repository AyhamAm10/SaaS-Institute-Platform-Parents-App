import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toArabicMessage } from '@/core/api/errors';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';
import { Button } from './Button';

interface Props { error: unknown; onRetry: () => void }

export function ErrorState({ error, onRetry }: Props) {
  const theme = useTheme();
  return (
    <View accessibilityRole="alert" style={{ alignItems: 'center', gap: space.md, paddingVertical: space.huge, paddingHorizontal: space.xl }}>
      <View style={{ width: 72, height: 72, borderRadius: 26, backgroundColor: theme.tints.danger, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name="cloud-offline-outline" size={32} color={theme.danger} />
      </View>
      <AppText variant="heading" center>{ar.errors.loadFailed}</AppText>
      <AppText color="textMuted" center>{toArabicMessage(error)}</AppText>
      <Button label={ar.common.retry} icon="refresh" variant="soft" onPress={onRetry} />
    </View>
  );
}
