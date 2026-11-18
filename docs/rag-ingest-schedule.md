# RAG ingest — local, no-quota runbook

`knowledge_chunks` holds embedded chunks for every drug monograph (~1,070 docs,
~8,800 chunks) so the RAG tutor can ground answers. Embeddings are generated
**locally by Ollama** — there is no daily provider quota, so the whole corpus
can be built in one run.

## Models (in `src/server/aiRouter.ts`)

| Role | Model | Host |
| --- | --- | --- |
| Embeddings | `nomic-embed-text` (via `nomic-embed-text`, 768-dim) | `http://127.0.0.1:11434` (Ollama) |
| Generation | `qwen2.5:3b` (`LOCAL_GEN_MODEL`) | same Ollama instance |

Overrides via env: `LOCAL_EMBED_URL`, `LOCAL_EMBED_MODEL`, `LOCAL_GEN_MODEL`.
`EMBEDDING_MODEL` is exported from `aiRouter.ts` and read by every consumer.

**Never mix embedding models in one corpus.** Changing `LOCAL_EMBED_MODEL`
requires `ensure-rag.ts --reset`, which wipes `knowledge_chunks` and re-embeds
everything.

Embeddings use the task prefixes Ollama expects from nomic-embed-text:
`search_query: ` for queries (via `embedText`) and `search_document: ` for
ingested documents (via `embedTexts` / `ensure-rag`). These are applied inside
`embedTexts`/`embedText`.

## Running the full ingest / refresh

```
nohup npx tsx scripts/ensure-rag.ts                          # full build (all docs)
nohup npx tsx scripts/ensure-rag.ts --reset                  # wipe & rebuild
nohup npx tsx scripts/ensure-rag.ts --only-missing           # resume w/o duplicating
nohup npx tsx scripts/ensure-rag.ts --stg-dir src/data/essentialMedicine
```

- `--only-missing` skips documents that already have chunks. Because the model
  tag on a row is the model used to embed it, switching models forces a full
  re-embed; that is the intended "full clean corpus" refresh.
- `--batch N --pace-ms N` controls request shape; local Ollama has no provider
  rate limit, so batches of 64 are fine and `--pace-ms 0` is safe.
- Ingest is idempotent per run: rows are tagged `(source, source_ref,
  chunk_index)`.

## STG / Essential Medicines corpus

`src/data/essentialMedicine/*.md` — Kenya MOH "Clinical Guidelines for Management
and Referral of Common Conditions" Vol 3 (2024), all 70 chapters converted to
markdown. Each `## Section` becomes one chunk. This corpus is now included in
the same `ensure-rag` run (`--no-stg` excludes it; `--stg-dir PATH` relocates it).

## Refreshing content

```
drafts/monographs/<drug>.json                      # sourced draft (agents write these)
  -> scripts/apply-monograph-drafts.ts             # merge into drug_monographs
  -> ensure-rag.ts --reembed-drafts                # re-embed only what changed
```

`--reembed` / `--reembed-drafts` chunk content-hash matching means unchanged
documents are skipped (free).

## Verification

```
npm run rag:verify          # coverage (exit 1 until 1072/1072)
npm run rag:weekly          # cosine top-K + grounded answer on 25 cases
```
