# Clinova Project Memory (for subagents)

Auto-compiled reference so coding/subagent tasks start with correct context.

## Stack
- TypeScript (ESM), React 19 + Vite 6 (frontend)
- Express backend (`server.ts`, run via `tsx server.ts` in dev)
- Supabase: DB / Auth / Storage (see `supabase/`, `AGENTS.md`)
- Google Gemini AI via `@google/genai` (Knowledge Engine reasoning)
- Firebase config present (`firebase.json`, `firestore.rules`) but Supabase is primary backend
- State: zustand; Routing: react-router-dom v7; Charts: recharts + d3; Graphs: @xyflow/react; Icons: lucide-react; Validation: zod v4; Styling: tailwindcss v4 (`@tailwindcss/vite`)

## Commands
- `npm run dev` — tsx server.ts
- `npm run build` — vite build + esbuild bundle to dist/server.cjs
- `npm run lint` — `tsc --noEmit` (primary type-check, use to verify subagent edits)
- `npx eslint .` — ESLint v9 flat config
- `npm run supabase:migrate` — supabase db reset
- `npm run db:seed` — tsx scripts/seedExistingDb.ts

## Conventions
- Prettier: NO semicolons, single quotes, trailingComma all, printWidth 100
- DO NOT add code comments unless explicitly requested
- Check neighboring files + package.json before adding new libraries
- Mimic existing patterns in `src/`

## LSP (laptop)
- `typescript-language-server` 5.3.0 installed globally (npm -g) → Neovim/VSCode diagnostics + completions
- `.vscode/settings.json` uses workspace TS SDK + ESLint fixOnSave
- ESLint v9 flat config + Prettier config added as devDeps

## Layout
- `src/` frontend + app code
- `api/` serverless/api functions
- `functions/` firebase functions
- `supabase/` migrations + config
- `scripts/` db/seed/validation tsx scripts
- `public/` static assets
- `server.ts` Express entry
