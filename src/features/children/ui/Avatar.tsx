import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { useTheme } from '@/core/theme/ThemeProvider';

/** Initial-letter avatar (no photos exist in the API). */
export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const theme = useTheme();
  return (
    <View
      aria-hidden
      style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.tints.accent, alignItems: 'center', justifyContent: 'center' }}
    >
      <AppText variant="captionStrong" color="accent" style={{ fontSize: size * 0.42, lineHeight: size * 0.6 }}>
        {name.trim().charAt(0)}
      </AppText>
    </View>
  );
}
