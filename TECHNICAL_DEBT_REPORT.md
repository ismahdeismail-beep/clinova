# CLINOVA TECHNICAL DEBT REPORT

## Removed Debt
- **DecisionTreeScreen.tsx**: Fixed broken JSX structure (mismatched section/div tags)
- **App.tsx**: Added lazy loading for all screens (reduced initial bundle size)
- **NavigationGraph.ts**: Added position data to GraphNode for debug visualization
- **EventBus.ts**: Added wildcard listener support for system-wide event monitoring
- **clinicalStore.ts**: Added missing setInteractions action

## Pre-Existing Debt (Unchanged)
- **Node.js v24 compatibility**: Vite's `tinyglobby` dependency uses `fdir` with incompatible exports. Requires Vite update or Node.js downgrade.
- **Firebase config**: Hardcoded fallback credentials in `firebase.ts` (fallback keys for "nakurubnb-b99f2" project)
- **Test coverage**: No test files exist in the repository
- **CI/CD pipeline**: No GitHub Actions or CI configuration
- **Environment validation**: No runtime validation for GEMINI_API_KEY or other env vars
- **Error handling**: Some services use try/catch with console.error; no centralized error reporting

## Remaining Debt
- **Class component types**: ErrorBoundary uses `(this as any)` workaround for React 19 type incompatibility with `useDefineForClassFields: false`
- **Drug interface migration**: The `dosing` field changed from `string` to `DrugDosing` object (existing Firestore docs still use string format)
- **Sync system initialization**: RealtimeSyncManager is initialized in App.tsx module scope - may need lazy init for better startup perf
- **Debug toggle state**: NavigationDebugger is always rendered but hidden via boolean - could be lazy loaded

## Recommended Future Work
1. Add test suite (Vitest + React Testing Library)
2. Set up GitHub Actions for CI/CD
3. Add Sentry or similar error monitoring
4. Implement runtime environment validation
5. Add Firestore index configurations for compound queries
6. Implement progressive web app offline strategies
7. Add data migration scripts for Drug.dosing type change
8. Implement end-to-end clinical workflow tests
