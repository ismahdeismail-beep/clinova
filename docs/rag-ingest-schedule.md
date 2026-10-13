# RAG ingest — completion schedule & quota reality

`knowledge_chunks` must hold embedded chunks for all 1072 drug monographs so the
RAG tutor can ground answers. The corpus is ~**8077 chunks**. Filling it is
gated by the **Gemini embedding free tier**, not by our code.

## The hard limit (verified 2026-10-13)

| Limit                                      | Value                       | Counts                                                   |
| ------------------------------------------ | --------------------------- | -------------------------------------------------------- |
| `embed_content_free_tier_requests` (daily) | **1000 / day / model**      | **texts** — a 100-text `batchEmbedContents` consumes 100 |
| per-minute                                 | **100 texts / min / model** | texts                                                    |

So `batchEmbedContents` relieves the _per-minute_ ceiling but **does not stretch
the day**: a full corpus is ~8 productive days on the free tier.

Two more constraints:

- **One model per corpus.** Cosine similarity across vectors from different
  embedding models is meaningless, so all chunks must use a single model
  (`EMBEDDING_MODEL` in `src/server/aiRouter.ts`). Switching models requires
  `--reset` (`npm run rag:reset`).
- Only `gemini-embedding-001` and `gemini-embedding-2` are exposed to this key
  (`text-embedding-005`, `text-multilingual-embedding-002` → 404). Each has its
  own 1000/day budget, but they cannot be mixed.

`ensure-rag` therefore stops cleanly when the day is spent
(`chunks_quota_skipped` in the report) and `--only-missing` resumes later.

## Automating completion (free path)

A self-healing cron wrapper is installed:

```
17 * * * * /home/ishi/clinova/scripts/rag-resume-cron.sh
```

`scripts/rag-resume-cron.sh` runs **hourly** but only starts a real resume when
the last _productive_ run was **≥ 20 h ago** (marker `logs/rag-resume.last`), so
it catches up automatically after the machine was asleep or off. `flock`
prevents overlapping runs. When the daily quota is spent the run writes 0 chunks
and leaves no marker, so the next hourly tick retries once the budget resets.

- Watch it: `tail -f logs/rag-resume.log` (each tick also logs a coverage snapshot)
- One-line check: `npm run rag:verify` (prints coverage; exits 0 only at 1072/1072)
- Run it now: `bash scripts/rag-resume-cron.sh` (or `npm run rag:resume`)
- Disable: `crontab -e` → delete the line
- Progress: `node scripts/db.mjs "select * from rag_pipeline_status"`

Expected: ~8 days to 1072/1072, adding ~1000 chunks/day. The machine must be on
for at least one tick inside each 24 h window; the hourly cadence makes that
robust.

## Fast path (optional, ~same day)

Enable billing on the Google project behind `GEMINI_API_KEY`, then a single run
finishes everything in ~15 min for a negligible cost (8077 chunks ≈ 1.6 M tokens
≈ **< $0.05** at embedding rates):

```
npm run rag:reset        # only if you also change EMBEDDING_MODEL
npm run rag:ingest
```

Then remove the cron line. To prefer the cloud instead of this laptop, move the
same command into a scheduled GitHub Action / Vercel cron job — but note
serverless time limits (a 1000-text run is ~11 min), so a GitHub Actions
runner is the right host, with repo secrets `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`.

## Additional corpora (STG / essential medicines)

`knowledge_chunks` also carries a `source='stg'` corpus for Standard Treatment
Guidelines, ingested from markdown under `src/data/essentialMedicine/`:

- Each `## Section` of `<medicine>.md` becomes one chunk, prefixed with the
  medicine name; YAML front-matter holds `title` / `category` / `atcCode` /
  `lastUpdated` / `sourceMonograph`.
- Ingest is part of the same `ensure-rag` run (so the hourly cron picks new STG
  files up automatically). `--only-missing` resumes STG docs by slug too.
- This is **additive**: it does not change the 1072-monograph completion, and
  STG rows (NULL `monograph_id`) never inflate `covered_monographs`.
- Requires migration `00021_knowledge_chunks_sources.sql` (applied), which adds
  `source`/`source_ref`, makes `monograph_id` nullable, and installs the
  `(source, source_ref, chunk_index)` unique index.
- The corpus is empty until authoritative WHO EML / national STG content is
  added (see `src/data/essentialMedicine/README.md`).

## Verification

```
npm run rag:verify
# expect: "RAG corpus: 1072/1072 monographs (100%) · ~8077 chunks · 25 approved cases"
# exit 0 == complete; exit 1 == still filling

npm run rag:weekly        # 25 approved cases; cosine top-3 + grounded answer
```

`train-rag-weekly` only retrieves chunks whose `embedding_model` matches
`EMBEDDING_MODEL`, so it is safe against a mixed/partial corpus (it reports
`no-chunks-yet` for monographs not embedded).
