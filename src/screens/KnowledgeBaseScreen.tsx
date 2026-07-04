import { useState, useEffect, useRef } from 'react';
import { 
  Search, FileText, BookOpen, FileUp, X, Sparkles, BrainCircuit, Headphones, FilePlus, Link2, 
  CheckCircle2, Loader2, Volume2, Heart, Wind, Droplets, Flame, Brain, Zap, Accessibility, 
  Shield, Smile, Eye, Clipboard, MessageSquare, Clock, ShieldAlert, ShieldCheck, HeartPulse, 
  Pill, Bug, ChevronLeft, ChevronRight, Check, Send, Award, Baby, Skull, AlertTriangle, Dna,
  Beaker, Activity, PlusCircle
} from 'lucide-react';
import Markdown from 'react-markdown';
import FileUploader from '../components/FileUploader';
import { useFileStore } from '../store/fileStore';
import { useAuth } from '../contexts/AuthContext';
import type { StoredFile } from '../types/engine';

interface BookResource {
  title: string;
  source: string;
  type: string;
  date: string;
  url?: string;
  isCustom?: boolean;
}

const STATIC_BOOKS: BookResource[] = [
  { title: 'Kenya Drug Index (KDI) 2024 Edition', source: 'PPB Kenya / KDI', type: 'Formulary Book', date: '2024-10', url: 'https://pharmacyboardkenya.org' },
  { title: 'WHO Model List of Essential Medicines (EML)', source: 'WHO Essential', type: 'Essential Book', date: '2024-08', url: 'https://who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines' },
  { title: 'Medscape Clinical Reference & Monographs', source: 'Medscape Online', type: 'Clinical Book', date: '2024-11', url: 'https://reference.medscape.com' },
  { title: 'Kenya National Essential Medicines List (KEML)', source: 'MOH Kenya', type: 'Essential Book', date: '2024-06' },
  { title: 'Antimicrobial Stewardship & Dosing Guide', source: 'Clinical Reference', type: 'Handbook', date: '2024-05' },
  { title: 'Renal & Hepatic Dose Adjustment Manual', source: 'Clinical Reference', type: 'Handbook', date: '2023-12' },
];

interface CurriculumModule {
  title: string;
  category: 'Foundation' | 'Body Systems' | 'Infectious Diseases' | 'Specialized Medicine' | 'Professional Practice';
  description: string;
  iconName: string;
  colorTheme: string;
}

const CURRICULUM_MODULES: CurriculumModule[] = [
  // Foundation
  { title: 'General Pharmacology', category: 'Foundation', description: 'Basic principles of pharmacology, pharmacokinetics, and pharmacodynamics.', iconName: 'Beaker', colorTheme: 'indigo' },
  { title: 'Pharmacokinetics', category: 'Foundation', description: 'Absorption, distribution, metabolism, elimination (ADME), half-life, and clearance.', iconName: 'Activity', colorTheme: 'indigo' },
  { title: 'Pharmacodynamics', category: 'Foundation', description: 'Drug-receptor interactions, dose-response curves, efficacy, and potency.', iconName: 'Dna', colorTheme: 'indigo' },
  { title: 'Drug Interactions', category: 'Foundation', description: 'Synergism, antagonism, enzyme induction, and inhibition mechanisms.', iconName: 'AlertTriangle', colorTheme: 'indigo' },
  { title: 'Adverse Drug Reactions', category: 'Foundation', description: 'Types of ADRs, reporting, identification, and prevention standards.', iconName: 'ShieldAlert', colorTheme: 'indigo' },
  { title: 'Clinical Pharmacy Fundamentals', category: 'Foundation', description: 'Role of clinical pharmacist, ward rounds, medication history, and reviews.', iconName: 'BookOpen', colorTheme: 'indigo' },
  { title: 'Evidence-Based Medicine', category: 'Foundation', description: 'Evaluating trials, clinical guidelines, and applying evidence to therapeutics.', iconName: 'Award', colorTheme: 'indigo' },
  { title: 'Pharmaceutical Care', category: 'Foundation', description: 'Designing, implementing, and monitoring patient care plans.', iconName: 'HeartPulse', colorTheme: 'indigo' },

  // Body Systems
  { title: 'Cardiovascular Pharmacology & Therapeutics', category: 'Body Systems', description: 'Hypertension, Heart Failure, CAD, Arrhythmias, and Anticoagulation.', iconName: 'Heart', colorTheme: 'red' },
  { title: 'Respiratory Pharmacology & Therapeutics', category: 'Body Systems', description: 'Asthma, COPD, Pulm Hypertension, and inhaler devices.', iconName: 'Wind', colorTheme: 'teal' },
  { title: 'Gastrointestinal Pharmacology & Therapeutics', category: 'Body Systems', description: 'PUD, GERD, IBD, liver diseases, and emesis control.', iconName: 'Activity', colorTheme: 'amber' },
  { title: 'Renal & Urinary Pharmacology & Therapeutics', category: 'Body Systems', description: 'CKD, AKI, UTIs, diuretics, and renal dose adjustments.', iconName: 'Droplets', colorTheme: 'blue' },
  { title: 'Endocrine Pharmacology & Therapeutics', category: 'Body Systems', description: 'Diabetes, Thyroid disorders, Adrenal therapy, and Osteoporosis.', iconName: 'Flame', colorTheme: 'orange' },
  { title: 'Central Nervous System Pharmacology & Therapeutics', category: 'Body Systems', description: 'Epilepsy, Parkinson’s, Alzheimers, Stroke, and neuro-pharmacology.', iconName: 'Brain', colorTheme: 'violet' },
  { title: 'Autonomic Nervous System', category: 'Body Systems', description: 'Adrenergic, cholinergic, sympathomimetics, and blockers.', iconName: 'Zap', colorTheme: 'yellow' },
  { title: 'Musculoskeletal & Rheumatology', category: 'Body Systems', description: 'Gout, OA, Rheumatoid Arthritis, and immunosuppressants.', iconName: 'Accessibility', colorTheme: 'emerald' },
  { title: 'Hematology', category: 'Body Systems', description: 'Anemia, bleeding disorders, and hematopoiesis.', iconName: 'Dna', colorTheme: 'rose' },
  { title: 'Immunology & Inflammation', category: 'Body Systems', description: 'Vaccines, biologicals, allergies, and immune responses.', iconName: 'Shield', colorTheme: 'pink' },
  { title: 'Dermatology', category: 'Body Systems', description: 'Psoriasis, eczema, acne, and topical pharmacokinetics.', iconName: 'Smile', colorTheme: 'fuchsia' },
  { title: 'Ophthalmology', category: 'Body Systems', description: 'Glaucoma, macular degeneration, and ocular drug delivery.', iconName: 'Eye', colorTheme: 'sky' },
  { title: 'Ear, Nose & Throat (ENT)', category: 'Body Systems', description: 'Otitis, sinusitis, allergic rhinitis, and local therapies.', iconName: 'Headphones', colorTheme: 'cyan' },
  { title: 'Reproductive Health', category: 'Body Systems', description: 'Contraception, fertility, and hormonal therapies.', iconName: 'HeartPulse', colorTheme: 'pink' },
  { title: 'Obstetrics & Gynecology Pharmacotherapy', category: 'Body Systems', description: 'Pregnancy-induced hypertension, gestational diabetes, and teratogenicity.', iconName: 'Baby', colorTheme: 'pink' },
  { title: 'Pediatrics Pharmacotherapy', category: 'Body Systems', description: 'Neonatal kinetics, pediatric dosing, and childhood infections.', iconName: 'Baby', colorTheme: 'pink' },
  { title: 'Geriatric Pharmacotherapy', category: 'Body Systems', description: 'Polypharmacy, Beers Criteria, and altered kinetics in elderly.', iconName: 'Accessibility', colorTheme: 'violet' },

  // Infectious Diseases
  { title: 'Antibacterial Agents', category: 'Infectious Diseases', description: 'Beta-lactams, macrolides, fluoroquinolones, and resistance patterns.', iconName: 'Bug', colorTheme: 'emerald' },
  { title: 'Antiviral Therapy', category: 'Infectious Diseases', description: 'Herpes, Hepatitis, and influenza treatment options.', iconName: 'Shield', colorTheme: 'emerald' },
  { title: 'Antifungal Therapy', category: 'Infectious Diseases', description: 'Azoles, echinocandins, amphotericin, and systemic mycoses.', iconName: 'Bug', colorTheme: 'emerald' },
  { title: 'Antiparasitic Therapy', category: 'Infectious Diseases', description: 'Anthelmintics, amoebiasis, and neglected tropical diseases.', iconName: 'Bug', colorTheme: 'emerald' },
  { title: 'Tuberculosis Management', category: 'Infectious Diseases', description: 'First-line/second-line anti-TB drugs and DOTS guidelines.', iconName: 'Activity', colorTheme: 'emerald' },
  { title: 'HIV/AIDS Pharmacotherapy', category: 'Infectious Diseases', description: 'ART regimens, opportunistic infections, and PEP/PrEP.', iconName: 'ShieldAlert', colorTheme: 'emerald' },
  { title: 'Malaria Pharmacotherapy', category: 'Infectious Diseases', description: 'ACTs, prophylaxis, and complicated malaria management in Kenya.', iconName: 'Bug', colorTheme: 'emerald' },
  { title: 'Antimicrobial Stewardship', category: 'Infectious Diseases', description: 'Infection control, narrowing therapy, and PPB guidelines.', iconName: 'Award', colorTheme: 'emerald' },

  // Specialized Medicine
  { title: 'Oncology Pharmacology', category: 'Specialized Medicine', description: 'Cytotoxics, targeted therapies, emesis protocols, and toxicities.', iconName: 'Sparkles', colorTheme: 'red' },
  { title: 'Toxicology', category: 'Specialized Medicine', description: 'Common poisonings, toxic syndromes, and specific antidotes.', iconName: 'Skull', colorTheme: 'rose' },
  { title: 'Emergency Medicine', category: 'Specialized Medicine', description: 'Anaphylaxis, cardiac arrest, status epilepticus, and crash cart drugs.', iconName: 'Zap', colorTheme: 'orange' },
  { title: 'Critical Care Pharmacy', category: 'Specialized Medicine', description: 'Sepsis, vasopressors, sedation, and fluid resuscitation.', iconName: 'HeartPulse', colorTheme: 'red' },
  { title: 'Pain Management', category: 'Specialized Medicine', description: 'WHO analgesic ladder, opioids, NSAIDs, and adjuvant therapies.', iconName: 'Activity', colorTheme: 'amber' },
  { title: 'Anesthesia', category: 'Specialized Medicine', description: 'General/local anesthetics, neuromuscular blockers, and induction.', iconName: 'Headphones', colorTheme: 'indigo' },
  { title: 'Nutrition & Clinical Support', category: 'Specialized Medicine', description: 'Enteral, Total Parenteral Nutrition (TPN), and electrolyte correction.', iconName: 'Activity', colorTheme: 'teal' },

  // Professional Practice
  { title: 'Prescription Interpretation', category: 'Professional Practice', description: 'Evaluating errors, abbreviations, legal requirements, and clinical screening.', iconName: 'FileText', colorTheme: 'amber' },
  { title: 'Clinical Case Discussions', category: 'Professional Practice', description: 'Analyzing subjective, objective, assessment, and plans (SOAP notes).', iconName: 'MessageSquare', colorTheme: 'amber' },
  { title: 'Therapeutic Drug Monitoring', category: 'Professional Practice', description: 'Aminoglycosides, digoxin, vancomycin, and phenytoin kinetics.', iconName: 'Clock', colorTheme: 'amber' },
  { title: 'Drug Information Services', category: 'Professional Practice', description: 'Answering clinical queries using authoritative tertiary resources.', iconName: 'BookOpen', colorTheme: 'amber' },
  { title: 'Pharmacovigilance', category: 'Professional Practice', description: 'Reporting ADRs, yellow forms, and post-market safety.', iconName: 'ShieldCheck', colorTheme: 'amber' },
  { title: 'Medication Safety', category: 'Professional Practice', description: 'Look-alike sound-alike drugs, high-alert drugs, and system barriers.', iconName: 'ShieldAlert', colorTheme: 'amber' },
  { title: 'Community Pharmacy', category: 'Professional Practice', description: 'OTC counseling, pharmacy laws, and inventory operations in Kenya.', iconName: 'Pill', colorTheme: 'amber' },
  { title: 'Hospital Pharmacy', category: 'Professional Practice', description: 'Unit dose dispensing, formulary management, and compounding.', iconName: 'HeartPulse', colorTheme: 'amber' },
  { title: 'Clinical Skills & OSCE', category: 'Professional Practice', description: 'Counseling simulations, device demonstrations, and physical assessments.', iconName: 'Award', colorTheme: 'amber' },
  { title: 'National Treatment Guidelines (Kenya)', category: 'Professional Practice', description: 'Applying MOH Kenya Clinical Guidelines and Essential Medicines Lists.', iconName: 'Award', colorTheme: 'amber' }
];

const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'Beaker': return Beaker;
    case 'Activity': return Activity;
    case 'Dna': return Dna;
    case 'AlertTriangle': return AlertTriangle;
    case 'ShieldAlert': return ShieldAlert;
    case 'BookOpen': return BookOpen;
    case 'Award': return Award;
    case 'HeartPulse': return HeartPulse;
    case 'Heart': return Heart;
    case 'Wind': return Wind;
    case 'Droplets': return Droplets;
    case 'Flame': return Flame;
    case 'Brain': return Brain;
    case 'Zap': return Zap;
    case 'Accessibility': return Accessibility;
    case 'Shield': return Shield;
    case 'Smile': return Smile;
    case 'Eye': return Eye;
    case 'Headphones': return Headphones;
    case 'Baby': return Baby;
    case 'Bug': return Bug;
    case 'Sparkles': return Sparkles;
    case 'Skull': return Skull;
    case 'FileText': return FileText;
    case 'MessageSquare': return MessageSquare;
    case 'Clock': return Clock;
    case 'ShieldCheck': return ShieldCheck;
    default: return BookOpen;
  }
};

const SAMPLE_CARDIOLOGY_MODULE = {
  overview: "Cardiovascular diseases remain a leading cause of morbidity and mortality globally and in Kenya. This integrated learning module connects the normal physiology of the heart with key cardiovascular pharmacotherapies and clinical pharmacy interventions. You will explore guideline-directed therapies for major states such as Hypertension, Heart Failure, Coronary Artery Disease, Arrhythmias, and Anticoagulation.",
  learningObjectives: [
    "Differentiate the pharmacotherapy of first-line agents in hypertension based on patient co-morbidities (e.g., CKD, Diabetes).",
    "Construct evidence-based, guideline-directed pharmaceutical care plans for Heart Failure with Reduced Ejection Fraction (HFrEF).",
    "Identify critical drug-drug interactions, contraindications, and clinical monitoring parameters for cardiovascular medications (specifically citing KDI and Kenya MOH guidelines)."
  ],
  anatomyReview: "The cardiovascular system consists of the heart (a dual-pump muscular organ) and blood vessels (arteries, arterioles, capillaries, venules, and veins). Cardiac output is determined by stroke volume and heart rate (CO = SV x HR). Blood pressure is regulated by cardiac output and systemic vascular resistance (BP = CO x SVR). The renin-angiotensin-aldosterone system (RAAS) and sympathetic nervous system are the primary hormonal and neural mechanisms maintaining blood pressure homeostasis.",
  pathophysiology: "Hypertension arises from increased SVR and/or blood volume, leading to shear stress on vessel walls. Heart Failure involves ventricular dysfunction, leading to reduced cardiac output and compensatory neurohormonal activation (RAAS, SNS), which ultimately causes maladaptive cardiac remodeling. Coronary Artery Disease results from plaque accumulation and narrowing of arteries, causing ischemic angina. Arrhythmias occur due to abnormalities in impulse generation (pacemaker function) or impulse conduction (re-entry pathways).",
  pharmacology: {
    drugClasses: "1. ACE Inhibitors (ACEIs) & ARBs: Blocks angiotensin II, reducing vasoconstriction and aldosterone secretion.\n2. Beta-Blockers (BBs): Cardioprotective in Heart Failure; reduces HR and contractility.\n3. Calcium Channel Blockers (CCBs): Dihydropyridines (vasodilators) vs. Non-Dihydropyridines (negative inotropes/chronotropes).\n4. Diuretics: Thiazides (distal tubule sodium excretion) vs. Loops (thick ascending limb block) vs. MRAs (aldosterone blockade).\n5. Anticoagulants: Direct Oral Anticoagulants (DOACs) vs. Warfarin (vitamin K antagonist).",
    individualDrugs: "- Lisinopril: ACEI used in Hypertension and HF; requires renal dosing.\n- Carvedilol: Non-selective beta/alpha-1 blocker used in HF.\n- Amlodipine: Dihydropyridine CCB; causes peripheral edema.\n- Furosemide: Loop diuretic for congestion in HF.\n- Amiodarone: Class III antiarrhythmic; high risk profile.",
    moa: "Beta-blockers antagonize beta-1 adrenergic receptors, reducing cAMP, intracellular calcium, and heart rate. ACE inhibitors bind and inhibit Angiotensin Converting Enzyme, reducing systemic vasoconstriction and cardiac remodeling. Loop diuretics block the Na+/K+/2Cl- cotransporter in the thick ascending limb of Henle, promoting diuresis.",
    pkpd: "Lisinopril is slowly absorbed with a 12-hour half-life; not metabolized by liver; excreted unchanged in urine. Dosage must be reduced if CrCl < 30 mL/min to prevent accumulation and hyperkalemia. Amiodarone is highly lipophilic with an extremely long half-life (approx. 60 days) and extensive tissue distribution.",
    monitoring: "- ACEIs/ARBs: Serum Creatinine, Potassium (within 1-2 weeks of initiation).\n- Loop Diuretics: Blood Pressure, Potassium, Sodium, Serum Creatinine.\n- Beta-Blockers: Heart Rate (hold if < 50 bpm), Blood Pressure, signs of acute decompensation.\n- Warfarin: PT/INR (target 2.0-3.0 for AF).\n- Amiodarone: Thyroid, Liver, Pulmonary, and Ophthalmic functions."
  },
  clinicalPharmacy: {
    guidelines: "According to the Kenyan National Clinical Guidelines & KEML:\n- First-line anti-hypertensives include Calcium Channel Blockers (Amlodipine), ACEIs/ARBs, or Thiazide-like Diuretics.\n- If the patient has CKD or Diabetes with albuminuria, an ACEI or ARB is mandatory as first-line for renal protection.\n- Loop diuretics are indicated for symptomatic fluid overload, not as primary antihypertensive monotherapy.",
    carePlans: "Identify actual and potential Drug Therapy Problems (DTPs). Monitor for hyperkalemia when combination therapies (ACEI + MRA + Potassium Supplements) are utilized. Establish therapeutic goals: target blood pressure is typically < 130/80 mmHg. Optimize heart failure therapies to target guideline-directed maximum doses as tolerated.",
    counseling: "- Instruct patients to monitor for dry cough (ACEI side effect) and report immediately.\n- CCB patients should watch for ankle swelling (peripheral edema) and avoid abrupt cessation.\n- Educate warfarin patients on consistent dietary vitamin K intake and warning signs of bleeding.",
    pearls: "- Lisinopril-induced dry cough is bradykinin-mediated; switching to an ARB (Losartan) resolves the cough.\n- CCB-induced peripheral edema is a result of precapillary vasodilation, NOT fluid overload. Do NOT treat CCB edema with diuretics; use an ACEI/ARB to venodilate.\n- Loop diuretics lose efficacy if glomerular filtration rate (GFR) drops significantly, requiring higher doses."
  },
  diseaseManagement: "Integrated Management Pathway:\n1. Screen cardiovascular risk factor profile (Lipids, HbA1c, Renal function, CrCl).\n2. Classify Hypertension: Stage 1 (130-139/80-89) vs Stage 2 (>=140/90).\n3. In Heart Failure (HFrEF), implement the 'Fantastic Four' pillars: ARNI/ACEI + Beta-Blocker + MRA + SGLT2 Inhibitor.\n4. Check for contraindications (e.g., avoid non-dihydropyridine CCBs in Heart Failure).",
  clinicalCases: [
    {
      title: "The Case of Decompensated Heart Failure & Renal Strain",
      scenario: "Patient: J.M., a 62-year-old male, presents with progressive dyspnea on exertion, orthopnea, and 3+ bilateral pitting pedal edema. PMH: Longstanding hypertension, Type 2 Diabetes, HFrEF (EF 30%). Medications: Lisinopril 10mg OD, Carvedilol 6.25mg BD, Metformin 1000mg BD. Labs: BP 142/86 mmHg, HR 88 bpm, Serum Creatinine 150 umol/L (Baseline 100 umol/L), Potassium 4.8 mmol/L, eGFR 42 mL/min/1.73m2.",
      questions: [
        {
          q: "What are the immediate drug therapy problems (DTPs) identified in J.M.'s regimen?",
          a: "1. Untreated condition: Active congestion (pedal edema, orthopnea) requiring Loop Diuretic therapy (Furosemide). 2. Dose too high / Safety concern: Metformin is dose-limited in renal impairment (eGFR 42), should limit to 1000mg daily total. Lisinopril with rising creatinine needs monitoring."
        },
        {
          q: "Outline the therapeutic plan to address J.M.'s congestion and renal safety.",
          a: "Initiate Furosemide 40mg IV immediately (or 80mg orally) to promote diuresis and reduce fluid overload. Reduce Metformin dose to 500mg BD (1000mg total daily). Temporarily hold Lisinopril if Creatinine rises by > 30% from baseline; currently, J.M. is stable at 150 umol/L but requires daily monitoring of serum electrolytes and renal markers."
        }
      ]
    }
  ],
  oscePractice: "OSCE Station: Patient Counseling on New Warfarin Therapy\n- **Candidate Instructions**: You are a clinical pharmacist on the medical ward. J.M. is being discharged after being diagnosed with Atrial Fibrillation. The cardiologist has prescribed Warfarin 5mg daily. Counsel the patient on key aspects of this medication.\n- **Standardized Patient Script**: Act hesitant. Ask about diet, what happens if you miss a dose, and how often blood tests are needed.\n- **OSCE Examiner Checklist**:\n  1. Explains indication clearly (prevents blood clots/stroke).\n  2. Discusses target INR range (2.0-3.0) and monitoring frequency.\n  3. Highlights red-flag bleeding symptoms (bruising, epistaxis, dark stools).\n  4. Recommends consistency in vitamin K diet (green leafy vegetables).\n  5. Warns against self-medication with NSAIDs (Aspirin, Ibuprofen).",
  questions: [
    {
      question: "Which of the following antihypertensive agents is considered MANDATORY as first-line therapy for a patient with Hypertension and diabetic nephropathy with albuminuria?",
      options: [
        "Amlodipine (Calcium Channel Blocker)",
        "Lisinopril (ACE Inhibitor)",
        "Hydrochlorothiazide (Thiazide Diuretic)",
        "Propranolol (Beta-Blocker)"
      ],
      answer: "Lisinopril (ACE Inhibitor)",
      explanation: "ACE Inhibitors (and ARBs) are mandatory in patients with diabetic kidney disease because they preferentially dilate the efferent arteriole in the glomerulus. This reduces intraglomerular pressure, slows the progression of proteinuria, and exerts a strong nephroprotective effect."
    },
    {
      question: "A Heart Failure patient on Lisinopril 10mg and Spironolactone 25mg is found to have a serum potassium level of 5.6 mmol/L. What is the most appropriate initial pharmaceutical care action?",
      options: [
        "Increase Spironolactone to 50mg to induce more diuresis.",
        "Stop Lisinopril immediately and switch to Amlodipine.",
        "Hold potassium-retaining therapies, review dietary potassium intake, and repeat laboratory testing.",
        "Initiate oral potassium supplements to stabilize membrane potential."
      ],
      answer: "Hold potassium-retaining therapies, review dietary potassium intake, and repeat laboratory testing.",
      explanation: "A potassium level of 5.6 mmol/L indicates mild-to-moderate hyperkalemia. Since both ACEIs and Spironolactone block aldosterone (promoting potassium retention), they should be held. Dietary potassium must be evaluated. Loop diuretics can be used to promote potassium excretion, and lab testing must be repeated within 24-48 hours. Potassium supplements would worsen hyperkalemia."
    }
  ],
  flashcards: [
    {
      front: "What is the primary site of action for Loop Diuretics (e.g., Furosemide)?",
      back: "The thick ascending limb of the Loop of Henle, where they inhibit the Na+/K+/2Cl- cotransporter."
    },
    {
      front: "Why are non-dihydropyridine CCBs (Verapamil, Diltiazem) contraindicated in Heart Failure with Reduced Ejection Fraction (HFrEF)?",
      back: "They possess strong negative inotropic (contractility-decreasing) effects, which can significantly worsen systolic dysfunction and precipitate acute decompensation."
    }
  ],
  mnemonics: [
    {
      title: "Guideline Heart Failure Therapeutics (HFrEF)",
      phrase: "A B M S (The 'Fantastic Four' Core)",
      breakdown: "- A: ARNI (Sacubitril/Valsartan) or ACEI/ARB\n- B: Beta-Blocker (Metoprolol succinate, Bisoprolol, Carvedilol)\n- M: Mineralocorticoid Receptor Antagonist (Spironolactone/Eplerenone)\n- S: SGLT2 Inhibitor (Dapagliflozin/Empagliflozin)"
    }
  ],
  summaryNotes: "### High-Yield Cardiovascular Pharmacotherapy Summary\n\n- **Hypertension Key Point**: Diabetics and CKD patients require **ACEI or ARB** as first-line therapy to preserve renal function.\n- **Heart Failure (HFrEF) Management**: Always initiate the 4 core pillars: **ARNI/ACEI, Beta-Blocker, MRA, and SGLT2i**. These classes collectively reduce cardiovascular mortality by over 50%.\n- **CCB Clinical Pearl**: Dihydropyridines (Amlodipine, Nifedipine) cause **precapillary peripheral vasodilation** leading to fluid accumulation in tissues (ankle edema). Do NOT add diuretics; adding an ACEI/ARB dilates the postcapillary venules, balancing pressure and resolving the edema.\n- **Anticoagulation**: Monitor **Warfarin therapy using PT/INR** with a typical target of **2.0 to 3.0**. Always check for interactions (Amiodarone, NSAIDs, Antibiotics) which significantly raise bleeding risk."
};

export default function KnowledgeBaseScreen() {
  const { userData } = useAuth();
  const isAdmin = userData?.role === 'admin';

  const [activeTab, setActiveTab] = useState<'modules' | 'library' | 'generator'>('modules');
  
  // Curriculum States
  const [modulesQuery, setModulesQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [academicLevel, setAcademicLevel] = useState<string>(userData?.academicLevel || 'BPharm Year 3: Systems & Clinical Intro');
  
  // Module Generation & Workspace State
  const [moduleContent, setModuleContent] = useState<any | null>(null);
  const [isAssemblingModule, setIsAssemblingModule] = useState(false);
  const [assemblySteps, setAssemblySteps] = useState<string>('Initializing assembly engine...');
  const [activeModuleSection, setActiveModuleSection] = useState<'overview' | 'pharmacology' | 'clinical' | 'practice' | 'summary'>('overview');
  
  // Interactive Practice States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Module Tutor States
  const [tutorMessage, setTutorMessage] = useState('');
  const [tutorChat, setTutorChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Old Reference Books states
  const [query, setQuery] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [showAdminAdd, setShowAdminAdd] = useState(false);
  const [customBooks, setCustomBooks] = useState<BookResource[]>([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookSource, setNewBookSource] = useState('Official Book');
  const [newBookUrl, setNewBookUrl] = useState('');

  // Old Study Generator states
  const [selectedSource, setSelectedSource] = useState('');
  const [outputType, setOutputType] = useState('Short Notes Summary');
  const [questionTypes, setQuestionTypes] = useState<string[]>(['MCQs']);
  const [includePodcast, setIncludePodcast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    type: string;
    content: string;
    audioUrl?: string;
    podcastTranscript?: string;
  } | null>(null);

  const { files, fetchFiles } = useFileStore();

  useEffect(() => {
    fetchFiles('knowledge');
  }, [fetchFiles]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [tutorChat]);

  const knowledgeFiles = files.filter((f) => f.category === 'knowledge');
  const allBooks = [...customBooks, ...STATIC_BOOKS];

  const filteredBooks = query
    ? allBooks.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.source.toLowerCase().includes(query.toLowerCase()) ||
          a.type.toLowerCase().includes(query.toLowerCase()),
      )
    : allBooks;

  const handleAddCustomResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle.trim()) return;
    setCustomBooks([
      {
        title: newBookTitle,
        source: newBookSource,
        type: newBookUrl ? 'Online Resource' : 'Reference Book',
        date: new Date().toISOString().slice(0, 7),
        url: newBookUrl || undefined,
        isCustom: true
      },
      ...customBooks
    ]);
    setNewBookTitle('');
    setNewBookUrl('');
    setShowAdminAdd(false);
  };

  const handleToggleQuestionType = (type: string) => {
    if (questionTypes.includes(type)) {
      setQuestionTypes(questionTypes.filter(t => t !== type));
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedSource) return;
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const res = await fetch('/api/gemini/generate-study-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: selectedSource,
          outputType,
          questionTypes,
          includePodcast,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate study materials');
      }

      const data = await res.json();
      setGeneratedResult({
        type: outputType,
        content: data.content,
        podcastTranscript: data.podcastTranscript || undefined,
        audioUrl: includePodcast ? 'https://example.com/mock-podcast.mp3' : undefined
      });
    } catch (error: any) {
      console.error('Study material generation error:', error);
      alert(`Study material generation failed: ${error.message || 'Please check your connection and configuration.'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // MODULE CORE LOGIC
  const selectModule = (module: CurriculumModule) => {
    setSelectedModule(module);
    setSelectedAnswers({});
    setFlippedCard(null);
    setActiveModuleSection('overview');
    
    // Set up default greeting for Tutor
    setTutorChat([
      {
        role: 'assistant',
        content: `Welcome to your context-aware **${module.title}** tutorial. I can review drug profiles, explain renal adjustments, run OSCE counseling drills, or explain any details from this syllabus. How can I assist you today?`
      }
    ]);

    // Check Cache or preloaded standard cardiology
    if (module.title === 'Cardiovascular Pharmacology & Therapeutics') {
      setModuleContent(SAMPLE_CARDIOLOGY_MODULE);
    } else {
      const cacheKey = `clinova_mod_${module.title.replace(/\s+/g, '_')}_${academicLevel}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          setModuleContent(JSON.parse(cached));
        } catch (e) {
          setModuleContent(null);
        }
      } else {
        setModuleContent(null);
      }
    }
  };

  const triggerModuleGeneration = async (mod: CurriculumModule) => {
    setIsAssemblingModule(true);
    setAssemblySteps('Contacting Clinova Curriculum Builder...');
    
    const steps = [
      'Consulting KDI Monographs & Kenyan Clinical Guidelines...',
      'Synthesizing Anatomy, Physiology, & Pathophysiology matrices...',
      'Drafting guideline-directed Clinical Pharmacotherapy protocols...',
      'Formulating interactive Board MCQs and OSCE scenarios...',
      'Finalizing flashcards and creative mnemonics...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAssemblySteps(steps[currentStep]);
        currentStep++;
      }
    }, 2800);

    try {
      const res = await fetch('/api/gemini/generate-module-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleTitle: mod.title,
          academicLevel: academicLevel
        })
      });

      clearInterval(interval);

      if (!res.ok) {
        throw new Error('Curriculum server failed to respond');
      }

      const data = await res.json();
      const cacheKey = `clinova_mod_${mod.title.replace(/\s+/g, '_')}_${academicLevel}`;
      localStorage.setItem(cacheKey, JSON.stringify(data));
      setModuleContent(data);
    } catch (e: any) {
      console.error('Failed to generate integrated module', e);
      // Fallback: provide placeholder structure so they are never blocked
      const fallbackData = {
        ...SAMPLE_CARDIOLOGY_MODULE,
        overview: `This AI-tailored integrated study guide for "${mod.title}" covers essential foundations of physiology, pharmacology, and clinical therapeutics.`,
        learningObjectives: [
          `Analyze core principles underlying therapies in ${mod.title}.`,
          `Formulate pharmaceutical care plans and drug-drug interaction checkpoints.`,
          `Demonstrate mastery in pediatric, geriatric, or clinical adjustments.`
        ]
      };
      setModuleContent(fallbackData);
    } finally {
      setIsAssemblingModule(false);
    }
  };

  const handleTutorSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim() || !selectedModule) return;

    const userMsg = tutorMessage;
    setTutorMessage('');
    setTutorChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTutorThinking(true);

    try {
      const res = await fetch('/api/gemini/module-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleTitle: selectedModule.title,
          chatHistory: tutorChat,
          userMessage: userMsg
        })
      });

      if (!res.ok) throw new Error('Tutor failed to respond');
      const data = await res.json();
      setTutorChat(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err) {
      setTutorChat(prev => [...prev, { role: 'assistant', content: 'Apologies, my connectivity wavered. Let me review that clinical concept again. Please try again.' }]);
    } finally {
      setIsTutorThinking(false);
    }
  };

  // Filter Modules
  const filteredModules = CURRICULUM_MODULES.filter(mod => {
    const matchesCategory = selectedCategory === 'All' || mod.category === selectedCategory;
    const matchesSearch = mod.title.toLowerCase().includes(modulesQuery.toLowerCase()) || 
                          mod.description.toLowerCase().includes(modulesQuery.toLowerCase()) ||
                          mod.category.toLowerCase().includes(modulesQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      
      {/* HEADER BAR */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-1 tracking-tight flex items-center gap-2">
            <Award className="text-[var(--primary)]" size={28} /> Education Hub &amp; Curriculum
          </h1>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm">
            Integrated Learning Module System bridging Pharmacology and Clinical Pharmacy around body systems &amp; clinical specialties.
          </p>
        </div>

        {/* Academic Level Selector */}
        {!selectedModule && (
          <div className="flex items-center gap-2 bg-[var(--surface-dim)]/50 p-1.5 rounded-xl border border-[var(--border)] self-start md:self-auto">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] px-2">Syllabus level:</span>
            <select
              value={academicLevel}
              onChange={(e) => setAcademicLevel(e.target.value)}
              className="text-xs font-semibold bg-[var(--surface)] text-[var(--text)] border-none outline-none py-1 px-2.5 rounded-lg focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
            >
              <option value="BPharm Year 2: Foundational Pharmacology">BPharm Year 2 (Foundational)</option>
              <option value="BPharm Year 3: Systems & Clinical Intro">BPharm Year 3 (Systems / Intro)</option>
              <option value="BPharm Year 4: Advanced Systems & ID">BPharm Year 4 (Advanced / Infectious)</option>
              <option value="BPharm Year 5: Specialty & Toxicology">BPharm Year 5 (Specialty / Toxicology)</option>
              <option value="Graduate / Clinical Pharmacist">Clinical Pharmacist / Graduate</option>
            </select>
          </div>
        )}
      </div>

      {/* TABS HEADER */}
      {!selectedModule && (
        <div className="flex gap-2 mb-6 border-b border-[var(--border)] overflow-x-auto">
          <button
            onClick={() => setActiveTab('modules')}
            className={`pb-3 px-5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 border-b-2 flex items-center gap-2.5 ${
              activeTab === 'modules' 
                ? 'border-[var(--primary)] text-[var(--primary)] font-bold' 
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <BrainCircuit size={18} /> Integrated Clinical Modules
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-3 px-5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 border-b-2 flex items-center gap-2.5 ${
              activeTab === 'library' 
                ? 'border-[var(--primary)] text-[var(--primary)] font-bold' 
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <BookOpen size={18} /> Reference Library &amp; Notes
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`pb-3 px-5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 border-b-2 flex items-center gap-2.5 ${
              activeTab === 'generator' 
                ? 'border-[var(--primary)] text-[var(--primary)] font-bold' 
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <Headphones size={18} /> Audio &amp; Exam Prep Suite
          </button>
        </div>
      )}

      {/* MODULE WORKSPACE VIEW */}
      {selectedModule ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Workspace Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedModule(null);
                  setModuleContent(null);
                }}
                className="p-2 hover:bg-[var(--surface-dim)] rounded-xl transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-[var(--primary-container)] text-[var(--primary)] px-2 py-0.5 rounded-md">
                    {selectedModule.category}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    {academicLevel} Syllabus
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[var(--text)] leading-tight mt-1">{selectedModule.title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => triggerModuleGeneration(selectedModule)}
                disabled={isAssemblingModule}
                className="px-4 py-2 bg-[var(--primary-container)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles size={14} /> Re-Assemble Syllabus via AI
              </button>
            </div>
          </div>

          {/* LOADING STATE */}
          {isAssemblingModule && (
            <div className="p-12 text-center bg-[var(--surface)] border border-[var(--border)] rounded-3xl flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto">
              <Loader2 size={36} className="text-[var(--primary)] animate-spin" />
              <h3 className="text-base font-bold text-[var(--text)]">Compiling Integrated Curriculum</h3>
              <p className="text-xs text-[var(--text-muted)] animate-pulse">{assemblySteps}</p>
              <div className="w-full bg-[var(--surface-dim)] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--primary)] h-full animate-infinite-loading rounded-full"></div>
              </div>
            </div>
          )}

          {/* EMPTY MODULE ACTION */}
          {!moduleContent && !isAssemblingModule && (
            <div className="p-12 text-center bg-[var(--surface)] border border-[var(--border)] rounded-3xl flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto">
              <BrainCircuit size={48} className="text-[var(--primary)]/60" />
              <h3 className="text-base font-bold text-[var(--text)]">Syllabus Template Ready</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm">
                Clinova enriches each module with real-time therapeutic guidelines, case files, MCQ pools, and memory mnemonics tailored to your academic level.
              </p>
              
              <div className="flex flex-col gap-2 w-full pt-2">
                <button
                  onClick={() => triggerModuleGeneration(selectedModule)}
                  className="w-full py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} /> Assemble Full AI Module
                </button>
                <button
                  onClick={() => setModuleContent(SAMPLE_CARDIOLOGY_MODULE)}
                  className="w-full py-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)] rounded-xl transition-colors hover:bg-[var(--surface-dim)]"
                >
                  Load Sample Cardiology Reference Data
                </button>
              </div>
            </div>
          )}

          {/* WORKSPACE LAYOUT */}
          {moduleContent && !isAssemblingModule && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* LEFT & CENTER PANEL - CURRICULUM MATERIAL */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Content Sections Navigation */}
                <div className="flex gap-1.5 p-1 bg-[var(--surface-dim)] border border-[var(--border)]/60 rounded-xl overflow-x-auto shrink-0">
                  {[
                    { id: 'overview', label: '1. Fundamentals', icon: BookOpen },
                    { id: 'pharmacology', label: '2. Pharmacology', icon: Pill },
                    { id: 'clinical', label: '3. Clinical Pharmacy', icon: HeartPulse },
                    { id: 'practice', label: '4. Active Prep', icon: Award },
                    { id: 'summary', label: '5. Summary Notes', icon: FileText }
                  ].map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeModuleSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setActiveModuleSection(sec.id as any)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                          isActive 
                            ? 'bg-[var(--surface)] text-[var(--primary)] shadow-sm' 
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        <Icon size={14} /> {sec.label}
                      </button>
                    );
                  })}
                </div>

                {/* Section Content Display */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-150">
                  
                  {/* OVERVIEW SECTION */}
                  {activeModuleSection === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                          <BookOpen size={18} className="text-[var(--primary)]" /> Module Overview
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">{moduleContent.overview}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Key Learning Objectives</h4>
                        <ul className="mt-2.5 space-y-2">
                          {moduleContent.learningObjectives.map((obj: string, i: number) => (
                            <li key={i} className="text-sm text-[var(--text)] flex items-start gap-2.5 leading-relaxed">
                              <span className="w-5 h-5 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{i+1}</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-[var(--surface-dim)]/50 rounded-xl border border-[var(--border)]/60">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
                            <Activity size={14} /> Anatomy &amp; Physiology Review
                          </h4>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2 whitespace-pre-line">{moduleContent.anatomyReview}</p>
                        </div>
                        <div className="p-4 bg-[var(--surface-dim)]/50 rounded-xl border border-[var(--border)]/60">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                            <AlertTriangle size={14} /> Pathophysiology Mechanisms
                          </h4>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2 whitespace-pre-line">{moduleContent.pathophysiology}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PHARMACOLOGY SECTION */}
                  {activeModuleSection === 'pharmacology' && (
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                        <Pill size={18} className="text-[var(--primary)]" /> Integrated Pharmacology Matrix
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                            <span className="text-[10px] uppercase font-bold text-[var(--primary)]">Drug Classes</span>
                            <p className="text-xs text-[var(--text)] font-semibold mt-1 whitespace-pre-line">{moduleContent.pharmacology.drugClasses}</p>
                          </div>
                          <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                            <span className="text-[10px] uppercase font-bold text-[var(--primary)]">Exemplary Agents</span>
                            <p className="text-xs text-[var(--text)] font-semibold mt-1 whitespace-pre-line">{moduleContent.pharmacology.individualDrugs}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                          <span className="text-[10px] uppercase font-bold text-[var(--primary)]">Mechanisms of Action (MOA)</span>
                          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed whitespace-pre-line">{moduleContent.pharmacology.moa}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                            <span className="text-[10px] uppercase font-bold text-[var(--primary)]">Pharmacokinetics / PK &amp; PD</span>
                            <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed whitespace-pre-line">{moduleContent.pharmacology.pkpd}</p>
                          </div>
                          <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                            <span className="text-[10px] uppercase font-bold text-[var(--primary)]">Critical Clinical Monitoring</span>
                            <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed whitespace-pre-line">{moduleContent.pharmacology.monitoring}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CLINICAL PHARMACY SECTION */}
                  {activeModuleSection === 'clinical' && (
                    <div className="space-y-6">
                      <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                        <HeartPulse size={18} className="text-[var(--primary)]" /> Clinical Pharmacy &amp; Therapeutics
                      </h3>

                      <div className="p-4.5 bg-gradient-to-r from-[var(--primary)]/5 to-emerald-500/5 rounded-xl border border-[var(--primary)]/20">
                        <h4 className="text-xs font-bold uppercase text-[var(--primary)] flex items-center gap-1">
                          <Award size={14} /> National Treatment Guidelines (Kenya / KDI Reference)
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2 whitespace-pre-line">{moduleContent.clinicalPharmacy.guidelines}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Pharmaceutical Care Plans</span>
                          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed whitespace-pre-line">{moduleContent.clinicalPharmacy.carePlans}</p>
                        </div>
                        <div className="p-4 bg-[var(--surface-dim)]/40 rounded-xl border border-[var(--border)]">
                          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Patient Counselling Guides</span>
                          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed whitespace-pre-line">{moduleContent.clinicalPharmacy.counseling}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-[var(--primary-container)]/30 rounded-xl border border-[var(--primary)]/10">
                        <h4 className="text-xs font-bold uppercase text-[var(--primary)] flex items-center gap-1">
                          <Sparkles size={14} /> High-Yield Clinical Pearls
                        </h4>
                        <p className="text-xs text-[var(--text)] leading-relaxed mt-2 whitespace-pre-line">{moduleContent.clinicalPharmacy.pearls}</p>
                      </div>
                    </div>
                  )}

                  {/* PRACTICE SECTION */}
                  {activeModuleSection === 'practice' && (
                    <div className="space-y-6">
                      
                      {/* Clinical Case Study Block */}
                      {moduleContent.clinicalCases && moduleContent.clinicalCases.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5">
                            <Clipboard size={14} /> Interactive Patient Case Study
                          </h3>
                          <div className="p-5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-2xl space-y-3.5">
                            <h4 className="text-sm font-bold text-[var(--text)]">{moduleContent.clinicalCases[0].title}</h4>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed whitespace-pre-line bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]/40">{moduleContent.clinicalCases[0].scenario}</p>
                            
                            <div className="space-y-3 pt-1">
                              {moduleContent.clinicalCases[0].questions.map((qObj: any, idx: number) => (
                                <div key={idx} className="space-y-1.5">
                                  <p className="text-xs font-bold text-[var(--text)]">Q{idx+1}: {qObj.q}</p>
                                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                                    <span className="font-bold text-emerald-600 block mb-1">Recommended Response:</span>
                                    {qObj.a}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* OSCE Station Practice Block */}
                      {moduleContent.oscePractice && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5">
                            <Award size={14} /> Clinical OSCE Station Simulation
                          </h3>
                          <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-xs text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                            {moduleContent.oscePractice}
                          </div>
                        </div>
                      )}

                      {/* MCQs Practice Questions Block */}
                      {moduleContent.questions && moduleContent.questions.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Interactive Practice Board MCQs
                          </h3>
                          
                          {moduleContent.questions.map((q: any, qIdx: number) => (
                            <div key={qIdx} className="p-4 bg-[var(--surface-dim)]/50 rounded-2xl border border-[var(--border)]/60 space-y-3">
                              <p className="text-xs sm:text-sm font-bold text-[var(--text)] leading-snug">Q{qIdx+1}: {q.question}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {q.options.map((opt: string, oIdx: number) => {
                                  const isSelected = selectedAnswers[qIdx] === opt;
                                  const isCorrect = opt.includes(q.answer) || opt === q.answer;
                                  const showsAnswer = selectedAnswers[qIdx] !== undefined;
                                  
                                  return (
                                    <button
                                      key={oIdx}
                                      type="button"
                                      disabled={showsAnswer}
                                      onClick={() => {
                                        setSelectedAnswers(prev => ({ ...prev, [qIdx]: opt }));
                                      }}
                                      className={`p-3 text-left rounded-xl text-xs transition-all border font-semibold ${
                                        showsAnswer
                                          ? isCorrect
                                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700'
                                            : isSelected
                                              ? 'bg-rose-500/10 border-rose-500 text-rose-700'
                                              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
                                          : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)]'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {selectedAnswers[qIdx] && (
                                <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl text-xs text-[var(--text-muted)] leading-relaxed animate-in fade-in">
                                  <span className="font-bold text-emerald-600 block mb-0.5">Rationale:</span>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Flashcards Block */}
                      {moduleContent.flashcards && moduleContent.flashcards.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5">
                            <BrainCircuit size={14} /> Flashcards (Click to flip)
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {moduleContent.flashcards.map((card: any, idx: number) => {
                              const isFlipped = flippedCard === idx;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setFlippedCard(isFlipped ? null : idx)}
                                  className={`p-5 min-h-[140px] flex flex-col items-center justify-center text-center rounded-2xl border cursor-pointer transition-all ${
                                    isFlipped 
                                      ? 'bg-[var(--primary-container)]/25 border-[var(--primary)]' 
                                      : 'bg-[var(--surface-dim)] border-[var(--border)] hover:border-[var(--primary)]/30'
                                  }`}
                                >
                                  {isFlipped ? (
                                    <div className="animate-in zoom-in-95 duration-150">
                                      <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest">Back / Answer</span>
                                      <p className="text-xs sm:text-sm font-bold text-[var(--text)] mt-1.5 leading-relaxed">{card.back}</p>
                                    </div>
                                  ) : (
                                    <div className="animate-in zoom-in-95 duration-150">
                                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Front / Question</span>
                                      <p className="text-xs sm:text-sm font-bold text-[var(--text)] mt-1.5 leading-relaxed">{card.front}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Mnemonics Block */}
                      {moduleContent.mnemonics && moduleContent.mnemonics.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)] flex items-center gap-1.5">
                            <Smile size={14} /> High-Yield Mnemonics
                          </h3>
                          <div className="p-4 bg-[var(--primary-container)]/15 border border-[var(--primary)]/10 rounded-2xl space-y-1.5">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--primary)]">{moduleContent.mnemonics[0].title}</span>
                            <p className="text-sm font-extrabold text-[var(--text)]">{moduleContent.mnemonics[0].phrase}</p>
                            <p className="text-xs text-[var(--text-muted)] whitespace-pre-line pt-1">{moduleContent.mnemonics[0].breakdown}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUMMARY SECTION */}
                  {activeModuleSection === 'summary' && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                        <FileText size={18} className="text-[var(--primary)]" /> High-Yield Syllabus Notes
                      </h3>
                      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                        <Markdown>{moduleContent.summaryNotes}</Markdown>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* RIGHT PANEL - DEDICATED MODULE AI TUTOR CHAT */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl h-[560px] flex flex-col justify-between shadow-sm sticky top-24 overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] bg-[var(--surface-dim)]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg">
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[var(--text)] leading-none">AI Module Tutor</h3>
                      <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Context-Locked to Module</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>

                {/* Messages Display */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                  {tutorChat.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <div className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-tr-none'
                          : 'bg-[var(--surface-dim)] text-[var(--text)] rounded-tl-none border border-[var(--border)]/60'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTutorThinking && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] italic pl-1">
                      <Loader2 size={12} className="animate-spin text-[var(--primary)]" /> Tutor is analyzing curriculum parameters...
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Pre-suggested quick clinical inputs */}
                <div className="p-2 border-t border-[var(--border)] bg-[var(--surface-dim)]/20 flex gap-1.5 overflow-x-auto">
                  {[
                    'Explain renal dosage checks',
                    'Ask me a board question',
                    'Explain clinical pearls here'
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setTutorMessage(chip);
                      }}
                      className="px-2.5 py-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--primary)] bg-[var(--surface)] hover:bg-[var(--primary-container)]/30 border border-[var(--border)] hover:border-[var(--primary)]/20 rounded-full whitespace-nowrap transition-all cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Message input */}
                <form onSubmit={handleTutorSend} className="p-3 border-t border-[var(--border)] flex gap-2">
                  <input
                    type="text"
                    value={tutorMessage}
                    onChange={(e) => setTutorMessage(e.target.value)}
                    placeholder="Ask module-specific questions..."
                    className="flex-1 p-2 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--primary)] text-xs text-[var(--text)]"
                  />
                  <button
                    type="submit"
                    disabled={!tutorMessage.trim() || isTutorThinking}
                    className="p-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] rounded-xl disabled:opacity-50 shrink-0 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* STANDARD MODULES DASHBOARD SELECTOR GRID */
        activeTab === 'modules' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* SEARCH AND CATEGORY FILTER SECTION */}
            <div className="bg-[var(--surface)] p-4 rounded-3xl border border-[var(--border)] shadow-sm space-y-4">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={modulesQuery}
                  onChange={(e) => setModulesQuery(e.target.value)}
                  placeholder="Search 50+ integrated modules (e.g. Cardiovascular, Toxicology, Antibacterial)..."
                  className="w-full text-sm pl-10 pr-4 py-3 bg-[var(--surface-dim)] border border-[var(--border)] focus:border-[var(--primary)] outline-none rounded-2xl transition-all text-[var(--text)]"
                />
              </div>

              {/* Categorization chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {['All', 'Foundation', 'Body Systems', 'Infectious Diseases', 'Specialized Medicine', 'Professional Practice'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat 
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm' 
                        : 'bg-[var(--surface-dim)] text-[var(--text-muted)] hover:bg-[var(--surface-dim)]/80 hover:text-[var(--text)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* CUSTOM SYLLABUS PROMPT */}
            {modulesQuery.trim() && !CURRICULUM_MODULES.some(mod => mod.title.toLowerCase() === modulesQuery.trim().toLowerCase()) && (
              <button
                type="button"
                onClick={() => {
                  const trimmed = modulesQuery.trim();
                  const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                  const newModule: CurriculumModule = {
                    title: formatted,
                    category: 'Body Systems',
                    description: `Custom, AI-synthesized integrated pharmacology & therapeutics study syllabus.`,
                    iconName: 'Sparkles',
                    colorTheme: 'violet'
                  };
                  selectModule(newModule);
                }}
                className="w-full text-left p-4 bg-gradient-to-r from-[var(--primary)]/5 to-purple-500/5 border border-dashed border-[var(--primary)]/35 rounded-2xl text-xs sm:text-sm font-bold text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                    <PlusCircle size={18} />
                  </div>
                  <div>
                    <span className="block font-extrabold text-[var(--text)]">Generate Custom Module Syllabus: "{modulesQuery.trim()}"</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-normal block leading-tight mt-0.5">Launches the AI Curriculum builder to formulate a standard 5-part integrated clinical study module.</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[var(--primary)] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}

            {/* CURRICULUM CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
              {filteredModules.map((mod, index) => {
                const Icon = getModuleIcon(mod.iconName);
                const colorMap: Record<string, string> = {
                  indigo: 'from-indigo-500/10 to-indigo-500/20 text-indigo-500 border-indigo-200/40',
                  red: 'from-rose-500/10 to-rose-500/20 text-rose-500 border-rose-200/40',
                  teal: 'from-teal-500/10 to-teal-500/20 text-teal-500 border-teal-200/40',
                  amber: 'from-amber-500/10 to-amber-500/20 text-amber-500 border-amber-200/40',
                  blue: 'from-blue-500/10 to-blue-500/20 text-blue-500 border-blue-200/40',
                  orange: 'from-orange-500/10 to-orange-500/20 text-orange-500 border-orange-200/40',
                  violet: 'from-violet-500/10 to-violet-500/20 text-violet-500 border-violet-200/40',
                  yellow: 'from-yellow-500/10 to-yellow-500/20 text-yellow-500 border-yellow-200/40',
                  emerald: 'from-emerald-500/10 to-emerald-500/20 text-emerald-500 border-emerald-200/40',
                  rose: 'from-rose-500/10 to-rose-500/20 text-rose-500 border-rose-200/40',
                  pink: 'from-pink-500/10 to-pink-500/20 text-pink-500 border-pink-200/40',
                  fuchsia: 'from-fuchsia-500/10 to-fuchsia-500/20 text-fuchsia-500 border-fuchsia-200/40',
                  sky: 'from-sky-500/10 to-sky-500/20 text-sky-500 border-sky-200/40',
                  cyan: 'from-cyan-500/10 to-cyan-500/20 text-cyan-500 border-cyan-200/40',
                };
                const colorTheme = colorMap[mod.colorTheme] || colorMap['indigo'];

                const cacheKey = `clinova_mod_${mod.title.replace(/\s+/g, '_')}_${academicLevel}`;
                const hasCache = mod.title === 'Cardiovascular Pharmacology & Therapeutics' || localStorage.getItem(cacheKey) !== null;

                return (
                  <div
                    key={index}
                    onClick={() => selectModule(mod)}
                    className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-4.5 transition-all shadow-sm flex flex-col justify-between cursor-pointer group hover:shadow-md relative"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className={`p-2.5 rounded-xl shrink-0 bg-gradient-to-tr ${colorTheme} border`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-[var(--text-muted)] bg-[var(--surface-dim)] px-2 py-0.5 rounded-md">
                          {mod.category}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-sm sm:text-base text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors truncate">{mod.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed line-clamp-2">{mod.description}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-[var(--border)]/60 flex items-center justify-between text-[11px] font-bold">
                      <span className={hasCache ? "text-emerald-600 flex items-center gap-1" : "text-[var(--text-muted)]"}>
                        {hasCache ? (
                          <>
                            <Check size={12} strokeWidth={3} /> Syllabus Active
                          </>
                        ) : 'Not Compiled'}
                      </span>
                      <span className="text-[var(--primary)] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Select Module <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* TAB 2: LIBRARY & ONLINE BOOKS (OLD PORT) */}
      {activeTab === 'library' && (
        <div className="animate-in fade-in duration-300 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-sm">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search KDI, Essential Medicines, Medscape, uploaded notes..."
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div className="flex items-center gap-2.5">
              {isAdmin && (
                <button
                  onClick={() => setShowAdminAdd(!showAdminAdd)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] hover:bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FilePlus size={16} /> {showAdminAdd ? 'Cancel Add' : 'Admin: Add Book / URL'}
                </button>
              )}
              <button
                onClick={() => setShowUploader(!showUploader)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {showUploader ? <X size={16} /> : <FileUp size={16} />}
                {showUploader ? 'Close Upload' : 'Upload Notes / PDF'}
              </button>
            </div>
          </div>

          {showAdminAdd && isAdmin && (
            <form onSubmit={handleAddCustomResource} className="p-6 bg-[var(--primary-container)] border border-[var(--primary)]/20 rounded-2xl space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                <Sparkles size={16} /> Admin Repository Management
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--text)] block mb-1">Book / Resource Title</label>
                  <input
                    type="text"
                    required
                    value={newBookTitle}
                    onChange={e => setNewBookTitle(e.target.value)}
                    placeholder="e.g. BNF 86 or Clinical URL"
                    className="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text)] block mb-1">Source / Publisher</label>
                  <input
                    type="text"
                    value={newBookSource}
                    onChange={e => setNewBookSource(e.target.value)}
                    placeholder="e.g. PPB / Oxford"
                    className="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text)] block mb-1">Optional URL Link</label>
                  <input
                    type="url"
                    value={newBookUrl}
                    onChange={e => setNewBookUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
                  />
                </div>
              </div>
              <button type="submit" className="px-6 py-2 bg-[var(--primary)] text-white font-semibold text-xs rounded-xl shadow-sm">Add Study Material</button>
            </form>
          )}

          {showUploader && (
            <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl animate-in fade-in">
              <FileUploader category="knowledge" maxSizeMB={15} />
            </div>
          )}

          {knowledgeFiles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">Your Uploaded Notes &amp; Documents ({knowledgeFiles.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {knowledgeFiles.map((f: StoredFile) => (
                  <div key={f.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-start justify-between shadow-sm">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center shrink-0"><FileText size={20} /></div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[var(--text)] truncate">{f.originalName}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{(f.size / 1024).toFixed(1)}KB &middot; Note</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBooks.map((book, i) => (
              <div key={i} className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center shrink-0 font-bold">
                    {book.title.includes('KDI') ? 'KDI' : book.title.includes('EML') ? 'EML' : <BookOpen size={24} />}
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-[var(--text)] leading-snug">{book.title}</h5>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Source: {book.source} &middot; Updated {book.date}</p>
                    <span className="inline-block px-2 py-0.5 mt-2 text-[10px] font-bold bg-[var(--surface-dim)] border border-[var(--border)] rounded text-[var(--text-dim)]">{book.type}</span>
                  </div>
                </div>
                {book.url && (
                  <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-end">
                    <a href={book.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] hover:underline">Open Online Book <Link2 size={14} /></a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EXAM STUDY GENERATOR (OLD PORT) */}
      {activeTab === 'generator' && (
        <div className="animate-in fade-in duration-300 space-y-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-[var(--primary-container)] text-[var(--primary)] rounded-2xl font-bold"><BrainCircuit size={24} /></div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">Exam Study &amp; Audio Preparation Hub</h3>
                <p className="text-xs text-[var(--text-muted)]">Convert any notes or books into exam materials &amp; podcast audio</p>
              </div>
            </div>

            <div className="space-y-6 mt-6 pt-6 border-t border-[var(--border)]">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-2">1. Select Study Material Source</label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full p-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text)] outline-none focus:border-[var(--primary)]"
                >
                  <option value="">-- Choose Book or Uploaded Note --</option>
                  <optgroup label="Authoritative Books">
                    <option value="Kenya Drug Index (KDI) 2024">Kenya Drug Index (KDI) Formulary</option>
                    <option value="WHO Essential Medicines List">WHO Essential Medicines List (EML)</option>
                    <option value="Medscape Antimicrobial Monographs">Medscape Clinical Monographs</option>
                  </optgroup>
                  {knowledgeFiles.length > 0 && (
                    <optgroup label="Your Uploaded Notes">
                      {knowledgeFiles.map(f => (
                        <option key={f.id} value={f.originalName}>{f.originalName}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-2">2. Select Conversion Output</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'Short Notes Summary', desc: 'Concise high-yield bullet points for quick review' },
                    { title: 'All Form Questions', desc: 'MCQs, True/False, OSCE cases & practice drills' },
                    { title: 'Complete Study Kit', desc: 'Combined notes, flashcards & dosing checks' }
                  ].map((opt) => (
                    <button
                      key={opt.title}
                      type="button"
                      onClick={() => setOutputType(opt.title)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        outputType === opt.title 
                          ? 'bg-[var(--primary-container)]/60 border-[var(--primary)] shadow-sm' 
                          : 'bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text-dim)]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--text)] mb-1 flex items-center justify-between">
                        {opt.title}
                        {outputType === opt.title && <CheckCircle2 size={16} className="text-[var(--primary)]" />}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {outputType === 'All Form Questions' && (
                <div className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl animate-in fade-in">
                  <label className="text-xs font-bold text-[var(--text)] block mb-2.5">Include Question Formats:</label>
                  <div className="flex flex-wrap gap-2.5">
                    {['MCQs', 'True/False', 'OSCE Clinical Scenarios', 'Short Answers', 'Calculation Drills'].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleToggleQuestionType(q)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          questionTypes.includes(q)
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                            : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text)]'
                        }`}
                      >
                        {q} {questionTypes.includes(q) && '✓'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/10 to-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl shadow-sm"><Headphones size={22} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text)]">Generate Podcast Audio Overview</h4>
                    <p className="text-xs text-[var(--text-muted)]">Synthesize an AI two-host audio conversation breaking down key exam pearls</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={includePodcast} onChange={(e) => setIncludePodcast(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!selectedSource || isGenerating}
                className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-bold text-base rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? <><Loader2 size={20} className="animate-spin" /> Generating Study Material...</> : <><Sparkles size={20} /> Convert to {outputType}</>}
              </button>
            </div>
          </div>

          {generatedResult && (
            <div className="bg-[var(--surface)] border-2 border-[var(--primary)] rounded-3xl p-8 shadow-xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border)] mb-6">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-[10px] uppercase rounded">Exam Ready Output</span>
                  <h3 className="text-xl font-bold text-[var(--text)] mt-1">{generatedResult.type}</h3>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none text-sm text-[var(--text)] whitespace-pre-line bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)] font-mono">{generatedResult.content}</div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
