# Graph Report - clinova-main  (2026-07-10)

## Corpus Check
- 294 files · ~1,121,459 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1098 nodes · 1761 edges · 260 communities (37 shown, 223 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fcf4d99b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types.ts
- index.ts
- storage.service.ts
- ClinicalAssistantScreen.tsx
- curriculum.ts
- devDependencies
- AdminDashboardScreen.tsx
- server.ts
- EducationHubScreen.tsx
- caseTemplates.ts
- TopBar.tsx
- App.tsx
- compilerOptions
- AppBootManager
- useAuth
- generateCases.ts
- generateGapCases.ts
- OverlayManager
- DashboardScreen.tsx
- ThemeContext.tsx
- main.tsx
- supabaseSync.ts
- NotificationContext.tsx
- dependencies
- compilerOptions
- runGenerate.ts
- generate-ai-resources.ts
- validate-population.ts
- AiOrchestrationScreen.tsx
- populate-all.ts
- validateDb.ts
- InstallPWA.tsx
- patch_drug_saved.js
- patch_kbms.js
- fixLegacyCases.ts
- endocrine.ts
- sync-knowledge-engine.ts
- renal.ts
- toxicology.ts
- append_placeholders.ts
- browser-image-compression
- d3
- docx
- dotenv
- express
- firebase
- @google/genai
- html2canvas
- idb
- clsx
- motion
- multer
- react
- react-markdown
- recharts
- @supabase/supabase-js
- supermemory
- tailwind-merge
- @tailwindcss/vite
- @types/d3
- vite
- lucide-react
- @xyflow/react
- zod
- zustand
- applyMigrationApi.ts
- _testInclude.ts
- separate_overview.ts
- vercel.json
- Authenticator
- BaseException
- Bool
- @vitejs/plugin-react
- constant
- DiGraph
- double
- Enum
- Float64
- __global__
- HashMap
- HasName
- Injectable
- IPv4Address
- IPv6Address
- kernel
- List
- Loggable
- Module
- MultiDiGraph
- MutableList
- Namespace
- ndarray
- NSObject
- NSString
- ObservableObject
- OpenerDirector
- Override
- Processor
- Rectangle
- RelayCommand
- RoutedEventArgs
- SampleDelegate
- Self
- providerStatusesCompat
- str
- Task
- TestClient
- Path
- Path
- Path
- Counter
- Path
- Any
- Path
- Path
- Path
- Any
- Counter
- Path
- Path
- Any
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Any
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Any
- Path
- Path
- Path
- Path
- Path
- Path
- Any
- Path
- Any
- Path
- Path
- Path
- Any
- Path
- Any
- datetime
- Path
- Path
- Any
- Any
- Path
- Path
- Any
- Path
- Path
- Any
- Path
- Path
- Path
- Path
- Any
- String
- string
- T
- HttpClient
- __device__
- HttpClient
- String
- T
- device
- string
- String
- T
- Int
- Loggable
- String
- Int
- String
- string
- Path
- Path
- Path
- CompletedProcess
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- CompletedProcess
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- datetime
- Path
- Path
- CompletedProcess
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Path
- Exception
- Exception
- uint
- Vec
- vector
- void
- Window

## God Nodes (most connected - your core abstractions)
1. `SkillRegistry` - 39 edges
2. `Skill` - 38 edges
3. `generateContentWithFallback()` - 31 edges
4. `useAuth()` - 30 edges
5. `SkillContext` - 30 edges
6. `SkillResponse` - 28 edges
7. `ClinicalCase` - 26 edges
8. `useFileStore` - 21 edges
9. `compilerOptions` - 18 edges
10. `ClinicalCaseTemplate` - 17 edges

## Surprising Connections (you probably didn't know these)
- `ShiftHandoverModal()` --references--> `jspdf`  [EXTRACTED]
  src/components/ShiftHandoverModal.tsx → package.json
- `ClinicalAssistantScreen()` --references--> `jspdf`  [EXTRACTED]
  src/screens/ClinicalAssistantScreen.tsx → package.json
- `LearningWorkspace()` --references--> `jspdf`  [EXTRACTED]
  src/screens/EducationHubScreen.tsx → package.json
- `startServer()` --calls--> `generateContentWithFallback()`  [EXTRACTED]
  server.ts → src/server/aiRouter.ts
- `startServer()` --calls--> `orchestrateSkills()`  [EXTRACTED]
  server.ts → src/skills/orchestrator.ts

## Import Cycles
- None detected.

## Communities (260 total, 223 thin omitted)

### Community 0 - "types.ts"
Cohesion: 0.07
Nodes (57): LIBRARY, LibraryResource, searchLibrary(), addGatewayLog(), AIProviderStatus, executeProvider(), GatewayLog, generateContentWithFallback() (+49 more)

### Community 1 - "index.ts"
Cohesion: 0.07
Nodes (39): inferUnitId(), main(), supabase, toSeedId(), UNIT_IDS, validateCase(), buildBody(), esc() (+31 more)

### Community 2 - "storage.service.ts"
Cohesion: 0.05
Nodes (46): FileList(), FileListProps, formatDate(), formatSize(), getFileIcon(), MIME_ICONS, FileUploader(), FileUploaderProps (+38 more)

### Community 3 - "ClinicalAssistantScreen.tsx"
Cohesion: 0.06
Nodes (38): ChatSessionList(), Props, SessionItem(), getMonographCached(), ChatMessage, ChatSession, ClinovaDB, dbPromise (+30 more)

### Community 4 - "curriculum.ts"
Cohesion: 0.10
Nodes (36): CurriculumGraph(), GraphLink, GraphNode, SPECIALTY_TO_UNITS, DISEASES_BY_SPECIALTY, INITIAL_CASES, ALL_LEARNING_OBJECTIVES, ALL_UNITS (+28 more)

### Community 5 - "devDependencies"
Cohesion: 0.04
Nodes (47): autoprefixer, esbuild, devDependencies, autoprefixer, esbuild, sharp, tailwindcss, tsx (+39 more)

### Community 6 - "AdminDashboardScreen.tsx"
Cohesion: 0.08
Nodes (35): jspdf, jspdf, Alert, evaluatePriority(), LabResult, Patient, PatientQuickSummary(), PatientQuickSummaryProps (+27 more)

### Community 7 - "server.ts"
Cohesion: 0.07
Nodes (30): app, safeJsonParse(), startServer(), upload, ApiError, ApiResponse, ErrorHandler, AcademicSkill (+22 more)

### Community 8 - "EducationHubScreen.tsx"
Cohesion: 0.12
Nodes (25): db, buildRichKnowledgeContext(), EducationHubScreen(), getRelevantFiles(), LearningWorkspace(), ModuleCard(), WorkspaceFlashcards(), WorkspaceNotes() (+17 more)

### Community 9 - "caseTemplates.ts"
Cohesion: 0.10
Nodes (13): ALL_TEMPLATE_COUNT, AUTONOMIC_PHARMACOLOGY_TEMPLATES, CARDIOVASCULAR_PHARMACOLOGY_TEMPLATES, GENERAL_PHARMACOLOGY_TEMPLATES, ClinicalCaseTemplate, CHEMOTHERAPY_TEMPLATES, CLINICAL_PHARMACY_TEMPLATES, CNS_TEMPLATES (+5 more)

### Community 10 - "TopBar.tsx"
Cohesion: 0.11
Nodes (15): SIMPLE_TITLE_MAP, TITLE_MAP, TopBar(), TopBarProps, UIMode, UIModeContext, UIModeContextValue, useUIMode() (+7 more)

### Community 11 - "App.tsx"
Cohesion: 0.09
Nodes (22): AdminDashboardScreen, AiOrchestrationScreen, AppContent(), ClinicalAssistantScreen, ClinicalCasesScreen, DashboardScreen, DrugIndexScreen, EducationHubScreen (+14 more)

### Community 12 - "compilerOptions"
Cohesion: 0.08
Nodes (25): DOM, DOM.Iterable, ES2020, compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx (+17 more)

### Community 13 - "AppBootManager"
Cohesion: 0.11
Nodes (6): AppBootManager, BOOT_SEQUENCE, BootPhase, BootService, BootTask, EventBus

### Community 14 - "useAuth"
Cohesion: 0.14
Nodes (16): AdminLoginScreen(), Sidebar(), UserLoginScreen(), ProtectedRoute(), ProtectedRouteProps, ACADEMIC_LEVELS, CLINICAL_TOPICS, LevelOption (+8 more)

### Community 15 - "generateCases.ts"
Cohesion: 0.15
Nodes (17): FEMALE_OCCUPATIONS, generateCaseFromTemplate(), generateCasesFromTemplate(), generatePatient(), generateVitals(), KENYAN_FIRST_NAMES_FEMALE, KENYAN_FIRST_NAMES_MALE, KENYAN_LAST_NAMES (+9 more)

### Community 16 - "generateGapCases.ts"
Cohesion: 0.15
Nodes (12): EXISTING_FILES, main(), planTemplates(), q(), safeName(), DERMATOLOGY_TEMPLATES, ENT_TEMPLATES, GERIATRIC_TEMPLATES (+4 more)

### Community 17 - "OverlayManager"
Cohesion: 0.22
Nodes (6): manager, OverlayHost(), OverlayInstance, OverlayManager, OverlayPriority, OverlayType

### Community 18 - "DashboardScreen.tsx"
Cohesion: 0.20
Nodes (6): HANDOVER_DATA, ShiftHandoverModal(), ShiftHandoverModalProps, ALL_CLINICAL_SYSTEMS, DashboardScreen(), STUDY_TRACKS

### Community 19 - "ThemeContext.tsx"
Cohesion: 0.27
Nodes (8): Action, CommandPalette(), ThemeToggle(), Theme, ThemeContext, ThemeContextType, useTheme(), SettingsScreen()

### Community 20 - "main.tsx"
Cohesion: 0.20
Nodes (6): ErrorBoundary, Props, State, AuthProvider(), ThemeProvider(), updateSW

### Community 21 - "supabaseSync.ts"
Cohesion: 0.47
Nodes (9): checkAuthError(), initSupabaseSync(), originalGetItem, originalRemoveItem, originalSetItem, pullFromSupabase(), removeFromSupabase(), SYNCABLE_KEYS (+1 more)

### Community 22 - "NotificationContext.tsx"
Cohesion: 0.24
Nodes (8): TopNavigation(), AppNotification, DEFAULT_NOTIFICATIONS, NotificationContext, NotificationContextType, NotificationProvider(), useNotifications(), NotificationsScreen()

### Community 23 - "dependencies"
Cohesion: 0.22
Nodes (9): lucide-react, dependencies, lucide-react, react-dom, react-router-dom, @supabase/ssr, react-dom, react-router-dom (+1 more)

### Community 24 - "compilerOptions"
Cohesion: 0.22
Nodes (8): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 25 - "runGenerate.ts"
Cohesion: 0.33
Nodes (6): ALL_TEMPLATES, writeBatchFile(), __dirname, __filename, main(), OUTPUT_DIR

### Community 26 - "generate-ai-resources.ts"
Cohesion: 0.43
Nodes (6): CaseRecord, generateFlashcards(), generateQuizQuestions(), generateStudyGuide(), main(), supabase

### Community 27 - "validate-population.ts"
Cohesion: 0.40
Nodes (5): CheckResult, checkTableCount(), main(), supabase, UNIT_LABELS

### Community 28 - "AiOrchestrationScreen.tsx"
Cohesion: 0.40
Nodes (3): LogEntry, PromptTemplate, Provider

### Community 29 - "populate-all.ts"
Cohesion: 0.67
Nodes (3): main(), runStep(), steps

### Community 30 - "validateDb.ts"
Cohesion: 0.67
Nodes (3): issues, main(), q()

### Community 36 - "sync-knowledge-engine.ts"
Cohesion: 0.47
Nodes (9): batchUpsert(), main(), supabase, syncCaseNodes(), syncDiseaseMonographs(), syncDiseaseNodes(), syncDiseases(), syncRelationships() (+1 more)

## Knowledge Gaps
- **291 isolated node(s):** `CURRICULUM_UNITS`, `CURRICULUM_TOPICS_REGISTRY`, `CaseFilters`, `supabase`, `CaseRecord` (+286 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **223 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `AdminDashboardScreen.tsx`, `browser-image-compression`, `d3`, `docx`, `dotenv`, `express`, `firebase`, `@google/genai`, `html2canvas`, `idb`, `clsx`, `motion`, `multer`, `react`, `react-markdown`, `recharts`, `@supabase/supabase-js`, `supermemory`, `tailwind-merge`, `@tailwindcss/vite`, `@types/d3`, `vite`, `@xyflow/react`, `zod`, `zustand`, `@vitejs/plugin-react`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `jspdf` connect `AdminDashboardScreen.tsx` to `EducationHubScreen.tsx`, `DashboardScreen.tsx`, `ClinicalAssistantScreen.tsx`, `dependencies`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `LearningWorkspace()` connect `EducationHubScreen.tsx` to `AdminDashboardScreen.tsx`, `useAuth`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `CURRICULUM_UNITS`, `CURRICULUM_TOPICS_REGISTRY`, `CaseFilters` to the rest of the system?**
  _291 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06702605570530099 - nodes in this community are weakly interconnected._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06994047619047619 - nodes in this community are weakly interconnected._
- **Should `storage.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05336951605608322 - nodes in this community are weakly interconnected._