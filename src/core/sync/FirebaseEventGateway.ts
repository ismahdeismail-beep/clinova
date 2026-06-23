import { db } from '../../lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  type Unsubscribe,
  type DocumentData,
  type QuerySnapshot,
  type DocumentChange,
} from 'firebase/firestore';
import { EventBus } from '../../engine/EventBus';

export type FirestoreCollection = 'workflows' | 'workflow_nodes' | 'rules' | 'drugs' | 'conditions' | 'interactions' | 'users';

export interface FirestoreEvent {
  type: 'added' | 'modified' | 'removed';
  collection: string;
  documentId: string;
  data: DocumentData | null;
  timestamp: number;
}

export class FirebaseEventGateway {
  private subscriptions: Map<string, Unsubscribe> = new Map();
  private eventBus: EventBus;
  private connectionStatus: Map<string, boolean> = new Map();

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  subscribeToCollection(collectionName: FirestoreCollection): void {
    if (this.subscriptions.has(collectionName)) return;

    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot: QuerySnapshot) => {
        this.connectionStatus.set(collectionName, true);
        for (const change of snapshot.docChanges()) {
          const event: FirestoreEvent = {
            type: change.type as 'added' | 'modified' | 'removed',
            collection: collectionName,
            documentId: change.doc.id,
            data: change.doc.data(),
            timestamp: Date.now(),
          };
          this.eventBus.emit(`firebase:${collectionName}:${change.type}`, event);
          this.eventBus.emit('firebase:change', event);
        }
      },
      (error) => {
        this.connectionStatus.set(collectionName, false);
        this.eventBus.emit('firebase:error', { collection: collectionName, error: error.message });
      },
    );

    this.subscriptions.set(collectionName, unsubscribe);
  }

  subscribeToDocument(collectionName: string, documentId: string): void {
    const key = `${collectionName}/${documentId}`;
    if (this.subscriptions.has(key)) return;

    const docRef = doc(db, collectionName, documentId);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          this.eventBus.emit(`firebase:${key}:removed`, {
            type: 'removed',
            collection: collectionName,
            documentId,
            data: null,
            timestamp: Date.now(),
          });
          return;
        }
        this.eventBus.emit(`firebase:${key}:modified`, {
          type: 'modified',
          collection: collectionName,
          documentId,
          data: snapshot.data(),
          timestamp: Date.now(),
        });
      },
    );

    this.subscriptions.set(key, unsubscribe);
  }

  unsubscribe(collectionName: string): void {
    const sub = this.subscriptions.get(collectionName);
    if (sub) {
      sub();
      this.subscriptions.delete(collectionName);
      this.connectionStatus.delete(collectionName);
    }
  }

  unsubscribeAll(): void {
    for (const [, unsubscribe] of this.subscriptions) {
      unsubscribe();
    }
    this.subscriptions.clear();
    this.connectionStatus.clear();
  }

  isConnected(collectionName: string): boolean {
    return this.connectionStatus.get(collectionName) ?? false;
  }

  getActiveSubscriptions(): string[] {
    return Array.from(this.subscriptions.keys());
  }

  getConnectionStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};
    for (const [key, connected] of this.connectionStatus) {
      status[key] = connected;
    }
    return status;
  }
}
