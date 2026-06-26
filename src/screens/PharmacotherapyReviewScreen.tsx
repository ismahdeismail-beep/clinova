import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Stethoscope, Activity, ClipboardList, Beaker, FileText, Pill, HeartPulse, CheckCircle, BrainCircuit
} from 'lucide-react';

export default function PharmacotherapyReviewScreen() {
  const [activeTab, setActiveTab] = useState<string>('admission');
  const formRef = useRef<HTMLFormElement>(null);

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
    } catch (e) {
      console.error('Failed to save form data', e);
    }
  };

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
        <div className="flex-1 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <form ref={formRef} onChange={handleFormChange} className="p-6 sm:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {activeTab === 'admission' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-[var(--border)] pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                    <User size={20} className="text-[var(--primary)]"/> Patient Identification & Admission Details
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Patient Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Age</label>
                      <input type="number" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Sex</label>
                      <select className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]">
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">IP Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Ward</label>
                      <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Bed</label>
                      <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-[var(--text)]">Residence</label>
                    <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Date of Admission</label>
                    <input type="date" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Date of History Taking</label>
                    <input type="date" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface)] text-[var(--text)]" />
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
                    <textarea rows={2} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Briefly describe the primary issue..."></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">History of Presenting Illness</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Detailed chronological description..."></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Past Medical History</label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Previous diagnoses, surgeries, hospitalizations..."></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)] flex justify-between items-center">
                      <span>Medication History</span>
                      <span className="text-xs text-[var(--text-muted)] font-normal">Limit to drugs used BEFORE current admission</span>
                    </label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Include OTC, herbals, prescribed meds..."></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Family History</label>
                      <textarea rows={2} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]"></textarea>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[var(--text)]">Social History</label>
                      <textarea rows={2} className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Smoking, alcohol, occupation..."></textarea>
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
                      <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Normal, or describe findings..." />
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
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">HR (bpm)</label><input type="text" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">BP (mmHg)</label><input type="text" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" placeholder="120/80"/></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">Temp (°C)</label><input type="text" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">PO2 (%)</label><input type="text" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">RR (bpm)</label><input type="text" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                    <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">BMI</label><input type="text" className="w-full px-2 py-1.5 border border-[var(--border)] rounded bg-[var(--surface)]" /></div>
                  </div>
                </div>

                {/* Labs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Electrolytes */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Electrolytes / UECs</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Na+ <br/><span className="text-[10px] opacity-70">(135-145)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">K+ <br/><span className="text-[10px] opacity-70">(3.2-5)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Cl- <br/><span className="text-[10px] opacity-70">(98-106)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Urea <br/><span className="text-[10px] opacity-70">(2.5-6.5)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Creat <br/><span className="text-[10px] opacity-70">(45-104)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">CrCl <br/><span className="text-[10px] opacity-70">(80-120)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>

                  {/* LFTs */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Liver Function Tests</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">AST <br/><span className="text-[10px] opacity-70">(13-42)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">ALT <br/><span className="text-[10px] opacity-70">(9-52)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">ALP <br/><span className="text-[10px] opacity-70">(35-130)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">T. Bili <br/><span className="text-[10px] opacity-70">(&lt;17.1)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">D. Bili <br/><span className="text-[10px] opacity-70">(1-6)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Albumin <br/><span className="text-[10px] opacity-70">(35-48)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>

                  {/* Hematology */}
                  <div className="space-y-3 md:col-span-2">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Hematology</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">WBC <br/><span className="text-[10px] opacity-70">(4.3-11)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Neut <br/><span className="text-[10px] opacity-70">(1-4.6)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Lymph <br/><span className="text-[10px] opacity-70">(1.5-4)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Mono <br/><span className="text-[10px] opacity-70">(0.2-0.8)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Eos <br/><span className="text-[10px] opacity-70">(0.04-0.77)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Hb <br/><span className="text-[10px] opacity-70">(9.5-13)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">MCV <br/><span className="text-[10px] opacity-70">(80-100)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-xs text-[var(--text-muted)] w-24">Plts <br/><span className="text-[10px] opacity-70">(150-350)</span></span><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                    </div>
                  </div>

                  {/* Other Tests */}
                  <div className="space-y-3 md:col-span-2">
                    <h4 className="text-sm font-medium text-[var(--text)] border-b border-[var(--border)] pb-2">Other Tests</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">CrAG</label><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">India Ink Test</label><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">MPS</label><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">Urinalysis</label><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">Chest X-ray</label><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs text-[var(--text-muted)]">ECG/Echo (EF%)</label><input type="text" className="w-full px-2 py-1 border border-[var(--border)] rounded bg-[var(--surface)] text-sm" /></div>
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
                  <textarea rows={8} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)] leading-relaxed" placeholder="1. &#10;2. &#10;3. &#10;4. "></textarea>
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
                    onClick={() => {
                      const msg = "Clinova AI Treatment Suggestion:\n\nBased on the typical presentation of CAP, consider starting Amoxicillin 1g PO q8h for 5 days. For Malaria, Artemether-Lumefantrine 20/120mg as per guidelines.";
                      alert(msg);
                    }}
                    className="text-xs bg-[var(--primary-container)] text-[var(--primary)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[var(--primary)] hover:text-white transition-colors border border-[var(--primary)]/20"
                  >
                    <BrainCircuit size={14} /> AI Treatment Suggestion
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
                              <td className="p-1.5"><input type="text" className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="text" className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="text" className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="text" className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                              <td className="p-1.5"><input type="date" className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none text-xs" /></td>
                              <td className="p-1.5"><input type="text" className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button className="text-xs text-[var(--primary)] font-medium mt-2 hover:underline">+ Add Row</button>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)] mb-3">B) Non-Pharmacological Management</h4>
                    <textarea rows={4} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Dietary changes, physiotherapy, fluid restriction..."></textarea>
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
                    onClick={() => {
                      const msg = "Clinova AI Autofill Engine has analyzed the patient data and suggests: \n\nGoal: Eradicate infection and resolve symptoms.\nIntervention: Initiate IV Ceftriaxone 2g daily.\nFollow-up: Re-assess in 48 hours with culture results.";
                      if (formRef.current) {
                        const inputs = formRef.current.querySelectorAll('textarea');
                        if (inputs.length >= 4) {
                           (inputs[1] as HTMLTextAreaElement).value = "Untreated Infection";
                           (inputs[2] as HTMLTextAreaElement).value = "Eradicate infection & resolve symptoms";
                           (inputs[3] as HTMLTextAreaElement).value = "Initiate IV Ceftriaxone 2g daily";
                           (inputs[4] as HTMLTextAreaElement).value = "Re-assess in 48 hours with culture results";
                           handleFormChange();
                        }
                      }
                      alert(msg);
                    }}
                    className="text-xs bg-[var(--primary-container)] text-[var(--primary)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[var(--primary)] hover:text-white transition-colors border border-[var(--primary)]/20"
                  >
                    <BrainCircuit size={14} /> Smart Autofill
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
                              <td className="p-1.5"><textarea rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                              <td className="p-1.5"><textarea rows={2} className="w-full px-2 py-1 border border-transparent hover:border-[var(--border)] focus:border-[var(--primary)] rounded bg-transparent outline-none resize-none text-xs" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[var(--text)]">II. Non-Pharmacological Interventions</h4>
                    <textarea rows={3} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]"></textarea>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[var(--text)]">III. Patient Monitoring</h4>
                    <textarea rows={3} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)]" placeholder="Parameters to monitor (e.g. UECs daily, BP every 4 hours)..."></textarea>
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
                    onClick={() => {
                      const text = "Clinova AI Generated Counselling Points:\n\n1. Medication Adherence: Take all medications exactly as prescribed. Do not skip doses.\n2. Diet: Maintain a low-sodium diet and stay hydrated.\n3. Side Effects: If you experience any severe stomach pain or dizziness, seek medical attention immediately.\n4. Follow-up: Return to the clinic in 2 weeks for a review.";
                      if (formRef.current) {
                        const textareas = formRef.current.querySelectorAll('textarea');
                        if (textareas.length > 0) {
                          const lastTextArea = textareas[textareas.length - 1] as HTMLTextAreaElement;
                          lastTextArea.value = text;
                          handleFormChange();
                        }
                      }
                      alert("Counselling points generated successfully.");
                    }}
                    className="text-xs bg-[var(--primary-container)] text-[var(--primary)] font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[var(--primary)] hover:text-white transition-colors border border-[var(--primary)]/20"
                  >
                    <BrainCircuit size={14} /> AI Generate Counselling
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-[var(--text-muted)]">Document key counselling points discussed with the patient or caregiver regarding their medication, lifestyle modifications, and adherence.</p>
                  <textarea rows={8} className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--surface)] text-[var(--text)] leading-relaxed" placeholder="Discussed..."></textarea>
                </div>
                
                <div className="pt-6 flex justify-end">
                  <button type="button" className="px-6 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
                    <CheckCircle size={18} />
                    Complete Review
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
