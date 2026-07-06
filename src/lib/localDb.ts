import { openDB, DBSchema } from 'idb';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  synced: boolean;
}

export interface MonographCacheEntry {
  key: string;
  content: string;
  source: 'ai-generated' | 'database';
  accessedAt: string;
  savedForOffline: boolean;
}

interface ClinovaDB extends DBSchema {
  chatSessions: {
    key: string;
    value: ChatSession;
    indexes: { 'by-updatedAt': string };
  };
  monographs: {
    key: string;
    value: MonographCacheEntry;
    indexes: { 'by-accessedAt': string };
  };
}

export const dbPromise = openDB<ClinovaDB>('clinova-store', 1, {
  upgrade(db) {
    const chatStore = db.createObjectStore('chatSessions', { keyPath: 'id' });
    chatStore.createIndex('by-updatedAt', 'updatedAt');

    const monoStore = db.createObjectStore('monographs', { keyPath: 'key' });
    monoStore.createIndex('by-accessedAt', 'accessedAt');
  },
});

export async function saveChatSession(session: ChatSession) {
  const db = await dbPromise;
  await db.put('chatSessions', session);
}

export async function getAllChatSessions(): Promise<ChatSession[]> {
  const db = await dbPromise;
  return db.getAllFromIndex('chatSessions', 'by-updatedAt');
}

export async function renameChatSession(id: string, newTitle: string) {
  const db = await dbPromise;
  const session = await db.get('chatSessions', id);
  if (session) {
    session.title = newTitle;
    session.updatedAt = new Date().toISOString();
    session.synced = false;
    await db.put('chatSessions', session);
  }
}

export async function deleteChatSession(id: string) {
  const db = await dbPromise;
  await db.delete('chatSessions', id);
}

export async function saveMonograph(entry: MonographCacheEntry) {
  const db = await dbPromise;
  await db.put('monographs', entry);
}

export async function getMonograph(key: string): Promise<MonographCacheEntry | undefined> {
  const db = await dbPromise;
  return db.get('monographs', key.toLowerCase());
}

export async function pinMonograph(key: string) {
  const db = await dbPromise;
  const entry = await db.get('monographs', key.toLowerCase());
  if (entry) {
    entry.savedForOffline = true;
    await db.put('monographs', entry);
  }
}

export async function cleanupOldCache(maxEntries = 200) {
  const db = await dbPromise;
  const all = await db.getAllFromIndex('monographs', 'by-accessedAt');
  const evictable = all.filter((m) => !m.savedForOffline);

  if (evictable.length > maxEntries) {
    const toRemove = evictable
      .sort((a, b) => new Date(a.accessedAt).getTime() - new Date(b.accessedAt).getTime())
      .slice(0, evictable.length - maxEntries);

    for (const entry of toRemove) {
      await db.delete('monographs', entry.key);
    }
  }
}
