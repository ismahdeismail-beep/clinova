import { db } from '../../lib/firebase';
import { doc, setDoc, deleteDoc, type DocumentData } from 'firebase/firestore';
import { EventBus } from '../../engine/EventBus';
import { ConflictResolver } from './ConflictResolver';
import { OfflineQueueManager } from './OfflineQueueManager';
import type { Workflow, WorkflowNode } from '../../types/engine';

export class WorkflowSyncBridge {
  private eventBus: EventBus;
  private conflictResolver: ConflictResolver;
  private offlineQueue: OfflineQueueManager;
  private isOnline = navigator.onLine;

  constructor(eventBus: EventBus, conflictResolver: ConflictResolver, offlineQueue: OfflineQueueManager) {
    this.eventBus = eventBus;
    this.conflictResolver = conflictResolver;
    this.offlineQueue = offlineQueue;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushOfflineQueue();
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  async syncWorkflow(workflow: Workflow): Promise<void> {
    if (!this.isOnline) {
      this.offlineQueue.enqueue({
        type: 'update',
        collection: 'workflows',
        documentId: workflow.id,
        data: workflow as unknown as Record<string, unknown>,
      });
      return;
    }

    try {
      await setDoc(doc(db, 'workflows', workflow.id), workflow as unknown as DocumentData, { merge: true });
      this.eventBus.emit('sync:workflow:sent', { workflowId: workflow.id, timestamp: Date.now() });
    } catch (error) {
      this.eventBus.emit('sync:error', { workflowId: workflow.id, error: String(error) });
    }
  }

  async syncNode(node: WorkflowNode): Promise<void> {
    if (!this.isOnline) {
      this.offlineQueue.enqueue({
        type: 'update',
        collection: 'workflow_nodes',
        documentId: node.id,
        data: node as unknown as Record<string, unknown>,
      });
      return;
    }

    try {
      await setDoc(doc(db, 'workflow_nodes', node.id), node as unknown as DocumentData, { merge: true });
      this.eventBus.emit('sync:node:sent', { nodeId: node.id, timestamp: Date.now() });
    } catch (error) {
      this.eventBus.emit('sync:error', { nodeId: node.id, error: String(error) });
    }
  }

  async deleteWorkflow(workflowId: string): Promise<void> {
    if (!this.isOnline) {
      this.offlineQueue.enqueue({
        type: 'delete',
        collection: 'workflows',
        documentId: workflowId,
        data: null,
      });
      return;
    }

    try {
      await deleteDoc(doc(db, 'workflows', workflowId));
      this.eventBus.emit('sync:workflow:deleted', { workflowId, timestamp: Date.now() });
    } catch (error) {
      this.eventBus.emit('sync:error', { workflowId, error: String(error) });
    }
  }

  handleRemoteUpdate(workflowId: string, localData: Record<string, unknown>, remoteData: Record<string, unknown>): void {
    const conflict = this.conflictResolver.resolve({
      collection: 'workflows',
      documentId: workflowId,
      localVersion: (localData.version as number) || 0,
      remoteVersion: (remoteData.version as number) || 0,
      localData,
      remoteData,
      timestamp: Date.now(),
    });

    if (conflict.resolution === 'remote_wins') {
      this.eventBus.emit('sync:workflow:remote_update', { workflowId, data: remoteData });
    }
  }

  private async flushOfflineQueue(): Promise<void> {
    await this.offlineQueue.processQueue(async (op) => {
      try {
        if (op.type === 'delete') {
          await deleteDoc(doc(db, op.collection, op.documentId));
        } else if (op.data) {
          await setDoc(doc(db, op.collection, op.documentId), op.data as DocumentData, { merge: true });
        }
        return true;
      } catch {
        return false;
      }
    });
  }
}
