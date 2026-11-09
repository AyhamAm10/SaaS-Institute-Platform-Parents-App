import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useSession } from '@/core/auth/store';
import { buildTheme, resolveBrand, type Theme } from './tokens';

const ThemeContext = createContext<Theme>(buildTheme(resolveBrand(null, null), 'light'));

/** Builds the theme from the institute brand colors (GET /mobile/me) and the system scheme. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const institute = useSession((s) => s.me?.institute);
  const theme = useMemo(
    () => buildTheme(resolveBrand(institute?.primaryColor, institute?.secondaryColor), scheme),
    [institute?.primaryColor, institute?.secondaryColor, scheme],
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): Theme => useContext(ThemeContext);
