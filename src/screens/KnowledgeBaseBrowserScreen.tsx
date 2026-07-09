import React, { useState, useMemo, useEffect } from 'react';
import {
  Database, Search, Filter, BookOpen, Pill, FlaskConical,
  Dna, Beaker, Activity, HeartPulse, Bug, BrainCircuit,
  Globe, Award, ChevronRight, Clock, Bookmark, Download,
  FileText, ExternalLink, Sparkles, AlertCircle, CheckCircle2,
} from 'lucide-react';
import {
  DISCIPLINES,
  SUB_DISCIPLINES,
  DOCUMENT_TYPES,
  DISCIPLINE_MODULE_MAP,
  type Discipline,
  type DocumentType,
  type ResourceSource,
} from '../types/knowledge';

const DISCIPLINE_CONFIG: Record<Discipline, { icon: any; color: string; description: string }> = {
  Pharmacy: { icon: Pill, color: 'from-emerald-500/10 to-emerald-500/20 text-emerald-600 border-emerald-200/40', description: 'Clinical and community pharmacy practice, pharmacovigilance, drug information' },
  Pharmacology: { icon: Beaker, color: 'from-blue-500/10 to-blue-500/20 text-blue-600 border-blue-200/40', description: 'Drug actions, mechanisms, pharmacokinetics, and therapeutics' },
  Pharmaceutics: { icon: FlaskConical, color: 'from-amber-500/10 to-amber-500/20 text-amber-600 border-amber-200/40', description: 'Dosage forms, drug delivery systems, and manufacturing' },
  'Pharmaceutical Chemistry': { icon: Beaker, color: 'from-orange-500/10 to-orange-500/20 text-orange-600 border-orange-200/40', description: 'Drug design, synthesis, and structure-activity relationships' },
  'Organic Chemistry': { icon: FlaskConical, color: 'from-yellow-500/10 to-yellow-500/20 text-yellow-600 border-yellow-200/40', description: 'Reaction mechanisms, spectroscopy, functional groups' },
  'Pharmaceutical Analysis': { icon: Beaker, color: 'from-cyan-500/10 to-cyan-500/20 text-cyan-600 border-cyan-200/40', description: 'Instrumental analysis, chromatography, quality control' },
  Pharmacognosy: { icon: Dna, color: 'from-green-500/10 to-green-500/20 text-green-600 border-green-200/40', description: 'Medicinal plants, herbal medicines, natural products' },
  Biochemistry: { icon: Dna, color: 'from-indigo-500/10 to-indigo-500/20 text-indigo-600 border-indigo-200/40', description: 'Molecular biology, metabolism, enzymology' },
  Physiology: { icon: Activity, color: 'from-rose-500/10 to-rose-500/20 text-rose-600 border-rose-200/40', description: 'Human body function across all organ systems' },
  Anatomy: { icon: Activity, color: 'from-violet-500/10 to-violet-500/20 text-violet-600 border-violet-200/40', description: 'Gross and microscopic structure of the human body' },
  Pathology: { icon: AlertCircle, color: 'from-red-500/10 to-red-500/20 text-red-600 border-red-200/40', description: 'Disease mechanisms, histopathology, clinical pathology' },
  Microbiology: { icon: Bug, color: 'from-teal-500/10 to-teal-500/20 text-teal-600 border-teal-200/40', description: 'Bacteria, viruses, fungi, parasites, and immunology' },
  'Clinical Medicine': { icon: HeartPulse, color: 'from-red-500/10 to-red-500/20 text-red-600 border-red-200/40', description: 'Internal medicine, surgery, pediatrics, obstetrics, psychiatry' },
  Diagnostics: { icon: Activity, color: 'from-sky-500/10 to-sky-500/20 text-sky-600 border-sky-200/40', description: 'Laboratory medicine, radiology, clinical chemistry' },
  'Public Health': { icon: Globe, color: 'from-emerald-500/10 to-emerald-500/20 text-emerald-600 border-emerald-200/40', description: 'Epidemiology, biostatistics, health promotion, global health' },
  Research: { icon: BrainCircuit, color: 'from-purple-500/10 to-purple-500/20 text-purple-600 border-purple-200/40', description: 'EBM, clinical trials, scientific writing, critical appraisal' },
  Nursing: { icon: Award, color: 'from-pink-500/10 to-pink-500/20 text-pink-600 border-pink-200/40', description: 'Fundamentals, medical-surgical, pediatric, mental health nursing' },
  Dentistry: { icon: Award, color: 'from-amber-500/10 to-amber-500/20 text-amber-600 border-amber-200/40', description: 'Oral medicine, oral surgery, preventive dentistry' },
  Nutrition: { icon: BookOpen, color: 'from-lime-500/10 to-lime-500/20 text-lime-600 border-lime-200/40', description: 'Clinical nutrition, dietetics, community nutrition' },
};

const DOCUMENT_TYPE_BADGES: Record<DocumentType, string> = {
  Textbook: 'bg-blue-500/10 text-blue-600 border-blue-200/40',
  'Textbook Chapter': 'bg-indigo-500/10 text-indigo-600 border-indigo-200/40',
  'Lecture Notes': 'bg-amber-500/10 text-amber-600 border-amber-200/40',
  'Clinical Guideline': 'bg-emerald-500/10 text-emerald-600 border-emerald-200/40',
  'Research Article': 'bg-purple-500/10 text-purple-600 border-purple-200/40',
  'Review Article': 'bg-violet-500/10 text-violet-600 border-violet-200/40',
  'Case Report': 'bg-rose-500/10 text-rose-600 border-rose-200/40',
  'Clinical Case': 'bg-red-500/10 text-red-600 border-red-200/40',
  'Reference Manual': 'bg-slate-500/10 text-slate-600 border-slate-200/40',
  'Drug Monograph': 'bg-cyan-500/10 text-cyan-600 border-cyan-200/40',
  'Study Guide': 'bg-orange-500/10 text-orange-600 border-orange-200/40',
  'MCQ Bank': 'bg-pink-500/10 text-pink-600 border-pink-200/40',
  'OSCE Guide': 'bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-200/40',
  'Flashcard Deck': 'bg-yellow-500/10 text-yellow-600 border-yellow-200/40',
  'Formulary': 'bg-teal-500/10 text-teal-600 border-teal-200/40',
  'Presentation Slide': 'bg-sky-500/10 text-sky-600 border-sky-200/40',
  'Lab Manual': 'bg-lime-500/10 text-lime-600 border-lime-200/40',
  Other: 'bg-gray-500/10 text-gray-600 border-gray-200/40',
};

export default function KnowledgeBaseBrowserScreen() {
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter resources based on search and discipline
  const filteredResources = useMemo(() => {
    let list = resources;
    if (activeDiscipline) {
      list = list.filter((r) => r.discipline === activeDiscipline);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.tags?.some((t: string) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [resources, activeDiscipline, searchQuery]);

  // Fetch resources from API
  const fetchResources = async (discipline?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (discipline && discipline !== 'All') params.set('discipline', discipline);
      params.set('limit', '100');
      const res = await fetch(`/api/knowledge-base/search?${params}`);
      const data = await res.json();
      if (data.success) {
        setResources(data.results.map((r: any) => r.resource));
      }
    } catch (err) {
      console.warn('API fetch failed, using demo data:', err);
      // Fallback to discipline data for display
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeDiscipline) {
      fetchResources(activeDiscipline);
    } else {
      fetchResources();
    }
  }, [activeDiscipline]);

  if (activeDiscipline) {
    return (
      <DisciplineDetailView
        discipline={activeDiscipline}
        resources={filteredResources}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBack={() => {
          setActiveDiscipline(null);
          setSearchQuery('');
        }}
        onRefresh={() => fetchResources(activeDiscipline)}
      />
    );
  }

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Database size={16} /> Knowledge Base Library
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Open Medical & Pharmacy Library
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl">
              Freely available textbooks, lecture notes, clinical guidelines, and educational resources
              across 19 medical and pharmaceutical disciplines. All resources are open-access or public domain.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search all disciplines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        {/* Explanation Banner */}
        <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text)] mb-1">Clinova Open Knowledge Initiative</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                This library aggregates freely redistributable educational resources from NCBI Bookshelf, WHO,
                CDC, NIH, OpenStax, and other open-access repositories. Click any discipline below to start browsing.
                Resources are automatically classified, deduplicated, and linked to the Education Hub.
              </p>
            </div>
          </div>
        </div>

        {/* Discipline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DISCIPLINES.map((discipline) => {
            const config = DISCIPLINE_CONFIG[discipline];
            const Icon = config.icon;
            const subCount = SUB_DISCIPLINES[discipline]?.length || 0;
            return (
              <div
                key={discipline}
                onClick={() => setActiveDiscipline(discipline)}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-sm">
                      {discipline}
                    </h3>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      {subCount} sub-disciplines
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-[var(--border)] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {config.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Source Footer */}
        <div className="text-center py-6 border-t border-[var(--border)]/40">
          <p className="text-xs text-[var(--text-muted)]">
            Resources sourced from freely available open-access repositories, government publications, and Creative Commons licensed materials.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DISCIPLINE DETAIL VIEW
// ==========================================
function DisciplineDetailView({
  discipline,
  resources,
  loading,
  searchQuery,
  onSearchChange,
  onBack,
  onRefresh,
}: {
  discipline: Discipline;
  resources: any[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onBack: () => void;
  onRefresh: () => void;
}) {
  const config = DISCIPLINE_CONFIG[discipline];
  const Icon = config.icon;
  const subDisciplines = SUB_DISCIPLINES[discipline] || [];
  const moduleId = DISCIPLINE_MODULE_MAP[discipline];

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back & Header */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          All Disciplines
        </button>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
              <Icon size={32} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-[var(--text)]">{discipline}</h1>
              <p className="text-sm text-[var(--text-muted)]">{config.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="px-3 py-1.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-muted)]">
                {subDisciplines.length} Topics
              </span>
              {moduleId && (
                <span className="px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-xl text-xs font-bold">
                  In Education Hub
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sub-disciplines */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {subDisciplines.map((sub) => (
            <button
              key={sub}
              className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--text)] whitespace-nowrap transition-all shrink-0"
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            placeholder={`Search within ${discipline}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        {/* Resources List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin" />
          </div>
        ) : resources.length > 0 ? (
          <div className="space-y-3">
            {resources.map((res, idx) => (
              <div
                key={res.id || idx}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text)] mb-1">{res.title}</h3>
                    {res.description && (
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">{res.description}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${DOCUMENT_TYPE_BADGES[res.documentType as DocumentType] || DOCUMENT_TYPE_BADGES.Other}`}>
                        {res.documentType || 'Resource'}
                      </span>
                      {res.source?.name && (
                        <span className="px-2 py-0.5 bg-[var(--surface-dim)] rounded text-[10px] font-bold text-[var(--text-muted)]">
                          {res.source.name}
                        </span>
                      )}
                      {res.year && (
                        <span className="text-[10px] text-[var(--text-muted)] font-semibold">{res.year}</span>
                      )}
                      {res.estimatedHours && (
                        <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] font-semibold">
                          <Clock size={10} /> {res.estimatedHours}h
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {(res.source?.url || res.storagePath) && (
                      <a
                        href={res.source?.url || res.storagePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] rounded-lg transition-all"
                        title="Open resource"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      className="p-2 text-[var(--text-muted)] hover:text-amber-500 hover:bg-[var(--surface-dim)] rounded-lg transition-all"
                      title="Save for later"
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {res.tags && res.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[var(--border)]/30">
                    {res.tags.slice(0, 6).map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] rounded text-[10px] text-[var(--text-muted)] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Database size={28} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">
              {searchQuery ? 'No results found' : 'Resources loading...'}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              {searchQuery
                ? 'Try different keywords or browse all resources.'
                : 'Use the button below to fetch resources from the knowledge base API.'}
            </p>
            {!searchQuery && (
              <button
                onClick={onRefresh}
                className="mt-4 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
              >
                <Sparkles size={16} className="inline mr-1.5" />
                Load Resources
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
