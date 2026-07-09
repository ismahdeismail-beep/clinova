import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { db } from './firebase';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface SyncDBSchema extends DBSchema {
  pending_mutations: {
    key: string;
    value: {
      id: string;
      collectionPath: string;
      docId?: string;
      action: 'create' | 'update' | 'delete';
      payload: any;
      timestamp: number;
    };
  };
}

type SyncStatus = 'idle' | 'syncing' | 'error';
type SyncListener = (status: SyncStatus, pendingCount: number) => void;

class SyncManager {
  private dbPromise: Promise<IDBPDatabase<SyncDBSchema>>;
  private listeners: Set<SyncListener> = new Set();
  private isSyncing = false;
  private currentStatus: SyncStatus = 'idle';

  constructor() {
    this.dbPromise = openDB<SyncDBSchema>('clinova-sync-db', 1, {
      upgrade(db) {
        db.createObjectStore('pending_mutations', { keyPath: 'id' });
      },
    });
    
    // Listen for online events to trigger sync
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.sync());
    }
  }

  subscribe(listener: SyncListener) {
    this.listeners.add(listener);
    this.getPendingMutationsCount().then(count => {
      listener(this.currentStatus, count);
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private async notifyListeners(status?: SyncStatus) {
    if (status) this.currentStatus = status;
    const count = await this.getPendingMutationsCount();
    this.listeners.forEach(listener => listener(this.currentStatus, count));
  }

  async addMutation(collectionPath: string, action: 'create' | 'update' | 'delete', payload: any, docId?: string) {
    const id = crypto.randomUUID();
    const idb = await this.dbPromise;
    await idb.put('pending_mutations', {
      id,
      collectionPath,
      docId,
      action,
      payload,
      timestamp: Date.now(),
    });

    this.notifyListeners();

    if (navigator.onLine) {
      this.sync();
    }
  }

  async sync() {
    if (!navigator.onLine || this.isSyncing) return;

    this.isSyncing = true;
    this.notifyListeners('syncing');

    const idb = await this.dbPromise;
    const mutations = await idb.getAll('pending_mutations');
    
    if (mutations.length === 0) {
      this.isSyncing = false;
      this.notifyListeners('idle');
      return;
    }

    // Sort by timestamp to apply them in order
    mutations.sort((a, b) => a.timestamp - b.timestamp);
    let hasError = false;

    for (const mutation of mutations) {
      try {
        const { collectionPath, docId, action, payload, id } = mutation;
        
        let docRef;
        if (docId) {
          docRef = doc(db, collectionPath, docId);
        } else {
          docRef = doc(collection(db, collectionPath));
        }

        if (action === 'create' || action === 'update') {
           // Using setDoc with merge: true handles both creation and updates safely
           await setDoc(docRef, payload, { merge: true });
        } else if (action === 'delete') {
           await deleteDoc(docRef);
        }

        // Successfully synced, remove from IndexedDB
        await idb.delete('pending_mutations', id);
        this.notifyListeners();
      } catch (error) {
        console.error('Failed to sync mutation:', error, mutation);
        hasError = true;
        // We leave it in the queue for the next sync attempt if it fails (e.g. timeout/network error)
      }
    }

    this.isSyncing = false;
    this.notifyListeners(hasError ? 'error' : 'idle');
  }
  
  async getPendingMutationsCount() {
    const idb = await this.dbPromise;
    return await idb.count('pending_mutations');
  }
}

export const syncManager = new SyncManager();
