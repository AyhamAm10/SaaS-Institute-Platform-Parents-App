import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { useSheets } from '@/features/children/hooks/useSheets';

export default function TabsLayout() {
  const openQuick = useSheets((s) => s.openQuick);
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} onAction={openQuick} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="attendance" />
      <Tabs.Screen name="marks" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
