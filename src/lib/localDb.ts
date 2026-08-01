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

export interface CachedDrugImage {
  id: string;
  drugId: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  source: string;
  license: string;
  author: string;
  pageUrl: string;
  thumbnailUrl: string;
  imageUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbBlob?: Blob;
  fullBlob?: Blob;
  pinned: boolean;
  cachedAt: string;
}

export interface DrugImageRecord {
  id: string;
  drug_id: string;
  generic_name: string;
  dosage_form: string;
  strength: string;
  source: string;
  license: string;
  author: string;
  page_url: string;
  thumbnail_url: string;
  image_url: string;
  large_url: string;
  medium_url: string;
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
  drugImages: {
    key: string;
    value: CachedDrugImage;
    indexes: { 'by-drugId': string; 'by-genericName': string; 'by-cachedAt': string };
  };
}

export const dbPromise = openDB<ClinovaDB>('clinova-store', 2, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      const chatStore = db.createObjectStore('chatSessions', { keyPath: 'id' });
      chatStore.createIndex('by-updatedAt', 'updatedAt');

      const monoStore = db.createObjectStore('monographs', { keyPath: 'key' });
      monoStore.createIndex('by-accessedAt', 'accessedAt');
    }
    if (oldVersion < 2) {
      const imgStore = db.createObjectStore('drugImages', { keyPath: 'id' });
      imgStore.createIndex('by-drugId', 'drugId');
      imgStore.createIndex('by-genericName', 'genericName');
      imgStore.createIndex('by-cachedAt', 'cachedAt');
    }
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

// ---------------------------------------------------------------------------
// Drug image offline cache
// ---------------------------------------------------------------------------

function toCachedDrugImage(record: DrugImageRecord, pin: boolean): CachedDrugImage {
  return {
    id: record.id,
    drugId: record.drug_id,
    genericName: record.generic_name || '',
    dosageForm: record.dosage_form || '',
    strength: record.strength || '',
    source: record.source || '',
    license: record.license || '',
    author: record.author || '',
    pageUrl: record.page_url || '',
    thumbnailUrl: record.thumbnail_url || '',
    imageUrl: record.image_url || '',
    largeUrl: record.large_url || '',
    mediumUrl: record.medium_url || '',
    pinned: pin,
    cachedAt: new Date().toISOString(),
  };
}

async function downloadBlob(url: string): Promise<Blob | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return null;
    return await res.blob();
  } catch {
    return null;
  }
}

async function saveImageEntry(entry: CachedDrugImage, downloadFull: boolean) {
  const db = await dbPromise;
  const existing = await db.get('drugImages', entry.id);
  if (existing) {
    entry.thumbBlob = existing.thumbBlob;
    entry.fullBlob = existing.fullBlob;
    entry.pinned = existing.pinned || entry.pinned;
  }
  if (!entry.thumbBlob) {
    entry.thumbBlob = (await downloadBlob(entry.thumbnailUrl || entry.imageUrl)) || undefined;
  }
  if (downloadFull && !entry.fullBlob) {
    entry.fullBlob =
      (await downloadBlob(entry.largeUrl || entry.mediumUrl || entry.imageUrl)) || undefined;
  }
  await db.put('drugImages', entry);
}

/** Cache viewed images (thumbnails) so they render when offline. Fire-and-forget friendly. */
export async function cacheDrugImages(drugId: string, records: DrugImageRecord[], pin = false) {
  if (!drugId || !records?.length) return;
  for (const record of records) {
    try {
      await saveImageEntry(toCachedDrugImage(record, pin), false);
    } catch (err) {
      console.warn('Failed to cache drug image', record.id, err);
    }
  }
}

/** Pin a drug's images: force-download thumbnails + full images and protect from eviction. */
export async function pinDrugImages(drugId: string, records: DrugImageRecord[]) {
  if (!drugId || !records?.length) return;
  for (const record of records) {
    try {
      await saveImageEntry(toCachedDrugImage(record, true), true);
    } catch (err) {
      console.warn('Failed to pin drug image', record.id, err);
    }
  }
}

export async function getCachedDrugImages(drugId: string): Promise<CachedDrugImage[]> {
  const db = await dbPromise;
  return (await db.getAllFromIndex('drugImages', 'by-drugId', drugId)).sort((a, b) =>
    new Date(b.cachedAt).getTime() - new Date(a.cachedAt).getTime(),
  );
}

export async function getCachedDrugImagesByGeneric(genericName: string): Promise<CachedDrugImage[]> {
  if (!genericName) return [];
  const db = await dbPromise;
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
  const target = norm(genericName);
  const all = await db.getAll('drugImages');
  return all
    .filter((img) => norm(img.genericName) === target || norm(img.genericName).includes(target))
    .sort((a, b) => new Date(b.cachedAt).getTime() - new Date(a.cachedAt).getTime());
}

export async function cleanupImageCache(maxEntries = 400) {
  const db = await dbPromise;
  const all = await db.getAllFromIndex('drugImages', 'by-cachedAt');
  const evictable = all.filter((img) => !img.pinned);

  if (evictable.length > maxEntries) {
    const toRemove = evictable
      .sort((a, b) => new Date(a.cachedAt).getTime() - new Date(b.cachedAt).getTime())
      .slice(0, evictable.length - maxEntries);

    for (const entry of toRemove) {
      await db.delete('drugImages', entry.id);
    }
  }
}
