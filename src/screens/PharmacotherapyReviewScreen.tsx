import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Stethoscope, Activity, ClipboardList, Beaker, FileText, Pill, HeartPulse, CheckCircle, BrainCircuit, AlertTriangle,
  Send, Loader2, Sparkles, X
} from 'lucide-react';
import { useFileStore } from '../store/fileStore';

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

  // AI State Variables
  const [isGenerating, setIsGenerating] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string, timestamp: Date }[]>([
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
        { role: 'assistant', content: data.text, timestamp: new Date() }
      ]);
    } catch (error: any) {
      console.error(error);
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Sorry, I encountered an error: ${error.message || 'communicating with the clinical assistant. Please try again.'}`, timestamp: new Date() }
      ]);
    } finally {
      setIsAssistantThinking(false);
    }
  };

  const checkInteractions = (tabData: Record<string, string>) => {
    // Extract all mentioned drugs from history and current treatment
    const historyMeds = (tabData['history_meds'] || '').toLowerCase();
    const treatmentDrugs: string[] = [];
    
    for (let i = 1; i <= 5; i++) {
      const drug = (tabData[`treatment_drug_${i}`] || '').toLowerCase().trim();
      if (drug) treatmentDrugs.push(drug);
    }

    const allMentionedDrugs = [...treatmentDrugs];
    
    // Add history meds if they match known drugs
    Object.keys(KNOWN_INTERACTIONS).forEach(drug => {
      if (historyMeds.includes(drug) && !allMentionedDrugs.includes(drug)) {
        allMentionedDrugs.push(drug);
      }
    });

    const foundInteractions: { id: string, message: string }[] = [];
    
    // Check all combinations
    for (let i = 0; i < allMentionedDrugs.length; i++) {
      for (let j = i + 1; j < allMentionedDrugs.length; j++) {
        const drugA = allMentionedDrugs[i];
        const drugB = allMentionedDrugs[j];
        
        // Find interactions where drugA is the key and drugB is in the list, or vice versa
        let key = null;
        if (KNOWN_INTERACTIONS[drugA]?.includes(drugB)) {
          key = `${drugA}-${drugB}`;
          if (!INTERACTION_MESSAGES[key]) key = `${drugB}-${drugA}`;
        } else if (KNOWN_INTERACTIONS[drugB]?.includes(drugA)) {
          key = `${drugB}-${drugA}`;
          if (!INTERACTION_MESSAGES[key]) key = `${drugA}-${drugB}`;
        }

        if (key && INTERACTION_MESSAGES[key]) {
          foundInteractions.push({ id: key, message: INTERACTION_MESSAGES[key] });
        }
      }
    }

    setInteractions(foundInteractions);
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

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Pharmacotherapy Review</h1>
        <p className="text-[var(--text-muted)] text-sm">Comprehensive clinical ward review and documentation</p>
      </div>

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
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal border-l-4 md:border-l-4 md:border-b-0 border-b-4 ${
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
        <div className="flex-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex flex-col">
          
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
                <div className="border-b border-[var(--border)] pb-4 mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <User size={20} className="text-[var(--primary)]"/> Patient Identification & Admission Details
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="file" 
                      id="pharmacotherapyFileInput"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsGenerating(true);
                        try {
                          const formData = new FormData();
                          formData.append('file', file);
                          formData.append('extractionType', 'pharmacotherapy');
                          
                          const res = await fetch('/api/gemini/extract-file', {
                            method: 'POST',
                            body: formData,
                          });
                          
                          if (!res.ok) throw new Error('Extraction failed');
                          const data = await res.json();
                          
                          if (formRef.current) {
                            const els = formRef.current.elements as any;
                            if (data.patientName && els.patient_name) els.patient_name.value = data.patientName;
                            if (data.age && els.patient_age) els.patient_age.value = data.age;
                            if (data.weight && els.patient_weight) els.patient_weight.value = data.weight;
                            if (data.height && els.patient_height) els.patient_height.value = data.height;
                            if (data.chiefComplaint && els.history_pc) els.history_pc.value = data.chiefComplaint;
                            if (data.pastMedicalHistory && els.history_pmh) els.history_pmh.value = data.pastMedicalHistory;
                            if (data.diagnosis && els.dx_working) els.dx_working.value = data.diagnosis;
                            if (data.currentMedications && els.history_meds) els.history_meds.value = data.currentMedications;
                            if (data.allergies && els.history_allergies) els.history_allergies.value = data.allergies;
                            handleFormChange();
                          }
                          setBannerMessage({ type: 'success', text: 'Data extracted from file successfully.' });
                        } catch (err: any) {
                          setBannerMessage({ type: 'error', text: err.message || 'Failed to extract data' });
                        } finally {
                          setIsGenerating(false);
                          if (e.target) e.target.value = '';
                        }
                      }}
                      className="hidden" 
                      accept="image/*,audio/*,application/pdf"
                    />
                    <button 
                      type="button"
                      onClick={() => document.getElementById('pharmacotherapyFileInput')?.click()}
                      disabled={isGenerating}
                      className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-gray-800 border border-[var(--border)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-[var(--primary)]" />}
                      {isGenerating ? 'Extracting...' : 'AI Extract from File'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Patient Name</label>
                    <input type="text" name="patient_name" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">IP Number</label>
                    <input type="text" name="patient_ip" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-2 gap-3">
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
                    <div className="grid grid-cols-2 gap-3">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                      {msg.content}
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
                  className="text-[10px] bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] px-2.5 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] transition-colors inline-block"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-[var(--border)] flex gap-2 items-center bg-[var(--surface)]">
              <input
                type="text"
                value={assistantMessage}
                onChange={(e) => setAssistantMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendAssistantMessage();
                  }
                }}
                placeholder="Ask clinical queries..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={sendAssistantMessage}
                disabled={!assistantMessage.trim() || isAssistantThinking}
                className="p-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
