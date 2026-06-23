export interface QueuedOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  collection: string;
  documentId: string;
  data: Record<string, unknown> | null;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

export interface QueueStatus {
  pendingCount: number;
  failedCount: number;
  totalCount: number;
  isProcessing: boolean;
  oldestOperation: number | null;
}

export class OfflineQueueManager {
  private queue: QueuedOperation[] = [];
  private failed: QueuedOperation[] = [];
  private isProcessing = false;
  private maxRetries = 3;
  private storageKey = 'clinova_offline_queue';

  constructor() {
    this.loadFromStorage();
  }

  enqueue(operation: Omit<QueuedOperation, 'id' | 'timestamp' | 'retryCount' | 'maxRetries'>): QueuedOperation {
    const op: QueuedOperation = {
      ...operation,
      id: `${operation.collection}_${operation.documentId}_${Date.now()}`,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: this.maxRetries,
    };
    this.queue.push(op);
    this.saveToStorage();
    return op;
  }

  dequeue(): QueuedOperation | undefined {
    return this.queue.shift();
  }

  markFailed(op: QueuedOperation): void {
    op.retryCount++;
    if (op.retryCount >= op.maxRetries) {
      this.failed.push(op);
    } else {
      this.queue.push(op);
    }
    this.saveToStorage();
  }

  markComplete(op: QueuedOperation): void {
    this.saveToStorage();
  }

  async processQueue(processor: (op: QueuedOperation) => Promise<boolean>): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const op = this.dequeue()!;
      try {
        const success = await processor(op);
        if (!success) {
          this.markFailed(op);
        }
      } catch {
        this.markFailed(op);
      }
    }

    this.isProcessing = false;
    this.saveToStorage();
  }

  getQueue(): QueuedOperation[] {
    return [...this.queue];
  }

  getFailed(): QueuedOperation[] {
    return [...this.failed];
  }

  getStatus(): QueueStatus {
    return {
      pendingCount: this.queue.length,
      failedCount: this.failed.length,
      totalCount: this.queue.length + this.failed.length,
      isProcessing: this.isProcessing,
      oldestOperation: this.queue.length > 0 ? this.queue[0].timestamp : null,
    };
  }

  clearFailed(): void {
    this.failed = [];
    this.saveToStorage();
  }

  clearAll(): void {
    this.queue = [];
    this.failed = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      const data = JSON.stringify({ queue: this.queue, failed: this.failed });
      localStorage.setItem(this.storageKey, data);
    } catch {
      /* silent fail on storage error */
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        this.queue = parsed.queue || [];
        this.failed = parsed.failed || [];
      }
    } catch {
      /* silent fail on storage error */
    }
  }
}
