// ================================================================
// Clinical Reasoning Skill — differential diagnosis, therapeutic
// decision-making, pharmaceutical care planning, and evidence
// interpretation
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

export const clinicalReasoningSkill: Skill = {
  definition: {
    id: 'clinical_reasoning',
    name: 'Clinical Reasoning',
    description: 'Performs differential diagnosis, therapeutic decision-making, and pharmaceutical care planning',
    category: 'reasoning',
    version: '1.0.0',
    priority: 85,
    cacheable: false,
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    return (
      context.educationalContext.queryType === 'clinical_case' ||
      q.includes('differential') ||
      q.includes('diagnosis') ||
      q.includes('treatment plan') ||
      q.includes('management of') ||
      q.includes('care plan') ||
      q.includes('what would you do')
    );
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();

    try {
      const systemInstruction = `You are an expert clinical pharmacist and therapeutics educator. For this clinical scenario, provide:\n
1. **Problem Identification**: List active medical problems and drug therapy problems
2. **Therapeutic Goals**: Define clear, measurable goals
3. **Management Plan**: Evidence-based pharmacological and non-pharmacological recommendations
4. **Monitoring Parameters**: What to monitor and when
5. **Patient Counselling Points**: Key counselling messages
6. **Clinical Pearls**: High-yield teaching points

Use Kenyan clinical practice context where relevant (available drugs, local guidelines, common clinical scenarios).`;

      const response = await generateContentWithFallback(
        {
          contents: context.query,
          systemInstruction,
          config: { temperature: 0.3, maxOutputTokens: 2048 },
        },
        undefined,
        'Clinical Reasoning Skill'
      );

      return {
        skillId: 'clinical_reasoning',
        content: response.text,
        confidence: 0.85,
        processingTimeMs: Date.now() - start,
        cacheable: false,
      };
    } catch (error: any) {
      return {
        skillId: 'clinical_reasoning',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      };
    }
  },
};

skillRegistry.register(clinicalReasoningSkill);
