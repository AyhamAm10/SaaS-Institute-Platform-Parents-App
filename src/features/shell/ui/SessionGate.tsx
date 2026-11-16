import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { BrandSplash } from '@/components/controllers';
import { restoreSession } from '@/core/auth/actions';
import { useSession } from '@/core/auth/store';
import { ar } from '@/core/strings/ar';
import { useAppFonts } from '@/core/theme/fonts';
import { useTheme } from '@/core/theme/ThemeProvider';

/** Splash while the session/fonts load, then the signed-out or signed-in navigators. */
export function SessionGate() {
  const status = useSession((s) => s.status);
  const theme = useTheme();
  const fontsReady = useAppFonts();

  useEffect(() => {
    void restoreSession();
  }, []);

  useEffect(() => {
    if (fontsReady) void SplashScreen.hideAsync();
  }, [fontsReady]);

  if (status === 'restoring' || !fontsReady) return <BrandSplash label={ar.auth.restoring} />;
  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.bg } }}>
        <Stack.Protected guard={status === 'signedOut'}>
          <Stack.Screen name="login" />
        </Stack.Protected>
        <Stack.Protected guard={status === 'mustChangePassword'}>
          <Stack.Screen name="change-password" />
        </Stack.Protected>
        <Stack.Protected guard={status === 'signedIn'}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
