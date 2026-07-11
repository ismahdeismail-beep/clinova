import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Stethoscope, Activity, ClipboardList, Beaker, FileText, Pill, HeartPulse, CheckCircle, BrainCircuit, AlertTriangle,
  Send, Loader2, Sparkles, X, Upload, FileUp, Download
} from 'lucide-react';
import { useFileStore } from '../store/fileStore';
import { getPatientInitials } from '../lib/patientUtils';
import jsPDF from 'jspdf';

// Mock interaction database
const KNOWN_INTERACTIONS: Record<string, string[]> = {
  'warfarin': ['amiodarone', 'aspirin', 'ibuprofen'],
  'amiodarone': ['warfarin', 'simvastatin'],
  'aspirin': ['warfarin', 'ibuprofen'],
  'ibuprofen': ['warfarin', 'aspirin'],
  'simvastatin': ['amiodarone', 'amlodipine'],
  'amlodipine': ['simvastatin'],
  'ceftriaxone': ['calcium'],
};

const SAMPLE_PATIENT_DATA = {
  patientName: "J. K. C.",
  age: 64,
  sex: "male",
  weight: "74",
  height: "168",
  ipNumber: "IP-998342",
  ward: "Medical Ward A",
  bed: "Bed 12",
  residence: "Nakuru, Kenya",
  dateOfAdmission: "2026-07-01",
  dateOfHistoryTaking: "2026-07-02",
  chiefComplaint: "3-day history of high-grade fever, chills, and productive cough with rust-colored sputum.",
  hpi: "64-year-old male presenting with acute onset of severe chills, followed by fever, pleuritic chest pain on the right side, and shortness of breath. Sputum is thick and rust-colored. Self-medicated with over-the-counter paracetamol with minimal relief.",
  pastMedicalHistory: "Type 2 Diabetes Mellitus (diagnosed 8 years ago), Hypertension (diagnosed 12 years ago), Chronic Kidney Disease Stage 3a.",
  currentMedications: "Metformin 1000mg BD, Enalapril 10mg BD, Atorvastatin 20mg OD.",
  allergies: "Sulfa drugs (causes severe maculopapular rash)",
  familyHistory: "Father died of stroke at age 68. Mother has Type 2 Diabetes.",
  socialHistory: "Retired primary school teacher. Non-smoker, occasional social drinker. Lives with spouse.",
  systems: {
    "General Health": "Ill-looking, febrile (38.9°C), mild distress",
    "CNS": "Alert, cooperative, oriented to person, place, and time. No focal neurological deficits.",
    "CVS": "S1 S2 heard, tachycardia (HR 104 bpm), BP 142/88 mmHg. No murmurs.",
    "Respiratory System": "Tachypnea (RR 24 breaths/min), decreased chest expansion on the right side. Dull percussion note, bronchial breath sounds, and fine crackles over the right middle and lower lung zones. SpO2 91% on room air.",
    "Gastrointestinal System": "Abdomen soft, non-tender, bowel sounds active. No organomegaly.",
    "Genitourinary System": "Urination normal, no dysuria or hematuria. Normal bladder control.",
    "Musculoskeletal System": "Mild general body weakness, joint pain secondary to fever. No joint swelling.",
    "Skin & Integumentary System": "Warm, dry, no active rashes or cyanosis. Skin turgor normal."
  },
  vitals_labs: {
    "hr": "104",
    "bp": "142/88",
    "temp": "38.9",
    "po2": "91",
    "rr": "24",
    "bmi": "26.2",
    "na": "136",
    "k": "4.8",
    "cl": "101",
    "urea": "11.2",
    "creat": "145",
    "crcl": "42",
    "ast": "28",
    "alt": "24",
    "alp": "75",
    "t_bili": "12",
    "d_bili": "4",
    "albumin": "38",
    "wbc": "16.4",
    "neut": "82",
    "lymph": "12",
    "hb": "11.8",
    "plts": "280",
    "cxr": "Right lower lobe consolidation consistent with lobar pneumonia",
    "ecg": "Sinus tachycardia, no ischemic changes",
    "urinalysis": "Protein 1+, Glucose 1+, Leucocytes negative, Nitrites negative"
  },
  diagnosis: "1. Community-Acquired Pneumonia (CAP) - Severe\n2. Type 2 Diabetes Mellitus - Poorly controlled (HbA1c 8.2%)\n3. Hypertension\n4. Stage 3a Chronic Kidney Disease (CKD)",
  pharmacological_treatments: [
    {
      "drug": "Ceftriaxone",
      "form": "IV Injection",
      "dose": "2g",
      "frequency": "OD",
      "start_date": "2026-07-01",
      "duration": "7 days"
    },
    {
      "drug": "Azithromycin",
      "form": "Tablet",
      "dose": "500mg",
      "frequency": "OD",
      "start_date": "2026-07-01",
      "duration": "5 days"
    },
    {
      "drug": "Insulin Soluble (Actrapid)",
      "form": "SC Injection",
      "dose": "Sliding scale",
      "frequency": "TDS (pre-meals)",
      "start_date": "2026-07-01",
      "duration": "During acute illness"
    },
    {
      "drug": "Enalapril",
      "form": "Tablet",
      "dose": "5mg",
      "frequency": "BD",
      "start_date": "2026-07-01",
      "duration": "Ongoing"
    },
    {
      "drug": "Paracetamol",
      "form": "Tablet",
      "dose": "1g",
      "frequency": "PRN (max QDS)",
      "start_date": "2026-07-01",
      "duration": "As needed for fever"
    }
  ],
  non_pharmacological_management: "Humidified oxygen therapy at 3L/min via nasal prongs to maintain SpO2 > 94%. Strict fluid intake/output monitoring. Chest physiotherapy.",
  "care_plans": [
    {
      "condition": "Community-Acquired Pneumonia",
      "problem": "Severe bacterial lung infection requiring double antibiotic therapy.",
      "goal": "Eradicate infection, resolve respiratory symptoms, normalize temperature and WBC.",
      "intervention": "Administer Ceftriaxone 2g IV OD and Azithromycin 500mg PO OD. Monitor respiratory rate, chest signs, and SpO2.",
      "follow_up": "Check vitals every 4 hours; repeat WBC in 48 hours."
    },
    {
      "condition": "Diabetes Mellitus & Acute Illness",
      "problem": "Poor glycemic control exacerbated by acute infection; Metformin contraindicated in severe acute renal impairment (CrCl 42 ml/min) and hypoxemic conditions.",
      "goal": "Maintain blood glucose levels between 6.0 - 10.0 mmol/L; avoid hypoglycemia and lactic acidosis risk.",
      "intervention": "Temporarily hold Metformin. Initiate soluble insulin sliding scale. Monitor finger-prick blood glucose pre-meals and at bedtime.",
      "follow_up": "Check capillary blood glucose (CBG) QID."
    },
    {
      "condition": "Hypertension & Stage 3a CKD",
      "problem": "Enalapril dose adjustment: ACE inhibitors can cause acute-on-chronic kidney injury during acute infection/dehydration. BP is elevated (142/88).",
      "goal": "Optimize BP control (target < 130/80 mmHg in CKD) while preventing acute renal deterioration.",
      "intervention": "Continue Enalapril at reduced dose (5mg BD instead of 10mg BD) with close renal function monitoring. Ensure adequate hydration.",
      "follow_up": "Repeat serum creatinine and potassium in 48 hours."
    }
  ],
  care_plan_non_pharma: "Promote airway clearance through deep breathing exercises and productive coughing techniques. Bed rest with head-of-bed elevated to 30-45 degrees.",
  care_plan_monitoring: "Check serum creatinine, potassium, and blood glucose daily. Monitor SpO2 and lung auscultation findings twice daily.",
  counselling_points: "1. Explain the diagnosis of severe pneumonia and why insulin is temporarily replacing metformin during the hospital stay.\n2. Advise on the importance of completing the full course of antibiotics.\n3. Instruct the patient to report any chest pain, increasing shortness of breath, or cold sweats/tremors (hypoglycemia symptoms) immediately.\n4. Educate on avoiding over-the-counter NSAIDs (like ibuprofen) due to kidney stage."
};

const INTERACTION_MESSAGES: Record<string, string> = {
  'warfarin-amiodarone': 'High Risk: Amiodarone increases Warfarin toxicity and bleeding risk.',
  'warfarin-aspirin': 'High Risk: Increased risk of bleeding when Warfarin is used with Aspirin.',
  'warfarin-ibuprofen': 'High Risk: Increased risk of bleeding when Warfarin is used with NSAIDs.',
  'aspirin-ibuprofen': 'Moderate Risk: Increased risk of gastrointestinal toxicity.',
  'simvastatin-amiodarone': 'High Risk: Increased risk of myopathy/rhabdomyolysis.',
  'simvastatin-amlodipine': 'Moderate Risk: Increased risk of myopathy/rhabdomyolysis. Dose limit recommended.',
  'ceftriaxone-calcium': 'Severe Risk: Potential for precipitation in lungs and kidneys (especially in neonates).'
};

export default function PharmacotherapyReviewScreen() {
  const [activeTab, setActiveTab] = useState<string>('admission');
  const formRef = useRef<HTMLFormElement>(null);
  const [interactions, setInteractions] = useState<{ id: string, message: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(Array.from(e.target.files));
    }
  };

  const updateFormFromExtraction = (extractedData: any) => {
    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};

      // Map to 'admission' tab
      if (!parsed['admission']) parsed['admission'] = {};
      if (extractedData.patientName) {
        parsed['admission']['patient_name'] = getPatientInitials(extractedData.patientName);
      }
      if (extractedData.age) {
        parsed['admission']['patient_age'] = String(extractedData.age);
      }
      if (extractedData.sex) {
        parsed['admission']['patient_sex'] = String(extractedData.sex).toLowerCase();
      }
      if (extractedData.weight) {
        parsed['admission']['patient_weight'] = String(extractedData.weight);
      }
      if (extractedData.height) {
        parsed['admission']['patient_height'] = String(extractedData.height);
      }
      if (extractedData.ipNumber) {
        parsed['admission']['patient_ip'] = String(extractedData.ipNumber);
      }
      if (extractedData.ward) {
        parsed['admission']['patient_ward'] = String(extractedData.ward);
      }
      if (extractedData.bed) {
        parsed['admission']['patient_bed'] = String(extractedData.bed);
      }
      if (extractedData.residence) {
        parsed['admission']['patient_residence'] = String(extractedData.residence);
      }
      if (extractedData.dateOfAdmission) {
        parsed['admission']['patient_adm_date'] = String(extractedData.dateOfAdmission);
      }
      if (extractedData.dateOfHistoryTaking) {
        parsed['admission']['patient_hist_date'] = String(extractedData.dateOfHistoryTaking);
      }

      // Map to 'history' tab
      if (!parsed['history']) parsed['history'] = {};
      if (extractedData.chiefComplaint) {
        parsed['history']['chief_complaint'] = extractedData.chiefComplaint;
      }
      if (extractedData.hpi) {
        parsed['history']['hpi'] = extractedData.hpi;
      }
      if (extractedData.pastMedicalHistory) {
        parsed['history']['pmh'] = extractedData.pastMedicalHistory;
      }
      if (extractedData.currentMedications) {
        parsed['history']['history_meds'] = extractedData.currentMedications;
      }
      if (extractedData.allergies) {
        parsed['history']['history_allergies'] = extractedData.allergies;
      }
      if (extractedData.familyHistory) {
        parsed['history']['family_history'] = extractedData.familyHistory;
      }
      if (extractedData.socialHistory) {
        parsed['history']['social_history'] = extractedData.socialHistory;
      }

      // Map to 'systems' tab
      if (!parsed['systems']) parsed['systems'] = {};
      if (extractedData.systems) {
        Object.keys(extractedData.systems).forEach(key => {
          parsed['systems'][key] = extractedData.systems[key];
        });
      }

      // Map to 'vitals-labs' tab
      if (!parsed['vitals-labs']) parsed['vitals-labs'] = {};
      if (extractedData.vitals_labs) {
        Object.keys(extractedData.vitals_labs).forEach(key => {
          parsed['vitals-labs'][key] = extractedData.vitals_labs[key];
        });
      }

      // Map to 'diagnosis' tab
      if (!parsed['diagnosis']) parsed['diagnosis'] = {};
      if (extractedData.diagnosis) {
        parsed['diagnosis']['diagnoses_list'] = extractedData.diagnosis;
      }

      // Map to 'treatment' tab
      if (!parsed['treatment']) parsed['treatment'] = {};
      if (extractedData.pharmacological_treatments && Array.isArray(extractedData.pharmacological_treatments)) {
        extractedData.pharmacological_treatments.forEach((tx: any, index: number) => {
          const row = index + 1;
          if (row <= 5) {
            parsed['treatment'][`treatment_drug_${row}`] = tx.drug || '';
            parsed['treatment'][`treatment_form_${row}`] = tx.form || '';
            parsed['treatment'][`treatment_dose_${row}`] = tx.dose || '';
            parsed['treatment'][`treatment_freq_${row}`] = tx.frequency || '';
            parsed['treatment'][`treatment_start_${row}`] = tx.start_date || '';
            parsed['treatment'][`treatment_dur_${row}`] = tx.duration || '';
          }
        });
      }
      if (extractedData.non_pharmacological_management) {
        parsed['treatment']['treatment_non_pharma'] = extractedData.non_pharmacological_management;
      }

      // Map to 'care-plan' tab
      if (!parsed['care-plan']) parsed['care-plan'] = {};
      if (extractedData.care_plans && Array.isArray(extractedData.care_plans)) {
        extractedData.care_plans.forEach((cp: any, index: number) => {
          const row = index + 1;
          if (row <= 3) {
            parsed['care-plan'][`care_plan_cond_${row}`] = cp.condition || '';
            parsed['care-plan'][`care_plan_problem_${row}`] = cp.problem || '';
            parsed['care-plan'][`care_plan_goal_${row}`] = cp.goal || '';
            parsed['care-plan'][`care_plan_intervention_${row}`] = cp.intervention || '';
            parsed['care-plan'][`care_plan_followup_${row}`] = cp.follow_up || '';
          }
        });
      }
      if (extractedData.care_plan_non_pharma) {
        parsed['care-plan']['care_plan_non_pharma'] = extractedData.care_plan_non_pharma;
      }
      if (extractedData.care_plan_monitoring) {
        parsed['care-plan']['care_plan_monitoring'] = extractedData.care_plan_monitoring;
      }

      // Map to 'counselling' tab
      if (!parsed['counselling']) parsed['counselling'] = {};
      if (extractedData.counselling_points) {
        parsed['counselling']['counselling_points'] = extractedData.counselling_points;
      }

      // Save back to localStorage
      localStorage.setItem('clinova_pharma_review_form', JSON.stringify(parsed));
      window.dispatchEvent(new Event('clinova-storage-synced'));

      // Force values into currently mounted DOM fields of active tab
      if (formRef.current) {
        const elements = formRef.current.elements;
        const currentTabData = parsed[activeTab] || {};
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
          if (el.tagName === 'BUTTON') continue;
          const key = el.name || el.id || `input_${i}`;
          if (currentTabData[key] !== undefined) {
            el.value = currentTabData[key];
          }
        }
      }
      
      // Trigger interaction check based on updated medications
      const allData: Record<string, string> = {};
      Object.values(parsed).forEach((tab: any) => Object.assign(allData, tab));
      checkInteractions(allData);

      setBannerMessage({
        type: 'success',
        text: 'AI successfully extracted patient details, medical history, systemic review, vitals, labs, medications, diagnosis, and care plans. Form fields populated across all sections!'
      });
    } catch (err) {
      console.error('Error populating form from extraction:', err);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setIsGenerating(true);
    setBannerMessage(null);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('extractionType', 'pharmacotherapy');
      
      const res = await fetch('/api/gemini/extract-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to extract clinical data from files.');
      }
      const data = await res.json();
      
      updateFormFromExtraction(data);
    } catch (err: any) {
      setBannerMessage({ type: 'error', text: err.message || 'Failed to extract clinical data' });
    } finally {
      setIsGenerating(false);
    }
  };

  // AI State Variables
  const [isGenerating, setIsGenerating] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [safetyVerification, setSafetyVerification] = useState<{
    is_grounded_in_case: boolean;
    renal_adjustment_checked: boolean;
    safety_flags_identified: string[];
    clinical_evidence_sources: string[];
  } | null>(null);

  useEffect(() => {
    const savedVerification = localStorage.getItem('clinova_pharma_safety_verification');
    if (savedVerification) {
      try {
        setSafetyVerification(JSON.parse(savedVerification));
      } catch (e) {
        console.error('Failed to parse safety verification data', e);
      }
    }
  }, []);

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string, timestamp: Date, isNew?: boolean }[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your Clinova AI Assistant. Ask me any clinical questions regarding the Kenya Drug Index (KDI), medical guidelines, drug-drug interactions, or dose adjustments for this patient.',
      timestamp: new Date()
    }
  ]);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);

  const [autofillTreatment, setAutofillTreatment] = useState(true);
  const [autofillCarePlan, setAutofillCarePlan] = useState(true);
  const [autofillCounselling, setAutofillCounselling] = useState(true);

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePrevTab = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const triggerAutofill = async () => {
    if (!autofillTreatment && !autofillCarePlan && !autofillCounselling) {
      setBannerMessage({
        type: 'error',
        text: 'Please select at least one section to auto-fill in the settings panel above.'
      });
      return;
    }

    setIsGenerating(true);
    setBannerMessage(null);
    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};
      
      // Gather files from fileStore
      const files = useFileStore.getState().files || [];
      const filesContext = files.map(f => ({ name: f.originalName, category: f.category }));

      const res = await fetch('/api/gemini/autofill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: parsed,
          filesContext: filesContext,
          options: {
            treatment: autofillTreatment,
            carePlan: autofillCarePlan,
            counselling: autofillCounselling
          }
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server returned an error');
      }

      const data = await res.json();

      // Update treatment tab
      const treatmentTab: Record<string, string> = {};
      if (data.pharmacological_treatments && Array.isArray(data.pharmacological_treatments)) {
        data.pharmacological_treatments.forEach((tx: any, index: number) => {
          const row = index + 1;
          treatmentTab[`treatment_drug_${row}`] = tx.drug || '';
          treatmentTab[`treatment_form_${row}`] = tx.form || '';
          treatmentTab[`treatment_dose_${row}`] = tx.dose || '';
          treatmentTab[`treatment_freq_${row}`] = tx.frequency || '';
          treatmentTab[`treatment_start_${row}`] = tx.start_date || '';
          treatmentTab[`treatment_dur_${row}`] = tx.duration || '';
        });
      }
      treatmentTab['treatment_non_pharma'] = data.non_pharmacological_management || '';

      // Update care plan tab
      const carePlanTab: Record<string, string> = {};
      if (data.care_plans && Array.isArray(data.care_plans)) {
        data.care_plans.forEach((cp: any, index: number) => {
          const row = index + 1;
          carePlanTab[`care_plan_cond_${row}`] = cp.condition || '';
          carePlanTab[`care_plan_problem_${row}`] = cp.problem || '';
          carePlanTab[`care_plan_goal_${row}`] = cp.goal || '';
          carePlanTab[`care_plan_intervention_${row}`] = cp.intervention || '';
          carePlanTab[`care_plan_followup_${row}`] = cp.follow_up || '';
        });
      }
      carePlanTab['care_plan_non_pharma'] = data.care_plan_non_pharma || '';
      carePlanTab['care_plan_monitoring'] = data.care_plan_monitoring || '';

      // Update counselling tab
      const counsellingTab: Record<string, string> = {};
      counsellingTab['counselling_points'] = data.counselling_points || '';

      // Persist to localStorage based on options
      if (autofillTreatment) {
        parsed['treatment'] = { ...(parsed['treatment'] || {}), ...treatmentTab };
      }
      if (autofillCarePlan) {
        parsed['care-plan'] = { ...(parsed['care-plan'] || {}), ...carePlanTab };
      }
      if (autofillCounselling) {
        parsed['counselling'] = { ...(parsed['counselling'] || {}), ...counsellingTab };
      }

      localStorage.setItem('clinova_pharma_review_form', JSON.stringify(parsed));

      // If active tab is one of these, update mounted DOM fields immediately
      if (formRef.current) {
        const elements = formRef.current.elements;
        const currentTabData = parsed[activeTab] || {};
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
          if (el.tagName === 'BUTTON') continue;
          const key = el.name || el.id || `input_${i}`;
          if (currentTabData[key] !== undefined) {
            el.value = currentTabData[key];
          }
        }
      }

      // Merge and run interaction check
      const allData: Record<string, string> = {};
      Object.values(parsed).forEach(tab => Object.assign(allData, tab));
      checkInteractions(allData);

      if (data.safety_verification) {
        setSafetyVerification(data.safety_verification);
        localStorage.setItem('clinova_pharma_safety_verification', JSON.stringify(data.safety_verification));
      } else {
        setSafetyVerification(null);
        localStorage.removeItem('clinova_pharma_safety_verification');
      }

      const filledSections = [];
      if (autofillTreatment) filledSections.push('pharmacological treatments');
      if (autofillCarePlan) filledSections.push('care plan interventions');
      if (autofillCounselling) filledSections.push('patient counselling points');

      setBannerMessage({
        type: 'success',
        text: `Clinova AI has successfully analyzed patient demographics, vitals, labs, diagnoses, and uploaded notes to auto-fill the selected sections: ${filledSections.join(', ')}.`,
      });
    } catch (error: any) {
      console.error(error);
      setBannerMessage({
        type: 'error',
        text: `Failed to auto-fill form: ${error.message || 'Please check your network or try again.'}`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sendAssistantMessage = async () => {
    if (!assistantMessage.trim() || isAssistantThinking) return;
    const userPrompt = assistantMessage;
    setAssistantMessage('');
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: userPrompt, timestamp: new Date() }
    ];
    setChatMessages(newMessages);
    setIsAssistantThinking(true);

    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};

      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userMessage: userPrompt,
          chatHistory: newMessages.slice(1, -1),
          currentFormState: parsed
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Assistant failed to respond');
      }

      const data = await res.json();
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text, timestamp: new Date(), isNew: true }
      ]);
    } catch (error: any) {
      console.error(error);
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Sorry, I encountered an error: ${error.message || 'communicating with the clinical assistant. Please try again.'}`, timestamp: new Date(), isNew: true }
      ]);
    } finally {
      setIsAssistantThinking(false);
    }
  };

  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkInteractions = (tabData: Record<string, string>) => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(async () => {
      // 1. Extract all pharmacological treatments
      const treatmentDrugs: { name: string, dose?: string, frequency?: string, route?: string }[] = [];
      for (let i = 1; i <= 5; i++) {
        const drug = (tabData[`treatment_drug_${i}`] || '').trim();
        if (drug) {
          treatmentDrugs.push({
            name: drug,
            dose: (tabData[`treatment_dose_${i}`] || '').trim(),
            frequency: (tabData[`treatment_freq_${i}`] || '').trim(),
            route: (tabData[`treatment_form_${i}`] || '').trim(),
          });
        }
      }

      // 2. Extract history meds
      const historyMedsRaw = (tabData['history_meds'] || '').trim();
      if (historyMedsRaw) {
        const splitMeds = historyMedsRaw.split(/[,\n;]+/).map(m => m.trim()).filter(Boolean);
        splitMeds.forEach(med => {
          if (!treatmentDrugs.some(d => d.name.toLowerCase() === med.toLowerCase())) {
            treatmentDrugs.push({
              name: med,
              dose: 'Prescribed historically'
            });
          }
        });
      }

      if (treatmentDrugs.length === 0) {
        setInteractions([]);
        return;
      }

      // 3. Construct patient context from tabData
      const patientContext = {
        name: tabData['patient_name'] || 'Anonymous',
        age: tabData['patient_age'] || 'Unknown',
        sex: tabData['patient_sex'] || 'Unknown',
        ward: tabData['patient_ward'] || 'General Ward',
        vitals: {
          bp: tabData['bp'] || 'N/A',
          hr: tabData['hr'] || 'N/A',
          temp: tabData['temp'] || 'N/A',
          spo2: tabData['po2'] || 'N/A',
          rr: tabData['rr'] || 'N/A',
        },
        labs: [
          { name: 'Creatinine', value: tabData['creat'] || 'N/A', unit: 'umol/L', status: 'Recent', referenceRange: '45-104' },
          { name: 'Urea', value: tabData['urea'] || 'N/A', unit: 'mmol/L', status: 'Recent', referenceRange: '2.5-6.5' },
          { name: 'Potassium (K+)', value: tabData['k'] || 'N/A', unit: 'mmol/L', status: 'Recent', referenceRange: '3.2-5' },
          { name: 'Sodium (Na+)', value: tabData['na'] || 'N/A', unit: 'mmol/L', status: 'Recent', referenceRange: '135-145' },
          { name: 'Hemoglobin (Hb)', value: tabData['hb'] || 'N/A', unit: 'g/dL', status: 'Recent', referenceRange: '9.5-13' },
          { name: 'White Blood Cells (WBC)', value: tabData['wbc'] || 'N/A', unit: 'x10^9/L', status: 'Recent', referenceRange: '4.3-11' }
        ].filter(l => l.value !== 'N/A'),
        alerts: []
      };

      try {
        const res = await fetch('/api/gemini/check-interactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            medications: treatmentDrugs,
            patientContext
          })
        });

        if (!res.ok) throw new Error('Interaction check failed');
        const result = await res.json();
        
        if (result.hasInteractions && result.interactions && result.interactions.length > 0) {
          const formattedInteractions = result.interactions.map((inter: any, idx: number) => ({
            id: `api-inter-${idx}`,
            message: `[${inter.severity}] ${inter.title}: ${inter.description} Recommendation: ${inter.recommendation}`
          }));
          setInteractions(formattedInteractions);
        } else {
          setInteractions([]);
        }
      } catch (err) {
        console.error('Error running real-time interaction check:', err);
      }
    }, 1000);
  };

  // Restore form data when tab changes
  useEffect(() => {
    const savedData = localStorage.getItem('clinova_pharma_review_form');
    if (savedData && formRef.current) {
      try {
        const parsed = JSON.parse(savedData);
        const tabData = parsed[activeTab] || {};
        const elements = formRef.current.elements;
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
          if (el.tagName === 'BUTTON') continue;
          const key = el.name || el.id || `input_${i}`;
          if (tabData[key] !== undefined) {
            el.value = tabData[key];
          }
        }
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }
  }, [activeTab]);

  const handleFormChange = () => {
    if (!formRef.current) return;
    const elements = formRef.current.elements;
    const tabData: Record<string, string> = {};
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (el.tagName === 'BUTTON') continue;
      const key = el.name || el.id || `input_${i}`;
      tabData[key] = el.value;
    }
    
    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};
      parsed[activeTab] = tabData;
      localStorage.setItem('clinova_pharma_review_form', JSON.stringify(parsed));
      
      // Merge all tabs for interaction checking
      const allData: Record<string, string> = {};
      Object.values(parsed).forEach(tab => {
        Object.assign(allData, tab);
      });
      checkInteractions(allData);
    } catch (e) {
      console.error('Failed to save form data', e);
    }
  };

  // Run interaction check on mount and tab change
  useEffect(() => {
    const savedData = localStorage.getItem('clinova_pharma_review_form');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const allData: Record<string, string> = {};
        Object.values(parsed).forEach(tab => Object.assign(allData, tab));
        checkInteractions(allData);
      } catch (e) {}
    }
  }, []);

  // Listen for storage changes (e.g., from Supabase Sync restoration)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      if (savedData && formRef.current) {
        try {
          const parsed = JSON.parse(savedData);
          const tabData = parsed[activeTab] || {};
          const elements = formRef.current.elements;
          let changed = false;
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            if (el.tagName === 'BUTTON') continue;
            const key = el.name || el.id || `input_${i}`;
            if (tabData[key] !== undefined && el.value !== tabData[key]) {
              el.value = tabData[key];
              changed = true;
            }
          }
          
          if (changed) {
            // Re-run interaction checking if form fields changed from sync
            const allData: Record<string, string> = {};
            Object.values(parsed).forEach(tab => Object.assign(allData, tab));
            checkInteractions(allData);
          }
        } catch (e) {
          console.error('Failed to parse saved form data', e);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinova-storage-synced', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinova-storage-synced', handleStorageChange);
    };
  }, [activeTab]);

  const tabs = [
    { id: 'admission', label: 'Admission', icon: User },
    { id: 'history', label: 'History', icon: ClipboardList },
    { id: 'systems', label: 'Systems', icon: Activity },
    { id: 'vitals-labs', label: 'Vitals & Labs', icon: Beaker },
    { id: 'diagnosis', label: 'Diagnosis', icon: Stethoscope },
    { id: 'treatment', label: 'Treatment', icon: Pill },
    { id: 'care-plan', label: 'Care Plan', icon: FileText },
    { id: 'counselling', label: 'Counselling', icon: HeartPulse },
  ];

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Clinical Pharmacotherapy Review", 20, 20);
      
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      if (!savedData) {
        alert('Please fill out and save the form first.');
        return;
      }
      
      const parsed = JSON.parse(savedData);
      let y = 30;
      doc.setFontSize(10);
      
      Object.keys(parsed).forEach(tab => {
        doc.setFont('helvetica', 'bold');
        doc.text(tab.toUpperCase().replace('_', ' '), 20, y);
        y += 8;
        
        doc.setFont('helvetica', 'normal');
        Object.keys(parsed[tab]).forEach(key => {
          const val = parsed[tab][key];
          if (val) {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const textLines = doc.splitTextToSize(`${formattedKey}: ${val}`, 170);
            doc.text(textLines, 20, y);
            y += (6 * textLines.length);
            
            if (y > 280) {
              doc.addPage();
              y = 20;
            }
          }
        });
        y += 6;
      });
      
      doc.save("Pharmacotherapy_Review.pdf");
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 pb-24">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Pharmacotherapy Review</h1>
          <p className="text-[var(--text-muted)] text-sm">Comprehensive clinical ward review and documentation</p>
        </div>
        {safetyVerification === null && localStorage.getItem('clinova_pharma_safety_verification') && (
          <button
            type="button"
            onClick={() => {
              const saved = localStorage.getItem('clinova_pharma_safety_verification');
              if (saved) {
                try {
                  setSafetyVerification(JSON.parse(saved));
                } catch (e) {}
              }
            }}
            className="text-xs bg-[var(--surface-dim)] hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-center"
          >
            <Sparkles size={13} className="text-[var(--primary)]" /> Restore Safety Report
          </button>
        )}
      </div>

      {safetyVerification && (
        <div className="mb-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${safetyVerification.safety_flags_identified && safetyVerification.safety_flags_identified.length > 0 ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'}`}>
                  {safetyVerification.safety_flags_identified && safetyVerification.safety_flags_identified.length > 0 ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                </div>
                <div>
                  <h3 className="text-sm sm:text-md font-bold text-[var(--text)] flex flex-wrap items-center gap-2">
                    Clinova AI Safety Intelligence Report
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      safetyVerification.safety_flags_identified && safetyVerification.safety_flags_identified.length > 0 
                        ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/20' 
                        : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200/20'
                    }`}>
                      {safetyVerification.safety_flags_identified && safetyVerification.safety_flags_identified.length > 0 ? 'Attention Recommended' : 'Guideline Verified'}
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">Automated clinical safety and KDI formulary alignment audit</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setSafetyVerification(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] self-end sm:self-center p-1 hover:bg-[var(--surface-dim)] rounded-lg transition-colors"
                title="Dismiss Report"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Grounding and Renal checks */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Grounded Integrity Check</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                    <span className="mt-0.5 text-emerald-500 font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-xs text-[var(--text)]">Patient Case Alignment</p>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                        {safetyVerification.is_grounded_in_case 
                          ? "Verified: Recommendations are strictly grounded in active clinical findings without speculation."
                          : "Audit Check: Ensure all suggested therapies correspond directly to the active diagnosis list."}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                    <span className="mt-0.5 text-emerald-500 font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-xs text-[var(--text)]">Renal Staging Assessment</p>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                        {safetyVerification.renal_adjustment_checked 
                          ? "Verified: Programmatic Cockcroft-Gault clearance calculations loaded and staging referenced."
                          : "Audit Check: Renal values unprovided or clearance remains at standard defaults."}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Identified Safety Flags */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Identified Safety Flags</h4>
                {safetyVerification.safety_flags_identified && safetyVerification.safety_flags_identified.length > 0 ? (
                  <ul className="space-y-1.5">
                    {safetyVerification.safety_flags_identified.map((flag: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/40 dark:border-amber-900/30 leading-relaxed">
                        <span className="text-amber-500 font-bold shrink-0">!</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-950 leading-relaxed">
                    No high-risk contraindications, toxicities, or clinical mismatches identified for this patient's profile.
                  </div>
                )}
              </div>

              {/* Evidence Sourcing */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">KDI & Guideline Evidence</h4>
                {safetyVerification.clinical_evidence_sources && safetyVerification.clinical_evidence_sources.length > 0 ? (
                  <ul className="space-y-1.5">
                    {safetyVerification.clinical_evidence_sources.map((source: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-[var(--text-muted)] leading-relaxed">
                        <span className="text-[var(--primary)] text-sm shrink-0">▪</span>
                        <span className="italic">{source}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[var(--text-muted)] italic">No formal evidence source returned by engine.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm md:sticky md:top-6">
          <div className="p-4 bg-[var(--surface-dim)] border-b border-[var(--border)]">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Form Sections</h2>
          </div>
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal border-l-4 md:border-l-4 md:border-b-0 border-b-4 shrink-0 ${
                    isActive 
                      ? 'border-[var(--primary)] bg-[var(--primary-container)] text-[var(--primary)]' 
                      : 'border-transparent text-[var(--text)] hover:bg-[var(--surface-dim)] hover:text-[var(--primary)]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex flex-col relative">
          {isGenerating && (
            <div className="absolute inset-0 bg-[var(--surface)]/85 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 space-y-6">
              <div className="w-full max-w-md space-y-5 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center animate-spin shrink-0">
                    <Loader2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text)] text-base">Clinova Intelligence Engine</h3>
                    <p className="text-xs text-[var(--text-muted)] animate-pulse">Running advanced RAG synthesis &amp; patient clinical evaluation...</p>
                  </div>
                </div>
                {/* Pulsing skeleton lines */}
                <div className="space-y-3.5 pt-4">
                  <div className="h-4 bg-[var(--surface-dim)] rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-[var(--surface-dim)] rounded-full w-full animate-pulse"></div>
                  <div className="h-4 bg-[var(--surface-dim)] rounded-full w-5/6 animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="h-10 bg-[var(--surface-dim)] rounded-xl animate-pulse"></div>
                    <div className="h-10 bg-[var(--surface-dim)] rounded-xl animate-pulse"></div>
                  </div>
                  <div className="h-24 bg-[var(--surface-dim)] rounded-2xl w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          
          {interactions.length > 0 && (
            <div className="bg-red-500/10 border-b border-red-500/20 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
                <div className="space-y-2 flex-1">
                  <h4 className="font-semibold text-red-700">Drug-Drug Interactions Detected</h4>
                  <ul className="space-y-1">
                    {interactions.map(interaction => (
                      <li key={interaction.id} className="text-sm text-red-600 font-medium list-disc ml-4">
                        {interaction.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form ref={formRef} onChange={handleFormChange} className="p-6 sm:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {bannerMessage && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                bannerMessage.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800' 
                  : 'bg-red-500/10 border-red-500/20 text-red-800'
              }`}>
                <div className="flex-1 text-sm font-medium">
                  {bannerMessage.text}
                </div>
                <button 
                  type="button" 
                  onClick={() => setBannerMessage(null)}
                  className="text-xs underline hover:no-underline font-semibold text-[var(--text)]"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* AI Auto-Fill Options Settings Panel */}
            {['treatment', 'care-plan', 'counselling'].includes(activeTab) && (
              <div className="bg-[var(--primary-container)]/30 border border-[var(--primary)]/30 rounded-xl p-4 space-y-3 animate-in fade-in duration-300 mt-6">
                <div className="flex items-center justify-between border-b border-[var(--primary)]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                      <BrainCircuit size={18} className="animate-pulse" />
                    </div>
                    <span className="text-sm font-bold text-[var(--primary)]">AI Auto-Fill Options</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded border border-[var(--primary)]/20 hidden sm:inline-block">
                    Option-controlled
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Select which sections the AI is allowed to auto-fill when you trigger the suggestions.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                  <label className="flex items-center gap-2.5 text-xs font-medium text-[var(--text)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autofillTreatment}
                      onChange={(e) => setAutofillTreatment(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] h-4 w-4 cursor-pointer"
                    />
                    A) Treatment Plan
                  </label>
                  <label className="flex items-center gap-2.5 text-xs font-medium text-[var(--text)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autofillCarePlan}
                      onChange={(e) => setAutofillCarePlan(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] h-4 w-4 cursor-pointer"
                    />
                    B) Pharmaceutical Care Plan
                  </label>
                  <label className="flex items-center gap-2.5 text-xs font-medium text-[var(--text)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autofillCounselling}
                      onChange={(e) => setAutofillCounselling(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] h-4 w-4 cursor-pointer"
                    />
                    C) Patient Counselling Points
                  </label>
                </div>
              </div>
            )}
                   {activeTab === 'admission' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <User size={20} className="text-[var(--primary)]"/> Patient Identification & Admission Details
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Provide the general demographic details of the patient.
                  </p>
                </div>

                {/* AI Document Upload Hub */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border border-dashed rounded-xl p-6 text-center transition-all flex flex-col items-center justify-center gap-3 relative ${
                    dragActive 
                      ? 'border-[var(--primary)] bg-[var(--primary-container)]/10 ring-2 ring-[var(--primary)]/25' 
                      : 'border-[var(--border)] bg-[var(--surface-dim)] hover:border-[var(--primary)]/70 hover:bg-[var(--surface-dim)]/50'
                  }`}
                >
                  <input 
                    type="file" 
                    id="pharmacotherapyFileInput"
                    onChange={handleFileInputChange}
                    className="hidden" 
                    accept="image/*,audio/*,application/pdf"
                    multiple
                  />
                  
                  {isGenerating ? (
                    <div className="space-y-3 py-3 flex flex-col items-center justify-center">
                      <Loader2 size={32} className="text-[var(--primary)] animate-spin" />
                      <div className="text-center">
                        <p className="text-sm font-bold text-[var(--text)]">Extracting Clinical Context...</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1 animate-pulse">Clinova is parsing your document and populating the clinical review sections</p>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="pharmacotherapyFileInput" className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-2">
                      <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] mb-3">
                        <Sparkles size={22} className="animate-pulse" />
                      </div>
                      <span className="text-sm font-bold text-[var(--text)] block mb-1">
                        Smart Auto-Fill: Drag & drop your clinical file here, or <span className="text-[var(--primary)] underline">browse</span>
                      </span>
                      <span className="text-xs text-[var(--text-muted)] max-w-lg leading-relaxed">
                        Upload a patient case note, admission sheet, prescription, or clinical image (PDF or Image) to automatically populate all tabs of this pharmacotherapy review form.
                      </span>
                    </label>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1.5 mb-6 p-3.5 bg-[var(--primary)]/5 border border-[var(--primary)]/10 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[var(--primary)] animate-pulse" />
                    <span className="text-xs font-medium text-[var(--text)]">
                      Want to test the full-featured auto-fill instantly?
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateFormFromExtraction(SAMPLE_PATIENT_DATA);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-all rounded-lg shadow-sm cursor-pointer"
                  >
                    Load High-Fidelity Demo Patient Case
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Patient Name (Initials Only)</label>
                    <input 
                      type="text" 
                      name="patient_name" 
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" 
                      placeholder="E.g., J. D." 
                      onBlur={(e) => {
                        e.target.value = getPatientInitials(e.target.value);
                        handleFormChange();
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Age</label>
                      <input type="number" name="patient_age" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Sex</label>
                      <select name="patient_sex" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]">
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Weight (kg)</label>
                      <input type="text" name="patient_weight" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="E.g., 70" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Height (cm)</label>
                      <input type="text" name="patient_height" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="E.g., 175" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">IP Number</label>
                    <input type="text" name="patient_ip" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Ward</label>
                      <input type="text" name="patient_ward" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Bed</label>
                      <input type="text" name="patient_bed" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-[var(--text)]">Residence</label>
                    <input type="text" name="patient_residence" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Date of Admission</label>
                    <input type="date" name="patient_adm_date" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Date of History Taking</label>
                    <input type="date" name="patient_history_date" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <ClipboardList size={20} className="text-[var(--primary)]"/> Clinical Presentation & History
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Chief Complaint</label>
                    <textarea name="chief_complaint" rows={2} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Briefly describe the primary issue..."></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">History of Presenting Illness</label>
                    <textarea name="hpi" rows={4} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Detailed chronological description..."></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Past Medical History</label>
                    <textarea name="pmh" rows={3} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Previous diagnoses, surgeries, hospitalizations..."></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)] flex justify-between items-center">
                      <span>Medication History</span>
                      <span className="text-xs text-[var(--text-muted)] font-normal">Limit to drugs used BEFORE current admission</span>
                    </label>
                    <textarea name="history_meds" rows={3} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Include OTC, herbals, prescribed meds..."></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Family History</label>
                      <textarea name="family_history" rows={2} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]"></textarea>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Social History</label>
                      <textarea name="social_history" rows={2} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Smoking, alcohol, occupation..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'systems' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <Activity size={20} className="text-[var(--primary)]"/> Systemic Review
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Check and describe findings for relevant systems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "General Health", "CNS", "CVS", "Respiratory System", 
                    "Gastrointestinal System", "Genitourinary System", 
                    "Musculoskeletal System", "Skin & Integumentary System"
                  ].map(sys => (
                    <div key={sys} className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">{sys}</label>
                      <input type="text" name={`system_${sys.replace(/\s+/g, '_')}`} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Normal, or describe findings..." />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vitals-labs' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <Beaker size={20} className="text-[var(--primary)]"/> Investigations & Vitals
                  </h3>
                </div>

                {/* Vitals */}
                <div>
                  <h4 className="text-md font-medium text-[var(--text)] mb-3 flex items-center gap-2">
                    <Activity size={16} className="text-[var(--primary)]"/> Vitals
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">HR (bpm)</label><input type="text" name="hr" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">BP (mmHg)</label><input type="text" name="bp" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" placeholder="120/80"/></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">Temp (°C)</label><input type="text" name="temp" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">PO2 (%)</label><input type="text" name="po2" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">RR (bpm)</label><input type="text" name="rr" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">BMI</label><input type="text" name="bmi" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                  </div>
                </div>

                {/* Labs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Electrolytes */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Electrolytes / UECs</h4>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Na+ <br/><span className="text-[10px] opacity-70">(135-145)</span></span><input type="text" name="na" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">K+ <br/><span className="text-[10px] opacity-70">(3.2-5)</span></span><input type="text" name="k" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Cl- <br/><span className="text-[10px] opacity-70">(98-106)</span></span><input type="text" name="cl" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Urea <br/><span className="text-[10px] opacity-70">(2.5-6.5)</span></span><input type="text" name="urea" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Creat <br/><span className="text-[10px] opacity-70">(45-104)</span></span><input type="text" name="creat" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">CrCl <br/><span className="text-[10px] opacity-70">(80-120)</span></span><input type="text" name="crcl" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>

                  {/* LFTs */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Liver Function Tests</h4>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">AST <br/><span className="text-[10px] opacity-70">(13-42)</span></span><input type="text" name="ast" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">ALT <br/><span className="text-[10px] opacity-70">(9-52)</span></span><input type="text" name="alt" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">ALP <br/><span className="text-[10px] opacity-70">(35-130)</span></span><input type="text" name="alp" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">T. Bili <br/><span className="text-[10px] opacity-70">(&lt;17.1)</span></span><input type="text" name="t_bili" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">D. Bili <br/><span className="text-[10px] opacity-70">(1-6)</span></span><input type="text" name="d_bili" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Albumin <br/><span className="text-[10px] opacity-70">(35-48)</span></span><input type="text" name="albumin" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>

                  {/* Hematology */}
                  <div className="space-y-3 md:col-span-2">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Hematology</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">WBC <br/><span className="text-[10px] opacity-70">(4.3-11)</span></span><input type="text" name="wbc" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Neut <br/><span className="text-[10px] opacity-70">(1-4.6)</span></span><input type="text" name="neut" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Lymph <br/><span className="text-[10px] opacity-70">(1.5-4)</span></span><input type="text" name="lymph" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Mono <br/><span className="text-[10px] opacity-70">(0.2-0.8)</span></span><input type="text" name="mono" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Eos <br/><span className="text-[10px] opacity-70">(0.04-0.77)</span></span><input type="text" name="eos" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Hb <br/><span className="text-[10px] opacity-70">(9.5-13)</span></span><input type="text" name="hb" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">MCV <br/><span className="text-[10px] opacity-70">(80-100)</span></span><input type="text" name="mcv" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Plts <br/><span className="text-[10px] opacity-70">(150-350)</span></span><input type="text" name="plts" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>

                  {/* Other Tests */}
                  <div className="space-y-3 md:col-span-2">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Other Tests</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">CrAG</label><input type="text" name="crag" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">India Ink Test</label><input type="text" name="india_ink" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">MPS</label><input type="text" name="mps" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">Urinalysis</label><input type="text" name="urinalysis" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">Chest X-ray</label><input type="text" name="cxr" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">ECG/Echo (EF%)</label><input type="text" name="ecg" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'diagnosis' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <Stethoscope size={20} className="text-[var(--primary)]"/> Problem List / Working Diagnosis
                  </h3>
                </div>

                <div className="space-y-4">
                  <textarea name="diagnoses_list" rows={8} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)] leading-relaxed" placeholder="1. &#10;2. &#10;3. &#10;4. "></textarea>
                </div>
              </div>
            )}

            {activeTab === 'treatment' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <Pill size={20} className="text-[var(--primary)]"/> Current Management Plan
                  </h3>
                  <button 
                    type="button" 
                    onClick={triggerAutofill}
                    disabled={isGenerating}
                    className="text-xs bg-[var(--primary-container)] text-[var(--primary)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors border border-[var(--primary)]/20 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Analyzing KDI Guidelines...
                      </>
                    ) : (
                      <>
                        <BrainCircuit size={14} /> AI Treatment Suggestion
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)] mb-3">A) Pharmacological Management</h4>
                    <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase">
                          <tr>
                            <th className="px-3 py-2 font-medium">Drug (INN)</th>
                            <th className="px-3 py-2 font-medium">Dosage Form</th>
                            <th className="px-3 py-2 font-medium">Dose</th>
                            <th className="px-3 py-2 font-medium">Frequency</th>
                            <th className="px-3 py-2 font-medium">Start Date</th>
                            <th className="px-3 py-2 font-medium">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                          {[1, 2, 3, 4, 5].map((row) => (
                            <tr key={row}>
                              <td className="p-1.5"><input type="text" name={`treatment_drug_${row}`} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="text" name={`treatment_form_${row}`} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="text" name={`treatment_dose_${row}`} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="text" name={`treatment_freq_${row}`} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="date" name={`treatment_start_${row}`} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none text-xs" /></td>
                              <td className="p-1.5"><input type="text" name={`treatment_dur_${row}`} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button type="button" className="text-xs text-[var(--primary)] font-medium mt-2 hover:underline">+ Add Row</button>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)] mb-3">B) Non-Pharmacological Management</h4>
                    <textarea name="treatment_non_pharma" rows={4} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Dietary changes, physiotherapy, fluid restriction..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care-plan' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <FileText size={20} className="text-[var(--primary)]"/> Pharmaceutical Care Plan
                  </h3>
                  <button 
                    type="button" 
                    onClick={triggerAutofill}
                    disabled={isGenerating}
                    className="text-xs bg-[var(--primary-container)] text-[var(--primary)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors border border-[var(--primary)]/20 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Structuring Care Plan...
                      </>
                    ) : (
                      <>
                        <BrainCircuit size={14} /> Smart Autofill
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)] mb-3">I. Pharmacological Interventions</h4>
                    <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase">
                          <tr>
                            <th className="px-3 py-2 font-medium">Medical Condition</th>
                            <th className="px-3 py-2 font-medium">Drug Therapy Problem</th>
                            <th className="px-3 py-2 font-medium">Goal</th>
                            <th className="px-3 py-2 font-medium">Intervention</th>
                            <th className="px-3 py-2 font-medium">Follow-up Plan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                          {[1, 2, 3].map((row) => (
                            <tr key={row}>
                              <td className="p-1.5"><textarea name={`care_plan_cond_${row}`} rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea name={`care_plan_problem_${row}`} rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea name={`care_plan_goal_${row}`} rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea name={`care_plan_intervention_${row}`} rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea name={`care_plan_followup_${row}`} rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[var(--text)]">II. Non-Pharmacological Interventions</h4>
                    <textarea name="care_plan_non_pharma" rows={3} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Enter non-pharmacological therapies..."></textarea>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[var(--text)]">III. Patient Monitoring</h4>
                    <textarea name="care_plan_monitoring" rows={3} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Parameters to monitor (e.g. UECs daily, BP every 4 hours)..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'counselling' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <HeartPulse size={20} className="text-[var(--primary)]"/> Patient Counselling Section
                  </h3>
                  <button 
                    type="button" 
                    onClick={triggerAutofill}
                    disabled={isGenerating}
                    className="text-xs bg-[var(--primary-container)] text-[var(--primary)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors border border-[var(--primary)]/20 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Synthesizing Advice...
                      </>
                    ) : (
                      <>
                        <BrainCircuit size={14} /> AI Generate Counselling
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-[var(--text-muted)]">Document key counselling points discussed with the patient or caregiver regarding their medication, lifestyle modifications, and adherence.</p>
                  <textarea name="counselling_points" rows={8} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)] leading-relaxed" placeholder="Discussed..."></textarea>
                </div>
              </div>
            )}

            {/* Persistent Dynamic Bottom Navigation Footer */}
            <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between mt-8 animate-in fade-in duration-300">
              <div>
                {activeTab !== 'admission' ? (
                  <button
                    type="button"
                    onClick={handlePrevTab}
                    className="px-4 py-2 bg-[var(--surface-dim)] hover:bg-[var(--border)] text-[var(--text)] font-semibold rounded-lg border border-[var(--border)] transition-colors text-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    ← Previous Section
                  </button>
                ) : (
                  <div />
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeTab !== 'counselling' ? (
                  <button
                    type="button"
                    onClick={handleNextTab}
                    className="px-5 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95 font-semibold rounded-lg transition-all text-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    Next Section →
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="px-4 py-2 bg-[var(--surface-dim)] text-[var(--text)] border border-[var(--border)] font-semibold rounded-lg hover:bg-[var(--border)] transition-colors flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBannerMessage({
                          type: 'success',
                          text: 'Pharmacotherapy Review Form Saved Successfully! All data has been stored locally.'
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm text-sm cursor-pointer"
                    >
                      <CheckCircle size={16} />
                      Complete Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <button
        type="button"
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full shadow-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-medium"
      >
        <Sparkles size={20} className="animate-pulse" />
        <span className="hidden sm:inline text-sm">Clinical AI Assistant</span>
      </button>

      {/* AI Assistant Sidebar Panel */}
      {isAssistantOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsAssistantOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-[var(--surface)] border-l border-[var(--border)] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-[var(--surface-dim)] border-b border-[var(--border)] flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <BrainCircuit className="text-[var(--primary)]" size={22} />
                <div>
                  <h3 className="font-semibold text-[var(--text)] text-sm">Clinova AI Clinical Assistant</h3>
                  <p className="text-[10px] text-[var(--text-muted)]">KDI-integrated Guideline Engine</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsAssistantOpen(false)}
                className="p-1.5 hover:bg-[var(--border)] rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
                      : 'bg-[var(--surface-dim)] text-[var(--text)] border border-[var(--border)]'
                  }`}>
                    <div className="whitespace-pre-line">
                      {msg.content.split('**').map((text, i) => i % 2 === 1 ? <strong key={i} className="font-semibold">{text}</strong> : text)}
                    </div>
                    <span className="text-[9px] opacity-75 block text-right mt-1 font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isAssistantThinking && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-[var(--surface-dim)] text-[var(--text-muted)] border border-[var(--border)] rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-[var(--primary)]" />
                    <span>Clinova AI is formulating clinical recommendations...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Fast Guideline Queries */}
            <div className="p-2 bg-[var(--surface-dim)] border-t border-[var(--border)] flex gap-2 overflow-x-auto whitespace-nowrap">
              {[
                "Renal adjustment guidelines",
                "Check for interactions",
                "Malaria guideline summary",
                "Standard pneumonia treatment"
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAssistantMessage(suggestion);
                  }}
                  className="text-[10px] bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] px-2.5 py-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0 whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] shrink-0">
              <div className="relative flex items-end bg-[var(--surface-dim)] border border-[var(--border)] focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:border-[var(--primary)] rounded-2xl shadow-sm transition-all overflow-hidden">
                <textarea 
                  value={assistantMessage}
                  onChange={(e) => setAssistantMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendAssistantMessage();
                    }
                  }}
                  placeholder="Ask clinical queries..."
                  className="w-full pl-4 pr-2 py-3 max-h-32 min-h-[48px] bg-transparent outline-none text-[var(--text)] text-sm resize-none placeholder-[var(--text-muted)]"
                  rows={1}
                />
                <div className="flex items-center gap-1.5 pr-2 pb-2 shrink-0">
                  <button
                    type="button"
                    onClick={sendAssistantMessage}
                    disabled={!assistantMessage.trim() || isAssistantThinking}
                    className={`p-2 rounded-xl transition-all ${
                      assistantMessage.trim() && !isAssistantThinking
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm hover:opacity-90' 
                        : 'text-[var(--text-muted)] opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isAssistantThinking ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
