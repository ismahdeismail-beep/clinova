export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor'
export type OnsetType = 'rapid' | 'delayed' | 'variable'
export type EvidenceLevel = 'established' | 'theoretical' | 'case-report'
export type ContraindicationSeverity = 'absolute' | 'relative'

export interface DrugInteraction {
  id: string
  drug_a: string
  drug_b: string
  severity: InteractionSeverity
  mechanism: string
  effect: string
  management: string
  evidence: EvidenceLevel
  dose_dependent: boolean
  onset: OnsetType
}

export interface DrugContraindication {
  drug_name: string
  condition: string
  severity: ContraindicationSeverity
  rationale: string
  alternative: string
}

export interface DrugToxicityProfile {
  drug_name: string
  toxicities: DrugToxicity[]
}

export interface DrugToxicity {
  condition: string
  symptoms: string[]
  severity: 'life-threatening' | 'serious' | 'moderate' | 'mild'
  management: string
  antidote: string | null
  dose_threshold: string | null
}

export interface DrugClassInteractionRule {
  class_a: string[]
  class_b: string[]
  severity: InteractionSeverity
  mechanism: string
  effect: string
  management: string
  onset: OnsetType
}

export interface InteractionCheckResult {
  drug_a: string
  drug_b: string
  found: boolean
  directInteractions: DrugInteraction[]
  classInteractions: DrugInteraction[]
  totalSeverity: InteractionSeverity | null
}
