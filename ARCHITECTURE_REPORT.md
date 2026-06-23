# CLINOVA ARCHITECTURE REPORT
## Generated: ${new Date().toISOString()}

---

## Current Structure

### Source Tree
```
src/
├── App.tsx                          # Root: ErrorBoundary > AuthProvider > MainApp (lazy routing)
├── main.tsx                         # React entry point
├── index.css                        # Tailwind + Obsidian dark theme
├── types.ts                         # ViewState, UserRole, UserData
├── types/
│   └── engine.ts                    # Domain types (Workflow, Drug, Condition, etc.)
├── contexts/
│   └── AuthContext.tsx               # Firebase auth context
├── components/
│   ├── Navigation.tsx               # Sidebar (memoized)
│   ├── TopBar.tsx                   # Header bar (memoized)
│   └── ErrorBoundary.tsx            # Error boundary
├── lib/
│   └── firebase.ts                  # Firebase config + init
├── store/
│   └── clinicalStore.ts             # Zustand state
├── engine/
│   ├── index.ts                     # Barrel export
│   ├── EventBus.ts                  # Singleton event bus with wildcard support
│   ├── WorkflowEngine.ts            # Workflow execution engine
│   ├── NavigationGraph.ts           # Navigation graph with BFS
│   ├── BrainRouter.ts              # Router with access control
│   └── BrainTree.ts                 # High-level workflow orchestrator
├── services/
│   ├── workflow.service.ts          # Firestore CRUD for workflows
│   ├── rules.service.ts             # Clinical rule evaluation
│   └── knowledge.service.ts         # Drug/condition/interaction lookups
├── screens/
│   ├── LoginScreen.tsx              # Google auth login
│   ├── DashboardScreen.tsx          # Activity Intelligence + metrics
│   ├── DecisionTreeScreen.tsx       # React Flow decision tree
│   ├── StudyEngineScreen.tsx        # Knowledge engine
│   ├── PharmaScreen.tsx             # Pharmacotherapy reasoning
│   ├── CaseLearningScreen.tsx       # Risk simulator
│   └── SettingsScreen.tsx           # Governance settings
├── core/
│   ├── selfHealing/                 # NEW: Self-healing BrainTree engine
│   │   ├── index.ts
│   │   ├── BrainTreeAuditor.ts      # Workflow auditing with event logging
│   │   ├── WorkflowRepairEngine.ts  # Auto-repair workflow issues
│   │   ├── NodeRecoveryManager.ts   # Node recovery and reconstruction
│   │   ├── GraphIntegrityScanner.ts # Graph structure scanning (cycles, dead ends, etc.)
│   │   └── WorkflowHealthService.ts # Health scoring and reporting
│   └── sync/                        # NEW: Firebase real-time sync architecture
│       ├── index.ts
│       ├── RealtimeSyncManager.ts   # Central sync orchestrator
│       ├── WorkflowSyncBridge.ts    # Workflow-specific sync
│       ├── BrainTreeSyncService.ts  # BrainTree sync integration
│       ├── FirebaseEventGateway.ts  # Firestore onSnapshot subscriptions
│       ├── ConflictResolver.ts      # Multi-device conflict resolution
│       ├── OfflineQueueManager.ts   # Offline operation queue
│       └── SyncHealthMonitor.ts     # Sync health tracking
├── clinical/
│   ├── validator/                   # NEW: Clinical decision validator
│   │   ├── index.ts
│   │   ├── ClinicalValidator.ts     # Main validation pipeline
│   │   ├── SafetyChecker.ts         # Drug safety checks
│   │   ├── InteractionAnalyzer.ts   # Drug interaction analysis
│   │   ├── ConfidenceEngine.ts      # Confidence scoring
│   │   ├── ReasoningAuditor.ts      # Reasoning path validation
│   │   ├── RecommendationVerifier.ts # Recommendation verification
│   │   └── EvidenceScorer.ts        # Evidence strength scoring
│   └── knowledge/                   # NEW: Knowledge engine adapters
│       └── KnowledgeAdapters.ts     # KDI, references, diagnostics adapters
└── debug/
    └── navigation/                  # NEW: Navigation debugger
        ├── index.ts
        ├── NavigationDebugger.tsx    # Debug overlay (route/workflow/event modes)
        ├── GraphRenderer.tsx         # SVG graph rendering
        ├── NodeInspector.tsx         # Node details panel
        ├── RouteHealthPanel.tsx      # Route health metrics
        ├── WorkflowVisualizer.tsx    # Workflow visualization
        └── EventFlowViewer.tsx       # Real-time event stream
```

## New Structure Additions
- **7 new modules** across 4 domains
- **26 new files** created
- **4 existing files modified** (App.tsx, EventBus.ts, NavigationGraph.ts, clinicalStore.ts, engine.ts engine.ts)
- **1 existing file fixed** (DecisionTreeScreen.tsx - JSX structure bug)

## Architectural Improvements
1. **Self-Healing**: Continuous workflow integrity scanning with auto-repair
2. **Clinical Validation**: Multi-layer safety pipeline (allergies, pregnancy, renal, hepatic, pediatric, interactions)
3. **Real-Time Sync**: Firestore onSnapshot subscriptions with conflict resolution and offline queue
4. **Observability**: Full navigation debugger with route, workflow, and event visualization
5. **Code Splitting**: Lazy loading screens via React.lazy() + Suspense
6. **Event-Driven**: Wildcard event bus support for system-wide monitoring
7. **Domain Separation**: Core (infrastructure), Clinical (domain logic), Debug (observability)
