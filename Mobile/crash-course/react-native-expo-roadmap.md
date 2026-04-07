# React Native + Expo: Complete Learning Roadmap

### From Beginner to MVP Launch in 3–4 Months

> **Tailored for:** Full-stack web developers (React/Next.js background) who want to ship a production-grade mobile MVP fast.

---

## Overview

This roadmap is structured as a 16-week plan, covering React Native fundamentals all the way to advanced patterns, with Expo as the primary framework. The final weeks are dedicated to shipping your MVP to beta users. Since you already know React, Next.js, and TypeScript, you have a significant head start — phases 1–2 will be much faster for you.

---

## Prerequisites (Check Before Starting)

Before touching React Native, make sure you're solid on these:

- **JavaScript ES6+** — Arrow functions, destructuring, spread/rest, optional chaining
- **Async JavaScript** — Promises, `async/await`, `fetch`
- **React Fundamentals** — Components, Props, State, `useEffect`, `useRef`, `useContext`
- **TypeScript Basics** — Types, interfaces, generics (you already use this)
- **Git** — Branching, commits, PRs

> **If you know React/Next.js well, you can skip most of Phase 1 and start from Phase 2.**

---

## Phase 1 — JavaScript & React Refresher (Week 1)

*Skip most of this if you're already comfortable with React.*

### What to Learn

- ES6+ patterns used heavily in RN: destructuring, optional chaining, nullish coalescing (`??`)
- React hooks deep-dive: `useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`
- React component lifecycle and rendering behavior
- TypeScript with React: typing props, state, hooks, and API responses

### Mini Project

Build a simple task tracker using React (web) with full TypeScript — reinforces patterns you'll carry into mobile.

---

## Phase 2 — React Native Core (Weeks 2–3)

This is where mobile development starts. React Native renders **native UI components**, not a WebView.

### Core Concepts

#### Layout & Styling

- `View`, `Text`, `Image`, `ScrollView`, `FlatList`, `SectionList`
- Flexbox in React Native (default `flexDirection: 'column'`)
- StyleSheet API vs inline styles
- SafeAreaView and platform-specific styling
- Dimensions API and responsive layouts

#### Navigation

- **React Navigation** — the standard: Stack, Tab, Drawer navigators
- Deep linking and passing params between screens
- Navigation TypeScript types

#### Platform APIs

- `Platform.OS` — `'ios'` vs `'android'`
- Platform-specific code with `.ios.tsx` / `.android.tsx` extensions
- Keyboard handling (`KeyboardAvoidingView`)

#### Handling Data

- `fetch` and Axios for API calls
- Loading states, error boundaries
- Async Storage for local persistence

### Mini Project

Clone a simple 2-screen app: Home screen with a list + Detail screen. Add bottom tab navigation.

---

## Phase 3 — Expo Ecosystem Deep Dive (Weeks 3–5)

Expo is no longer just a wrapper — it is now the **officially recommended** way to build React Native apps. The React Native core team itself no longer recommends starting with bare `react-native init`.

### Setting Up Expo

```bash
npx create-expo-app@latest MyApp
cd MyApp
npx expo start
```

### Expo Go (Development)

- Install **Expo Go** on your physical device
- Scan the QR code from terminal — see live changes instantly
- No need for Xcode or Android Studio for basic development

### Expo File Structure

```
MyApp/
├── app/               ← Expo Router pages (file-based routing)
│   ├── (tabs)/
│   │   ├── index.tsx  ← Home tab
│   │   └── profile.tsx
│   ├── _layout.tsx    ← Root layout
│   └── modal.tsx
├── components/
├── hooks/
├── constants/
├── assets/
└── app.json           ← App config (name, icon, splash, permissions)
```

### Expo Router (File-Based Routing)

Expo Router brings Next.js-style file-based routing to mobile — you'll feel right at home:

```tsx
// app/(tabs)/index.tsx  → maps to "/" tab
// app/workout/[id].tsx  → maps to "/workout/:id"
// app/_layout.tsx       → wraps all routes (like layout.tsx in Next.js)
```

### Key Expo SDK Modules

| Module | Purpose |
|--------|---------|
| `expo-camera` | Camera access for photos/video |
| `expo-image-picker` | Photo library + camera picker |
| `expo-location` | GPS and geolocation |
| `expo-notifications` | Push notifications |
| `expo-secure-store` | Encrypted key-value storage |
| `expo-font` | Custom font loading |
| `expo-splash-screen` | Splash screen control |
| `expo-status-bar` | Status bar styling |
| `expo-auth-session` | OAuth flows (Google, Apple login) |
| `expo-av` | Audio and video playback |
| `expo-haptics` | Vibration/haptic feedback |

Install any module with:

```bash
npx expo install expo-camera
```

### EAS (Expo Application Services)

EAS is Expo's cloud build and deployment service — critical for your MVP:

- **EAS Build** — build `.ipa` (iOS) and `.apk/.aab` (Android) in the cloud, no Mac needed for iOS
- **EAS Submit** — submit directly to App Store & Google Play
- **EAS Update** — push JavaScript-only changes to users **without an app store review** (OTA updates)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all
```

---

## Phase 4 — Intermediate Concepts (Weeks 5–8)

### State Management

| Tool | Use Case |
|------|---------|
| `useState` / `useReducer` | Local component state |
| React Context + `useContext` | Light global state (theme, auth) |
| **Zustand** | Recommended: simple global state for MVPs |
| Redux Toolkit | Heavy state; avoid for MVPs |
| **TanStack Query (React Query)** | Server state, caching, background refetching |

For your fitness MVP, use **Zustand** for app state (user, session) and **TanStack Query** for API data.

```bash
npx expo install zustand @tanstack/react-query
```

### Authentication

- Supabase Auth with `supabase-js` (perfect with your existing Supabase knowledge)
- `expo-auth-session` for Google/Apple OAuth
- Secure token storage with `expo-secure-store`
- Auth flow with Expo Router's protected routes:

```tsx
// app/_layout.tsx
const { session } = useSession();
return session ? <Slot /> : <Redirect href="/login" />;
```

### Forms & Validation

- **React Hook Form** — same as web, works perfectly in RN
- **Zod** — schema validation (matches your Next.js stack)

### Performance Basics

- `FlatList` vs `ScrollView` — always use FlatList for long lists
- `useMemo` and `useCallback` to prevent unnecessary re-renders
- `React.memo` for component memoization
- Image optimization with `expo-image` (replaces `Image`)

---

## Phase 5 — Advanced Concepts (Weeks 8–12)

### Animations

React Native has two animation systems:

| Library | Use Case |
|---------|---------|
| `Animated` API (built-in) | Basic fade, slide, scale animations |
| **React Native Reanimated 3** | Complex, smooth 60fps animations (worklet-based) |
| **React Native Gesture Handler** | Swipe, pan, pinch gestures |

```bash
npx expo install react-native-reanimated react-native-gesture-handler
```

Example — smooth fade-in animation:

```tsx
import Animated, { FadeIn } from 'react-native-reanimated';

<Animated.View entering={FadeIn.duration(400)}>
  <Text>Hello</Text>
</Animated.View>
```

### Advanced Navigation

- Nested navigators (Tabs inside Stack)
- Modal screens and bottom sheets (`@gorhom/bottom-sheet`)
- Shared element transitions
- Deep linking and universal links

### Native Modules & Config Plugins

- Use **Expo Config Plugins** to modify native code without ejecting
- When you need a library not in Expo SDK: use `expo-dev-client` (replaces Expo Go for custom native code)
- Bare workflow vs Managed workflow — only eject if absolutely necessary

### Testing

- **Jest** — unit testing components and hooks
- **React Native Testing Library** — component interaction testing
- **Detox** — end-to-end testing on simulators/devices

### App Performance

- Hermes JS engine (enabled by default in Expo)
- Bundle size optimization with Metro bundler
- Flipper / React Native Debugger for profiling
- Lazy loading screens and code splitting

---

## Phase 6 — MVP Sprint & Launch (Weeks 12–16)

This is your **4-week MVP sprint**. Focus only on core features — cut everything non-essential.

### Pre-Launch Checklist

#### App Quality

- [ ] Splash screen and app icon configured in `app.json`
- [ ] Deep links and universal links set up
- [ ] Offline handling (no crashes when network is unavailable)
- [ ] Push notifications via `expo-notifications` + FCM/APNs
- [ ] Error boundaries and crash reporting (Sentry with `@sentry/react-native`)
- [ ] Analytics (Posthog or Mixpanel for beta user tracking)

#### Store Preparation

- [ ] App Store Connect account (Apple — $99/yr)
- [ ] Google Play Console account (one-time $25)
- [ ] Privacy Policy + Terms of Service page
- [ ] App screenshots for store listings
- [ ] TestFlight (iOS beta) or Google Play Internal Testing set up

#### EAS Build & Deploy

```bash
# Production build
eas build --platform all --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android

# Push OTA update (no review needed)
eas update --branch production --message "Bug fix"
```

### MVP Stack Recommendation (Fast & Familiar)

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Expo (Managed Workflow) | Zero native config, OTA updates |
| Navigation | Expo Router | File-based, familiar from Next.js |
| Backend | Supabase | Already know it; auth + DB + storage |
| State | Zustand + TanStack Query | Lightweight, easy to learn |
| Styling | NativeWind (Tailwind for RN) | Same syntax as your web work |
| Auth | Supabase Auth + expo-secure-store | Fast to implement |
| Notifications | Expo Notifications + EAS | Built-in, no extra setup |
| Crash Reporting | Sentry | Free tier, essential for MVP |
| OTA Updates | EAS Update | Push fixes without app store wait |

---

## Expo: Benefits & Disadvantages

### ✅ Benefits of Using Expo

1. **Zero native tooling to start** — No Xcode or Android Studio required for basic development. `npx expo start` and you're coding in minutes.
2. **Expo Go for instant previews** — Test on a real device by scanning a QR code. No build step needed during development.
3. **OTA (Over-the-Air) Updates** — Push JavaScript updates directly to users via EAS Update, skipping app store review entirely. Critical for MVP iteration.
4. **Cloud builds with EAS** — Build iOS `.ipa` files on Expo's cloud even without a Mac. Huge for solo developers on Windows/Linux.
5. **File-based routing with Expo Router** — If you know Next.js, you already know how to structure routes in Expo.
6. **Managed native config** — `app.json` handles permissions, icons, splash, and native settings. No need to touch `Info.plist` or `AndroidManifest.xml` manually.
7. **Battle-tested SDK modules** — Expo's official modules (camera, notifications, auth, etc.) are well-maintained and TypeScript-first.
8. **Continuous Native Generation (CNG)** — Expo can regenerate native folders automatically, keeping upgrades clean and error-free.
9. **React Native core team endorsement** — The official React Native docs now recommend Expo as the default starting point.
10. **EAS Submit** — One command to submit builds directly to App Store and Google Play, saving hours of manual setup.

### ❌ Disadvantages of Using Expo

1. **Limited native module support in Managed Workflow** — If a third-party library requires custom native code, you must switch to a dev client or bare workflow.
2. **Larger initial app bundle size** — Expo includes many SDK modules by default, making the initial app size larger than a lean bare RN app.
3. **EAS Build costs** — The free tier is limited; high-frequency builds require a paid plan ($29–$99/month).
4. **Less control over native layer** — Deep customizations (e.g., custom notification sounds, widget extensions, background processing) require ejecting or using config plugins, adding complexity.
5. **Expo Go limitations** — Expo Go cannot run apps with custom native modules; you need `expo-dev-client` for those, which requires a build step.
6. **Platform-specific behavior differences** — Some Expo SDK modules have slight iOS vs Android behavior gaps that require platform-specific workarounds.
7. **App size cannot be easily trimmed** — Unlike bare RN, you can't easily exclude unused Expo SDK APIs from the bundle without ejecting.

---

## Recommended Resources

### Free

- [Official Expo Docs](https://docs.expo.dev) — best starting point, excellent tutorials
- [React Native Official Docs](https://reactnative.dev/docs/getting-started) — core API reference
- [Expo Router Docs](https://expo.github.io/router/docs) — file-based routing guide
- [notJust.dev YouTube](https://www.youtube.com/@notJustdev) — project-based React Native tutorials
- [William Candillon (YouTube)](https://www.youtube.com/@wcandillon) — React Native Reanimated & Skia

### Paid (Worth It)

- **React Native Mastery by notJust.dev** — project-based, covers Expo thoroughly
- **The Complete React Native + Hooks Course** (Udemy, Stephen Grider) — great for fundamentals

---

## 16-Week Timeline at a Glance

| Week | Focus | Deliverable |
|------|-------|------------|
| 1 | JS/React/TS refresher | Solid foundation review |
| 2 | RN Core (Views, Flexbox, FlatList) | First RN screen |
| 3 | Navigation + Expo setup | Multi-screen app with tabs |
| 4 | Expo SDK modules (camera, storage) | Feature-rich prototype |
| 5 | State management (Zustand + TanStack Query) | Connected to real API |
| 6 | Authentication (Supabase Auth) | Working login/signup flow |
| 7 | Forms, validation, onboarding flow | Full user onboarding |
| 8 | Animations (Reanimated basics) | Polished UI interactions |
| 9 | Push notifications + deep linking | Notification system working |
| 10 | Performance optimization | Smooth 60fps on device |
| 11 | Testing + error monitoring (Sentry) | Stable, crash-tracked app |
| 12 | EAS Build setup + internal testing | TestFlight / Play beta |
| 13–14 | MVP core features sprint | Feature-complete MVP |
| 15 | Beta testing + feedback loop | Real user feedback |
| 16 | Fixes + App Store / Play Store submission | Public MVP launch 🚀 |

---

> **Pro tip for your startup:** Lean into Expo's OTA update system. Ship early, break things, and push fixes instantly to beta users without waiting for app store review. Speed of iteration beats perfection at the MVP stage.
