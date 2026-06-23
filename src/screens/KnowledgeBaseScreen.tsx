import { useState, useEffect } from 'react';
import { Search, FileText, BookOpen, FileUp, X } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import { useFileStore } from '../store/fileStore';
import type { StoredFile } from '../types/engine';

const STATIC_ARTICLES = [
  { title: 'WHO Guidelines: Malaria Treatment', source: 'WHO', type: 'Guideline', date: '2024-10' },
  { title: 'Kenya Clinical Guidelines 2024', source: 'MOH Kenya', type: 'Guideline', date: '2024-08' },
  { title: 'Antimicrobial Stewardship Handbook', source: 'KEML', type: 'Reference', date: '2024-06' },
  { title: 'Drug Interactions in HIV/TB Co-infection', source: 'Research', type: 'Article', date: '2024-04' },
  { title: 'Pediatric Dosing Quick Reference', source: 'WHO', type: 'Reference', date: '2024-02' },
  { title: 'Renal Dose Adjustment Guide', source: 'KEML', type: 'Reference', date: '2023-12' },
];

export default function KnowledgeBaseScreen() {
  const [query, setQuery] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const { files, fetchFiles, removeFile } = useFileStore();

  useEffect(() => {
    fetchFiles('knowledge');
  }, [fetchFiles]);

  const knowledgeFiles = files.filter((f) => f.category === 'knowledge');

  const staticFiltered = query
    ? STATIC_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.source.toLowerCase().includes(query.toLowerCase()),
      )
    : STATIC_ARTICLES;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-[var(--text)]">Knowledge Base</h3>
        <button
          onClick={() => setShowUploader(!showUploader)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 transition-opacity"
        >
          {showUploader ? <X size={14} /> : <FileUp size={14} />}
          {showUploader ? 'Close' : 'Upload'}
        </button>
      </div>

      {showUploader && (
        <div className="mb-6">
          <FileUploader category="knowledge" maxSizeMB={15} />
        </div>
      )}

      {knowledgeFiles.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Uploaded References ({knowledgeFiles.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {knowledgeFiles.map((f: StoredFile) => (
              <div
                key={f.id}
                className="glass-card p-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--primary-container)] flex items-center justify-center flex-shrink-0">
                    <BookOpen size={16} className="text-[var(--primary)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--text)] truncate">{f.originalName}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {(f.size / 1024).toFixed(1)}KB &middot; {new Date(f.createdAt).toLocaleDateString()}
                    </p>
                    <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-dim)] text-[var(--text-muted)] font-medium">
                      Uploaded
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guidelines, references, notes..."
          className="w-full pl-9 pr-3 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-[var(--surface)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {staticFiltered.map((a) => {
          const Icon = a.type === 'Guideline' ? BookOpen : FileText;
          return (
            <div
              key={a.title}
              className="glass-card p-4 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--primary-container)] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[var(--primary)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text)] truncate">{a.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {a.source} &middot; {a.date}
                  </p>
                  <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-dim)] text-[var(--text-muted)] font-medium">
                    {a.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
