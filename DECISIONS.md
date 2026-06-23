# Clinova — Architectural Decisions

## 1. State-Based Routing over React Router
- **Why:** Simple app with fixed set of views; no nested routes, no URL-based navigation needed
- **Impact:** `activeView` state in `App.tsx` controls which screen renders; screens are always mounted/unmounted via conditional rendering
- **Trade-off:** No deep-linking, no browser back/forward navigation

## 2. Firebase for Auth + Database
- **Why:** Zero-config backend, Google sign-in, Firestore real-time sync, scales from prototype to production
- **Impact:** All data lives in Firestore collections; offline support via Firebase SDK
- **Trade-off:** Vendor lock-in to Google Cloud; Firestore query limitations for complex clinical queries

## 3. Gemini API for AI
- **Why:** `@google/genai` SDK provides direct Gemini access; tight integration with Firebase/GCP ecosystem
- **Impact:** Requires `GEMINI_API_KEY` env var; server-side calls only
- **Trade-off:** No multi-model abstraction; tied to Google's AI models

## 4. React Flow for Decision Trees
- **Why:** `@xyflow/react` provides production-ready node graph with drag-and-drop, custom nodes, edge animations
- **Impact:** Clinical decision trees rendered as interactive flowcharts; safety rules overlaid as deterministic constraints
- **Trade-off:** Not a form builder; custom logic needed for clinical rule validation

## 5. Zustand over Redux/Context
- **Why:** Minimal boilerplate, no providers needed, built-in middleware, TypeScript-first
- **Impact:** Lightweight state management for workflow context and UI state
- **Trade-off:** No devtools ecosystem as rich as Redux

## 6. Tailwind CSS v4 with Obsidian Theme
- **Why:** Utility-first CSS, fast prototyping, consistent design system
- **Impact:** Dark "Obsidian" palette (`#0E0E10` bg, `#00E5FF` primary); all styling inline via Tailwind classes
- **Trade-off:** HTML can become verbose; custom design tokens in `index.css`

## 7. Vite 6 over Create React App / Next.js
- **Why:** Fast HMR, native ESM, PWA plugin, Tailwind v4 integration
- **Impact:** Dev server on port 3000; builds to `dist/`; PWA manifest configured
- **Trade-off:** No SSR/SSG; all client-side rendering

## 8. Kenya-Specific Clinical Data
- **Why:** Kenya Drug Index (KDI) v2024, KEML (Kenya Essential Medicines List), PPB (Pharmacy and Poisons Board) compliance
- **Impact:** Drug database, condition mappings, and interaction rules scoped to Kenyan healthcare
- **Trade-off:** Not generalizable to other regions without data replacement

## 9. Simple Role-Based Access
- **Why:** Firebase Auth + Firestore `users` collection with `role` field (`student | pharmacist | clinician | admin`)
- **Impact:** Admin console hidden from non-admin users; default role is `student`
- **Trade-off:** No fine-grained permissions; roles stored in plain Firestore document

## 10. Deterministic Safety Rules over AI-Only Decisions
- **Why:** Clinical safety requires hard constraints; AI suggestions must be overridable by deterministic rules
- **Impact:** `ClinicalRule` type defines if/then logic; rules engine in `rules.service.ts` enforces constraints
- **Trade-off:** Less flexible; rules must be pre-defined and maintained
