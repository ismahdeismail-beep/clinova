import { EventBus } from '../../engine/EventBus';
import { FirebaseEventGateway } from './FirebaseEventGateway';
import { OfflineQueueManager } from './OfflineQueueManager';
import { ConflictResolver } from './ConflictResolver';

export interface SyncHealthStatus {
  connected: boolean;
  latency: number;
  pendingEvents: number;
  failedEvents: number;
  activeSubscriptions: number;
  lastSyncTimestamp: number | null;
  conflictsResolved: number;
}

export class SyncHealthMonitor {
  private eventBus: EventBus;
  private eventGateway: FirebaseEventGateway;
  private offlineQueue: OfflineQueueManager;
  private conflictResolver: ConflictResolver;
  private latencies: number[] = [];
  private lastSyncTimestamp: number | null = null;
  private isConnected = false;
  private latencyCheckInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    eventBus: EventBus,
    eventGateway: FirebaseEventGateway,
    offlineQueue: OfflineQueueManager,
    conflictResolver: ConflictResolver,
  ) {
    this.eventBus = eventBus;
    this.eventGateway = eventGateway;
    this.offlineQueue = offlineQueue;
    this.conflictResolver = conflictResolver;
  }

  startMonitoring(intervalMs = 30000): void {
    this.latencyCheckInterval = setInterval(() => {
      this.checkLatency();
    }, intervalMs);

    this.eventBus.on('sync:started', () => { this.isConnected = true; });
    this.eventBus.on('sync:stopped', () => { this.isConnected = false; });
  }

  stopMonitoring(): void {
    if (this.latencyCheckInterval) {
      clearInterval(this.latencyCheckInterval);
      this.latencyCheckInterval = null;
    }
  }

  getStatus(): SyncHealthStatus {
    const queueStatus = this.offlineQueue.getStatus();
    return {
      connected: this.isConnected && Object.values(this.eventGateway.getConnectionStatus()).some(v => v),
      latency: this.getAverageLatency(),
      pendingEvents: queueStatus.pendingCount,
      failedEvents: queueStatus.failedCount,
      activeSubscriptions: this.eventGateway.getActiveSubscriptions().length,
      lastSyncTimestamp: this.lastSyncTimestamp,
      conflictsResolved: this.conflictResolver.getConflictLog().length,
    };
  }

  private async checkLatency(): Promise<void> {
    const start = Date.now();
    try {
      this.eventBus.emit('sync:ping', { timestamp: start });
      const latency = Date.now() - start;
      this.latencies.push(latency);
      if (this.latencies.length > 100) this.latencies.shift();
      this.lastSyncTimestamp = Date.now();
      this.isConnected = true;
    } catch {
      this.isConnected = false;
    }
  }

  private getAverageLatency(): number {
    if (this.latencies.length === 0) return 0;
    return Math.round(this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length);
  }
}
