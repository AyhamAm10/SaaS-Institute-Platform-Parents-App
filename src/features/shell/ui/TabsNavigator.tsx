import { Tabs } from 'expo-router';
import { TabBar } from '@/components/controllers';
import { ar } from '@/core/strings/ar';
import { useSheets } from '@/features/children/hooks/useSheets';
import { TAB_ITEMS } from '../static-data/tabs';

/** The four tabs with the floating glass tab bar; the center button opens the quick-actions sheet. */
export function TabsNavigator() {
  const openQuick = useSheets((s) => s.openQuick);
  const quickOpen = useSheets((s) => s.quickOpen);
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <TabBar {...props} items={TAB_ITEMS} actionLabel={ar.tabs.quick} actionOpen={quickOpen} onAction={openQuick} />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="attendance" />
      <Tabs.Screen name="marks" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
