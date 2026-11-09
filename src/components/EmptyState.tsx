import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  hint?: string;
}

export function EmptyState({ icon, title, hint }: Props) {
  const theme = useTheme();
  return (
    <View accessible style={{ alignItems: 'center', gap: space.sm, paddingVertical: space.huge, paddingHorizontal: space.xl }}>
      <View style={{ width: 72, height: 72, borderRadius: 26, backgroundColor: theme.tints.accent, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={32} color={theme.accent} />
      </View>
      <AppText variant="heading" center>{title}</AppText>
      {hint ? <AppText color="textMuted" center>{hint}</AppText> : null}
    </View>
  );
}
