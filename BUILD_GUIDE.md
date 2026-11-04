# Build Guide - Desktop EXE & Mobile APK

## 1) Desktop EXE (Windows) - GUI App (No Browser)

```bash
# Build web first
cd apps/web
npm install
npm run build

# Build desktop EXE
cd ../desktop
npm install
npm run dist
```

Output: `apps/desktop/dist/Retail POS - HoBo Custom Software Setup.exe`
- Opens in its own window (no browser)
- Uses built files from `apps/web/dist` via HashRouter
- Menu bar hidden for app-like feel

## 2) Mobile APK (Android) - React Native Native App

Local build (requires Android SDK + Java):
```bash
cd apps/mobile
npm install
npx expo prebuild --platform android --clean
cd android
./gradlew assembleRelease
```

Output: `apps/mobile/android/app/build/outputs/apk/release/app-release.apk`

## 3) License & Subscription

- Standalone EXE: Go to Settings > License Activation or `/license/activate`
- SaaS: Trial 37 days (1 month + 7 days), View Only after expiry, subscribe via Billing > Plans
