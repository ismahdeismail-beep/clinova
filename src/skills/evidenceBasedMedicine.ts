// ================================================================
// Evidence-Based Medicine Skill — interprets trials, systematic
// reviews, meta-analyses and guidelines; explains strength of
// evidence and ranks sources.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const evidenceBasedMedicineSkill: Skill = {
  definition: {
    id: 'evidence_based_medicine',
    name: 'Evidence-Based Medicine',
    description: 'Interprets trials, reviews and guidelines; explains quality and strength of evidence',
    category: 'reasoning',
    version: '1.0.0',
    priority: 74,
    cacheable: true,
    intents: ['evidence', 'trial', 'guideline', 'meta-analysis', 'systematic review', 'grade', 'recommendation'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('evidence') || q.includes('trial') || q.includes('guideline') || q.includes('meta-analysis') || q.includes('review');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are an evidence-based medicine tutor. Evaluate the requested topic:
1. Summarize the best available evidence (RCTs, systematic reviews, guidelines).
2. State the strength/quality of evidence (e.g., GRADE).
3. Note any conflicting recommendations across guidelines.
4. Give a pragmatic, learner-friendly conclusion.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.2, maxOutputTokens: 1536 } },
        undefined,
        'Evidence-Based Medicine',
      );

      return {
        skillId: 'evidence_based_medicine',
        content: response.text,
        confidence: 0.85,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `ebm_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return { skillId: 'evidence_based_medicine', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(evidenceBasedMedicineSkill);
