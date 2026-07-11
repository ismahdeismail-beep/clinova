# Firebase & Supabase Responsibilities + RLS Findings (Audit Phases 2/3/4/11/12)

## Phase 2 — Firebase
- `src/lib/firebase.ts` initializes a **web** Firebase app (`initializeApp` + `getAuth`, `getFirestore`, `getStorage`). No `firebase-admin` anywhere.
- **No server-side Firebase auth verification** (no `verifyIdToken`, `getAuth`, custom claims). The Express server cannot validate Firebase sessions → root cause of "no auth on `/api/*`" (Risk R1).
- Firebase is the **sole source of user identity** (auth, Firestore app DB, Storage).

## Phase 3 — Supabase
- `supabase/migrations/00000{1,2,3}.sql` define a complete schema: curriculum, diseases, learning_objectives, clinical_cases (+ indexes), monographs (disease/drug), knowledge_graph (nodes/relationships), study_guides, flashcards, quiz_questions, user_monographs, clinical_topics, disease_mapping_review_queue.
- **No `users` / `profiles` table in Supabase.** User identity lives in Firebase only.
- `src/lib/supabase.ts` is a **browser** client (anon key) that fails soft if env missing → used only for read/cloud-sync.
- Server uses a **service-role** client (`server.ts`) → bypasses RLS for privileged writes (clinical cases, monographs).

## Phase 4 — Auth Synchronization (GAP)
- Because Supabase has no users table and auth is Firebase, there is **no profile auto-provisioning or role resolution in Supabase**. The spec's "every Firebase user has a Supabase profile" is **not implemented**.
- Client cannot write to Supabase directly (see RLS below) → all writes funnel through the server's service-role key.

## Phase 11 / 12 — RLS & Security (KEY INCONSISTENCY)
RLS is enabled on all tables, but policies assume Supabase Auth:
- SELECT: `USING (true)` for nearly all tables (public read) — `clinical_cases` restricted to `status='published'`.
- INSERT/UPDATE/DELETE: `USING (auth.role() = 'authenticated')` (clinical_cases, study_guides, flashcards, quiz_questions, clinical_topics, review_queue, user_monographs).
- **Since auth is Firebase, `auth.role()` is always `anon`/null for client calls → these write policies NEVER match.** Net effect:
  - Client Supabase writes are impossible; only the server `service_role` key can write (RLS bypass).
  - **User-isolation is not enforced at the DB layer** — no `user_id = auth.uid()` check exists, and service-role ignores RLS entirely.
- Service-role key in `server.ts` is the only write credential → if leaked/server compromised, full DB write access (Risk R3, P1).

### Recommendations (non-breaking, phased)
1. Decide the auth authority: either (a) drive Supabase via Firebase JWTs (`supabase.auth.signInWithIdToken` / custom JWT) so RLS `auth.uid()` works, or (b) formally treat Supabase as a server-writable, publicly-readable store and remove the misleading "authenticated" policies.
2. Add explicit `user_id` columns + `user_id = auth.uid()` checks if client writes are ever intended.
3. Keep `service_role` server-only; never expose; rotate if suspected leaked.
4. API auth guard (added Phase 9, `API_REQUIRE_AUTH`) should be enabled in production to protect the service-role write path.
