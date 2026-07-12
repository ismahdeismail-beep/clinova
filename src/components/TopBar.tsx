import { memo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Home, Eye, EyeOff, Cloud, CloudOff, RefreshCw, CheckCircle2, Loader2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useUIMode } from '../contexts/UIModeContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useSyncStatus } from '../hooks/useSyncStatus';
import { ClinicalCaseService } from '../services/clinicalCase.service';
import { DrugMonographService } from '../services/drugMonograph.service';
import type { DrugMonograph } from '../services/drugMonograph.service';
import type { ClinicalCase } from '../data/clinicalCasesData';
import type { ViewState } from '../types';

interface TopBarProps {
  activeView: ViewState;
}

const TITLE_MAP: Record<string, string> = {
  login: '',
  dashboard: 'Dashboard',
  tree: 'Decision Tree',
  study: 'Knowledge Engine',
  pharma: 'Reasoning Engine',
  case: 'Risk Simulator',
  settings: 'Settings',
  'new-case': 'New Case',
  pharmacotherapy: 'Pharmacotherapy Review',
  'drug-index': 'Drug Index',
  'knowledge-base': 'Knowledge Base',
};

const SIMPLE_TITLE_MAP: Record<string, string> = {
  dashboard: 'Home',
  study: 'Study Tools',
  pharma: 'Medications',
  case: 'Simulations',
  settings: 'Settings',
};

function TopBar({ activeView }: TopBarProps) {
  const { isSimple, toggleMode } = useUIMode();
  const titleMap = isSimple ? { ...TITLE_MAP, ...SIMPLE_TITLE_MAP } : TITLE_MAP;
  const title = activeView !== 'login' ? titleMap[activeView] || 'Clinova' : '';

  const isOnline = useOnlineStatus();
  const { status, pendingCount, progress } = useSyncStatus();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ cases: ClinicalCase[]; drugs: DrugMonograph[] }>({ cases: [], drugs: [] });
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults({ cases: [], drugs: [] });
      setSearchOpen(false);
      return;
    }
    setSearchOpen(true);
    setSearching(true);
    const t = setTimeout(() => {
      Promise.all([
        ClinicalCaseService.searchCases(q),
        DrugMonographService.search(q).catch(() => [] as DrugMonograph[]),
      ])
        .then(([cases, drugs]) => {
          setSearchResults({ cases: cases.slice(0, 5), drugs: (drugs || []).slice(0, 5) });
        })
        .catch(() => setSearchResults({ cases: [], drugs: [] }))
        .finally(() => setSearching(false));
    }, 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const goToCase = (c: ClinicalCase) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/cases?caseId=${c.id || c.seedId}`);
  };

  const goToDrug = (d: DrugMonograph) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/drugs?q=${encodeURIComponent(d.name || d.generic_name || '')}`);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchOpen(false);
      return;
    }
    if (e.key === 'Enter') {
      const all = [...searchResults.cases, ...searchResults.drugs];
      if (all.length > 0) {
        if (searchResults.cases.includes(all[0] as ClinicalCase)) goToCase(searchResults.cases[0]);
        else goToDrug(searchResults.drugs[0]);
      } else if (searchQuery.trim()) {
        setSearchOpen(false);
        navigate(`/drugs?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleHome = () => {
    window.dispatchEvent(new CustomEvent('clinova:navigate', { detail: { view: 'dashboard' } }));
  };

  return (
    <header className="topbar h-16 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {activeView !== 'dashboard' && activeView !== 'login' && (
          <button
            onClick={handleHome}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors"
            title="Dashboard Home"
          >
            <Home size={18} />
          </button>
        )}
        <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        {activeView !== 'login' && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-xs font-medium" title={!isOnline ? 'Offline' : status === 'syncing' ? `Syncing changes: ${progress ? `${progress.completed}/${progress.total}` : ''}` : pendingCount > 0 ? `${pendingCount} changes pending` : 'All changes synced'}>
            {!isOnline ? (
              <>
                <CloudOff size={14} className="text-red-500" />
                <span className="text-[var(--text-muted)]">Offline</span>
                {pendingCount > 0 && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full ml-1">{pendingCount}</span>}
              </>
            ) : status === 'syncing' ? (
              <div className="flex items-center gap-2">
                <RefreshCw size={13} className="text-blue-500 animate-spin" />
                <span className="text-blue-500 whitespace-nowrap">
                  Syncing {progress ? `(${progress.completed}/${progress.total})` : ''}
                </span>
                <div className="w-16 h-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress && progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0}%` }}
                  />
                </div>
              </div>
            ) : pendingCount > 0 ? (
              <>
                <Cloud size={14} className="text-amber-500" />
                <span className="text-amber-600 dark:text-amber-400">Pending ({pendingCount})</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[var(--text-muted)]">Up to date</span>
              </>
            )}
          </div>
        )}
        <div className="relative hidden sm:block" ref={searchRef}>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] ml-2">
            <Search size={16} className="text-[var(--text-dim)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchQuery.trim().length >= 2) setSearchOpen(true); }}
              onKeyDown={onSearchKeyDown}
              placeholder="Search cases, drugs..."
              className="bg-transparent border-none focus:outline-none text-sm w-44 text-[var(--text)] placeholder:text-[var(--text-dim)]"
            />
            {searching && <Loader2 size={14} className="animate-spin text-[var(--text-dim)]" />}
          </div>
          {searchOpen && searchQuery.trim().length >= 2 && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl z-50">
              {searching && searchResults.cases.length === 0 && searchResults.drugs.length === 0 && (
                <div className="px-4 py-3 text-sm text-[var(--text-muted)]">Searching…</div>
              )}
              {!searching && searchResults.cases.length === 0 && searchResults.drugs.length === 0 && (
                <div className="px-4 py-3 text-sm text-[var(--text-muted)]">No results for &ldquo;{searchQuery}&rdquo;</div>
              )}
              {searchResults.cases.length > 0 && (
                <div className="py-1">
                  <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)]">Clinical Cases</div>
                  {searchResults.cases.map((c) => (
                    <button
                      key={c.id || c.seedId}
                      type="button"
                      onClick={() => goToCase(c)}
                      className="w-full text-left px-4 py-2 hover:bg-[var(--surface-dim)] text-sm"
                    >
                      <div className="font-medium text-[var(--text)] truncate">{c.title}</div>
                      <div className="text-xs text-[var(--text-muted)] truncate">{c.disease} · {c.specialty}</div>
                    </button>
                  ))}
                </div>
              )}
              {searchResults.drugs.length > 0 && (
                <div className="py-1">
                  <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-dim)]">Drugs</div>
                  {searchResults.drugs.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => goToDrug(d)}
                      className="w-full text-left px-4 py-2 hover:bg-[var(--surface-dim)] text-sm"
                    >
                      <div className="font-medium text-[var(--text)] truncate">{d.name}</div>
                      {d.generic_name && d.generic_name !== d.name && (
                        <div className="text-xs text-[var(--text-muted)] truncate">{d.generic_name}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={toggleMode}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors"
          title={isSimple ? 'Switch to Clinical view' : 'Switch to Simple view'}
        >
          {isSimple ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors">
          <Bell size={18} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default memo(TopBar);
