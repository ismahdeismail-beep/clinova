# Clinova Core OS — Agent Guide

## Project Overview
**Clinova** is a Clinical Decision Support System (CDSS) — a secure, dark-themed web application for clinical decision-making, pharmacotherapy reasoning, knowledge ingestion, and risk simulation. Targets Kenyan healthcare (KEML/KDI standards).

## Tech Stack
- **Language:** TypeScript (strict, ES2022)
- **UI:** React 19 + JSX
- **Build:** Vite 6
- **CSS:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Flowcharts:** `@xyflow/react` (React Flow v12)
- **Auth:** Firebase Authentication (Google sign-in)
- **Database:** Firestore (NoSQL) — collections: `users`, `workflows`, `workflow_nodes`, `rules`, `drugs`, `conditions`, `interactions`
- **AI:** `@google/genai` (Gemini API) — requires `GEMINI_API_KEY`
- **State:** Zustand 5
- **Animations:** `motion` library
- **Icons:** Lucide React
- **PWA:** `vite-plugin-pwa` (manifest: "Clinova OS")
- **Backend:** Express.js (available for server-side endpoints)

## Project Structure
```
clinova-main/
├── src/
│   ├── App.tsx                    # Root: AuthProvider → MainApp (routing via activeView state)
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Tailwind + Obsidian dark theme
│   ├── types.ts                   # ViewState, UserRole, UserData
│   ├── contexts/
│   │   └── AuthContext.tsx         # Firebase auth context (signInWithGoogle, logout, userData)
│   ├── components/
│   │   ├── Navigation.tsx          # Sidebar — role-based nav items
│   │   └── TopBar.tsx              # Top header bar
│   ├── screens/
│   │   ├── LoginScreen.tsx         # Google auth login
│   │   ├── DashboardScreen.tsx     # Activity Intelligence + Recent Files + Case Progress
│   │   ├── DecisionTreeScreen.tsx  # React Flow clinical decision tree
│   │   ├── StudyEngineScreen.tsx   # Document upload → study notes/MCQs/summaries
│   │   ├── PharmaScreen.tsx        # Pharmacotherapy reasoning + drug interaction checks
│   │   ├── CaseLearningScreen.tsx  # Clinical risk simulator / case learning
│   │   └── SettingsScreen.tsx      # Privacy, AI guardrails, regional lock (Kenya)
│   ├── services/
│   │   ├── workflow.service.ts     # Firestore CRUD for workflows/nodes
│   │   ├── rules.service.ts        # Clinical rule evaluation engine
│   │   └── knowledge.service.ts    # Drug, condition, interaction lookups
│   ├── lib/
│   │   └── firebase.ts            # Firebase config + initialization
│   └── types/
│       └── engine.ts              # Domain types: Workflow, WorkflowNode, ClinicalRule, Drug, etc.
├── vite.config.ts                 # Vite + React + Tailwind + PWA config
├── .env.example                   # GEMINI_API_KEY, APP_URL
├── index.html                     # Entry HTML (title: "Clinova")
├── package.json                   # Scripts: dev, build, preview, clean, lint
└── README.md                      # Local run setup
```

## Screens / Views
| View | Route State | Description |
|------|-----------|-------------|
| Login | `'login'` | Google auth with Firebase |
| Dashboard | `'dashboard'` | Activity Intelligence, Recent Files, Study Outputs, Pharmacotherapy table |
| Decision Tree | `'tree'` | React Flow visual workflow with safety rule enforcement |
| Knowledge Engine | `'study'` | Upload PDFs/images → generate notes, summaries, MCQs, revision guides |
| Reasoning Engine | `'pharma'` | Drug therapy assessment, renal/hepatic dose adjustments, interaction checks |
| Risk Simulator | `'case'` | Interactive clinical case simulations |
| Settings | `'settings'` | Privacy, de-identification, AI guardrails, regional lock, theme |
| Patients | `'patients'` | Patient listing with search |
| New Case | `'new-case'` | Clinical case intake form |
| Pharmacotherapy Review | `'pharmacotherapy'` | Full clinical pharmacotherapy assessment wizard |
| Drug Index | `'drug-index'` | KEML-referenced drug formulary |
| Knowledge Base | `'knowledge-base'` | Guidelines, references, notes |
| Admin | `'admin'` | Governance Console (admin-only, encrypted placeholder) |

## Conventions
- **Routing:** Simple `activeView` state in `App.tsx`, no React Router
- **Auth:** `AuthProvider` wraps entire app; `useAuth()` gives `user`, `userData`, `signInWithGoogle`, `logout`
- **Styling:** Tailwind CSS with custom "Obsidian" dark theme (`#0E0E10` background, `#00E5FF` primary)
- **Firestore collections:** `users`, `workflows`, `workflow_nodes`, `rules`, `drugs`, `conditions`, `interactions`
- **New users** default to `student` role via Firestore auto-create
- **Environment:** `GEMINI_API_KEY` and `APP_URL` required in `.env`

## DO NOT
- Do NOT modify `vite.config.ts` HMR settings (DISABLE_HMR env var for AI Studio)
- Do NOT remove Apache-2.0 license header from files
- Do NOT bypass Firebase security rules or Firestore schema
- Do NOT introduce external state management beyond Zustand
- Do NOT add React Router — the app uses simple state-based view switching
