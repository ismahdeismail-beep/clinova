// ================================================================
// Clinova AI Skills System — Core Types & Interfaces
// Every skill shares these common types
// ================================================================

import type { EducationalContext } from '../engine/knowledgeEngine';
import type { ClinicalCase } from '../data/clinicalCasesData';
import type { LibraryResource } from '../data/onlineLibraryData';

// ================================================================
// Skill Identity
// ================================================================

// Open string union so the system can scale to the full academic
// skills catalogue (50+) without touching this file for every skill.
export type SkillId = string;

export type SkillCategory = string;

export interface SkillDefinition {
  id: SkillId;
  name: string;
  description: string;
  category: SkillCategory;
  version: string;
  dependencies?: SkillId[];
  /** Priority for orchestration (higher = runs first) */
  priority: number;
  /** Whether this skill requires network access */
  requiresNetwork?: boolean;
  /** Whether this skill is cacheable */
  cacheable?: boolean;
  /**
   * Intent keywords used by the orchestrator for automatic skill
   * selection. Any query containing one of these terms will
   * auto-include this skill — so adding a new skill is self-wiring.
   */
  intents?: string[];
  /** Cache lifetime in ms when cacheable (default 1 hour) */
  cacheTtlMs?: number;
}

// ================================================================
// Skill Context — passed to every skill invocation
// ================================================================

export interface SkillContext {
  /** The educational context detected from the query */
  educationalContext: EducationalContext;
  /** Raw user query */
  query: string;
  /** Chat history for context */
  chatHistory?: Array<{ role: string; content: string }>;
  /** Attached resource IDs */
  attachedResources?: string[];
  /** Learner profile data */
  learnerProfile?: {
    userId: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    weakAreas?: string[];
    strongAreas?: string[];
    recentTopics?: string[];
  };
  /** Available library resources (pre-filtered) */
  libraryResources?: LibraryResource[];
  /** Available clinical cases (pre-filtered) */
  clinicalCases?: ClinicalCase[];
  /** User preferences */
  preferences?: Record<string, any>;
  /** Feature flags */
  featureFlags?: Record<string, boolean>;
}

// ================================================================
// Skill Response
// ================================================================

export interface SkillResponse {
  skillId: SkillId;
  content?: string;
  data?: any;
  recommendations?: SkillRecommendation[];
  references?: SkillReference[];
  confidence: number;
  processingTimeMs: number;
  error?: string;
  /** Whether the result should be cached */
  cacheable?: boolean;
  /** Cache key if cacheable */
  cacheKey?: string;
}

export interface SkillRecommendation {
  type: 'book' | 'clinical_case' | 'guideline' | 'drug' | 'note' | 'flashcard' | 'quiz' | 'study_guide';
  title: string;
  resourceId?: string;
  relevance: number;
  reason: string;
  url?: string;
}

export interface SkillReference {
  source: 'user_upload' | 'library' | 'who' | 'guideline' | 'open_access' | 'textbook';
  title: string;
  authors?: string;
  year?: number;
  url?: string;
  citation?: string;
}

// ================================================================
// Skill Interface — every skill implements this
// ================================================================

export interface Skill {
  /** Skill definition / metadata */
  definition: SkillDefinition;

  /** Whether this skill can handle the given context */
  canHandle(context: SkillContext): boolean | Promise<boolean>;

  /** Execute the skill's primary function */
  execute(context: SkillContext): Promise<SkillResponse>;

  /** Get related recommendations from this skill */
  getRecommendations?(context: SkillContext): Promise<SkillRecommendation[]>;
}

// ================================================================
// Orchestrator Types
// ================================================================

export interface OrchestrationPlan {
  query: string;
  detectedIntent: string;
  selectedSkills: SkillId[];
  executionOrder: SkillId[];
  parallelGroups: SkillId[][];
  expectedResponseType: 'explanation' | 'clinical_case' | 'drug_info' | 'assessment' | 'study_material' | 'general';
}

export interface OrchestrationResult {
  query: string;
  plan: OrchestrationPlan;
  skillResults: Map<SkillId, SkillResponse>;
  consolidatedContent: string;
  recommendations: SkillRecommendation[];
  references: SkillReference[];
  processingTimeMs: number;
}
