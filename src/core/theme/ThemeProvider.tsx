import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkTokens, lightTokens, type ThemeTokens } from './tokens';

export type Scheme = 'light' | 'dark';
export interface Theme extends ThemeTokens { scheme: Scheme }

const build = (scheme: Scheme): Theme => ({ scheme, ...(scheme === 'dark' ? darkTokens : lightTokens) });
const ThemeContext = createContext<Theme>(build('light'));

/** Follows the system color scheme. Identity comes from ./tokens, never from the backend. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme: Scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = useMemo(() => build(scheme), [scheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Forces one scheme for a subtree (e.g. the always-dark login). */
export function ThemeScope({ scheme, children }: { scheme: Scheme; children: ReactNode }) {
  const theme = useMemo(() => build(scheme), [scheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): Theme => useContext(ThemeContext);
