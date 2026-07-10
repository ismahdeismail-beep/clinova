// ================================================================
// Disease Knowledge Skill — structured disease information:
// definition, epidemiology, pathophysiology, presentation,
// diagnosis, investigations, management, monitoring, prevention.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const diseaseKnowledgeSkill: Skill = {
  definition: {
    id: 'disease_knowledge',
    name: 'Disease Knowledge',
    description: 'Provides structured disease information: definition, epidemiology, pathophysiology, diagnosis, management, prevention',
    category: 'knowledge',
    version: '1.0.0',
    priority: 72,
    cacheable: true,
    intents: ['disease', 'pathophysiology', 'causes of', 'symptoms of', 'diagnosis of', 'management of'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    return !!context.educationalContext.disease || /disease|disorder|syndrome|pathophysiology/i.test(context.query);
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const disease = context.educationalContext.disease || context.query;

    try {
      const systemInstruction = `You are a clinical pharmacy educator. Provide structured disease information for "${disease}" covering:
1. Definition
2. Epidemiology
3. Aetiology & Pathophysiology
4. Clinical Presentation
5. Diagnosis & Differential Diagnosis
6. Investigations
7. Management (pharmacological & non-pharmacological)
8. Monitoring
9. Prevention & Prognosis
Use clear headings and bullet points. Reference Kenyan clinical context where relevant.`;

      const response = await generateContentWithFallback(
        { contents: `Disease overview: ${disease}`, systemInstruction, config: { temperature: 0.2, maxOutputTokens: 2048 } },
        undefined,
        'Disease Knowledge',
      );

      return {
        skillId: 'disease_knowledge',
        content: response.text,
        confidence: 0.88,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `disease_${disease.toLowerCase().replace(/\s+/g, '_')}`,
      };
    } catch (error: any) {
      return { skillId: 'disease_knowledge', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(diseaseKnowledgeSkill);
