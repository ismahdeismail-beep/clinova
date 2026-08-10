import { supabase } from '../lib/supabase';
import { DrugMonographService, type DrugMonograph } from '../services/drugMonograph.service';
import { BUNDLED_DRUGS } from '../data/drugIndexData';
import { ALL_CLINICAL_CASES } from '../data/clinicalCasesData';
import { REGISTRY_DRUG_NAMES } from '../data/drugRegistryNames';
import { DRUG_REGISTRY_META } from '../data/drugRegistryMeta';

export type QueryIntent = 'drug_info' | 'drug_interaction' | 'disease_info' | 'case_lookup' | 'guideline' | 'general';

export interface KnowledgeSource {
  type: 'drug_monograph' | 'drug_registry' | 'clinical_case' | 'disease' | 'guideline';
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

// -- Retrieval caches ------------------------------------------------
// All clients (browser anon + server service-role) query the same Supabase
// project, so results are safe to share process-wide. Caching turns repeated
// drug lookups (the hottest path — every drug query re-fetches the same
// monographs) from network round-trips into O(1) map hits.
const monographByNameCache = new Map<string, DrugMonograph | null>()
const monographSearchCache = new Map<string, DrugMonograph[]>()
let interactionDrugListCache: { id: string; name: string; interactions: string[] }[] | null = null

// -- Stop words stripped during keyword extraction --
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 'just', 'about', 'what', 'which', 'who',
  'whom', 'this', 'that', 'these', 'those', 'and', 'but', 'if', 'or',
  'because', 'until', 'while', 'its', 'it', 'they', 'them', 'their',
  'we', 'our', 'you', 'your', 'he', 'she', 'his', 'her', 'my', 'me',
  'i', 'am', 'get', 'got', 'let', 'say', 'said', 'tell', 'told',
  'give', 'take', 'make', 'know', 'think', 'see', 'come', 'go',
  'want', 'look', 'use', 'find', 'ask', 'work', 'seem', 'feel',
  'try', 'leave', 'call', 'need', 'become', 'keep', 'mean', 'set',
  'help', 'show', 'hear', 'play', 'run', 'move', 'live', 'believe',
  'bring', 'happen', 'must', 'write', 'provide', 'hold', 'turn',
  'present', 'explain', 'discuss', 'describe', 'review', 'compare',
  'list', 'outline', 'summarize', 'define', 'identify', 'state',
  'mention', 'note', 'patient', 'patients', 'case', 'cases',
  'scenario', 'scenarios', 'manage', 'managed', 'managing',
  'treatment', 'treat', 'treated', 'clinical', 'clinically',
  'medical', 'medication', 'medications', 'prescribe', 'prescribed',
  'dosing', 'dose', 'dosage', 'drug', 'drugs', 'medicine', 'medicines',
  'disease', 'diseases', 'condition', 'conditions', 'health',
  'hospital', 'ward', 'admission', 'admit', 'discharge',
]);

// -- Known disease names for direct matching --
const KNOWN_DISEASES = new Set<string>();
for (const c of ALL_CLINICAL_CASES) {
  if (c.disease) KNOWN_DISEASES.add(c.disease.toLowerCase());
}

function detectIntent(query: string): QueryIntent {
  const q = query.toLowerCase();

  if (q.includes('interaction') || q.includes('interact with') || q.includes('combine') ||
      q.includes('take with') || q.includes('co-prescrib') || q.includes('together with') ||
      q.includes('taken together') || q.includes('with each other') || q.includes('concomitant') ||
      q.includes('concurrent use')) {
    return 'drug_interaction';
  }

  if (q.includes('dose') || q.includes('dosage') || q.includes('dosing') || q.includes('side effect') ||
      q.includes('contraindication') || q.includes('monitoring') || q.includes('counselling') ||
      q.includes('counseling') || q.includes('mg') || q.includes('mcg') || q.includes('pharmacology') ||
      q.includes('mechanism') || q.includes('antibiotic') || q.includes('analgesic') ||
      q.includes('antihypertensive') || q.includes('antidiabetic') || q.includes('injection') ||
      q.includes('tablet') || q.includes('syrup') || q.includes('infusion') ||
      q.includes('prescri') || q.includes('formulary') || q.includes('dispensing')) {
    return 'drug_info';
  }

  if (q.includes('disease') || q.includes('condition') || q.includes('pathophysiology') ||
      q.includes('aetiology') || q.includes('etiology') || q.includes('epidemiology') ||
      q.includes('signs') || q.includes('symptoms') || q.includes('clinical features') ||
      q.includes('presentation') || q.includes('classify') || q.includes('classification') ||
      q.includes('complications') || q.includes('prognosis')) {
    return 'disease_info';
  }

  if (q.includes('guideline') || q.includes('protocol') || q.includes('first-line') ||
      q.includes('first line') || q.includes('stg') || q.includes('who') ||
      q.includes('standard treatment') || q.includes('regimen') || q.includes('stepwise') ||
      q.includes('kenya') || q.includes('national')) {
    return 'guideline';
  }

  if (q.includes('case') || q.includes('scenario') || q.includes('management') ||
      q.includes('treatment of') || q.includes('how to manage') || q.includes('approach to') ||
      q.includes('workup') || q.includes('investigation') || q.includes('diagnosis')) {
    return 'case_lookup';
  }

  return 'general';
}

// -- Drug name index (bundled 149 + full 1000-drug registry) --
function buildDrugNameSet(): Set<string> {
  const names = new Set<string>()
  // Bundled drug details (brand names, generic names)
  for (const d of BUNDLED_DRUGS) {
    names.add(d.name.toLowerCase())
    if (d.generic_name) names.add(d.generic_name.toLowerCase())
    if (d.brand_names) {
      for (const bn of d.brand_names) names.add(bn.toLowerCase())
    }
  }
  // Full 1000-drug registry names
  for (const name of REGISTRY_DRUG_NAMES) {
    names.add(name.toLowerCase())
  }
  // Common aliases
  const extras = [
    'co-trimoxazole', 'sodium valproate', 'ferrous sulphate', 'ferrous sulfate',
    'augmentin', 'panadol', 'brufen', 'flagyl', 'nexium', 'ventolin',
    'noradrenaline', 'epinephrine', 'nitroglycerin', 'glyceryl trinitrate',
    'prednisone', 'methyldopa', 'ringer\'s lactate', 'normal saline',
  ]
  for (const e of extras) names.add(e)
  return names
}

function buildIndicationMap(): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const d of BUNDLED_DRUGS) {
    if (!d.indications) continue
    for (const ind of d.indications) {
      const key = ind.toLowerCase()
      const existing = map.get(key) || []
      existing.push(d.name)
      map.set(key, existing)
    }
  }
  return map
}

// Therapeutic class → common conditions (used when drug is recognized but no monograph found)
const CLASS_CONDITION_MAP: Record<string, string[]> = {
  'Anti-infectives': ['infection', 'bacterial', 'pneumonia', 'meningitis', 'sepsis', 'uti', 'uti', 'otitis', 'sinusitis', 'tuberculosis', 'malaria', 'fungal', 'viral', 'sexually transmitted', 'std', 'wound infection', 'abscess', 'cellulitis', 'gastroenteritis', 'hepatitis', 'conjunctivitis', 'osteomyelitis', 'endocarditis'],
  'Cardiovascular': ['hypertension', 'heart failure', 'angina', 'arrhythmia', 'atrial fibrillation', 'myocardial infarction', 'stroke', 'thrombosis', 'embolism', 'hyperlipidemia', 'atherosclerosis', 'cardiac', 'cardiovascular', 'hypotension', 'shock', 'edema', 'dvt', 'pe', 'peripheral vascular'],
  'CNS': ['depression', 'anxiety', 'epilepsy', 'seizure', 'psychosis', 'schizophrenia', 'bipolar', 'insomnia', 'pain', 'neuropathic', 'migraine', 'parkinson', 'alzheimer', 'adhd', 'mania', 'obsessive', 'ocd', 'panic', 'ptsd', 'cognitive', 'sedation', 'anaesthesia', 'anaesthetic', 'sedative'],
  'Endocrine': ['diabetes', 'thyroid', 'adrenal', 'cushing', 'addison', 'hypothyroid', 'hyperthyroid', 'diabetes mellitus', 'insulin', 'oral hypoglycemic', 'steroid', 'corticosteroid', 'hormone', 'growth hormone', 'osteoporosis', 'metabolic'],
  'Immunology': ['allergy', 'autoimmune', 'immunosuppression', 'transplant', 'rheumatoid', 'lupus', 'psoriasis', 'inflammatory', 'asthma', 'anaphylaxis', 'hay fever', 'urticaria', 'celiac', 'immunodeficiency'],
  'Respiratory': ['asthma', 'copd', 'bronchitis', 'pneumonia', 'respiratory', 'bronchospasm', 'cough', 'bronchodilator', 'inhaler', 'pulmonary', 'emphysema', 'pneumothorax', 'tb', 'tuberculosis', 'pleural'],
  'Gastrointestinal': ['ulcer', 'gastritis', 'gerd', 'reflux', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'ibd', 'crohn', 'ulcerative colitis', 'liver', 'hepatic', 'cirrhosis', 'pancreatitis', 'gi bleed', 'gastrointestinal', 'dyspepsia', 'helicobacter'],
  'Analgesics': ['pain', 'analgesic', 'opioid', 'anti-inflammatory', 'nsaid', 'fever', 'antipyretic', 'postoperative', 'chronic pain', 'palliative', 'cancer pain', 'musculoskeletal', 'headache', 'migraine', 'arthralgia', 'myalgia'],
  'Haematology': ['anemia', 'haemophilia', 'coagulation', 'bleeding', 'thrombocytopenia', 'sickle cell', 'thalassemia', 'iron deficiency', 'vitamin b12', 'folate', 'clotting', 'anticoagulant', 'antiplatelet', 'hematologic'],
  'Oncology': ['cancer', 'tumor', 'chemotherapy', 'neoplasm', 'malignant', 'metastasis', 'leukemia', 'lymphoma', 'sarcoma', 'carcinoma', 'immunotherapy', 'radiotherapy', 'palliative', 'oncology'],
  'Dermatology': ['skin', 'dermatitis', 'eczema', 'acne', 'psoriasis', 'fungal skin', 'wound', 'burn', 'ulcer', 'topical', 'dermatological'],
  'Nutrition/Vitamins': ['deficiency', 'vitamin', 'supplement', 'nutrition', 'malnutrition', 'electrolyte', 'rehydration', 'parenteral', 'enteral'],
  'Toxicology/Antidotes': ['poisoning', 'overdose', 'toxic', 'antidote', 'envenomation', 'snake bite', 'methanol', 'paracetamol overdose', 'opioid overdose', 'organophosphate'],
  'Renal/Electrolytes': ['renal', 'kidney', 'electrolyte', 'potassium', 'sodium', 'calcium', 'phosphate', 'diuretic', 'dialysis', 'acute kidney', 'chronic kidney', 'ckd', 'edema', 'fluid'],
  'Ophthalmology': ['eye', 'glaucoma', 'conjunctivitis', 'ocular', 'ophthalmic', 'retinal', 'corneal', 'visual'],
  'Other': [],
};

// Map drug names from the registry to their therapeutic classes
const REGISTRY_CLASS_MAP: Map<string, string> = new Map()
for (const [name, meta] of Object.entries(DRUG_REGISTRY_META)) {
  REGISTRY_CLASS_MAP.set(name, meta.therapeuticClass)
}

const ALL_DRUG_NAMES = buildDrugNameSet()
// Use the original curated indication map from BUNDLED_DRUGS only.
// The expanded map was too broad — mapping every condition to ALL drugs in a
// therapeutic class (e.g. "diabetes" → 100+ endocrine drugs), causing massive
// context overflow and empty AI responses.
const INDICATION_MAP = buildIndicationMap()

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return dp[m][n]
}

/** Extract meaningful medical keywords, stripping NLP filler */
function extractKeywords(query: string): string[] {
  const q = query.toLowerCase()
    .replace(/[^\w\s-/]/g, ' ')
    .replace(/\b\d+\b/g, ' ')
    .trim()

  const words = q.split(/\s+/).filter(w =>
    w.length >= 2 && !STOP_WORDS.has(w)
  )

  const seen = new Set<string>()
  const unique: string[] = []
  for (const w of words) {
    if (!seen.has(w)) {
      seen.add(w)
      unique.push(w)
    }
  }
  return unique
}

/** Extract the most relevant disease/topic term(s) from a query for DB search */
function extractDiseaseKeywords(query: string): string[] {
  const q = query.toLowerCase()
  const keywords: string[] = []

  // Try exact disease name match from known diseases
  for (const disease of KNOWN_DISEASES) {
    if (q.includes(disease)) {
      keywords.push(disease)
    }
  }
  if (keywords.length > 0) return keywords

  // Strip clinical NLP noise and return extracted keywords
  const stripped = q
    .replace(/\b(explain|describe|discuss|what|how|why|when|which|tell|me|about|the|a|an|is|are|was|were|do|does|did|can|could|would|should|for|in|with|of|on|at|to|from|and|or|but|not|this|that|it|its|my|your|our|their|we|you|they|he|she|his|her)\b/gi, ' ')
    .replace(/\b(treatment|management|pathophysiology|aetiology|etiology|epidemiology|diagnosis|signs|symptoms|clinical|features|presentation|complications|overview|guideline|protocol|pharmacology|drug|therapy|therapeutics|approach to)\b/gi, ' ')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const extracted = extractKeywords(stripped)
  return extracted.length > 0 ? extracted : extractKeywords(query)
}

function extractDrugNames(query: string): string[] {
  const q = query.toLowerCase()
  const found: string[] = []

  // Multi-word names first (longest match wins)
  const multiWord: string[] = []
  for (const name of ALL_DRUG_NAMES) {
    if (name.includes(' ') && q.includes(name)) multiWord.push(name)
  }
  multiWord.sort((a, b) => b.length - a.length)
  found.push(...multiWord)

  // Single-word names
  const words = q.split(/\s+/)
  for (const w of words) {
    if (ALL_DRUG_NAMES.has(w) && !found.includes(w)) found.push(w)
  }

  // Partial + fuzzy match if nothing found
  if (found.length === 0) {
    for (const name of ALL_DRUG_NAMES) {
      if (q.includes(name) && !found.includes(name)) found.push(name)
    }

    if (found.length === 0) {
      const queryWords = q.split(/\s+/).filter(w => w.length >= 3)
      // Skip the fuzzy pass for long natural-language queries — the exact and
      // substring passes above cover them, and Levenshtein over 1000+ names ×
      // words is the single most expensive part of retrieval.
      if (queryWords.length > 0 && queryWords.length <= 4) {
        for (const qw of queryWords) {
          let bestMatch = ''
          let bestDist = Infinity
          for (const name of ALL_DRUG_NAMES) {
            const nameParts = name.split(/\s+/)
            for (const np of nameParts) {
              if (np.length < 3) continue
              const threshold = np.length <= 5 ? 2 : 3
              const dist = levenshtein(qw, np)
              if (dist <= threshold && dist < bestDist) {
                bestDist = dist
                bestMatch = name
              }
            }
          }
          if (bestMatch && !found.includes(bestMatch)) found.push(bestMatch)
        }
      }
    }
  }

  return found.slice(0, 10)
}

/** Search drugs by indication keywords using substring matching */
function searchByIndication(keywords: string[]): string[] {
  const matchedDrugs = new Set<string>()

  for (const kw of keywords) {
    const lower = kw.toLowerCase()
    for (const [indication, drugs] of INDICATION_MAP) {
      if (indication.includes(lower) || lower.includes(indication)) {
        for (const d of drugs) matchedDrugs.add(d)
      }
    }
  }

  // Cross-reference with clinical case disease names
  if (matchedDrugs.size === 0) {
    for (const disease of KNOWN_DISEASES) {
      for (const kw of keywords) {
        if (disease.includes(kw.toLowerCase()) || kw.toLowerCase().includes(disease)) {
          for (const [indication, drugs] of INDICATION_MAP) {
            if (indication.includes(disease) || disease.includes(indication)) {
              for (const d of drugs) matchedDrugs.add(d)
            }
          }
        }
      }
    }
  }

  return Array.from(matchedDrugs).slice(0, 10)
}

/** Format a drug monograph into a concise knowledge source */
function formatDrugSource(m: DrugMonograph, relevance: number): KnowledgeSource {
  const parts: string[] = []
  parts.push(`CLASS: ${m.drug_class_name || m.drug_class}`)
  if (m.mechanism_of_action) parts.push(`MECHANISM: ${m.mechanism_of_action.slice(0, 200)}`)
  parts.push(`INDICATIONS: ${m.indications.slice(0, 5).join('; ')}`)
  if (m.dosage) {
    const dosageEntries = Object.entries(m.dosage).slice(0, 3)
    if (dosageEntries.length > 0) {
      parts.push(`DOSAGE: ${dosageEntries.map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`).join('; ')}`)
    }
  }
  parts.push(`CONTRAINDICATIONS: ${m.contraindications.slice(0, 4).join('; ')}`)
  parts.push(`SIDE EFFECTS: ${m.side_effects.slice(0, 5).join('; ')}`)
  if (m.interactions.length > 0) parts.push(`INTERACTIONS: ${m.interactions.slice(0, 5).join('; ')}`)
  if (m.monitoring) parts.push(`MONITORING: ${m.monitoring.slice(0, 300)}`)
  if (m.patient_counselling) parts.push(`COUNSELLING: ${m.patient_counselling.slice(0, 200)}`)
  if (m.pregnancy_category) parts.push(`PREGNANCY: ${m.pregnancy_category}`)
  if (m.overdose) parts.push(`OVERDOSE: ${m.overdose.slice(0, 200)}`)

  return {
    type: 'drug_monograph',
    id: m.id,
    title: m.name,
    content: parts.join('\n'),
    relevance,
  }
}

/** Map a raw Supabase row to a DrugMonograph */
function mapDrugRow(row: any): DrugMonograph {
  const drugClassInfo = row.drug_class_info
  return {
    id: row.id,
    name: row.name,
    generic_name: row.generic_name ?? '',
    drug_class: row.drug_class ?? '',
    drug_class_id: row.drug_class_id ?? null,
    drug_class_name: drugClassInfo?.name ?? row.drug_class ?? '',
    indications: row.indications ?? [],
    contraindications: row.contraindications ?? [],
    side_effects: row.side_effects ?? [],
    dosage: row.dosage ?? {},
    interactions: row.interactions ?? [],
    monitoring: row.monitoring ?? '',
    patient_counselling: row.patient_counselling ?? '',
    mechanism_of_action: row.mechanism_of_action ?? undefined,
    brand_names: row.brand_names ?? undefined,
    pregnancy_category: row.pregnancy_category ?? undefined,
    warnings: row.warnings ?? undefined,
    overdose: row.overdose ?? undefined,
    pharmacokinetics: row.pharmacokinetics ?? undefined,
    black_box_warnings: row.black_box_warnings ?? undefined,
    clinical_pearls: row.clinical_pearls ?? undefined,
    created_at: row.created_at,
  }
}

/**
 * Query drugs via the provided Supabase client (service-role on server, anon on client).
 * Falls back to DrugMonographService when no client is available.
 * This ensures the server-side KnowledgeEngine can reach the full Supabase drug
 * index instead of being limited to the bundled drugs.
 */
async function queryDrugByName(client: any, name: string): Promise<DrugMonograph | null> {
  const key = name.toLowerCase().trim()
  if (monographByNameCache.has(key)) return monographByNameCache.get(key)!

  let result: DrugMonograph | null = null
  if (client) {
    try {
      const { data, error } = await client
        .from('drug_monographs')
        .select('*, drug_class_info:drug_classes(name)')
        .ilike('name', name)
        .single()
      if (!error && data) result = mapDrugRow(data)
    } catch { /* fall through to DrugMonographService */ }
  }
  if (!result) result = await DrugMonographService.getByName(name)
  monographByNameCache.set(key, result)
  return result
}

async function queryDrugBySearch(client: any, query: string): Promise<DrugMonograph[]> {
  const key = query.toLowerCase().trim()
  if (monographSearchCache.has(key)) return monographSearchCache.get(key)!

  let result: DrugMonograph[] = []
  if (client) {
    try {
      const { data, error } = await client
        .from('drug_monographs')
        .select('*, drug_class_info:drug_classes(name)')
        .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%`)
        .order('name')
        .limit(5)
      if (!error && data && data.length > 0) result = data.map(mapDrugRow)
    } catch { /* fall through to DrugMonographService */ }
  }
  if (result.length === 0) result = await DrugMonographService.search(query)
  if (monographSearchCache.size > 200) monographSearchCache.clear()
  monographSearchCache.set(key, result)
  return result
}

// Interaction lookup against the FULL drug index, cached per process.
// Uses the passed client (service-role on server) so all ~1000 drugs are
// scanned instead of the bundled subset the browser client can see, and the
// list is fetched once instead of on every interaction query.
async function findInteractingDrugs(
  client: any,
  monograph: DrugMonograph,
): Promise<KnowledgeSource[]> {
  if (interactionDrugListCache === null) {
    if (!client) return []
    try {
      const { data, error } = await client
        .from('drug_monographs')
        .select('id, name, interactions')
        .limit(5000)
      if (error || !data || data.length === 0) return []
      interactionDrugListCache = data as { id: string; name: string; interactions: string[] }[]
    } catch {
      return []
    }
  }

  const needle = monograph.name.toLowerCase()
  const sources: KnowledgeSource[] = []
  for (const other of interactionDrugListCache) {
    if (other.id === monograph.id) continue
    const interactions = (other.interactions || []).filter(i =>
      i.toLowerCase().includes(needle),
    )
    if (interactions.length > 0) {
      sources.push({
        type: 'drug_monograph',
        id: other.id,
        title: `${monograph.name} ↔ ${other.name}`,
        content: `INTERACTION: ${interactions.join('; ')}`,
        // Below the queried drug's own monographs (0.95) so the citation widget
        // shows the main drugs first, but above cases/diseases (0.8x).
        relevance: 0.94,
      })
    }
  }
  return sources
}

export const KnowledgeEngine = {
  async process(query: string, customClient?: any): Promise<KnowledgeEngineResult> {
    const intent = detectIntent(query)
    const drugNames = extractDrugNames(query)
    const keywords = extractKeywords(query)
    const diseaseKeywords = extractDiseaseKeywords(query)

    const sources: KnowledgeSource[] = []
    let drugMonographs: DrugMonograph[] | undefined

    const client = customClient || supabase

    // -- 1. Drug monograph search: ALWAYS attempted --
    // Uses client (service-role on server, anon on client) to reach full Supabase index
    // When no monograph is found, falls back to registry metadata (therapeutic class, KEML status)
    const unmatchedDrugNames: string[] = []

    if (drugNames.length > 0) {
      const results: DrugMonograph[] = []
      // Look up every matched name in parallel — sequential .ilike()
      // round-trips per name were a major source of retrieval latency.
      const foundMonographs = await Promise.all(
        drugNames.map(name => queryDrugByName(client, name)),
      )
      for (let i = 0; i < drugNames.length; i++) {
        const mono = foundMonographs[i]
        if (mono) {
          results.push(mono)
        } else {
          unmatchedDrugNames.push(drugNames[i])
        }
      }
      if (results.length === 0 && drugNames.length > 0) {
        const searchResults = await queryDrugBySearch(client, drugNames[0])
        results.push(...searchResults)
        // Remove matched names from unmatched list
        for (const sr of searchResults) {
          const idx = unmatchedDrugNames.indexOf(sr.name.toLowerCase())
          if (idx >= 0) unmatchedDrugNames.splice(idx, 1)
        }
      }
      drugMonographs = results

      for (const m of results) {
        sources.push(formatDrugSource(m, 0.95))
      }

      if (intent === 'drug_interaction' && results.length > 0) {
        // Uses the cached full drug index via the passed client — covers the
        // whole 1000-drug registry, not just the bundled subset, and avoids
        // re-fetching the entire table for every interaction query.
        const interactionSources = await Promise.all(
          results.map(m => findInteractingDrugs(client, m)),
        )
        for (const srcs of interactionSources) sources.push(...srcs)
      }
    }

    // Fallback: for drug names recognized from registry but no monograph found,
    // create a registry-only source with therapeutic class info so the AI has context
    for (const name of unmatchedDrugNames) {
      const meta = DRUG_REGISTRY_META[name] || DRUG_REGISTRY_META[name.toLowerCase()]
      if (meta) {
        const conditions = CLASS_CONDITION_MAP[meta.therapeuticClass] || []
        sources.push({
          type: 'drug_registry',
          id: `registry-${name}`,
          title: name,
          content: [
            `DRUG: ${name}`,
            `THERAPEUTIC CLASS: ${meta.therapeuticClass}`,
            `SOURCE: ${meta.source} (${meta.priority})`,
            `COMMON INDICATIONS FOR CLASS: ${conditions.slice(0, 8).join('; ')}`,
            `[Note: Full monograph not available in database. Use clinical knowledge to answer.]`,
          ].join('\n'),
          relevance: 0.80,
        })
      }
    }

    // Always try indication-based search if no drug monographs found yet
    if (drugMonographs === undefined || drugMonographs.length === 0) {
      const indicationDrugs = searchByIndication(diseaseKeywords.length > 0 ? diseaseKeywords : keywords)
      if (indicationDrugs.length > 0) {
        drugMonographs = []
        let indicationMonographsFound = 0
        for (const name of indicationDrugs.slice(0, 5)) {
          const mono = await queryDrugByName(client, name)
          if (mono) {
            drugMonographs.push(mono)
            sources.push(formatDrugSource(mono, 0.85))
            indicationMonographsFound++
          }
          if (indicationMonographsFound >= 3) break
        }
      }
    }

    // -- 2. Clinical case + disease search: gated by intent --
    // Drug queries already get rich context from monographs; searching cases
    // and the disease registry only adds latency for them. Run both remaining
    // DB searches concurrently instead of sequentially.
    const searchTerms = diseaseKeywords.length > 0 ? diseaseKeywords : keywords
    const isDrugQuery = intent === 'drug_info' || intent === 'drug_interaction'
    if (!isDrugQuery && searchTerms.length > 0 && client) {
      const orParts: string[] = []
      for (const term of searchTerms.slice(0, 5)) {
        orParts.push(`title.ilike.%${term}%`)
        orParts.push(`disease.ilike.%${term}%`)
        orParts.push(`diagnosis.ilike.%${term}%`)
        orParts.push(`chief_complaint.ilike.%${term}%`)
      }

      const [casesResult, diseasesResult] = await Promise.all([
        orParts.length > 0
          ? client
              .from('clinical_cases')
              .select('id, title, disease, diagnosis, specialty, difficulty, chief_complaint')
              .or(orParts.join(','))
              .eq('status', 'published')
              .limit(8)
          : Promise.resolve({ data: null }),
        (async () => {
          try {
            const { data } = await client
              .from('diseases')
              .select('id, name, aliases')
              .or(searchTerms.slice(0, 5).map(t => `name.ilike.%${t}%`).join(','))
              .limit(5)
            return { data }
          } catch {
            return { data: null }
          }
        })(),
      ])

      const cases = casesResult?.data
      if (cases && cases.length > 0) {
        for (const c of cases) {
          sources.push({
            type: 'clinical_case',
            id: c.id,
            title: c.title,
            content: `Disease: ${c.disease}\nSpecialty: ${c.specialty}\nDifficulty: ${c.difficulty}\nDiagnosis: ${c.diagnosis}${c.chief_complaint ? '\nChief Complaint: ' + c.chief_complaint : ''}`,
            relevance: 0.8,
          })
        }
      }

      const diseases = diseasesResult?.data
      if (diseases && diseases.length > 0) {
        for (const d of diseases) {
          const aliasText = Array.isArray(d.aliases) && d.aliases.length > 0
            ? '\nAliases: ' + d.aliases.join(', ')
            : ''
          sources.push({
            type: 'disease',
            id: d.id,
            title: d.name,
            content: `Specialty: Clinical Pharmacy${aliasText}`,
            relevance: 0.88,
          })
        }
      }
    }

    // Also search bundled clinical cases for additional context
    if (!isDrugQuery) {
      for (const keyword of searchTerms.slice(0, 3)) {
        const lower = keyword.toLowerCase()
        for (const c of ALL_CLINICAL_CASES.slice(0, 50)) {
          const diseaseMatch = (c.disease || '').toLowerCase().includes(lower)
          const titleMatch = (c.title || '').toLowerCase().includes(lower)
          if ((diseaseMatch || titleMatch) && !sources.some(s => s.id === c.id)) {
            sources.push({
              type: 'clinical_case',
              id: c.id,
              title: c.title,
              content: `Disease: ${c.disease}\nSpecialty: ${c.specialty}\nDifficulty: ${c.difficulty}`,
              relevance: diseaseMatch ? 0.78 : 0.7,
            })
          }
        }
      }
    }

    // -- 4. Deduplicate sources --
    const seenIds = new Set<string>()
    const uniqueSources: KnowledgeSource[] = []
    for (const s of sources) {
      if (!seenIds.has(s.id)) {
        seenIds.add(s.id)
        uniqueSources.push(s)
      }
    }

    uniqueSources.sort((a, b) => b.relevance - a.relevance)

    const contextSummary = uniqueSources.length > 0
      ? uniqueSources.map(s => `[${s.type.toUpperCase()}] ${s.title}\n${s.content}`).join('\n\n')
      : ''

    return {
      query,
      intent,
      sources: uniqueSources,
      contextSummary,
      drugMonographs,
      hasData: uniqueSources.length > 0,
    }
  },

  async buildPrompt(query: string, customClient?: any): Promise<{ systemInstruction: string; context: string; sources: KnowledgeSource[] }> {
    const result = await KnowledgeEngine.process(query, customClient);

    const systemInstruction = `You are Clinova's Clinical Decision Support AI. You are a clinical pharmacy educator assisting healthcare students and professionals.

INSTRUCTIONS:
- Answer based on the retrieved knowledge sources provided below.
- When a drug monograph is available: cite exact indications, contraindications, dosing, interactions, and monitoring from the monograph data.
- When only REGISTRY metadata is available (drug recognized but no full monograph): use the therapeutic class info as context and provide a clinically accurate answer from your training. Clearly note: "No full monograph available — answer based on clinical knowledge."
- When NO drug data is available in the database: answer from your clinical knowledge, referencing WHO guidelines and standard practice where applicable. Do NOT say "I don't have data" — provide the best clinical answer you can.
- For drug interactions, always state the mechanism, severity, and clinical action needed.
- Reference specific clinical cases when discussing patient scenarios.
- Cite your sources using brackets like [DRUG_MONOGRAPH: Drug Name], [DRUG_REGISTRY: Drug Name], or [CASE: Case Title].
- Format responses in markdown with clear headings for readability.
- Always use Kenyan/East African clinical context where relevant (KEML, local guidelines).`;

    return {
      systemInstruction,
      context: result.contextSummary,
      sources: result.sources,
    }
  },
};
