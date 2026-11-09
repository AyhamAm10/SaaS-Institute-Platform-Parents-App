import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { openUrl, telUrl, whatsappUrl } from '../utils/contact';

export function InstituteCard() {
  const theme = useTheme();
  const inst = useSession((s) => s.me?.institute);
  if (!inst) return null;
  const hasContact = !!inst.phone || !!inst.address;
  return (
    <Card style={{ gap: space.md }}>
      <AppText variant="heading" accessibilityRole="header">{inst.name}</AppText>
      {inst.address ? (
        <View accessible accessibilityLabel={`${ar.more.address}: ${inst.address}`} style={{ flexDirection: 'row', gap: space.sm, alignItems: 'center' }}>
          <Ionicons name="location-outline" size={18} color={theme.textMuted} />
          <AppText color="textMuted" style={{ flex: 1 }}>{inst.address}</AppText>
        </View>
      ) : null}
      {inst.phone ? (
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <View style={{ flex: 1 }}><Button label={ar.more.call} icon="call" onPress={() => void openUrl(telUrl(inst.phone ?? ''))} /></View>
          <View style={{ flex: 1 }}><Button label={ar.more.whatsapp} icon="logo-whatsapp" variant="soft" onPress={() => void openUrl(whatsappUrl(inst.phone ?? ''))} /></View>
        </View>
      ) : null}
      {hasContact ? null : <AppText color="textMuted">{ar.more.noContact}</AppText>}
    </Card>
  );
}
