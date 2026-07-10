// ================================================================
// Caching Skill — reduces repeated processing by caching AI
// summaries, search results, metadata and topic relationships.
// Invalidates caches when underlying content changes.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';

// Simple in-memory cache used by the skills layer.
const cache = new Map<string, { value: any; expires: number }>();

export function getCached<T>(key: string): T | undefined {
  const hit = cache.get(key);
  if (!hit) return undefined;
  if (Date.now() > hit.expires) {
    cache.delete(key);
    return undefined;
  }
  return hit.value as T;
}

export function setCached(key: string, value: any, ttlMs = 3_600_000): void {
  cache.set(key, { value, expires: Date.now() + ttlMs });
}

export const cachingSkill: Skill = {
  definition: {
    id: 'caching',
    name: 'Caching',
    description: 'Caches AI summaries, search results, metadata and relationships; invalidates on change',
    category: 'infrastructure',
    version: '1.0.0',
    priority: 30,
    cacheable: false,
    intents: ['cache', 'clear cache', 'invalidate'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('clear cache') || q.includes('invalidate cache');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const cleared = cache.size;
    cache.clear();
    return {
      skillId: 'caching',
      content: `Cache ${cleared > 0 ? `cleared (${cleared} entries)` : 'was already empty'}.`,
      confidence: 0.9,
      processingTimeMs: Date.now() - start,
      cacheable: false,
    };
  },
};

skillRegistry.register(cachingSkill);
