import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Pill, Search, Loader2, BookOpen,
  Sparkles, ChevronRight, ChevronLeft, Heart, BookmarkCheck, Plus,
} from 'lucide-react';
import { DrugMonographView } from '../components/DrugMonographView';
import { getMonographCached, pinMonograph } from '../lib/getMonograph';
import { useSearchParams } from 'react-router-dom';
import { DrugMonographService, type DrugMonograph } from '../services/drugMonograph.service';
import { monographToMarkdown } from '../lib/monographToMarkdown';
import SavedMonographsPanel, { SaveMonographButton } from '../components/SavedMonographsPanel';
import { BUNDLED_DRUGS } from '../data/drugIndexData';
import { getDrugClassConfig } from '../data/drugClassColors';

const QUICK_DRUGS: { name: string; category: string }[] = [
  { name: 'Ceftriaxone', category: 'Anti-infectives' },
  { name: 'Amlodipine', category: 'Cardiovascular' },
  { name: 'Metformin', category: 'Endocrine' },
  { name: 'Omeprazole', category: 'Gastrointestinal' },
  { name: 'Amitriptyline', category: 'Central Nervous System' },
];

const CATEGORIES = [
  'Anti-infectives',
  'Cardiovascular',
  'Central Nervous System',
  'Analgesics',
  'Gastrointestinal',
  'Endocrine',
  'Respiratory',
  'Anticoagulants',
  'Oncology',
  'Immunology',
  'Dermatology',
  'Renal/Electrolytes',
  'Nutrition/Vitamins',
  'Anaesthesia',
  'Ophthalmology',
  'Toxicology/Antidotes',
];

function LikeButton({ monographId }: { monographId: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DrugMonographService.isMonographSaved(monographId).then(setSaved).finally(() => setLoading(false));
  }, [monographId]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      await DrugMonographService.removeSavedMonograph(monographId);
      setSaved(false);
    } else {
      await DrugMonographService.saveMonograph(monographId);
      setSaved(true);
    }
  };

  if (loading) return <div className="w-7 h-7 shrink-0" />;

  return (
    <button
      onClick={toggle}
      className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
        saved
          ? 'text-rose-500 bg-rose-50 hover:bg-rose-100'
          : 'text-[var(--text-dim)] hover:text-rose-400 hover:bg-rose-50/50'
      }`}
      title={saved ? 'Remove from My Library' : 'Save to My Library'}
    >
      {saved ? <Heart size={14} className="fill-rose-500" /> : <Heart size={14} />}
    </button>
  );
}

export default function DrugIndexScreen() {
  const [searchParams] = useSearchParams();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'monograph' | 'library'>('monograph');

  // Monograph Browser State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monograph, setMonograph] = useState<string | null>(null);
  const [monographKey, setMonographKey] = useState<string>('');
  const [currentMonographId, setCurrentMonographId] = useState<string | null>(null);
  const [selectedDrugName, setSelectedDrugName] = useState<string | null>(null);

  // Alpha filter + recent search state
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recentDrugSearches') || '[]');
    } catch { return []; }
  });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Seeded catalog: bundled data first, Supabase enhances it
  const [catalog, setCatalog] = useState<DrugMonograph[]>(BUNDLED_DRUGS);
  const [catalogLoading, setCatalogLoading] = useState(false);

  // Load monographs from Supabase; fall back to bundled data
  useEffect(() => {
    const loadCatalog = async () => {
      setCatalogLoading(true);
      try {
        const list = await DrugMonographService.getAll();
        if (list.length > 0) setCatalog(list);
      } catch (err) {
        console.warn('[DrugIndex] Supabase unavailable, using bundled data:', err);
      } finally {
        setCatalogLoading(false);
      }
    };
    loadCatalog();
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const next = [term, ...prev.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
      localStorage.setItem('recentDrugSearches', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openSeeded = (m: DrugMonograph) => {
    setMonograph(monographToMarkdown(m));
    setMonographKey((m.name || m.generic_name || '').toLowerCase());
    setCurrentMonographId(m.id);
    setSelectedDrugName(m.name || m.generic_name || null);
    setSelectedCategory(null);
    setError(null);
  };

  const fetchDrugProfile = async (query: string, categoryName?: string) => {
    setIsLoading(true);
    setError(null);
    setMonograph(null);
    setCurrentMonographId(null);
    setSelectedDrugName(null);
    try {
      const searchName = query || categoryName || '';

      // Try locally loaded catalog first (lenient match)
      if (searchName) {
        const localMatch = catalog.find(m =>
          (m.name && m.name.toLowerCase() === searchName.toLowerCase()) ||
          (m.generic_name && m.generic_name.toLowerCase() === searchName.toLowerCase()) ||
          (m.name && m.name.toLowerCase().includes(searchName.toLowerCase())) ||
          (m.generic_name && m.generic_name.toLowerCase().includes(searchName.toLowerCase()))
        );
        const hasClinicalContent = localMatch && (
          (localMatch.indications?.length ?? 0) > 0 ||
          (localMatch.side_effects?.length ?? 0) > 0 ||
          (localMatch.contraindications?.length ?? 0) > 0 ||
          !!localMatch.monitoring ||
          (localMatch.interactions?.length ?? 0) > 0
        );
        if (hasClinicalContent) {
          openSeeded(localMatch);
          setIsLoading(false);
          return;
        }
      }

      // Try Supabase seeded monograph
      if (searchName) {
        const seeded = await DrugMonographService.getByName(searchName);
        if (seeded && seeded.indications?.length > 0) {
          setMonograph(monographToMarkdown(seeded));
          setMonographKey(searchName.toLowerCase());
          setCurrentMonographId(seeded.id);
          setSelectedDrugName(seeded.name || searchName);
          setIsLoading(false);
          return;
        }
      }

      // Fall back to AI-generated monograph
      const entry = await getMonographCached(query, categoryName);
      setMonograph(entry.content);
      setMonographKey(entry.key);
      setSelectedDrugName(query || categoryName || null);

      if (searchName) {
        const monograph = await DrugMonographService.getByName(searchName);
        if (monograph) setCurrentMonographId(monograph.id);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching the drug profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinForOffline = async () => {
    if (monographKey) {
      await pinMonograph(monographKey);
      alert('Monograph saved for offline access!');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSelectedLetter(null);
    setSelectedCategory(null);
    saveRecentSearch(searchQuery.trim());
    setShowSearchDropdown(false);
    fetchDrugProfile(searchQuery.trim());
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedLetter(null);
    setSearchQuery('');
    setMonograph(null);
    setCurrentMonographId(null);
    setMonographKey('');
    setSelectedDrugName(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedLetter(null);
    setSearchQuery('');  // ← clears the global search so it doesn't persist
    setMonograph(null);
    setCurrentMonographId(null);
    setMonographKey('');
    setError(null);
  };

  const handleQuickDrugClick = (drugName: string) => {
    setSearchQuery(drugName);
    setSelectedLetter(null);
    setSelectedCategory(null);
    saveRecentSearch(drugName);
    setShowSearchDropdown(false);
    fetchDrugProfile(drugName);
  };

  // Pre-fill search when arriving with ?q=
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
      fetchDrugProfile(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered view of the catalog
  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = catalog;
    if (selectedCategory) {
      list = list.filter(m => (m.drug_class_name || '').toLowerCase().includes(selectedCategory.toLowerCase()));
    } else if (q) {
      list = list.filter(m =>
        (m.name || '').toLowerCase().includes(q) ||
        (m.generic_name || '').toLowerCase().includes(q) ||
        (m.drug_class_name || '').toLowerCase().includes(q)
      );
    }
    if (selectedLetter) {
      list = list.filter(m => (m.name || '').toUpperCase().startsWith(selectedLetter));
    }
    return list;
  }, [catalog, searchQuery, selectedCategory, selectedLetter]);

  const hasActiveFilter = !!(searchQuery.trim() || selectedCategory || selectedLetter);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      {/* ── Monograph Detail View ── */}
      {monograph ? (
        <>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setMonograph(null); setCurrentMonographId(null); setMonographKey(''); setSelectedDrugName(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer"
            >
              <ChevronLeft size={14} />
              Back
            </button>
            {selectedCategory && (
              <span className="text-sm text-[var(--text-muted)]">
                <button onClick={() => { setMonograph(null); setCurrentMonographId(null); setMonographKey(''); }} className="hover:text-[var(--primary)] transition-colors">{selectedCategory}</button>
                <ChevronRight size={14} className="inline mx-1" />
                <span className="text-[var(--text)] font-semibold">{selectedDrugName}</span>
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-[var(--primary-container)] rounded-full animate-pulse">
                <Loader2 size={36} className="text-[var(--primary)] animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">Loading Formulary Profile</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">
                  Checking Kenya Drug Index database for monograph, then querying AI if needed...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full bg-[var(--surface)] rounded-2xl border border-red-200/20 p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Pill size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-600">Failed to Retrieve Monograph</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{error}</p>
              </div>
              <button
                onClick={() => fetchDrugProfile(searchQuery || 'Ceftriaxone')}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <DrugMonographView
              content={monograph}
              drugName={selectedDrugName || searchQuery || 'Medication Monograph'}
              isSeeded={!!currentMonographId}
              onBack={() => { setMonograph(null); setCurrentMonographId(null); setMonographKey(''); setSelectedDrugName(null); }}
              onPin={handlePinForOffline}
              saveButton={currentMonographId ? <SaveMonographButton monographId={currentMonographId} monographName={searchQuery} /> : undefined}
            />
          )}
        </>
      ) : (
        <>
          {/* ── Browse Mode: Header + Tabs ── */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[var(--text)] tracking-tight">Kenya Drug Index (KDI)</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">Browse monographs by therapeutic class or search for a specific drug</p>
          </div>

          {/* ── Global Search Bar (only when not in a category) ── */}
          {!monograph && !selectedCategory && (
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-[var(--surface)] p-2 rounded-xl border border-[var(--border)] shadow-sm w-full">
                <div className="flex-1 min-w-0 flex items-center gap-3 px-3">
                  <Search size={20} className="text-[var(--text-dim)] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => !searchQuery.trim() && setShowSearchDropdown(true)}
                    placeholder="Search by generic (e.g., Ceftriaxone, Amoxicillin) or brand name..."
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 w-full sm:w-auto px-5 py-2.5 bg-[var(--primary)] hover:opacity-90 transition-opacity text-[var(--primary-foreground)] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  Search
                </button>
              </form>

              {showSearchDropdown && recentSearches.length > 0 && !searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-10 p-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 py-1">Recent Searches</div>
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickDrugClick(term)}
                      className="w-full text-left px-2 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--surface-dim)] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Search size={12} className="text-[var(--text-dim)] shrink-0" />
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Quick Search Tags ── */}
          {!monograph && !selectedCategory && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Quick Search:</span>
              {QUICK_DRUGS.map((drug) => (
                <button
                  key={drug.name}
                  onClick={() => handleQuickDrugClick(drug.name)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] hover:text-[var(--primary)] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Pill size={12} />
                  {drug.name}
                </button>
              ))}
            </div>
          )}

          {/* ── Tabs Navigation ── */}
          <div className="relative flex border-b border-[var(--border)] overflow-x-auto">
            {([
              { id: 'monograph', label: 'Monographs', icon: BookOpen },
              { id: 'library', label: 'My Library', icon: Heart },
            ] as const).map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-label={tab.label}
                  aria-selected={active}
                  role="tab"
                  className={`flex-1 shrink-0 px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-inset border-b-2 ${
                    active
                      ? 'text-[var(--primary)] border-[var(--primary)] bg-[var(--primary-container)]/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)]/50 border-transparent hover:border-[var(--border)]'
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Tab: Monographs ── */}
          {activeTab === 'monograph' ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] pb-3 whitespace-nowrap">
                <span
                  className={`${!selectedCategory ? 'text-[var(--text)] font-bold' : 'hover:text-[var(--primary)] transition-colors cursor-pointer'}`}
                  onClick={!selectedCategory ? undefined : handleBackToCategories}
                >
                  Drug Index
                </span>
                {selectedCategory && (
                  <>
                    <ChevronRight size={14} />
                    <span className="text-[var(--text)] font-bold">{selectedCategory}</span>
                  </>
                )}
              </div>

              <div className="min-h-[400px]">
                {isLoading ? (
                  <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-[var(--primary-container)] rounded-full animate-pulse">
                      <Loader2 size={36} className="text-[var(--primary)] animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)]">Loading Formulary Profile</h3>
                      <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">
                        Checking Kenya Drug Index database for monograph, then querying AI if needed...
                      </p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="w-full bg-[var(--surface)] rounded-2xl border border-red-200/20 p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                      <Pill size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-600">Failed to Retrieve Monograph</h3>
                      <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{error}</p>
                    </div>
                    <button
                      onClick={() => fetchDrugProfile(searchQuery || 'Ceftriaxone')}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
                    >
                      Retry Request
                    </button>
                  </div>
                ) : !selectedCategory ? (
                  /* ── Level 1: Category Cards ── */
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-[var(--text)]">Therapeutic Classes</h2>
                      <div className="text-sm text-[var(--text-muted)] font-medium">
                        {catalog.length} monographs
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {CATEGORIES.map((cat) => {
                        const count = catalog.filter((m) =>
                          (m.drug_class_name || '').toLowerCase().includes(cat.toLowerCase())
                        ).length;
                        if (count === 0) return null;
                        return (
                          <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className="text-left bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md rounded-2xl p-5 cursor-pointer transition-all group"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                                <Pill size={18} className="text-[var(--primary)]" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-sm truncate">{cat}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{count} monograph{count !== 1 ? 's' : ''}</p>
                              </div>
                              <ChevronRight size={16} className="text-[var(--text-dim)] group-hover:text-[var(--primary)] ml-auto shrink-0 group-hover:translate-x-1 transition-all" />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Featured Drugs */}
                    {catalog.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles size={14} className="text-amber-500" />
                          <h3 className="text-sm font-bold text-[var(--text)]">Featured Drugs</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {catalog.slice(0, 8).map((m) => (
                            <div
                              key={m.id}
                              className="bg-gradient-to-br from-[var(--surface)] to-[var(--surface-dim)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl transition-all group overflow-hidden"
                            >
                              <button
                                onClick={() => openSeeded(m)}
                                className="w-full text-left p-4 cursor-pointer"
                              >
                                <div className="flex items-start justify-between gap-2 min-w-0">
                                  <div className="font-bold text-[var(--text)] text-sm group-hover:text-[var(--primary)] transition-colors truncate">{m.name}</div>
                                </div>
                                {m.generic_name && m.generic_name !== m.name && (
                                  <div className="text-xs text-[var(--text-muted)] truncate mt-0.5">{m.generic_name}</div>
                                )}
                                {m.drug_class_name && (() => {
                                  const cc = getDrugClassConfig(m.drug_class_name);
                                  return (
                                    <span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cc.badge} ${cc.border}`}>
                                      {cc.subtitle && <span className="opacity-70">{cc.subtitle}</span>}
                                      <span className="font-bold">·</span>
                                      {m.drug_class_name}
                                    </span>
                                  );
                                })()}
                              </button>
                              <div className="px-4 pb-3 flex justify-end">
                                <LikeButton monographId={m.id} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {CATEGORIES.every((cat) => {
                      const count = catalog.filter((m) =>
                        (m.drug_class_name || '').toLowerCase().includes(cat.toLowerCase())
                      ).length;
                      return count === 0;
                    }) && (
                      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen size={32} className="text-[var(--text-muted)]" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text)]">No monographs loaded</h3>
                        <p className="text-sm text-[var(--text-muted)] mt-2">The Kenya Drug Index is being populated.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Level 2: Drugs in Selected Category ── */
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                    <div className="flex items-center gap-3">
                      <button onClick={handleBackToCategories} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                        <ChevronLeft size={18} className="text-[var(--text)]" />
                      </button>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                          <Pill size={20} className="text-[var(--primary)]" /> {selectedCategory}
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{filteredCatalog.length} monograph{filteredCatalog.length !== 1 ? 's' : ''} available</p>
                      </div>
                    </div>

                    {/* Search within category — scoped, no global search bar above */}
                    <div className="relative">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setSelectedLetter(null); }}
                        placeholder="Search drugs within this class..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>

                    {/* Alpha filter */}
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mr-1">Alpha:</span>
                      <button
                        onClick={() => setSelectedLetter(null)}
                        className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                          !selectedLetter
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--primary)]'
                        }`}
                      >
                        All
                      </button>
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
                        const hasDrugs = filteredCatalog.some((m) => (m.name || '').toUpperCase().startsWith(letter));
                        if (!hasDrugs) return null;
                        return (
                          <button
                            key={letter}
                            onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                            className={`w-6 h-6 rounded text-[10px] font-bold transition-all cursor-pointer ${
                              selectedLetter === letter
                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                            }`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>

                    {/* Drug Grid */}
                    {filteredCatalog.length === 0 ? (
                      <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center">
                          <Pill size={32} className="text-[var(--text-muted)]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text)] mb-1">No local monographs found</h3>
                          <p className="text-[var(--text-muted)] text-sm max-w-md">
                            No monographs match your current filter in this class.
                          </p>
                        </div>
                        <button
                          onClick={() => fetchDrugProfile(searchQuery || selectedCategory || '')}
                          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <Sparkles size={16} />
                          Search with AI
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredCatalog.map((m) => (
                          <div
                            key={m.id}
                            className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl transition-all group overflow-hidden"
                          >
                            <button
                              onClick={() => openSeeded(m)}
                              className="w-full text-left p-4 cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-2 min-w-0">
                                <div className="font-semibold text-[var(--text)] text-sm group-hover:text-[var(--primary)] transition-colors truncate">{m.name}</div>
                              </div>
                              {m.generic_name && m.generic_name !== m.name && (
                                <div className="text-xs text-[var(--text-muted)] truncate">{m.generic_name}</div>
                              )}
                              {m.drug_class_name && (() => {
                                const cc = getDrugClassConfig(m.drug_class_name);
                                return (
                                  <span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cc.badge} ${cc.border}`}>
                                    {cc.subtitle && <span className="opacity-70">{cc.subtitle}</span>}
                                    <span className="font-bold">·</span>
                                    {m.drug_class_name}
                                  </span>
                                );
                              })()}
                            </button>
                            <div className="px-4 pb-3 flex justify-end">
                              <LikeButton monographId={m.id} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ── Tab: My Library ── */
            <div className="animate-in fade-in duration-200 max-w-3xl mx-auto">
              <SavedMonographsPanel
                onNavigateToDrug={(name) => {
                  setActiveTab('monograph');
                  setSearchQuery(name);
                  setSelectedCategory(null);
                  fetchDrugProfile(name);
                }}
              />

            </div>
          )}
        </>
      )}
    </div>
  );
}
