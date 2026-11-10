import type { ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@/core/theme/ThemeProvider';

function ThemedStatusBar() {
  return <StatusBar style={useTheme().scheme === 'dark' ? 'light' : 'dark'} />;
}

/** Root providers of the visual layer: gestures, safe areas, theme. */
export function AppRoot({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemedStatusBar />
          {children}
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
