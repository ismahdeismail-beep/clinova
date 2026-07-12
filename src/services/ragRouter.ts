import { KnowledgeEngine, type KnowledgeEngineResult, type QueryIntent } from '../engine/knowledgeEngine.service';

export type IntentCategory = 'drug' | 'drug_interaction' | 'guideline' | 'disease' | 'case' | 'research' | 'general';

export interface RoutedQuery {
  intent: IntentCategory;
  targetAgent: string;
  engineResult: KnowledgeEngineResult;
  requiresRag: boolean;
}

function mapIntent(intent: QueryIntent): IntentCategory {
  switch (intent) {
    case 'drug_info': return 'drug';
    case 'drug_interaction': return 'drug_interaction';
    case 'disease_info': return 'disease';
    case 'case_lookup': return 'case';
    case 'guideline': return 'guideline';
    default: return 'general';
  }
}

function getAgent(intent: IntentCategory): string {
  switch (intent) {
    case 'drug': return 'Drug Information Agent';
    case 'drug_interaction': return 'Drug Interaction Checker';
    case 'disease': return 'Disease Knowledge Agent';
    case 'case': return 'Clinical Case Agent';
    case 'guideline': return 'Guideline Agent';
    case 'research': return 'Research Agent';
    default: return 'General Clinical Agent';
  }
}

const INTENT_KEYWORDS: Record<string, IntentCategory> = {
  dose: 'drug',
  dosage: 'drug',
  dosing: 'drug',
  'side effect': 'drug',
  contraindication: 'drug',
  'drug interaction': 'drug_interaction',
  'interact with': 'drug_interaction',
  pharmacology: 'drug',
  pharmacokinetics: 'drug',
  pharmacodynamics: 'drug',
  'take with': 'drug_interaction',
  mg: 'drug',
  mcg: 'drug',
  disease: 'disease',
  condition: 'disease',
  pathophysiology: 'disease',
  aetiology: 'disease',
  epidemiology: 'disease',
  guideline: 'guideline',
  protocol: 'guideline',
  'first-line': 'guideline',
  'standard treatment': 'guideline',
  stg: 'guideline',
  who: 'guideline',
  case: 'case',
  scenario: 'case',
  patient: 'case',
  presentation: 'case',
  study: 'research',
  research: 'research',
  evidence: 'research',
  trial: 'research',
};

export const RAGRouter = {
  analyzeIntent(query: string, engineResult?: KnowledgeEngineResult): IntentCategory {
    if (engineResult) {
      return mapIntent(engineResult.intent);
    }

    const lowerQuery = query.toLowerCase();
    for (const [keyword, intent] of Object.entries(INTENT_KEYWORDS)) {
      if (lowerQuery.includes(keyword)) return intent;
    }

    if (lowerQuery.includes('drug') || lowerQuery.includes('medicine')) return 'drug';
    return 'general';
  },

  async route(query: string, customClient?: any): Promise<RoutedQuery> {
    const engineResult = await KnowledgeEngine.process(query, customClient);
    const intent = this.analyzeIntent(query, engineResult);
    const targetAgent = getAgent(intent);

    return {
      intent,
      targetAgent,
      engineResult,
      requiresRag: engineResult.hasData || intent !== 'general',
    };
  },

  buildContextForAi(engineResult: KnowledgeEngineResult): string {
    if (!engineResult.hasData) return '';

    let context = `## Retrieved Knowledge Sources\n\nIntent: ${engineResult.intent}\n\n`;

    const monographs = engineResult.drugMonographs;
    if (monographs && monographs.length > 0) {
      context += `### Drug Monographs (${monographs.length})\n\n`;
      for (const m of monographs) {
        context += `**${m.name}** (${m.drug_class_name || m.drug_class})\n`;
        context += `- Indications: ${m.indications.slice(0, 3).join('; ')}\n`;
        context += `- Contraindications: ${m.contraindications.slice(0, 3).join('; ')}\n`;
        context += `- Key interactions: ${m.interactions.slice(0, 3).join('; ')}\n\n`;
      }
    }

    const cases = engineResult.sources.filter(s => s.type === 'clinical_case');
    if (cases.length > 0) {
      context += `### Related Clinical Cases (${cases.length})\n\n`;
      for (const c of cases.slice(0, 5)) {
        context += `- ${c.title}\n`;
      }
      context += '\n';
    }

    return context;
  },

  routeQuery: (intent: IntentCategory): string => getAgent(intent),
};
