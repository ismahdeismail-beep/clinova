import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { StoredFile } from '../types/engine';

export interface LocalFileRecord {
  id: string;
  meta: StoredFile;
  blob: Blob;
  timestamp: number;
}

interface LocalFileDBSchema extends DBSchema {
  local_files: {
    key: string;
    value: LocalFileRecord;
  };
}

class LocalFileDb {
  private dbPromise: Promise<IDBPDatabase<LocalFileDBSchema>> | null = null;

  private getDB() {
    if (!this.dbPromise && typeof window !== 'undefined') {
      this.dbPromise = openDB<LocalFileDBSchema>('clinova-local-files-db', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('local_files')) {
            db.createObjectStore('local_files', { keyPath: 'id' });
          }
        },
      });
    }
    return this.dbPromise;
  }

  async saveFile(id: string, meta: StoredFile, blob: Blob): Promise<void> {
    const db = this.getDB();
    if (!db) return;
    try {
      const idb = await db;
      await idb.put('local_files', {
        id,
        meta,
        blob,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.warn('[LocalFileDb] Save failed:', e);
    }
  }

  async getFile(id: string): Promise<LocalFileRecord | null> {
    const db = this.getDB();
    if (!db) return null;
    try {
      const idb = await db;
      const record = await idb.get('local_files', id);
      return record || null;
    } catch (e) {
      console.warn('[LocalFileDb] Get failed:', e);
      return null;
    }
  }

  async deleteFile(id: string): Promise<void> {
    const db = this.getDB();
    if (!db) return;
    try {
      const idb = await db;
      await idb.delete('local_files', id);
    } catch (e) {
      console.warn('[LocalFileDb] Delete failed:', e);
    }
  }

  async getAllFiles(): Promise<LocalFileRecord[]> {
    const db = this.getDB();
    if (!db) return [];
    try {
      const idb = await db;
      return await idb.getAll('local_files');
    } catch (e) {
      console.warn('[LocalFileDb] GetAll failed:', e);
      return [];
    }
  }
}

export const localFileDb = new LocalFileDb();
