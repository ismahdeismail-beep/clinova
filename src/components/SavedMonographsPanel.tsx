import React, { useState, useEffect, useCallback } from 'react';
import {
  Bookmark, BookmarkCheck, Search, Trash2, Loader2,
  Pill, BookOpen, X, Tag, ChevronDown, ExternalLink, Heart,
  ArrowUpDown, Clock, Database,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DrugMonographService, type DrugMonograph, type UserMonograph } from '../services/drugMonograph.service';
import { getDrugClassConfig } from '../data/drugClassColors';

interface SavedMonographsPanelProps {
  onNavigateToDrug?: (name: string) => void;
  compact?: boolean;
}

type SortMode = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

export default function SavedMonographsPanel({ onNavigateToDrug, compact }: SavedMonographsPanelProps) {
  const [items, setItems] = useState<UserMonograph[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('date-desc');

  const loadItems = useCallback(async () => {
    setLoading(true);
    const result = await DrugMonographService.getUserMonographs({
      search: search || undefined,
      tag: selectedTag ?? undefined,
      pageSize: 100,
    });
    setItems(result.items);
    setTotal(result.total);
    setLoading(false);
  }, [search, selectedTag]);

  useEffect(() => { loadItems(); }, [loadItems]);

  const sortedItems = [...items].sort((a, b) => {
    switch (sortMode) {
      case 'date-desc':
        return new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime();
      case 'date-asc':
        return new Date(a.saved_at).getTime() - new Date(b.saved_at).getTime();
      case 'name-asc':
        return (a.monograph?.name ?? '').localeCompare(b.monograph?.name ?? '');
      case 'name-desc':
        return (b.monograph?.name ?? '').localeCompare(a.monograph?.name ?? '');
    }
  });

  const allTags = [...new Set(items.flatMap(i => i.tags ?? []))].sort();

  const handleRemove = async (monographId: string) => {
    setRemoving(monographId);
    await DrugMonographService.removeSavedMonograph(monographId);
    setItems(prev => prev.filter(i => i.monograph_id !== monographId));
    setTotal(prev => prev - 1);
    if (expandedId === monographId) setExpandedId(null);
    setRemoving(null);
  };

  if (compact && items.length === 0 && !loading) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <Heart size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text)]">My Monograph Library</h3>
            <p className="text-[10px] text-[var(--text-muted)]">{total} saved monograph{total !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {items.length > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSortMode(sortMode === 'date-desc' ? 'date-asc' : 'date-desc')}
              className={`p-1.5 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                sortMode.startsWith('date') ? 'bg-rose-100 text-rose-700' : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)]'
              }`}
              title="Sort by date"
            >
              <Clock size={12} />
            </button>
            <button
              onClick={() => setSortMode(sortMode === 'name-asc' ? 'name-desc' : 'name-asc')}
              className={`p-1.5 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                sortMode.startsWith('name') ? 'bg-rose-100 text-rose-700' : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)]'
              }`}
              title="Sort by name"
            >
              <ArrowUpDown size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[var(--surface-dim)] rounded-xl px-3 py-2 border border-[var(--border)]">
        <Search size={16} className="text-[var(--text-dim)]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter saved monographs..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text)]"
        />
        {search && (
          <button onClick={() => setSearch('')} className="p-0.5 text-[var(--text-dim)] hover:text-[var(--text)]">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-[var(--surface-dim)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--text-dim)]'
              }`}
            >
              <Tag size={10} />
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-[var(--primary)]" />
        </div>
      ) : items.length === 0 ? (
        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-3">
            <Heart size={20} className="text-rose-300" />
          </div>
          <p className="text-sm font-semibold text-[var(--text)]">Your library is empty</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Save monographs while browsing the Drug Index or during consultations
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedItems.map(item => (
            <div
              key={item.id}
              className="bg-[var(--surface)] rounded-xl border border-[var(--border)] overflow-hidden transition-all hover:border-[var(--primary)]/30"
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)] shrink-0">
                    <Pill size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => setExpandedId(expandedId === item.monograph_id ? null : item.monograph_id)}
                      className="text-sm font-bold text-[var(--text)] text-left truncate block w-full hover:text-[var(--primary)] transition-colors cursor-pointer"
                    >
                      {item.monograph?.name ?? 'Unknown Monograph'}
                    </button>
                    <div className="flex items-center gap-2 mt-0.5">
                      {(item.monograph?.drug_class || item.monograph?.drug_class_name) && (() => {
                        const cc = getDrugClassConfig(item.monograph?.drug_class || item.monograph?.drug_class_name || '');
                        return (
                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cc.badge} ${cc.border} max-w-full`}>
                            {cc.subtitle && <span className="opacity-70 shrink-0">{cc.subtitle}</span>}
                            <span className="font-bold shrink-0">·</span>
                            <span className="truncate">{item.monograph?.drug_class || item.monograph?.drug_class_name}</span>
                          </span>
                        );
                      })()}
                      <span className="text-[9px] text-[var(--text-dim)]">
                        {new Date(item.saved_at).toLocaleDateString()}
                      </span>
                      {(item.tags?.length ?? 0) > 0 && (
                        <span className="text-[10px] text-rose-500 font-semibold">
                          {item.tags?.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {onNavigateToDrug && item.monograph && (
                    <button
                      onClick={() => onNavigateToDrug(item.monograph!.name)}
                      className="p-1.5 text-[var(--text-dim)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-lg transition-colors cursor-pointer"
                      title="Open in Drug Index"
                    >
                      <ExternalLink size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(item.monograph_id)}
                    disabled={removing === item.monograph_id}
                    className="p-1.5 text-[var(--text-dim)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    title="Remove from library"
                  >
                    {removing === item.monograph_id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === item.monograph_id ? null : item.monograph_id)}
                    className="p-1.5 text-[var(--text-dim)] hover:text-[var(--text)] rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronDown size={14} className={`transition-transform ${expandedId === item.monograph_id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {expandedId === item.monograph_id && item.monograph && (
                <div className="border-t border-[var(--border)] px-4 py-3 bg-[var(--surface-dim)]/30 max-h-80 overflow-y-auto">
                  <div className="markdown-body text-xs space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="font-bold text-[var(--text-muted)] uppercase text-[9px] tracking-wider">Generic Name</span>
                        <p className="text-[var(--text)] font-medium mt-0.5">{item.monograph.generic_name}</p>
                      </div>
                      <div>
                        <span className="font-bold text-[var(--text-muted)] uppercase text-[9px] tracking-wider">Drug Class</span>
                        {(() => {
                          const cc = getDrugClassConfig(item.monograph.drug_class || item.monograph.drug_class_name || '');
                          return (
                            <span className={`mt-0.5 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cc.badge} ${cc.border} max-w-full`}>
                              {cc.subtitle && <span className="opacity-70 shrink-0">{cc.subtitle}</span>}
                              <span className="font-bold shrink-0">·</span>
                              <span className="truncate">{item.monograph.drug_class || item.monograph.drug_class_name}</span>
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--text-muted)] uppercase text-[9px] tracking-wider">Indications</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {item.monograph.indications.slice(0, 4).map((ind, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium">{ind}</span>
                        ))}
                        {item.monograph.indications.length > 4 && (
                          <span className="text-[10px] text-[var(--text-muted)]">+{item.monograph.indications.length - 4} more</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--text-muted)] uppercase text-[9px] tracking-wider">Key Interactions</span>
                      <p className="text-[var(--text-secondary)] mt-0.5">
                        {item.monograph.interactions.slice(0, 3).join(', ')}
                        {item.monograph.interactions.length > 3 && '...'}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--text-muted)] uppercase text-[9px] tracking-wider">Monitoring</span>
                      <p className="text-[var(--text-secondary)] mt-0.5 line-clamp-2">{item.monograph.monitoring}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--text-muted)] uppercase text-[9px] tracking-wider">Saved On</span>
                      <p className="text-[var(--text)] mt-0.5 font-medium">{new Date(item.saved_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SaveMonographButton({ monographId, monographName, className }: {
  monographId: string;
  monographName: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DrugMonographService.isMonographSaved(monographId).then(setSaved).finally(() => setLoading(false));
  }, [monographId]);

  const toggle = async () => {
    if (saved) {
      await DrugMonographService.removeSavedMonograph(monographId);
      setSaved(false);
    } else {
      await DrugMonographService.saveMonograph(monographId);
      setSaved(true);
    }
  };

  if (loading) return null;

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
        saved
          ? 'bg-rose-100 text-rose-700 border border-rose-200 hover:bg-rose-200'
          : 'bg-[var(--surface-dim)] text-[var(--text-muted)] border border-[var(--border)] hover:border-rose-300 hover:text-rose-600'
      } ${className ?? ''}`}
      title={saved ? 'Remove from My Library' : 'Save to My Library'}
    >
      {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
