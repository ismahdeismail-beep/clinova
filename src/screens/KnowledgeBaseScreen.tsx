import { useState, useEffect } from 'react';
import { Search, FileText, BookOpen, FileUp, X, Sparkles, BrainCircuit, Headphones, FilePlus, Link2, CheckCircle2, Loader2, Volume2 } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import { useFileStore } from '../store/fileStore';
import { useAuth } from '../contexts/AuthContext';
import type { StoredFile } from '../types/engine';

interface BookResource {
  title: string;
  source: string;
  type: string;
  date: string;
  url?: string;
  isCustom?: boolean;
}

const STATIC_BOOKS: BookResource[] = [
  { title: 'Kenya Drug Index (KDI) 2024 Edition', source: 'PPB Kenya / KDI', type: 'Formulary Book', date: '2024-10', url: 'https://pharmacyboardkenya.org' },
  { title: 'WHO Model List of Essential Medicines (EML)', source: 'WHO Essential', type: 'Essential Book', date: '2024-08', url: 'https://who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines' },
  { title: 'Medscape Clinical Reference & Monographs', source: 'Medscape Online', type: 'Clinical Book', date: '2024-11', url: 'https://reference.medscape.com' },
  { title: 'Kenya National Essential Medicines List (KEML)', source: 'MOH Kenya', type: 'Essential Book', date: '2024-06' },
  { title: 'Antimicrobial Stewardship & Dosing Guide', source: 'Clinical Reference', type: 'Handbook', date: '2024-05' },
  { title: 'Renal & Hepatic Dose Adjustment Manual', source: 'Clinical Reference', type: 'Handbook', date: '2023-12' },
];

export default function KnowledgeBaseScreen() {
  const { userData } = useAuth();
  const isAdmin = userData?.role === 'admin';

  const [activeTab, setActiveTab] = useState<'library' | 'generator'>('library');
  const [query, setQuery] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [showAdminAdd, setShowAdminAdd] = useState(false);
  
  // Admin custom resource form state
  const [customBooks, setCustomBooks] = useState<BookResource[]>([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookSource, setNewBookSource] = useState('Official Book');
  const [newBookUrl, setNewBookUrl] = useState('');

  // Generator states
  const [selectedSource, setSelectedSource] = useState('');
  const [outputType, setOutputType] = useState('Short Notes Summary');
  const [questionTypes, setQuestionTypes] = useState<string[]>(['MCQs']);
  const [includePodcast, setIncludePodcast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    type: string;
    content: string;
    audioUrl?: string;
    podcastTranscript?: string;
  } | null>(null);

  const { files, fetchFiles } = useFileStore();

  useEffect(() => {
    fetchFiles('knowledge');
  }, [fetchFiles]);

  const knowledgeFiles = files.filter((f) => f.category === 'knowledge');

  const allBooks = [...customBooks, ...STATIC_BOOKS];

  const filteredBooks = query
    ? allBooks.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.source.toLowerCase().includes(query.toLowerCase()) ||
          a.type.toLowerCase().includes(query.toLowerCase()),
      )
    : allBooks;

  const handleAddCustomResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle.trim()) return;
    setCustomBooks([
      {
        title: newBookTitle,
        source: newBookSource,
        type: newBookUrl ? 'Online Resource' : 'Reference Book',
        date: new Date().toISOString().slice(0, 7),
        url: newBookUrl || undefined,
        isCustom: true
      },
      ...customBooks
    ]);
    setNewBookTitle('');
    setNewBookUrl('');
    setShowAdminAdd(false);
  };

  const handleToggleQuestionType = (type: string) => {
    if (questionTypes.includes(type)) {
      setQuestionTypes(questionTypes.filter(t => t !== type));
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedSource) return;
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const res = await fetch('/api/gemini/generate-study-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: selectedSource,
          outputType,
          questionTypes,
          includePodcast,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate study materials');
      }

      const data = await res.json();
      setGeneratedResult({
        type: outputType,
        content: data.content,
        podcastTranscript: data.podcastTranscript || undefined,
        audioUrl: includePodcast ? 'https://example.com/mock-podcast.mp3' : undefined
      });
    } catch (error: any) {
      console.error('Study material generation error:', error);
      alert(`Study material generation failed: ${error.message || 'Please check your connection and configuration.'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">
          Online Reference Books &amp; Exam Prep Suite
        </h1>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          Access online books including KDI, Essential Medicines, and Medscape. Upload notes (PDF/Images) and convert them to exam short notes, question banks, or Podcast Audio.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[var(--border)] overflow-x-auto">
        <button
          onClick={() => setActiveTab('library')}
          className={`pb-3 px-5 text-sm font-semibold transition-colors whitespace-nowrap border-b-2 flex items-center gap-2.5 ${
            activeTab === 'library' 
              ? 'border-[var(--primary)] text-[var(--primary)]' 
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <BookOpen size={18} /> Online Books &amp; Uploaded Notes
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`pb-3 px-5 text-sm font-semibold transition-colors whitespace-nowrap border-b-2 flex items-center gap-2.5 ${
            activeTab === 'generator' 
              ? 'border-[var(--primary)] text-[var(--primary)]' 
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <BrainCircuit size={18} /> Exam Study &amp; Audio Converter
        </button>
      </div>

      {/* TAB 1: LIBRARY & ONLINE BOOKS */}
      {activeTab === 'library' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-sm">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search KDI, Essential Medicines, Medscape, uploaded notes..."
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div className="flex items-center gap-2.5">
              {isAdmin && (
                <button
                  onClick={() => setShowAdminAdd(!showAdminAdd)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] hover:bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FilePlus size={16} /> {showAdminAdd ? 'Cancel Add' : 'Admin: Add Book / URL'}
                </button>
              )}
              <button
                onClick={() => setShowUploader(!showUploader)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {showUploader ? <X size={16} /> : <FileUp size={16} />}
                {showUploader ? 'Close Upload' : 'Upload Notes / PDF'}
              </button>
            </div>
          </div>

          {/* Admin Custom Resource Form */}
          {showAdminAdd && isAdmin && (
            <form onSubmit={handleAddCustomResource} className="p-6 bg-[var(--primary-container)] border border-[var(--primary)]/20 rounded-2xl space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                <Sparkles size={16} /> Admin Repository Management
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Administrators have exclusive rights to add books, reference URLs, and study materials available to all users.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--text)] block mb-1">Book / Resource Title</label>
                  <input
                    type="text"
                    required
                    value={newBookTitle}
                    onChange={e => setNewBookTitle(e.target.value)}
                    placeholder="e.g. BNF 86 or Clinical URL"
                    className="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text)] block mb-1">Source / Publisher</label>
                  <input
                    type="text"
                    value={newBookSource}
                    onChange={e => setNewBookSource(e.target.value)}
                    placeholder="e.g. PPB / Oxford"
                    className="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text)] block mb-1">Optional URL Link</label>
                  <input
                    type="url"
                    value={newBookUrl}
                    onChange={e => setNewBookUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold text-xs rounded-xl shadow-sm"
              >
                Add Study Material to Global Library
              </button>
            </form>
          )}

          {/* User File Uploader Section */}
          {showUploader && (
            <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl animate-in fade-in">
              <div className="mb-3">
                <h4 className="text-sm font-bold text-[var(--text)]">Upload Notes, PDFs &amp; Images</h4>
                <p className="text-xs text-[var(--text-muted)]">
                  Users can upload lecture notes, scanned textbook pages (images/PDFs), or clinical summaries. The AI will answer questions directly from these files.
                </p>
              </div>
              <FileUploader category="knowledge" maxSizeMB={15} />
            </div>
          )}

          {/* Uploaded Files Section */}
          {knowledgeFiles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                Your Uploaded Notes &amp; Documents ({knowledgeFiles.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {knowledgeFiles.map((f: StoredFile) => (
                  <div
                    key={f.id}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-start justify-between shadow-sm"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[var(--text)] truncate">{f.originalName}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {(f.size / 1024).toFixed(1)}KB &middot; Uploaded Note
                        </p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] bg-[var(--primary)]/10 text-[var(--primary)] font-semibold rounded">
                          AI Searchable
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Online Books Grid */}
          <div>
            <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--primary)]" /> Authoritative Online Books &amp; Formularies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooks.map((book, i) => (
                <div
                  key={i}
                  className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center shrink-0 font-bold">
                      {book.title.includes('KDI') ? 'KDI' : book.title.includes('EML') ? 'EML' : <BookOpen size={24} />}
                    </div>
                    <div>
                      <h5 className="text-base font-bold text-[var(--text)] leading-snug">{book.title}</h5>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Source: {book.source} &middot; Updated {book.date}</p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--surface-dim)] border border-[var(--border)] rounded text-[var(--text-dim)]">
                          {book.type}
                        </span>
                        {book.isCustom && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-[var(--primary-container)] text-[var(--primary)] rounded">
                            Admin Added
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {book.url && (
                    <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-end">
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] hover:underline"
                      >
                        Open Online Book <Link2 size={14} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXAM STUDY & PODCAST AUDIO GENERATOR */}
      {activeTab === 'generator' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-[var(--primary-container)] text-[var(--primary)] rounded-2xl font-bold">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">Exam Study &amp; Audio Preparation Hub</h3>
                <p className="text-xs text-[var(--text-muted)]">Convert any notes or books into exam materials &amp; podcast audio</p>
              </div>
            </div>

            <div className="space-y-6 mt-6 pt-6 border-t border-[var(--border)]">
              {/* Step 1: Choose Source */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-2">
                  1. Select Study Material Source
                </label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full p-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text)] outline-none focus:border-[var(--primary)]"
                >
                  <option value="">-- Choose Book or Uploaded Note --</option>
                  <optgroup label="Authoritative Books">
                    <option value="Kenya Drug Index (KDI) 2024">Kenya Drug Index (KDI) Formulary</option>
                    <option value="WHO Essential Medicines List">WHO Essential Medicines List (EML)</option>
                    <option value="Medscape Antimicrobial Monographs">Medscape Clinical Monographs</option>
                  </optgroup>
                  {knowledgeFiles.length > 0 && (
                    <optgroup label="Your Uploaded Notes">
                      {knowledgeFiles.map(f => (
                        <option key={f.id} value={f.originalName}>{f.originalName} (Uploaded Note)</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Step 2: Choose Output */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text)] block mb-2">
                  2. Select Conversion Output
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'Short Notes Summary', desc: 'Concise high-yield bullet points for quick review' },
                    { title: 'All Form Questions', desc: 'MCQs, True/False, OSCE cases & practice drills' },
                    { title: 'Complete Study Kit', desc: 'Combined notes, flashcards & dosing checks' }
                  ].map((opt) => (
                    <button
                      key={opt.title}
                      type="button"
                      onClick={() => setOutputType(opt.title)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        outputType === opt.title 
                          ? 'bg-[var(--primary-container)]/60 border-[var(--primary)] shadow-sm' 
                          : 'bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text-dim)]'
                      }`}
                    >
                      <div className="text-sm font-bold text-[var(--text)] mb-1 flex items-center justify-between">
                        {opt.title}
                        {outputType === opt.title && <CheckCircle2 size={16} className="text-[var(--primary)]" />}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Question Formats (if All Form Questions selected) */}
              {outputType === 'All Form Questions' && (
                <div className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl animate-in fade-in">
                  <label className="text-xs font-bold text-[var(--text)] block mb-2.5">
                    Include Question Formats:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {['MCQs', 'True/False', 'OSCE Clinical Scenarios', 'Short Answers', 'Calculation Drills'].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleToggleQuestionType(q)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          questionTypes.includes(q)
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                            : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text)]'
                        }`}
                      >
                        {q} {questionTypes.includes(q) && '✓'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Podcast Audio Option */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/10 to-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl shadow-sm">
                    <Headphones size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text)]">Generate Podcast Audio Overview</h4>
                    <p className="text-xs text-[var(--text-muted)]">Synthesize an AI two-host audio conversation breaking down key exam pearls</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePodcast}
                    onChange={(e) => setIncludePodcast(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                </label>
              </div>

              {/* Generate CTA */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!selectedSource || isGenerating}
                className="w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-bold text-base rounded-2xl transition-all shadow-lg shadow-[var(--primary)]/25 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Analyzing Books &amp; Generating Study Material...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} /> Convert to {outputType} {includePodcast && '+ Audio'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Results Panel */}
          {generatedResult && (
            <div className="bg-[var(--surface)] border-2 border-[var(--primary)] rounded-3xl p-8 shadow-xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border)] mb-6">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-[10px] uppercase rounded">
                    Exam Ready Output
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text)] mt-1">{generatedResult.type}</h3>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedResult.content)}
                  className="px-4 py-2 bg-[var(--surface-dim)] hover:bg-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text)] transition-colors"
                >
                  Copy Notes
                </button>
              </div>

              {/* Podcast Player Box */}
              {generatedResult.audioUrl && (
                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-[var(--primary)] text-[var(--primary-foreground)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary-foreground)] text-[var(--primary)] flex items-center justify-center shrink-0 shadow">
                      <Volume2 size={24} className="animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">AI Study Podcast Audio Overview</h4>
                      <p className="text-xs text-[var(--primary-foreground)]/80">Listening to high-yield clinical breakdown</p>
                    </div>
                  </div>
                  <audio controls className="w-full sm:w-64 h-10 accent-[var(--primary)]">
                    <source src="https://actions.google.com/sounds/v1/ambiences/office_working.ogg" type="audio/ogg" />
                    Your browser does not support audio element.
                  </audio>
                </div>
              )}

              {/* Text Content */}
              <div className="prose dark:prose-invert max-w-none text-sm text-[var(--text)] leading-relaxed whitespace-pre-line bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)] font-mono">
                {generatedResult.content}
              </div>

              {generatedResult.podcastTranscript && (
                <div className="mt-6 p-5 bg-[var(--primary-container)] rounded-2xl border border-[var(--primary)]/20">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
                    🎙️ Podcast AI Transcript Excerpt
                  </h5>
                  <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">
                    {generatedResult.podcastTranscript}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

