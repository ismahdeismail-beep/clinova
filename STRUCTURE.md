# Clinova — Project Structure

```
clinova-main/
│
├── .env.example                    # Environment template (GEMINI_API_KEY, APP_URL)
├── .gitignore
├── index.html                      # Entry HTML — title: "Clinova"
├── metadata.json                   # AI Studio deployment metadata
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config (ES2022, bundler)
├── vite.config.ts                  # Vite + React + Tailwind + PWA
│
├── assets/
│   └── .aistudio/                  # AI Studio assets
│
├── src/
│   ├── main.tsx                    # React entry point
│   ├── App.tsx                     # Root component (AuthProvider → MainApp)
│   ├── index.css                   # Tailwind + Obsidian dark theme
│   ├── types.ts                    # Shared types (ViewState, UserRole, UserData)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx          # Firebase auth — Google sign-in, Firestore user doc
│   │
│   ├── components/
│   │   ├── Navigation.tsx           # Sidebar nav (role-based menu items)
│   │   └── TopBar.tsx               # Top header bar with search & session info
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Google auth login page
│   │   ├── DashboardScreen.tsx      # Activity Intelligence, Recent Files, Study Outputs
│   │   ├── DecisionTreeScreen.tsx   # React Flow clinical decision tree
│   │   ├── StudyEngineScreen.tsx    # Document ingestion → knowledge conversion
│   │   ├── PharmaScreen.tsx         # Pharmacotherapy reasoning engine
│   │   ├── CaseLearningScreen.tsx   # Clinical risk simulator
│   │   └── SettingsScreen.tsx       # Privacy, AI guardrails, regional lock
│   │
│   ├── services/
│   │   ├── workflow.service.ts      # Firestore CRUD for workflows & nodes
│   │   ├── rules.service.ts         # Clinical rule evaluation engine
│   │   └── knowledge.service.ts     # Drug, condition, interaction lookups
│   │
│   ├── lib/
│   │   └── firebase.ts             # Firebase config & initialization
│   │
│   └── types/
│       └── engine.ts               # Domain types (Workflow, Drug, ClinicalRule, etc.)
│
└── .opencode/
    └── skills/                     # Agent skills for code assistance
```

## Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `src/screens/` | Full-page views — one per app module (Dashboard, DecisionTree, Study, Pharma, Case, Settings) |
| `src/components/` | Reusable UI components (Navigation sidebar, TopBar) |
| `src/contexts/` | React contexts (AuthContext for Firebase authentication) |
| `src/services/` | Business logic and data access layer (Firestore CRUD, rules engine, knowledge lookups) |
| `src/lib/` | Third-party initialization (Firebase config) |
| `src/types/` | TypeScript domain model definitions |
| `.opencode/skills/` | OpenCode agent skills installed for this project |
