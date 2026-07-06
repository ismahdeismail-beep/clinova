import { dbPromise, MonographCacheEntry } from './localDb';

const CACHE_TTL_DAYS = 30;

export async function getMonographCached(query: string, categoryName?: string): Promise<MonographCacheEntry> {
  const key = (query || categoryName || '').trim().toLowerCase();
  
  if (!key) {
    throw new Error("Invalid query");
  }

  const db = await dbPromise;
  const cached = await db.get('monographs', key);

  if (cached) {
    const ageMs = Date.now() - new Date(cached.accessedAt).getTime();
    const isStale = ageMs > CACHE_TTL_DAYS * 24 * 60 * 60 * 1000;
    if (!isStale) {
      return cached;
    }
  }

  const res = await fetch('/api/gemini/search-drug', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      drugName: query || undefined,
      category: categoryName || undefined,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to retrieve drug monograph');
  }

  const data = await res.json();
  const entry: MonographCacheEntry = {
    key,
    content: data.text,
    source: 'ai-generated',
    accessedAt: new Date().toISOString(),
    savedForOffline: cached?.savedForOffline ?? false,
  };
  await db.put('monographs', entry);
  return entry;
}

export { pinMonograph } from './localDb';

export async function searchCachedMonographs(query: string): Promise<MonographCacheEntry[]> {
  const db = await dbPromise;
  const all = await db.getAll('monographs');
  const q = query.trim().toLowerCase();

  return all.filter((m) => 
    m.key.includes(q) || m.content.toLowerCase().includes(q)
  );
}
