import type { ComponentProps } from 'react';
import { View } from 'react-native';
import type { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAX_WIDTH, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Row } from '../layout';
import { TAB_BAR_HEIGHT, type TabItems } from './init/tab-bar.init';
import { ActionButton } from './ui/ActionButton';
import { TabItem } from './ui/TabItem';

type TabBarFn = NonNullable<ComponentProps<typeof Tabs>['tabBar']>;
type TabBarProps = Parameters<TabBarFn>[0];

interface Props extends TabBarProps {
  items: TabItems;
  actionLabel: string;
  actionOpen: boolean;
  onAction: () => void;
}

/** Floating solid ink dock: two tabs, an orange action button with glow, two tabs. */
export function TabBar({ state, navigation, items, actionLabel, actionOpen, onAction }: Props) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const routes = state.routes.filter((r) => items[r.name]);
  const render = (route: (typeof routes)[number]) => {
    const focused = state.routes[state.index]?.key === route.key;
    return (
      <TabItem
        key={route.key} meta={items[route.name]} focused={focused}
        onPress={() => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        }}
      />
    );
  };
  const half = Math.ceil(routes.length / 2);
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', start: 0, end: 0, bottom: 0, alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, paddingHorizontal: space.lg, marginBottom: insets.bottom + space.sm }}>
        <View style={{ borderRadius: radius.pill, backgroundColor: theme.dockBg, borderWidth: 1, borderColor: theme.dockBorder, boxShadow: theme.elev3 }}>
          <Row accessibilityRole="tablist" height={TAB_BAR_HEIGHT} px="sm">
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {routes.slice(0, half).map(render)}
            </View>
            <View style={{ width: 70, alignItems: 'center' }}>
              <ActionButton label={actionLabel} open={actionOpen} onPress={onAction} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {routes.slice(half).map(render)}
            </View>
          </Row>
        </View>
      </View>
    </View>
  );
}
