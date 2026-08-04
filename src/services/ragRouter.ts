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

    // Always run RAG — the KnowledgeEngine searches all sources for every query.
    // Even when hasData is false, the engine performed the search and we should
    // report that to the AI so it knows the database was checked.
    return {
      intent,
      targetAgent,
      engineResult,
      requiresRag: true,
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
        if (m.brand_names && m.brand_names.length > 0) {
          context += `- Brand names: ${m.brand_names.slice(0, 3).join(', ')}\n`;
        }
        context += `- Indications: ${m.indications.slice(0, 5).join('; ')}\n`;
        context += `- Contraindications: ${m.contraindications.slice(0, 3).join('; ')}\n`;
        context += `- Side effects: ${m.side_effects.slice(0, 3).join('; ')}\n`;
        context += `- Key interactions: ${m.interactions.slice(0, 4).join('; ')}\n`;
        if (m.dosage) {
          const dosageEntries = Object.entries(m.dosage).slice(0, 3);
          if (dosageEntries.length > 0) {
            context += `- Dosage: ${dosageEntries.map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`).join('; ')}\n`;
          }
        }
        if (m.mechanism_of_action) {
          context += `- Mechanism: ${m.mechanism_of_action.slice(0, 150)}\n`;
        }
        if (m.monitoring) {
          context += `- Monitoring: ${m.monitoring.slice(0, 200)}\n`;
        }
        context += '\n';
      }
    }

    // Interaction pairs detected by scanning the full drug index (type drug_monograph
    // with a ' <-> ' title). These are distinct from the matched monographs above —
    // they are the OTHER drugs in the registry that interact with the queried one.
    const interactionSources = engineResult.sources.filter(
      s => s.type === 'drug_monograph' && s.title.includes(' <-> '),
    );
    if (interactionSources.length > 0) {
      context += `### Detected Drug Interactions (${interactionSources.length} pairs found in registry)\n\n`;
      for (const ix of interactionSources.slice(0, 12)) {
        const line = ix.content.replace('INTERACTION: ', '')
        context += `- ${line.length > 180 ? line.slice(0, 180) + '…' : line}\n`
      }
      if (interactionSources.length > 12) {
        context += `\n(${interactionSources.length - 12} more interaction pairs found — see registry for full list)\n`;
      }
      context += '\n';
    }

    // Registry-only entries: drugs recognized by name but no full monograph available
    const registrySources = engineResult.sources.filter(s => s.type === 'drug_registry');
    if (registrySources.length > 0) {
      context += `### Drug Registry Entries (${registrySources.length}) — no full monograph available, use clinical knowledge\n\n`;
      for (const r of registrySources) {
        context += `- ${r.content}\n`;
      }
      context += '\n';
    }

    const cases = engineResult.sources.filter(s => s.type === 'clinical_case');
    if (cases.length > 0) {
      context += `### Related Clinical Cases (${cases.length})\n\n`;
      for (const c of cases.slice(0, 5)) {
        context += `- ${c.title}\n  ${c.content}\n`;
      }
      context += '\n';
    }

    const diseases = engineResult.sources.filter(s => s.type === 'disease');
    if (diseases.length > 0) {
      context += `### Disease Information (${diseases.length})\n\n`;
      for (const d of diseases.slice(0, 3)) {
        context += `- **${d.title}**: ${d.content}\n`;
      }
      context += '\n';
    }

    // Fallback: if the formatted sections are empty but contextSummary exists, use it
    if (context.trim() === '## Retrieved Knowledge Sources\n\nIntent: ' + engineResult.intent) {
      if (engineResult.contextSummary) {
        context += engineResult.contextSummary + '\n';
      }
    }

    // Cap context to prevent oversized prompts that may cause empty AI responses.
    // 12k chars ≈ 3k tokens — well within Gemini Flash's window, but keeps the
    // prompt lean for fast first-token latency (drug-interaction queries need
    // room for both monographs and the detected-pairs section).
    const MAX_CONTEXT_CHARS = 12000;
    if (context.length > MAX_CONTEXT_CHARS) {
      context = context.slice(0, MAX_CONTEXT_CHARS) + '\n\n[Context truncated for brevity — focus on the most relevant sources above]\n';
    }

    return context;
  },

  routeQuery: (intent: IntentCategory): string => getAgent(intent),
};
