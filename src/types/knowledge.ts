// ============================================================
// Knowledge Base Resource Types for Clinova
// Comprehensive type system for medical/pharmacy educational resources
// ============================================================

/** All medical/pharmacy disciplines in the knowledge base */
export const DISCIPLINES = [
  'Pharmacy',
  'Pharmacology',
  'Pharmaceutics',
  'Pharmaceutical Chemistry',
  'Organic Chemistry',
  'Pharmaceutical Analysis',
  'Pharmacognosy',
  'Biochemistry',
  'Physiology',
  'Anatomy',
  'Pathology',
  'Microbiology',
  'Clinical Medicine',
  'Diagnostics',
  'Public Health',
  'Research',
  'Nursing',
  'Dentistry',
  'Nutrition',
] as const;
export type Discipline = (typeof DISCIPLINES)[number];

/** Sub-disciplines mapped to each discipline */
export const SUB_DISCIPLINES: Record<Discipline, string[]> = {
  Pharmacy: [
    'Introduction to Pharmacy', 'Clinical Pharmacy', 'Hospital Pharmacy',
    'Community Pharmacy', 'Industrial Pharmacy', 'Pharmacy Practice',
    'Pharmaceutical Care', 'Pharmacoeconomics', 'Pharmacovigilance',
    'Drug Information', 'Pharmacy Law', 'Pharmacy Ethics',
  ],
  Pharmacology: [
    'General Pharmacology', 'Autonomic Pharmacology', 'Cardiovascular Pharmacology',
    'CNS Pharmacology', 'Endocrine Pharmacology', 'Chemotherapy',
    'Antimicrobials', 'Oncology', 'Toxicology', 'Clinical Pharmacology',
  ],
  Pharmaceutics: [
    'Dosage Forms', 'Drug Delivery', 'Biopharmaceutics', 'Physical Pharmacy',
    'Pharmaceutical Technology', 'Manufacturing', 'Quality Assurance',
    'Sterile Preparations',
  ],
  'Pharmaceutical Chemistry': [
    'Pharmaceutical Chemistry', 'Medicinal Chemistry', 'Drug Design',
    'Structure Activity Relationships', 'Drug Synthesis',
  ],
  'Organic Chemistry': [
    'Basic Organic Chemistry', 'Reaction Mechanisms', 'Spectroscopy',
    'Functional Groups', 'Pharmaceutical Organic Chemistry',
  ],
  'Pharmaceutical Analysis': [
    'Instrumental Analysis', 'Analytical Chemistry', 'Spectroscopy',
    'Chromatography', 'Quality Control',
  ],
  Pharmacognosy: [
    'Medicinal Plants', 'Herbal Medicines', 'Natural Products', 'Ethnopharmacology',
  ],
  Biochemistry: [
    'Human Biochemistry', 'Clinical Biochemistry', 'Molecular Biology',
    'Metabolism', 'Enzymology',
  ],
  Physiology: [
    'General Physiology', 'Cardiovascular', 'Renal', 'Respiratory',
    'Endocrine', 'Gastrointestinal', 'Nervous System', 'Reproductive',
  ],
  Anatomy: ['Gross Anatomy', 'Histology', 'Embryology', 'Neuroanatomy'],
  Pathology: [
    'General Pathology', 'Systemic Pathology', 'Histopathology', 'Clinical Pathology',
  ],
  Microbiology: [
    'Bacteriology', 'Virology', 'Mycology', 'Parasitology', 'Immunology',
  ],
  'Clinical Medicine': [
    'Internal Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Gynecology',
    'Psychiatry', 'Dermatology', 'Ophthalmology', 'ENT', 'Emergency Medicine',
    'Intensive Care', 'Family Medicine', 'Geriatrics',
  ],
  Diagnostics: [
    'Laboratory Medicine', 'Radiology', 'Clinical Chemistry', 'Diagnostic Imaging',
  ],
  'Public Health': [
    'Epidemiology', 'Biostatistics', 'Health Promotion', 'Global Health',
    'Health Systems', 'Disease Prevention',
  ],
  Research: [
    'Research Methods', 'Evidence-Based Medicine', 'Clinical Trials',
    'Biostatistics', 'Scientific Writing', 'Critical Appraisal',
  ],
  Nursing: [
    'Fundamentals', 'Medical Surgical Nursing', 'Pediatric Nursing',
    'Maternal Health', 'Mental Health Nursing',
  ],
  Dentistry: ['Oral Medicine', 'Oral Surgery', 'Preventive Dentistry'],
  Nutrition: ['Clinical Nutrition', 'Dietetics', 'Community Nutrition'],
};

/** All supported document types */
export const DOCUMENT_TYPES = [
  'Textbook', 'Textbook Chapter', 'Lecture Notes', 'Clinical Guideline',
  'Research Article', 'Review Article', 'Case Report', 'Clinical Case',
  'Reference Manual', 'Drug Monograph', 'Protocol', 'Study Guide',
  'Flashcard Deck', 'Quiz Bank', 'Presentation Slide', 'Video Transcript',
  'Audio Recording', 'Image Atlas', 'Anatomy Diagram', 'Lab Manual',
  'Formulary', 'Legal Document', 'Policy Document', 'Thesis',
  'Dissertation', 'Exam Paper', 'MCQ Bank', 'OSCE Guide',
  'Clinical Pearl Summary', 'Infographic', 'Cheat Sheet', 'Other',
] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

/** Educational levels from undergraduate to professional */
export const EDUCATIONAL_LEVELS = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year',
  'Postgraduate', 'Residency', 'Practicing Professional', 'General',
] as const;
export type EducationalLevel = (typeof EDUCATIONAL_LEVELS)[number];

/** Supported languages */
export const LANGUAGE_CODES = ['en', 'fr', 'es', 'de', 'it', 'pt', 'ar', 'sw'] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

/** Resource access scope */
export type ResourceAccessScope = 'public' | 'private' | 'shared';

/** AI-generated content metadata attached to each resource */
export interface AIMetadata {
  summary?: string;
  keywords: string[];
  learningObjectives: string[];
  chapterBreakdown?: string[];
  flashcardCount?: number;
  quizCount?: number;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  generatedAt?: number;
  embedding?: number[];
}

/** Duplicate detection match info */
export interface DuplicateInfo {
  isDuplicate: boolean;
  matchedById?: string;
  matchMethod?: 'title' | 'hash' | 'content' | 'isbn' | 'doi';
  matchScore: number;
}

/** Source attribution for legally redistributable resources */
export interface ResourceSource {
  name: string;
  url?: string;
  license: string;
  attribution?: string;
  accessedAt?: number;
}

/** Complete resource metadata for a knowledge base entry */
export interface ResourceMetadata {
  id: string;
  title: string;
  description?: string;

  // Classification
  discipline: Discipline;
  subDiscipline: string;
  documentType: DocumentType;
  educationalLevel: EducationalLevel | EducationalLevel[];

  // Authorship
  authors: string[];
  editor?: string;
  edition?: string;
  publisher?: string;
  year?: number;

  // Content
  language: LanguageCode;
  pageCount?: number;
  fileSize?: number;
  mimeType?: string;
  storagePath?: string;
  thumbnailUrl?: string;

  // Taxonomy
  tags: string[];
  keywords: string[];
  categories: string[];

  // Education Hub links
  modules?: string[];
  units?: string[];
  estimatedHours?: number;

  // AI metadata
  ai: AIMetadata;

  // Source & rights
  source: ResourceSource;
  accessScope: ResourceAccessScope;

  // Identity & dedup
  contentHash?: string;
  isbn?: string;
  doi?: string;
  duplicateInfo?: DuplicateInfo;

  // System
  uploadedBy: string;
  uploadedByEmail?: string;
  uploadedAt: number;
  updatedAt: number;
  lastAccessedAt?: number;
  accessCount?: number;
  version: number;

  // Pipeline status
  status: 'pending' | 'processing' | 'indexed' | 'failed';
  processingError?: string;
  indexedAt?: number;
}

// ============================================================
// Clinical Case Types
// ============================================================

export interface Investigation {
  type: 'lab' | 'imaging' | 'pathology' | 'microbiology' | 'other';
  name: string;
  findings: string;
  isKeyFinding?: boolean;
}

export interface MedicationRegimen {
  drug: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  notes?: string;
  isFirstLine?: boolean;
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

/** A structured clinical teaching case */
export interface ClinicalCase {
  id: string;
  title: string;

  // Classification
  discipline: Discipline;
  specialty: string;
  subSpecialty?: string;

  // Clinical data
  patientPresentation: string;
  history: string;
  examination: string;
  differentialDiagnoses: string[];
  investigations: Investigation[];
  diagnosis: string;

  // Management
  pharmacologicalManagement: MedicationRegimen[];
  nonPharmacologicalManagement: string[];

  // Monitoring & follow-up
  monitoring: string[];
  followUp: string;

  // Educational content
  learningObjectives: string[];
  clinicalPearls: string[];
  discussionPoints?: string[];

  // Difficulty & time
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedStudyMinutes: number;

  // AI-generated supplements
  aiGeneratedFlashcards?: { question: string; answer: string }[];
  aiGeneratedMCQs?: MCQ[];

  // Attribution
  source: ResourceSource;
  tags: string[];
  references: string[];
  uploadedBy: string;
  createdAt: number;
  updatedAt: number;
  version: number;
}

// ============================================================
// Search & Ingestion Types
// ============================================================

export interface SearchFilters {
  discipline?: Discipline | Discipline[];
  subDiscipline?: string;
  documentType?: DocumentType | DocumentType[];
  educationalLevel?: EducationalLevel | EducationalLevel[];
  language?: LanguageCode;
  yearFrom?: number;
  yearTo?: number;
  authors?: string[];
  tags?: string[];
  query?: string;
}

export interface SearchResult {
  resource: ResourceMetadata;
  score: number;
  highlights?: string[];
}

export interface IngestionOptions {
  generateSummary?: boolean;
  generateFlashcards?: boolean;
  generateMCQs?: boolean;
  extractMetadata?: boolean;
  checkDuplicates?: boolean;
  indexForSearch?: boolean;
  generateEmbeddings?: boolean;
}

export interface BatchIngestionResult {
  totalProcessed: number;
  succeeded: number;
  failed: number;
  duplicates: number;
  errors: { title: string; error: string }[];
}

// ============================================================
// Education Hub Module Integration
// ============================================================

/** Maps a discipline to its Education Hub module ID */
export const DISCIPLINE_MODULE_MAP: Partial<Record<Discipline, string>> = {
  Physiology: 'physio',
  Anatomy: 'anatomy',
  Biochemistry: 'biochem',
  'Pharmaceutical Chemistry': 'pharmchem',
  Pharmaceutics: 'pharmaceutics',
  Pharmacognosy: 'pharmacognosy',
  Microbiology: 'microbio',
  Pathology: 'pathology',
  'Public Health': 'public_health',
  Research: 'biostats',
  Pharmacology: 'pharmacology',
  Pharmacy: 'drug_info',
  'Clinical Medicine': 'clinical_pharm',
  Nursing: 'clinical_pharm',
};

/** Maps educational level to the year string */
export const LEVEL_TO_YEAR: Record<string, EducationalLevel> = {
  '1': '1st Year',
  '2': '2nd Year',
  '3': '3rd Year',
  '4': '4th Year',
  '5': '5th Year',
  '6': 'Postgraduate',
};
