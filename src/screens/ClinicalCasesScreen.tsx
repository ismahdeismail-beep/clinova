import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  HeartPulse, Wind, Flame, ShieldAlert, Droplets, Activity, Brain, 
  Pill, Baby, User, AlertTriangle, ChevronRight,
  Search, BookOpen, Stethoscope, ChevronLeft,
  Sparkles,
  FileText,
  Building
} from 'lucide-react';
import { ClinicalCase, SPECIALTIES, ALL_CLINICAL_CASES } from '../data/clinicalCasesData';
import { getIntegratedUnitId } from '../data/curriculum';
import { ClinicalCaseService } from '../services/clinicalCase.service';
import {
  Section, Card, VitalsGrid, LabTable,
  HighlightText, ScrollProgress, COMMON_ADRS,
} from '../components/clinical';
import { parseVitals, parseLabs } from '../lib/clinicalParsers';
import { extractMedicines } from '../lib/clinicalTerms';

export const DISEASE_CONFIG: Record<string, { color: string, sub: string }> = {
  // Cardiovascular
  'Heart Failure': { color: 'rose', sub: 'Pump dysfunction & congestion' },
  'Hypertension': { color: 'rose', sub: 'Elevated systemic vascular resistance' },
  'Atrial Fibrillation': { color: 'rose', sub: 'Irregularly irregular rhythm' },
  'Coronary Artery Disease': { color: 'rose', sub: 'Myocardial ischaemia burden' },
  'Stable Angina': { color: 'rose', sub: 'Exertional chest pain' },
  'Chronic Stable Angina': { color: 'rose', sub: 'Exertional chest pain' },
  'Hyperlipidemia': { color: 'rose', sub: 'Dyslipidaemia management' },
  'Anticoagulation': { color: 'rose', sub: 'Thromboembolic prophylaxis' },
  'Anticoagulation Management': { color: 'rose', sub: 'Thromboembolic prophylaxis' },
  'Acute Coronary Syndrome': { color: 'rose', sub: 'Acute myocardial ischaemia' },
  'Diastolic Disorders': { color: 'rose', sub: 'Impaired ventricular filling' },
  'Venous Thromboembolism': { color: 'rose', sub: 'Clot prevention & treatment' },
  // Respiratory
  'Asthma': { color: 'sky', sub: 'Reversible airway obstruction' },
  'COPD': { color: 'sky', sub: 'Chronic airflow limitation' },
  'Pulmonary Fibrosis': { color: 'sky', sub: 'Restrictive lung disease' },
  'Pulmonary Hypertension': { color: 'sky', sub: 'Elevated pulmonary pressure' },
  'Allergic Rhinitis': { color: 'sky', sub: 'Nasal allergen response' },
  'Cystic Fibrosis': { color: 'sky', sub: 'CFTR channel dysfunction' },
  'Tuberculosis': { color: 'sky', sub: 'Mycobacterial infection' },
  'Acute Bronchitis': { color: 'sky', sub: 'Acute airway inflammation' },
  'Community Acquired Pneumonia': { color: 'sky', sub: 'Lung parenchyma infection' },
  'Hospital Acquired Pneumonia': { color: 'sky', sub: 'Nosocomial lung infection' },
  'Bronchiectasis': { color: 'sky', sub: 'Irreversible airway dilation' },
  // Endocrine
  'Diabetic Emergencies': { color: 'amber', sub: 'Acute metabolic decompensation' },
  'Diabetes Mellitus': { color: 'amber', sub: 'Chronic hyperglycaemia' },
  'Type 1 Diabetes': { color: 'amber', sub: 'Insulin-dependent diabetes' },
  'Type 2 Diabetes': { color: 'amber', sub: 'Insulin resistance diabetes' },
  'Diabetic Ketoacidosis': { color: 'amber', sub: 'Ketone acid accumulation' },
  'Hyperosmolar Hyperglycaemic State': { color: 'amber', sub: 'Severe hyperglycaemia' },
  'Hyperthyroidism': { color: 'amber', sub: 'Excess thyroid hormone' },
  'Hypothyroidism': { color: 'amber', sub: 'Thyroid hormone deficiency' },
  'Cushing Syndrome': { color: 'amber', sub: 'Cortisol excess state' },
  'Addison Disease': { color: 'amber', sub: 'Adrenal insufficiency' },
  'Adrenal Insufficiency': { color: 'amber', sub: 'Cortisol deficiency' },
  'SIADH': { color: 'amber', sub: 'Water retention hyponatraemia' },
  'Diabetes Insipidus': { color: 'amber', sub: 'Water loss polyuria' },
  'Osteoporosis': { color: 'amber', sub: 'Bone density loss' },
  // Renal
  'Acute Kidney Injury': { color: 'teal', sub: 'Rapid renal function decline' },
  'Chronic Kidney Disease': { color: 'teal', sub: 'Progressive renal impairment' },
  'Nephrotic Syndrome': { color: 'teal', sub: 'Protein-losing kidney disease' },
  'Electrolyte Imbalance': { color: 'teal', sub: 'Serum electrolyte disturbance' },
  'Anemia of CKD': { color: 'teal', sub: 'Renal anaemia management' },
  'Hyperkalaemia': { color: 'teal', sub: 'Elevated serum potassium' },
  'CKD-Mineral and Bone Disorder': { color: 'teal', sub: 'Renal bone disease' },
  // Neurological
  'Stroke': { color: 'violet', sub: 'Cerebrovascular ischaemia/bleed' },
  'Epilepsy': { color: 'violet', sub: 'Recurrent seizure disorder' },
  'Parkinson Disease': { color: 'violet', sub: 'Dopamine deficiency disorder' },
  'Dementia': { color: 'violet', sub: 'Cognitive decline syndrome' },
  'Multiple Sclerosis': { color: 'violet', sub: 'Demyelinating CNS disease' },
  'Migraine': { color: 'violet', sub: 'Recurrent headache disorder' },
  'Serotonin Syndrome': { color: 'violet', sub: 'Serotonin excess toxicity' },
  'Neuroleptic Malignant Syndrome': { color: 'violet', sub: 'Dopamine blockade crisis' },
  'Alcohol Withdrawal': { color: 'violet', sub: 'GABA withdrawal syndrome' },
  'Neuropathic Pain': { color: 'violet', sub: 'Nerve injury pain' },
  // GI / Hepatic
  'Cirrhosis': { color: 'emerald', sub: 'End-stage liver disease' },
  'Liver Cirrhosis': { color: 'emerald', sub: 'End-stage liver disease' },
  'Peptic Ulcer Disease': { color: 'emerald', sub: 'Gastric mucosal erosion' },
  'Inflammatory Bowel Disease': { color: 'emerald', sub: 'Chronic gut inflammation' },
  'Hepatitis': { color: 'emerald', sub: 'Liver inflammation' },
  'Pancreatitis': { color: 'emerald', sub: 'Pancreatic inflammation' },
  'Irritable Bowel Syndrome': { color: 'emerald', sub: 'Functional bowel disorder' },
  'Gastroparesis': { color: 'emerald', sub: 'Delayed gastric emptying' },
  'GERD': { color: 'emerald', sub: 'Acid reflux disease' },
  'Helicobacter pylori Infection': { color: 'emerald', sub: 'Gastric bacterial infection' },
  'C. difficile Infection': { color: 'emerald', sub: 'Antibiotic-associated colitis' },
  // Infectious Diseases
  'Childhood Infections': { color: 'red', sub: 'Paediatric infectious diseases' },
  'Bacterial Infections': { color: 'red', sub: 'Bacterial pathogen management' },
  'Sepsis': { color: 'red', sub: 'Life-threatening organ dysfunction' },
  'Meningitis': { color: 'red', sub: 'Meningeal inflammation' },
  'Infective Endocarditis': { color: 'red', sub: 'Valvular infection' },
  'Urinary Tract Infection': { color: 'red', sub: 'Lower/upper UTI management' },
  'HIV/AIDS': { color: 'red', sub: 'Retroviral disease management' },
  'Malaria': { color: 'red', sub: 'Plasmodium parasite infection' },
  'Typhoid Fever': { color: 'red', sub: 'Salmonella enteric fever' },
  'Pharyngitis': { color: 'red', sub: 'Acute throat infection' },
  'Tonsillitis': { color: 'red', sub: 'Tonsillar inflammation' },
  'Sinusitis': { color: 'red', sub: 'Sinus cavity infection' },
  'Otitis Media': { color: 'red', sub: 'Middle ear infection' },
  'Tinea Capitis': { color: 'red', sub: 'Scalp fungal infection' },
  // Oncology / Haematology
  'Solid Tumours': { color: 'indigo', sub: 'Solid organ malignancy' },
  'Cancer': { color: 'indigo', sub: 'Malignant neoplasm' },
  'Breast Cancer': { color: 'indigo', sub: 'Breast malignancy' },
  'Colorectal Cancer': { color: 'indigo', sub: 'Colorectal malignancy' },
  'Prostate Cancer': { color: 'indigo', sub: 'Prostate malignancy' },
  'Cervical Cancer': { color: 'indigo', sub: 'Cervical malignancy' },
  'Anemia': { color: 'indigo', sub: 'Red cell deficiency' },
  'Iron Deficiency Anaemia': { color: 'indigo', sub: 'Iron-deficiency anaemia' },
  'Sickle Cell Disease': { color: 'indigo', sub: 'Haemoglobinopathy crisis' },
  'Hemophilia': { color: 'indigo', sub: 'Clotting factor deficiency' },
  'Thrombocytopenia': { color: 'indigo', sub: 'Low platelet count' },
  'Thrombophilia': { color: 'indigo', sub: 'Hypercoagulable state' },
  'Folate Deficiency': { color: 'indigo', sub: 'Folic acid deficiency' },
  'Vitamin B12 Deficiency': { color: 'indigo', sub: 'B12 deficiency anaemia' },
  'Oncology Support': { color: 'indigo', sub: 'Cancer supportive care' },
  // Rheumatology / Musculoskeletal
  'Gout': { color: 'orange', sub: 'Uric acid crystal arthritis' },
  'Rheumatoid Arthritis': { color: 'orange', sub: 'Autoimmune inflammatory arthritis' },
  'Osteoarthritis': { color: 'orange', sub: 'Degenerative joint disease' },
  'Fibromyalgia': { color: 'orange', sub: 'Central pain sensitisation' },
  'Acute Pain': { color: 'orange', sub: 'Short-term pain management' },
  'Chronic Pain': { color: 'orange', sub: 'Persistent pain management' },
  // Toxicology
  'Chemical Poisoning': { color: 'yellow', sub: 'Toxic chemical exposure' },
  'Organophosphate Poisoning': { color: 'yellow', sub: 'Cholinesterase inhibitor tox' },
  'Drug Overdose': { color: 'yellow', sub: 'Intentional/accidental overdose' },
  'Paracetamol Overdose': { color: 'yellow', sub: 'Acetaminophen toxicity' },
  'Snake Bites': { color: 'yellow', sub: 'Envenomation management' },
  'Snake Envenomation': { color: 'yellow', sub: 'Venom toxin treatment' },
  'Environmental Toxicology': { color: 'yellow', sub: 'Environmental poison exposure' },
  // Pharmacology Concepts
  'Pharmacogenomics': { color: 'slate', sub: 'Gene-guided drug therapy' },
  'Pharmacokinetics': { color: 'slate', sub: 'Drug ADME principles' },
  'Pharmacodynamics': { color: 'slate', sub: 'Drug-receptor interactions' },
  'Dosing in Special Populations': { color: 'slate', sub: 'Renal/hepatic dose adjustment' },
  'Drug-Drug Interaction': { color: 'slate', sub: 'Drug interaction management' },
  'Protein Binding Incompatibility': { color: 'slate', sub: 'Albumin displacement risk' },
  'Teratogenicity': { color: 'slate', sub: 'Drug-induced birth defects' },
  'Therapeutic Duplication': { color: 'slate', sub: 'Redundant drug therapy' },
  'Therapeutic Drug Monitoring': { color: 'slate', sub: 'Serum drug level optimisation' },
  'Adverse Drug Reactions': { color: 'slate', sub: 'Unintended drug effects' },
  'Adverse Drug Reaction': { color: 'slate', sub: 'Unintended drug effects' },
  'Medication Reconciliation': { color: 'slate', sub: 'Medication accuracy check' },
  'Intravenous Safety': { color: 'slate', sub: 'IV administration safety' },
  'Surgical Prophylaxis': { color: 'slate', sub: 'Pre-op infection prevention' },
  'Antimicrobial Stewardship': { color: 'slate', sub: 'Antibiotic optimisation' },
  'Opioid Stewardship': { color: 'slate', sub: 'Safe opioid prescribing' },
  'Polypharmacy Review': { color: 'slate', sub: 'Multiple medication review' },
  'Inborn Error of Metabolism': { color: 'slate', sub: 'Metabolic genetic disorder' },
  // OB / GYN / Paediatric
  'Hypertensive Disorders of Pregnancy': { color: 'pink', sub: 'Gestational hypertension' },
  // Ophthalmology
  'Glaucoma': { color: 'cyan', sub: 'Optic nerve damage' },
  'Open Angle Glaucoma': { color: 'cyan', sub: 'Chronic open-angle glaucoma' },
  'Primary Open-Angle Glaucoma': { color: 'cyan', sub: 'POAG management' },
  'Bacterial Conjunctivitis': { color: 'cyan', sub: 'Ocular surface infection' },
  'Ophthalmic Disorders': { color: 'cyan', sub: 'Eye disease management' },
  // Dermatology
  'Acne': { color: 'green', sub: 'Acne vulgaris management' },
  'Eczema': { color: 'green', sub: 'Atopic dermatitis' },
  'Psoriasis': { color: 'green', sub: 'Plaque psoriasis therapy' },
  // ENT
  'Hearing Disorders': { color: 'amber', sub: 'Hearing loss management' },
  // Emergency / Critical Care
  'Anaphylaxis': { color: 'rose', sub: 'Acute allergic emergency' },
  'Anesthesiology': { color: 'rose', sub: 'Perioperative drug management' },
  'Emergency & Critical Care': { color: 'rose', sub: 'Acute care pharmacology' },
  // Nutrition
  'Malnutrition': { color: 'amber', sub: 'Nutritional deficiency state' },
  'Nutritional Deficiency': { color: 'amber', sub: 'Micronutrient deficiency' },
  'Vitamin A Deficiency': { color: 'amber', sub: 'Vitamin A deficiency' },
  'Vitamin D Deficiency': { color: 'amber', sub: 'Vitamin D deficiency' },
  // Psychiatric
  'Depression': { color: 'pink', sub: 'Major depressive disorder' },
  'Schizophrenia': { color: 'pink', sub: 'Psychotic disorder management' },
}

export const COLOR_MAP: Record<string, { bar: string, text: string }> = {
  rose: { bar: 'bg-rose-500', text: 'text-rose-600' },
  sky: { bar: 'bg-sky-500', text: 'text-sky-600' },
  amber: { bar: 'bg-amber-500', text: 'text-amber-600' },
  teal: { bar: 'bg-teal-500', text: 'text-teal-600' },
  violet: { bar: 'bg-violet-500', text: 'text-violet-600' },
  emerald: { bar: 'bg-emerald-500', text: 'text-emerald-600' },
  red: { bar: 'bg-red-500', text: 'text-red-600' },
  indigo: { bar: 'bg-indigo-500', text: 'text-indigo-600' },
  orange: { bar: 'bg-orange-500', text: 'text-orange-600' },
  yellow: { bar: 'bg-yellow-500', text: 'text-yellow-600' },
  pink: { bar: 'bg-pink-500', text: 'text-pink-600' },
  cyan: { bar: 'bg-cyan-500', text: 'text-cyan-600' },
  green: { bar: 'bg-green-500', text: 'text-green-600' },
  slate: { bar: 'bg-slate-500', text: 'text-slate-600' },
}

export const DEFAULT_DISEASE_CONFIG = { color: 'slate', sub: 'Pharmaceutical care topic' }

export function getDiseaseConfig(disease: string) {
  const cfg = DISEASE_CONFIG[disease] ?? DISEASE_CONFIG[disease.replace(/^./, c => c.toUpperCase())] ?? DEFAULT_DISEASE_CONFIG
  const colors = COLOR_MAP[cfg.color] ?? COLOR_MAP.slate
  return { ...cfg, ...colors }
}

export default function ClinicalCasesScreen() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCases, setAllCases] = useState<ClinicalCase[]>(ALL_CLINICAL_CASES);
  const [searchParams] = useSearchParams();

  /** Convert full names in demographics to initials and ensure privacy */
  const anonymizeDemographics = (d: string, patientName?: string): string => {
    const raw = patientName || d || '';
    if (!raw) return '—';
    const match = raw.match(/^([A-Z][a-zà-ü]+(?:\s+[A-Z][a-zà-ü]+)+),\s*(.*)$/);
    if (match) {
      const initials = match[1].split(/\s+/).map(n => n[0] + '.').join(' ');
      return `${initials}, ${match[2]}`;
    }
    // If no leading name comma, try replacing any full name words at start
    const clean = raw.replace(/^[A-Z][a-zà-ü]+\s+[A-Z][a-zà-ü]+/, (name) => {
      return name.split(/\s+/).map(n => n[0] + '.').join(' ');
    });
    return clean;
  };

  useEffect(() => {
    const loadCases = async () => {
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
      }
    };

    loadCases();
  }, []);

  // Sync URL searchParams ↔ drill-down state so browser back/forward works correctly.
  // The URL (?specialty=…&disease=…&caseId=…) is the single source of truth.
  useEffect(() => {
    const specialtyParam = searchParams.get('specialty');
    const diseaseParam = searchParams.get('disease');
    const caseIdParam = searchParams.get('caseId');

    if (caseIdParam && allCases.length > 0) {
      const match = allCases.find((c) => c.id === caseIdParam || c.seedId === caseIdParam);
      if (match) {
        const unit = SPECIALTIES.find((s) => matchesUnit(match, s));
        setSelectedSpecialty(specialtyParam || unit || null);
        setSelectedDisease(diseaseParam || match.disease || null);
        setSelectedCase(match);
        return;
      }
    }

    // No case — clear it
    setSelectedCase(null);

    if (diseaseParam) {
      setSelectedDisease(diseaseParam);
      setSelectedSpecialty(specialtyParam);
      return;
    }

    if (specialtyParam) {
      setSelectedSpecialty(specialtyParam);
      setSelectedDisease(null);
      return;
    }

    // No params → back to root
    setSelectedSpecialty(null);
    setSelectedDisease(null);
  }, [searchParams, allCases]);

  const handleSpecialtyClick = (specialty: string) => {
    navigate(`/cases?specialty=${encodeURIComponent(specialty)}`);
  };

  const handleDiseaseClick = (disease: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('disease', disease);
    params.delete('caseId');
    navigate(`/cases?${params.toString()}`);
  };

  const handleCaseClick = (clinicalCase: ClinicalCase) => {
    const unit = SPECIALTIES.find((s) => matchesUnit(clinicalCase, s));
    const params = new URLSearchParams();
    if (unit) params.set('specialty', unit);
    params.set('disease', clinicalCase.disease);
    params.set('caseId', clinicalCase.id);
    navigate(`/cases?${params.toString()}`);
  };

  const handleBackToSpecialties = () => {
    navigate('/cases');
  };

  const handleBackToDiseases = () => {
    const params = new URLSearchParams();
    const specialty = searchParams.get('specialty');
    if (specialty) params.set('specialty', specialty);
    navigate(`/cases?${params.toString()}`);
  };

  const handleBackToCases = () => {
    const params = new URLSearchParams();
    const specialty = searchParams.get('specialty');
    const disease = searchParams.get('disease');
    if (specialty) params.set('specialty', specialty);
    if (disease) params.set('disease', disease);
    navigate(`/cases?${params.toString()}`);
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


  const caseText = selectedCase
    ? [selectedCase.hpi, selectedCase.pe, selectedCase.pharm, selectedCase.nonPharm, selectedCase.carePlan, selectedCase.dtps, selectedCase.monitoring, selectedCase.counselling, selectedCase.goals, selectedCase.diagnosis].join(' ')
    : '';
  const medicines = extractMedicines(caseText);
  const diseases = selectedCase ? [selectedCase.disease] : [];
  const vitals = selectedCase ? parseVitals(selectedCase.vitals) : null;
  const labs = selectedCase ? parseLabs(selectedCase.labs) : null;
  const openDrug = (name: string) => navigate(`/drugs?q=${encodeURIComponent(name)}`);
  const openDisease = (name: string) => navigate(`/knowledge?disease=${encodeURIComponent(name)}`);

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Header Section — hidden when drilling into a specialty */}
        {!selectedSpecialty && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Stethoscope size={16} /> Clinical Cases
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Clinical Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Studies</span>
            </h1>
          </div>
        </div>
        )}

        {/* Breadcrumb Navigation — only shown when drilled into a specialty */}
        {selectedSpecialty && (
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] overflow-x-auto pb-2 whitespace-nowrap">
          <button onClick={() => navigate('/')} className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">Home</button>
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
        )}

        {/* Content Area */}
        <div className="pb-24">
          
          {/* Level 1: Specialties */}
          {!selectedSpecialty && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text)]">Clinical Cases</h2>
                </div>
                <div className="text-sm text-[var(--text-muted)] font-medium">
                  {allCases.length} cases
                </div>
              </div>

              {/* Simulation Notice — first page only, before drilling into specialty groups */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3">
                <ShieldAlert size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  <strong className="text-[var(--text)]">Simulation Notice:</strong> All clinical cases below are generated by the Clinova Clinical Team for educational purposes. Patient identities are anonymized. These do not represent real hospital data or actual patient records.
                </p>
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
                  const cfg = getDiseaseConfig(disease);
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleDiseaseClick(disease)}
                      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl cursor-pointer transition-all shadow-sm hover:shadow-md group flex overflow-hidden"
                    >
                      <div className={`w-1.5 shrink-0 ${cfg.bar}`} />
                      <div className="flex-1 p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{disease}</h3>
                          <p className={`text-[11px] font-medium mt-0.5 ${cfg.text}`}>{cfg.sub}</p>
                          <p className="text-[10px] text-[var(--text-muted)] mt-1">{casesCount} {casesCount === 1 ? 'case' : 'cases'}</p>
                        </div>
                        <ChevronRight size={16} className="shrink-0 text-[var(--border)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

{/* Level 3: Cases */}
              {selectedSpecialty && selectedDisease && !selectedCase && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={handleBackToDiseases} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                      <ChevronLeft size={18} className="text-[var(--text)]" />
                    </button>
                    <h2 className="text-2xl font-bold text-[var(--text)]">
                      {selectedDisease}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {casesForSelectedDisease.map((clinicalCase, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleCaseClick(clinicalCase)}
                        className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0 text-[var(--primary)]">
                            <FileText size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-base mb-1">
                              {clinicalCase.title}
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">
                              {clinicalCase.chiefComplaint}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs">
                              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                                <User size={12} /> {anonymizeDemographics(clinicalCase.demographics)}
                              </span>
                              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                                <Building size={12} /> {clinicalCase.facilitySetting}
                              </span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                clinicalCase.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600' :
                                clinicalCase.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600' :
                                'bg-rose-500/10 text-rose-600'
                              }`}>
                                {clinicalCase.difficulty}
                              </span>
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-[var(--border)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </div>
                    ))}
                    {casesForSelectedDisease.length === 0 && (
                      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText size={32} className="text-[var(--text-muted)]" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text)]">No Cases Available Yet</h3>
                        <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
                          Teaching cases for {selectedDisease} are being compiled.
                        </p>
                      </div>
                    )}
                  </div>
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
                </div>
              </div>

               <ScrollProgress />
              <div className="space-y-5">
                {/* Presentation Section */}
                <Card className="p-4">
                  <Section id="presentation" title="Clinical Presentation" icon={<User size={16} />}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Age/Sex</h4>
                        <p className="text-sm text-[var(--text)]">{anonymizeDemographics(selectedCase.demographics)}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Facility</h4>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedCase.facilitySetting}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Setting</h4>
                        <p className="text-sm text-[var(--text)]">{selectedCase.facilitySetting === 'Tertiary Hospital' ? 'Inpatient' : selectedCase.facilitySetting || '—'}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Chief Complaint</h4>
                        <p className="text-sm text-[var(--text)] font-medium">"{selectedCase.chiefComplaint}"</p>
                      </div>
                    </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">History of Presenting Illness</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.hpi || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Past Medical History</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.pmh || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Medication History</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.medHx || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Allergies</h4>
                          <p className="text-sm text-[var(--danger)] font-medium">{selectedCase.allergies}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Physical Examination</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.pe || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Vital Signs</h4>
                        {vitals ? <VitalsGrid vitals={vitals} /> : <p className="text-sm text-[var(--text-muted)]">{selectedCase.vitals}</p>}
                      </div>
                    </Section>
                  </Card>

                  {/* Investigations Section */}
                  <Card className="p-4">
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
                            <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.imaging} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                          </div>
                        )}
                      </div>
                    </Section>
                  </Card>

                  {/* Management Section */}
                  <Card className="p-4">
                    <Section id="management" title="Assessment & Management" icon={<Stethoscope size={16} />}>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Diagnosis</h4>
                        <p className="text-base font-bold text-[var(--primary)]">{selectedCase.diagnosis}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Differential Diagnoses</h4>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedCase.ddx.map((d, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded text-xs text-[var(--text)]">{d}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Therapeutic Goals</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.goals || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Drug Therapy Problems</h4>
                          <p className="text-sm text-amber-600 font-medium leading-relaxed bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20"><HighlightText text={selectedCase.dtps || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>

                      <div className="bg-[var(--primary-container)]/10 p-4 rounded-2xl border border-[var(--primary)]/20 space-y-3">
                        <h4 className="font-bold text-[var(--primary)] flex items-center gap-2">
                          <Pill size={14} /> Pharmaceutical Care Plan
                        </h4>
                        <div>
                          <h5 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Pharmacological Management</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.pharm || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Non-Pharmacological Management</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.nonPharm || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Comprehensive Care Plan</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.carePlan || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Monitoring Parameters</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.monitoring || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-0.5">Patient Counselling</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed"><HighlightText text={selectedCase.counselling || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                        </div>
                      </div>
                    </div>
                    </Section>
                  </Card>

                  {/* Pearls Section */}
                  <Card className="p-4">
                    <Section id="pearls" title="Clinical Pearls & References" icon={<Sparkles size={16} />}>
                      <p className="text-sm text-[var(--text)] leading-relaxed mb-3"><HighlightText text={selectedCase.pearls || ''} medicines={medicines} diseases={diseases} adrs={COMMON_ADRS} onMedicine={openDrug} onDisease={openDisease} /></p>
                    <div className="border-t border-[var(--border)] pt-3">
                      <h4 className="text-[10px] font-bold text-[var(--text-muted)] mb-1.5">References</h4>
                      <ul className="space-y-1">
                        {selectedCase.references.map((ref, i) => (
                          <li key={i} className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                            <BookOpen size={10} /> {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                    </Section>
                  </Card>

                </div>
              </div>
          )}

        </div>
      </div>
    </div>
  );
}
