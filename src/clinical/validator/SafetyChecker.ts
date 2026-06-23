import type { Drug, Interaction } from '../../types/engine';

export interface SafetyCheckResult {
  safe: boolean;
  riskLevel: 'none' | 'low' | 'moderate' | 'high' | 'critical';
  warnings: string[];
  details: string[];
}

export interface SafetyProfile {
  drugAllergies: string[];
  pregnancyStatus: 'none' | 'first_trimester' | 'second_trimester' | 'third_trimester' | 'lactating';
  age?: number;
  weight?: number;
  renalFunction?: { egfr: number; stage: string };
  hepaticFunction?: { childPugh: string; score: number };
  conditions: string[];
  currentMedications: string[];
}

export class SafetyChecker {
  checkDrugAllergies(drug: Drug, profile: SafetyProfile): SafetyCheckResult {
    const warnings: string[] = [];
    const details: string[] = [];

    for (const allergy of profile.drugAllergies) {
      if (drug.aliases?.includes(allergy) || drug.name.toLowerCase() === allergy.toLowerCase()) {
        warnings.push(`Patient has documented allergy to ${drug.name}`);
        details.push(`Allergy match: ${allergy} on drug class ${drug.class}`);
      }
    }

    return {
      safe: warnings.length === 0,
      riskLevel: warnings.length > 0 ? 'high' : 'none',
      warnings,
      details,
    };
  }

  checkPregnancySafety(drug: Drug, profile: SafetyProfile): SafetyCheckResult {
    if (profile.pregnancyStatus === 'none') {
      return { safe: true, riskLevel: 'none', warnings: [], details: ['Not pregnant or lactating'] };
    }

    const warnings: string[] = [];
    const details: string[] = [];
    const category = drug.pregnancy_category || 'N/A';

    if (category === 'X') {
      warnings.push(`${drug.name} is Category X - contraindicated in pregnancy`);
      details.push(`FDA Category X: Fetal abnormalities confirmed`);
    } else if (['D', 'C'].includes(category)) {
      const risk = category === 'D' ? 'high' : 'moderate';
      warnings.push(`${drug.name} is Category ${category} - use with caution`);
      details.push(`Risk level: ${risk} during ${profile.pregnancyStatus}`);
    }

    return {
      safe: !['X', 'D'].includes(category),
      riskLevel: category === 'X' ? 'critical' : category === 'D' ? 'high' : 'low',
      warnings,
      details,
    };
  }

  checkRenalDosing(drug: Drug, profile: SafetyProfile): SafetyCheckResult {
    if (!profile.renalFunction || !drug.dosing?.renal) {
      return { safe: true, riskLevel: 'none', warnings: [], details: ['No renal adjustment needed'] };
    }

    const warnings: string[] = [];
    const details: string[] = [];
    const { egfr } = profile.renalFunction;
    const renal = drug.dosing.renal;

    if (renal.contraindicated && egfr < (renal.threshold || 30)) {
      warnings.push(`${drug.name} is contraindicated at eGFR ${egfr}`);
      details.push(`Renal threshold: ${renal.threshold || 30} mL/min`);
    } else if (renal.adjustmentRequired && egfr < (renal.adjustThreshold || 60)) {
      warnings.push(`${drug.name} requires dose adjustment at eGFR ${egfr}`);
      details.push(`Recommended adjustment: ${renal.adjustmentGuide || 'Reduce dose'}`);
    }

    return {
      safe: !warnings.some(w => w.includes('contraindicated')),
      riskLevel: warnings.some(w => w.includes('contraindicated')) ? 'critical' : 'moderate',
      warnings,
      details,
    };
  }

  checkHepaticDosing(drug: Drug, profile: SafetyProfile): SafetyCheckResult {
    if (!profile.hepaticFunction || !drug.dosing?.hepatic) {
      return { safe: true, riskLevel: 'none', warnings: [], details: ['No hepatic adjustment needed'] };
    }

    const warnings: string[] = [];
    const details: string[] = [];
    const { childPugh } = profile.hepaticFunction;
    const hepatic = drug.dosing.hepatic;

    if (hepatic.contraindicated && ['C', 'B'].includes(childPugh)) {
      warnings.push(`${drug.name} is contraindicated in Child-Pugh ${childPugh}`);
      details.push(`Hepatic severity: ${childPugh}`);
    } else if (hepatic.adjustmentRequired && childPugh === 'B') {
      warnings.push(`${drug.name} requires dose adjustment for Child-Pugh ${childPugh}`);
    }

    return {
      safe: !warnings.some(w => w.includes('contraindicated')),
      riskLevel: hepatic.contraindicated ? 'high' : 'moderate',
      warnings,
      details,
    };
  }

  checkPediatricDosing(drug: Drug, profile: SafetyProfile): SafetyCheckResult {
    if (!profile.age || profile.age >= 18) {
      return { safe: true, riskLevel: 'none', warnings: [], details: ['Adult patient'] };
    }

    const warnings: string[] = [];
    const details: string[] = [];

    if (!drug.dosing?.pediatric) {
      warnings.push(`${drug.name} has no pediatric dosing information`);
      details.push(`Age: ${profile.age} years - insufficient pediatric data`);
    }

    return {
      safe: warnings.length === 0,
      riskLevel: !drug.dosing?.pediatric ? 'high' : 'low',
      warnings,
      details,
    };
  }

  checkDuplicateTherapy(drug: Drug, profile: SafetyProfile): SafetyCheckResult {
    const warnings: string[] = [];
    const details: string[] = [];

    for (const med of profile.currentMedications) {
      if (drug.class && med.toLowerCase().includes(drug.class.toLowerCase())) {
        warnings.push(`Potential duplicate therapy with ${drug.class} class`);
        details.push(`${drug.name} and ${med} share the same class`);
      }
    }

    return {
      safe: warnings.length === 0,
      riskLevel: warnings.length > 0 ? 'moderate' : 'none',
      warnings,
      details,
    };
  }
}
