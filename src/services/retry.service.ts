import { EventBus } from '../engine/EventBus';

interface RetryTask<T = unknown> {
  id: string;
  fn: () => Promise<T>;
  maxAttempts: number;
  baseDelayMs: number;
  category: string;
  onSuccess?: (result: T) => void;
  onFailed?: (error: unknown) => void;
}

interface RetryQueueItem extends RetryTask {
  attempts: number;
  nextAttemptAt: number;
}

const bus = EventBus.getInstance();
let queue: RetryQueueItem[] = [];
let processing = false;
let counter = 0;

function calculateDelay(baseMs: number, attempt: number): number {
  const jitter = Math.random() * 1000;
  return Math.min(baseMs * Math.pow(2, attempt - 1) + jitter, 30000);
}

async function processQueue(): Promise<void> {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const now = Date.now();
    const ready = queue.filter((item) => item.nextAttemptAt <= now);

    if (ready.length === 0) {
      const next = queue.reduce((min, item) => Math.min(min, item.nextAttemptAt), Infinity);
      const wait = Math.max(0, next - now);
      if (wait > 0) await new Promise((r) => setTimeout(r, Math.min(wait, 5000)));
      continue;
    }

    for (const item of ready) {
      queue = queue.filter((q) => q.id !== item.id);

      try {
        const result = await item.fn();
        bus.emit('retry:success', { id: item.id, category: item.category, attempts: item.attempts });
        item.onSuccess?.(result);
      } catch (err) {
        if (item.attempts < item.maxAttempts) {
          const nextDelay = calculateDelay(item.baseDelayMs, item.attempts + 1);
          bus.emit('retry:will-retry', {
            id: item.id, category: item.category,
            attempt: item.attempts + 1, maxAttempts: item.maxAttempts,
            nextDelay,
          });
          queue.push({
            ...item,
            attempts: item.attempts + 1,
            nextAttemptAt: Date.now() + nextDelay,
          });
        } else {
          bus.emit('retry:failed', { id: item.id, category: item.category, error: err });
          item.onFailed?.(err);
        }
      }
    }
  }

  processing = false;
}

export function enqueueRetry<T>(task: Omit<RetryTask<T>, 'id'>): string {
  const id = `retry-${++counter}`;
  queue.push({
    ...task,
    id,
    attempts: 0,
    nextAttemptAt: Date.now(),
  });
  bus.emit('retry:enqueued', { id, category: task.category });
  processQueue();
  return id;
}

export function cancelRetry(id: string): boolean {
  const before = queue.length;
  queue = queue.filter((q) => q.id !== id);
  return before !== queue.length;
}

export function getRetryQueueSize(): number {
  return queue.length;
}

export function getFailedRetries(): number {
  return 0;
}
