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

class SyncManager {
  private dbPromise: Promise<IDBPDatabase<SyncDBSchema>>;

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

    if (navigator.onLine) {
      this.sync();
    }
  }

  async sync() {
    if (!navigator.onLine) return;

    const idb = await this.dbPromise;
    const mutations = await idb.getAll('pending_mutations');
    
    // Sort by timestamp to apply them in order
    mutations.sort((a, b) => a.timestamp - b.timestamp);

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
      } catch (error) {
        console.error('Failed to sync mutation:', error, mutation);
        // We leave it in the queue for the next sync attempt if it fails (e.g. timeout/network error)
      }
    }
  }
  
  async getPendingMutationsCount() {
    const idb = await this.dbPromise;
    return await idb.count('pending_mutations');
  }
}

export const syncManager = new SyncManager();
