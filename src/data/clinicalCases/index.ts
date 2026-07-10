// ================================================================
// Clinical Cases — Barrel Export (Auto-generated)
// Merges all subject-based case modules into a single array.
// Version: 3.0.0 — Full regeneration from all templates
// Generated on: 2026-07-10T14:02:56.362Z
// ================================================================

import type { ClinicalCase } from '../clinicalCasesData';

import { general_pharmacology_cases } from './general_pharmacology';
import { autonomic_pharmacology_cases } from './autonomic_pharmacology';
import { cardiovascular_pharmacology_cases } from './cardiovascular_pharmacology';
import { respiratory_pharmacology_cases } from './respiratory_pharmacology';
import { gastrointestinal_pharmacology_cases } from './gastrointestinal_pharmacology';
import { endocrine_pharmacology_cases } from './endocrine_pharmacology';
import { vitamins_nutrition_cases } from './vitamins_nutrition';
import { central_nervous_system_pharmacology_cases } from './central_nervous_system_pharmacology';
import { pain_inflammation_cases } from './pain_inflammation';
import { chemotherapy_antimicrobial_pharmacology_cases } from './chemotherapy_antimicrobial_pharmacology';
import { oncology_cases } from './oncology';
import { hematology_cases } from './hematology';
import { renal_pharmacology_cases } from './renal_pharmacology';
import { dermatology_cases } from './dermatology';
import { ophthalmology_cases } from './ophthalmology';
import { toxicology_cases } from './toxicology';
import { clinical_pharmacy_cases } from './clinical_pharmacy';

// Merge all generated case batches into one array
export const GENERATED_CASES: ClinicalCase[] = [
  ...general_pharmacology_cases,
  ...autonomic_pharmacology_cases,
  ...cardiovascular_pharmacology_cases,
  ...respiratory_pharmacology_cases,
  ...gastrointestinal_pharmacology_cases,
  ...endocrine_pharmacology_cases,
  ...vitamins_nutrition_cases,
  ...central_nervous_system_pharmacology_cases,
  ...pain_inflammation_cases,
  ...chemotherapy_antimicrobial_pharmacology_cases,
  ...oncology_cases,
  ...hematology_cases,
  ...renal_pharmacology_cases,
  ...dermatology_cases,
  ...ophthalmology_cases,
  ...toxicology_cases,
  ...clinical_pharmacy_cases,
];

// Version tracking for cache invalidation
export const GENERATED_CASES_VERSION = '3.0.0';
export const GENERATED_CASES_COUNT = GENERATED_CASES.length;
