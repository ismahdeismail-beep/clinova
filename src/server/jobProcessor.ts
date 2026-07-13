import { createClient } from '@supabase/supabase-js';
import { embedText } from './aiRouter';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const adminSupabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

export type JobRow = {
  id: string;
  job_type: string;
  status: string;
  priority: number;
  payload: Record<string, any>;
  user_id?: string;
  error_message?: string;
  retry_count: number;
  max_retries: number;
  created_at: string;
};

export async function claimNextJob(jobType?: string): Promise<JobRow | null> {
  if (!adminSupabase) return null;
  const { data, error } = await adminSupabase.rpc('claim_next_job', {
    job_type_filter: jobType ?? null,
  });
  if (error || !data || data.length === 0) return null;
  return data[0] as JobRow;
}

type JobHandler = (job: JobRow) => Promise<void>;

const handlers: Record<string, JobHandler> = {};

/**
 * Register a handler for a job type. Called by the system on startup.
 */
export function registerHandler(jobType: string, handler: JobHandler) {
  handlers[jobType] = handler;
}

/**
 * Execute a single job with error handling + retry logic.
 * Calls the registered handler for the job's type, then updates
 * status to completed/failed.
 */
export async function executeJob(job: JobRow): Promise<void> {
  if (!adminSupabase) return;

  const handler = handlers[job.job_type];
  if (!handler) {
    await failJob(job, `No handler registered for job type: ${job.job_type}`);
    return;
  }

  try {
    await handler(job);
    await adminSupabase
      .from('processing_jobs')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', job.id);
  } catch (err: any) {
    const nextRetry = job.retry_count + 1;
    if (nextRetry < job.max_retries) {
      await adminSupabase
        .from('processing_jobs')
        .update({
          status: 'pending',
          retry_count: nextRetry,
          error_message: err.message?.slice(0, 500),
        })
        .eq('id', job.id);
    } else {
      await failJob(job, err.message);
    }
  }
}

async function failJob(job: JobRow, msg: string) {
  if (!adminSupabase) return;
  await adminSupabase
    .from('processing_jobs')
    .update({ status: 'failed', error_message: msg?.slice(0, 500), completed_at: new Date().toISOString() })
    .eq('id', job.id);
}

/**
 * Process one pending job. Returns true if a job was processed.
 */
export async function processOneJob(jobType?: string): Promise<boolean> {
  const job = await claimNextJob(jobType);
  if (!job) return false;
  await executeJob(job);
  return true;
}

/**
 * Process up to `max` pending jobs sequentially.
 */
export async function processJobBatch(max = 5, jobType?: string): Promise<number> {
  let count = 0;
  for (let i = 0; i < max; i++) {
    const ok = await processOneJob(jobType);
    if (!ok) break;
    count++;
  }
  return count;
}

// ---- Built-in handlers ----

registerHandler('generate_embedding', async (job) => {
  const text: string = job.payload?.text || job.payload?.chunk_text;
  if (!text) throw new Error('No text provided in job payload');

  const embedding = await embedText(text);
  if (!adminSupabase) throw new Error('Admin client not available');

  const { error } = await adminSupabase.from('document_embeddings').insert({
    content_type: job.payload?.content_type || 'resource',
    content_id: job.payload?.content_id || job.id,
    chunk_index: job.payload?.chunk_index ?? 0,
    chunk_text: text,
    embedding,
    metadata: job.payload?.metadata ?? {},
  });
  if (error) throw new Error(error.message);
});

registerHandler('document_text_extract', async (job) => {
  // Placeholder: document text extraction from uploaded files.
  // Actual extraction (pdf-parse, mammoth, etc.) should be added
  // once PDF/DOCX parsing is available on the server.
  const text: string = job.payload?.extracted_text || job.payload?.text;
  if (!text) throw new Error('No extracted text available');
  await embedText(text); // verify the AI key works
});
