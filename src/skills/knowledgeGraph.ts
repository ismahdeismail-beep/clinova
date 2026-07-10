// ================================================================
// Knowledge Graph Skill — maintains relationships between subjects,
// units, topics, diseases, medicines, cases, guidelines, notes and
// assessments. Surfaces the neighbourhood of a concept.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { getUnitsByDisease, DISEASES, ALL_UNITS } from '../data/curriculum';

export const knowledgeGraphSkill: Skill = {
  definition: {
    id: 'knowledge_graph',
    name: 'Knowledge Graph',
    description: 'Discovers and maintains relationships across subjects, units, diseases, drugs, cases and guidelines',
    category: 'knowledge',
    version: '1.0.0',
    priority: 38,
    cacheable: true,
    intents: ['knowledge graph', 'related', 'connected', 'neighbourhood', 'what links to'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('knowledge graph') || q.includes('what links') || q.includes('connected to') || q.includes('neighbourhood');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const disease = context.educationalContext.disease;
    const drug = context.educationalContext.drug;

    const lines: string[] = ['**Knowledge graph connections**'];
    if (disease && DISEASES[disease]) {
      const units = getUnitsByDisease(disease);
      lines.push(`Disease: ${DISEASES[disease].name}`);
      lines.push(`Linked units (${units.length}): ${units.map((u) => `${u.subject} / ${u.title}`).join('; ')}`);
      lines.push(`Learning objectives: ${units.flatMap((u) => u.learningObjectives.map((lo) => lo.statement)).slice(0, 5).join(' | ')}`);
    }
    if (drug) lines.push(`Drug: ${drug} — see Drug Information and related disease units.`);
    lines.push(`Total curriculum units indexed: ${ALL_UNITS.length}.`);

    return {
      skillId: 'knowledge_graph',
      content: lines.join('\n'),
      confidence: 0.75,
      processingTimeMs: Date.now() - start,
      cacheable: true,
      cacheKey: `kg_${disease || drug || context.query.substring(0, 60)}`,
    };
  },
};

skillRegistry.register(knowledgeGraphSkill);
