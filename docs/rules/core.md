# parents-app rules (binding)

One Expo app for guardians (`FAMILY`) and students (`STUDENT`). Arabic only, RTL. Read `docs/features/mobile-app.md` (workspace `docs/`) first. Expo changed: check https://docs.expo.dev/versions/v57.0.0/ when unsure.

## Structure
- `src/app/`: expo-router routes, THIN: each file only renders one feature screen (plus layouts/guards).
- `src/features/<feature>/{api,hooks,ui,utils,static-data}`: one folder per feature; `api` = axios calls, `hooks` = TanStack Query hooks, `ui` = presentational components, `utils` = pure logic.
- `src/core/{api,auth,theme,storage,format,strings,layout}`: infrastructure shared by all features.
- `src/components/`: shared primitives (Card, Ring, StatChip, SectionHeader, EmptyState, ErrorState, Skeleton, RoundIconButton, TabBar, BottomSheet...).
- Tests: `src/__tests__/*.test.ts` (pure logic only; `npm test`).

## Code
- Every file <= 150 lines, one responsibility. No `any`. Strict API types live in `src/core/api/types.ts` (re-exporting `contract/`).
- One axios instance (`core/api/client.ts`) with auth + single-flight refresh interceptor (`refresh.ts`, unit tested). Features never create their own client.
- Server state = TanStack Query only; query keys include `studentId`; `keepPreviousData` when switching months. zustand only for session/selected child (and tiny UI state such as open sheets).
- Screens read data through small hooks; UI components are presentational. Render loading/error through `QueryBoundary` (skeleton, Arabic error + retry).
- Tokens live in `expo-secure-store` ONLY (`core/storage`). Never AsyncStorage for secrets. Web uses localStorage as a dev-only fallback.

## UI
- All user-facing strings come from `src/core/strings/ar.ts`. No hex colors outside `src/core/theme/` (use `useTheme()` roles and tints).
- Theme is built from the institute brand (`GET /mobile/me` primary/secondary, fallback #1a73e8 / #34a853), light + dark, contrast-checked in code.
- RTL always: use `start/end`, `marginStart`, never `left/right`; navigation icons come from `core/layout/rtl.ts`. Western digits via `core/format`.
- Money: SYP and USD are never mixed or summed; use `formatMoney`.
- Accessibility: role + label on every control, >= 44pt targets, text scaling on, color never the only signal, reduced motion respected (`useReducedMotion`), subtle haptics (`core/layout/haptics.ts`).
- Cards: radius 28, very soft shadow, airy spacing; one accent color.

## Mock mode
- `EXPO_PUBLIC_USE_MOCK=1` swaps the axios adapter for `core/api/mock/` fixtures. It is gated by `__DEV__`, so production builds can never enable it. Fixtures must match the contract exactly.
- Demo mock logins: guardian phone `0911111111`, student phone `0922222222`, any password.

## Not built (placeholder only)
- Notifications are static (`features/notifications/static-data`), read through the single hook `useNotifications`. No push, no PDFs, no offline cache.

## Verification before finishing
`npx tsc --noEmit`, `npx expo lint`, `npm test`, `npx expo export --platform web`; update `docs/features/mobile-app.md` (workspace) and run `node docs/scripts/docs-tools.cjs check` from the workspace root.
