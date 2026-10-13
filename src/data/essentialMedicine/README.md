# Essential Medicines / Standard Treatment Guidelines (STG)

Markdown source for the `source='stg'` RAG corpus. Consumed by
`scripts/ensure-rag.ts` (`--stg-dir`, default this folder) and retrieved by the
WhatsApp bot via `answerWithRag(question, { source: 'stg' })` in
`src/server/rag.ts`.

## Adding an entry

1. Copy `_TEMPLATE.md` to `<medicine-slug>.md` (e.g. `amoxicillin.md`).
2. Fill the YAML front-matter: `title`, `category`, `atcCode`, `lastUpdated`,
   and optional `sourceMonograph` (the drug-monograph slug to cross-reference).
3. Put one `## Section` per topic (Indications, Dosage, Contraindications, …).
   Each `##` section becomes one embedded chunk, prefixed with the medicine name
   so it is self-contained for retrieval.
4. Run the ingest (below). Re-running is idempotent — chunks upsert on
   `(source, source_ref, chunk_index)`.

**Files starting with `_` and `README.md` are ignored** (templates/docs).

> ⚠️ **Authoritative content only.** Populate from the current WHO Essential
> Medicines List / national STG. Never commit placeholder or invented doses,
> indications, or interactions.

## Ingest

```sh
# dry run — parse + count chunks, no embeddings, no DB writes
npx tsx scripts/ensure-rag.ts --dry-run

# embed just the STG corpus (resume-safe; skips already-ingested docs)
npx tsx scripts/ensure-rag.ts --only-missing --stg-dir src/data/essentialMedicine
```

Requires migration `00021_knowledge_chunks_sources.sql`, which adds `source` /
`source_ref`, makes `monograph_id` nullable, and installs the source-scoped
unique index `(source, source_ref, chunk_index)`.

## How it is retrieved

Both corpora share one embedding model (`gemini-embedding-001`), so a
`knowledge_chunks` similarity search naturally blends monograph and STG chunks.
Pass `{ source: 'stg' }` to restrict a query to the guidelines corpus.
