<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into **SubTrack**, an Expo React Native subscription tracker app. Here is a summary of all changes made:

- **`app.config.js`** — Created (replacing `app.json`) to expose `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` environment variables to the app via `Constants.expoConfig.extra`.
- **`src/config/posthog.ts`** — Created the PostHog client singleton, configured with `captureAppLifecycleEvents`, debug mode in dev, and graceful disabling when the token is absent.
- **`app/_layout.tsx`** — Wrapped the app with `PostHogProvider` (autocapture touches enabled, manual screen tracking). Added `usePathname` + `useEffect` to call `posthog.screen()` on every route change.
- **`app/(auth)/sign-in.tsx`** — Added `user_signed_in` (email/Google) and `user_mfa_verified` events; calls `posthog.identify()` with email on successful email sign-in.
- **`app/(auth)/sign-up.tsx`** — Added `user_signed_up` (email/Google) event; calls `posthog.identify()` with `$set_once: { signup_date }` on email verification completion.
- **`app/(tabs)/settings.tsx`** — Added `user_signed_out` event and `posthog.reset()` before Clerk `signOut()`.
- **`app/(tabs)/index.tsx`** — Added `subscription_expanded` and `subscription_collapsed` events with `subscription_id` and `subscription_name` properties.
- **`.env`** — Added `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` (covered by `.gitignore`).
- **Packages installed** — `posthog-react-native`, `react-native-svg`.

## Events

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully signs in (email or Google OAuth) | `app/(auth)/sign-in.tsx` |
| `user_signed_in_google` | User signs in via Google OAuth specifically | `app/(auth)/sign-in.tsx` |
| `user_mfa_verified` | User completes MFA email code verification during sign-in | `app/(auth)/sign-in.tsx` |
| `user_signed_up` | User completes account creation (email verification or Google OAuth) | `app/(auth)/sign-up.tsx` |
| `user_signed_out` | User signs out from the settings screen | `app/(tabs)/settings.tsx` |
| `subscription_expanded` | User taps a subscription card to expand its details | `app/(tabs)/index.tsx` |
| `subscription_collapsed` | User taps an expanded subscription card to collapse it | `app/(tabs)/index.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: <https://eu.posthog.com/project/159032/dashboard/620479>
- **Sign-ups over time**: <https://eu.posthog.com/project/159032/insights/m9wRaThe>
- **Sign-ins over time**: <https://eu.posthog.com/project/159032/insights/lNOIpsED>
- **Sign-up → Sign-in conversion funnel**: <https://eu.posthog.com/project/159032/insights/oiVk1ybU>
- **User churn — sign-outs over time**: <https://eu.posthog.com/project/159032/insights/ypRjvKjk>
- **Subscription engagement**: <https://eu.posthog.com/project/159032/insights/RmKvfaEP>

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
