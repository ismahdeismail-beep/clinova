// ============================================================
// Clinova Engine — Unified Educational Intelligence
// Central exports for all engine services
// ============================================================

export { KnowledgeEngine, knowledgeEngine } from './knowledgeEngine';
export type { EducationalContext, AIRecommendation, KnowledgeEngineResponse } from './knowledgeEngine';

export { KnowledgeGraph, knowledgeGraph } from './knowledgeGraph';
export type { KnowledgeNode, KnowledgeNodeType, Relationship, RelationshipType, GraphExport } from './knowledgeGraph';

export { LearningIntelligence, learningIntelligence } from './learningIntelligence';
export type { StudySession, LearnerProfile, PersonalizedRecommendation, WeakArea, PerformanceTrend, RevisionScheduleItem, DueReviewItem } from './learningIntelligence';

export { SmartSearch, smartSearch } from './smartSearch';
export type { SmartSearchQuery, SmartSearchResult, SmartSearchResponse, SmartSearchFilters, SearchIntent } from './smartSearch';

export { UploadPipeline, uploadPipeline } from './uploadPipeline';
export type { UploadedFile, UploadPipelineResult, ClassificationResult, ExtractedContent } from './uploadPipeline';
