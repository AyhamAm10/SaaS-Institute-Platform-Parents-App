import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ar } from '@/core/strings/ar';
import { tapHaptic } from '@/core/layout/haptics';
import { HIT, MAX_WIDTH, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from './AppText';

type TabBarFn = NonNullable<ComponentProps<typeof Tabs>['tabBar']>;
type TabBarProps = Parameters<TabBarFn>[0];
type IconName = keyof typeof Ionicons.glyphMap;

export const TAB_BAR_HEIGHT = 72;

const ICONS: Record<string, { on: IconName; off: IconName; label: string }> = {
  index: { on: 'home', off: 'home-outline', label: ar.tabs.home },
  attendance: { on: 'calendar', off: 'calendar-outline', label: ar.tabs.attendance },
  marks: { on: 'ribbon', off: 'ribbon-outline', label: ar.tabs.marks },
  more: { on: 'person-circle', off: 'person-circle-outline', label: ar.tabs.more },
};

/** Floating rounded tab bar: two tabs, a dark circular action button, two tabs. */
export function TabBar({ state, navigation, onAction }: TabBarProps & { onAction: () => void }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const renderTab = (route: TabBarProps['state']['routes'][number]) => {
    const meta = ICONS[route.name];
    if (!meta) return null;
    const focused = state.routes[state.index]?.key === route.key;
    return (
      <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityLabel={meta.label}
        accessibilityState={{ selected: focused }}
        onPress={() => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            tapHaptic();
            navigation.navigate(route.name, route.params);
          }
        }}
        style={{ flex: 1, minHeight: HIT + 12, alignItems: 'center', justifyContent: 'center', gap: 2 }}
      >
        <Ionicons name={focused ? meta.on : meta.off} size={24} color={focused ? theme.accent : theme.textMuted} />
        <AppText variant="micro" color={focused ? 'accent' : 'textMuted'} numberOfLines={1}>{meta.label}</AppText>
      </Pressable>
    );
  };

  const [first, second, third, fourth] = state.routes;
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', start: 0, end: 0, bottom: 0, alignItems: 'center' }}>
      <View
        accessibilityRole="tablist"
        style={{
          width: '100%', maxWidth: MAX_WIDTH, marginBottom: insets.bottom + space.sm, paddingHorizontal: space.lg,
        }}
      >
        <View
          style={{
            height: TAB_BAR_HEIGHT, borderRadius: 36, backgroundColor: theme.surface, boxShadow: theme.shadow,
            borderWidth: 1, borderColor: theme.border, flexDirection: 'row', alignItems: 'center', paddingHorizontal: space.sm,
          }}
        >
          {first ? renderTab(first) : null}
          {second ? renderTab(second) : null}
          <View style={{ width: 76, alignItems: 'center' }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={ar.tabs.quick}
              onPress={() => {
                tapHaptic();
                onAction();
              }}
              style={({ pressed }) => ({
                width: 58, height: 58, borderRadius: 29, backgroundColor: theme.fab, alignItems: 'center',
                justifyContent: 'center', transform: [{ scale: pressed ? 0.94 : 1 }], boxShadow: theme.shadow,
              })}
            >
              <Ionicons name="add" size={30} color={theme.onFab} />
            </Pressable>
          </View>
          {third ? renderTab(third) : null}
          {fourth ? renderTab(fourth) : null}
        </View>
      </View>
    </View>
  );
}
