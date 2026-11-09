import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { space } from '@/core/theme/metrics';

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View accessible accessibilityLabel={`${label}: ${value}`} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: space.md, paddingVertical: space.sm }}>
      <AppText color="textMuted">{label}</AppText>
      <AppText variant="bodyStrong" style={{ flexShrink: 1, textAlign: 'right' }}>{value}</AppText>
    </View>
  );
}
