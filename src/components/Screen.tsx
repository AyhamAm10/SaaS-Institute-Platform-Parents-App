import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAX_WIDTH, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { TAB_BAR_HEIGHT } from './TabBar';

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  /** Reserve room for the floating tab bar (tab screens only). */
  withTabBar?: boolean;
}

/** Safe-area aware scrolling page with a fixed header, centered max-width content and pull-to-refresh. */
export function Screen({ header, children, refreshing = false, onRefresh, withTabBar = false }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bottom = insets.bottom + space.xl + (withTabBar ? TAB_BAR_HEIGHT + space.xl : 0);
  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: insets.top }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: space.lg, paddingVertical: space.sm }}>
        {header}
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: bottom, gap: space.lg }}
        showsVerticalScrollIndicator={false}
        refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} colors={[theme.accent]} /> : undefined}
      >
        {children}
      </ScrollView>
    </View>
  );
}
