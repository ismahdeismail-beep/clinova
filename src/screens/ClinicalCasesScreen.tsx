import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  HeartPulse, Wind, Flame, ShieldAlert, Droplets, Activity, Brain, 
  Smile, Pill, Baby, User, AlertTriangle, ChevronRight,
  Search, BookOpen, Stethoscope, ChevronLeft, BrainCircuit,
  Loader2, Play, Sparkles,
  Award, Sliders, HelpCircle, Book, FileText, Compass, Folder, Copy, Edit3, File, Link, CheckSquare, X,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ClinicalCase, SPECIALTIES, ALL_CLINICAL_CASES } from '../data/clinicalCasesData';
import { getIntegratedUnitId } from '../data/curriculum';
import { ClinicalCaseService } from '../services/clinicalCase.service';
import {
  Section, Card, VitalsGrid, LabTable, DTPCard, PearlPanel, Checklist,
  Bullets, HighlightText, StickySectionNav, ScrollProgress,
} from '../components/clinical';
import { parseVitals, parseLabs, parseDtps, toArray, toText } from '../lib/clinicalParsers';
import { extractMedicines } from '../lib/clinicalTerms';

export default function ClinicalCasesScreen() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCases, setAllCases] = useState<ClinicalCase[]>(ALL_CLINICAL_CASES);
  const [isLoadingDbCases, setIsLoadingDbCases] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadCases = async () => {
      setIsLoadingDbCases(true);
      try {
        const { cases } = await ClinicalCaseService.fetchCases({
          pageSize: 2000,
          status: 'published',
        });
        console.log('[ClinicalCasesScreen] Loaded cases:', cases.length);
        if (cases.length > 0) {
          setAllCases(cases);
        }
      } catch (err) {
        console.warn('[ClinicalCasesScreen] Could not load cases from Supabase:', err);
      } finally {
        setIsLoadingDbCases(false);
      }
    };

    loadCases();
  }, []);

  // Handle deep-linking: if ?caseId=xxx is present, navigate directly to that case
  useEffect(() => {
    const caseId = searchParams.get('caseId');
    if (!caseId || allCases.length === 0) return;
    const match = allCases.find((c) => c.id === caseId || c.seedId === caseId);
    if (match) {
      const unit = SPECIALTIES.find((s) => matchesUnit(match, s));
      if (unit) {
        setSelectedSpecialty(unit);
        setSelectedDisease(match.disease);
        setSelectedCase(match);
        setTutorChat([
          {
            role: 'assistant',
            content: `Welcome to the Clinical Case on **${match.title}**. I am your Clinical Coach. I have loaded the case details, patient history, guidelines for ${match.disease}, and relevant pharmacological concepts. How can I assist you with your clinical reasoning for this case?`
          }
        ]);
      }
    }
  }, [searchParams, allCases]);

  // Disease brain subsection state
  const [showBrainTree, setShowBrainTree] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null);
  const [selectedSubsection, setSelectedSubsection] = useState<{ id: string, title: string, category: string, content: string, cta?: string, action?: string } | null>(null);

  const BRAIN_CATEGORIES = ['Clinical Foundation', 'Diagnosis & Workup', 'Pharmacology & Therapeutics', 'Assessments & Practice', 'Study & Revision Tools'];

  const previewOf = (content: string) => {
    const text = content
      .replace(/^###\s*.*$/m, '')
      .replace(/[#>*_`~]/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return text.length > 120 ? text.slice(0, 120) + '…' : text;
  };

  // Clinical Coach states
  const [tutorMessage, setTutorMessage] = useState('');
  const [tutorChat, setTutorChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSpecialtyClick = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSelectedDisease(null);
    setSelectedCase(null);
  };

  const handleDiseaseClick = (disease: string) => {
    setSelectedDisease(disease);
    setSelectedCase(null);
    setShowBrainTree(false);
    setSelectedSubsection(null);
  };

  const handleCaseClick = (clinicalCase: ClinicalCase) => {
    const unit = SPECIALTIES.find((s) => matchesUnit(clinicalCase, s));
    setSelectedSpecialty(unit || null);
    setSelectedDisease(clinicalCase.disease);
    setShowBrainTree(false);
    setSelectedCase(clinicalCase);
    setTutorChat([
      {
        role: 'assistant',
        content: `Welcome to the Clinical Case on **${clinicalCase.title}**. I am your Clinical Coach. I have loaded the case details, patient history, guidelines for ${clinicalCase.disease}, and relevant pharmacological concepts. How can I assist you with your clinical reasoning for this case?`
      }
    ]);
  };

  const handleBackToSpecialties = () => {
    setSelectedSpecialty(null);
    setSelectedDisease(null);
    setSelectedCase(null);
    setSelectedSubsection(null);
  };

  const handleBackToDiseases = () => {
    setSelectedDisease(null);
    setSelectedCase(null);
    setSelectedSubsection(null);
  };

  const handleBackToCases = () => {
    setSelectedCase(null);
  };

  // ── Dynamic grouping: cases are sourced from Supabase (unitId maps to the
  //    integrated unit). Derive diseases and counts from the live case set so
  //    every seeded case is reachable, regardless of raw specialty naming. ──
  const matchesUnit = (c: ClinicalCase, unitTitle: string) => {
    const unitId = getIntegratedUnitId(unitTitle);
    if (!unitId) return false;
    if (c.unitId === unitId) return true;
    if (c.specialty === unitTitle) return true;
    const caseUnitId = getIntegratedUnitId(c.specialty);
    return caseUnitId === unitId;
  };

  const diseaseCountBySpecialty: Record<string, number> = {};
  for (const s of SPECIALTIES) {
    const set = new Set(allCases.filter((c) => matchesUnit(c, s)).map((c) => c.disease));
    diseaseCountBySpecialty[s] = set.size;
  }

  const selectedUnitId = selectedSpecialty ? getIntegratedUnitId(selectedSpecialty) : undefined;
  const casesForSelectedUnit = selectedUnitId
    ? allCases.filter((c) => matchesUnit(c, selectedSpecialty as string))
    : [];
  const diseasesForSelectedUnit = Array.from(
    new Set(casesForSelectedUnit.map((c) => c.disease).filter(Boolean))
  ).sort();

  const casesForSelectedDisease = selectedSpecialty && selectedDisease
    ? allCases.filter(
        (c) => matchesUnit(c, selectedSpecialty) && c.disease === selectedDisease
      )
    : [];

  const filteredCases = allCases.filter((c) => {
    if (filterSpecialty && !matchesUnit(c, filterSpecialty)) return false;
    const q = searchQuery.trim().toLowerCase();
    if (q && !(
      (c.title || '').toLowerCase().includes(q) ||
      (c.disease || '').toLowerCase().includes(q) ||
      (c.specialty || '').toLowerCase().includes(q) ||
      (c.chiefComplaint || '').toLowerCase().includes(q)
    )) return false;
    return true;
  });

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'Cardiovascular Pharmacotherapy': return <HeartPulse className="text-rose-500" />;
      case 'Respiratory Pharmacotherapy': return <Wind className="text-sky-500" />;
      case 'Endocrine Pharmacotherapy': return <Flame className="text-orange-500" />;
      case 'Infectious Diseases & Antimicrobial Pharmacotherapy': return <ShieldAlert className="text-emerald-500" />;
      case 'Gastrointestinal Pharmacotherapy': return <Activity className="text-amber-500" />;
      case 'Renal & Electrolyte Pharmacotherapy': return <Droplets className="text-blue-500" />;
      case 'Central Nervous System Pharmacotherapy': return <Brain className="text-violet-500" />;
      case 'Haematology & Oncology Pharmacotherapy': return <Activity className="text-purple-500" />;
      case 'Rheumatology & Musculoskeletal Pharmacotherapy': return <Activity className="text-red-500" />;
      case 'Obstetrics & Gynaecology Pharmacotherapy': return <User className="text-pink-500" />;
      case 'Paediatric Pharmacotherapy': return <Baby className="text-teal-500" />;
      case 'Geriatric Pharmacotherapy': return <User className="text-slate-500" />;
      case 'Dermatology Pharmacotherapy': return <ShieldAlert className="text-amber-600" />;
      case 'Ophthalmology Pharmacotherapy': return <ShieldAlert className="text-indigo-400" />;
      case 'ENT Pharmacotherapy': return <Activity className="text-lime-600" />;
      case 'Emergency & Critical Care': return <AlertTriangle className="text-yellow-500" />;
      case 'Toxicology & Poison Management': return <AlertTriangle className="text-red-600" />;
      default: return <Stethoscope className="text-indigo-500" />;
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Cardiovascular Pharmacotherapy': return 'from-rose-500/10 to-rose-500/20 border-rose-200/40 text-rose-700';
      case 'Respiratory Pharmacotherapy': return 'from-sky-500/10 to-sky-500/20 border-sky-200/40 text-sky-700';
      case 'Endocrine Pharmacotherapy': return 'from-orange-500/10 to-orange-500/20 border-orange-200/40 text-orange-700';
      case 'Infectious Diseases & Antimicrobial Pharmacotherapy': return 'from-emerald-500/10 to-emerald-500/20 border-emerald-200/40 text-emerald-700';
      case 'Gastrointestinal Pharmacotherapy': return 'from-amber-500/10 to-amber-500/20 border-amber-200/40 text-amber-700';
      case 'Renal & Electrolyte Pharmacotherapy': return 'from-blue-500/10 to-blue-500/20 border-blue-200/40 text-blue-700';
      case 'Central Nervous System Pharmacotherapy': return 'from-violet-500/10 to-violet-500/20 border-violet-200/40 text-violet-700';
      case 'Haematology & Oncology Pharmacotherapy': return 'from-purple-500/10 to-purple-500/20 border-purple-200/40 text-purple-700';
      case 'Rheumatology & Musculoskeletal Pharmacotherapy': return 'from-red-500/10 to-red-500/20 border-red-200/40 text-red-700';
      case 'Obstetrics & Gynaecology Pharmacotherapy': return 'from-pink-500/10 to-pink-500/20 border-pink-200/40 text-pink-700';
      case 'Paediatric Pharmacotherapy': return 'from-teal-500/10 to-teal-500/20 border-teal-200/40 text-teal-700';
      case 'Geriatric Pharmacotherapy': return 'from-slate-500/10 to-slate-500/20 border-slate-200/40 text-slate-700';
      case 'Dermatology Pharmacotherapy': return 'from-amber-600/10 to-amber-600/20 border-amber-200/40 text-amber-700';
      case 'Ophthalmology Pharmacotherapy': return 'from-indigo-400/10 to-indigo-400/20 border-indigo-200/40 text-indigo-700';
      case 'ENT Pharmacotherapy': return 'from-lime-600/10 to-lime-600/20 border-lime-200/40 text-lime-700';
      case 'Emergency & Critical Care': return 'from-yellow-500/10 to-yellow-500/20 border-yellow-200/40 text-yellow-700';
      case 'Toxicology & Poison Management': return 'from-red-600/10 to-red-600/20 border-red-200/40 text-red-700';
      default: return 'from-indigo-500/10 to-indigo-500/20 border-indigo-200/40 text-indigo-700';
    }
  };

  const getDiseaseBrainData = (diseaseName: string) => {
    const d = diseaseName.toLowerCase();
    
    const isHeartFailure = d.includes('heart failure') || d.includes('cardio');
    const isPneumonia = d.includes('pneumonia') || d.includes('infection') || d.includes('respiratory') || d.includes('asthma') || d.includes('copd');
    const isDka = d.includes('diabetic') || d.includes('ketoacidosis') || d.includes('endocrine') || d.includes('diabetes');
    const isStroke = d.includes('stroke') || d.includes('neurolog') || d.includes('brain');
    const isPreeclampsia = d.includes('preeclampsia') || d.includes('pregnancy') || d.includes('obstetrics');
    const isMeningitis = d.includes('meningitis');
    const isDepression = d.includes('depression') || d.includes('psych');
    const isCirrhosis = d.includes('cirrhosis') || d.includes('liver') || d.includes('gastro');
    const isCancer = d.includes('cancer') || d.includes('oncology') || d.includes('tumor');
    const isToxicology = d.includes('poison') || d.includes('toxic') || d.includes('overdose') || d.includes('bite') || d.includes('snake');

    const getOverview = () => {
      if (isHeartFailure) return "Heart Failure (HF) represents a complex clinical syndrome characterized by the heart's inability to pump sufficient blood to meet metabolic demands, often resulting in systemic congestion, fatigue, and progressive exercise intolerance. HF is primarily categorized into Heart Failure with Reduced Ejection Fraction (HFrEF) and Heart Failure with Preserved Ejection Fraction (HFpEF).";
      if (isDka) return "Diabetic emergencies (DKA and HHS) are acute, life-threatening crises in patients with diabetes. DKA is characterized by uncontrolled hyperglycemia, metabolic acidosis, and profound ketone body accumulation, driven by absolute or relative insulin deficiency.";
      if (isPneumonia) return "Respiratory pharmacotherapy addresses conditions like Asthma, COPD, and Infections (Pneumonia). This involves airway inflammation, bronchoconstriction, and alveolar consolidation. Proper drug delivery via inhalers or systemic therapy is critical.";
      if (isStroke) return "Acute ischemic stroke represents a neurological emergency caused by occlusion of a cerebral artery, leading to focal brain tissue ischemia. Rapid therapeutic intervention with thrombolytic agents (Alteplase) is critical within the 4.5-hour window.";
      if (isPreeclampsia) return "Preeclampsia is a multi-system hypertensive disorder of pregnancy, arising after 20 weeks gestation. It is characterized by endothelial dysfunction, arterial hypertension, and end-organ damage (e.g., proteinuria, thrombocytopenia, or renal impairment).";
      if (isToxicology) return "Toxicology and poison management deals with the clinical presentation, diagnosis, and antidote pharmacotherapy for acute exposures to drugs, chemicals, venomous bites, and environmental toxins.";
      return `Disease monograph for ${diseaseName}, focusing on evidence-based pharmaceutical care, clinical guidelines, and patient-centered pharmacotherapy.`;
    };

    const getPatho = () => {
      if (isHeartFailure) return "RAAS (Renin-Angiotensin-Aldosterone System) and Sympathetic Nervous System (SNS) hyperactivation drives ventricular remodeling, interstitial fibrosis, and peripheral vasoconstriction, leading to progressive myocardial failure.";
      if (isDka) return "Absolute insulin deficiency + counter-regulatory hormone excess (glucagon, cortisol, epinephrine) triggers lipolysis, releasing free fatty acids that undergo hepatic beta-oxidation to form ketone bodies (acetoacetate, beta-hydroxybutyrate).";
      if (isPneumonia) return "Inflammatory cascade involving alveolar fluid exudation, neutrophilic infiltration, and cytokine release, resulting in ventilation-perfusion mismatch and bronchospasm.";
      if (isStroke) return "Cerebral arterial occlusion leads to failure of ATP production, sodium-potassium pump arrest, intracellular calcium influx, glutamate excitotoxicity, and eventual cell necrosis within the ischemic core.";
      if (isPreeclampsia) return "Abnormal placental spiral artery remodeling leads to placental hypoxia, releasing soluble anti-angiogenic factors (sFlt-1) into maternal circulation, causing systemic endothelial dysfunction and vasospasm.";
      if (isToxicology) return "Involves specific toxicological mechanisms, such as receptor blockade/agonisms (e.g., organophosphate acetylcholinesterase inhibition, paracetamol glutathione depletion, or calcium channel blocker insulin resistance).";
      return `Pathophysiology of ${diseaseName} involves cellular injury, inflammatory signaling pathways, and tissue remodeling leading to specific functional deficits.`;
    };

    const getTx = () => {
      if (isHeartFailure) return "Guideline-Directed Medical Therapy (GDMT):\n1. ARNI (Sacubitril/Valsartan) as first-line RAAS inhibitor.\n2. Beta-blockers (Bisoprolol/Carvedilol) to counteract SNS excess.\n3. Mineralocorticoid Receptor Antagonists (Spironolactone).\n4. SGLT2 Inhibitors (Empagliflozin/Dapagliflozin) for cardiac unloading.";
      if (isDka) return "Three-pillar management:\n1. Aggressive IV Fluid Resuscitation (Normal saline, then D5W with 0.45% NaCl when glucose <250 mg/dL).\n2. IV Insulin Infusion (0.1 U/kg/hr) to close the anion gap.\n3. Potassium Repletion (maintain K+ between 4.0-5.0 mEq/L; hold insulin if K+ <3.3 mEq/L).";
      if (isPneumonia) return "Empiric antimicrobial selection based on community vs hospital-acquired risk. For obstructive airway diseases, step-wise inhaled therapy combining LABA/LAMA and ICS (Inhaled Corticosteroids).";
      if (isStroke) return "Aspirin 300mg secondary prevention, acute thrombolysis with IV Alteplase (0.9 mg/kg, max 90mg) if within 4.5 hours and no contraindications. Intensive blood pressure management (keep <180/105 mmHg during and post-thrombolysis).";
      if (isPreeclampsia) return "Intravenous Magnesium Sulfate (4g loading dose, then 1-2g/hr infusion) for seizure prophylaxis. Antihypertensive therapy using IV Labetalol, Hydralazine, or oral Nifedipine to keep BP <160/110 mmHg. Delivery of fetus is the definitive cure.";
      if (isToxicology) return "Decontamination (activated charcoal if within 1 hour), supportive care (fluids, airway), and specific antidote administration (Acetylcysteine for paracetamol, Atropine/Pralidoxime for organophosphates, Digibind for digoxin).";
      return `Pharmacotherapy for ${diseaseName} consists of evidence-based drug selection, systematic dosing titration, drug-drug interaction audits, and monitoring for therapeutic response.`;
    };

    const getMeds = () => {
      if (isHeartFailure) return "• Sacubitril/Valsartan (97/103mg BID)\n• Bisoprolol (10mg QD)\n• Spironolactone (25mg QD)\n• Dapagliflozin (10mg QD)\n• Furosemide (40mg IV/PO as needed)";
      if (isDka) return "• Soluble (Regular) Insulin IV\n• Sodium Chloride 0.9% IV\n• Potassium Chloride IV/PO\n• Dextrose 5% in 0.45% NaCl IV";
      if (isPneumonia) return "• Ceftriaxone + Azithromycin (Empiric CAP)\n• Salbutamol inhaler\n• Fluticasone/Salmeterol inhaler\n• Amoxicillin/Clavulanate";
      if (isStroke) return "• Alteplase (recombinant t-PA)\n• Aspirin (300mg initial, then 75mg daily)\n• Clopidogrel (75mg daily)\n• Atorvastatin (80mg daily)";
      if (isPreeclampsia) return "• Magnesium Sulfate IV\n• Labetalol IV / PO\n• Hydralazine IV\n• Nifedipine ER PO\n• Calcium Gluconate (antidote for magnesium toxicity)";
      if (isToxicology) return "• Acetylcysteine (IV/PO)\n• Atropine sulfate\n• Pralidoxime chloride\n• Fomepizole\n• Deferoxamine\n• Polyvalent Snake Antivenom";
      return "Standard pharmacological agents on the WHO Essential Medicines List and Kenya National Clinical Guidelines.";
    };

    return {
      overview: getOverview(),
      pathology: getPatho(),
      therapeutics: getTx(),
      medicines: getMeds(),
    };
  };

  const getDiseaseKnowledgeTree = (diseaseName: string) => {
    const brain = getDiseaseBrainData(diseaseName);
    
    return [
      {
        id: 'objectives',
        title: 'Learning Objectives',
        category: 'Clinical Foundation',
        icon: <Award className="text-emerald-500" size={18} />,
        content: `### Learning Objectives for **${diseaseName}**\n\n1. **Core Pathophysiology**: Connect molecular & tissue remodeling events to clinical signs.\n2. **Therapeutic Staging**: Define criteria for drug escalation based on patient classification.\n3. **Evidence-Based GDMT**: Apply randomized trial results (e.g., EMPEROR, DAPA-HF, RALES) to clinical decisions.\n4. **Pharmaceutical Care**: Proactively screen for and resolve Drug Therapy Problems (DTPs) like improper dosing, safety alerts, or adverse interactions.`,
        cta: 'Review Curriculum Mapping',
        action: 'link-education'
      },
      {
        id: 'overview',
        title: 'Disease Overview',
        category: 'Clinical Foundation',
        icon: <BookOpen className="text-sky-500" size={18} />,
        content: `### Clinical Overview of **${diseaseName}**\n\n${brain.overview}\n\n*   **Classification**: Classify based on etiology, progression, and risk profile.\n*   **Kenya Burden**: High clinical priority in public and private medical facilities.`,
        cta: 'View Disease Monograph',
        action: 'monograph'
      },
      {
        id: 'pathophysiology',
        title: 'Pathophysiology',
        category: 'Clinical Foundation',
        icon: <Activity className="text-rose-500" size={18} />,
        content: `### Pathophysiological Cascade\n\n${brain.pathology}\n\n*   **Cellular Remodeling**: Chronic structural changes.\n*   **Neurohormonal Stressors**: Target pathways for active pharmacotherapy.`,
        cta: 'Ask the Tutor about Pathophysiology',
        action: 'tutor'
      },
      {
        id: 'risk_factors',
        title: 'Risk Factors',
        category: 'Clinical Foundation',
        icon: <AlertTriangle className="text-orange-500" size={18} />,
        content: `### Major Risk Factors & Etiology\n\n*   **Modifiable**: Hypertension, obesity, diet, dyslipidemia, drug/chemical exposure.\n*   **Non-Modifiable**: Advanced age, genetic polymorphisms (e.g., CYP alleles), congenital markers.\n*   **Secondary Causes**: Intercurrent systemic infections, poor adherence, and medication toxicity.`,
        cta: 'Screen Patient History',
        action: 'cases'
      },
      {
        id: 'presentation',
        title: 'Clinical Presentation',
        category: 'Clinical Foundation',
        icon: <User className="text-violet-500" size={18} />,
        content: `### Clinical Presentation of **${diseaseName}**\n\n*   **Subjective Complaints**: Chief complaint, typical history of presenting illness (HPI).\n*   **Objective Signs**: Hallmark physical exam findings, vitals changes, and specific clinical signs.\n*   **Emergency Flags**: Dyspnea at rest, chest pain, oliguria, high fever, altered mental status, or toxic crisis.`,
        cta: 'Explore Presentation Cases',
        action: 'cases'
      },
      {
        id: 'investigations',
        title: 'Investigations',
        category: 'Diagnosis & Workup',
        icon: <Search className="text-blue-500" size={18} />,
        content: `### Diagnostic Investigations\n\n*   **Laboratory Panels**: Complete blood count (CBC), renal function (Urea, Creatinine, eGFR), electrolytes, drug-specific toxic levels.\n*   **Biomarkers**: Highly specific clinical markers.\n*   **Imaging & ECG**: Echocardiography, chest X-rays, magnetic resonance, or continuous ECG telemetry as indicated.`,
        cta: 'Interpret Lab Results',
        action: 'cases'
      },
      {
        id: 'diagnosis',
        title: 'Diagnosis & Criteria',
        category: 'Diagnosis & Workup',
        icon: <Stethoscope className="text-indigo-500" size={18} />,
        content: `### Diagnostic Criteria for **${diseaseName}**\n\n*   **Primary Diagnostic Standards**: Guided by WHO and specialized college criteria.\n*   **Functional Staging**: Staged to optimize step-wise therapeutic titration.\n*   **Timing**: Critical thresholds (e.g., immediate bedside point-of-care diagnostics).`,
        cta: 'Review Guidelines',
        action: 'guidelines'
      },
      {
        id: 'ddx',
        title: 'Differential Diagnosis',
        category: 'Diagnosis & Workup',
        icon: <HelpCircle className="text-amber-500" size={18} />,
        content: `### Differential Diagnoses\n\n*   **Systemic Mimics**: Alternative acute presentations requiring divergent care.\n*   **Exclusion Matrix**: Differentiating clinical cues (e.g., ruling out renal failure in cardiac congestion).\n*   **Diagnostic Safety**: Minimizing anchoring bias during emergency admissions.`,
        cta: 'Differentiate Case',
        action: 'tutor'
      },
      {
        id: 'pharmacology',
        title: 'Pharmacology & Mechanism',
        category: 'Pharmacology & Therapeutics',
        icon: <Pill className="text-teal-500" size={18} />,
        content: `### Receptor & Target Pharmacology\n\n*   **Mechanisms of Action**: Exact receptor binding, enzyme inhibition, or channel blockade.\n*   **Pharmacokinetic Profiles**: Absorption, protein binding, hepatic metabolism, and primary renal clearance.\n*   **Pharmacodynamic Properties**: Dose-response curves, therapeutic indices, and clinical targets.`,
        cta: 'View Pharmacology Hub',
        action: 'link-education'
      },
      {
        id: 'clinical_pharmacy',
        title: 'Clinical Pharmacy Problems',
        category: 'Pharmacology & Therapeutics',
        icon: <AlertTriangle className="text-rose-500" size={18} />,
        content: `### Drug Therapy Problems (DTPs)\n\n*   **Common Clinical Mistakes**: Sub-therapeutic doses, untreated indications, or prescribing cascades.\n*   **Safety Conflicts**: Severe drug-drug interactions, high toxicity, and cumulative side effects.\n*   **Adherence Barriers**: Complexity of regimen, high medication costs, and patient distress.`,
        cta: 'Review DTP Checklist',
        action: 'cases'
      },
      {
        id: 'therapeutics',
        title: 'Therapeutics & Staging',
        category: 'Pharmacology & Therapeutics',
        icon: <Sliders className="text-purple-500" size={18} />,
        content: `### Evidence-Based Therapeutics\n\n${brain.therapeutics}\n\n*   **Stepwise Titration**: Guidelines for starting, doubling, or maintaining therapeutic agents.\n*   **Special Populations**: Renally impaired, hepatic insufficiency, pediatrics, geriatrics, or pregnancy.`,
        cta: 'Review Staging Guidelines',
        action: 'guidelines'
      },
      {
        id: 'pharmaceutical_care',
        title: 'Pharmaceutical Care Plan',
        category: 'Pharmacology & Therapeutics',
        icon: <HeartPulse className="text-emerald-500" size={18} />,
        content: `### Pharmaceutical Care Planning\n\n*   **Therapeutic Goals**: Quick relief, clinical stabilization, and prevention of re-admission.\n*   **Care Coordination**: Reconciling medications, managing transitions of care, and multi-disciplinary communication.\n*   **Implementation**: Formulating specific dosage schedules and monitoring plans.`,
        cta: 'Develop Care Plan',
        action: 'cases'
      },
      {
        id: 'drug_classes',
        title: 'Key Drug Classes',
        category: 'Pharmacology & Therapeutics',
        icon: <Pill className="text-yellow-600" size={18} />,
        content: `### Primary Drug Classes for **${diseaseName}**\n\n*   **First-Line Classes**: Proven to improve prognosis or provide immediate emergency resolution.\n*   **Second-Line Classes**: Adjunctive agents for refractory symptom control.\n*   **Contraindicated Classes**: Highly dangerous classes to avoid (e.g., NSAIDs in severe Heart Failure).`,
        cta: 'Check Key Classes',
        action: 'link-education'
      },
      {
        id: 'medicines',
        title: 'Essential Medicines (WHO/KDL)',
        category: 'Pharmacology & Therapeutics',
        icon: <CheckSquare className="text-cyan-600" size={18} />,
        content: `### Essential Medicines Registry\n\n${brain.medicines}\n\n*   **Kenya National Formulary**: Sourced from the Kenya Drug Index.\n*   **WHO Model List**: Essential medicines prioritized for quality, safety, and cost-effectiveness.`,
        cta: 'Query Kenya Drug Index',
        action: 'kdl'
      },
      {
        id: 'drug_monographs',
        title: 'Drug Monographs',
        category: 'Pharmacology & Therapeutics',
        icon: <Book className="text-slate-600" size={18} />,
        content: `### Detailed Drug Monographs\n\n*   **Prescribing Information**: Indication, dosage, renal adjustments, hepatic adjustments.\n*   **Adverse Drug Reactions (ADRs)**: Critical monitoring for high-frequency or life-threatening toxicities.\n*   **Interactions**: Potent enzyme inducers/inhibitors to monitor or swap.`,
        cta: 'Open Drug Monographs',
        action: 'link-drug-info'
      },
      {
        id: 'disease_monograph',
        title: 'Disease Monograph',
        category: 'Pharmacology & Therapeutics',
        icon: <FileText className="text-zinc-600" size={18} />,
        content: `### Comprehensive Disease Monograph for **${diseaseName}**\n\n*   **Etiology & Burden**: Global and national epidemiology.\n*   **Clinical Presentation**: Diagnosis, staging, and evidence-based therapeutic summaries.\n*   **Clinical Review**: Periodically updated by the medical faculty.`,
        cta: 'Open Disease Monograph',
        action: 'link-drug-info'
      },
      {
        id: 'guidelines',
        title: 'Clinical Guidelines',
        category: 'Pharmacology & Therapeutics',
        icon: <Compass className="text-blue-600" size={18} />,
        content: `### National & International Clinical Guidelines\n\n*   **Kenya MOH Guidelines**: National clinical guidelines for pharmacotherapy.\n*   **WHO Standards**: Global therapeutic protocols.\n*   **International Societies**: Landmark clinical practice guidelines (e.g., AHA/ACC, GINA, GOLD, IDSA).`,
        cta: 'Browse Guidelines Library',
        action: 'link-drug-info'
      },
      {
        id: 'cases',
        title: 'Clinical Cases (50+ Unit-Wide)',
        category: 'Assessments & Practice',
        icon: <Folder className="text-indigo-600" size={18} />,
        content: `### Practical Case Studies\n\n*   **Active Patient Scenarios**: Practice diagnostic reasoning and pharmaceutical care formulation on realistic patient charts.\n*   **Staged Difficulty**: Structured from Beginner to Advanced/Refractory states.\n*   **Unit-Wide Registry**: Minimum 50 high-quality cases integrated across the parent curriculum unit.`,
        cta: 'View Cases List',
        action: 'cases'
      },
      {
        id: 'flashcards',
        title: 'Spaced Repetition Flashcards',
        category: 'Assessments & Practice',
        icon: <Copy className="text-violet-600" size={18} />,
        content: `### Active Recall Flashcard Decks\n\n*   **Spaced Repetition Algorithm**: Optimizes review intervals based on difficulty rating.\n*   **Decks on Drug Targets**: Rapid recall of mechanisms, adverse reactions, and key doses.\n*   **High-Yield Core Facts**: Perfect for quick daily board review.`,
        cta: 'Launch Flashcards Deck',
        action: 'flashcards'
      },
      {
        id: 'mcqs',
        title: 'Multiple Choice Questions (MCQs)',
        category: 'Assessments & Practice',
        icon: <CheckSquare className="text-sky-600" size={18} />,
        content: `### Comprehensive MCQs Assessment\n\n*   **Board-Style Questions**: Test core pharmacological knowledge and therapeutic indications.\n*   **Instant Detailed Rationales**: Learn from every correct and incorrect answer.\n*   **Progress Tracking**: Integrated with your Student Onboarding dashboard.`,
        cta: 'Practice MCQs Now',
        action: 'qbank'
      },
      {
        id: 'sbas',
        title: 'Single Best Answers (SBAs)',
        category: 'Assessments & Practice',
        icon: <Award className="text-orange-600" size={18} />,
        content: `### Advanced Single Best Answers (SBAs)\n\n*   **Complex Clinical Vignettes**: Navigate realistic cases where multiple choices seem plausible.\n*   **Reasoning Frameworks**: Evaluates deep clinical application rather than simple recall.\n*   **Board Exam Standard**: Simulates professional registration and board licensing questions.`,
        cta: 'Practice SBAs Now',
        action: 'qbank'
      },
      {
        id: 'saqs',
        title: 'Short Answer Questions (SAQs)',
        category: 'Assessments & Practice',
        icon: <Edit3 className="text-fuchsia-600" size={18} />,
        content: `### Written Short Answer Questions (SAQs)\n\n*   **Targeted Short Writing**: Practice explaining drug mechanisms, staging criteria, and safety rationale.\n*   **Faculty Exemplar Keys**: Compare your answers directly against expert clinical solutions.\n*   **Self-Assessment Grading**: High-yield practice for written papers.`,
        cta: 'Practice SAQs Now',
        action: 'qbank'
      },
      {
        id: 'essays',
        title: 'Essay & Viva Questions',
        category: 'Assessments & Practice',
        icon: <FileText className="text-rose-600" size={18} />,
        content: `### Broad Essay & Viva Questions\n\n*   **Long-Form Clinical Logic**: Synthesize complex guidelines, pharmacogenomic variables, and care transition protocols.\n*   **Structured Rubrics**: Evaluated based on medical depth, priority-based reasoning, and patient safety.\n*   **Viva Preparation**: Practice mapping structured therapeutic defense.`,
        cta: 'Review Essay Questions',
        action: 'qbank'
      },
      {
        id: 'study_guide',
        title: 'Clinova Study Guide',
        category: 'Study & Revision Tools',
        icon: <Sparkles className="text-yellow-500" size={18} />,
        content: `### Clinova Study Planner & Guide\n\n*   **Personalized Path**: Custom study guides mapped directly to your academic progress.\n*   **Focus Recommendations**: Automatically flags weak therapeutic concepts.\n*   **Time-Optimized**: Maximizes score efficiency per study hour.`,
        cta: 'Generate Study Guide',
        action: 'planner'
      },
      {
        id: 'revision_notes',
        title: 'Revision Notes & Summaries',
        category: 'Study & Revision Tools',
        icon: <File className="text-amber-600" size={18} />,
        content: `### High-Yield Revision Notes\n\n*   **Summary Tables**: Cross-comparisons of drug onset, peak, clearance, and safety profiles.\n*   **Mnemonics**: Memorize complex clinical criteria and drug interactions easily.\n*   **Downloadable PDFs**: Complete summaries available for offline study.`,
        cta: 'Open Revision Notes',
        action: 'notes'
      },
      {
        id: 'monitoring',
        title: 'Monitoring & Safety Parameters',
        category: 'Study & Revision Tools',
        icon: <Activity className="text-red-500" size={18} />,
        content: `### Laboratory & Safety Monitoring\n\n*   **Efficacy Tracking**: Signs of symptomatic improvement (e.g., target weight loss, normalized heart rate).\n*   **Toxicity Monitoring**: Renal function audits, electrolyte checks, drug level blood-draw schedules (TDM).\n*   **Adverse Effect Management**: Protocol for immediate medication withholding and supportive therapy.`,
        cta: 'Check Safety Checklist',
        action: 'cases'
      },
      {
        id: 'resources',
        title: 'Related Library Resources',
        category: 'Study & Revision Tools',
        icon: <Link className="text-teal-600" size={18} />,
        content: `### Academic & Clinical Resources\n\n*   **Online Library**: Integrated access to medical texts, primary journal studies, and trial evidence.\n*   **Kenya MOH Portals**: Direct download links for current national treatment booklets.\n*   **Clinical Calculators**: Link to tools for CrCl, GFR, HAS-BLED, CHA2DS2-VASc, and pediatric dose calculators.`,
        cta: 'Browse Reference Library',
        action: 'notes'
      },
    ];
  };

  const handleSubsectionAction = (action: string) => {
    switch (action) {
      case 'link-education':
        navigate('/knowledge');
        break;
      case 'link-drug-info':
        navigate('/knowledge');
        break;
      case 'flashcards':
        navigate('/knowledge');
        break;
      case 'qbank':
        navigate('/knowledge');
        break;
      case 'notes':
        navigate('/knowledge');
        break;
      case 'planner':
        navigate('/');
        break;
      case 'kdl':
        navigate('/knowledge');
        break;
      case 'tutor':
        // Start AI tutor on the disease general topic
        setTutorChat([
          {
            role: 'assistant',
            content: `Hello! I am your Clinical Coach. Let's study **${selectedDisease}** pharmacology and therapeutics together. What questions do you have about the pathophysiology, drug guidelines, or clinical pharmacy care plans?`
          }
        ]);
        // Simulate clicking an interactive case or tutor discussion
        break;
      case 'cases':
        setShowBrainTree(false);
        setSelectedSubsection(null);
        break;
      default:
        break;
    }
  };

  const filteredSpecialties = SPECIALTIES.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim() || !selectedCase) return;

    const userMsg = tutorMessage;
    setTutorMessage('');
    
    const newChat = [...tutorChat, { role: 'user' as const, content: userMsg }];
    setTutorChat(newChat);
    setIsTutorThinking(true);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const response = await fetch('/api/gemini/case-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: selectedCase.specialty,
          disease: selectedCase.disease,
          caseTitle: selectedCase.title,
          caseData: selectedCase,
          chatHistory: tutorChat,
          userMessage: userMsg
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setTutorChat([...newChat, { 
        role: 'assistant', 
        content: data.reply 
      }]);
      setIsTutorThinking(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error asking tutor:', error);
      setIsTutorThinking(false);
    }
  };

  const caseText = selectedCase
    ? [selectedCase.hpi, selectedCase.pe, selectedCase.pharm, selectedCase.nonPharm, selectedCase.carePlan, selectedCase.dtps, selectedCase.monitoring, selectedCase.counselling, selectedCase.goals, selectedCase.diagnosis].join(' ')
    : '';
  const medicines = extractMedicines(caseText);
  const diseases = selectedCase ? [selectedCase.disease] : [];
  const vitals = selectedCase ? parseVitals(selectedCase.vitals) : null;
  const labs = selectedCase ? parseLabs(selectedCase.labs) : null;
  const dtps = selectedCase ? parseDtps(selectedCase.dtps) : [];
  const monitoringItems = selectedCase ? toArray(selectedCase.monitoring) : [];
  const openDrug = (name: string) => navigate(`/drugs?q=${encodeURIComponent(name)}`);
  const openDisease = (name: string) => navigate(`/knowledge?disease=${encodeURIComponent(name)}`);

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Stethoscope size={16} /> Clinical Cases
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Clinical Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Studies</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
              Integrate knowledge from multiple disciplines to simulate real patient care. Practice diagnostic reasoning and pharmacotherapy management.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {!selectedSpecialty && (
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  type="text"
                    placeholder="Search cases, diseases, or drugs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>
            )}
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] overflow-x-auto pb-2 whitespace-nowrap">
          <button onClick={() => navigate('/knowledge')} className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">Education Hub</button>
          <ChevronRight size={14} />
          <button onClick={handleBackToSpecialties} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedSpecialty ? 'text-[var(--text)] font-bold' : ''}`}>
            Clinical Cases
          </button>
          {selectedSpecialty && (
            <>
              <ChevronRight size={14} />
              <button onClick={handleBackToDiseases} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedDisease ? 'text-[var(--text)] font-bold' : ''}`}>
                {selectedSpecialty}
              </button>
            </>
          )}
          {selectedDisease && (
            <>
              <ChevronRight size={14} />
              <button onClick={handleBackToCases} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedCase ? 'text-[var(--text)] font-bold' : ''}`}>
                {selectedDisease}
              </button>
            </>
          )}
          {selectedCase && (
            <>
              <ChevronRight size={14} />
              <span className="text-[var(--text)] font-bold truncate max-w-[200px]">{selectedCase.title}</span>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="pb-24">
          
          {/* Level 1: Specialties */}
          {!selectedSpecialty && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text)]">Clinical Cases</h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Select a therapeutic area to explore clinical cases</p>
                </div>
                <div className="text-sm text-[var(--text-muted)] font-medium">
                  {allCases.length} cases
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases by title, disease, or specialty..."
                  className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              {/* Specialty cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {SPECIALTIES.filter((spec) => {
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return spec.toLowerCase().includes(q) ||
                    allCases.filter((c) => matchesUnit(c, spec)).some((c) =>
                      c.title.toLowerCase().includes(q) || c.disease.toLowerCase().includes(q)
                    );
                }).map((spec) => {
                  const cases = allCases.filter((c) => matchesUnit(c, spec));
                  if (cases.length === 0) return null;
                  const diseases = [...new Set(cases.map((c) => c.disease))];
                  return (
                    <button
                      key={spec}
                      onClick={() => handleSpecialtyClick(spec)}
                      className="text-left bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                          {getSpecialtyIcon(spec)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-sm truncate">
                            {spec.replace(' Pharmacotherapy', '')}
                          </h3>
                          <p className="text-xs text-[var(--text-muted)]">{cases.length} case{cases.length !== 1 ? 's' : ''} &bull; {diseases.length} disease{diseases.length !== 1 ? 's' : ''}</p>
                        </div>
                        <ChevronRight size={16} className="text-[var(--text-dim)] group-hover:text-[var(--primary)] ml-auto shrink-0 group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {diseases.slice(0, 3).map((d) => (
                          <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-dim)] text-[var(--text-muted)] truncate max-w-[120px]">
                            {d}
                          </span>
                        ))}
                        {diseases.length > 3 && (
                          <span className="text-[10px] text-[var(--text-dim)] px-1">+{diseases.length - 3}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {SPECIALTIES.filter((spec) => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return spec.toLowerCase().includes(q) ||
                  allCases.filter((c) => matchesUnit(c, spec)).some((c) =>
                    c.title.toLowerCase().includes(q) || c.disease.toLowerCase().includes(q)
                  );
              }).every((spec) => allCases.filter((c) => matchesUnit(c, spec)).length === 0) && (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)]">No cases match your search</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm mx-auto">Try a different term.</p>
                </div>
              )}
            </div>
          )}

          {/* Level 2: Diseases */}
          {selectedSpecialty && !selectedDisease && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToSpecialties} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                  <ChevronLeft size={18} className="text-[var(--text)]" />
                </button>
                <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                  {getSpecialtyIcon(selectedSpecialty)} {selectedSpecialty}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {diseasesForSelectedUnit.map((disease, idx) => {
                  const casesCount = casesForSelectedUnit.filter(c => c.disease === disease).length;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleDiseaseClick(disease)}
                      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{disease}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{casesCount} {casesCount === 1 ? 'Case' : 'Cases'} Available</p>
                      </div>
                      <ChevronRight size={18} className="text-[var(--border)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

              {/* Level 3: Cases & Disease Brain Tree */}
              {selectedSpecialty && selectedDisease && !selectedCase && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  {(() => { console.log('[ClinicalCasesScreen] Rendering casesForSelectedDisease:', casesForSelectedDisease); return null; })()}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <button onClick={handleBackToDiseases} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                    <ChevronLeft size={18} className="text-[var(--text)]" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--text)]">
                      {selectedDisease}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Explore active clinical cases or master the 30-node disease learning tree.</p>
                  </div>
                </div>

                {/* Disease Brain Tree toggle */}
                <button
                  onClick={() => setShowBrainTree(!showBrainTree)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer self-start md:self-auto shadow-sm ${
                    showBrainTree
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                      : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <BrainCircuit size={14} />
                  Disease Brain Tree
                </button>
              </div>

              {!showBrainTree ? (
                <div className="space-y-4">
                  {casesForSelectedDisease.map((clinicalCase, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCaseClick(clinicalCase)}
                      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-md group"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                              clinicalCase.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600' :
                              clinicalCase.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600' :
                              'bg-rose-500/10 text-rose-600'
                            }`}>
                              {clinicalCase.difficulty} Level
                            </span>
                            <span className="text-xs text-[var(--text-muted)]">By {clinicalCase.createdByName}</span>
                          </div>
                          <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-2">
                            {clinicalCase.title}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                            <span className="font-semibold">Patient:</span> {clinicalCase.patientName} ({clinicalCase.demographics}) &bull; <span className="font-semibold">Setting:</span> {clinicalCase.facilitySetting}
                          </p>
                          <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed mt-1">
                            <span className="font-semibold">CC:</span> "{clinicalCase.chiefComplaint}"
                          </p>
                        </div>
                        <div className="flex items-center justify-end md:items-center">
                          <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm">
                            Review Case <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {casesForSelectedDisease.length === 0 && (
                    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                      <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={32} className="text-[var(--text-muted)]" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text)]">No Cases Available Yet</h3>
                      <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
                        Teaching cases for {selectedDisease} are currently being compiled by the faculty. Please check back later.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Category navigation */}
                  <div className="sticky top-[4.25rem] z-20 -mx-1 px-1 py-2 bg-[var(--bg)]/90 backdrop-blur flex gap-2 overflow-x-auto">
                    {BRAIN_CATEGORIES.map((cat, i) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => document.getElementById(`brain-cat-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/40 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Category Sections */}
                  {BRAIN_CATEGORIES.map((cat, cIdx) => {
                    const nodes = getDiseaseKnowledgeTree(selectedDisease!).filter(node => node.category === cat);
                    if (nodes.length === 0) return null;
                    return (
                      <div key={cIdx} id={`brain-cat-${cIdx}`} className="space-y-4 scroll-mt-[6rem]">
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">{cat}</h3>
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">{nodes.length} topics</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {nodes.map((node, nIdx) => (
                            <div
                              key={nIdx}
                              onClick={() => setSelectedSubsection({ id: node.id, title: node.title, category: node.category, content: node.content, cta: node.cta, action: node.action })}
                              className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md flex flex-col gap-3 group"
                            >
                              <div className="flex justify-between items-start">
                                <div className="p-2 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl group-hover:border-[var(--primary)]/30 transition-colors">
                                  {node.icon}
                                </div>
                                <span className="text-[10px] font-mono text-[var(--text-muted)]">{cIdx + 1}.{nIdx + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-[var(--text)] leading-tight group-hover:text-[var(--primary)] transition-colors">{node.title}</h4>
                                <p className="text-[11px] text-[var(--text-muted)] mt-1.5 line-clamp-3 leading-relaxed">{previewOf(node.content)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Level 4: Case Details */}
          {selectedCase && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <button onClick={handleBackToCases} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                    <ChevronLeft size={18} className="text-[var(--text)]" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--text)] leading-tight">{selectedCase.title}</h2>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                      <span>{selectedCase.specialty}</span>
                      <span>&bull;</span>
                      <span>{selectedCase.disease}</span>
                      <span>&bull;</span>
                      <span className={`font-semibold ${
                        selectedCase.difficulty === 'Beginner' ? 'text-emerald-600' :
                        selectedCase.difficulty === 'Intermediate' ? 'text-amber-600' :
                        'text-rose-600'
                      }`}>{selectedCase.difficulty} Level</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedCase(null); setShowBrainTree(true); }}
                    className="px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer self-start sm:self-auto shadow-sm"
                  >
                    <BrainCircuit size={14} />
                    Disease Brain
                  </button>
                </div>
              </div>

              <ScrollProgress />
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Sticky Section Nav */}
                <StickySectionNav items={[
                  { id: 'presentation', label: 'Presentation' },
                  { id: 'investigations', label: 'Investigations' },
                  { id: 'management', label: 'Management' },
                  { id: 'pearls', label: 'Pearls' },
                ]} />
                {/* Main Case Info */}
                <div className="xl:col-span-7 space-y-6">
                  {/* Presentation Section */}
                  <Card className="p-6">
                    <Section id="presentation" title="Clinical Presentation" icon={<User size={16} />}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Patient Name</h4>
                          <p className="text-base font-bold text-[var(--primary)]">{selectedCase.patientName}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Facility / Setting</h4>
                          <p className="text-sm text-[var(--text)] font-medium">{selectedCase.facilitySetting}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Demographics</h4>
                          <p className="text-sm text-[var(--text)]">{selectedCase.demographics}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Chief Complaint</h4>
                          <p className="text-sm text-[var(--text)] font-medium">"{selectedCase.chiefComplaint}"</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">History of Presenting Illness</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.hpi || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Past Medical History</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.pmh || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Medication History</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.medHx || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Allergies</h4>
                          <p className="text-sm text-[var(--danger)] font-medium">{selectedCase.allergies}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Physical Examination</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.pe || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Vital Signs</h4>
                        {vitals ? <VitalsGrid vitals={vitals} /> : <p className="text-sm text-[var(--text-muted)]">{selectedCase.vitals}</p>}
                      </div>
                    </Section>
                  </Card>

                  {/* Investigations Section */}
                  <Card className="p-6">
                    <Section id="investigations" title="Investigations" icon={<Activity size={16} />}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Laboratory Results</h4>
                          {labs ? <LabTable labs={labs} /> : (
                            <div className="text-sm text-[var(--text)] leading-relaxed bg-[var(--surface-dim)] p-4 rounded-xl whitespace-pre-wrap">{selectedCase.labs}</div>
                          )}
                        </div>
                        {selectedCase.imaging && (
                          <div>
                            <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Imaging / Other</h4>
                            <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.imaging} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                          </div>
                        )}
                      </div>
                    </Section>
                  </Card>

                  {/* Management Section */}
                  <Card className="p-6">
                    <Section id="management" title="Assessment & Management" icon={<Stethoscope size={16} />}>
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Diagnosis</h4>
                        <p className="text-base font-bold text-[var(--primary)]">{selectedCase.diagnosis}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Differential Diagnoses</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedCase.ddx.map((d, i) => (
                            <span key={i} className="px-3 py-1 bg-[var(--surface-dim)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)]">{d}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Therapeutic Goals</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.goals || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Drug Therapy Problems</h4>
                          <p className="text-sm text-amber-600 font-medium leading-relaxed bg-amber-500/10 p-3 rounded-xl border border-amber-500/20"><HighlightText text={selectedCase.dtps || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>

                      <div className="bg-[var(--primary-container)]/10 p-5 rounded-2xl border border-[var(--primary)]/20 space-y-4">
                        <h4 className="font-bold text-[var(--primary)] flex items-center gap-2">
                          <Pill size={16} /> Pharmaceutical Care Plan
                        </h4>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Pharmacological Management</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.pharm || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Non-Pharmacological Management</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.nonPharm || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Comprehensive Care Plan</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.carePlan || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Monitoring Parameters</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.monitoring || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Patient Counselling</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.counselling || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>
                    </div>
                    </Section>
                  </Card>

                  {/* Pearls Section */}
                  <Card className="p-6">
                    <Section id="pearls" title="Clinical Pearls & References" icon={<Sparkles size={16} />}>
                      <p className="text-sm text-[var(--text)] leading-relaxed mb-4"><HighlightText text={selectedCase.pearls || ''} medicines={medicines} diseases={diseases} onMedicine={openDrug} onDisease={openDisease} /></p>
                    <div className="border-t border-[var(--border)] pt-4">
                      <h4 className="text-xs font-bold text-[var(--text-muted)] mb-2">References:</h4>
                      <ul className="space-y-1">
                        {selectedCase.references.map((ref, i) => (
                          <li key={i} className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                            <BookOpen size={12} /> {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                    </Section>
                  </Card>
                </div>

                {/* AI Discussion Sidebar */}
                <div className="lg:col-span-1 h-[calc(100vh-160px)] sticky top-6">
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl h-full flex flex-col shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-transparent flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                        <BrainCircuit size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text)]">Case Discussion</h3>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Context-Aware Tutor</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {tutorChat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-sm' 
                              : 'bg-[var(--surface-dim)] border border-[var(--border)] text-[var(--text)] rounded-bl-sm'
                          }`}>
                            <div className={msg.role === 'user' ? 'prose-invert' : ''}><Markdown>{msg.content}</Markdown></div>
                          </div>
                        </div>
                      ))}
                      {isTutorThinking && (
                        <div className="flex justify-start">
                          <div className="bg-[var(--surface-dim)] border border-[var(--border)] rounded-2xl rounded-bl-sm p-4 flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)]/50">
                      <form onSubmit={handleAskTutor} className="flex gap-2">
                        <input
                          type="text"
                          value={tutorMessage}
                          onChange={(e) => setTutorMessage(e.target.value)}
                          placeholder="Ask about this case..."
                          className="flex-1 px-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                        />
                        <button
                          type="submit"
                          disabled={!tutorMessage.trim() || isTutorThinking}
                          className="p-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <Play size={18} className="fill-current" />
                        </button>
                      </form>
                      <p className="text-[9px] text-center text-[var(--text-muted)] mt-2">
                        AI answers are based on guidelines and the specific case context.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
          
          {/* Subsection Detail Modal */}
          {selectedSubsection && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-gradient-to-r from-[var(--primary)]/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-dim)] border border-[var(--border)] flex items-center justify-center">
                      {getDiseaseKnowledgeTree(selectedDisease!).find(node => node.id === selectedSubsection.id)?.icon || <BookOpen className="text-[var(--primary)]" size={18} />}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">{selectedSubsection.category}</span>
                      <h3 className="text-xl font-bold text-[var(--text)] mt-0.5">{selectedSubsection.title}</h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedSubsection(null)}
                    className="p-2 hover:bg-[var(--surface-dim)] rounded-xl transition-colors"
                  >
                    <X size={20} className="text-[var(--text-muted)]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-4 text-[var(--text)] prose prose-sm max-w-none">
                  <div className="markdown-body text-sm leading-relaxed text-[var(--text)]">
                    <Markdown>{selectedSubsection.content}</Markdown>
                  </div>
                </div>

                {/* Footer / CTA Actions */}
                <div className="p-6 border-t border-[var(--border)] bg-[var(--surface-dim)] flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <span className="text-xs text-[var(--text-muted)] italic font-mono">Clinova Curriculum Connection</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedSubsection(null)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
                    >
                      Close
                    </button>
                    {selectedSubsection.cta && selectedSubsection.action && (
                      <button
                        onClick={() => handleSubsectionAction(selectedSubsection.action!)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-xs font-semibold hover:bg-[var(--primary-hover)] transition-all flex items-center gap-1.5 justify-center cursor-pointer shadow-sm"
                      >
                        <span>{selectedSubsection.cta}</span>
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
