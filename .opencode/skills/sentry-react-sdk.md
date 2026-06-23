---
name: sentry-react-sdk
description: Full Sentry SDK setup for React. Use when asked to "add Sentry to React", "install @sentry/react", or configure error monitoring, tracing, session replay, profiling, or logging for React applications. Supports React 16+, React Router v5-v7 non-framework mode, TanStack Router, Redux, Vite, and webpack.
license: Apache-2.0
category: sdk-setup
parent: sentry-sdk-setup
disable-model-invocation: true
---

> [All Skills](../../SKILL_TREE.md) > [SDK Setup](../sentry-sdk-setup/SKILL.md) > React SDK

# Sentry React SDK

Opinionated wizard that scans your React project and guides you through complete Sentry setup.

## Invoke This Skill When

- User asks to "add Sentry to React" or "set up Sentry" in a React app
- User wants error monitoring, tracing, session replay, profiling, or logging in React
- User mentions `@sentry/react`, React Sentry SDK, or Sentry error boundaries
- User wants to monitor React Router v5/v6/v7 non-framework navigation, Redux state, or component performance

## Phase 1: Detect

Run these commands to understand the project before making any recommendations.

## Phase 2: Recommend

Present a concrete recommendation based on what you found.

**Recommended (core coverage):**
- **Error Monitoring** - always; captures unhandled errors, React error boundaries, React 19 hooks
- **Tracing** - React SPAs benefit from page load, navigation, and API call tracing
- **Session Replay** - recommended for user-facing apps; records sessions around errors

**Optional (enhanced observability):**
- **Logging** - structured logs via `Sentry.logger.*`
- **Profiling** - JS Self-Profiling API (experimental; requires cross-origin isolation headers)

## Phase 3: Guide

### Install

```bash
npm install @sentry/react --save
```

### Create `src/instrument.ts`

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourapi\.io/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
});
```

### Entry Point Setup

Import `instrument.ts` as the **very first import** in your entry file.

### React Version-Specific Error Handling

**React 19+** - use `reactErrorHandler()` on `createRoot`:
```tsx
createRoot(document.getElementById("root")!, {
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
}).render(<App />);
```

**React <19** - wrap your app in `Sentry.ErrorBoundary`.

### Router Integration

Configure the matching integration for your router (React Router v5/v6/v7, TanStack Router).

### Redux Integration

```typescript
const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(Sentry.createReduxEnhancer()),
});
```

### Source Maps Setup

**Vite:**
```typescript
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: { sourcemap: "hidden" },
  plugins: [
    react(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
```

## Verification

Trigger test events to confirm Sentry is receiving data:

```tsx
function SentryTest() {
  return (
    <>
      <button onClick={() => { throw new Error("Sentry React test error"); }}>
        Test Error
      </button>
      <button onClick={() => Sentry.captureMessage("Sentry test message", "info")}>
        Test Message
      </button>
    </>
  );
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Events not appearing | Set `debug: true`, check DSN, open browser console for SDK errors |
| Source maps not working | Build in production mode; verify `SENTRY_AUTH_TOKEN` is set |
| Router transactions named `<unknown>` | Add router integration matching your router version |
| Session replay not recording | Confirm `replayIntegration()` is in init; check `replaysSessionSampleRate` |
