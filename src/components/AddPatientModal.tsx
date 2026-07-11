import { useState } from 'react';
import { X, UserPlus, Loader2, CheckCircle2 } from 'lucide-react';
import { SPECIALTIES } from '../data/clinicalCasesData';
import { ClinicalCaseService, type AddCaseInput, type CaseDifficulty } from '../services/clinicalCase.service';

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (created: AddCaseInput & { id?: string }) => void;
}

const DIFFICULTIES: CaseDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

const EMPTY = {
  patientName: '',
  demographics: '',
  facilitySetting: '',
  specialty: SPECIALTIES[0] ?? '',
  disease: '',
  difficulty: 'Beginner' as CaseDifficulty,
  chiefComplaint: '',
  hpi: '',
  diagnosis: '',
  pharm: '',
  nonPharm: '',
  carePlan: '',
  monitoring: '',
  counselling: '',
  followUp: '',
  pearls: '',
};

export default function AddPatientModal({ open, onClose, onCreated }: AddPatientModalProps) {
  const [form, setForm] = useState({ ...EMPTY });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const reset = () => {
    setForm({ ...EMPTY });
    setError(null);
    setSuccess(false);
    setSubmitting(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName.trim() || !form.specialty.trim() || !form.disease.trim()) {
      setError('Patient name, specialty, and disease are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const input: AddCaseInput = {
        title: `${form.patientName} — ${form.disease}`,
        specialty: form.specialty,
        disease: form.disease,
        difficulty: form.difficulty,
        patientName: form.patientName,
        demographics: form.demographics,
        facilitySetting: form.facilitySetting,
        chiefComplaint: form.chiefComplaint,
        hpi: form.hpi,
        diagnosis: form.diagnosis,
        pharm: form.pharm,
        nonPharm: form.nonPharm,
        carePlan: form.carePlan,
        monitoring: form.monitoring,
        counselling: form.counselling,
        followUp: form.followUp,
        pearls: form.pearls,
      };
      const created = await ClinicalCaseService.addCase(input);
      setSuccess(true);
      onCreated({ ...input, id: created.id });
      setTimeout(() => {
        handleClose();
      }, 900);
    } catch (err: any) {
      setError(err?.message || 'Could not save the patient case. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    key: keyof typeof form,
    label: string,
    placeholder: string,
    textarea = false
  ) => (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={form[key] as string}
          onChange={(e) => set(key, e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
        />
      ) : (
        <input
          type="text"
          value={form[key] as string}
          onChange={(e) => set(key, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl w-full max-w-2xl my-8 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center text-[var(--primary)]">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">Add Patient Case</h2>
              <p className="text-xs text-[var(--text-muted)]">Create a new clinical case for study</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] transition-colors"
          >
            <X size={18} className="text-[var(--text)]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('patientName', 'Patient Name *', 'e.g. J. K. C.')}
            {field('demographics', 'Demographics', 'e.g. 58, Male')}
            {field('facilitySetting', 'Facility / Setting', 'e.g. Ward 4, ICU')}
            {field('disease', 'Disease *', 'e.g. Type 2 Diabetes Mellitus')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] mb-1">
                Specialty *
              </label>
              <select
                value={form.specialty}
                onChange={(e) => set('specialty', e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[var(--text-muted)] mb-1">
                Difficulty
              </label>
              <select
                value={form.difficulty}
                onChange={(e) => set('difficulty', e.target.value as CaseDifficulty)}
                className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {field('chiefComplaint', 'Chief Complaint', 'e.g. Shortness of breath for 3 days')}
          {field('hpi', 'History of Presenting Illness', 'Relevant history and examination findings…', true)}
          {field('diagnosis', 'Diagnosis', 'Confirmed / working diagnosis', true)}
          {field('pharm', 'Pharmacological Management', 'Key drug therapy…', true)}
          {field('nonPharm', 'Non-Pharmacological Management', 'Lifestyle, procedures…', true)}
          {field('carePlan', 'Comprehensive Care Plan', 'Overall plan…', true)}
          {field('monitoring', 'Monitoring Parameters', 'What to monitor…', true)}
          {field('counselling', 'Patient Counselling', 'Advice given…', true)}
          {field('followUp', 'Follow-up', 'Review plan…', true)}
          {field('pearls', 'Clinical Pearls', 'Key learning points…', true)}

          {error && (
            <div className="text-sm text-rose-600 font-medium bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-dim)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving…
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={16} /> Saved
                </>
              ) : (
                <>
                  <UserPlus size={16} /> Create Case
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
