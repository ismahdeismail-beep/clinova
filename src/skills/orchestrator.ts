// ================================================================
// Clinova AI Skill Orchestrator
// Automatically selects and combines skills based on user query
// ================================================================

import { skillRegistry } from './registry';
import { generateContentWithFallback } from '../server/aiRouter';
import { searchLibrary } from '../data/onlineLibraryData';
import type {
  Skill,
  SkillContext,
  SkillResponse,
  SkillId,
  OrchestrationPlan,
  OrchestrationResult,
  SkillRecommendation,
  SkillReference,
} from './types';
import type { EducationalContext } from '../engine/knowledgeEngine';

// ================================================================
// Intent Detection
// ================================================================

function detectIntent(query: string, context: EducationalContext): {
  intent: string;
  requiredSkills: SkillId[];
} {
  const q = query.toLowerCase();

  // Concept explanation
  if (q.startsWith('what is') || q.startsWith('explain') || q.startsWith('define') || context.queryType === 'concept_explanation') {
    return {
      intent: 'concept_explanation',
      requiredSkills: ['academic_knowledge', 'knowledge_retrieval'],
    };
  }

  // Clinical case / reasoning
  if (context.queryType === 'clinical_case' || q.includes('diagnosis') || q.includes('management of') || q.includes('treatment') || q.includes('care plan')) {
    return {
      intent: 'clinical_reasoning',
      requiredSkills: ['clinical_reasoning', 'knowledge_retrieval', 'drug_information', 'clinical_cases'],
    };
  }

  // Drug information
  if (context.queryType === 'drug_info' || context.drug || q.includes('dosage') || q.includes('side effect') || q.includes('interaction')) {
    return {
      intent: 'drug_information',
      requiredSkills: ['drug_information', 'evidence_based_medicine', 'online_library'],
    };
  }

  // Study material / revision
  if (context.queryType === 'study_material' || q.includes('study') || q.includes('revise') || q.includes('notes') || q.includes('flashcard') || q.includes('summary')) {
    return {
      intent: 'study_material',
      requiredSkills: ['academic_knowledge', 'summarization', 'knowledge_retrieval'],
    };
  }

  // Assessment / examination
  if (q.includes('mcq') || q.includes('question') || q.includes('quiz') || q.includes('exam') || q.includes('viva') || q.includes('osce') || q.includes('test me')) {
    return {
      intent: 'assessment',
      requiredSkills: ['assessment', 'oral_practice', 'knowledge_retrieval'],
    };
  }

  // Default: comprehensive response
  return {
    intent: 'general',
    requiredSkills: ['academic_knowledge', 'knowledge_retrieval', 'online_library'],
  };
}

/**
 * Auto-select every registered skill whose declared `intents` keywords
 * appear in the query. This makes the catalogue self-extending: a new
 * skill that exports intents is immediately picked up by the orchestrator
 * without editing detectIntent.
 */
function selectSkillsByIntents(query: string, context: EducationalContext): SkillId[] {
  const q = query.toLowerCase();
  const selected: SkillId[] = [];

  for (const def of skillRegistry.getDefinitions()) {
    const intents = def.intents ?? [];
    if (intents.some((kw) => q.includes(kw.toLowerCase()))) {
      selected.push(def.id);
    }
  }

  // Also include the disease/drug already resolved by the knowledge engine.
  if (context.disease) selected.push('disease_knowledge');
  if (context.drug) selected.push('drug_information');

  return selected;
}

// ================================================================
// Orchestrator — Main execution
// ================================================================

export async function orchestrateSkills(
  query: string,
  context: EducationalContext,
  options?: {
    chatHistory?: Array<{ role: string; content: string }>;
    attachedResources?: string[];
    userId?: string;
    preferences?: Record<string, any>;
  }
): Promise<OrchestrationResult> {
  const overallStart = Date.now();

  // 1. Detect intent and plan
  const { intent, requiredSkills } = detectIntent(query, context);

  // Auto-wire any registered skill that declared matching intent keywords.
  const introspected = selectSkillsByIntents(query, context);

  const selectedSkills = Array.from(new Set([...requiredSkills, ...introspected]));

  const plan: OrchestrationPlan = {
    query,
    detectedIntent: intent,
    selectedSkills,
    executionOrder: selectedSkills,
    parallelGroups: [selectedSkills],
    expectedResponseType: intent === 'clinical_reasoning' ? 'clinical_case'
      : intent === 'drug_information' ? 'drug_info'
      : intent === 'concept_explanation' ? 'explanation'
      : 'general',
  };

  // 2. Build skill context
  const skillContext: SkillContext = {
    educationalContext: context,
    query,
    chatHistory: options?.chatHistory,
    attachedResources: options?.attachedResources,
    learnerProfile: options?.userId ? { userId: options.userId, level: context.educationalLevel as any } : undefined,
    preferences: options?.preferences,
  };

  // 3. Execute skills in parallel groups
  const skillResults = new Map<SkillId, SkillResponse>();
  const allRecommendations: SkillRecommendation[] = [];
  const allReferences: SkillReference[] = [];

  for (const group of plan.parallelGroups) {
    const results = await Promise.allSettled(
      group.map(async (skillId) => {
        const skill = skillRegistry.get(skillId);
        if (!skill) return null;
        return skill.execute(skillContext);
      })
    );

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const skillId = group[i];
      if (result.status === 'fulfilled' && result.value) {
        skillResults.set(skillId, result.value);
        if (result.value.recommendations) allRecommendations.push(...result.value.recommendations);
        if (result.value.references) allReferences.push(...result.value.references);
      } else if (result.status === 'rejected') {
        skillResults.set(skillId, {
          skillId,
          error: result.reason?.message || 'Unknown error',
          confidence: 0,
          processingTimeMs: 0,
        });
      }
    }
  }

  // 4. Consolidate content from all skills
  const consolidatedParts: string[] = [];
  for (const [, result] of skillResults) {
    if (result.content) consolidatedParts.push(result.content);
  }

  let consolidatedContent: string;

  if (consolidatedParts.length > 1) {
    // Use AI to merge multiple skill outputs
    try {
      const mergePrompt = `Consolidate the following educational responses about "${query}" into a single, coherent, well-organized response. Remove redundancy while preserving all unique information. Maintain a professional educational tone.\n\n---\n${consolidatedParts.join('\n\n---\n')}`;
      const mergeResponse = await generateContentWithFallback(
        { contents: mergePrompt, config: { temperature: 0.2 } },
        undefined,
        'Skill Orchestrator Merge'
      );
      consolidatedContent = mergeResponse.text;
    } catch {
      consolidatedContent = consolidatedParts.join('\n\n');
    }
  } else if (consolidatedParts.length === 1) {
    consolidatedContent = consolidatedParts[0];
  } else {
    consolidatedContent = 'I was unable to find sufficient information to answer your query. Please try rephrasing or providing more context.';
  }

  return {
    query,
    plan,
    skillResults,
    consolidatedContent,
    recommendations: deduplicateRecommendations(allRecommendations),
    references: deduplicateReferences(allReferences),
    processingTimeMs: Date.now() - overallStart,
  };
}

// ================================================================
// Deduplication helpers
// ================================================================

function deduplicateRecommendations(items: SkillRecommendation[]): SkillRecommendation[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const key = item.resourceId || item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
}

function deduplicateReferences(items: SkillReference[]): SkillReference[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const key = item.title + (item.authors || '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}
