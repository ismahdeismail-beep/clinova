# RAG rollback / recovery

Every `ensure-rag.ts` run tags each `knowledge_chunks` row with a `run_id`
(`YYYYMMDD-<base36>`). To roll the corpus back to a previous run:

```sql
-- 1. See which runs exist and their coverage:
select run_id, embedding_model,
       count(*)::int          as chunks,
       count(distinct monograph_id)::int as monographs,
       min(created_at) as first_seen
from knowledge_chunks
group by run_id, embedding_model
order by first_seen desc;

-- 2. (optional) snapshot the current state before touching anything:
create table knowledge_chunks_backup_<run_id> as
  select * from knowledge_chunks where run_id = '<run_id>';

-- 3. Delete the bad run's chunks:
delete from knowledge_chunks where run_id = '<bad_run_id>';

-- 4. If the previous run's rows were also deleted (e.g. --reset), re-run it:
--    (re-embedding is idempotent; the upsert key is (monograph_id, chunk_index))
npx tsx scripts/ensure-rag.ts            # full re-ingest
```

### Rolling back reviewed training cases

`bot_training_cases.reviewed_at` is stamped by `train-rag-weekly.ts` the moment
a case is evaluated. To re-open a week's evaluations:

```sql
update bot_training_cases
   set reviewed_at = null
 where reviewed_at is not null
   and reviewed_at >= '<bad_week_start>';   -- ISO timestamp of the bad run
```

Un-reviewed cases (`status = 'approved' and reviewed_at is null`) are picked up
on the next `train-rag-weekly` run.

### Model-switch note

`embedding_model` is recorded per chunk. Cosine retrieval is only meaningful
between vectors from the **same** model, so if the embed model ever changes
again, run with `--reset` first (deletes all rows then re-embeds) — the table
must never mix models.
