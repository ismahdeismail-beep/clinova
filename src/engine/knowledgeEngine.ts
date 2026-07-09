// ============================================================
// Clinova Unified AI Knowledge Engine
// Central educational reasoning layer for all AI features
// Every AI-powered feature shares this same reasoning engine.
// ============================================================

import { generateContentWithFallback } from '../server/aiRouter';

// ============================================================
// Educational Context — detected before any AI response
// ============================================================

export interface EducationalContext {
  learningArea: string;
  subject: string;
  unit: string;
  topic: string;
  subtopic: string;
  disease?: string;
  drug?: string;
  therapeuticArea?: string;
  clinicalSpecialty?: string;
  educationalLevel: string;
  availableResources: string[];
  queryType: 'concept_explanation' | 'clinical_case' | 'drug_info' | 'guideline' | 'comparison' | 'study_material' | 'practice_question' | 'general';
}

// ============================================================
// AI Recommendations
// ============================================================

export interface AIRecommendation {
  type: 'book' | 'note' | 'guideline' | 'clinical_case' | 'drug' | 'disease' | 'flashcard' | 'oral_practice' | 'quiz' | 'study_guide' | 'revision_note';
  title: string;
  resourceId?: string;
  relevance: number;
  reason: string;
}

// ============================================================
// Knowledge Engine Response
// ============================================================

export interface KnowledgeEngineResponse {
  context: EducationalContext;
  content: string;
  recommendations: AIRecommendation[];
  confidence: number;
  sources: string[];
}

// ============================================================
// Learning Areas Knowledge Base
// ============================================================

const LEARNING_AREAS = [
  'Clinical Pharmacy', 'Pharmacology', 'Therapeutics', 'Pharmaceutical Chemistry',
  'Medicinal Chemistry', 'Pharmaceutics', 'Pharmaceutical Analysis', 'Pharmacognosy',
  'Organic Chemistry', 'Anatomy', 'Physiology', 'Biochemistry', 'Pathology',
  'Microbiology', 'Immunology', 'Public Health', 'Research Methods',
  'Supporting Biomedical Sciences',
];

const INTELLIGENT_UNITS: Record<string, string[]> = {
  Pharmacology: [
    'General Pharmacology', 'Autonomic Pharmacology', 'Cardiovascular Pharmacology',
    'Central Nervous System Pharmacology', 'Respiratory Pharmacology',
    'Renal Pharmacology', 'Gastrointestinal Pharmacology', 'Endocrine Pharmacology',
    'Vitamins', 'Chemotherapy', 'Antimicrobial Pharmacology', 'Toxicology',
    'Oncology Pharmacology', 'Dermatological Pharmacology', 'Ophthalmic Pharmacology',
    'Veterinary Pharmacology',
  ],
  'Clinical Pharmacy': [
    'Introduction to Clinical Pharmacy', 'Drug Information Services',
    'Clinical Pharmacokinetics', 'Therapeutic Drug Monitoring',
    'Drug Utilization Evaluation', 'Clinical Pharmacy in Internal Medicine',
    'Clinical Pharmacy in Surgery', 'Clinical Pharmacy in Pediatrics',
    'Clinical Pharmacy in Geriatrics', 'Clinical Pharmacy in Oncology',
    'Pharmaceutical Care', 'Medication Therapy Management',
    'Pharmacovigilance', 'Pharmacoeconomics',
  ],
  Physiology: [
    'General Physiology', 'Cardiovascular Physiology', 'Renal Physiology',
    'Respiratory Physiology', 'Endocrine Physiology', 'Gastrointestinal Physiology',
    'Nervous System Physiology', 'Reproductive Physiology',
  ],
  Pathology: [
    'General Pathology', 'Systemic Pathology', 'Histopathology', 'Clinical Pathology',
    'Inflammation', 'Neoplasia', 'Genetic Disorders', 'Immunopathology',
  ],
  Biochemistry: [
    'Human Biochemistry', 'Clinical Biochemistry', 'Molecular Biology',
    'Metabolism', 'Enzymology', 'Carbohydrates', 'Lipids', 'Proteins',
    'Nucleic Acids', 'Vitamins and Minerals',
  ],
};

const DISEASE_DRUG_MAP: Record<string, string[]> = {
  Hypertension: ['ACE Inhibitors', 'ARBs', 'Calcium Channel Blockers', 'Diuretics', 'Beta Blockers'],
  Diabetes: ['Insulin', 'Metformin', 'Sulfonylureas', 'DPP-4 Inhibitors', 'SGLT2 Inhibitors', 'GLP-1 Agonists'],
  Asthma: ['Beta-2 Agonists', 'Corticosteroids', 'Leukotriene Antagonists', 'Theophylline', 'Anticholinergics'],
  Malaria: ['Artemisinin-based Combination Therapies', 'Chloroquine', 'Quinine'],
  Tuberculosis: ['Rifampicin', 'Isoniazid', 'Pyrazinamide', 'Ethambutol', 'Streptomycin'],
  HIV: ['NRTIs', 'NNRTIs', 'Protease Inhibitors', 'Integrase Inhibitors'],
  'Heart Failure': ['ACE Inhibitors', 'Beta Blockers', 'Diuretics', 'Digoxin', 'Spironolactone'],
  Pneumonia: ['Penicillins', 'Cephalosporins', 'Macrolides', 'Fluoroquinolones'],
  Pain: ['NSAIDs', 'Paracetamol', 'Opioids', 'Adjuvant Analgesics'],
  Depression: ['SSRIs', 'SNRIs', 'TCAs', 'MAOIs'],
};

// ============================================================
// Educational Level Detection
// ============================================================

const LEVEL_KEYWORDS: Record<string, RegExp[]> = {
  '1st Year': [/year\s*1\b/i, /1st\s*year/i, /first\s*year/i, /introductory?/i, /basic/i, /fundamental/i],
  '2nd Year': [/year\s*2\b/i, /2nd\s*year/i, /second\s*year/i, /intermediate/i],
  '3rd Year': [/year\s*3\b/i, /3rd\s*year/i, /third\s*year/i],
  '4th Year': [/year\s*4\b/i, /4th\s*year/i, /fourth\s*year/i, /advanced/i],
  '5th Year': [/year\s*5\b/i, /5th\s*year/i, /fifth\s*year/i, /clinical/i],
  Postgraduate: [/postgraduate/i, /residency/i, /fellow/i, /specialist/i, /masters/i, /phd/i],
};

// ============================================================
// Query Type Detection
// ============================================================

const QUERY_PATTERNS: Array<{ pattern: RegExp; type: EducationalContext['queryType'] }> = [
  { pattern: /\b(what is|define|explain|describe|how does\s+\w+\s+work)\b/i, type: 'concept_explanation' },
  { pattern: /\b(patient|case|scenario|clinical\s+presentation|diagnosis|treatment\s+plan)\b/i, type: 'clinical_case' },
  { pattern: /\b(dose|dosage|indication|contraindication|side.?effect|interaction|drug|medication)\b/i, type: 'drug_info' },
  { pattern: /\b(guideline|protocol|standard|recommendation|first.?line|stg|who)\b/i, type: 'guideline' },
  { pattern: /\b(compare|difference|vs\.?|versus|similar|differentiate)\b/i, type: 'comparison' },
  { pattern: /\b(flashcard|quiz|mcq|question|practice|test|exam|revision|study\s*guide)\b/i, type: 'study_material' },
  { pattern: /\b(orally|oral|viva|examiner|ask\s*me)\b/i, type: 'practice_question' },
];

// ============================================================
// Knowledge Engine — Main Class
// ============================================================

export class KnowledgeEngine {
  private static instance: KnowledgeEngine;
  private contextCache: Map<string, EducationalContext> = new Map();

  static getInstance(): KnowledgeEngine {
    if (!KnowledgeEngine.instance) {
      KnowledgeEngine.instance = new KnowledgeEngine();
    }
    return KnowledgeEngine.instance;
  }

  // ============================================================
  // Core Method: Process Any Query
  // ============================================================
  async processQuery(
    query: string,
    options?: {
      discipline?: string;
      unit?: string;
      educationalLevel?: string;
      chatHistory?: Array<{ role: string; content: string }>;
      attachedResources?: string[];
    },
  ): Promise<KnowledgeEngineResponse> {
    // Step 1: Detect educational context
    const context = this.detectContext(query);

    // Step 2: Override with explicit options if provided
    if (options?.discipline) context.learningArea = options.discipline;
    if (options?.unit) context.unit = options.unit;
    if (options?.educationalLevel) context.educationalLevel = options.educationalLevel;
    if (options?.attachedResources) {
      context.availableResources = [
        ...new Set([...context.availableResources, ...options.attachedResources]),
      ];
    }

    // Step 3: Generate recommendations
    const recommendations = await this.generateRecommendations(context);

    // Step 4: Generate AI response
    const { content, confidence, sources } = await this.generateResponse(context, query, options?.chatHistory);

    return {
      context,
      content,
      recommendations,
      confidence,
      sources,
    };
  }

  // ============================================================
  // Educational Context Detection
  // ============================================================
  detectContext(query: string, userHistory?: string[]): EducationalContext {
    const combined = [query, ...(userHistory || [])].join(' ').toLowerCase();

    // Detect learning area
    let learningArea = this.matchLearningArea(combined);
    let subject = this.matchSubject(combined, learningArea);
    let unit = this.matchUnit(combined, learningArea);

    // Detect disease
    const disease = this.matchDisease(combined);

    // Detect drug
    const drug = this.matchDrug(combined);

    // Detect educational level
    const educationalLevel = this.matchEducationalLevel(combined);

    // Detect query type
    const queryType = this.matchQueryType(combined);

    // Detect therapeutic area
    const therapeuticArea = this.matchTherapeuticArea(combined, disease);

    return {
      learningArea,
      subject,
      unit,
      topic: subject,
      subtopic: unit,
      disease,
      drug,
      therapeuticArea,
      clinicalSpecialty: therapeuticArea,
      educationalLevel,
      availableResources: [],
      queryType,
    };
  }

  private matchLearningArea(text: string): string {
    const scores: Record<string, number> = {};

    for (const area of LEARNING_AREAS) {
      let score = 0;
      const lower = area.toLowerCase();
      if (text.includes(lower)) score += 5;
      // Check for keywords related to each area
      if (area === 'Pharmacology' && /\b(pharmacology|drug\s*action|receptor|mechanism|pharmacokinetics|pharmacodynamics)\b/i.test(text)) score += 3;
      if (area === 'Clinical Pharmacy' && /\b(clinical\s*pharmacy|pharmaceutical\s*care|drug\s*information|medication\s*therapy)\b/i.test(text)) score += 3;
      if (area === 'Pharmaceutics' && /\b(formulation|dosage\s*form|tablet|capsule|injection|bioavailability|dissolution)\b/i.test(text)) score += 3;
      if (area === 'Physiology' && /\b(physiology|organ\s*system|homeostasis|function)\b/i.test(text)) score += 3;
      if (area === 'Pathology' && /\b(pathology|disease|inflammation|neoplasia|infection)\b/i.test(text)) score += 3;
      if (area === 'Biochemistry' && /\b(biochemistry|enzyme|metabolism|protein|carbohydrate|lipid)\b/i.test(text)) score += 3;
      if (area === 'Microbiology' && /\b(microbiology|bacteria|virus|fungus|antibiotic|infection)\b/i.test(text)) score += 3;
      if (area === 'Public Health' && /\b(public\s*health|epidemiology|prevention|health\s*promotion)\b/i.test(text)) score += 3;
      scores[area] = score;
    }

    let best = 'Clinical Pharmacy';
    let bestScore = 0;
    for (const [area, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        best = area;
      }
    }
    return best;
  }

  private matchSubject(text: string, learningArea: string): string {
    const units = INTELLIGENT_UNITS[learningArea];
    if (!units) return 'General ' + learningArea;

    for (const unit of units) {
      if (text.includes(unit.toLowerCase())) return unit;
    }
    return units[0] || 'General ' + learningArea;
  }

  private matchUnit(text: string, learningArea: string): string {
    const units = INTELLIGENT_UNITS[learningArea];
    if (!units) return 'General';

    for (const unit of units) {
      if (text.includes(unit.toLowerCase())) return unit;
    }
    return units[0] || 'General';
  }

  private matchDisease(text: string): string | undefined {
    const diseases = Object.keys(DISEASE_DRUG_MAP);
    for (const disease of diseases) {
      if (text.includes(disease.toLowerCase())) return disease;
    }

    // Additional disease detection
    const additionalDiseases = [
      'malaria', 'tuberculosis', 'hiv', 'aids', 'pneumonia', 'bronchitis',
      'copd', 'asthma', 'hypertension', 'heart failure', 'arrhythmia',
      'angina', 'myocardial infarction', 'stroke', 'diabetes', 'thyroid',
      'anemia', 'leukemia', 'cancer', 'carcinoma', 'hepatitis', 'cirrhosis',
      'renal failure', 'uti', 'meningitis', 'osteoporosis', 'arthritis',
      'gout', 'peptic ulcer', 'gerd', 'epilepsy', 'parkinson', 'alzheimer',
      'depression', 'schizophrenia', 'bipolar', 'anxiety', 'insomnia',
    ];
    for (const disease of additionalDiseases) {
      if (text.includes(disease)) return disease.charAt(0).toUpperCase() + disease.slice(1);
    }
    return undefined;
  }

  private matchDrug(text: string): string | undefined {
    const allDrugs = new Set<string>();
    for (const drugs of Object.values(DISEASE_DRUG_MAP)) {
      for (const drug of drugs) allDrugs.add(drug.toLowerCase());
    }

    // Common generic drug names
    const commonDrugs = [
      'paracetamol', 'ibuprofen', 'aspirin', 'amoxicillin', 'metronidazole',
      'omeprazole', 'atorvastatin', 'lisinopril', 'amlodipine', 'metformin',
      'insulin', 'warfarin', 'clopidogrel', 'furosemide', 'spironolactone',
      'salbutamol', 'prednisolone', 'ceftriaxone', 'azithromycin', 'ciprofloxacin',
    ];
    for (const drug of commonDrugs) {
      if (text.includes(drug)) return drug.charAt(0).toUpperCase() + drug.slice(1);
    }
    return undefined;
  }

  private matchEducationalLevel(text: string): string {
    for (const [level, patterns] of Object.entries(LEVEL_KEYWORDS)) {
      for (const pattern of patterns) {
        if (pattern.test(text)) return level;
      }
    }
    return 'General';
  }

  private matchQueryType(text: string): EducationalContext['queryType'] {
    for (const { pattern, type } of QUERY_PATTERNS) {
      if (pattern.test(text)) return type;
    }
    return 'general';
  }

  private matchTherapeuticArea(text: string, disease?: string): string | undefined {
    const areaMap: Record<string, string> = {
      'hypertension': 'Cardiovascular',
      'heart failure': 'Cardiovascular',
      'angina': 'Cardiovascular',
      'arrhythmia': 'Cardiovascular',
      'asthma': 'Respiratory',
      'copd': 'Respiratory',
      'pneumonia': 'Respiratory',
      'diabetes': 'Endocrine',
      'thyroid': 'Endocrine',
      'malaria': 'Infectious Diseases',
      'tuberculosis': 'Infectious Diseases',
      'hiv': 'Infectious Diseases',
      'depression': 'Central Nervous System',
      'epilepsy': 'Central Nervous System',
      'parkinson': 'Central Nervous System',
      'alzheimer': 'Central Nervous System',
      'cancer': 'Oncology',
      'leukemia': 'Oncology',
      'arthritis': 'Musculoskeletal',
      'osteoporosis': 'Musculoskeletal',
    };

    if (disease) {
      const lower = disease.toLowerCase();
      for (const [key, area] of Object.entries(areaMap)) {
        if (lower.includes(key) || lower === key) return area;
      }
    }
    for (const [key, area] of Object.entries(areaMap)) {
      if (text.includes(key)) return area;
    }
    return undefined;
  }

  // ============================================================
  // Generate AI Recommendations
  // ============================================================
  async generateRecommendations(context: EducationalContext): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = [];
    const keywords = [context.learningArea, context.subject, context.unit, context.disease, context.drug].filter(Boolean);

    // Generate recommendations based on context
    if (context.disease) {
      recommendations.push({
        type: 'clinical_case',
        title: `Clinical Cases in ${context.disease}`,
        relevance: 0.95,
        reason: `Study clinical cases related to ${context.disease} to apply your knowledge`,
      });
      const drugs = DISEASE_DRUG_MAP[context.disease];
      if (drugs) {
        recommendations.push({
          type: 'drug',
          title: `Drugs Used in ${context.disease}`,
          relevance: 0.9,
          reason: `Review the pharmacological management of ${context.disease}`,
        });
      }
    }

    if (context.drug) {
      recommendations.push({
        type: 'quiz',
        title: `Quiz on ${context.drug}`,
        relevance: 0.85,
        reason: `Test your knowledge about ${context.drug}`,
      });
      recommendations.push({
        type: 'flashcard',
        title: `Flashcards: ${context.drug}`,
        relevance: 0.8,
        reason: `Review key facts about ${context.drug}`,
      });
    }

    // Topic-based recommendations
    recommendations.push({
      type: 'study_guide',
      title: `Study Guide: ${context.subject}`,
      relevance: 0.75,
      reason: `Get a comprehensive study guide for ${context.subject}`,
    });
    recommendations.push({
      type: 'revision_note',
      title: `Revision Notes: ${context.unit}`,
      relevance: 0.7,
      reason: `Quick revision notes for ${context.unit}`,
    });
    recommendations.push({
      type: 'oral_practice',
      title: `Oral Practice: ${context.subject}`,
      relevance: 0.65,
      reason: `Practice answering questions about ${context.subject}`,
    });

    return recommendations;
  }

  // ============================================================
  // Generate Educational AI Response
  // ============================================================
  async generateResponse(
    context: EducationalContext,
    query: string,
    chatHistory?: Array<{ role: string; content: string }>,
  ): Promise<{ content: string; confidence: number; sources: string[] }> {
    const systemPrompt = this.buildSystemPrompt(context);
    const userPrompt = this.buildUserPrompt(context, query);

    try {
      const response = await generateContentWithFallback({
        contents: [
          ...(chatHistory?.map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
          })) || []),
          { role: 'user', parts: [{ text: userPrompt }] },
        ],
        config: {
          systemInstruction: systemPrompt,
        },
      });

      return {
        content: response.text || '',
        confidence: 0.85,
        sources: [`Clinova Knowledge Engine — ${context.learningArea}`, context.disease ? `Medical Reference for ${context.disease}` : ''].filter(Boolean),
      };
    } catch (error) {
      console.error('[KnowledgeEngine] AI response generation failed:', error);
      return {
        content: this.generateFallbackResponse(context, query),
        confidence: 0.5,
        sources: ['Clinova Knowledge Engine — Fallback Response'],
      };
    }
  }

  // ============================================================
  // System Prompt Builder — Teaches AI how to behave
  // ============================================================
  private buildSystemPrompt(context: EducationalContext): string {
    return `You are Clinova's Educational Intelligence System — an expert educator and clinical preceptor.

You are teaching in the area of **${context.learningArea}**, specifically **${context.subject}** (${context.unit}).
The learner is at **${context.educationalLevel}** level.

## Educational Philosophy
- Teach progressively: build from fundamentals to clinical application
- Connect related concepts across disciplines
- Link theory to clinical practice
- Explain the WHY behind every concept
- Use evidence-based medicine principles
- Encourage deeper understanding, not memorization

## Response Guidelines
${context.disease ? `- When discussing ${context.disease}, cover: etiology, pathophysiology, clinical presentation, diagnosis, pharmacological management, monitoring, and patient counselling` : ''}
${context.drug ? `- When discussing ${context.drug}, cover: mechanism of action, indications, contraindications, adverse effects, drug interactions, dosing, and monitoring parameters` : ''}
- Use the Kenya Drug Index (KDI), WHO Essential Medicines, and international guidelines as references
- Include clinical pearls and high-yield facts
- Suggest additional learning resources when appropriate
- Adapt complexity to ${context.educationalLevel} level

## Teaching Approach
Function like an experienced educator who:
1. Assesses what the learner already knows
2. Builds new knowledge on existing foundations
3. Connects theory to real clinical practice
4. Identifies and corrects misconceptions
5. Encourages critical thinking and clinical reasoning`;
  }

  // ============================================================
  // User Prompt Builder
  // ============================================================
  private buildUserPrompt(context: EducationalContext, query: string): string {
    let prompt = `Educational Context:
- Learning Area: ${context.learningArea}
- Subject: ${context.subject}
- Unit: ${context.unit}
- Educational Level: ${context.educationalLevel}
${context.disease ? `- Disease: ${context.disease}` : ''}
${context.drug ? `- Drug: ${context.drug}` : ''}
${context.therapeuticArea ? `- Therapeutic Area: ${context.therapeuticArea}` : ''}

Student Query: ${query}

Please provide a comprehensive, educationally appropriate response following the guidelines above.`;

    return prompt;
  }

  // ============================================================
  // Fallback Response (when AI is unavailable)
  // ============================================================
  private generateFallbackResponse(context: EducationalContext, query: string): string {
    const parts: string[] = [];

    parts.push(`## Educational Context\n`);
    parts.push(`**Learning Area:** ${context.learningArea}`);
    parts.push(`**Subject:** ${context.subject}`);
    parts.push(`**Unit:** ${context.unit}`);
    parts.push(`**Level:** ${context.educationalLevel}`);
    if (context.disease) parts.push(`**Disease:** ${context.disease}`);
    if (context.drug) parts.push(`**Drug:** ${context.drug}`);
    parts.push('');

    parts.push(`## Response\n`);
    parts.push(`I understand you're asking about "${query}" in the context of ${context.subject}.`);
    parts.push('');
    parts.push(`To provide a comprehensive educational response, I would typically cover:`);
    parts.push('');

    if (context.queryType === 'concept_explanation') {
      parts.push('1. **Core Concept Definition** — What it is and why it matters');
      parts.push('2. **Physiological/Pharmacological Basis** — The mechanism behind it');
      parts.push('3. **Clinical Application** — How this applies in practice');
      parts.push('4. **Key Points to Remember** — High-yield facts for exams');
    } else if (context.queryType === 'drug_info' && context.drug) {
      parts.push(`1. **Pharmacology of ${context.drug}** — Mechanism of action, classification`);
      parts.push(`2. **Clinical Use** — Indications, dosing, route of administration`);
      parts.push(`3. **Safety Profile** — Contraindications, adverse effects, interactions`);
      parts.push(`4. **Monitoring Parameters** — What to watch for during therapy`);
    } else if (context.queryType === 'clinical_case' && context.disease) {
      parts.push(`1. **Pathophysiology of ${context.disease}** — Understanding the disease process`);
      parts.push(`2. **Clinical Presentation** — Signs, symptoms, and diagnostic criteria`);
      parts.push(`3. **Management Approach** — Treatment guidelines and algorithm`);
      parts.push(`4. **Monitoring and Follow-up** — Assessing treatment response`);
    } else {
      parts.push(`1. **Fundamental Concepts** — Building the foundation`);
      parts.push(`2. **Key Details** — Important information about ${context.subject}`);
      parts.push(`3. **Clinical Relevance** — How this applies to practice`);
      parts.push(`4. **Study Tips** — How to master this topic`);
    }

    parts.push('');
    parts.push(`> 💡 **Tip:** For a more detailed response with AI-generated content, ensure the AI service is properly configured.`);

    return parts.join('\n');
  }

  // ============================================================
  // Suggest Learning Path
  // ============================================================
  suggestLearningPath(currentContext: EducationalContext): { next: string[]; rationale: string } {
    const connectedAreas: Record<string, string[]> = {
      Pharmacology: ['Clinical Pharmacy', 'Therapeutics', 'Clinical Cases'],
      'Clinical Pharmacy': ['Pharmacology', 'Therapeutics', 'Drug Information'],
      Physiology: ['Pathology', 'Pharmacology', 'Clinical Medicine'],
      Pathology: ['Pharmacology', 'Clinical Medicine', 'Clinical Cases'],
      Biochemistry: ['Physiology', 'Pharmacology', 'Pathology'],
      Microbiology: ['Pharmacology', 'Clinical Medicine', 'Public Health'],
    };

    const nextSteps = connectedAreas[currentContext.learningArea] || [];
    return {
      next: nextSteps.length > 0 ? nextSteps.map((a) => `Study ${a} related to ${currentContext.subject}`) : [`Deepen your understanding of ${currentContext.subject}`],
      rationale: `Based on your current study of ${currentContext.subject}, these interconnected areas will reinforce your learning and build a comprehensive understanding.`,
    };
  }
}

// ============================================================
// Singleton Export
// ============================================================
export const knowledgeEngine = KnowledgeEngine.getInstance();
