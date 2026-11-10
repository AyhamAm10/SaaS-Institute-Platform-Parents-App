import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { AppRoot } from '@/components/controllers';
import { queryClient } from '@/core/api/query-client';
import { enforceRTL } from '@/core/layout/rtl';
import { SessionGate } from './SessionGate';

enforceRTL();
void SplashScreen.preventAutoHideAsync();

/** Root of the app: visual providers, data client, then the session gate. */
export function RootShell() {
  return (
    <AppRoot>
      <QueryClientProvider client={queryClient}>
        <SessionGate />
      </QueryClientProvider>
    </AppRoot>
  );
}
