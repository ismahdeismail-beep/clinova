# Free API Keys — How to Get Each (Clinova)

Clinova's `.env` needs several provider keys. Most have a **free tier that needs no credit card** —
you just sign up with your own account and copy the key. This guide lists each one, the free tier,
and where to generate the key. Fill the values into `.env` (copy from `.env.example`).

> I cannot obtain keys for you. Every key below must be created from your own account.
> Never paste keys into chat, screenshots, or commit them to git (`.env` is gitignored).

## Required

### GEMINI_API_KEY (Google Gemini — core AI)
- Free tier: Gemini 2.5 Flash / 2.5 Pro / 2.0 Flash, 1.5M+ token context, no card required.
- Caveat: free-tier data *may* be used by Google for training; EU/UK may require billing enabled.
  Rate limits are tight after Dec 2025 cuts.
- Get key: https://aistudio.google.com/apikey  (sign in with Google, "Get API Key" → create).
- Map to: `GEMINI_API_KEY`, and optionally `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2` for quota rotation.
- Note (June 2026): Google now restricts *unrestricted* keys. Generate the key inside AI Studio
  (restricted to Gemini API by default) or restrict it in Google Cloud Credentials.

## Optional (multi-provider AI fallback)

### OPENROUTER_API_KEY
- Free tier: 28+ `:free` models (DeepSeek R1, Llama 3.3 70B, Qwen, etc.), 20 req/min, 50 req/day
  (raised to 1,000/day after a one-time $10 credit purchase). No card.
- Get key: https://openrouter.ai/sign-up → "Get API Key" → Create (copy once).
- Use `openrouter/free` router or any model id ending in `:free`.
- Map to: `OPENROUTER_API_KEY`.

### CEREBRAS_API_KEY
- Free tier: Llama 3.1/4, Qwen3 — extremely fast inference, ~30 RPM. No card.
- Get key: https://cloud.cerebras.ai/  → generate API key. Endpoint: `https://api.cerebras.ai/v1`.
- Map to: `CEREBRAS_API_KEY`.

### MISTRAL_API_KEY
- Free tier: "Experiment tier" ~1 billion tokens/month across all models (Mistral Large, Codestral),
  ~1 req/sec. No card (SMS verification only).
- Get key: https://console.mistral.ai/  → API Keys → create.
- Map to: `MISTRAL_API_KEY`.

### COHERE_API_KEY
- Free trial / sandbox available via https://dashboard.cohere.com/ (free tier for embeddings/rerank/classify).
- Get key: https://dashboard.cohere.com/api-keys.
- Map to: `COHERE_API_KEY`.

### JINA_API_KEY
- Free tier: https://jina.ai/  Reader + embeddings (for RAG ingestion). Has a free dev quota.
- Get key: https://jina.ai/api/  → dashboard → API key.
- Map to: `JINA_API_KEY`.

### NIH_API_KEY
- Free: NCBI/E-utilities API key, just register an email. Raises rate limits.
- Get key: https://www.ncbi.nlm.nih.gov/account/settings/  (or email request to NCBI).
- Map to: `NIH_API_KEY`.

## Backend / Storage (free tiers)

### Supabase (local by default; hosted optional)
- Local dev uses `SUPABASE_URL=http://127.0.0.1:54321` (run `npm run supabase:start`).
- Hosted free tier ("Free" plan): https://supabase.com/  → New project → Project Settings → API.
  Copy Project URL + anon key + service role key.
- Map to: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`.

### Firebase (optional — Supabase is primary)
- Free "Spark" plan: https://console.firebase.google.com/  → add project →
  Project settings → "Your apps" → config keys.
- Map to: `VITE_FIREBASE_*`.

### Cloudinary (optional — file uploads)
- Free "Free" plan (25k transformations/mo): https://cloudinary.com/  → Dashboard →
  API Keys (copy cloud name, API key, API secret; create an upload preset).
- Map to: `VITE_CLOUDINARY_*`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## Admin / Security (optional)
- `ADMIN_API_SECRET`, `API_SHARED_SECRET`: generate your own random string, e.g.
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## Quick start (minimal to run)
1. `cp .env.example .env`
2. Get a **Gemini** key (only hard requirement for AI features) → `GEMINI_API_KEY`.
3. For local backend, run `npm run supabase:start` and copy the anon/service keys from the
   Supabase dashboard shown in terminal into `SUPABASE_*`.
4. (Optional) Add OpenRouter / Cerebras / Mistral keys for provider fallback.
5. `npm run dev` to start.

## Stacking free tiers (advanced)
If you want to run many requests for $0, aggregate the free tiers (Google, OpenRouter `:free`,
Cerebras, Mistral Experiment, Cohere, etc.) behind one OpenAI-compatible endpoint. Projects like
[FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) aggregate ~14 providers with failover.
Use only for personal experimentation — not production.
