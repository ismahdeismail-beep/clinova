// ================================================================
// Assessment Skill — generates MCQs, SBAs, SAQs, EMQs, case-based
// questions and revision quizzes aligned to learning objectives.
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const assessmentSkill: Skill = {
  definition: {
    id: 'assessment',
    name: 'Assessment Generator',
    description: 'Generates MCQs, SBAs, SAQs, EMQs and case-based questions aligned to learning objectives',
    category: 'assessment',
    version: '1.0.0',
    priority: 68,
    cacheable: true,
    intents: ['mcq', 'quiz', 'question', 'sba', 'saq', 'exam question', 'test me', 'practice question'],
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return q.includes('mcq') || q.includes('quiz') || q.includes('question') || q.includes('exam') || q.includes('test me');
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    try {
      const systemInstruction = `You are a pharmacy board-exam question writer (Kenya context). Generate 3 high-quality assessment items for the requested topic:
- Mix of MCQ (1 best answer), SBA, and a short-answer (SAQ) question.
- Include answer keys, detailed explanations, and a clinical pearl for each.
- Align items to typical curriculum learning objectives.
Format clearly with numbered questions.`;

      const response = await generateContentWithFallback(
        { contents: context.query, systemInstruction, config: { temperature: 0.5, maxOutputTokens: 2048 } },
        undefined,
        'Assessment',
      );

      return {
        skillId: 'assessment',
        content: response.text,
        confidence: 0.83,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `assessment_${context.query.substring(0, 120)}`,
      };
    } catch (error: any) {
      return { skillId: 'assessment', error: error.message, confidence: 0, processingTimeMs: Date.now() - start };
    }
  },
};

skillRegistry.register(assessmentSkill);
