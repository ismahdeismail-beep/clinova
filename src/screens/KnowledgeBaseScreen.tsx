import { useState, useEffect } from 'react';
import { Search, FileText, BookOpen, FileUp, X, Sparkles, BrainCircuit } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'library' | 'generator'>('library');
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
    <div className="p-6 max-w-5xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Education Hub</h1>
        <p className="text-[var(--text-muted)] text-sm">Access clinical guidelines and generate learning cases from your notes.</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-[var(--border)] overflow-x-auto">
        <button
          onClick={() => setActiveTab('library')}
          className={`pb-3 px-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
            activeTab === 'library' 
              ? 'border-[var(--primary)] text-[var(--primary)]' 
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <div className="flex items-center gap-2"><BookOpen size={16} /> Reference Library</div>
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`pb-3 px-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
            activeTab === 'generator' 
              ? 'border-[var(--primary)] text-[var(--primary)]' 
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <div className="flex items-center gap-2"><BrainCircuit size={16} /> Learning Generator</div>
        </button>
      </div>

      {activeTab === 'library' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-[var(--text)]">Clinical Guidelines & Notes</h3>
            <button
              onClick={() => setShowUploader(!showUploader)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 transition-opacity"
            >
              {showUploader ? <X size={14} /> : <FileUp size={14} />}
              {showUploader ? 'Close' : 'Upload Notes'}
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
                Uploaded Materials ({knowledgeFiles.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {knowledgeFiles.map((f: StoredFile) => (
                  <div
                    key={f.id}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--primary)]/50 transition-colors cursor-pointer shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[var(--primary-container)] flex items-center justify-center flex-shrink-0">
                        <FileText size={16} className="text-[var(--primary)]" />
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
              className="w-full pl-9 pr-3 py-2.5 border border-[var(--border)] rounded-lg text-sm bg-[var(--surface)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Core Reference Library
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {staticFiltered.map((a) => {
              const Icon = a.type === 'Guideline' ? BookOpen : FileText;
              return (
                <div
                  key={a.title}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--primary)]/50 transition-colors cursor-pointer shadow-sm"
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
                      <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-dim)] text-[var(--text-muted)] font-medium border border-[var(--border)]">
                        {a.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'generator' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-base font-semibold text-[var(--text)] mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--primary)]"/> Note to Case Generator
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Transform your uploaded lecture notes, guidelines, or research papers into realistic clinical cases, multiple choice questions, and flashcards.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--text)] block mb-1.5">1. Select Source Material</label>
                <select className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none bg-[var(--surface-dim)] text-[var(--text)] text-sm">
                  <option value="">-- Choose from uploaded notes --</option>
                  {knowledgeFiles.map(f => (
                    <option key={f.id} value={f.id}>{f.originalName}</option>
                  ))}
                  <option value="guideline-1">Kenya Clinical Guidelines 2024</option>
                  <option value="guideline-2">WHO Guidelines: Malaria Treatment</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--text)] block mb-1.5">2. Output Format</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Clinical Case', 'Multiple Choice (MCQ)', 'Flashcards', 'OSCE Scenario'].map(type => (
                    <label key={type} className="flex items-center gap-2 p-3 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] cursor-pointer hover:border-[var(--primary)] transition-colors">
                      <input type="radio" name="output_type" value={type} className="accent-[var(--primary)]" defaultChecked={type === 'Clinical Case'} />
                      <span className="text-xs font-medium text-[var(--text)]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--text)] block mb-1.5">3. Difficulty Level</label>
                <div className="flex gap-4">
                  {['Student', 'Intern', 'Practitioner'].map(level => (
                    <label key={level} className="flex items-center gap-2">
                      <input type="radio" name="difficulty" value={level} className="accent-[var(--primary)]" defaultChecked={level === 'Intern'} />
                      <span className="text-xs text-[var(--text)]">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <button type="button" className="w-full md:w-auto px-6 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
                  <BrainCircuit size={16} />
                  Generate Learning Material
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-[var(--border)] pt-8">
            <h4 className="text-sm font-semibold text-[var(--text)] mb-4">Your Generated Materials</h4>
            <div className="text-center py-12 border-2 border-dashed border-[var(--border)] rounded-xl">
              <BookOpen size={32} className="mx-auto text-[var(--border)] mb-3" />
              <p className="text-sm text-[var(--text-muted)]">No materials generated yet.</p>
              <p className="text-xs text-[var(--text-dim)] mt-1">Select a source and click generate to create clinical cases.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
