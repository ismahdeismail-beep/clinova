// ============================================================
// Clinova Smart Search Service
// Educational intent-aware search with semantic understanding
// ============================================================

import { knowledgeEngine, type EducationalContext } from './knowledgeEngine';

// ============================================================
// Types
// ============================================================

export type SearchIntent =
  | 'disease_info'
  | 'drug_info'
  | 'treatment_guideline'
  | 'clinical_case'
  | 'study_material'
  | 'concept_explanation'
  | 'assessment_prep'
  | 'general_learning';

export interface SmartSearchQuery {
  rawQuery: string;
  intent: SearchIntent;
  disease?: string;
  drug?: string;
  topic?: string;
  discipline?: string;
  educationalLevel?: string;
  filters?: SmartSearchFilters;
}

export interface SmartSearchFilters {
  disciplines?: string[];
  resourceTypes?: string[];
  educationalLevels?: string[];
  dateFrom?: number;
  dateTo?: number;
  diseases?: string[];
  drugs?: string[];
}

export interface SmartSearchResult {
  id: string;
  title: string;
  description?: string;
  type: string;
  discipline: string;
  resourceType: 'note' | 'book' | 'guideline' | 'clinical_case' | 'flashcard' | 'quiz' | 'study_guide' | 'revision_note' | 'oral_practice' | 'drug_info' | 'general';
  relevanceScore: number;
  matchHighlights: string[];
  educationContext?: Partial<EducationalContext>;
  url?: string;
  metadata?: Record<string, any>;
}

export interface SmartSearchResponse {
  query: SmartSearchQuery;
  results: SmartSearchResult[];
  totalResults: number;
  suggestedTopics?: string[];
  didYouMean?: string;
  educationalContext: EducationalContext;
}

// ============================================================
// Intent Detection
// ============================================================

const INTENT_PATTERNS: Array<{ pattern: RegExp; intent: SearchIntent }> = [
  { pattern: /\b(disease|condition|disorder|syndrome|pathology|pathophysiology)\b/i, intent: 'disease_info' },
  { pattern: /\b(drug|medicine|medication|dose|dosage|indication|contraindication|side.?effect|interaction)\b/i, intent: 'drug_info' },
  { pattern: /\b(treatment|therapy|management|guideline|protocol|first.?line|standard\s*of\s*care)\b/i, intent: 'treatment_guideline' },
  { pattern: /\b(clinical\s*case|patient\s*scenario|case\s*study|case\s*report)\b/i, intent: 'clinical_case' },
  { pattern: /\b(study|learn|understand|concept|explain|what\s*is|define|describe)\b/i, intent: 'concept_explanation' },
  { pattern: /\b(flashcard|quiz|mcq|question|practice|exam|test|revision|study\s*guide|mnemonic)\b/i, intent: 'assessment_prep' },
  { pattern: /\b(note|summary|overview|lecture|chapter|book|textbook|resource)\b/i, intent: 'study_material' },
];

// ============================================================
// Medicinal Terms Dictionary
// ============================================================

const COMMON_DISEASES = [
  'hypertension', 'diabetes', 'malaria', 'tuberculosis', 'hiv', 'aids',
  'asthma', 'copd', 'pneumonia', 'bronchitis', 'heart failure', 'angina',
  'myocardial infarction', 'stroke', 'anemia', 'leukemia', 'cancer',
  'hepatitis', 'cirrhosis', 'renal failure', 'uti', 'meningitis',
  'osteoporosis', 'arthritis', 'gout', 'peptic ulcer', 'gerd',
  'epilepsy', 'parkinson\'s', 'alzheimer\'s', 'depression',
  'schizophrenia', 'bipolar', 'anxiety', 'insomnia', 'thyroid',
  'dermatitis', 'psoriasis', 'eczema', 'glaucoma', 'cataract',
];

const COMMON_DRUGS = [
  'paracetamol', 'ibuprofen', 'aspirin', 'amoxicillin', 'metronidazole',
  'omeprazole', 'atorvastatin', 'lisinopril', 'amlodipine', 'metformin',
  'insulin', 'warfarin', 'clopidogrel', 'furosemide', 'spironolactone',
  'salbutamol', 'prednisolone', 'ceftriaxone', 'azithromycin', 'ciprofloxacin',
  'doxycycline', 'fluconazole', 'acyclovir', 'albendazole', 'praziquantel',
  'artemether', 'lumefantrine', 'rifampicin', 'isoniazid', 'ethambutol',
  'gentamicin', 'vancomycin', 'morphine', 'tramadol', 'diazepam',
  'phenytoin', 'carbamazepine', 'valproate', 'haloperidol', 'chlorpromazine',
];

// ============================================================
// Smart Search — Main Class
// ============================================================

export class SmartSearch {
  private static instance: SmartSearch;

  static getInstance(): SmartSearch {
    if (!SmartSearch.instance) {
      SmartSearch.instance = new SmartSearch();
    }
    return SmartSearch.instance;
  }

  // ============================================================
  // Analyze Search Query
  // ============================================================

  analyzeQuery(rawQuery: string, filters?: SmartSearchFilters): SmartSearchQuery {
    const lowerQuery = rawQuery.toLowerCase().trim();

    // Detect intent
    let intent: SearchIntent = 'general_learning';
    for (const { pattern, intent: detectedIntent } of INTENT_PATTERNS) {
      if (pattern.test(lowerQuery)) {
        intent = detectedIntent;
        break;
      }
    }

    // Detect disease
    let disease: string | undefined;
    for (const d of COMMON_DISEASES) {
      if (lowerQuery.includes(d)) {
        disease = d.charAt(0).toUpperCase() + d.slice(1);
        break;
      }
    }

    // Detect drug
    let drug: string | undefined;
    for (const d of COMMON_DRUGS) {
      if (lowerQuery.includes(d)) {
        drug = d.charAt(0).toUpperCase() + d.slice(1);
        break;
      }
    }

    // Use knowledge engine for full context
    const context = knowledgeEngine.detectContext(rawQuery);

    return {
      rawQuery,
      intent,
      disease,
      drug,
      topic: context.subject,
      discipline: context.learningArea,
      educationalLevel: context.educationalLevel,
      filters,
    };
  }

  // ============================================================
  // Execute Search
  // ============================================================

  async search(
    query: string,
    filters?: SmartSearchFilters,
    maxResults: number = 20,
  ): Promise<SmartSearchResponse> {
    const analyzedQuery = this.analyzeQuery(query, filters);
    const context = knowledgeEngine.detectContext(query);
    const results: SmartSearchResult[] = [];

    // Search local storage for relevant resources
    const localResults = this.searchLocalStorage(analyzedQuery, maxResults);
    results.push(...localResults);

    // Generate context-aware suggestions for results
    const suggestedTopics = this.suggestTopics(analyzedQuery);

    return {
      query: analyzedQuery,
      results: results.slice(0, maxResults),
      totalResults: results.length,
      suggestedTopics,
      didYouMean: this.checkDidYouMean(query),
      educationalContext: context,
    };
  }

  // ============================================================
  // Local Storage Search
  // ============================================================

  private searchLocalStorage(query: SmartSearchQuery, maxResults: number): SmartSearchResult[] {
    const results: SmartSearchResult[] = [];
    const lowerQuery = query.rawQuery.toLowerCase();
    const seen = new Set<string>();

    // Search through all local storage for relevant content
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        const value = localStorage.getItem(key);
        if (!value) continue;

        try {
          // Try to parse as JSON and search
          const parsed = JSON.parse(value);
          this.searchInObject(parsed, key, lowerQuery, results, seen, query);
        } catch {
          // Plain string — search keyword match
          if (value.toLowerCase().includes(lowerQuery) && !seen.has(key)) {
            seen.add(key);
            results.push({
              id: key,
              title: key.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
              type: 'general',
              discipline: query.discipline || 'General',
              resourceType: 'general',
              relevanceScore: 0.5,
              matchHighlights: ['Matches your search query'],
              educationContext: { subject: query.topic },
            });
          }
        }
      }
    } catch {
      // silent
    }

    // Add contextual results based on detected intent and entities
    if (query.disease) {
      results.push(this.createContextualResult(
        `Clinical Case: ${query.disease}`,
        `Learn about ${query.disease} through clinical cases`,
        'clinical_case',
        query.discipline || 'Clinical Medicine',
        0.9,
        [`Study the clinical presentation and management of ${query.disease}`],
        { disease: query.disease },
      ));
      results.push(this.createContextualResult(
        `Treatment Guidelines: ${query.disease}`,
        `Standard treatment protocols for ${query.disease}`,
        'guideline',
        query.discipline || 'Clinical Medicine',
        0.85,
        [`Evidence-based management of ${query.disease}`],
        { disease: query.disease },
      ));
    }

    if (query.drug) {
      results.push(this.createContextualResult(
        `Drug Profile: ${query.drug}`,
        `Complete pharmacological profile of ${query.drug}`,
        'drug_info',
        'Pharmacology',
        0.95,
        [`Mechanism, indications, dosing, and safety of ${query.drug}`],
        { drug: query.drug },
      ));
      results.push(this.createContextualResult(
        `Flashcards: ${query.drug}`,
        `Review key facts about ${query.drug}`,
        'flashcard',
        'Pharmacology',
        0.8,
        [`Active recall flashcards for ${query.drug}`],
        { drug: query.drug },
      ));
    }

    if (query.topic && query.topic !== 'General') {
      results.push(this.createContextualResult(
        `Study Guide: ${query.topic}`,
        `Comprehensive study materials for ${query.topic}`,
        'study_guide',
        query.discipline || 'General',
        0.75,
        [`Study ${query.topic} with structured guides`],
        { subject: query.topic },
      ));
      results.push(this.createContextualResult(
        `Quiz: ${query.topic}`,
        `Test your knowledge of ${query.topic}`,
        'quiz',
        query.discipline || 'General',
        0.7,
        [`Practice questions for ${query.topic}`],
        { subject: query.topic },
      ));
    }

    // Sort by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    return results;
  }

  private searchInObject(
    obj: any,
    key: string,
    lowerQuery: string,
    results: SmartSearchResult[],
    seen: Set<string>,
    query: SmartSearchQuery,
  ): void {
    if (!obj || typeof obj !== 'object') return;

    // Check for title/id based dedup
    const objId = obj.id || obj.title || key;
    if (seen.has(String(objId))) return;

    // Look for matching fields
    const searchableFields = ['title', 'name', 'description', 'question', 'answer', 'content', 'text', 'label'];
    let matched = false;
    let highlights: string[] = [];

    for (const field of searchableFields) {
      if (obj[field] && typeof obj[field] === 'string') {
        if (obj[field].toLowerCase().includes(lowerQuery)) {
          matched = true;
          const snippet = obj[field].substring(
            Math.max(0, obj[field].toLowerCase().indexOf(lowerQuery) - 30),
            Math.min(obj[field].length, obj[field].toLowerCase().indexOf(lowerQuery) + lowerQuery.length + 60),
          );
          highlights.push(snippet);
        }
      }
    }

    // Search in tags and keywords
    const tagFields = ['tags', 'keywords', 'categories'];
    for (const field of tagFields) {
      if (Array.isArray(obj[field])) {
        for (const tag of obj[field]) {
          if (String(tag).toLowerCase().includes(lowerQuery)) {
            matched = true;
            highlights.push(`Found in ${field}: ${tag}`);
          }
        }
      }
    }

    if (matched) {
      seen.add(String(objId));
      const resourceType = this.detectResourceType(obj);

      results.push({
        id: String(objId),
        title: obj.title || obj.name || obj.question || String(objId),
        description: obj.description || obj.answer || obj.content || '',
        type: obj.type || resourceType,
        discipline: obj.discipline || obj.learningArea || query.discipline || 'General',
        resourceType,
        relevanceScore: this.calculateRelevance(obj, lowerQuery),
        matchHighlights: highlights.slice(0, 3),
        educationContext: {
          subject: obj.subject || obj.topic || query.topic,
          disease: obj.disease || query.disease,
          drug: obj.drug || query.drug,
        },
        metadata: obj,
      });
    }

    // Recurse into nested objects
    for (const val of Object.values(obj)) {
      if (typeof val === 'object' && val !== null) {
        this.searchInObject(val, key, lowerQuery, results, seen, query);
      }
    }
  }

  // ============================================================
  // Helpers
  // ============================================================

  private detectResourceType(obj: any): SmartSearchResult['resourceType'] {
    if (obj.type === 'flashcard' || obj.question) return 'flashcard';
    if (obj.type === 'quiz' || obj.options) return 'quiz';
    if (obj.type === 'clinical_case' || obj.patientPresentation) return 'clinical_case';
    if (obj.type === 'guideline' || obj.protocol) return 'guideline';
    if (obj.documentType?.includes('Guideline')) return 'guideline';
    if (obj.documentType?.includes('Textbook')) return 'book';
    if (obj.documentType?.includes('Note') || obj.type === 'note') return 'note';
    if (obj.type === 'study_guide' || obj.summary) return 'study_guide';
    if (obj.type === 'revision_note') return 'revision_note';
    if (obj.drug || obj.dose) return 'drug_info';
    return 'general';
  }

  private calculateRelevance(obj: any, lowerQuery: string): number {
    let score = 0.5;

    // Title match is strong
    if (obj.title?.toLowerCase().includes(lowerQuery)) score += 0.3;
    if (obj.title?.toLowerCase() === lowerQuery) score += 0.2;

    // Tag/keyword match
    if (obj.tags?.some((t: string) => t.toLowerCase().includes(lowerQuery))) score += 0.15;
    if (obj.keywords?.some((k: string) => k.toLowerCase().includes(lowerQuery))) score += 0.15;

    // Description match
    if (obj.description?.toLowerCase().includes(lowerQuery)) score += 0.1;

    // Recency boost
    if (obj.updatedAt || obj.createdAt || obj.uploadedAt) {
      const ts = obj.updatedAt || obj.createdAt || obj.uploadedAt;
      const daysAgo = (Date.now() - ts) / (1000 * 60 * 60 * 24);
      if (daysAgo < 7) score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  private createContextualResult(
    title: string,
    description: string,
    resourceType: SmartSearchResult['resourceType'],
    discipline: string,
    relevanceScore: number,
    highlights: string[],
    context?: Partial<EducationalContext>,
  ): SmartSearchResult {
    const id = `ctx_${resourceType}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    return {
      id,
      title,
      description,
      type: resourceType,
      discipline,
      resourceType,
      relevanceScore,
      matchHighlights: highlights,
      educationContext: context,
    };
  }

  // ============================================================
  // Topic Suggestions
  // ============================================================

  suggestTopics(query: SmartSearchQuery): string[] {
    const suggestions: string[] = [];

    if (query.disease) {
      suggestions.push(`${query.disease} treatment guidelines`);
      suggestions.push(`${query.disease} pathophysiology`);
      suggestions.push(`${query.disease} pharmacology`);
    }

    if (query.drug) {
      suggestions.push(`${query.drug} mechanism of action`);
      suggestions.push(`${query.drug} side effects`);
      suggestions.push(`${query.drug} dosing guidelines`);
    }

    if (query.topic && query.topic !== 'General') {
      suggestions.push(`${query.topic} study notes`);
      suggestions.push(`${query.topic} practice questions`);
    }

    return suggestions.slice(0, 5);
  }

  // ============================================================
  // "Did You Mean" Suggestions
  // ============================================================

  private checkDidYouMean(query: string): string | undefined {
    const lower = query.toLowerCase();
    const corrections: Record<string, string> = {
      'hypertenstion': 'hypertension',
      'diabeties': 'diabetes',
      'maleria': 'malaria',
      'tuburculosis': 'tuberculosis',
      'pnemonia': 'pneumonia',
      'menengitis': 'meningitis',
      'ostioporosis': 'osteoporosis',
      'artheritis': 'arthritis',
      'epilepcy': 'epilepsy',
      'parkinsons': "parkinson's disease",
      'alzheimers': "alzheimer's disease",
      'schitzophrenia': 'schizophrenia',
      'paracetemol': 'paracetamol',
      'ibeprofen': 'ibuprofen',
      'amoxacillin': 'amoxicillin',
      'metroindazole': 'metronidazole',
      'omeprazole': 'omeprazole',
      'atorvastin': 'atorvastatin',
      'amalodipine': 'amlodipine',
      'metformim': 'metformin',
      'warfrin': 'warfarin',
      'clopidogril': 'clopidogrel',
      'frusemide': 'furosemide',
      'spironolacton': 'spironolactone',
      'salbutimol': 'salbutamol',
      'prednisolon': 'prednisolone',
      'ceftriaxone': 'ceftriaxone',
      'azithromicin': 'azithromycin',
      'ciprofloxacim': 'ciprofloxacin',
    };

    for (const [wrong, correct] of Object.entries(corrections)) {
      if (lower.includes(wrong)) {
        return correct;
      }
    }

    return undefined;
  }

  // ============================================================
  // Categorize Search Results
  // ============================================================

  categorizeResults(results: SmartSearchResult[]): Record<string, SmartSearchResult[]> {
    const categorized: Record<string, SmartSearchResult[]> = {};

    for (const result of results) {
      const category = result.resourceType;
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(result);
    }

    return categorized;
  }
}

// ============================================================
// Singleton Export
// ============================================================
export const smartSearch = SmartSearch.getInstance();
