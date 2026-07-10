// ================================================================
// Academic Knowledge Skill — understands educational content and
// answers like an experienced educator across all pharmacy/medical
// science disciplines
// ================================================================

import type { Skill, SkillContext, SkillResponse } from './types';
import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';

const DISCIPLINE_PROMPTS: Record<string, string> = {
  Pharmacology: 'You are an expert pharmacology educator. Explain drug mechanisms, classifications, and therapeutic applications clearly.',
  'Clinical Pharmacy': 'You are an expert clinical pharmacy educator. Focus on patient-centered pharmacotherapy, clinical decision-making, and evidence-based medicine.',
  Therapeutics: 'You are an expert therapeutics educator. Explain treatment algorithms, drug selection, monitoring parameters, and therapeutic outcomes.',
  Physiology: 'You are an expert physiology educator. Explain physiological mechanisms in an integrated, easy-to-understand manner.',
  Pathology: 'You are an expert pathology educator. Explain disease mechanisms, histopathology, and clinical-pathological correlations.',
  Pharmaceutics: 'You are an expert pharmaceutics educator. Explain dosage form design, drug delivery systems, and formulation science.',
  'Medicinal Chemistry': 'You are an expert medicinal chemistry educator. Explain structure-activity relationships, drug design principles, and chemical foundations of drug action.',
  Microbiology: 'You are an expert microbiology educator. Explain microbial pathogenesis, antimicrobial mechanisms, and laboratory diagnosis.',
  Immunology: 'You are an expert immunology educator. Explain immune mechanisms, immunological disorders, and immunotherapy.',
  'Public Health': 'You are an expert public health educator. Explain epidemiological concepts, health systems, and preventive medicine.',
  default: 'You are Clinova\'s academic knowledge assistant — an experienced pharmacy and medical educator. Provide clear, well-structured, evidence-based explanations tailored to the learner\'s level.',
};

export const academicKnowledgeSkill: Skill = {
  definition: {
    id: 'academic_knowledge',
    name: 'Academic Knowledge',
    description: 'Understands and explains pharmacy, medicine, and clinical science concepts like an experienced educator',
    category: 'knowledge',
    version: '1.0.0',
    priority: 80,
    cacheable: true,
  },

  async canHandle(context: SkillContext): Promise<boolean> {
    const q = context.query.toLowerCase();
    // Handle concept explanations, definitions, "what is" questions
    return (
      q.startsWith('what is') ||
      q.startsWith('explain') ||
      q.startsWith('define') ||
      q.startsWith('describe') ||
      q.startsWith('how does') ||
      q.startsWith('what are') ||
      context.educationalContext.queryType === 'concept_explanation'
    );
  },

  async execute(context: SkillContext): Promise<SkillResponse> {
    const start = Date.now();
    const subject = context.educationalContext.subject || 'General';
    const prompt = DISCIPLINE_PROMPTS[subject] || DISCIPLINE_PROMPTS.default;

    try {
      const systemInstruction = `${prompt}\n\nThe learner is at ${context.educationalContext.educationalLevel} level. Provide a comprehensive yet accessible explanation. Include:\n1. Core concepts & definitions\n2. Clinical relevance\n3. Key takeaways for exam preparation\n4. Where applicable, relate to Kenyan clinical practice context.`;

      const response = await generateContentWithFallback(
        {
          contents: context.query,
          systemInstruction,
          config: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        },
        undefined,
        'Academic Knowledge Skill'
      );

      return {
        skillId: 'academic_knowledge',
        content: response.text,
        confidence: 0.9,
        processingTimeMs: Date.now() - start,
        cacheable: true,
        cacheKey: `academic_knowledge_${subject}_${context.query.substring(0, 100)}`,
      };
    } catch (error: any) {
      return {
        skillId: 'academic_knowledge',
        error: error.message,
        confidence: 0,
        processingTimeMs: Date.now() - start,
      };
    }
  },
};

// Auto-register
skillRegistry.register(academicKnowledgeSkill);
