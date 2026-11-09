import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '@/core/api/query-client';
import { restoreSession } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { enforceRTL } from '@/core/layout/rtl';
import { ThemeProvider, useTheme } from '@/core/theme/ThemeProvider';
import { AppText } from '@/components/AppText';
import { ar } from '@/core/strings/ar';

enforceRTL();
void SplashScreen.preventAutoHideAsync();

function Gate() {
  const status = useSession((s) => s.status);
  const theme = useTheme();

  useEffect(() => {
    void restoreSession();
  }, []);

  useEffect(() => {
    if (status !== 'restoring') void SplashScreen.hideAsync();
  }, [status]);

  if (status === 'restoring') {
    return (
      <View accessibilityLabel={ar.auth.restoring} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: theme.background }}>
        <ActivityIndicator color={theme.accent} size="large" />
        <AppText color="textMuted">{ar.auth.restoring}</AppText>
      </View>
    );
  }
  return (
    <>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
        <Stack.Protected guard={status === 'signedOut'}>
          <Stack.Screen name="login" />
        </Stack.Protected>
        <Stack.Protected guard={status === 'signedIn'}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <View style={{ flex: 1 }}>
              <Gate />
            </View>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
