import { Stack } from 'expo-router';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ChildSheet } from '@/features/children/ui/ChildSheet';
import { QuickActionsSheet } from '@/features/children/ui/QuickActionsSheet';

/** Signed-in area: tabs + pushed screens, with the two app-wide sheets mounted once. */
export function AppStack() {
  const theme = useTheme();
  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.bg } }} />
      <ChildSheet />
      <QuickActionsSheet />
    </>
  );
}
