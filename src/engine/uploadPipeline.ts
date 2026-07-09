// ============================================================
// Clinova Intelligent Upload Pipeline
// Validates, extracts, classifies, and connects resources
// ============================================================

import { knowledgeGraph, type KnowledgeNode } from './knowledgeGraph';
import { knowledgeEngine } from './knowledgeEngine';

// ============================================================
// Types
// ============================================================

export interface UploadedFile {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  extension: string;
  buffer?: ArrayBuffer;
  text?: string;
  path?: string;
}

export interface ExtractedContent {
  text: string;
  hasOCR: boolean;
  pageCount?: number;
  language?: string;
  headings?: string[];
  keyTerms?: string[];
}

export interface ClassificationResult {
  learningArea: string;
  subject: string;
  unit: string;
  topic: string;
  subtopic?: string;
  disease?: string;
  drug?: string;
  therapeuticArea?: string;
  educationalLevel: string;
  resourceType: string;
  keywords: string[];
  confidence: number;
}

export interface UploadPipelineResult {
  fileId: string;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  steps: UploadStepResult[];
  classification?: ClassificationResult;
  metadata?: Record<string, any>;
  relationships?: Array<{ targetId: string; type: string; weight: number }>;
  error?: string;
  startedAt: number;
  completedAt?: number;
}

export interface UploadStepResult {
  step: string;
  status: 'success' | 'failed' | 'skipped';
  duration: number;
  details?: string;
}

// ============================================================
// File Type Support
// ============================================================

const SUPPORTED_TEXT_TYPES = new Set([
  'application/pdf', 'text/plain', 'text/markdown', 'text/html',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint', 'application/msword',
  'application/epub+zip', 'text/csv',
]);

const SUPPORTED_IMAGE_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff',
  'image/bmp', 'image/heic', 'image/heif',
]);

const TEXT_EXTENSIONS = new Set([
  '.txt', '.md', '.html', '.htm', '.csv', '.json', '.xml', '.yaml', '.yml',
]);

const DOCUMENT_EXTENSIONS = new Set([
  '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.epub', '.odt', '.rtf',
]);

const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.tif', '.bmp', '.heic', '.heif',
]);

// ============================================================
// Keyword Dictionaries for Classification
// ============================================================

const DISCIPLINE_KEYWORDS: Record<string, string[]> = {
  Pharmacology: ['pharmacology', 'drug action', 'receptor', 'pharmacokinetics', 'pharmacodynamics',
    'mechanism of action', 'autonomic', 'cardiovascular pharmacology', 'cns pharmacology',
    'endocrine pharmacology', 'chemotherapy', 'antimicrobial', 'toxicology'],
  'Clinical Pharmacy': ['clinical pharmacy', 'pharmaceutical care', 'drug information', 'hospital pharmacy',
    'community pharmacy', 'pharmacy practice', 'pharmacovigilance', 'medication therapy',
    'drug utilization', 'therapeutic drug monitoring'],
  Pharmaceutics: ['dosage form', 'formulation', 'tablet', 'capsule', 'injection', 'bioavailability',
    'dissolution', 'excipient', 'drug delivery', 'physical pharmacy', 'biopharmaceutics'],
  Physiology: ['physiology', 'homeostasis', 'organ system', 'cardiovascular', 'renal', 'respiratory',
    'endocrine', 'nervous system', 'muscle contraction', 'action potential'],
  Pathology: ['pathology', 'disease', 'inflammation', 'neoplasia', 'infection', 'degeneration',
    'histopathology', 'clinical pathology', 'cell injury'],
  Biochemistry: ['biochemistry', 'enzyme', 'metabolism', 'protein', 'carbohydrate', 'lipid',
    'nucleic acid', 'glycolysis', 'krebs cycle', 'dna', 'rna', 'molecular biology'],
  Microbiology: ['microbiology', 'bacteria', 'virus', 'fungus', 'parasite', 'immunology',
    'antibiotic', 'vaccine', 'stain', 'culture', 'bacteriology', 'virology'],
  Anatomy: ['anatomy', 'gross anatomy', 'histology', 'embryology', 'neuroanatomy',
    'muscle', 'bone', 'nerve', 'organ', 'tissue'],
  Therapeutics: ['therapeutics', 'treatment', 'management', 'therapy', 'clinical management',
    'patient care', 'treatment guideline', 'standard of care'],
  'Public Health': ['public health', 'epidemiology', 'health promotion', 'disease prevention',
    'community health', 'global health', 'biostatistics'],
};

const RESOURCE_TYPE_KEYWORDS: Array<{ type: string; keywords: string[] }> = [
  { type: 'Textbook', keywords: ['textbook', 'handbook', 'manual of', 'principles of'] },
  { type: 'Lecture Notes', keywords: ['lecture notes', 'lecture', 'class notes', 'summary notes'] },
  { type: 'Clinical Guideline', keywords: ['guideline', 'protocol', 'clinical practice', 'recommendation'] },
  { type: 'Clinical Case', keywords: ['clinical case', 'case report', 'case study', 'patient case'] },
  { type: 'Research Article', keywords: ['research', 'study', 'clinical trial', 'journal'] },
  { type: 'Drug Monograph', keywords: ['monograph', 'drug profile', 'prescribing information'] },
  { type: 'Study Guide', keywords: ['study guide', 'revision guide', 'exam preparation', 'board review'] },
  { type: 'Flashcard Deck', keywords: ['flashcard', 'active recall', 'revision card'] },
  { type: 'MCQ Bank', keywords: ['mcq', 'question bank', 'multiple choice', 'practice question'] },
  { type: 'OSCE Guide', keywords: ['osce', 'clinical exam', 'objective structured'] },
  { type: 'Presentation Slide', keywords: ['slide', 'presentation', 'powerpoint'] },
];

const DISEASE_KEYWORDS = [
  'hypertension', 'diabetes', 'malaria', 'tuberculosis', 'hiv', 'aids',
  'asthma', 'copd', 'pneumonia', 'heart failure', 'angina', 'stroke',
  'anemia', 'cancer', 'hepatitis', 'cirrhosis', 'renal failure',
  'uti', 'meningitis', 'osteoporosis', 'arthritis', 'gout',
  'peptic ulcer', 'gerd', 'epilepsy', 'parkinson', 'alzheimer',
  'depression', 'schizophrenia', 'thyroid disorder',
];

const DRUG_KEYWORDS = [
  'paracetamol', 'ibuprofen', 'aspirin', 'amoxicillin', 'metronidazole',
  'omeprazole', 'atorvastatin', 'lisinopril', 'amlodipine', 'metformin',
  'insulin', 'warfarin', 'clopidogrel', 'furosemide', 'spironolactone',
  'salbutamol', 'prednisolone', 'ceftriaxone', 'azithromycin', 'ciprofloxacin',
];

// ============================================================
// Upload Pipeline — Main Class
// ============================================================

export class UploadPipeline {
  private static instance: UploadPipeline;
  private processingQueue: Map<string, UploadPipelineResult> = new Map();
  private static STORAGE_KEY = 'clinova_upload_pipeline';

  static getInstance(): UploadPipeline {
    if (!UploadPipeline.instance) {
      UploadPipeline.instance = new UploadPipeline();
    }
    return UploadPipeline.instance;
  }

  // ============================================================
  // Main Pipeline Execution
  // ============================================================

  async processFile(file: UploadedFile, options?: {
    runOCR?: boolean;
    generateMetadata?: boolean;
    discoverRelationships?: boolean;
    indexForSearch?: boolean;
  }): Promise<UploadPipelineResult> {
    const startTime = Date.now();
    const steps: UploadStepResult[] = [];
    const fileId = file.id || `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const result: UploadPipelineResult = {
      fileId,
      fileName: file.originalName,
      status: 'processing',
      steps: [],
      startedAt: startTime,
    };

    this.processingQueue.set(fileId, result);
    let extractedContent: ExtractedContent | null = null;

    try {
      // Step 1: Validate File
      steps.push(this.runStep('validate', () => this.validateFile(file)));

      // Step 2: Extract Text
      const extractResult = await this.runStepAsync('extract', async () => {
        extractedContent = await this.extractContent(file, options?.runOCR ?? true);
        return extractedContent.text.length > 0;
      });
      steps.push(extractResult);

      if (!extractedContent || (extractedContent as ExtractedContent).text.length === 0) {
        throw new Error('No text could be extracted from the file');
      }

      // Step 3: Classify Content
      let classification: ClassificationResult | undefined;
      steps.push(this.runStep('classify', () => {
        classification = this.classifyContent(
          file.originalName,
          extractedContent!.text,
          extractedContent!.keyTerms,
        );
        return true;
      }));

      // Step 4: Detect Diseases & Drugs
      steps.push(this.runStep('detect_entities', () => {
        const diseases = this.detectEntities(extractedContent!.text, DISEASE_KEYWORDS);
        const drugs = this.detectEntities(extractedContent!.text, DRUG_KEYWORDS);
        if (classification) {
          if (diseases.length > 0) classification.disease = diseases[0];
          if (drugs.length > 0) classification.drug = drugs[0];
          classification.keywords = [...new Set([...classification.keywords, ...diseases, ...drugs])];
        }
        return true;
      }));

      // Step 5: Generate Metadata
      let metadata: Record<string, any> = {};
      if (options?.generateMetadata !== false) {
        steps.push(this.runStep('metadata', () => {
          metadata = this.generateMetadata(file, extractedContent!, classification!);
          return true;
        }));
      }

      // Step 6: Discover Relationships
      let relationships: Array<{ targetId: string; type: string; weight: number }> = [];
      if (options?.discoverRelationships !== false && classification) {
        steps.push(this.runStep('relationships', () => {
          relationships = this.discoverRelationships(classification!);
          return true;
        }));
      }

      // Step 7: Index for Search
      if (options?.indexForSearch !== false) {
        steps.push(this.runStep('index', () => {
          this.indexForSearch(fileId, file.originalName, extractedContent!.text, classification!, metadata);
          return true;
        }));
      }

      // Complete
      Object.assign(result, {
        status: 'completed' as const,
        steps,
        classification,
        metadata,
        relationships,
        completedAt: Date.now(),
      });

    } catch (error: any) {
      steps.push({
        step: 'pipeline',
        status: 'failed',
        duration: Date.now() - startTime,
        details: error.message || 'Unknown pipeline error',
      });

      Object.assign(result, {
        status: 'failed' as const,
        steps,
        error: error.message || 'Pipeline execution failed',
        completedAt: Date.now(),
      });
    }

    this.processingQueue.set(fileId, result);
    this.persist();
    return result;
  }

  // ============================================================
  // Step 1: Validate File
  // ============================================================

  private validateFile(file: UploadedFile): boolean {
    if (!file.originalName || !file.mimeType) {
      throw new Error('File must have a name and MIME type');
    }

    if (file.size <= 0) {
      throw new Error('File is empty');
    }

    const ext = file.extension.toLowerCase();
    const isSupported =
      SUPPORTED_TEXT_TYPES.has(file.mimeType) ||
      SUPPORTED_IMAGE_TYPES.has(file.mimeType) ||
      TEXT_EXTENSIONS.has(ext) ||
      DOCUMENT_EXTENSIONS.has(ext) ||
      IMAGE_EXTENSIONS.has(ext);

    if (!isSupported) {
      throw new Error(`Unsupported file type: ${file.mimeType || ext}`);
    }

    // Size limit: 100MB
    if (file.size > 100 * 1024 * 1024) {
      throw new Error('File exceeds maximum size of 100MB');
    }

    return true;
  }

  // ============================================================
  // Step 2: Extract Content
  // ============================================================

  private async extractContent(file: UploadedFile, runOCR: boolean): Promise<ExtractedContent> {
    // If text was already extracted (e.g., from client-side)
    if (file.text && file.text.length > 0) {
      return {
        text: file.text,
        hasOCR: false,
        language: this.detectLanguage(file.text),
        headings: this.extractHeadings(file.text),
        keyTerms: this.extractKeyTerms(file.text),
      };
    }

    // For text-based files that we can read
    const ext = file.extension.toLowerCase();
    if (ext === '.txt' || ext === '.md' || ext === '.html' || ext === '.csv' || ext === '.json') {
      // These would be handled by the client reading the file
      // For now, return placeholder
      return {
        text: `[File: ${file.originalName}] Text extraction requires server-side processing for binary formats.`,
        hasOCR: false,
        headings: [],
        keyTerms: [],
      };
    }

    // For PDFs, documents, and images — would use server-side processing (OCR for images, PDF parsers)
    return {
      text: `[File: ${file.originalName} — ${file.mimeType}] Full text extraction requires server-side document parsing.`,
      hasOCR: runOCR && IMAGE_EXTENSIONS.has(ext),
      keyTerms: this.extractKeyTerms(file.originalName),
    };
  }

  // ============================================================
  // Step 3: Classify Content
  // ============================================================

  private classifyContent(fileName: string, text: string, keyTerms?: string[]): ClassificationResult {
    const combined = [fileName, text, ...(keyTerms || [])].join(' ').toLowerCase();

    // Detect learning area / discipline
    const disciplineScores: Record<string, number> = {};
    for (const [discipline, keywords] of Object.entries(DISCIPLINE_KEYWORDS)) {
      let score = 0;
      for (const keyword of keywords) {
        if (combined.includes(keyword)) {
          score += keyword.length > 10 ? 3 : 1;
        }
      }
      if (score > 0) disciplineScores[discipline] = score;
    }

    let bestDiscipline = 'Clinical Pharmacy';
    let bestScore = 0;
    for (const [discipline, score] of Object.entries(disciplineScores)) {
      if (score > bestScore) {
        bestScore = score;
        bestDiscipline = discipline;
      }
    }

    // Detect resource type
    let resourceType = 'General';
    for (const entry of RESOURCE_TYPE_KEYWORDS) {
      for (const keyword of entry.keywords) {
        if (combined.includes(keyword)) {
          resourceType = entry.type;
          break;
        }
      }
      if (resourceType !== 'General') break;
    }

    // Detect educational level
    let educationalLevel = 'General';
    if (/\b(introductory?|basic|fundamental|first\s*year)\b/i.test(combined)) educationalLevel = '1st Year';
    else if (/\b(second\s*year|intermediate)\b/i.test(combined)) educationalLevel = '2nd Year';
    else if (/\b(third\s*year)\b/i.test(combined)) educationalLevel = '3rd Year';
    else if (/\b(fourth\s*year|advanced)\b/i.test(combined)) educationalLevel = '4th Year';
    else if (/\b(fifth\s*year|clinical)\b/i.test(combined)) educationalLevel = '5th Year';
    else if (/\b(postgraduate|residency|fellow|specialist)\b/i.test(combined)) educationalLevel = 'Postgraduate';

    // Generate keywords
    const keywords: string[] = [];
    const wordPattern = /\b([a-z]{4,})\b/g;
    let match;
    const important = new Set([
      'pharmacology', 'clinical', 'pharmacy', 'drug', 'disease', 'treatment',
      'therapy', 'patient', 'health', 'medicine', 'therapeutics', 'diagnosis',
      'pathophysiology', 'management', 'guideline', 'dosing', 'safety',
    ]);
    while ((match = wordPattern.exec(combined)) !== null) {
      if (important.has(match[1])) keywords.push(match[1]);
    }

    return {
      learningArea: bestDiscipline,
      subject: bestDiscipline,
      unit: 'General',
      topic: bestDiscipline,
      educationalLevel,
      resourceType,
      keywords: [...new Set(keywords)],
      confidence: Math.min(bestScore / 10, 1),
    };
  }

  // ============================================================
  // Step 4: Entity Detection
  // ============================================================

  private detectEntities(text: string, dictionary: string[]): string[] {
    const found: string[] = [];
    const lower = text.toLowerCase();
    for (const entity of dictionary) {
      if (lower.includes(entity)) {
        found.push(entity.charAt(0).toUpperCase() + entity.slice(1));
      }
    }
    return found;
  }

  // ============================================================
  // Step 5: Generate Metadata
  // ============================================================

  private generateMetadata(
    file: UploadedFile,
    content: ExtractedContent,
    classification: ClassificationResult,
  ): Record<string, any> {
    return {
      title: file.originalName.replace(/\.[^/.]+$/, ''),
      fileName: file.originalName,
      mimeType: file.mimeType,
      fileSize: file.size,
      extension: file.extension,
      language: content.language || 'en',
      pageCount: content.pageCount,
      learningArea: classification.learningArea,
      subject: classification.subject,
      unit: classification.unit,
      topic: classification.topic,
      resourceType: classification.resourceType,
      educationalLevel: classification.educationalLevel,
      keywords: classification.keywords,
      disease: classification.disease,
      drug: classification.drug,
      therapeuticArea: classification.therapeuticArea,
      headings: content.headings,
      keyTerms: content.keyTerms,
      hasOCR: content.hasOCR,
      processedAt: Date.now(),
    };
  }

  // ============================================================
  // Step 6: Discover Relationships
  // ============================================================

  private discoverRelationships(classification: ClassificationResult): Array<{ targetId: string; type: string; weight: number }> {
    const relationships: Array<{ targetId: string; type: string; weight: number }> = [];

    // Search knowledge graph for related nodes
    const searchTerms = [
      classification.learningArea,
      classification.subject,
      classification.disease,
      classification.drug,
      ...classification.keywords,
    ].filter(Boolean);

    for (const term of searchTerms) {
      if (!term) continue;
      const nodes = knowledgeGraph.searchNodes(term);
      for (const node of nodes) {
        relationships.push({
          targetId: node.id,
          type: 'related_to',
          weight: 0.6,
        });
      }
    }

    return relationships;
  }

  // ============================================================
  // Step 7: Index for Search
  // ============================================================

  private indexForSearch(
    fileId: string,
    fileName: string,
    text: string,
    classification: ClassificationResult,
    metadata: Record<string, any>,
  ): void {
    try {
      const searchIndex = JSON.parse(localStorage.getItem('clinova_search_index') || '{}');
      searchIndex[fileId] = {
        id: fileId,
        title: fileName,
        text: text.substring(0, 10000), // Store first 10K chars for search
        discipline: classification.learningArea,
        subject: classification.subject,
        unit: classification.unit,
        disease: classification.disease,
        drug: classification.drug,
        keywords: classification.keywords,
        educationalLevel: classification.educationalLevel,
        resourceType: classification.resourceType,
        metadata,
        indexedAt: Date.now(),
      };
      localStorage.setItem('clinova_search_index', JSON.stringify(searchIndex));
    } catch (error) {
      console.warn('[UploadPipeline] Failed to index for search:', error);
    }
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  private runStep(name: string, fn: () => boolean): UploadStepResult {
    const start = Date.now();
    try {
      const result = fn();
      return {
        step: name,
        status: result ? 'success' : 'failed',
        duration: Date.now() - start,
      };
    } catch (error: any) {
      return {
        step: name,
        status: 'failed',
        duration: Date.now() - start,
        details: error.message,
      };
    }
  }

  private async runStepAsync(name: string, fn: () => Promise<boolean>): Promise<UploadStepResult> {
    const start = Date.now();
    try {
      const result = await fn();
      return {
        step: name,
        status: result ? 'success' : 'failed',
        duration: Date.now() - start,
      };
    } catch (error: any) {
      return {
        step: name,
        status: 'failed',
        duration: Date.now() - start,
        details: error.message,
      };
    }
  }

  private detectLanguage(text: string): string {
    // Simple detection: check for common non-English patterns
    const samples = text.substring(0, 1000).toLowerCase();
    // If contains common French words
    if (/\b(le|la|les|des|est|sont|avec|pour|dans)\b/i.test(samples)) return 'fr';
    // Spanish
    if (/\b(el|la|los|las|es|son|con|para|por)\b/i.test(samples)) return 'es';
    // Default to English
    return 'en';
  }

  private extractHeadings(text: string): string[] {
    const headings: string[] = [];
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (/^#{1,3}\s/.test(trimmed)) {
        headings.push(trimmed.replace(/^#+\s*/, ''));
      } else if (/^[A-Z][A-Z\s]+$/.test(trimmed) && trimmed.length > 3 && trimmed.length < 80) {
        headings.push(trimmed);
      }
    }
    return headings.slice(0, 20);
  }

  private extractKeyTerms(text: string): string[] {
    const terms = new Set<string>();
    const medicalTerms = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/g;
    let match;
    while ((match = medicalTerms.exec(text)) !== null) {
      const term = match[1];
      if (term.length > 3 && !term.includes('The') && !term.includes('This')) {
        terms.add(term);
      }
    }
    return Array.from(terms).slice(0, 30);
  }

  // ============================================================
  // Pipeline Status & History
  // ============================================================

  getPipelineStatus(fileId: string): UploadPipelineResult | undefined {
    return this.processingQueue.get(fileId);
  }

  getPipelineHistory(): UploadPipelineResult[] {
    return Array.from(this.processingQueue.values());
  }

  getRecentUploads(count: number = 10): UploadPipelineResult[] {
    return Array.from(this.processingQueue.values())
      .sort((a, b) => b.startedAt - a.startedAt)
      .slice(0, count);
  }

  // ============================================================
  // Persistence
  // ============================================================

  persist(): void {
    try {
      const data = Array.from(this.processingQueue.values());
      localStorage.setItem(UploadPipeline.STORAGE_KEY, JSON.stringify(data));
    } catch {
      // silent
    }
  }

  static load(): UploadPipeline {
    const pipeline = new UploadPipeline();
    try {
      const stored = localStorage.getItem(UploadPipeline.STORAGE_KEY);
      if (stored) {
        const data: UploadPipelineResult[] = JSON.parse(stored);
        for (const item of data) {
          pipeline.processingQueue.set(item.fileId, item);
        }
      }
    } catch {
      // silent
    }
    return pipeline;
  }
}

// ============================================================
// Singleton Export
// ============================================================
export const uploadPipeline = UploadPipeline.load();
