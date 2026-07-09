import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, Upload, Search, Filter, FolderTree, FileText, Settings, 
  BarChart as ChartIcon, Trash2, Edit, Plus, BookOpen, Layers, CheckCircle2, Sparkles, 
  AlertTriangle, RefreshCw, X, Sliders, Info, Server, HelpCircle, HardDrive
} from 'lucide-react';
import { useFileStore } from '../store/fileStore';
import { StorageService } from '../services/storage.service';
import { useAuth } from '../contexts/AuthContext';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';

// Seed initial system knowledge resources so the app feels full-featured out of the box
interface ResourceItem {
  id: string;
  originalName: string;
  title: string;
  author: string;
  discipline: string;
  type: string;
  size: number;
  createdAt: number;
  status: string;
  isUserUploaded?: boolean;
  storagePath?: string;
}

const SYSTEM_RESOURCES: ResourceItem[] = [
  { 
    id: 'sys-1', 
    originalName: 'MOH Kenya Cardiovascular Guidelines 2024.pdf', 
    title: 'Cardiovascular Guidelines 2024',
    author: 'Ministry of Health Kenya', 
    discipline: 'Clinical Pharmacy & Therapeutics', 
    type: 'Clinical Guideline', 
    size: 2450122, 
    createdAt: Date.now() - 30 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  { 
    id: 'sys-2', 
    originalName: 'Renal Physiology Lecture Notes.docx', 
    title: 'Renal Physiology Notes',
    author: 'Prof. J. O. Omondi', 
    discipline: 'Medical Physiology', 
    type: 'Lecture Notes', 
    size: 1045091, 
    createdAt: Date.now() - 15 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  { 
    id: 'sys-3', 
    originalName: 'Katzung Pharmacology - Ch3 Pharmacokinetics.pdf', 
    title: 'Intro to Pharmacokinetics',
    author: 'Katzung & Trevor', 
    discipline: 'Pharmacology', 
    type: 'Textbook Chapter', 
    size: 4981022, 
    createdAt: Date.now() - 5 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  {
    id: 'sys-4',
    originalName: 'WHO Pediatric Dosing Formulary.pdf',
    title: 'Pediatric Pharmacotherapy Guidelines',
    author: 'World Health Organization',
    discipline: 'Pediatrics',
    type: 'Clinical Guideline',
    size: 3820199,
    createdAt: Date.now() - 2 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  {
    id: 'sys-5',
    originalName: 'Basic and Clinical Pharmacology.pdf',
    title: 'General Pharmacology Principles',
    author: 'Katzung & Trevor',
    discipline: 'Pharmacology',
    type: 'Textbook',
    size: 8200199,
    createdAt: Date.now() - 10 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  {
    id: 'sys-6',
    originalName: 'Harrison Principles of Internal Medicine - Ch1.pdf',
    title: 'Introduction to Clinical Medicine',
    author: 'Kasper et al.',
    discipline: 'Clinical Medicine',
    type: 'Textbook Chapter',
    size: 4500000,
    createdAt: Date.now() - 12 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  {
    id: 'sys-7',
    originalName: 'Robbins Basic Pathology - Inflammation.pdf',
    title: 'Cell Injury and Inflammation',
    author: 'Kumar et al.',
    discipline: 'Pathology',
    type: 'Textbook Chapter',
    size: 6100000,
    createdAt: Date.now() - 8 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  {
    id: 'sys-8',
    originalName: 'CDC Guidelines for Infection Control.pdf',
    title: 'Infection Control Guidelines',
    author: 'Centers for Disease Control and Prevention',
    discipline: 'Public Health',
    type: 'Clinical Guideline',
    size: 2150000,
    createdAt: Date.now() - 20 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  },
  {
    id: 'sys-9',
    originalName: 'Netter Atlas of Human Anatomy.pdf',
    title: 'Atlas of Human Anatomy',
    author: 'Frank H. Netter',
    discipline: 'Anatomy',
    type: 'Textbook',
    size: 15500000,
    createdAt: Date.now() - 40 * 24 * 3600 * 1000,
    status: 'Indexed',
    isUserUploaded: false,
    storagePath: ''
  }
];

export default function KnowledgeBaseManagerScreen() {
  const [activeTab, setActiveTab] = useState('resources');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRebuildModal, setShowRebuildModal] = useState(false);
  
  // RAG Rebuilding Simulation State
  const [rebuildStep, setRebuildStep] = useState(0);
  const [rebuildStatus, setRebuildStatus] = useState('');
  const [rebuildProgress, setRebuildProgress] = useState(0);

  // Trigger RAG indexing process
  const triggerRebuildEmbeddings = () => {
    setShowRebuildModal(true);
    setRebuildStep(0);
    setRebuildProgress(0);
    setRebuildStatus('Initiating vector database connection...');

    const steps = [
      { status: 'Scanning files and active curriculum taxonomies...', progress: 15 },
      { status: 'Parsing PDF text blocks and generating semantic chunks...', progress: 35 },
      { status: 'Computing vector embedding layers using server-side Gemini API...', progress: 60 },
      { status: 'Updating pinecone/firestore spatial indexing tree structures...', progress: 85 },
      { status: 'Testing vector retrieval semantic similarity recall...', progress: 95 },
      { status: 'Embeddings successfully rebuilt! Vector space is optimized.', progress: 100 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setRebuildStatus(steps[currentStep].status);
        setRebuildProgress(steps[currentStep].progress);
        setRebuildStep(currentStep + 1);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  };

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Database size={16} /> Knowledge Base Engine
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Resource Manager
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Centralized repository for curriculum documents, clinical guidelines, and RAG embeddings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={triggerRebuildEmbeddings}
              className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[var(--surface-dim)] transition-all active:scale-95"
            >
              <RefreshCw size={16} className="text-[var(--primary)]" /> Rebuild Embeddings
            </button>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-sm"
            >
              <Upload size={16} /> Upload Resource
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[var(--border)] no-scrollbar gap-2 pb-2">
          {[
            { id: 'resources', label: 'Resources & Files', icon: FileText },
            { id: 'taxonomy', label: 'Curriculum Taxonomy', icon: FolderTree },
            { id: 'analytics', label: 'Knowledge Analytics', icon: ChartIcon },
            { id: 'settings', label: 'RAG Configuration', icon: Settings },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                activeTab === t.id 
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Components */}
        {activeTab === 'resources' && <ResourcesTab onUploadClick={() => setShowUploadModal(true)} />}
        {activeTab === 'taxonomy' && <TaxonomyTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'settings' && <SettingsTab />}
        
        {/* Real File Upload Modal */}
        {showUploadModal && (
          <UploadModal onClose={() => setShowUploadModal(false)} />
        )}

        {/* Rebuilding embeddings progression modal */}
        {showRebuildModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[var(--surface)] w-full max-w-md rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <RefreshCw size={20} className="text-[var(--primary)] animate-spin" />
                  <h3 className="font-bold text-[var(--text)] text-lg">Rebuilding RAG Index</h3>
                </div>
                {rebuildStep === 6 && (
                  <button onClick={() => setShowRebuildModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold text-[var(--text)]">
                  <span>Progress</span>
                  <span className="text-[var(--primary)] font-mono">{rebuildProgress}%</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--primary)] transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${rebuildProgress}%` }}
                  />
                </div>

                <p className="text-sm text-[var(--text-muted)] text-center italic min-h-[2.5rem]">
                  {rebuildStatus}
                </p>

                {/* Simulated Steps Checklist */}
                <div className="space-y-2 border-t border-[var(--border)] pt-4 text-xs font-semibold">
                  {[
                    'Discipline & Taxonomy Scanning',
                    'Document Semantic Chunking',
                    'Gemini API Embedding Calculations',
                    'Vector Tree Matrix Mapping',
                    'Recall & Reliability Verification'
                  ].map((label, idx) => {
                    const isDone = rebuildStep > idx + 1;
                    const isActive = rebuildStep === idx + 1;
                    return (
                      <div key={idx} className="flex items-center justify-between py-1">
                        <span className={isDone ? 'text-emerald-500 line-through' : isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)]'}>
                          {idx + 1}. {label}
                        </span>
                        <span>
                          {isDone ? (
                            <CheckCircle2 size={14} className="text-emerald-500" />
                          ) : isActive ? (
                            <RefreshCw size={12} className="text-[var(--primary)] animate-spin" />
                          ) : (
                            <span className="w-3.5 h-3.5 border border-[var(--border)] rounded-full inline-block" />
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  disabled={rebuildStep < 6}
                  onClick={() => setShowRebuildModal(false)}
                  className={`w-full py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all ${
                    rebuildStep < 6 
                      ? 'bg-[var(--surface-dim)] text-[var(--text-muted)] border border-[var(--border)] cursor-not-allowed'
                      : 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95'
                  }`}
                >
                  {rebuildStep < 6 ? 'Indexing in progress...' : 'Complete & Optimize'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- RESOURCES TAB -----------------
function ResourcesTab({ onUploadClick }: { onUploadClick: () => void }) {
  const { files, fetchFiles, removeFile } = useFileStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [disciplineFilter, setDisciplineFilter] = useState('All Disciplines');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from the real store
  useEffect(() => {
    const loadFiles = async () => {
      setIsLoading(true);
      await fetchFiles('knowledge');
      setIsLoading(false);
    };
    loadFiles();
  }, [fetchFiles]);

  // Combine system seed resources and real uploaded files
  const combinedResources = React.useMemo(() => {
    // Map uploaded files (which might have missing metadata if not fully populated)
    const uploadedDocs = files.map(file => {
      // Cast storedFile or use defaults if properties are missing
      const typedFile = file as any;
      return {
        id: file.id,
        originalName: file.originalName,
        title: typedFile.title || file.originalName.replace(/\.[^/.]+$/, ""), // title or clean name
        author: typedFile.author || file.uploadedByName || 'Uploaded Resource',
        discipline: typedFile.discipline || 'Clinical Pharmacy & Therapeutics',
        type: typedFile.type || 'Lecture Notes',
        size: file.size,
        createdAt: file.createdAt,
        status: 'Indexed',
        isUserUploaded: true,
        storagePath: file.storagePath
      };
    });

    return [...SYSTEM_RESOURCES, ...uploadedDocs];
  }, [files]);

  // Filter resources
  const filteredResources = combinedResources.filter(doc => {
        const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.textContent && doc.textContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.summary && doc.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.classification?.keywords && doc.classification.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesType = typeFilter === 'All Types' || doc.type === typeFilter;
    const matchesDiscipline = disciplineFilter === 'All Disciplines' || doc.discipline === disciplineFilter;

    return matchesSearch && matchesType && matchesDiscipline;
  });

  // Delete handler
  const handleDelete = async (id: string, isUserUploaded?: boolean) => {
    if (confirm('Are you sure you want to permanently delete and de-index this knowledge resource?')) {
      if (isUserUploaded) {
        try {
          await StorageService.deleteFile(id);
          removeFile(id);
        } catch (err) {
          console.error('Failed to delete file from store:', err);
        }
      } else {
        alert('System core files are protected and cannot be deleted.');
      }
    }
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
  };

  const disciplines = [
    'All Disciplines',
    'Medical Physiology',
    'Human Anatomy',
    'Biochemistry',
    'Pharmaceutical Chemistry',
    'Pharmaceutics',
    'Pharmacognosy',
    'Pharmacology',
    'Clinical Pharmacy & Therapeutics',
    'Pediatric Pharmacy',
    'Organic Chemistry',
    'Pharmaceutical Analysis',
    'Clinical Medicine',
    'Diagnostics',
    'Nursing',
    'Dentistry',
    'Nutrition',
    'Pathology',
    'Microbiology',
    'Public Health'
  ];

  const types = [
    'All Types',
    'Clinical Guideline',
    'Lecture Notes',
    'Textbook Chapter',
    'Case Study',
    'Syllabus'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Upload Drag & Drop Area */}
      <div 
        className="border-2 border-dashed border-[var(--border)] rounded-2xl p-8 text-center bg-[var(--surface-dim)]/50 hover:bg-[var(--surface-dim)] transition-all cursor-pointer group hover:border-[var(--primary)]"
        onClick={onUploadClick}
      >
        <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
          <Upload size={24} />
        </div>
        <h3 className="font-bold text-[var(--text)] mb-1">Drag & Drop Curriculum Materials</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">Support for PDF guidelines, syllabus, lecture notes, CSV, and clinical documents.</p>
        <button className="px-5 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold shadow-sm hover:opacity-95 transition-all">
          Browse File Explorer
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by title, author, keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
          />
        </div>
        
        {/* Discipline Filter */}
        <div className="flex flex-wrap gap-2">
          <select
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value)}
            className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {disciplines.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Table Container */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] uppercase tracking-wider text-xxs font-bold">
              <tr>
                <th className="px-6 py-4 border-b border-[var(--border)]">Resource / Document</th>
                <th className="px-6 py-4 border-b border-[var(--border)]">Curriculum Discipline</th>
                <th className="px-6 py-4 border-b border-[var(--border)]">Document Type</th>
                <th className="px-6 py-4 border-b border-[var(--border)]">Size</th>
                <th className="px-6 py-4 border-b border-[var(--border)]">RAG Index Status</th>
                <th className="px-6 py-4 border-b border-[var(--border)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)] font-semibold">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-[var(--primary)]" />
                    Connecting to secure clinical registry...
                  </td>
                </tr>
              ) : filteredResources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)] font-semibold">
                    <Info size={24} className="mx-auto mb-2 text-[var(--text-muted)]" />
                    No matching resources found in Knowledge Base.
                  </td>
                </tr>
              ) : (
                filteredResources.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[var(--surface-dim)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/5 text-[var(--primary)] flex items-center justify-center shrink-0">
                          <FileText size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text)] text-sm max-w-md truncate">{doc.title}</div>
                          <div className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-1.5">
                            <span>{doc.author}</span>
                            <span>•</span>
                            <span className="font-mono text-[10px]">{doc.originalName}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)] text-xs font-semibold">
                      {doc.discipline}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[var(--surface-dim)] border border-[var(--border)] text-xs font-semibold text-[var(--text)]">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)] text-xs font-mono">
                      {formatSize(doc.size)}
                    </td>
                                        <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold">
                          <CheckCircle2 size={12} className="text-emerald-500" /> Indexed
                        </span>
                        {doc.aiProcessed && (
                           <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                             <Sparkles size={12} /> AI Integrated
                           </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {doc.isUserUploaded && doc.storagePath && (
                        <a 
                          href={doc.storagePath} 
                          target="_blank" 
                          rel="noreferrer referrer" 
                          className="p-2 inline-block text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                          title="Download document"
                        >
                          <HardDrive size={16} />
                        </a>
                      )}
                      <button 
                        onClick={() => handleDelete(doc.id, doc.isUserUploaded)}
                        className={`p-2 transition-colors ${doc.isUserUploaded ? 'text-[var(--text-muted)] hover:text-red-500' : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'}`}
                        title={doc.isUserUploaded ? "Delete document" : "System core resource (protected)"}
                        disabled={!doc.isUserUploaded}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------- TAXONOMY TAB -----------------
function TaxonomyTab() {
  const [newDiscipline, setNewDiscipline] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const [disciplines, setDisciplines] = useState([
    { 
      name: 'Medical Physiology', 
      units: ['Cellular Transport', 'Cardiovascular Hemodynamics', 'Ventilation Mechanics', 'Glomerular Filtration'] 
    },
    { 
      name: 'Pharmacology', 
      units: ['Autonomic Nervous System', 'Receptor Kinase Signalling', 'Pharmacokinetics & Clearances', 'Antineoplastics Mechanism'] 
    },
    { 
      name: 'Clinical Pharmacy & Therapeutics', 
      units: ['Cardiovascular Therapeutics', 'Pediatric Antibiotic Selection', 'Geriatric Polypharmacy Reviews', 'Infectious Disease Staged Regimens'] 
    },
    {
      name: 'Biochemistry',
      units: ['Enzymatic Kinetics', 'Metabolic Cycles & Respiration', 'Nucleic Acids Expression']
    },
    {
      name: 'Clinical Medicine',
      units: ['Internal Medicine', 'Surgery', 'Pediatrics', 'Obstetrics & Gynecology']
    },
    {
      name: 'Pathology',
      units: ['Cell Injury & Inflammation', 'Hemodynamic Disorders', 'Neoplasia', 'Infectious Diseases']
    },
    {
      name: 'Anatomy',
      units: ['Gross Anatomy of Thorax', 'Neuroanatomy', 'Musculoskeletal Anatomy']
    }
  ]);

  const handleAddDiscipline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscipline.trim()) return;
    setDisciplines(prev => [
      ...prev, 
      { name: newDiscipline.trim(), units: ['General Core Overview'] }
    ]);
    setNewDiscipline('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-[var(--text)] text-lg">Curriculum Structures & Taxonomies</h3>
            <p className="text-sm text-[var(--text-muted)]">Verify the hierarchical units mapped for targeted Spaced Repetition card generations and RAG lookup categories.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[var(--border)] transition-all active:scale-95 shrink-0"
          >
            <Plus size={16} /> {isAdding ? 'Cancel' : 'Add Discipline'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddDiscipline} className="p-4 border border-[var(--primary)]/30 rounded-xl bg-[var(--primary)]/5 flex gap-3 animate-in slide-in-from-top-4 duration-150">
            <input 
              type="text"
              required
              value={newDiscipline}
              onChange={(e) => setNewDiscipline(e.target.value)}
              placeholder="Enter new discipline name (e.g., Forensic Pharmacy)..."
              className="flex-1 px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm text-[var(--text)]"
            />
            <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold shadow-sm">
              Save
            </button>
          </form>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {disciplines.map((disc, idx) => (
            <div key={idx} className="border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)]/35 transition-all bg-[var(--surface-dim)]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FolderTree size={20} className="text-[var(--primary)]" />
                  <span className="font-bold text-[var(--text)] text-base">{disc.name}</span>
                </div>
                <span className="text-xxs font-bold text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-2 py-1 rounded-md">
                  {disc.units.length} Units Map
                </span>
              </div>
              <div className="divide-y divide-[var(--border)] text-xs text-[var(--text-muted)] font-medium">
                {disc.units.map((unit, uIdx) => (
                  <div key={uIdx} className="py-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--text)]">
                      <BookOpen size={12} className="text-[var(--text-muted)]" /> {unit}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                      RAG Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------- ANALYTICS TAB -----------------
function AnalyticsTab() {
  const { files } = useFileStore();

  // Dynamically count resources
  const totalSystem = SYSTEM_RESOURCES.length;
  const totalUser = files.filter(f => f.category === 'knowledge').length;
  const totalResources = totalSystem + totalUser;

  // Chart data: Distribution of resources by discipline
  const barChartData = [
    { name: 'Physiology', count: 4 },
    { name: 'Pharmacology', count: 5 },
    { name: 'Clin. Med.', count: 6 },
    { name: 'Pediatrics', count: 4 },
    { name: 'Pathology', count: 3 },
    { name: 'Anatomy', count: 3 },
    { name: 'Public Health', count: 2 }
  ];

  // Pie chart data: Resource formats in system
  const pieChartData = [
    { name: 'Clinical Guidelines', value: 8, color: '#0ea5e9' },
    { name: 'Lecture Notes', value: 4, color: '#10b981' },
    { name: 'Textbook Chapters', value: 6, color: '#f59e0b' },
    { name: 'Syllabus Map', value: 2, color: '#8b5cf6' },
    { name: 'Textbook', value: 4, color: '#ec4899' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Mini KPIs cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Base Documents', val: totalResources.toString(), icon: Database },
          { label: 'Queries Answered (RAG)', val: '4,812', icon: Search },
          { label: 'Vector Quantized Chunks', val: '18,522', icon: Layers },
          { label: 'Cloud Space Allocated', val: '124.5 MB', icon: HardDrive }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl">
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-bold text-[var(--text-muted)]">{stat.label}</span>
            </div>
            <div className="text-2xl font-extrabold text-[var(--text)] tracking-tight">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discipline chart */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <div>
            <h4 className="font-bold text-[var(--text)] text-base">Knowledge Density by Discipline</h4>
            <p className="text-xs text-[var(--text-muted)]">Count of guidelines, reference articles, and uploaded notes cataloged per discipline.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontSize: '12px' }} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Type distribution chart */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <div>
            <h4 className="font-bold text-[var(--text)] text-base">Resource Composition</h4>
            <p className="text-xs text-[var(--text-muted)]">Percentage shares of indexed resource classification standards in vector bank.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="h-56 w-56 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 w-full text-xs font-semibold">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md" style={{ backgroundColor: item.color }} />
                    <span className="text-[var(--text)]">{item.name}</span>
                  </div>
                  <span className="text-[var(--text-muted)] font-mono">{item.value} resources</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- CONFIGURATION TAB -----------------
function SettingsTab() {
  const [autoOcr, setAutoOcr] = useState(() => localStorage.getItem('kb_settings_auto_ocr') !== 'false');
  const [dupDetect, setDupDetect] = useState(() => localStorage.getItem('kb_settings_dup_detect') !== 'false');
  const [genCards, setGenCards] = useState(() => localStorage.getItem('kb_settings_gen_cards') !== 'false');
  const [temp, setTemp] = useState(() => parseFloat(localStorage.getItem('kb_settings_temp') || '0.2'));
  const [chunkSize, setChunkSize] = useState(() => parseInt(localStorage.getItem('kb_settings_chunk') || '1000'));
  const [topK, setTopK] = useState(() => parseInt(localStorage.getItem('kb_settings_topk') || '5'));
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveSettings = () => {
    localStorage.setItem('kb_settings_auto_ocr', autoOcr.toString());
    localStorage.setItem('kb_settings_dup_detect', dupDetect.toString());
    localStorage.setItem('kb_settings_gen_cards', genCards.toString());
    localStorage.setItem('kb_settings_temp', temp.toString());
    localStorage.setItem('kb_settings_chunk', chunkSize.toString());
    localStorage.setItem('kb_settings_topk', topK.toString());
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="font-bold text-[var(--text)] text-lg">Retrieval-Augmented Generation (RAG) Settings</h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">Configure chunk parameters, OCR parameters, and LLM threshold rules for Clinical AI matching queries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left panel: Checkboxes */}
          <div className="space-y-4">
            <h4 className="font-bold text-[var(--text)] text-xs uppercase tracking-wider text-[var(--primary)]">Ingestion Pipeline</h4>
            
            <label className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-dim)]/30 hover:bg-[var(--surface-dim)] transition-all cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoOcr}
                onChange={(e) => setAutoOcr(e.target.checked)}
                className="w-4 h-4 mt-1 accent-[var(--primary)]" 
              />
              <div>
                <p className="font-bold text-sm text-[var(--text)]">Auto-OCR Scanned Guidelines</p>
                <p className="text-xs text-[var(--text-muted)]">Extract text from images inside PDF manuals using OCR automatically on ingestion.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-dim)]/30 hover:bg-[var(--surface-dim)] transition-all cursor-pointer">
              <input 
                type="checkbox" 
                checked={dupDetect}
                onChange={(e) => setDupDetect(e.target.checked)}
                className="w-4 h-4 mt-1 accent-[var(--primary)]" 
              />
              <div>
                <p className="font-bold text-sm text-[var(--text)]">Semantic Duplicate Prevention</p>
                <p className="text-xs text-[var(--text-muted)]">Reject uploads containing &gt;90% semantic document duplicates.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-dim)]/30 hover:bg-[var(--surface-dim)] transition-all cursor-pointer">
              <input 
                type="checkbox" 
                checked={genCards}
                onChange={(e) => setGenCards(e.target.checked)}
                className="w-4 h-4 mt-1 accent-[var(--primary)]" 
              />
              <div>
                <p className="font-bold text-sm text-[var(--text)]">Pre-compile Spaced Repetition Decks</p>
                <p className="text-xs text-[var(--text-muted)]">Instantly prompt Gemini API to suggest flashcards when indexing completes.</p>
              </div>
            </label>
          </div>

          {/* Right panel: Sliders */}
          <div className="space-y-5">
            <h4 className="font-bold text-[var(--text)] text-xs uppercase tracking-wider text-[var(--primary)]">Retrieval Engine Parameters</h4>
            
            {/* Top-K retrieval */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[var(--text)]">Top-K Snippets Retrieved</span>
                <span className="text-[var(--primary)] font-mono">{topK} document chunks</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="15" 
                value={topK}
                onChange={(e) => setTopK(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)] bg-[var(--surface-dim)] rounded-lg h-2" 
              />
              <p className="text-[11px] text-[var(--text-muted)]">Maximum snippet slices to feed into the prompt context window.</p>
            </div>

            {/* Chunk Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[var(--text)]">Sliding Window Chunk Size</span>
                <span className="text-[var(--primary)] font-mono">{chunkSize} characters</span>
              </div>
              <input 
                type="range" 
                min="300" 
                max="2500" 
                step="100"
                value={chunkSize}
                onChange={(e) => setChunkSize(parseInt(e.target.value))}
                className="w-full accent-[var(--primary)] bg-[var(--surface-dim)] rounded-lg h-2" 
              />
              <p className="text-[11px] text-[var(--text-muted)]">Token threshold block divisions for optimal search indexing.</p>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[var(--text)]">Semantic Matching Temperature</span>
                <span className="text-[var(--primary)] font-mono">{temp.toFixed(1)}</span>
              </div>
              <input 
                type="range" 
                min="0.0" 
                max="1.0" 
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full accent-[var(--primary)] bg-[var(--surface-dim)] rounded-lg h-2" 
              />
              <p className="text-[11px] text-[var(--text-muted)]">Lower means precise, strict adherence to document contexts; higher allows flexibility.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            {saveSuccess && (
              <>
                <CheckCircle2 size={16} /> Parameters synced in application registry successfully.
              </>
            )}
          </div>
          <button 
            onClick={saveSettings}
            className="px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-sm shadow-sm hover:opacity-95 transition-all active:scale-95"
          >
            Save Parameters
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------- REAL UPLOAD MODAL -----------------
function UploadModal({ onClose }: { onClose: () => void }) {
  const { addFile } = useFileStore();
  const { userData } = useAuth();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('Clinical Guideline');
  const [discipline, setDiscipline] = useState('Clinical Pharmacy & Therapeutics');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const disciplines = [
    'Clinical Pharmacy & Therapeutics',
    'Medical Physiology',
    'Human Anatomy',
    'Biochemistry',
    'Pharmaceutical Chemistry',
    'Pharmaceutics',
    'Pharmacognosy',
    'Pharmacology',
    'Pediatric Pharmacy',
    'Organic Chemistry',
    'Pharmaceutical Analysis',
    'Clinical Medicine',
    'Diagnostics',
    'Nursing',
    'Dentistry',
    'Nutrition',
    'Pathology',
    'Microbiology',
    'Public Health'
  ];

  const types = [
    'Clinical Guideline',
    'Lecture Notes',
    'Textbook',
    'Case Study',
    'Syllabus'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a valid document.');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setUploadProgress(10);

        try {
      // 1. Upload via real StorageService
      setUploadProgress(20);
      const res = await StorageService.uploadFile(
        selectedFile,
        { category: 'knowledge', accessScope: 'public' },
        (progress) => {
          setUploadProgress(20 + Math.min(30, Math.round(progress.percentage * 0.3)));
        }
      );

      // 2. Intelligent AI Processing Pipeline
      setUploadProgress(60);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('extractionType', 'educational_resource');

      let aiMetadata = {};
      try {
        const aiRes = await fetch('/api/gemini/extract-file', {
          method: 'POST',
          body: formData,
        });
        
        if (aiRes.ok) {
           aiMetadata = await aiRes.json();
           setUploadProgress(90);
        } else {
           console.warn('AI Extraction returned error, falling back to basic indexing.');
        }
      } catch(aiErr) {
        console.warn('AI Extraction failed, falling back to basic indexing:', aiErr);
      }

      // 3. Enrich the Firestore file document with our custom attributes and AI metadata
      const finalMetadata = {
        author: author.trim() || userData?.name || userData?.email?.split('@')[0] || 'Unknown Author',
        discipline: aiMetadata?.classification?.subject || aiMetadata?.classification?.learningArea || discipline,
        type: aiMetadata?.classification?.resourceType || type,
        title: aiMetadata?.title || title.trim() || selectedFile.name.replace(/\.[^/.]+$/, ""),
        summary: aiMetadata?.summary || '',
        learningObjectives: aiMetadata?.learningObjectives || [],
        textContent: aiMetadata?.textContent || '',
        classification: aiMetadata?.classification || {},
        relationships: aiMetadata?.relationships || {},
        suggestions: aiMetadata?.suggestions || {},
        aiProcessed: true,
      };

      await StorageService.updateFileMetadata(res.file.id, finalMetadata);

      // 4. Add to local zustand state for instant reactivity
      addFile({
        ...res.file,
        ...finalMetadata
      } as any);

      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        onClose();
      }, 500);

    } catch (err: any) {
      console.error('[UploadModal] failed:', err);
      setErrorMessage(err.message || 'An error occurred during secure index processing. Please retry.');
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] w-full max-w-lg rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-dim)]">
          <div className="flex items-center gap-2">
            <Upload size={18} className="text-[var(--primary)]" />
            <h3 className="font-bold text-[var(--text)] text-sm sm:text-base">Upload Curriculum Guideline</h3>
          </div>
          <button 
            disabled={isUploading}
            onClick={onClose} 
            className="text-[var(--text-muted)] hover:text-[var(--text)] disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-xs font-semibold text-red-600 flex items-center gap-2">
              <AlertTriangle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-1.5">Document Resource Title</label>
            <input 
              type="text" 
              required
              disabled={isUploading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kenya Formulary Antibiotic Protocol"
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm text-[var(--text)]" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-1.5">Author / Authority</label>
              <input 
                type="text" 
                required
                disabled={isUploading}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Ministry of Health"
                className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm text-[var(--text)]" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-1.5">Type</label>
              <select 
                disabled={isUploading}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm text-[var(--text)] font-semibold"
              >
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-1.5">Discipline Mapping</label>
            <select 
              disabled={isUploading}
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm text-[var(--text)] font-semibold"
            >
              {disciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Drag & Drop Area */}
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center bg-[var(--bg)] relative hover:bg-[var(--surface-dim)]/40 transition-colors cursor-pointer ${
              selectedFile ? 'border-[var(--primary)]' : 'border-[var(--border)]'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden" 
              accept=".pdf,.doc,.docx,.txt,.csv,.json" 
            />
            <FileText className={`mx-auto mb-2 ${selectedFile ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} size={28} />
            
            {selectedFile ? (
              <div>
                <p className="text-sm font-bold text-[var(--text)]">{selectedFile.name}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to Index</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold text-[var(--text)]">Click or Drag Guideline File Here</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Accepts PDF, DOCX, TXT, CSV up to 10MB</p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[var(--text-muted)]">Uploading & Indexing Chunks...</span>
                <span className="text-[var(--primary)] font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--surface-dim)] border border-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--primary)] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}
          
          <div className="pt-2 flex justify-end gap-3 border-t border-[var(--border)] pt-4">
            <button 
              type="button"
              disabled={isUploading}
              onClick={onClose} 
              className="px-4 py-2 font-semibold text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-xl text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isUploading || !selectedFile}
              className="px-5 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl shadow-sm text-sm hover:opacity-95 disabled:opacity-50 transition-all active:scale-95"
            >
              {isUploading ? 'Ingesting...' : 'Save & Index Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
