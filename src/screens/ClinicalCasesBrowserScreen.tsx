import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse, Search, Filter, ChevronRight, Clock, Award,
  BookOpen, BrainCircuit, Sparkles, Stethoscope, AlertCircle,
  ChevronLeft, FileText, Pill, FlaskConical, Syringe, X, List,
} from 'lucide-react';
import {
  CLINICAL_CASES,
  getAllSpecialties,
  getCaseStats,
  searchCases,
} from '../data/clinicalCases';
import type { ClinicalCase } from '../types/knowledge';

const SPECIALTY_ICONS: Record<string, any> = {
  Cardiology: HeartPulse,
  'Infectious Diseases': FlaskConical,
  Neurology: BrainCircuit,
  'Internal Medicine': Stethoscope,
  Pediatrics: Award,
  Obstetrics: Syringe,
  'Clinical Pharmacy': Pill,
};

const DIFFICULTY_COLORS: Record<string, string> = {
  basic: 'text-emerald-600 bg-emerald-500/10 border-emerald-200/40',
  intermediate: 'text-amber-600 bg-amber-500/10 border-amber-200/40',
  advanced: 'text-red-600 bg-red-500/10 border-red-200/40',
};

export default function ClinicalCasesBrowserScreen() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const stats = useMemo(() => getCaseStats(), []);
  const specialties = useMemo(() => ['All', ...getAllSpecialties()], []);

  const filteredCases = useMemo(() => {
    let cases = CLINICAL_CASES;
    if (searchQuery) {
      cases = searchCases(searchQuery);
    }
    if (selectedSpecialty !== 'All') {
      cases = cases.filter(c => c.specialty === selectedSpecialty);
    }
    return cases;
  }, [searchQuery, selectedSpecialty]);

  if (selectedCase) {
    return (
      <CaseDetailView
        caseData={selectedCase}
        onBack={() => setSelectedCase(null)}
      />
    );
  }

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <HeartPulse size={16} /> Clinical Case Repository
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Medical & Pharmacy Case Library
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl">
              Evidence-based clinical cases across {stats.total} specialties with structured educational content for teaching and revision.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
                <HeartPulse size={20} />
              </div>
              <div className="text-2xl font-black text-[var(--text)]">{stats.total}</div>
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)]">Total Clinical Cases</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div className="text-2xl font-black text-[var(--text)]">{Object.keys(stats.bySpecialty).length}</div>
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)]">Specialties Covered</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div className="text-2xl font-black text-[var(--text)]">
                {stats.byDifficulty.basic + stats.byDifficulty.intermediate}
              </div>
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)]">Basic/Intermediate</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <BrainCircuit size={20} />
              </div>
              <div className="text-2xl font-black text-[var(--text)]">{stats.byDifficulty.advanced}</div>
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)]">Advanced Cases</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search cases by title, specialty, diagnosis, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedSpecialty === spec
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
              }`}
            >
              {spec} {spec !== 'All' && `(${stats.bySpecialty[spec] || 0})`}
            </button>
          ))}
        </div>

        {/* Case Cards */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCases.map((caseData) => {
              const SpecIcon = SPECIALTY_ICONS[caseData.specialty] || Stethoscope;
              return (
                <div
                  key={caseData.id}
                  onClick={() => setSelectedCase(caseData)}
                  className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
                        <SpecIcon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[var(--text)] line-clamp-2 leading-tight">
                          {caseData.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)]">{caseData.specialty}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-[var(--border)] shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3 leading-relaxed">
                    {caseData.patientPresentation}
                  </p>

                  <div className="mt-auto flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase border ${DIFFICULTY_COLORS[caseData.difficulty]}`}>
                      {caseData.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] font-semibold">
                      <Clock size={12} /> {caseData.estimatedStudyMinutes} min
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                      {caseData.pharmacologicalManagement.length} meds
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">No matching cases found</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// CASE DETAIL VIEW
// ==========================================
function CaseDetailView({ caseData, onBack }: { caseData: ClinicalCase; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'management' | 'educational'>('overview');

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          <ChevronLeft size={18} /> Back to Case Library
        </button>

        {/* Case Title & Meta */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
              <HeartPulse size={28} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-[var(--text)] mb-1">{caseData.title}</h1>
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <span className="font-semibold">{caseData.specialty}</span>
                <span>&bull;</span>
                <span>{caseData.discipline}</span>
                {caseData.subSpecialty && (
                  <>
                    <span>&bull;</span>
                    <span>{caseData.subSpecialty}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase border ${DIFFICULTY_COLORS[caseData.difficulty]}`}>
                {caseData.difficulty}
              </span>
              <span className="px-3 py-1.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-muted)] flex items-center gap-1">
                <Clock size={14} /> {caseData.estimatedStudyMinutes} min
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseData.tags.slice(0, 8).map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-[var(--surface-dim)] border border-[var(--border)] rounded-lg text-[10px] font-bold text-[var(--text-muted)] uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-[var(--border)] gap-2 no-scrollbar">
          {[
            { id: 'overview', label: 'Clinical Overview', icon: Stethoscope },
            { id: 'management', label: 'Management & Treatment', icon: Pill },
            { id: 'educational', label: 'Learning & Teaching', icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Patient Presentation */}
            <Section title="Patient Presentation" icon={Stethoscope}>
              <p className="text-sm text-[var(--text)] leading-relaxed">{caseData.patientPresentation}</p>
            </Section>

            {/* History */}
            <Section title="History" icon={FileText}>
              <p className="text-sm text-[var(--text)] leading-relaxed">{caseData.history}</p>
            </Section>

            {/* Examination */}
            <Section title="Physical Examination" icon={Stethoscope}>
              <p className="text-sm text-[var(--text)] leading-relaxed">{caseData.examination}</p>
            </Section>

            {/* Differential Diagnoses */}
            <Section title="Differential Diagnoses" icon={List}>
              <ul className="space-y-2">
                {caseData.differentialDiagnoses.map((dd, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--surface-dim)] text-[var(--text-muted)] flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-[var(--text)]">{dd}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Investigations */}
            <Section title="Investigations" icon={FlaskConical}>
              <div className="space-y-3">
                {caseData.investigations.map((inv, i) => (
                  <div key={i} className="border border-[var(--border)] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[var(--text)]">{inv.name}</span>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] bg-[var(--surface-dim)] px-2 py-0.5 rounded">
                        {inv.type}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">{inv.findings}</p>
                    {inv.isKeyFinding && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-1 rounded-lg w-fit">
                        <AlertCircle size={12} /> Key Diagnostic Finding
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* Diagnosis */}
            <Section title="Final Diagnosis" icon={Award}>
              <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-4">
                <p className="text-sm font-bold text-[var(--text)]">{caseData.diagnosis}</p>
              </div>
            </Section>
          </div>
        )}

        {activeTab === 'management' && (
          <div className="space-y-6">
            {/* Pharmacological Management */}
            <Section title="Pharmacological Management" icon={Pill}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-xs font-bold text-[var(--text-muted)] uppercase">
                      <th className="px-4 py-3 text-left">Drug</th>
                      <th className="px-4 py-3 text-left">Dose</th>
                      <th className="px-4 py-3 text-left">Route</th>
                      <th className="px-4 py-3 text-left">Frequency</th>
                      <th className="px-4 py-3 text-left">Duration</th>
                      <th className="px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {caseData.pharmacologicalManagement.map((med, i) => (
                      <tr key={i} className="hover:bg-[var(--surface-dim)] transition-colors">
                        <td className="px-4 py-3 font-bold text-[var(--text)]">
                          {med.drug}
                          {med.isFirstLine && (
                            <span className="ml-2 text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded font-bold">
                              First-line
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[var(--text)]">{med.dose}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)]">{med.route}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)]">{med.frequency}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)]">{med.duration}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{med.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Non-pharmacological Management */}
            <Section title="Non-Pharmacological Management" icon={Syringe}>
              <ul className="space-y-2">
                {caseData.nonPharmacologicalManagement.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                    <span className="text-[var(--text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Monitoring */}
            <Section title="Monitoring & Follow-up" icon={AlertCircle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Monitoring Parameters</h4>
                  <ul className="space-y-1.5">
                    {caseData.monitoring.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--text)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Follow-up Plan</h4>
                  <p className="text-xs text-[var(--text)] leading-relaxed">{caseData.followUp}</p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {activeTab === 'educational' && (
          <div className="space-y-6">
            {/* Learning Objectives */}
            <Section title="Learning Objectives" icon={Award}>
              <ul className="space-y-2">
                {caseData.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-[var(--text)]">{obj}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Clinical Pearls */}
            <Section title="Clinical Pearls" icon={BrainCircuit}>
              <div className="space-y-3">
                {caseData.clinicalPearls.map((pearl, i) => (
                  <div key={i} className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
                    <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[var(--text)]">{pearl}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* References */}
            <Section title="References & Source" icon={BookOpen}>
              <div className="space-y-2">
                <p className="text-xs text-[var(--text-muted)]">
                  Source: <strong>{caseData.source.name}</strong>
                  {caseData.source.url && (
                    <> &mdash; <a href={caseData.source.url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">{caseData.source.url}</a></>
                  )}
                </p>
                {caseData.source.attribution && (
                  <p className="text-xs text-[var(--text-muted)]">Attribution: {caseData.source.attribution}</p>
                )}
                <p className="text-xs text-[var(--text-muted)]">License: {caseData.source.license}</p>
                <div className="mt-4 space-y-1">
                  {caseData.references.map((ref, i) => (
                    <p key={i} className="text-xs text-[var(--text-muted)]">{ref}</p>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// REUSABLE SECTION COMPONENT
// ==========================================
function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-[var(--text)] mb-4 flex items-center gap-2 pb-3 border-b border-[var(--border)]/40">
        <Icon size={18} className="text-[var(--primary)]" />
        {title}
      </h3>
      {children}
    </div>
  );
}
