// ================================================================
// Education Hub — Unified Curriculum Modules
// ----------------------------------------------------------------
// This file now re-exports from the canonical curriculum.ts.
// All modules (Pharmacology, Clinical Pharmacy with 17 integrated
// units, Supporting Sciences, Cases, Drug Info, EBM, Tools) are
// defined in one place — no more year-based or duplicated models.
// ================================================================

export {
  EDUCATION_MODULES,
  getEducationModule,
  getModuleUnits,
  type EducationModule,
  type EducationModuleUnit,
  INTEGRATED_UNIT_IDS,
  type IntegratedUnitId,
  getIntegratedUnits,
  isIntegratedUnit,
  INTEGRATED_UNITS_MAP,
  getIntegratedUnitId,
  CURRICULUM,
  ALL_UNITS,
  ALL_LEARNING_OBJECTIVES,
  getArea,
  getUnit,
  getUnitsByArea,
  getUnitsByDisease,
  getDisease,
  getDiseaseIdByName,
  getDiseaseIdsForUnit,
  getLearningObjective,
  getLearningObjectivesForUnit,
  type CurriculumUnit,
  type CurriculumArea,
  type LearningObjective,
  type Disease,
} from './curriculum';
