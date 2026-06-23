import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Save, Plus, Trash2 } from 'lucide-react';

interface SystemicReviewItem {
  status: 'normal' | 'abnormal' | '';
  notes: string;
}

interface DrugRow {
  drug: string;
  dosageForm: string;
  dose: string;
  frequency: string;
  startDate: string;
  duration: string;
}

interface InterventionRow {
  condition: string;
  drugProblem: string;
  goal: string;
  intervention: string;
  followUp: string;
}

interface FormData {
  patientName: string;
  age: string;
  sex: string;
  ipNumber: string;
  ward: string;
  bed: string;
  residence: string;
  dateOfAdmission: string;
  dateOfHistoryTaking: string;
  chiefComplaint: string;
  historyOfPresentingIllness: string;
  pastMedicalHistory: string;
  medicationHistory: string;
  familyHistory: string;
  socialHistory: string;
  systemicReview: Record<string, SystemicReviewItem>;
  hr: string;
  bp: string;
  temp: string;
  po2: string;
  rr: string;
  bmi: string;
  na: string;
  k: string;
  cl: string;
  urea: string;
  creatinine: string;
  crcl: string;
  wbc: string;
  neutrophils: string;
  lymphocytes: string;
  monocytes: string;
  eosinophils: string;
  hb: string;
  mcv: string;
  platelets: string;
  ast: string;
  alt: string;
  alp: string;
  totalBilirubin: string;
  directBilirubin: string;
  albumin: string;
  crag: string;
  indiaInk: string;
  mps: string;
  urinalysis: string;
  chestXray: string;
  ecgEcho: string;
  workingDiagnosis: string;
  drugRows: DrugRow[];
  nonPharmacologicalManagement: string;
  interventionRows: InterventionRow[];
  nonPharmacologicalInterventions: string;
  patientMonitoring: string;
  patientCounselling: string;
}

const STORAGE_KEY = 'clinova_pharma_draft';
const SYSTEM_REVIEW_KEYS = ['generalHealth', 'cns', 'cvs', 'respiratory', 'gi', 'gu', 'musculoskeletal', 'skin'];
const SYSTEM_REVIEW_LABELS: Record<string, string> = {
  generalHealth: 'General Health',
  cns: 'CNS',
  cvs: 'CVS',
  respiratory: 'Respiratory',
  gi: 'Gastrointestinal',
  gu: 'Genitourinary',
  musculoskeletal: 'Musculoskeletal',
  skin: 'Skin',
};

const STEPS = [
  'Patient ID & Admission',
  'Clinical Presentation',
  'Systemic Review',
  'Investigations & Vitals',
  'Problem List',
  'Management Plan',
  'Pharmaceutical Care',
  'Patient Counselling',
];

function emptyForm(): FormData {
  const sr: Record<string, SystemicReviewItem> = {};
  for (const k of SYSTEM_REVIEW_KEYS) sr[k] = { status: '', notes: '' };
  return {
    patientName: '', age: '', sex: '', ipNumber: '', ward: '', bed: '', residence: '',
    dateOfAdmission: '', dateOfHistoryTaking: '',
    chiefComplaint: '', historyOfPresentingIllness: '', pastMedicalHistory: '',
    medicationHistory: '', familyHistory: '', socialHistory: '',
    systemicReview: sr,
    hr: '', bp: '', temp: '', po2: '', rr: '', bmi: '',
    na: '', k: '', cl: '', urea: '', creatinine: '', crcl: '',
    wbc: '', neutrophils: '', lymphocytes: '', monocytes: '', eosinophils: '',
    hb: '', mcv: '', platelets: '',
    ast: '', alt: '', alp: '', totalBilirubin: '', directBilirubin: '', albumin: '',
    crag: '', indiaInk: '', mps: '', urinalysis: '', chestXray: '', ecgEcho: '',
    workingDiagnosis: '',
    drugRows: [{ drug: '', dosageForm: '', dose: '', frequency: '', startDate: '', duration: '' }],
    nonPharmacologicalManagement: '',
    interventionRows: [{ condition: '', drugProblem: '', goal: '', intervention: '', followUp: '' }],
    nonPharmacologicalInterventions: '',
    patientMonitoring: '',
    patientCounselling: '',
  };
}

export default function PharmacotherapyScreen() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saved, setSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm((prev) => {
          const merged = { ...emptyForm(), ...parsed };
          if (parsed.systemicReview) {
            merged.systemicReview = { ...prev.systemicReview };
            for (const k of SYSTEM_REVIEW_KEYS) {
              if (parsed.systemicReview[k]) merged.systemicReview[k] = { ...prev.systemicReview[k], ...parsed.systemicReview[k] };
            }
          }
          return merged;
        });
      }
    } catch { /* ignore corrupt data */ }
  }, []);

  const autoSave = useCallback((data: FormData) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  }, []);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      autoSave(next);
      return next;
    });
  }

  function updateSr(key: string, field: 'status' | 'notes', value: string) {
    setForm((prev) => {
      const sr = { ...prev.systemicReview, [key]: { ...prev.systemicReview[key], [field]: value } };
      const next = { ...prev, systemicReview: sr };
      autoSave(next);
      return next;
    });
  }

  function updateDrugRow(index: number, field: keyof DrugRow, value: string) {
    setForm((prev) => {
      const rows = prev.drugRows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
      const next = { ...prev, drugRows: rows };
      autoSave(next);
      return next;
    });
  }

  function addDrugRow() {
    setForm((prev) => {
      const next = { ...prev, drugRows: [...prev.drugRows, { drug: '', dosageForm: '', dose: '', frequency: '', startDate: '', duration: '' }] };
      autoSave(next);
      return next;
    });
  }

  function removeDrugRow(index: number) {
    setForm((prev) => {
      if (prev.drugRows.length <= 1) return prev;
      const next = { ...prev, drugRows: prev.drugRows.filter((_, i) => i !== index) };
      autoSave(next);
      return next;
    });
  }

  function updateInterventionRow(index: number, field: keyof InterventionRow, value: string) {
    setForm((prev) => {
      const rows = prev.interventionRows.map((r, i) => (i === index ? { ...r, [field]: value } : r));
      const next = { ...prev, interventionRows: rows };
      autoSave(next);
      return next;
    });
  }

  function addInterventionRow() {
    setForm((prev) => {
      const next = { ...prev, interventionRows: [...prev.interventionRows, { condition: '', drugProblem: '', goal: '', intervention: '', followUp: '' }] };
      autoSave(next);
      return next;
    });
  }

  function removeInterventionRow(index: number) {
    setForm((prev) => {
      if (prev.interventionRows.length <= 1) return prev;
      const next = { ...prev, interventionRows: prev.interventionRows.filter((_, i) => i !== index) };
      autoSave(next);
      return next;
    });
  }

  function handleSaveComplete() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function renderInput(label: string, key: keyof FormData, type: string = 'text', placeholder?: string) {
    return (
      <div>
        <label className="form-label">{label}</label>
        <input
          type={type}
          className="form-input"
          placeholder={placeholder}
          value={form[key] as string}
          onChange={(e) => updateField(key, e.target.value)}
        />
      </div>
    );
  }

  function renderSelect(label: string, key: keyof FormData, options: { value: string; label: string }[]) {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select
          className="form-input"
          value={form[key] as string}
          onChange={(e) => updateField(key, e.target.value)}
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }

  function renderTextarea(label: string, key: keyof FormData, rows: number = 4) {
    return (
      <div>
        <label className="form-label">{label}</label>
        <textarea
          className="form-input resize-y min-h-[80px]"
          rows={rows}
          value={form[key] as string}
          onChange={(e) => updateField(key, e.target.value)}
        />
      </div>
    );
  }

  function renderNumberInput(label: string, key: keyof FormData, unit?: string) {
    return (
      <div>
        <label className="form-label">{label}{unit ? <span className="font-normal normal-case text-[#475569] ml-1">({unit})</span> : null}</label>
        <input
          type="number"
          className="form-input"
          value={form[key] as string}
          onChange={(e) => updateField(key, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">Clinical Pharmacotherapy Review</h1>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1 text-xs text-[#16A34A] font-medium">
              <Check size={14} /> Draft Saved
            </span>
          )}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="card !p-0 overflow-hidden">
        <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-[#E2E8F0]">
          {STEPS.map((label, i) => {
            const isActive = i === step;
            const isCompleted = i < step;
            return (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`relative py-3 px-2 text-center transition-colors ${
                  isActive
                    ? 'bg-[#2563EB] text-white'
                    : isCompleted
                    ? 'bg-[#F0F9FF] text-[#2563EB]'
                    : 'bg-white text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-[#2563EB]'
                      : isCompleted
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#E2E8F0] text-[#475569]'
                  }`}>
                    {isCompleted ? <Check size={10} /> : i + 1}
                  </span>
                  <span className="hidden md:inline text-[10px] font-semibold leading-tight">{label}</span>
                  <span className="md:hidden text-[10px] font-semibold">{i + 1}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="card space-y-6">
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Patient Identification &amp; Admission Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderInput('Patient Name', 'patientName')}
              {renderInput('Age', 'age', 'number')}
              {renderSelect('Sex', 'sex', [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }])}
              {renderInput('IP Number', 'ipNumber')}
              {renderInput('Ward', 'ward')}
              {renderInput('Bed', 'bed')}
              {renderInput('Residence', 'residence')}
              {renderInput('Date of Admission', 'dateOfAdmission', 'date')}
              {renderInput('Date of History Taking', 'dateOfHistoryTaking', 'date')}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Clinical Presentation</h2>
            <div className="space-y-4">
              {renderTextarea('Chief Complaint', 'chiefComplaint', 3)}
              {renderTextarea('History of Presenting Illness', 'historyOfPresentingIllness', 5)}
              {renderTextarea('Past Medical History', 'pastMedicalHistory', 4)}
              {renderTextarea('Medication History (pre-admission drugs only)', 'medicationHistory', 4)}
              {renderTextarea('Family History', 'familyHistory', 3)}
              {renderTextarea('Social History', 'socialHistory', 3)}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Systemic Review</h2>
            <div className="space-y-4">
              {SYSTEM_REVIEW_KEYS.map((key) => {
                const item = form.systemicReview[key];
                return (
                  <div key={key} className="form-section">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="text-sm font-bold text-[#0F172A] min-w-[140px]">{SYSTEM_REVIEW_LABELS[key]}</span>
                      <div className="flex gap-3">
                        {['normal', 'abnormal'].map((opt) => (
                          <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`sr-${key}`}
                              checked={item.status === opt}
                              onChange={() => updateSr(key, 'status', opt)}
                              className="text-[#2563EB] focus:ring-[#2563EB]"
                            />
                            <span className="text-sm text-[#475569] capitalize">{opt}</span>
                          </label>
                        ))}
                        <button
                          type="button"
                          onClick={() => updateSr(key, 'status', '')}
                          className="text-xs text-[#475569] hover:text-[#DC2626] underline"
                        >Clear</button>
                      </div>
                    </div>
                    {item.status === 'abnormal' && (
                      <textarea
                        className="form-input resize-y min-h-[60px]"
                        rows={2}
                        placeholder="Describe abnormality..."
                        value={item.notes}
                        onChange={(e) => updateSr(key, 'notes', e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Investigations &amp; Vitals</h2>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Vitals</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {renderNumberInput('HR', 'hr', 'bpm')}
                {renderNumberInput('BP', 'bp', 'mmHg')}
                {renderNumberInput('Temp', 'temp', '°C')}
                {renderNumberInput('PO₂', 'po2', '%')}
                {renderNumberInput('RR', 'rr', 'bpm')}
                {renderNumberInput('BMI', 'bmi', 'kg/m²')}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Electrolytes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {renderNumberInput('Na⁺', 'na', '135-145 mEq/L')}
                {renderNumberInput('K⁺', 'k', '3.5-5.0 mEq/L')}
                {renderNumberInput('Cl⁻', 'cl', '96-106 mEq/L')}
                {renderNumberInput('Urea', 'urea', '7-18 mg/dL')}
                {renderNumberInput('Creatinine', 'creatinine', '0.6-1.2 mg/dL')}
                {renderNumberInput('CrCl', 'crcl', 'mL/min')}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Hematology</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {renderNumberInput('WBC', 'wbc', '×10³/µL')}
                {renderNumberInput('Neutrophils', 'neutrophils', '%')}
                {renderNumberInput('Lymphocytes', 'lymphocytes', '%')}
                {renderNumberInput('Monocytes', 'monocytes', '%')}
                {renderNumberInput('Eosinophils', 'eosinophils', '%')}
                {renderNumberInput('Hb', 'hb', 'g/dL')}
                {renderNumberInput('MCV', 'mcv', 'fL')}
                {renderNumberInput('Platelets', 'platelets', '×10³/µL')}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Liver Function Tests</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {renderNumberInput('AST', 'ast', 'U/L')}
                {renderNumberInput('ALT', 'alt', 'U/L')}
                {renderNumberInput('ALP', 'alp', 'U/L')}
                {renderNumberInput('Total Bilirubin', 'totalBilirubin', 'mg/dL')}
                {renderNumberInput('Direct Bilirubin', 'directBilirubin', 'mg/dL')}
                {renderNumberInput('Albumin', 'albumin', 'g/dL')}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Other Investigations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderInput('CrAG', 'crag')}
                {renderInput('India Ink Test', 'indiaInk')}
                {renderInput('MPS', 'mps')}
                {renderInput('Urinalysis', 'urinalysis')}
                {renderInput('Chest X-ray', 'chestXray')}
                {renderInput('ECG / Echo (EF%)', 'ecgEcho')}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Problem List / Working Diagnosis</h2>
            {renderTextarea('List all working diagnoses', 'workingDiagnosis', 8)}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Current Management Plan</h2>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider">A) Pharmacological Management</h3>
                <button
                  type="button"
                  onClick={addDrugRow}
                  className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                >
                  <Plus size={14} /> Add Drug
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Drug (INN)</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Dosage Form</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Dose</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Frequency</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Start Date</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Duration</th>
                      <th className="py-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.drugRows.map((row, i) => (
                      <tr key={i} className="border-b border-[#E2E8F0]">
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.drug} onChange={(e) => updateDrugRow(i, 'drug', e.target.value)} placeholder="e.g. Amoxicillin" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.dosageForm} onChange={(e) => updateDrugRow(i, 'dosageForm', e.target.value)} placeholder="e.g. Capsule" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.dose} onChange={(e) => updateDrugRow(i, 'dose', e.target.value)} placeholder="e.g. 500mg" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.frequency} onChange={(e) => updateDrugRow(i, 'frequency', e.target.value)} placeholder="e.g. TDS" /></td>
                        <td className="py-1.5 pr-2"><input type="date" className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.startDate} onChange={(e) => updateDrugRow(i, 'startDate', e.target.value)} /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.duration} onChange={(e) => updateDrugRow(i, 'duration', e.target.value)} placeholder="e.g. 7 days" /></td>
                        <td className="py-1.5">
                          <button type="button" onClick={() => removeDrugRow(i)} className="text-[#DC2626] hover:text-[#B91C1C] transition-colors"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">B) Non-Pharmacological Management</h3>
              {renderTextarea('e.g. diet, physiotherapy, surgery', 'nonPharmacologicalManagement', 4)}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Pharmaceutical Care Plan</h2>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider">I) Pharmacological Interventions</h3>
                <button
                  type="button"
                  onClick={addInterventionRow}
                  className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                >
                  <Plus size={14} /> Add Intervention
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Medical Condition</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Drug Therapy Problem</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Goal</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Intervention</th>
                      <th className="py-2 pr-2 text-[10px] font-bold text-[#475569] uppercase">Follow-up Plan</th>
                      <th className="py-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.interventionRows.map((row, i) => (
                      <tr key={i} className="border-b border-[#E2E8F0]">
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.condition} onChange={(e) => updateInterventionRow(i, 'condition', e.target.value)} placeholder="Condition" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.drugProblem} onChange={(e) => updateInterventionRow(i, 'drugProblem', e.target.value)} placeholder="Drug problem" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.goal} onChange={(e) => updateInterventionRow(i, 'goal', e.target.value)} placeholder="Goal" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.intervention} onChange={(e) => updateInterventionRow(i, 'intervention', e.target.value)} placeholder="Intervention" /></td>
                        <td className="py-1.5 pr-2"><input className="w-full border-0 bg-transparent text-sm py-1 focus:outline-none focus:ring-0" value={row.followUp} onChange={(e) => updateInterventionRow(i, 'followUp', e.target.value)} placeholder="Follow-up" /></td>
                        <td className="py-1.5">
                          <button type="button" onClick={() => removeInterventionRow(i)} className="text-[#DC2626] hover:text-[#B91C1C] transition-colors"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">II) Non-Pharmacological Interventions</h3>
              {renderTextarea('e.g. lifestyle modification, dietary changes, counseling referrals', 'nonPharmacologicalInterventions', 4)}
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">III) Patient Monitoring</h3>
              {renderTextarea('Monitoring parameters, frequency of review, target outcomes', 'patientMonitoring', 4)}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">Patient Counselling Section</h2>
            <div>
              <label className="form-label">Counselling Notes</label>
              <textarea
                className="form-input resize-y min-h-[300px]"
                rows={14}
                placeholder="Document counselling provided to the patient regarding diagnosis, medications, lifestyle modifications, adverse effects to monitor, follow-up schedule, and any other relevant information..."
                value={form.patientCounselling}
                onChange={(e) => updateField('patientCounselling', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-secondary flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Previous
            </button>
          ) : (
            <div />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#475569] font-medium">Step {step + 1} of {STEPS.length}</span>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="btn-primary flex items-center gap-1"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveComplete}
              className="btn-primary flex items-center gap-1.5"
            >
              <Save size={16} /> Save &amp; Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
