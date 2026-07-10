// ================================================================
// Citation Skill — automatically provides references and builds
// citations in APA / Vancouver / MLA / Harvard. Distinguishes user
// resources from external references.
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillReference } from './types';
import { skillRegistry } from './registry';
import { searchLibrary } from '../data/onlineLibraryData';

const STYLES = ['apa', 'vancouver', 'mla', 'harvard'];

function formatCitation(style: string, ref: { title: string; authors?: string; year?: number }): string {
  const a = ref.authors || 'Unknown';
  const y = ref.year ?? 'n.d.';
  switch (style) {
    case 'vancouver':
      return `${a}. ${ref.title}. ${y}.`;
    case 'mla':
      return `${a}. "${ref.title}." ${y}.`;
    case 'harvard':
      return `${a} (${y}) ${ref.title}.`;
    case 'apa':
    default:
      return `${a} (${y}). ${ref.title}.`;
  }
}

export const citationSkill: Skill = {
  definition: {
    id: 'citation',
    name: 'Citation',
    description: 'Generates references in APA, Vancouver, MLA, Harvard and verifies sources',
    category: 'knowledge',
    version: '1.0.0',
    priority: 60,
    cacheable: true,
    intents: ['cite', 'citation', 'reference', 'apa', 'vancouver', 'harvard', 'mla', 'reference manager'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('cit') || q.includes('referenc') || STYLES.some((s) => q.includes(s));
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const q = context.query.toLowerCase();
    const style = STYLES.find((s) => q.includes(s)) || 'apa';

    const lib = searchLibrary(context.query, {}).slice(0, 3);
    const references: SkillReference[] = lib.map((r) => ({
      source: 'library',
      title: r.title,
      authors: r.authors,
      url: r.publisherUrl,
      citation: formatCitation(style, { title: r.title, authors: r.authors }),
    }));

    const content = `**References (${style.toUpperCase()})**\n\n${
      references.length
        ? references.map((r) => `- ${r.citation}`).join('\n')
        : 'No matching library references found. Cite primary guidelines (WHO, KDI, national formulary) where possible.'
    }`;

    return {
      skillId: 'citation',
      content,
      references,
      confidence: 0.8,
      processingTimeMs: Date.now() - start,
      cacheable: true,
      cacheKey: `citation_${style}_${context.query.substring(0, 80)}`,
    };
  },
};

skillRegistry.register(citationSkill);
