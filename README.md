# parents-app

One Expo (SDK 57) app for guardians (`FAMILY`) and students (`STUDENT`) of the institute platform. Arabic only, RTL. The folder name stays `parents-app`; the separate `students-app` is superseded and must not be developed.

Docs: `../docs/features/mobile-app.md` (behavior), `docs/rules/core.md` (code rules), `../docs/features/mobile-api.md` (backend contract).

## Run
```
npm install
cp .env.example .env        # set EXPO_PUBLIC_API_URL
npx expo start              # press a / i / w, or scan with a dev build
```
Expo Go works for most screens; for the forced RTL layout on a fresh install use a development build (`npx expo run:android` / `run:ios`).

## Environment
| Variable | Meaning |
|---|---|
| `EXPO_PUBLIC_API_URL` | Backend origin, e.g. `http://10.0.2.2:3000` (the app appends `/api`) |
| `EXPO_PUBLIC_USE_MOCK` | `1` = dev-only fake backend (fixtures). Ignored in production builds |

## Mock mode (no backend)
`EXPO_PUBLIC_USE_MOCK=1 npx expo start --web`. Logins: phone `0911111111` (guardian, 2 children) or `0922222222` (student), any password.

## Scripts
`npm test` (unit tests, pure logic), `npx tsc --noEmit`, `npx expo lint`, `npx expo export --platform web` (bundle check).
