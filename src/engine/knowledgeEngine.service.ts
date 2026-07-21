import { supabase } from '../lib/supabase';
import { DrugMonographService, type DrugMonograph } from '../services/drugMonograph.service';
import { BUNDLED_DRUGS } from '../data/drugIndexData';

export type QueryIntent = 'drug_info' | 'drug_interaction' | 'disease_info' | 'case_lookup' | 'guideline' | 'general';

export interface KnowledgeSource {
  type: 'drug_monograph' | 'clinical_case' | 'disease' | 'guideline';
  id: string;
  title: string;
  content: string;
  relevance: number;
}

export interface KnowledgeEngineResult {
  query: string;
  intent: QueryIntent;
  sources: KnowledgeSource[];
  contextSummary: string;
  drugMonographs?: DrugMonograph[];
  hasData: boolean;
}

function detectIntent(query: string): QueryIntent {
  const q = query.toLowerCase();

  if (q.includes('interaction') || q.includes('interact with') || q.includes('combine') || q.includes('take with')) {
    return 'drug_interaction';
  }

  if (q.includes('dose') || q.includes('dosage') || q.includes('side effect') ||
      q.includes('contraindication') || q.includes('monitoring') || q.includes('counselling') ||
      q.includes('mg') || q.includes('drug') || q.includes('medicine') || q.includes('pharmacology')) {
    return 'drug_info';
  }

  if (q.includes('disease') || q.includes('condition') || q.includes('pathophysiology') ||
      q.includes('aetiology') || q.includes('epidemiology')) {
    return 'disease_info';
  }

  if (q.includes('case') || q.includes('scenario') || q.includes('patient') || q.includes('presentation')) {
    return 'case_lookup';
  }

  if (q.includes('guideline') || q.includes('protocol') || q.includes('first-line') ||
      q.includes('stg') || q.includes('who') || q.includes('standard treatment')) {
    return 'guideline';
  }

  return 'general';
}

/** Build a fast lookup set of all known drug names (from static index + hardcoded list) */
function buildDrugNameSet(): Set<string> {
  const names = new Set<string>()
  for (const d of BUNDLED_DRUGS) {
    names.add(d.name.toLowerCase())
    if (d.generic_name) names.add(d.generic_name.toLowerCase())
  }
  // Additional common names / brand-name variants
  const extras = [
    'co-trimoxazole', 'sodium valproate', 'ferrous sulphate', 'ferrous sulfate',
  ]
  for (const e of extras) names.add(e)
  return names
}

const ALL_DRUG_NAMES = buildDrugNameSet()

function extractDrugNames(query: string): string[] {
  const q = query.toLowerCase()
  const found: string[] = []

  // Multi-word names first (longest match wins)
  const multiWord: string[] = []
  for (const name of ALL_DRUG_NAMES) {
    if (name.includes(' ') && q.includes(name)) multiWord.push(name)
  }
  multiWord.sort((a, b) => b.length - a.length) // longest first
  found.push(...multiWord)

  // Single-word names
  const words = q.split(/\s+/)
  for (const w of words) {
    if (ALL_DRUG_NAMES.has(w) && !found.includes(w)) found.push(w)
  }

  // If nothing matched by exact name, try partial match
  if (found.length === 0) {
    for (const name of ALL_DRUG_NAMES) {
      if (q.includes(name)) found.push(name)
    }
  }

  return found
}

export const KnowledgeEngine = {
  async process(query: string, customClient?: any): Promise<KnowledgeEngineResult> {
    const intent = detectIntent(query);
    const drugNames = extractDrugNames(query);

    const sources: KnowledgeSource[] = [];
    let drugMonographs: DrugMonograph[] | undefined;
    
    // Use the provided customClient (admin client) or fallback to the browser client
    const client = customClient || supabase;

    if (intent === 'drug_info' || intent === 'drug_interaction' || drugNames.length > 0) {
      if (drugNames.length > 0) {
        const results: DrugMonograph[] = [];
        for (const name of drugNames) {
          const mono = await DrugMonographService.getByName(name);
          if (mono) results.push(mono);
        }
        if (results.length === 0) {
          results.push(...await DrugMonographService.search(query));
        }
        drugMonographs = results;

        for (const m of results) {
          const parts: string[] = [];
          parts.push(`CLASS: ${m.drug_class_name || m.drug_class}`);
          parts.push(`INDICATIONS: ${m.indications.slice(0, 3).join('; ')}`);
          parts.push(`CONTRAINDICATIONS: ${m.contraindications.slice(0, 3).join('; ')}`);
          parts.push(`KEY SIDE EFFECTS: ${m.side_effects.slice(0, 3).join('; ')}`);
          if (m.interactions.length > 0) {
            parts.push(`INTERACTIONS: ${m.interactions.slice(0, 4).join('; ')}`);
          }
          parts.push(`MONITORING: ${m.monitoring.slice(0, 200)}`);

          sources.push({
            type: 'drug_monograph',
            id: m.id,
            title: m.name,
            content: parts.join('\n'),
            relevance: 0.95,
          });
        }

        if (intent === 'drug_interaction' && results.length > 0) {
          for (const m of results) {
            const interacting = await DrugMonographService.getInteractingDrugs(m.name);
            for (const { drug: d, interactions: inter } of interacting) {
              sources.push({
                type: 'drug_monograph',
                id: d.id,
                title: `${m.name} ↔ ${d.name}`,
                content: `INTERACTION: ${inter.join('; ')}`,
                relevance: 0.98,
              });
            }
          }
        }
      }
    }

    if (client && (intent === 'case_lookup' || intent === 'general')) {
      const searchTerm = drugNames.length > 0 ? drugNames[0] : query;
      const { data: cases } = await client
        .from('clinical_cases')
        .select('id, title, disease, diagnosis, specialty, difficulty')
        .or(`title.ilike.%${searchTerm}%,disease.ilike.%${searchTerm}%,diagnosis.ilike.%${searchTerm}%`)
        .eq('status', 'published')
        .limit(5);

      if (cases) {
        for (const c of cases) {
          sources.push({
            type: 'clinical_case',
            id: c.id,
            title: c.title,
            content: `Disease: ${c.disease}\nSpecialty: ${c.specialty}\nDifficulty: ${c.difficulty}\nDiagnosis: ${c.diagnosis}`,
            relevance: 0.8,
          });
        }
      }
    }

    if (client && intent === 'disease_info') {
      const searchTerm = query.replace(/disease|condition|pathophysiology|aetiology|epidemiology/gi, '').trim();
      if (searchTerm) {
        const { data: diseases } = await client
          .from('diseases')
          .select('id, name, aliases, icd10_code, specialty')
          .or(`name.ilike.%${searchTerm}%,aliases.ilike.%${searchTerm}%`)
          .limit(5);

        if (diseases) {
          const name = diseases[0]?.name ?? searchTerm;
          const { data: cases } = await client
            .from('clinical_cases')
            .select('id, title, disease, specialty, difficulty')
            .eq('disease', name)
            .eq('status', 'published')
            .limit(5);

          for (const d of diseases) {
            sources.push({
              type: 'disease',
              id: d.id,
              title: d.name,
              content: `ICD-10: ${d.icd10_code ?? 'N/A'}\nSpecialty: ${d.specialty ?? 'N/A'}\nAliases: ${d.aliases ?? 'N/A'}`,
              relevance: 0.9,
            });
          }

          if (cases) {
            for (const c of cases) {
              sources.push({
                type: 'clinical_case',
                id: c.id,
                title: c.title,
                content: `Difficulty: ${c.difficulty}\nSpecialty: ${c.specialty}`,
                relevance: 0.75,
              });
            }
          }
        }
      }
    }

    sources.sort((a, b) => b.relevance - a.relevance);

    const contextSummary = sources.length > 0
      ? sources.map(s => `[${s.type.toUpperCase()}] ${s.title}\n${s.content}`).join('\n\n')
      : '';

    return {
      query,
      intent,
      sources,
      contextSummary,
      drugMonographs,
      hasData: sources.length > 0,
    };
  },

  async buildPrompt(query: string): Promise<{ systemInstruction: string; context: string; sources: KnowledgeSource[] }> {
    const result = await KnowledgeEngine.process(query);

    const systemInstruction = `You are Clinova's Clinical Decision Support AI. You are a clinical pharmacy educator assisting healthcare students and professionals.

INSTRUCTIONS:
- Answer based STRICTLY on the retrieved knowledge sources provided below.
- If the sources don't contain enough information, say so honestly — do not fabricate.
- Use the drug monograph data (indications, contraindications, dosing, interactions, monitoring) when answering drug-related queries.
- Reference specific clinical cases when discussing patient scenarios.
- For drug interactions, always state the mechanism, severity, and clinical action needed.
- Cite your sources using brackets like [DRUG_MONOGRAPH: Drug Name] or [CASE: Case Title].
- Format responses in markdown with clear headings for readability.`;

    return {
      systemInstruction,
      context: result.contextSummary,
      sources: result.sources,
    };
  },
};
