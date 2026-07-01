import React, { useState } from 'react';
import { Pill, Search, Loader2, ArrowRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface QuickDrug {
  name: string;
  category: string;
}

const QUICK_DRUGS: QuickDrug[] = [
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
  'Gastrointestinal',
  'Endocrine',
];

export default function DrugIndexScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monograph, setMonograph] = useState<string | null>(null);

  const fetchDrugProfile = async (query: string, categoryName?: string) => {
    setIsLoading(true);
    setError(null);
    setMonograph(null);
    try {
      const res = await fetch('/api/gemini/search-drug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drugName: query || undefined,
          category: categoryName || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve drug monograph');
      }

      const data = await res.json();
      setMonograph(data.text);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching the drug profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSelectedCategory(null);
    fetchDrugProfile(searchQuery.trim());
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    fetchDrugProfile('', category);
  };

  const handleQuickDrugClick = (drugName: string) => {
    setSearchQuery(drugName);
    setSelectedCategory(null);
    fetchDrugProfile(drugName);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Kenya Drug Index (KDI)</h1>
        <p className="text-[var(--text-muted)] text-sm">
          Access comprehensive clinical drug monographs, WHO essential classifications, and required local dosing modifications.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-3 bg-[var(--surface)] p-2 rounded-xl border border-[var(--border)] shadow-sm">
        <div className="flex-1 flex items-center gap-3 px-3">
          <Search size={20} className="text-[var(--text-dim)]" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by generic (e.g., Ceftriaxone, Amoxicillin) or brand name..." 
            className="flex-1 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
          />
        </div>
        <button 
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 bg-[var(--primary)] hover:opacity-90 transition-opacity text-white rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Search'}
        </button>
      </form>

      {/* Quick Discovery Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Quick Search:</span>
        {QUICK_DRUGS.map((drug) => (
          <button
            key={drug.name}
            onClick={() => handleQuickDrugClick(drug.name)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] hover:text-[var(--primary)] transition-all flex items-center gap-1"
          >
            <Pill size={12} />
            {drug.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar: categories */}
        <div className="lg:col-span-1 space-y-2">
          <div className="px-4 py-3 bg-[var(--surface-dim)] rounded-xl font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider border-l-4 border-[var(--primary)] mb-3">
            Therapeutic Classes
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group ${
                  isSelected 
                    ? 'bg-[var(--primary)] text-white shadow-md shadow-primary/10' 
                    : 'bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-dim)] border border-[var(--border)]'
                }`}
              >
                <span>{cat}</span>
                <ArrowRight size={14} className={`transition-transform duration-200 group-hover:translate-x-1 ${isSelected ? 'text-white' : 'text-[var(--text-dim)]'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Main Panel: Monograph presentation */}
        <div className="lg:col-span-3 min-h-[400px]">
          {isLoading ? (
            <div className="w-full h-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-[var(--primary-container)] rounded-full animate-pulse">
                <Loader2 size={36} className="text-[var(--primary)] animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">Loading Formulary Profile</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">
                  Querying the Kenya Drug Index and WHO Essential Monographs for guideline-directed data...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-full bg-[var(--surface)] rounded-2xl border border-red-200/20 p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Pill size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-600">Failed to Retrieve Monograph</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">
                  {error}
                </p>
              </div>
              <button 
                onClick={() => fetchDrugProfile(searchQuery || 'Ceftriaxone')}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700"
              >
                Retry Request
              </button>
            </div>
          ) : monograph ? (
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
                <div className="w-10 h-10 bg-[var(--primary-container)] rounded-xl flex items-center justify-center text-[var(--primary)]">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--text)]">Medication Monograph</h2>
                  <p className="text-xs text-[var(--text-muted)] font-mono">SOURCE: CLINICAL KNOWLEDGE ENGINE • KDI CITATION</p>
                </div>
              </div>

              <div className="markdown-body text-[var(--text)] prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-[var(--text)] prose-p:leading-relaxed prose-li:my-1">
                <ReactMarkdown>{monograph}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
                <Pill size={32} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Search or Browse Drug Profiles</h3>
              <p className="text-[var(--text-muted)] text-sm max-w-md">
                Enter a generic name or select a therapeutic class to view official KDI indications, adult/pediatric dosages, interactions, and mandatory renal clearance modifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
