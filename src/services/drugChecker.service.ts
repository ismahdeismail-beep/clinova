import { BUNDLED_DRUGS } from '../data/drugIndexData'
import { CLASS_INTERACTION_RULES } from '../data/drugClassInteractionRules'
import { SPECIFIC_INTERACTIONS } from '../data/drugSpecificInteractions'
import { DRUG_CONTRAINDICATIONS } from '../data/drugContraindicationsData'
import { DRUG_TOXICITY_PROFILES } from '../data/drugToxicityData'
import { DRUG_TO_CLASSES } from '../data/drugInteractionClassMap'
import type {
  DrugInteraction,
  DrugContraindication,
  DrugToxicityProfile,
  InteractionCheckResult,
  InteractionSeverity,
} from '../types/drugChecker'

// Build lookup indices
const SPECIFIC_INDEX = new Map<string, DrugInteraction[]>()
for (const inter of SPECIFIC_INTERACTIONS) {
  const keyA = inter.drug_a.toLowerCase()
  const keyB = inter.drug_b.toLowerCase()
  if (!SPECIFIC_INDEX.has(keyA)) SPECIFIC_INDEX.set(keyA, [])
  if (!SPECIFIC_INDEX.has(keyB)) SPECIFIC_INDEX.set(keyB, [])
  SPECIFIC_INDEX.get(keyA)!.push(inter)
  SPECIFIC_INDEX.get(keyB)!.push(inter)
}

const CONTRA_INDEX = new Map<string, DrugContraindication[]>()
for (const c of DRUG_CONTRAINDICATIONS) {
  const key = c.drug_name.toLowerCase()
  if (!CONTRA_INDEX.has(key)) CONTRA_INDEX.set(key, [])
  CONTRA_INDEX.get(key)!.push(c)
}

const TOXICITY_INDEX = new Map<string, DrugToxicityProfile>()
for (const t of DRUG_TOXICITY_PROFILES) {
  TOXICITY_INDEX.set(t.drug_name.toLowerCase(), t)
}

const DRUG_NAME_INDEX = new Map<string, (typeof BUNDLED_DRUGS)[number]>()
for (const d of BUNDLED_DRUGS) {
  DRUG_NAME_INDEX.set(d.name.toLowerCase(), d)
}

const SEVERITY_RANK: Record<InteractionSeverity, number> = {
  contraindicated: 4,
  major: 3,
  moderate: 2,
  minor: 1,
}

function resolveClasses(drugName: string): string[] {
  const name = drugName.toLowerCase().trim()
  const mapped = DRUG_TO_CLASSES[name]
  if (mapped && mapped.length > 0) return mapped

  // Fallback: try substring match in the DRUG_TO_CLASSES keys
  for (const [key, classes] of Object.entries(DRUG_TO_CLASSES)) {
    if (name.includes(key) || key.includes(name)) return classes
  }

  // Final fallback: derive from drug data
  const drug = DRUG_NAME_INDEX.get(name)
  if (drug) {
    const cls = drug.drug_class_name || drug.drug_class || ''
    return [cls]
  }
  return []
}

function checkClassInteractions(
  drugAName: string,
  drugBName: string,
  classesA: string[],
  classesB: string[],
): DrugInteraction[] {
  const results: DrugInteraction[] = []

  for (const rule of CLASS_INTERACTION_RULES) {
    const aMatchesRule = classesA.some((ca) =>
      rule.class_a.some((rc) => ca.toLowerCase() === rc.toLowerCase()),
    )
    const bMatchesRule = classesB.some((cb) =>
      rule.class_b.some((rc) => cb.toLowerCase() === rc.toLowerCase()),
    )

    if (aMatchesRule && bMatchesRule) {
      results.push({
        id: `class-${rule.class_a.join('-')}-${rule.class_b.join('-')}`,
        drug_a: drugAName,
        drug_b: drugBName,
        severity: rule.severity,
        mechanism: rule.mechanism,
        effect: rule.effect,
        management: rule.management,
        evidence: 'established',
        dose_dependent: rule.onset === 'variable',
        onset: rule.onset,
      })
    }
  }

  return results
}

function checkSpecificInteractions(drugAName: string, drugBName: string): DrugInteraction[] {
  const nameA = drugAName.toLowerCase().trim()
  const nameB = drugBName.toLowerCase().trim()
  const results: DrugInteraction[] = []

  // Check direct name matches in the interaction data
  for (const inter of SPECIFIC_INTERACTIONS) {
    const interA = inter.drug_a.toLowerCase().trim()
    const interB = inter.drug_b.toLowerCase().trim()

    const matchForward =
      (nameA === interA || nameA.includes(interA) || interA.includes(nameA)) &&
      (nameB === interB || nameB.includes(interB) || interB.includes(nameB))
    const matchReverse =
      (nameA === interB || nameA.includes(interB) || interB.includes(nameA)) &&
      (nameB === interA || nameB.includes(interA) || interA.includes(nameB))

    if (matchForward || matchReverse) {
      results.push({ ...inter, drug_a: drugAName, drug_b: drugBName })
    }
  }

  // Also check via class-based specific interactions
  const classesA = resolveClasses(drugAName)
  const classesB = resolveClasses(drugBName)

  for (const inter of SPECIFIC_INTERACTIONS) {
    const interAClasses = resolveClasses(inter.drug_a)
    const interBClasses = resolveClasses(inter.drug_b)

    const classesAMatch = classesA.some((ca) =>
      interAClasses.some((ic) => ca.toLowerCase() === ic.toLowerCase()),
    )
    const classesBMatch = classesB.some((cb) =>
      interBClasses.some((ic) => cb.toLowerCase() === ic.toLowerCase()),
    )

    if (classesAMatch && classesBMatch) {
      const alreadyFound = results.some(
        (r) => r.id === inter.id || (r.mechanism === inter.mechanism && r.effect === inter.effect),
      )
      if (!alreadyFound) {
        results.push({ ...inter, drug_a: drugAName, drug_b: drugBName })
      }
    }
  }

  return results
}

export function checkInteractions(drugA: string, drugB: string): InteractionCheckResult {
  const classesA = resolveClasses(drugA)
  const classesB = resolveClasses(drugB)

  const direct = checkSpecificInteractions(drugA, drugB)
  const classBased = checkClassInteractions(drugA, drugB, classesA, classesB)

  const allInteractions = [...direct, ...classBased]

  const totalSeverity = allInteractions.reduce<InteractionSeverity | null>((max, inter) => {
    if (!max || SEVERITY_RANK[inter.severity] > SEVERITY_RANK[max]) return inter.severity
    return max
  }, null)

  return {
    drug_a: drugA,
    drug_b: drugB,
    found: allInteractions.length > 0,
    directInteractions: direct,
    classInteractions: classBased,
    totalSeverity,
  }
}

export function getContraindications(drugName: string): DrugContraindication[] {
  const name = drugName.toLowerCase().trim()
  const results: DrugContraindication[] = CONTRA_INDEX.get(name) || []
  // Also check substring matches
  for (const [key, contras] of CONTRA_INDEX) {
    if (name.includes(key) || key.includes(name)) {
      for (const c of contras) {
        if (!results.some((r) => r.condition === c.condition && r.rationale === c.rationale)) {
          results.push(c)
        }
      }
    }
  }
  return results
}

export function getToxicityProfile(drugName: string): DrugToxicityProfile | null {
  const name = drugName.toLowerCase().trim()
  const profile = TOXICITY_INDEX.get(name)
  if (profile) return profile
  // Substring match
  for (const [key, prof] of TOXICITY_INDEX) {
    if (name.includes(key) || key.includes(name)) return prof
  }
  return null
}

export function searchDrugsForChecker(query: string): string[] {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase().trim()
  return BUNDLED_DRUGS.filter(
    (d) => d.name.toLowerCase().includes(q) || d.generic_name.toLowerCase().includes(q),
  )
    .map((d) => d.name)
    .sort()
    .slice(0, 20)
}

export function getAllDrugNames(): string[] {
  return BUNDLED_DRUGS.map((d) => d.name).sort()
}

export function getDrugClasses(drugName: string): string[] {
  return resolveClasses(drugName)
}
