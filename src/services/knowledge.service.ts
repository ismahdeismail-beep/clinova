// ============================================================
// Clinova Knowledge Base Service
// Classification, ingestion, search, and AI metadata generation
// for free/open medical and pharmacy educational resources.
// ============================================================

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  type ResourceMetadata,
  type ClinicalCase,
  type Discipline,
  type DocumentType,
  type EducationalLevel,
  type SearchFilters,
  type SearchResult,
  type IngestionOptions,
  type BatchIngestionResult,
  type ResourceSource,
  type AIMetadata,
  type DuplicateInfo,
  DISCIPLINES,
  SUB_DISCIPLINES,
  DOCUMENT_TYPES,
  DISCIPLINE_MODULE_MAP,
} from '../types/knowledge';

// ============================================================
// Firestore Collection Names
// ============================================================
const KB_RESOURCES = 'kb_resources';
const KB_CLINICAL_CASES = 'kb_clinical_cases';
const KB_SEARCH_INDEX = 'kb_search_index';
const KB_INGESTION_LOG = 'kb_ingestion_log';

// ============================================================
// Keyword-based Discipline Classifier
// Uses weighted keyword matching to detect the discipline
// and sub-discipline of a medical resource from its title,
// description, and content keywords.
// ============================================================

interface ClassificationResult {
  discipline: Discipline;
  subDiscipline: string;
  documentType: DocumentType;
  educationalLevel: EducationalLevel[];
  confidence: number;
  tags: string[];
}

const DISCIPLINE_KEYWORDS: Record<Discipline, { keywords: string[]; weight: number }[]> = {
  Pharmacy: [
    { keywords: ['clinical pharmacy', 'hospital pharmacy', 'community pharmacy', 'pharmacy practice', 'pharmaceutical care'], weight: 10 },
    { keywords: ['pharmacoeconomics', 'pharmacovigilance', 'drug information', 'pharmacy law', 'pharmacy ethics'], weight: 8 },
    { keywords: ['pharmacist', 'dispensing', 'prescription', 'over the counter', 'otc'], weight: 6 },
    { keywords: ['formulary', 'kenya drug index', 'kdi', 'essential medicines'], weight: 7 },
  ],
  Pharmacology: [
    { keywords: ['pharmacology', 'pharmacokinetics', 'pharmacodynamics', 'drug action', 'receptor'], weight: 10 },
    { keywords: ['autonomic', 'cardiovascular pharmacology', 'cns pharmacology', 'endocrine pharmacology'], weight: 8 },
    { keywords: ['chemotherapy', 'antimicrobial', 'antibiotic', 'antiviral', 'antifungal', 'antimalarial'], weight: 8 },
    { keywords: ['toxicology', 'adverse drug', 'side effect', 'drug interaction', 'contraindication'], weight: 7 },
  ],
  Pharmaceutics: [
    { keywords: ['dosage form', 'drug delivery', 'biopharmaceutics', 'physical pharmacy'], weight: 10 },
    { keywords: ['tablet', 'capsule', 'injection', 'ointment', 'cream', 'suppository', 'aerosol'], weight: 8 },
    { keywords: ['formulation', 'manufacturing', 'quality assurance', 'sterile preparation', 'compounding'], weight: 8 },
    { keywords: ['dissolution', 'bioavailability', 'excipient', 'stability'], weight: 7 },
  ],
  'Pharmaceutical Chemistry': [
    { keywords: ['medicinal chemistry', 'drug design', 'structure activity relationship', 'sar'], weight: 10 },
    { keywords: ['drug synthesis', 'pharmaceutical chemistry', 'organic synthesis', 'lead optimization'], weight: 9 },
    { keywords: ['qsar', 'molecular modeling', 'drug discovery', 'hit to lead'], weight: 8 },
  ],
  'Organic Chemistry': [
    { keywords: ['organic chemistry', 'reaction mechanism', 'functional group'], weight: 10 },
    { keywords: ['spectroscopy', 'nmr', 'ir spectroscopy', 'mass spectrometry', 'chromatography'], weight: 8 },
    { keywords: ['alkane', 'alkene', 'alkyne', 'alcohol', 'aldehyde', 'ketone', 'carboxylic acid'], weight: 7 },
  ],
  'Pharmaceutical Analysis': [
    { keywords: ['analytical chemistry', 'instrumental analysis', 'pharmaceutical analysis'], weight: 10 },
    { keywords: ['spectroscopy', 'chromatography', 'hplc', 'gc', 'uv-vis', 'titration'], weight: 9 },
    { keywords: ['quality control', 'assay', 'purity', 'validation', 'pharmacopoeia'], weight: 8 },
  ],
  Pharmacognosy: [
    { keywords: ['pharmacognosy', 'medicinal plant', 'herbal medicine', 'natural product'], weight: 10 },
    { keywords: ['ethnopharmacology', 'phytochemistry', 'alkaloid', 'glycoside', 'essential oil'], weight: 9 },
    { keywords: ['crude drug', 'botanical', 'traditional medicine', 'ayurveda'], weight: 7 },
  ],
  Biochemistry: [
    { keywords: ['biochemistry', 'clinical biochemistry', 'molecular biology'], weight: 10 },
    { keywords: ['metabolism', 'enzyme', 'protein', 'carbohydrate', 'lipid', 'nucleic acid'], weight: 8 },
    { keywords: ['glycolysis', 'krebs cycle', 'electron transport chain', 'dna replication'], weight: 7 },
  ],
  Physiology: [
    { keywords: ['physiology', 'human physiology', 'medical physiology'], weight: 10 },
    { keywords: ['cardiovascular', 'renal', 'respiratory', 'endocrine', 'gastrointestinal', 'nervous system'], weight: 8 },
    { keywords: ['homeostasis', 'feedback', 'action potential', 'contraction', 'secretion'], weight: 7 },
  ],
  Anatomy: [
    { keywords: ['anatomy', 'gross anatomy', 'human anatomy'], weight: 10 },
    { keywords: ['histology', 'embryology', 'neuroanatomy'], weight: 8 },
    { keywords: ['muscle', 'bone', 'nerve', 'vessel', 'organ', 'tissue'], weight: 7 },
  ],
  Pathology: [
    { keywords: ['pathology', 'general pathology', 'systemic pathology'], weight: 10 },
    { keywords: ['histopathology', 'clinical pathology', 'disease', 'inflammation', 'neoplasia'], weight: 8 },
    { keywords: ['infection', 'degeneration', 'necrosis', 'apoptosis', 'cancer'], weight: 7 },
  ],
  Microbiology: [
    { keywords: ['microbiology', 'bacteriology', 'virology', 'mycology', 'parasitology'], weight: 10 },
    { keywords: ['immunology', 'vaccine', 'antibody', 'antigen', 'immune system'], weight: 8 },
    { keywords: ['bacteria', 'virus', 'fungus', 'parasite', 'stain', 'culture'], weight: 7 },
  ],
  'Clinical Medicine': [
    { keywords: ['internal medicine', 'surgery', 'pediatrics', 'obstetrics', 'gynecology'], weight: 10 },
    { keywords: ['psychiatry', 'dermatology', 'ophthalmology', 'ent', 'emergency medicine'], weight: 8 },
    { keywords: ['intensive care', 'family medicine', 'geriatrics', 'clinical medicine'], weight: 7 },
  ],
  Diagnostics: [
    { keywords: ['laboratory medicine', 'clinical chemistry', 'diagnostic imaging'], weight: 10 },
    { keywords: ['radiology', 'x-ray', 'ct scan', 'mri', 'ultrasound', 'ecg', 'eeg'], weight: 8 },
    { keywords: ['biopsy', 'pathology lab', 'hematology', 'serology'], weight: 7 },
  ],
  'Public Health': [
    { keywords: ['public health', 'epidemiology', 'biostatistics', 'health promotion'], weight: 10 },
    { keywords: ['global health', 'health system', 'disease prevention', 'community health'], weight: 8 },
    { keywords: ['screening', 'surveillance', 'outbreak', 'vaccination', 'nutrition'], weight: 7 },
  ],
  Research: [
    { keywords: ['research method', 'evidence based medicine', 'clinical trial', 'scientific writing'], weight: 10 },
    { keywords: ['biostatistics', 'critical appraisal', 'systematic review', 'meta analysis'], weight: 8 },
    { keywords: ['study design', 'rct', 'cohort', 'case control', 'p value'], weight: 7 },
  ],
  Nursing: [
    { keywords: ['nursing', 'medical surgical nursing', 'pediatric nursing'], weight: 10 },
    { keywords: ['maternal health', 'mental health nursing', 'nursing care', 'patient care'], weight: 8 },
    { keywords: ['vital sign', 'medication administration', 'wound care'], weight: 7 },
  ],
  Dentistry: [
    { keywords: ['dentistry', 'oral medicine', 'oral surgery', 'preventive dentistry'], weight: 10 },
    { keywords: ['dental', 'tooth', 'caries', 'periodontal', 'orthodontic'], weight: 8 },
  ],
  Nutrition: [
    { keywords: ['nutrition', 'clinical nutrition', 'dietetics', 'community nutrition'], weight: 10 },
    { keywords: ['diet', 'vitamin', 'mineral', 'malnutrition', 'obesity', 'dietary'], weight: 8 },
  ],
};

const DOCUMENT_TYPE_KEYWORDS: { type: DocumentType; patterns: RegExp[] }[] = [
  { type: 'Textbook', patterns: [/textbook/i, /handbook/i, /manual of/i, /principles of/i, /essential of/i, /textbook of/i] },
  { type: 'Textbook Chapter', patterns: [/chapter \d+/i, /introduction to /i, /overview of /i] },
  { type: 'Lecture Notes', patterns: [/lecture notes/i, /lecture/i, /class notes/i, /revision notes/i, /summary notes/i] },
  { type: 'Clinical Guideline', patterns: [/guideline/i, /protocol/i, /clinical practice/i, /recommendation/i, /consensus/i] },
  { type: 'Research Article', patterns: [/research article/i, /original research/i, /journal of /i, /clinical study/i] },
  { type: 'Review Article', patterns: [/review article/i, /systematic review/i, /literature review/i, /meta-analysis/i] },
  { type: 'Case Report', patterns: [/case report/i, /case study/i, /case series/i, /clinical case/i] },
  { type: 'Clinical Case', patterns: [/clinical case/i, /teaching case/i, /case presentation/i] },
  { type: 'Drug Monograph', patterns: [/monograph/i, /drug profile/i, /drug information/i, /prescribing information/i] },
  { type: 'Study Guide', patterns: [/study guide/i, /exam preparation/i, /board review/i, /revision guide/i] },
  { type: 'MCQ Bank', patterns: [/mcq/i, /question bank/i, /multiple choice/i, /practice question/i] },
  { type: 'OSCE Guide', patterns: [/osce/i, /clinical exam/i, /objective structured/i] },
  { type: 'Flashcard Deck', patterns: [/flashcard/i, /active recall/i, /spaced repetition/i] },
  { type: 'Formulary', patterns: [/formulary/i, /drug list/i, /essential medicine list/i, /kdi/i, /kenya drug index/i] },
  { type: 'Presentation Slide', patterns: [/slide/i, /presentation/i, /powerpoint/i, /ppt/i] },
  { type: 'Lab Manual', patterns: [/lab manual/i, /practical manual/i, /laboratory guide/i] },
];

/**
 * Automatically classify a resource based on its title, description, and keywords.
 * Returns the most likely discipline, sub-discipline, document type, and educational level.
 */
export function classifyResource(
  title: string,
  description?: string,
  contentSample?: string,
): ClassificationResult {
  const text = [title, description, contentSample].filter(Boolean).join(' ').toLowerCase();

  // Score each discipline
  const disciplineScores: Record<string, { score: number; matchedKeywords: string[] }> = {};

  for (const [discipline, patterns] of Object.entries(DISCIPLINE_KEYWORDS)) {
    let score = 0;
    const matched: string[] = [];

    for (const group of patterns) {
      for (const keyword of group.keywords) {
        if (text.includes(keyword)) {
          score += group.weight;
          matched.push(keyword);
        }
      }
    }

    if (score > 0) {
      disciplineScores[discipline] = { score, matchedKeywords: matched };
    }
  }

  // Find best discipline
  let bestDiscipline: Discipline = 'Pharmacy';
  let bestScore = 0;

  for (const [discipline, data] of Object.entries(disciplineScores)) {
    if (data.score > bestScore) {
      bestScore = data.score;
      bestDiscipline = discipline as Discipline;
    }
  }

  // If no discipline matched, try heuristics
  if (bestScore === 0) {
    if (/\b(drug|medicine|treatment|therapy|patient|clinical|disease|syndrome)\b/i.test(text)) {
      bestDiscipline = 'Clinical Medicine';
    } else if (/\b(cell|molecular|gene|protein|enzyme|pathway)\b/i.test(text)) {
      bestDiscipline = 'Biochemistry';
    } else if (/\b(health|community|population|prevention|screening)\b/i.test(text)) {
      bestDiscipline = 'Public Health';
    }
  }

  // Determine sub-discipline
  const subDisciplines = SUB_DISCIPLINES[bestDiscipline] || [];
  let bestSubDiscipline = subDisciplines[0] || 'General';

  for (const sub of subDisciplines) {
    if (text.includes(sub.toLowerCase())) {
      bestSubDiscipline = sub;
      break;
    }
  }

  // Determine document type
  let bestDocType: DocumentType = 'Other';
  for (const entry of DOCUMENT_TYPE_KEYWORDS) {
    for (const pattern of entry.patterns) {
      if (pattern.test(text)) {
        bestDocType = entry.type;
        break;
      }
    }
    if (bestDocType !== 'Other') break;
  }

  // Determine educational level
  const levels: EducationalLevel[] = [];
  if (/\b(introductory?|basic|fundamental|first year|1st year)\b/i.test(text)) levels.push('1st Year');
  if (/\b(intermediate|second year|2nd year)\b/i.test(text)) levels.push('2nd Year');
  if (/\b(third year|3rd year)\b/i.test(text)) levels.push('3rd Year');
  if (/\b(advanced|fourth year|4th year)\b/i.test(text)) levels.push('4th Year');
  if (/\b(clinical|fifth year|5th year)\b/i.test(text)) levels.push('5th Year');
  if (/\b(postgraduate|residency|fellowship)\b/i.test(text)) levels.push('Postgraduate');
  if (levels.length === 0) levels.push('General');

  // Auto-generate tags
  const tags = new Set<string>();
  const wordPattern = /\b([a-z]{3,})\b/g;
  let match;
  while ((match = wordPattern.exec(text)) !== null) {
    const word = match[1].toLowerCase();
    if (['pharmacology', 'pharmacy', 'clinical', 'therapeutics', 'drug', 'medicine', 'disease', 'treatment', 'diagnosis', 'therapy', 'patient', 'health', 'nursing', 'anatomy', 'physiology', 'biochemistry', 'pathology', 'microbiology', 'public'].includes(word)) {
      tags.add(word);
    }
  }

  const confidence = Math.min(bestScore / 20, 1);

  return {
    discipline: bestDiscipline,
    subDiscipline: bestSubDiscipline,
    documentType: bestDocType,
    educationalLevel: levels,
    confidence,
    tags: Array.from(tags),
  };
}

/**
 * Extract author information from a resource title/description
 */
export function extractAuthors(text: string): string[] {
  const authorPatterns = [
    /(?:by|author[s]?:?)\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+(?:and|&)\s+[A-Z][a-z]+\s+[A-Z][a-z]+)?)/g,
    /([A-Z][a-z]+,\s+[A-Z]\.\s*[A-Z]?\.?)/g,
  ];

  const authors: string[] = [];
  for (const pattern of authorPatterns) {
    const matches = text.matchAll(pattern);
    for (const m of matches) {
      const name = m[1]?.trim() || m[0]?.trim();
      if (name && name.length > 3 && !authors.includes(name)) {
        authors.push(name);
      }
    }
  }

  return authors;
}

/**
 * Detect whether a resource is a duplicate by checking title similarity,
 * content hash, ISBN, or DOI.
 */
export async function detectDuplicate(
  title: string,
  contentHash?: string,
  isbn?: string,
  doi?: string,
): Promise<DuplicateInfo | null> {
  try {
    // Check by ISBN or DOI first (most reliable)
    if (isbn) {
      const q = query(collection(db, KB_RESOURCES), where('isbn', '==', isbn), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { isDuplicate: true, matchedById: snap.docs[0].id, matchMethod: 'isbn', matchScore: 1 };
      }
    }

    if (doi) {
      const q = query(collection(db, KB_RESOURCES), where('doi', '==', doi), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { isDuplicate: true, matchedById: snap.docs[0].id, matchMethod: 'doi', matchScore: 1 };
      }
    }

    // Check by content hash
    if (contentHash) {
      const q = query(collection(db, KB_RESOURCES), where('contentHash', '==', contentHash), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { isDuplicate: true, matchedById: snap.docs[0].id, matchMethod: 'hash', matchScore: 0.95 };
      }
    }

    // Check by title similarity (simple normalized comparison)
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const allDocs = await getDocs(query(collection(db, KB_RESOURCES), limit(50)));
    for (const doc of allDocs.docs) {
      const data = doc.data() as ResourceMetadata;
      const existingTitle = data.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Simple Jaccard-like similarity for title comparison
      const words1 = new Set(normalizedTitle.split(/\s+/));
      const words2 = new Set(existingTitle.split(/\s+/));
      const intersection = new Set([...words1].filter(w => words2.has(w)));
      const union = new Set([...words1, ...words2]);
      const similarity = intersection.size / union.size;

      if (similarity > 0.85) {
        return { isDuplicate: true, matchedById: doc.id, matchMethod: 'title', matchScore: similarity };
      }
    }

    return null;
  } catch (err) {
    console.warn('[KnowledgeService] Duplicate detection failed:', err);
    return null;
  }
}

/**
 * Generate a unique resource ID with discipline prefix
 */
export function generateResourceId(discipline: Discipline): string {
  const prefix = discipline
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .slice(0, 4);
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Save a resource to the knowledge base.
 * Runs classification, duplicate detection, and optional AI generation.
 */
export async function ingestResource(
  data: {
    title: string;
    description?: string;
    authors?: string[];
    year?: number;
    publisher?: string;
    isbn?: string;
    doi?: string;
    language?: string;
    tags?: string[];
    source: ResourceSource;
    file?: { mimeType?: string; size?: number; path?: string };
    contentSample?: string;
    contentHash?: string;
  },
  options: IngestionOptions = {},
  userId: string = 'system',
): Promise<ResourceMetadata> {
  const {
    generateSummary = true,
    generateFlashcards = true,
    generateMCQs = true,
    checkDuplicates = true,
    indexForSearch = true,
  } = options;

  // Step 1: Auto-classify
  const classification = classifyResource(
    data.title,
    data.description,
    data.contentSample,
  );

  // Step 2: Duplicate check
  let duplicateInfo: DuplicateInfo | undefined;
  if (checkDuplicates) {
    duplicateInfo = (await detectDuplicate(
      data.title,
      data.contentHash,
      data.isbn,
      data.doi,
    )) ?? undefined;
    if (duplicateInfo?.isDuplicate) {
      throw new Error(`Duplicate resource detected: "${data.title}" matches existing resource ${duplicateInfo.matchedById} (${duplicateInfo.matchMethod}, score: ${duplicateInfo.matchScore})`);
    }
  }

  // Step 3: Build resource record
  const now = Date.now();
  const resourceId = generateResourceId(classification.discipline);
  const extractedAuthors = data.authors?.length ? data.authors : extractAuthors([data.title, data.description || ''].join(' '));

  const resource: ResourceMetadata = {
    id: resourceId,
    title: data.title,
    description: data.description,

    discipline: classification.discipline,
    subDiscipline: classification.subDiscipline,
    documentType: classification.documentType,
    educationalLevel: classification.educationalLevel,

    authors: extractedAuthors,
    publisher: data.publisher,
    year: data.year,

    language: (data.language as any) || 'en',
    mimeType: data.file?.mimeType,
    fileSize: data.file?.size,
    storagePath: data.file?.path,

    tags: [...new Set([...classification.tags, ...(data.tags || [])])],
    keywords: classification.tags,
    categories: [classification.discipline, classification.subDiscipline],

    modules: DISCIPLINE_MODULE_MAP[classification.discipline] ? [DISCIPLINE_MODULE_MAP[classification.discipline]!] : undefined,

    ai: {
      keywords: classification.tags,
      learningObjectives: [],
      generatedAt: now,
    },

    source: data.source,
    accessScope: 'public',

    contentHash: data.contentHash,
    isbn: data.isbn,
    doi: data.doi,
    duplicateInfo,

    uploadedBy: userId,
    uploadedAt: now,
    updatedAt: now,
    version: 1,

    status: 'pending',
  };

  // Step 4: Save to Firestore
  try {
    await setDoc(doc(db, KB_RESOURCES, resourceId), resource);
  } catch (err) {
    console.warn('[KnowledgeService] Firestore save failed, using in-memory:', err);
  }

  // Cache locally
  try {
    const cached = JSON.parse(localStorage.getItem(KB_RESOURCES) || '{}');
    cached[resourceId] = resource;
    localStorage.setItem(KB_RESOURCES, JSON.stringify(cached));
  } catch { /* skip */ }

  // Step 5: Queue AI generation tasks (async, non-blocking)
  if (generateSummary || generateFlashcards || generateMCQs) {
    queueAIGeneration(resourceId, data, generateSummary, generateFlashcards, generateMCQs).catch(console.error);
  }

  return resource;
}

/**
 * Queue AI generation for a resource (runs async in background)
 */
async function queueAIGeneration(
  resourceId: string,
  data: any,
  generateSummary: boolean,
  generateFlashcards: boolean,
  generateMCQs: boolean,
): Promise<void> {
  try {
    // Mark as processing
    await updateDoc(doc(db, KB_RESOURCES, resourceId), {
      status: 'processing',
      updatedAt: Date.now(),
    });

    // We dispatch AI generation tasks to the server API
    // The server will handle API calls to Gemini/OpenRouter
    const payload: any = { resourceId };

    if (generateSummary && data.contentSample) {
      payload.generateSummary = true;
    }
    if (generateFlashcards && data.contentSample) {
      payload.generateFlashcards = true;
    }
    if (generateMCQs && data.contentSample) {
      payload.generateMCQs = true;
    }

    if (payload.generateSummary || payload.generateFlashcards || payload.generateMCQs) {
      await fetch('/api/knowledge-base/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    // Mark as indexed
    await updateDoc(doc(db, KB_RESOURCES, resourceId), {
      status: 'indexed',
      indexedAt: Date.now(),
      updatedAt: Date.now(),
    });
  } catch (err) {
    console.error('[KnowledgeService] AI generation failed:', err);
    try {
      await updateDoc(doc(db, KB_RESOURCES, resourceId), {
        status: 'failed',
        processingError: String(err),
        updatedAt: Date.now(),
      });
    } catch { /* skip */ }
  }
}

// ============================================================
// CRUD Operations
// ============================================================

/**
 * Get a resource by its ID
 */
export async function getResource(resourceId: string): Promise<ResourceMetadata | null> {
  try {
    const snap = await getDoc(doc(db, KB_RESOURCES, resourceId));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ResourceMetadata;
    }
  } catch (err) {
    console.warn('[KnowledgeService] Firestore get failed, checking cache:', err);
  }

  try {
    const cached = JSON.parse(localStorage.getItem(KB_RESOURCES) || '{}');
    return cached[resourceId] || null;
  } catch {
    return null;
  }
}

/**
 * Search the knowledge base with filters
 */
export async function searchResources(
  filters: SearchFilters,
  maxResults: number = 50,
): Promise<SearchResult[]> {
  try {
    let constraints: any[] = [];

    if (filters.discipline) {
      const disciplines = Array.isArray(filters.discipline) ? filters.discipline : [filters.discipline];
      constraints.push(where('discipline', 'in', disciplines));
    }

    if (filters.documentType) {
      const types = Array.isArray(filters.documentType) ? filters.documentType : [filters.documentType];
      constraints.push(where('documentType', 'in', types));
    }

    if (filters.language) {
      constraints.push(where('language', '==', filters.language));
    }

    constraints.push(orderBy('uploadedAt', 'desc'));
    constraints.push(limit(maxResults));

    const q = query(collection(db, KB_RESOURCES), ...constraints);
    const snap = await getDocs(q);

    const results: SearchResult[] = snap.docs.map((d) => {
      const resource = { id: d.id, ...d.data() } as ResourceMetadata;
      let score = 1;

      // Boost score for query matches
      if (filters.query) {
        const ql = filters.query.toLowerCase();
        if (resource.title.toLowerCase().includes(ql)) score += 0.3;
        if (resource.description?.toLowerCase().includes(ql)) score += 0.2;
        if (resource.tags.some((t) => t.toLowerCase().includes(ql))) score += 0.15;
      }

      return { resource, score };
    });

    // Sort by score
    results.sort((a, b) => b.score - a.score);

    return results;
  } catch (err) {
    console.warn('[KnowledgeService] Search failed:', err);
    // Local fallback search
    try {
      const cached = JSON.parse(localStorage.getItem(KB_RESOURCES) || '{}');
      let items = Object.values(cached) as ResourceMetadata[];

      if (filters.query) {
        const q = filters.query.toLowerCase();
        items = items.filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q) ||
            r.tags.some((t) => t.toLowerCase().includes(q)),
        );
      }

      return items.slice(0, maxResults).map((r) => ({ resource: r, score: 0.5 }));
    } catch {
      return [];
    }
  }
}

/**
 * Get resources by discipline
 */
export async function getResourcesByDiscipline(
  discipline: Discipline,
  maxResults: number = 50,
): Promise<ResourceMetadata[]> {
  const results = await searchResources({ discipline, query: '' }, maxResults);
  return results.map((r) => r.resource);
}

/**
 * Get resources by sub-discipline
 */
export async function getResourcesBySubDiscipline(
  subDiscipline: string,
  maxResults: number = 50,
): Promise<ResourceMetadata[]> {
  try {
    const q = query(
      collection(db, KB_RESOURCES),
      where('subDiscipline', '==', subDiscipline),
      orderBy('uploadedAt', 'desc'),
      limit(maxResults),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResourceMetadata));
  } catch (err) {
    console.warn('[KnowledgeService] Sub-discipline query failed:', err);
    return [];
  }
}

/**
 * Delete a resource from the knowledge base
 */
export async function deleteResource(resourceId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, KB_RESOURCES, resourceId));
  } catch (err) {
    console.warn('[KnowledgeService] Firestore delete failed:', err);
  }

  try {
    const cached = JSON.parse(localStorage.getItem(KB_RESOURCES) || '{}');
    delete cached[resourceId];
    localStorage.setItem(KB_RESOURCES, JSON.stringify(cached));
  } catch { /* skip */ }
}

/**
 * Update resource access count
 */
export async function recordResourceAccess(resourceId: string): Promise<void> {
  try {
    await updateDoc(doc(db, KB_RESOURCES, resourceId), {
      lastAccessedAt: Date.now(),
      accessCount: increment(1),
    });
  } catch { /* silent */ }
}

/**
 * Get knowledge base statistics
 */
export async function getKBStats(): Promise<{
  totalResources: number;
  byDiscipline: Record<string, number>;
  byType: Record<string, number>;
  byYear: Record<string, number>;
}> {
  const stats = {
    totalResources: 0,
    byDiscipline: {} as Record<string, number>,
    byType: {} as Record<string, number>,
    byYear: {} as Record<string, number>,
  };

  try {
    const snap = await getDocs(query(collection(db, KB_RESOURCES), limit(1000)));
    stats.totalResources = snap.size;

    snap.docs.forEach((d) => {
      const data = d.data() as ResourceMetadata;
      stats.byDiscipline[data.discipline] = (stats.byDiscipline[data.discipline] || 0) + 1;
      stats.byType[data.documentType] = (stats.byType[data.documentType] || 0) + 1;
      if (data.year) {
        const decade = `${Math.floor(data.year / 10) * 10}s`;
        stats.byYear[decade] = (stats.byYear[decade] || 0) + 1;
      }
    });
  } catch (err) {
    console.warn('[KnowledgeService] Stats query failed:', err);
  }

  return stats;
}

// ============================================================
// Batch Ingestion
// ============================================================

/**
 * Ingest multiple resources in batch
 */
export async function batchIngest(
  resources: Array<{
    title: string;
    description?: string;
    source: ResourceSource;
    [key: string]: any;
  }>,
  options: IngestionOptions = {},
  userId: string = 'system',
): Promise<BatchIngestionResult> {
  const result: BatchIngestionResult = {
    totalProcessed: resources.length,
    succeeded: 0,
    failed: 0,
    duplicates: 0,
    errors: [],
  };

  for (const res of resources) {
    try {
      await ingestResource(res, options, userId);
      result.succeeded++;
    } catch (err: any) {
      if (err.message?.includes('Duplicate')) {
        result.duplicates++;
      } else {
        result.failed++;
        result.errors.push({ title: res.title, error: err.message || String(err) });
      }
    }
  }

  return result;
}

/**
 * Get popular/discipline-specific resources
 */
export async function getPopularResources(
  discipline?: Discipline,
  maxResults: number = 20,
): Promise<ResourceMetadata[]> {
  try {
    let constraints: any[] = [orderBy('accessCount', 'desc'), limit(maxResults)];
    if (discipline) {
      constraints.unshift(where('discipline', '==', discipline));
    }
    const q = query(collection(db, KB_RESOURCES), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResourceMetadata));
  } catch {
    return [];
  }
}
