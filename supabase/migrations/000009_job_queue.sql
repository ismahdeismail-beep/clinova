-- ================================================================
-- Clinova Background Job Queue (Phase 9)
-- Version: 1.7.0
-- Lightweight async job processing for file ingestion, text
-- extraction, embedding generation, and other long-running tasks
-- that should not block API responses.
--
-- Processed either by:
--   a) A cron job on Supabase (pg_cron)
--   b) The /api/admin/jobs/process endpoint (server-driven batch)
-- ================================================================

CREATE TYPE job_status AS ENUM ('pending', 'processing', 'completed', 'failed');

CREATE TABLE IF NOT EXISTS processing_jobs (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_type      TEXT NOT NULL,               -- 'document_text_extract', 'generate_embedding', 'reindex_drugs', etc.
  status        job_status NOT NULL DEFAULT 'pending',
  priority      INT NOT NULL DEFAULT 0,      -- higher = more urgent
  payload       JSONB NOT NULL DEFAULT '{}', -- type-specific params
  user_id       UUID,                        -- nullable; null = system job
  error_message TEXT,
  retry_count   INT NOT NULL DEFAULT 0,
  max_retries   INT NOT NULL DEFAULT 3,
  created_at    TIMESTAMPTZ DEFAULT now(),
  started_at    TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ
);

-- Speed up unprocessed-job scans
CREATE INDEX IF NOT EXISTS idx_jobs_pending
  ON processing_jobs (priority DESC, created_at ASC)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_jobs_type_status
  ON processing_jobs (job_type, status);

-- ================================================================
-- RLS: jobs are readable by the owning user; system jobs are
-- service-role only. (The /api/admin/jobs endpoints use the
-- service-role client, bypassing RLS.)
-- ================================================================
ALTER TABLE processing_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own jobs"
  ON processing_jobs FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own jobs"
  ON processing_jobs FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ================================================================
-- Helper: claim the next pending job atomically (skip-locked).
-- Called by the background processor to avoid duplicate processing.
-- ================================================================
CREATE OR REPLACE FUNCTION claim_next_job(job_type_filter TEXT DEFAULT NULL)
RETURNS SETOF processing_jobs
LANGUAGE sql
AS $$
  UPDATE processing_jobs
  SET status = 'processing', started_at = now()
  WHERE id = (
    SELECT id
    FROM processing_jobs
    WHERE status = 'pending'
      AND (job_type_filter IS NULL OR job_type = job_type_filter)
    ORDER BY priority DESC, created_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  RETURNING *;
$$;

GRANT EXECUTE ON FUNCTION claim_next_job(TEXT) TO anon, authenticated;
