import { EventBus } from '../../engine/EventBus';
import { BrainTree } from '../../engine/BrainTree';
import { FirebaseEventGateway } from './FirebaseEventGateway';
import { WorkflowSyncBridge } from './WorkflowSyncBridge';
import { BrainTreeSyncService } from './BrainTreeSyncService';
import { ConflictResolver } from './ConflictResolver';
import { OfflineQueueManager } from './OfflineQueueManager';
import { SyncHealthMonitor, type SyncHealthStatus } from './SyncHealthMonitor';

export interface SyncConfig {
  autoSync: boolean;
  collections: string[];
  conflictStrategy: 'timestamp' | 'local_wins' | 'remote_wins';
  offlineQueueEnabled: boolean;
  healthCheckInterval: number;
}

export class RealtimeSyncManager {
  private eventBus: EventBus;
  private brainTree: BrainTree;
  private eventGateway: FirebaseEventGateway;
  private conflictResolver: ConflictResolver;
  private offlineQueue: OfflineQueueManager;
  private syncBridge: WorkflowSyncBridge;
  private brainTreeSync: BrainTreeSyncService;
  private healthMonitor: SyncHealthMonitor;
  private config: SyncConfig;

  constructor(eventBus: EventBus, brainTree?: BrainTree) {
    this.eventBus = eventBus;
    this.brainTree = brainTree ?? BrainTree.getInstance();
    this.conflictResolver = new ConflictResolver();
    this.offlineQueue = new OfflineQueueManager();
    this.eventGateway = new FirebaseEventGateway(eventBus);
    this.syncBridge = new WorkflowSyncBridge(eventBus, this.conflictResolver, this.offlineQueue);
    this.brainTreeSync = new BrainTreeSyncService(eventBus, brainTree, this.syncBridge, this.eventGateway);
    this.healthMonitor = new SyncHealthMonitor(eventBus, this.eventGateway, this.offlineQueue, this.conflictResolver);

    this.config = {
      autoSync: true,
      collections: ['workflows', 'workflow_nodes', 'rules'],
      conflictStrategy: 'timestamp',
      offlineQueueEnabled: true,
      healthCheckInterval: 30000,
    };
  }

  configure(config: Partial<SyncConfig>): void {
    this.config = { ...this.config, ...config };
  }

  start(): void {
    if (this.config.autoSync) {
      this.brainTreeSync.startSyncing();
    }
    if (this.config.offlineQueueEnabled) {
      this.flushPendingQueue();
    }
    this.healthMonitor.startMonitoring(this.config.healthCheckInterval);
    this.eventBus.emit('sync:manager:started', { timestamp: Date.now() });
  }

  stop(): void {
    this.brainTreeSync.stopSyncing();
    this.healthMonitor.stopMonitoring();
    this.eventGateway.unsubscribeAll();
    this.eventBus.emit('sync:manager:stopped', { timestamp: Date.now() });
  }

  getHealthStatus(): SyncHealthStatus {
    return this.healthMonitor.getStatus();
  }

  getEventGateway(): FirebaseEventGateway {
    return this.eventGateway;
  }

  getSyncBridge(): WorkflowSyncBridge {
    return this.syncBridge;
  }

  getConflictResolver(): ConflictResolver {
    return this.conflictResolver;
  }

  getOfflineQueue(): OfflineQueueManager {
    return this.offlineQueue;
  }

  getHealthMonitor(): SyncHealthMonitor {
    return this.healthMonitor;
  }

  private async flushPendingQueue(): Promise<void> {
    const queue = this.offlineQueue.getQueue();
    if (queue.length === 0) return;

    await this.offlineQueue.processQueue(async (op) => {
      try {
        const { getDoc, doc, setDoc, deleteDoc } = await import('firebase/firestore');
        const { db } = await import('../../lib/firebase');

        if (op.type === 'delete') {
          await deleteDoc(doc(db, op.collection, op.documentId));
        } else if (op.data) {
          const existing = await getDoc(doc(db, op.collection, op.documentId));
          if (existing.exists()) {
            const resolved = this.conflictResolver.resolve({
              collection: op.collection,
              documentId: op.documentId,
              localVersion: 0,
              remoteVersion: 0,
              localData: op.data,
              remoteData: existing.data() as Record<string, unknown>,
              timestamp: Date.now(),
            });
            await setDoc(doc(db, op.collection, op.documentId), resolved.mergedData, { merge: true });
          } else {
            await setDoc(doc(db, op.collection, op.documentId), op.data as Record<string, unknown>, { merge: true });
          }
        }
        return true;
      } catch {
        return false;
      }
    });
  }
}
