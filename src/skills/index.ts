// ================================================================
// Clinova AI Skills System — Main Export
// ================================================================

export { skillRegistry } from './registry';
export { orchestrateSkills } from './orchestrator';

// Skills (auto-register on import)
import './academicKnowledge';
import './clinicalReasoning';
import './drugInformation';
import './knowledgeRetrieval';
import './diseaseKnowledge';
import './clinicalCases';
import './assessment';
import './summarization';
import './citation';
import './evidenceBasedMedicine';
import './presentation';
import './teaching';
import './learningObjectiveExtraction';
import './curriculumMapping';
import './adaptiveLearning';
import './conceptMapping';
import './knowledgeGapDetection';
import './semanticSearch';
import './memory';
import './externalKnowledge';
import './onlineLibrary';
import './webResearch';
import './knowledgeGraph';
import './caching';
import './pharmaceuticalManufacturing';
import './regulatoryAffairs';
import './pharmacovigilance';
import './supplyChainKnowledge';
import './kenyanIndustry';

// Types
export type {
  Skill,
  SkillDefinition,
  SkillContext,
  SkillResponse,
  SkillId,
  SkillCategory,
  SkillRecommendation,
  SkillReference,
  OrchestrationPlan,
  OrchestrationResult,
} from './types';
