import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HeartPulse, Stethoscope, Bug, FlaskConical, Activity, Droplets,
  BrainCircuit, FileText, Heart, Users, Siren, Scan, Eye,
  ChevronRight, ChevronLeft, Search, ClipboardCheck,
  LayoutDashboard, List, Clipboard, BookOpen, Home,
} from 'lucide-react';
import {
  getCarePlanSpecialties,
  getCarePlanForDisease,
} from '../data/carePlanData';

const ICON_MAP: Record<string, any> = {
  HeartPulse, Stethoscope, Bug, FlaskConical, Activity, Droplets,
  BrainCircuit, FileText, Heart, Users, Siren, Scan, Eye,
};

const COLOR_MAP: Record<string, string> = {
  red: 'from-red-500/10 to-red-500/20 border-red-200/40 text-red-600',
  sky: 'from-sky-500/10 to-sky-500/20 border-sky-200/40 text-sky-600',
  amber: 'from-amber-500/10 to-amber-500/20 border-amber-200/40 text-amber-600',
  violet: 'from-violet-500/10 to-violet-500/20 border-violet-200/40 text-violet-600',
  orange: 'from-orange-500/10 to-orange-500/20 border-orange-200/40 text-orange-600',
  blue: 'from-blue-500/10 to-blue-500/20 border-blue-200/40 text-blue-600',
  indigo: 'from-indigo-500/10 to-indigo-500/20 border-indigo-200/40 text-indigo-600',
  purple: 'from-purple-500/10 to-purple-500/20 border-purple-200/40 text-purple-600',
  pink: 'from-pink-500/10 to-pink-500/20 border-pink-200/40 text-pink-600',
  teal: 'from-teal-500/10 to-teal-500/20 border-teal-200/40 text-teal-600',
  slate: 'from-slate-500/10 to-slate-500/20 border-slate-200/40 text-slate-600',
  rose: 'from-rose-500/10 to-rose-500/20 border-rose-200/40 text-rose-600',
  fuchsia: 'from-fuchsia-500/10 to-fuchsia-500/20 border-fuchsia-200/40 text-fuchsia-600',
  cyan: 'from-cyan-500/10 to-cyan-500/20 border-cyan-200/40 text-cyan-600',
};

export default function CarePlanScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const specialtyId = params.specialtyId;
  const disease = params.disease;
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = getCarePlanSpecialties();

  // Level 3: Disease care plan view
  if (specialtyId && disease) {
    const decodedDisease = decodeURIComponent(disease);
    const carePlan = getCarePlanForDisease(decodedDisease);
    if (carePlan) {
      return (
        <CarePlanDetail
          carePlan={carePlan}
          onBack={() => navigate(`/care-plan/${specialtyId}`)}
          onBackToLanding={() => navigate('/care-plan')}
        />
      );
    }
    return (
      <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <p className="text-[var(--text-muted)]">Care plan not yet available for "{decodedDisease}".</p>
          <button onClick={() => navigate(`/care-plan/${specialtyId}`)} className="mt-4 text-[var(--primary)] text-sm font-semibold hover:underline">
            Back to {specialtyId}
          </button>
        </div>
      </div>
    );
  }

  // Level 2: Specialty diseases list
  if (specialtyId) {
    const specialty = specialties.find(s => s.id === specialtyId);
    if (!specialty) return null;
    const diseases = specialty.diseases;
    const filtered = searchQuery
      ? diseases.filter(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
      : diseases;

    return (
      <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Back + breadcrumb */}
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/care-plan')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer">
              <ChevronLeft size={14} /> Back
            </button>
            <span className="text-sm text-[var(--text-muted)]">
              <button onClick={() => navigate('/care-plan')} className="hover:text-[var(--primary)] transition-colors">Care Plan</button>
              <ChevronRight size={14} className="inline mx-1" />
              <span className="text-[var(--text)] font-semibold">{specialty.title}</span>
            </span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
                <ClipboardCheck size={16} /> {specialty.title}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
                {specialty.title}
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">{specialty.description}</p>
            </div>
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="Search diseases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>
          </div>

          {/* Disease Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((d) => {
              const hasPlan = !!getCarePlanForDisease(d);
              return (
                <div
                  key={d}
                  onClick={() => navigate(`/care-plan/${specialtyId}/${encodeURIComponent(d)}`)}
                  className={`bg-[var(--surface)] border rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex flex-col h-full relative ${
                    hasPlan
                      ? 'border-[var(--border)] hover:border-[var(--primary)]'
                      : 'border-[var(--border)]/50 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-base text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-tight pr-6">{d}</h3>
                    <ChevronRight size={18} className="text-[var(--border)] group-hover:translate-x-1 group-hover:text-[var(--primary)] transition-all shrink-0 mt-0.5" />
                  </div>
                  {hasPlan ? (
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-auto">
                      Full nursing care plan with diagnoses, interventions, and discharge planning.
                    </p>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)]/60 italic mt-auto">
                      Care plan coming soon.
                    </p>
                  )}
                  {hasPlan && (
                    <div className="absolute top-4 right-12 w-2 h-2 rounded-full bg-emerald-500" title="Care plan available" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Level 1: Specialty landing
  const filteredSpecialties = searchQuery
    ? specialties.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.diseases.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : specialties;

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <ClipboardCheck size={16} /> Care Plan
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Nursing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Care Plans</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
              Evidence-based nursing care plans for every clinical area — assessments, NANDA diagnoses, NIC interventions, and discharge planning.
            </p>
          </div>
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search specialties or diseases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
        </div>

        {/* Specialty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSpecialties.map((spec) => {
            const Icon = ICON_MAP[spec.icon] || ClipboardCheck;
            const colorClass = COLOR_MAP[spec.color] || COLOR_MAP['indigo'];
            const availableCount = spec.diseases.filter(d => !!getCarePlanForDisease(d)).length;
            return (
              <div
                key={spec.id}
                onClick={() => navigate(`/care-plan/${spec.id}`)}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${colorClass}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors whitespace-normal break-words">{spec.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{spec.diseases.length} diseases · {availableCount} plans</p>
                  </div>
                  <ChevronRight size={18} className="text-[var(--border)] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-auto">{spec.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Care Plan Detail View ─────────────────────────────────────────

function CarePlanDetail({
  carePlan,
  onBack,
  onBackToLanding,
}: {
  carePlan: any;
  onBack: () => void;
  onBackToLanding: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnoses' | 'interventions' | 'education' | 'discharge'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'diagnoses' as const, label: 'Diagnoses & Goals', icon: List },
    { id: 'interventions' as const, label: 'Interventions', icon: Clipboard },
    { id: 'education' as const, label: 'Patient Education', icon: BookOpen },
    { id: 'discharge' as const, label: 'Discharge', icon: Home },
  ];

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <button onClick={onBackToLanding} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer">
            <ChevronLeft size={14} /> Care Plan
          </button>
          <span className="text-sm text-[var(--text-muted)]">
            <button onClick={onBackToLanding} className="hover:text-[var(--primary)] transition-colors">Care Plan</button>
            <ChevronRight size={14} className="inline mx-1" />
            <button onClick={onBack} className="hover:text-[var(--primary)] transition-colors">{carePlan.specialty}</button>
            <ChevronRight size={14} className="inline mx-1" />
            <span className="text-[var(--text)] font-semibold">{carePlan.disease}</span>
          </span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">{carePlan.disease}</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{carePlan.overview}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--surface)] p-1 rounded-2xl border border-[var(--border)] overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)]'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="pb-24">
          {activeTab === 'overview' && <OverviewTab plan={carePlan} />}
          {activeTab === 'diagnoses' && <DiagnosesTab plan={carePlan} />}
          {activeTab === 'interventions' && <InterventionsTab plan={carePlan} />}
          {activeTab === 'education' && <EducationTab plan={carePlan} />}
          {activeTab === 'discharge' && <DischargeTab plan={carePlan} />}
        </div>
      </div>
    </div>
  );
}

// ── Tab Components ────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 sm:p-6">
      <h3 className="text-sm font-bold text-[var(--text)] mb-3 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function OverviewTab({ plan }: { plan: any }) {
  return (
    <div className="space-y-4">
      {/* Pathophysiology */}
      <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-blue-500 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" /> Pathophysiology
        </h3>
        <p className="text-sm text-[var(--text)] leading-relaxed">{plan.pathophysiology}</p>
      </div>

      {plan.commonCauses && (
        <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-amber-500 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-black text-amber-600 dark:text-amber-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Common Causes
          </h3>
          <ul className="space-y-2">
            {plan.commonCauses.map((c: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)] bg-amber-500/5 border border-amber-500/20 rounded-xl p-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {plan.riskFactors && (
        <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-purple-500 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-black text-purple-600 dark:text-purple-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Risk Factors
          </h3>
          <ul className="space-y-2">
            {plan.riskFactors.map((r: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)] bg-purple-500/5 border border-purple-500/20 rounded-xl p-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-cyan-500 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-black text-cyan-600 dark:text-cyan-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" /> Subjective Data
          </h3>
          <ul className="space-y-2">
            {plan.subjectiveData.map((s: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)] bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-emerald-500 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-black text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Objective Data
          </h3>
          <ul className="space-y-2">
            {plan.objectiveData.map((o: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)] bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {plan.complications && (
        <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-rose-500 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-black text-rose-600 dark:text-rose-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Potential Complications
          </h3>
          <div className="flex flex-wrap gap-2">
            {plan.complications.map((c: string, i: number) => (
              <span key={i} className="px-3 py-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold shadow-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {plan.nursingNotes && (
        <div className="bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-amber-500 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-black text-amber-600 dark:text-amber-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Nursing Notes
          </h3>
          <ul className="space-y-2">
            {plan.nursingNotes.map((n: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text)] bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5">
                <span className="text-amber-600 shrink-0 mt-0.5 font-bold">💡</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DiagnosesTab({ plan }: { plan: any }) {
  return (
    <div className="space-y-4">
      {plan.nursingDiagnoses.map((dx: any, i: number) => (
        <div key={dx.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-sm font-bold shrink-0">
              {i + 1}
            </span>
            <div>
              <h4 className="font-bold text-[var(--text)]">{dx.diagnosis}</h4>
              {dx.relatedFactors && (
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  <span className="font-semibold">Related to:</span> {dx.relatedFactors.join(', ')}
                </p>
              )}
            </div>
          </div>
          {dx.definingCharacteristics && (
            <div className="ml-11">
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Defining Characteristics</p>
              <div className="flex flex-wrap gap-1.5">
                {dx.definingCharacteristics.map((dc: string, j: number) => (
                  <span key={j} className="px-2 py-0.5 bg-[var(--surface-dim)] rounded-lg text-xs text-[var(--text-muted)]">
                    {dc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Goals */}
      <SectionCard title="Expected Outcomes / Goals">
        <div className="space-y-3">
          {plan.goals.map((g: any) => (
            <div key={g.id} className="border-l-4 border-emerald-500 pl-4 py-2">
              {g.shortTerm && (
                <p className="text-sm text-[var(--text)]">
                  <span className="font-bold text-emerald-600">Short-term:</span> {g.shortTerm}
                </p>
              )}
              {g.longTerm && (
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  <span className="font-bold text-emerald-600">Long-term:</span> {g.longTerm}
                </p>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Evaluation */}
      <SectionCard title="Evaluation Criteria">
        <div className="space-y-2">
          {plan.evaluation.map((e: any) => (
            <div key={e.id} className="flex items-start gap-2 text-sm text-[var(--text-muted)] bg-emerald-500/5 border border-emerald-200/30 rounded-xl p-3">
              <span className="text-emerald-600 shrink-0">✓</span>
              {e.expected}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function InterventionsTab({ plan }: { plan: any }) {
  const catColors: Record<string, string> = {
    independent: 'bg-blue-500/10 text-blue-600 border-blue-200/40',
    dependent: 'bg-amber-500/10 text-amber-600 border-amber-200/40',
    collaborative: 'bg-purple-500/10 text-purple-600 border-purple-200/40',
  };

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(catColors).map(([cat, cls]) => (
          <span key={cat} className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${cls}`}>
            {cat}
          </span>
        ))}
      </div>

      {plan.interventions.map((iv: any) => (
        <div key={iv.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase shrink-0 mt-0.5 border ${catColors[iv.category] || catColors.independent}`}>
              {iv.category}
            </span>
            <div className="flex-1">
              <p className="text-sm text-[var(--text)] leading-relaxed">{iv.action}</p>
              {iv.rationale && (
                <p className="text-xs text-[var(--text-muted)] mt-2 italic bg-[var(--surface-dim)] rounded-lg p-2.5">
                  <span className="font-semibold not-italic">Rationale:</span> {iv.rationale}
                </p>
              )}
              {iv.frequency && (
                <p className="text-xs text-[var(--text-muted)] mt-1.5">
                  <span className="font-semibold">Frequency:</span> {iv.frequency}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationTab({ plan }: { plan: any }) {
  return (
    <div className="space-y-4">
      {plan.patientEducation.map((edu: any, i: number) => (
        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 sm:p-6">
          <h4 className="font-bold text-[var(--text)] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-xs font-bold">{i + 1}</span>
            {edu.topic}
          </h4>
          <ul className="space-y-2 ml-8">
            {edu.keyPoints.map((kp: string, j: number) => (
              <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                {kp}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DischargeTab({ plan }: { plan: any }) {
  const dp = plan.dischargePlanning;
  return (
    <div className="space-y-4">
      <SectionCard title="Discharge Checklist">
        <ul className="space-y-2">
          {dp.checklist.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <span className="w-5 h-5 rounded-lg border-2 border-[var(--border)] shrink-0 mt-0.5 flex items-center justify-center text-[10px] text-[var(--text-muted)]">☐</span>
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Follow-up">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{dp.followUp}</p>
      </SectionCard>

      {dp.referrals && dp.referrals.length > 0 && (
        <SectionCard title="Referrals">
          <div className="flex flex-wrap gap-2">
            {dp.referrals.map((r: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-600 border border-purple-200/40 rounded-full text-xs font-semibold">
                {r}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title="Warning Signs — Seek Immediate Help">
        <ul className="space-y-2">
          {dp.warningSigns.map((ws: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-rose-600 bg-rose-500/5 border border-rose-200/30 rounded-xl p-3">
              <span className="shrink-0 mt-0.5">⚠</span>
              {ws}
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
