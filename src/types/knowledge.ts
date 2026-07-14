// ================================================================
// Clinova Knowledge Types — KDI Monographs & Clinical Cases
// ================================================================

// ================================================================
// 1. Kenya Drug Index (KDI) Monograph
// ================================================================

export type PrescriptionStatus = 'OTC' | 'Prescription-only' | 'Controlled' | 'Hospital-only'

export type ControlledStatus =
  | 'Non-controlled'
  | 'Schedule I'
  | 'Schedule II'
  | 'Schedule III'
  | 'Schedule IV'
  | 'Schedule V'

export type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X' | 'N'

export type LactationSafety = 'Safe' | 'Caution' | 'Contraindicated' | 'Unknown'

export type RenalAdjustment = 'None' | 'Adjust dose' | 'Adjust interval' | 'Contraindicated'

export type HepaticAdjustment = 'None' | 'Adjust dose' | 'Adjust interval' | 'Contraindicated'

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'I' | 'II' | 'III' | 'IV'

export type RecommendationGrade = 'Strong for' | 'Weak for' | 'Weak against' | 'Strong against' | 'No recommendation'

export type Severity = 'Minor' | 'Moderate' | 'Major' | 'Severe' | 'Fatal'

export type Frequency = 'Very common' | 'Common' | 'Uncommon' | 'Rare' | 'Very rare' | 'Unknown'

export interface KdiHeader {
  genericName: string
  brandNamesKenya: string[]
  drugClass: string
  therapeuticClass: string
  atcCode: string
  prescriptionStatus: PrescriptionStatus
  controlledStatus: ControlledStatus
  whoEssentialMedicine: boolean
  kemsListed: boolean
  kenyaGuidelineIncluded: boolean
}

export interface QuickSummary {
  primaryUses: string[]
  mechanismOfAction: string
  adultDose: string
  pediatricDose: string
  pregnancyCategory: PregnancyCategory
  lactationSafety: LactationSafety
  renalAdjustment: RenalAdjustment
  hepaticAdjustment: HepaticAdjustment
  commonSeriousWarning: string
}

export interface BrandEntry {
  brandName: string
  manufacturer: string
  strengths: string[]
  dosageForms: string[]
}

export interface FormulationEntry {
  form: string
  strength: string
  route: string
}

export interface Pharmacokinetics {
  absorption: string
  distribution: string
  metabolism: string
  elimination: string
  halfLife: string
  proteinBinding: string
  bioavailability: string
}

export interface IndicationDetail {
  indication: string
  type: 'Approved' | 'Off-label' | 'Kenya Guideline' | 'WHO Recommendation'
  evidenceLevel?: EvidenceLevel
}

export interface DosageRegimen {
  indication: string
  adults: string
  children: string
  renalAdjustment: string
  hepaticAdjustment: string
  maxDose: string
  duration: string
}

export interface AdministrationDetails {
  route: string
  instructions: string
  infusionRate?: string
  reconstitution?: string
  dilution?: string
  compatibility: string[]
  storageAfterPreparation: string
}

export interface InteractionEntry {
  drug: string
  severity: Severity
  mechanism: string
  clinicalRecommendation: string
}

export interface InteractionSection {
  major: InteractionEntry[]
  moderate: InteractionEntry[]
  minor: InteractionEntry[]
  food: InteractionEntry[]
  alcohol: InteractionEntry[]
  herbal: InteractionEntry[]
  vaccines: InteractionEntry[]
}

export interface AdverseReaction {
  reaction: string
  frequency: Frequency
  severity: Severity
  management: string
}

export interface AdverseSection {
  common: AdverseReaction[]
  lessCommon: AdverseReaction[]
  serious: AdverseReaction[]
  rare: AdverseReaction[]
  emergencySymptoms: string[]
}

export interface MonitoringSection {
  baseline: string[]
  duringTherapy: string[]
  longTerm: string[]
}

export interface SpecialPopulationEntry {
  population: string
  recommendation: string
  doseAdjustment: string
}

export interface EvidenceEntry {
  source: string
  finding: string
  year?: number
  level: EvidenceLevel
  recommendation?: RecommendationGrade
}

export interface PatientCounseling {
  howToTake: string
  missedDose: string
  sideEffects: string[]
  storage: string
  whenToSeekHelp: string[]
  lifestyleAdvice: string[]
}

export interface AiFeature {
  id: string
  label: string
  type: 'summary' | 'explain' | 'flashcard' | 'quiz' | 'osce' | 'ward-round' | 'compare' | 'alternative' | 'mechanism' | 'patient-ed'
}

export interface KdiMonograph {
  header: KdiHeader
  quickSummary: QuickSummary
  description: string
  clinicalImportance: string
  commonKenyanIndications: string[]
  brandNames: {
    kenya: BrandEntry[]
    international: BrandEntry[]
  }
  availableFormulations: FormulationEntry[]
  mechanismOfAction: {
    molecularTarget: string
    pharmacologicalAction: string
    clinicalEffect: string
  }
  pharmacokinetics: Pharmacokinetics
  indications: IndicationDetail[]
  dosage: DosageRegimen[]
  administration: AdministrationDetails
  contraindications: {
    absolute: string[]
    relative: string[]
    blackBoxWarnings: string[]
  }
  warnings: {
    pregnancy: string
    breastfeeding: string
    g6pd: string
    heartDisease: string
    renalFailure: string
    liverDisease: string
    elderly: string
    children: string
  }
  interactions: InteractionSection
  adverseEffects: AdverseSection
  monitoring: MonitoringSection
  specialPopulations: SpecialPopulationEntry[]
  overdose: {
    symptoms: string[]
    management: string
    antidote: string
    supportiveCare: string
  }
  clinicalPearls: string[]
  patientCounseling: PatientCounseling
  evidenceSummary: EvidenceEntry[]
  references: {
    who: string[]
    kenyaMOH: string[]
    kems: string[]
    bnf: string[]
    lexicomp: string[]
    micromedex: string[]
    pubmed: string[]
    fda: string[]
    ema: string[]
    guidelines: string[]
  }
  aiFeatures: AiFeature[]
  metadata: {
    createdAt: string
    updatedAt: string
    reviewedBy?: string
    reviewDate?: string
    version: string
    aiConfidenceScore?: number
    evidenceQualityRating?: string
  }
}

// ================================================================
// 2. Clinical Case
// ================================================================

export type CaseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export type ClinicalSetting =
  | 'Outpatient'
  | 'Inpatient'
  | 'Emergency'
  | 'ICU'
  | 'Community'
  | 'Ward'
  | 'Clinic'
  | 'Pharmacy'

export type InvestigationCategory =
  | 'Laboratory'
  | 'Imaging'
  | 'Microbiology'
  | 'ECG'
  | 'Bedside'

export type DrugRelatedProblemType =
  | 'Unnecessary drug'
  | 'Needs additional drug'
  | 'Ineffective drug'
  | 'Dosage too low'
  | 'Dosage too high'
  | 'Adverse drug reaction'
  | 'Non-adherence'
  | 'Drug interaction'
  | 'Incorrect drug'
  | 'Monitoring needed'
  | 'Cost concern'

export interface Header {
  title: string
  specialty: string
  difficulty: CaseDifficulty
  curriculumUnit: string
  clinicalSetting: ClinicalSetting
  estimatedTime: string
  learningObjectives: string[]
  tags: string[]
}

export interface PatientInfo {
  patientId: string
  age: number
  sex: 'Male' | 'Female' | 'Other'
  weight: string
  height: string
  occupation: string
  residence: string
  maritalStatus: string
  religion?: string
  insurance: string
}

export interface PresentingComplaint {
  chiefComplaint: string
  duration: string
}

export interface HistoryOfPresentingIllness {
  chronology: string
  associatedSymptoms: string[]
  aggravatingFactors: string[]
  relievingFactors: string[]
  previousTreatment: string
}

export interface PastMedicalHistory {
  chronicDiseases: string[]
  hospitalAdmissions: string[]
  previousSurgeries: string[]
  allergies: string[]
  immunizations: string[]
}

export interface DrugHistory {
  currentMedications: string[]
  previousMedications: string[]
  otcMedicines: string[]
  traditionalMedicines: string[]
  adherence: string
  adverseReactions: string[]
}

export interface FamilyHistory {
  relevantIllnesses: string[]
  geneticDisorders: string[]
}

export interface SocialHistory {
  smoking: string
  alcohol: string
  substanceUse: string
  occupation: string
  travel: string
  diet: string
  exercise: string
  sexualHistory?: string
}

export interface ReviewOfSystems {
  cardiovascular: string
  respiratory: string
  neurology: string
  git: string
  endocrine: string
  renal: string
  dermatology: string
  musculoskeletal: string
  psychiatric: string
}

export interface VitalSigns {
  bp: string
  hr: string
  rr: string
  temp: string
  spo2: string
  weight: string
  height: string
  bmi?: string
}

export interface PhysicalExamination {
  general: string
  vitals: VitalSigns
  head: string
  neck: string
  cardiovascular: string
  respiratory: string
  abdominal: string
  neurological: string
  extremities: string
  skin: string
}

export interface InitialImpression {
  workingDiagnosis: string
  differentialDiagnoses: string[]
  severity: string
  riskStratification: string
}

export interface InvestigationEntry {
  test: string
  category: InvestigationCategory
  result: string
  normalRange: string
  flag: 'Normal' | 'High' | 'Low' | 'Critical' | 'Pending'
}

export interface ClinicalAssessment {
  interpretation: string
  problemList: string[]
  medicationProblems: DrugRelatedProblem[]
  riskFactors: string[]
  complications: string[]
}

export interface DrugRelatedProblem {
  problem: string
  type: DrugRelatedProblemType
  recommendation: string
}

export interface PharmacotherapyReview {
  currentTreatment: string[]
  drugRelatedProblems: DrugRelatedProblem[]
  indication: string
  effectiveness: string
  safety: string
  adherence: string
  costConsiderations: string
  monitoringNeeds: string[]
}

export interface TreatmentPlan {
  nonPharmacological: string[]
  pharmacological: string[]
  dose: string
  frequency: string
  duration: string
  monitoring: string[]
  patientCounseling: string
  followUp: string
}

export interface ClinicalGuidelines {
  kenyaGuideline: string[]
  who: string[]
  nice: string[]
  idsa?: string[]
  esc?: string[]
  other: string[]
}

export interface Outcome {
  clinicalProgress: string
  discharge?: string
  referral?: string
  complications?: string[]
  followUpOutcome: string
}

export interface Reflection {
  whatWentWell: string[]
  missedOpportunities: string[]
  keyLearningPoints: string[]
  clinicalPearls: string[]
}

export interface Discussion {
  pathophysiology: string
  rationale: string
  alternativeTreatments: string[]
  evidence: string[]
  recentStudies: string[]
}

export interface SelfAssessment {
  mcqs: McqEntry[]
  trueFalse: TrueFalseEntry[]
  shortAnswer: ShortAnswerEntry[]
  drugTherapyProblems: DrugTherapyProblemEntry[]
  clinicalDecision: ClinicalDecisionEntry[]
}

export interface McqEntry {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface TrueFalseEntry {
  statement: string
  answer: boolean
  explanation: string
}

export interface ShortAnswerEntry {
  question: string
  modelAnswer: string
}

export interface DrugTherapyProblemEntry {
  scenario: string
  expectedResponse: string
}

export interface ClinicalDecisionEntry {
  scenario: string
  options: string[]
  correctAnswer: number
  rationale: string
}

export interface AiLearningTool {
  id: string
  label: string
  type: 'soap' | 'intervention' | 'care-plan' | 'explain-dx' | 'explain-investigations' | 'ddx' | 'ward-round' | 'flashcard' | 'osce' | 'viva' | 'counseling' | 'summary'
}

export interface RelatedContent {
  relatedDrugs: string[]
  relatedDiseases: string[]
  relatedGuidelines: string[]
  relatedCases: string[]
  relatedBooks: string[]
  relatedLectureNotes: string[]
  relatedVideos: string[]
  relatedResearchPapers: string[]
}

export interface Attachment {
  id: string
  type: 'ECG' | 'X-ray' | 'CT' | 'MRI' | 'Lab Report' | 'Clinical Image' | 'Prescription' | 'Medication Chart' | 'Progress Note' | 'Discharge Summary'
  url: string
  title: string
  uploadedAt: string
}

export interface CaseFooter {
  references: string[]
  evidenceSources: string[]
  contributors: string[]
  reviewDate: string
  versionHistory: { version: string; date: string; changes: string }[]
  lastUpdated: string
  aiConfidenceScore?: number
  evidenceQualityRating?: string
}

export interface ClinicalCaseFull {
  id: string
  header: Header
  patientInfo: PatientInfo
  presentingComplaint: PresentingComplaint
  hpi: HistoryOfPresentingIllness
  pastMedicalHistory: PastMedicalHistory
  drugHistory: DrugHistory
  familyHistory: FamilyHistory
  socialHistory: SocialHistory
  reviewOfSystems: ReviewOfSystems
  physicalExamination: PhysicalExamination
  initialImpression: InitialImpression
  investigations: InvestigationEntry[]
  investigationResults: InvestigationEntry[]
  clinicalAssessment: ClinicalAssessment
  pharmacotherapyReview: PharmacotherapyReview
  treatmentPlan: TreatmentPlan
  clinicalGuidelines: ClinicalGuidelines
  outcome: Outcome
  reflection: Reflection
  discussion: Discussion
  selfAssessment: SelfAssessment
  aiLearningTools: AiLearningTool[]
  relatedContent: RelatedContent
  attachments: Attachment[]
  footer: CaseFooter
  status: 'draft' | 'published' | 'archived'
  createdBy: string
  createdAt: string
  updatedAt: string
}

// ================================================================
// 3. Utility Types
// ================================================================

export type KnowledgeResourceType =
  | 'kd_monograph'
  | 'clinical_case'
  | 'guideline'
  | 'study_note'
  | 'flashcard'
  | 'quiz'
  | 'reference'

export interface KnowledgeResource {
  id: string
  type: KnowledgeResourceType
  title: string
  tags: string[]
  summary: string
  curriculumUnit?: string
  specialty?: string
  difficulty?: CaseDifficulty
  createdAt: string
  updatedAt: string
}
