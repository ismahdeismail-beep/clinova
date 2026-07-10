// ================================================================
// Concept Mapping Skill — builds relationship maps between diseases,
// drugs, body systems, guidelines and clinical cases.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const conceptMappingSkill: Skill = {
  definition: {
    id: 'concept_mapping',
    name: 'Concept Mapping',
    description: 'Builds relationship maps between diseases, drugs, body systems, guidelines and cases',
    category: 'knowledge',
    version: '1.0.0',
    priority: 52,
    cacheable: true,
    intents: ['concept map', 'relationship', 'how does x relate', 'connect', 'map of'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('concept map') || q.includes('relate') || q.includes('relationship') || q.includes('connect');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are a concept-mapping tutor. Build a clear relationship map for the requested topic linking diseases, drugs, body systems, guidelines and clinical cases. Use a simple nested bullet / tree structure in markdown.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.3, maxOutputTokens: 1536 } },
        undefined,
        'Concept Mapping',
      );

      return {
        skillId: 'concept_mapping',
        content: response.text,
        confidence: 0.82,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `conceptmap_${context.query.substring(0, 80)}`,
      };
    } catch (error: any) {
      return { skillId: 'concept_mapping', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(conceptMappingSkill);
