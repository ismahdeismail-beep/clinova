// ================================================================
// Clinical Cases Skill — case analysis, original case generation,
// pharmaceutical care, follow-up questions, and case discussions.
// Every generated case is linked to related learning resources.
// ================================================================

import type { Skill, SkillContext, SkillResponse, SkillRecommendation } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { INITIAL_CASES } from '../data/clinicalCasesData';

export const clinicalCasesSkill: Skill = {
  definition: {
    id: 'clinical_cases',
    name: 'Clinical Cases',
    description: 'Analyzes and generates original clinical cases, supports pharmaceutical care and case discussions',
    category: 'reasoning',
    version: '1.0.0',
    priority: 78,
    cacheable: false,
    intents: ['case', 'patient scenario', 'generate a case', 'vignette', 'clinical scenario'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('case') || q.includes('scenario') || q.includes('vignette') || q.includes('patient');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const isGeneration = /generate|create|write|new case/i.test(context.query);

    try {
      const systemInstruction = isGeneration
        ? `You are a clinical pharmacy case author. Generate ONE original, realistic clinical case based on the user's request. Structure it with: demographics, chief complaint, HPI, PMH, medication history, allergies, exam, vitals, labs, diagnosis, differential diagnosis, drug therapy problems, therapeutic goals, pharmacological management, non-pharmacological management, monitoring, counselling, follow-up, and key learning points. End with 3 follow-up questions.`
        : `You are a clinical pharmacy tutor. Analyze the clinical case/scenario provided. Provide: problem identification, drug therapy problems, therapeutic goals, management plan, monitoring, counselling, and clinical pearls.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.4, maxOutputTokens: 2048 } },
        undefined,
        'Clinical Cases',
      );

      // Link to related existing cases by disease mention.
      const related = INITIAL_CASES.filter((c) =>
        context.query.toLowerCase().includes((c.disease || '').toLowerCase()) && c.disease,
      ).slice(0, 3);
      const recommendations: SkillRecommendation[] = related.map((c) => ({
        type: 'clinical_case',
        title: c.title,
        resourceId: c.id,
        relevance: 0.8,
        reason: `Related existing case on ${c.disease}`,
      }));

      return {
        skillId: 'clinical_cases',
        content: response.text,
        recommendations,
        confidence: 0.84,
        processingTimeMs: Date.now() - start,
        cacheable: false,
      };
    } catch (error: any) {
      return { skillId: 'clinical_cases', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(clinicalCasesSkill);
