// ================================================================
// Online Library Skill — understands and recommends resources from
// the integrated Online Library (textbooks, OERs, companions).
// Does not reproduce copyrighted material.
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { searchLibrary } from '../data/onlineLibraryData';

export const onlineLibrarySkill: Skill = {
  definition: {
    id: 'online_library',
    name: 'Online Library',
    description: 'Recommends textbooks, OERs and companion resources from the integrated library',
    category: 'retrieval',
    version: '1.0.0',
    priority: 44,
    cacheable: true,
    intents: ['library', 'textbook', 'book', 'oer', 'recommend a book', 'read more'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('library') || q.includes('textbook') || q.includes('book') || q.includes('oer') || q.includes('recommend a');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const results = searchLibrary(context.query, {}).slice(0, 5);

    const recommendations: SkillRecommendation[] = results.map((r) => ({
      type: 'book',
      title: r.title,
      resourceId: r.id,
      relevance: r.isFree ? 0.95 : 0.7,
      reason: r.isFree ? 'Free/open-access resource' : `Published resource (${r.publisher})`,
      url: r.publisherUrl,
    }));

    const content = `**Recommended library resources**\n\n${recommendations
      .map((r, i) => `${i + 1}. ${r.title} — ${r.reason}`)
      .join('\n')}`;

    return {
      skillId: 'online_library',
      content,
      recommendations,
      confidence: 0.82,
      processingTimeMs: Date.now() - start,
      cacheable: true,
      cacheKey: `library_${context.query.substring(0, 80)}`,
    };
  },
};

skillRegistry.register(onlineLibrarySkill);
