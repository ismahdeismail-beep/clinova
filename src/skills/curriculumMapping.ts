// ================================================================
// Curriculum Mapping Skill — maps any resource to subject, unit,
// topic, subtopic and learning objectives using the canonical
// curriculum model.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { ALL_UNITS, getUnitsByDisease } from '../data/curriculum';

export const curriculumMappingSkill: Skill = {
  definition: {
    id: 'curriculum_mapping',
    name: 'Curriculum Mapping',
    description: 'Maps a resource to subject, unit, topic, subtopic and learning objectives',
    category: 'knowledge',
    version: '1.0.0',
    priority: 56,
    cacheable: true,
    intents: ['map to curriculum', 'which unit', 'curriculum', 'topic', 'subtopic', 'where does this belong'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('curriculum') || q.includes('which unit') || q.includes('map to') || q.includes('subtopic');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const disease = context.educationalContext.disease;
    const linkedUnits = disease ? getUnitsByDisease(disease).map((u) => u.id) : [];
    const unitList = ALL_UNITS.slice(0, 40).map((u) => `${u.id} (${u.subject})`).join(', ');

    const content = `**Curriculum mapping context**
Detected disease: ${disease || 'n/a'}
Units already linked to this disease: ${linkedUnits.join(', ') || 'none'}
Available units (sample): ${unitList}`;

    try {
      const response = await generateContentWithFallback(
        {
          contents: `${context.query}\n\nAvailable curriculum units:\n${unitList}`,
          systemInstruction: `You are a curriculum mapper. Map the resource to the most appropriate subject, unit, topic and learning objectives. Use the provided unit list where possible. Output a structured mapping.`,
          config: { temperature: 0.2, maxOutputTokens: 1024 },
        },
        undefined,
        'Curriculum Mapping',
      );

      return {
        skillId: 'curriculum_mapping',
        content: `${content}\n\n${response.text}`,
        confidence: 0.82,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `coremap_${context.query.substring(0, 80)}`,
      };
    } catch {
      return { skillId: 'curriculum_mapping', content, confidence: 0.6, processingTimeMs: Date.now() - start, cacheable: true };
    }
  },
};

skillRegistry.register(curriculumMappingSkill);
