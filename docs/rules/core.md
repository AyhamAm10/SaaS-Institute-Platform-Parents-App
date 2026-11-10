# parents-app rules (binding)

One Expo app for guardians (`FAMILY`) and students (`STUDENT`) of ONE institute (معهد جيل السلام). Arabic only, RTL. Read `docs/features/mobile-app.md` (workspace `docs/`) first. Expo changed: check https://docs.expo.dev/versions/v57.0.0/ when unsure. The architecture mirrors `admin-dashboard` (controller components); the identity comes from the dashboard theme.

## Layers (top to bottom; each may import only from layers below it)
1. `src/core/brand/` + `src/core/theme/`: identity, tokens, metrics, ThemeProvider. The ONLY source of colors, radii, spacing, shadows, font families, durations. Hex/rgba literals are allowed only here.
2. `src/components/controllers/<name>/`: the design system (catalog in `controllers/README.md`). Folders only as needed: `init/` (props, variant maps), `state/` + `store/` (only if genuinely stateful), `ui/` (pure parts), `<Name>.tsx` (root, compound API like `Card.Header`, `HeroStat.Ring`), `index.ts`. Only this layer may import `View Text Pressable ScrollView FlatList Image TextInput StyleSheet`, reanimated, svg, blur, linear-gradient, icons, gesture-handler, and write style values (always from tokens).
3. `src/features/<feature>/{api,hooks,utils,static-data,ui}`: `api` = axios calls, `hooks` = TanStack Query + state composition, `ui` COMPOSES controllers only (`Stack/Row/Box/Grid` props for layout).
4. `src/app/**` (expo-router): each route file renders ONE `<XScreen />` exported by its feature (layouts render a shell from `features/shell`).
`src/core/{api,auth,storage,format,strings,layout}` is infrastructure usable by every layer.

## ESLint enforcement (`eslint.config.js`; `npx expo lint` must be 0 errors, 0 warnings)
- `no-restricted-imports` in `src/features/**` and `src/app/**`: from `react-native` only `Linking Share Alert Keyboard Platform` (allow-list regex); reanimated, svg, blur, linear-gradient, `@expo/vector-icons`, gesture-handler, expo-image are banned.
- `no-restricted-syntax` there: no `style` JSX attribute, no `#hex` / `rgb(` / `rgba(` string or template literals.
- `max-lines` 150 (blank lines and comments skipped) for every file in `src`; `@typescript-eslint/no-explicit-any` error.
- Shared values: write `sv.set(x)` (not `sv.value = x`) to satisfy the React Compiler rules.

## Tokens and brand
- Tokens are ported from `admin-dashboard/src/theme/tokens.ts` (same key names: `bg surface surfaceSolid subtle border textPrimary/Secondary/Muted brandPrimary brandAccent brandAccentText brandAccentSoft successText... glass* blob*`, plus `ring*`, `fab`). Light = warm canvas #F5F3F0 + frosted glass + ink actions; dark = #0E0E10 smoked glass. Orange #F16726 is an ACCENT (ring, glow, active dot, late); ink #141416 is the primary action color.
- Status: present = success green, late = orange family (`warning` tone), absent = danger brick, excused = slate info. Text tones use the darker `*Text` shades for AA; solid shades only for bars, dots and rings. Text on orange: ink, or white only for large/bold text.
- `src/__tests__/theme.test.ts` pins dashboard parity (values, key names) and AA contrast pairs; run it after touching tokens.
- Brand module: `core/brand` (name constants, ink color) and `core/brand/logo.ts` (asset). Institute colors/logo/name from `GET /mobile/me` are NOT used for theming; a multi-institute build swaps only `core/brand` + `core/theme/tokens.*`.
- Font: Alexandria 300/400/500/600 via `expo-font` (`core/theme/fonts.ts`); never set `fontWeight` with it. Western digits (`core/format`). Dynamic Type stays on (capped at 1.5x, display 1.2x).

## Code
- One axios instance (`core/api/client.ts`) with auth + single-flight refresh (`refresh.ts`). Features never create their own client. Server state = TanStack Query only; query keys include `studentId`; `keepPreviousData` when switching months. zustand only for session/selected child and tiny UI state (open sheets, read ids).
- Tokens live in `expo-secure-store` ONLY (`core/storage`); web localStorage is a dev-only fallback.
- All user-facing strings come from `core/strings`; API errors via `core/api/errors` (English/Arabic mapping). No `any`.
- RTL always: use `start/end`; `Row` mirrors automatically; chevrons come from `BACK_ICON`/`FORWARD_ICON`. Money: SYP and USD are never mixed (`formatMoney`).
- Accessibility: role + label on every control, >= 44pt targets (`PressableScale`/`IconButton`/`Button` guarantee it), color never the only signal, Reduce Motion respected (`useReducedMotion` in every animated controller), light haptic on press.
- Motion: staggered `Reveal` (12px, fade, 60ms), ring sweep + count-up, shimmer skeleton, spring sheet and tab dot. Never block interaction.

## How to add things
- Controller: create `controllers/<kebab>/` with only the needed layers, tokens only, a11y + Reduce Motion, export from both `index.ts` files, add a README row, keep every file <= 150 lines.
- Feature screen: `features/<f>/api` + `hooks` (data), `ui/<F>Screen.tsx` composing `Screen`, `QueryBoundary`, `Reveal`, `Card`... ; then `src/app/<route>.tsx` = `export default function X() { return <XScreen />; }`. Shell pieces (tab bar, headers, session gate) are in `features/shell`.

## Mock mode
`EXPO_PUBLIC_USE_MOCK=1` swaps the axios adapter for `core/api/mock/` fixtures (gated by `__DEV__`). Demo logins: guardian `0911111111`, student `0922222222`, any password. Notifications are static (`features/notifications/static-data`, hook `useNotifications`).

## Verification before finishing
`npx tsc --noEmit`, `npx expo lint`, `npm test`, `npx expo export --platform web`; look at every screen in the browser (light and dark, 390x844); update `docs/features/mobile-app.md` and run `node docs/scripts/docs-tools.cjs check` from the workspace root.
