import { ActivityIndicator, View } from 'react-native';
import { BRAND } from '@/core/brand';
import { ThemeScope, useTheme } from '@/core/theme/ThemeProvider';
import { AmbientBackground } from '../ambient';
import { BrandMark } from '../brand-mark';
import { Stack } from '../layout';
import { Text } from '../text';

function Content({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <View accessibilityLabel={label} style={{ flex: 1, backgroundColor: BRAND.ink }}>
      <AmbientBackground variant="login" />
      <Stack flex={1} align="center" justify="center" gap="lg">
        <BrandMark size="xl" glow />
        <Text variant="title" align="center">{BRAND.name}</Text>
        <ActivityIndicator color={theme.brandAccent} />
        <Text variant="caption" tone="muted">{label}</Text>
      </Stack>
    </View>
  );
}

/** Loading splash: ink canvas, orange glow, big logo, institute name. Always dark. */
export function BrandSplash({ label }: { label: string }) {
  return <ThemeScope scheme="dark"><Content label={label} /></ThemeScope>;
}
