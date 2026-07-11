import React, { useState, useEffect } from 'react';
import { 
  Pill, Search, Loader2, ArrowRight, BookOpen,
  Sparkles, AlertTriangle, CheckCircle2, RefreshCw, User, Plus, Trash2, Info, HeartPulse, Activity, Check, ShieldAlert,
  Upload, FileUp, FileText, Download, Bookmark, Heart
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, query, where } from 'firebase/firestore';
import { Patient } from '../components/PatientQuickSummary';
import { getMonographCached, pinMonograph } from '../lib/getMonograph';
import { useAuth } from '../contexts/AuthContext';
import { DrugMonographService } from '../services/drugMonograph.service';
import SavedMonographsPanel, { SaveMonographButton } from '../components/SavedMonographsPanel';

interface QuickDrug {
  name: string;
  category: string;
}

interface AddedMedication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  route: string;
}

interface Interaction {
  type: string;
  severity: 'Critical' | 'Moderate' | 'Minor' | string;
  title: string;
  description: string;
  recommendation: string;
}

interface PatientSafetyFlag {
  severity: 'Critical' | 'Warning' | 'Info' | string;
  message: string;
  rational: string;
}

interface MonitoringParam {
  parameter: string;
  frequency: string;
  rationale: string;
}

interface InteractionResult {
  hasInteractions: boolean;
  summary: string;
  interactions: Interaction[];
  patientSafetyFlags: PatientSafetyFlag[];
  monitoringParameters: MonitoringParam[];
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
  const { userData } = useAuth();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'monograph' | 'interaction' | 'library'>('monograph');

  // Tab 1: Monograph Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [savedDrugs, setSavedDrugs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monograph, setMonograph] = useState<string | null>(null);
  const [monographKey, setMonographKey] = useState<string>('');
  const [currentMonographId, setCurrentMonographId] = useState<string | null>(null);

  // Tab 2: Interaction Checker State
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [addedMeds, setAddedMeds] = useState<AddedMedication[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<InteractionResult | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  // New Medication Form State
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('');
  const [newMedRoute, setNewMedRoute] = useState('Oral');

  // AI Document Extraction State
  const [entryMode, setEntryMode] = useState<'manual' | 'upload'>('manual');
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setFileUploading(true);
    setUploadError(null);
    setUploadSuccessMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('extractionType', 'medications');

      const res = await fetch('/api/gemini/extract-file', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze and extract medications');
      }

      const data = await res.json();
      if (data.medications && Array.isArray(data.medications)) {
        if (data.medications.length === 0) {
          throw new Error("No medications could be extracted from the document. Please ensure the handwriting is legible or try a clearer image.");
        }

        const parsedMeds: AddedMedication[] = data.medications.map((m: any) => ({
          id: Math.random().toString(36).substring(2, 9),
          name: m.name || 'Unknown Medication',
          dose: m.dose || '',
          frequency: m.frequency || '',
          route: m.route || 'Oral',
        }));

        setAddedMeds((prev) => [...prev, ...parsedMeds]);
        setUploadSuccessMessage(`Successfully extracted and added ${parsedMeds.length} medications!`);
        setCheckResult(null);
      } else {
        throw new Error('Could not find structured medications list in the document.');
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'An error occurred during file extraction.');
    } finally {
      setFileUploading(false);
    }
  };

  // Fetch Ward Patients context for Interaction cross-referencing
  useEffect(() => {
    const fetchPatientsList = async () => {
      setLoadingPatients(true);
      try {
        const qSnapshot = await getDocs(collection(db, 'patients'));
        const list: Patient[] = [];
        qSnapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Patient);
        });
        setPatients(list);
      } catch (err) {
        console.error('Error loading patients list in DrugIndexScreen:', err);
      } finally {
        setLoadingPatients(false);
      }
    };
    fetchPatientsList();
  }, []);

  // Fetch drug monographs helper
  useEffect(() => {
    const loadSavedDrugs = async () => {
      // Load from localStorage (immediate)
      const saved = localStorage.getItem('savedDrugs');
      if (saved) {
        try {
          setSavedDrugs(JSON.parse(saved));
        } catch (e) {}
      }
      
      // Load from Firestore if authenticated
      if (userData?.id) {
        try {
          const q = query(
            collection(db, 'saved_drugs'),
            where('userId', '==', userData.id)
          );
          const snapshot = await getDocs(q);
          const firestoreDrugs = snapshot.docs.map(doc => doc.data().drugName);
          
          // Merge with local (Firestore takes precedence for new entries)
          if (firestoreDrugs.length > 0) {
            const merged = [...new Set([...firestoreDrugs, ...savedDrugs])].slice(0, 10);
            setSavedDrugs(merged);
            localStorage.setItem('savedDrugs', JSON.stringify(merged));
          }
        } catch (err) {
          console.warn('[DrugIndex] Failed to load saved drugs from Firestore:', err);
        }
      }
    };
    
    loadSavedDrugs();
  }, []);

  const saveDrugSearch = async (drug: string) => {
    const clean = drug.trim();
    if (!clean) return;
    setSavedDrugs(prev => {
      let next = [clean, ...prev.filter(d => d.toLowerCase() !== clean.toLowerCase())];
      if (next.length > 10) next = next.slice(0, 10);
      localStorage.setItem('savedDrugs', JSON.stringify(next));
      return next;
    });
    
    // Also save to Firestore
    if (userData?.id) {
      try {
        await setDoc(doc(db, 'saved_drugs', `${userData.id}_${clean.toLowerCase().replace(/\s+/g, '_')}`), {
          userId: userData.id,
          drugName: clean,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('[DrugIndex] Failed to save drug to Firestore:', err);
      }
    }
  };

  const fetchDrugProfile = async (query: string, categoryName?: string) => {
    setIsLoading(true);
    setError(null);
    setMonograph(null);
    setCurrentMonographId(null);
    try {
      const entry = await getMonographCached(query, categoryName);
      setMonograph(entry.content);
      setMonographKey(entry.key);

      // Look up Supabase monograph for save button
      const searchName = query || categoryName || '';
      if (searchName) {
        const monograph = await DrugMonographService.getByName(searchName);
        if (monograph) setCurrentMonographId(monograph.id);
      }
      
      if (query) {
        saveDrugSearch(query);
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

  // Evaluate Medication Treatment Plan & Patient context hazards
  const handleCheckInteractions = async () => {
    if (addedMeds.length === 0) {
      setCheckError('Please add at least one medication to evaluate.');
      return;
    }
    setIsChecking(true);
    setCheckError(null);
    setCheckResult(null);

    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    try {
      const res = await fetch('/api/gemini/check-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medications: addedMeds,
          patientContext: selectedPatient || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze safety regimen');
      }

      const data = await res.json();
      setCheckResult(data);
    } catch (err: any) {
      console.error(err);
      setCheckError(err.message || 'An error occurred while evaluating interactions.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Kenya Drug Index (KDI)</h1>
        <p className="text-[var(--text-muted)] text-sm">
          Access comprehensive clinical drug monographs, WHO essential classifications, and perform dynamic, patient-contextualized interaction audits.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-[var(--border)] gap-2">
        <button
          onClick={() => setActiveTab('monograph')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'monograph'
              ? 'border-[var(--primary)] text-[var(--primary)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <BookOpen size={16} />
          KDI Search & Monographs
        </button>
        <button
          onClick={() => setActiveTab('interaction')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'interaction'
              ? 'border-[var(--primary)] text-[var(--primary)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <Sparkles size={16} className="text-[var(--primary)] animate-pulse" />
          Real-Time Interaction Checker
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'library'
              ? 'border-rose-500 text-rose-600 font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          <Heart size={16} className={activeTab === 'library' ? 'text-rose-500' : ''} />
          My Library
        </button>
      </div>

      {activeTab === 'library' ? (
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
      ) : activeTab === 'monograph' ? (
        <div className="space-y-6 animate-in fade-in duration-200">
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
              className="px-5 py-2.5 bg-[var(--primary)] hover:opacity-90 transition-opacity text-[var(--primary-foreground)] rounded-lg text-sm font-semibold flex items-center gap-2 cursor-pointer"
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
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] hover:text-[var(--primary)] transition-all flex items-center gap-1 cursor-pointer"
              >
                <Pill size={12} />
                {drug.name}
              </button>
            ))}
          </div>

          {/* Saved Offline Searches */}
          {savedDrugs.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
                <Bookmark size={12} /> Saved (Offline):
              </span>
              {savedDrugs.map((drug) => (
                <button
                  key={drug}
                  onClick={() => handleQuickDrugClick(drug)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface-dim)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] hover:text-[var(--primary)] transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                  title="Available Offline"
                >
                  <Pill size={12} className="text-[var(--primary)]" />
                  {drug}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Left sidebar: categories */}
            <div className="md:col-span-1 space-y-2">
              <div className="px-4 py-3 bg-[var(--surface-dim)] rounded-xl font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider border-l-4 border-[var(--primary)] mb-3 text-left">
                Therapeutic Classes
              </div>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected 
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md shadow-primary/10' 
                        : 'bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-dim)] border border-[var(--border)]'
                    }`}
                  >
                    <span>{cat}</span>
                    <ArrowRight size={14} className={`transition-transform duration-200 group-hover:translate-x-1 ${isSelected ? 'text-[var(--primary-foreground)]' : 'text-[var(--text-dim)]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Main Panel: Monograph presentation */}
            <div className="md:col-span-2 lg:col-span-3 min-h-[400px] min-w-0">
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
                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    Retry Request
                  </button>
                </div>
              ) : monograph ? (
                <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-4 sm:p-6 md:p-8 shadow-sm space-y-6 text-left animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--primary-container)] rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[var(--text)]">Medication Monograph</h2>
                        <p className="text-xs text-[var(--text-muted)] font-mono">SOURCE: CLINICAL KNOWLEDGE ENGINE • KDI CITATION</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {currentMonographId && (
                        <SaveMonographButton monographId={currentMonographId} monographName={searchQuery} />
                      )}
                      <button 
                        onClick={handlePinForOffline}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-dim)] hover:bg-[var(--primary-container)] text-[var(--text-secondary)] hover:text-[var(--primary)] rounded-lg text-xs font-semibold transition-colors border border-[var(--border)] hover:border-[var(--primary)]/30 shrink-0"
                      >
                        <Download size={14} />
                        Pin for Offline Access
                      </button>
                    </div>
                  </div>

                  <div className="markdown-body text-[var(--text)] max-w-none min-w-0">
                    <ReactMarkdown
                      components={{
                        table: ({ children }) => (
                          <div className="overflow-x-auto w-full my-4 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--surface-dim)]">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => <thead className="bg-[var(--surface-dim)] border-b border-[var(--border)]">{children}</thead>,
                        tbody: ({ children }) => <tbody className="divide-y divide-[var(--border)]/60">{children}</tbody>,
                        tr: ({ children }) => <tr className="hover:bg-[var(--surface-dim)]/40 transition-colors">{children}</tr>,
                        th: ({ children }) => <th className="p-3 font-semibold text-[var(--text)] uppercase tracking-wider text-[10px] sm:text-xs bg-[var(--surface-dim)] whitespace-nowrap">{children}</th>,
                        td: ({ children }) => <td className="p-3 text-[var(--text-secondary)] leading-normal">{children}</td>,
                        h1: ({ children }) => <h1 className="text-lg sm:text-xl font-bold text-[var(--primary)] mt-6 mb-3 tracking-tight border-b border-[var(--border)] pb-1.5">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base sm:text-lg font-semibold text-[var(--text)] mt-5 mb-2.5 tracking-tight">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm sm:text-base font-semibold text-[var(--text-secondary)] mt-4 mb-2">{children}</h3>,
                        p: ({ children }) => <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-3 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-sm text-[var(--text-secondary)]">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-sm text-[var(--text-secondary)]">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed text-sm">{children}</li>,
                      }}
                    >
                      {monograph}
                    </ReactMarkdown>
                  </div>
                  
                  {/* National Library of Medicine Attribution */}
                  <div className="mt-6 pt-4 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[var(--text-muted)] font-sans select-none">
                    <span>This product uses publicly available data from the U.S. National Library of Medicine (NLM) and openFDA.</span>
                    <span className="font-mono bg-[var(--surface-dim)] text-cyan-500 font-bold px-2 py-0.5 rounded border border-[var(--border)]">FDA/NLM Grounded</span>
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
      ) : (
        /* Real-Time Drug Interaction Checker Panel */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
          
          {/* Left Panel: Builder (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Patient Selector Card */}
            <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)]">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <User size={16} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-[var(--text)]">Patient Physiology Context</h3>
                  <p className="text-[10px] text-[var(--text-muted)]">Cross-reference age, gender, labs, and alerts</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedPatientId}
                    onChange={(e) => {
                      setSelectedPatientId(e.target.value);
                      setCheckResult(null);
                    }}
                    className="w-full bg-[var(--surface-dim)] text-xs text-[var(--text)] border border-[var(--border)] rounded-xl px-3 py-2.5 outline-none font-semibold cursor-pointer"
                  >
                    <option value="">-- No Patient Profile Selected (General Check) --</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.ipNumber}) - {p.ward}
                      </option>
                    ))}
                  </select>
                  {selectedPatientId && (
                    <button
                      onClick={() => {
                        setSelectedPatientId('');
                        setCheckResult(null);
                      }}
                      className="p-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer text-xs font-bold shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Patient mini-dashboard if selected */}
                {selectedPatientId && (() => {
                  const p = patients.find(pat => pat.id === selectedPatientId);
                  if (!p) return null;
                  return (
                    <div className="bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl p-3.5 space-y-3 text-left animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Age / Sex</span>
                          <span className="font-bold text-[var(--text)]">{p.age}y / {p.sex}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Location</span>
                          <span className="font-bold text-[var(--text)]">{p.ward}</span>
                        </div>
                      </div>

                      {/* Vitals summary */}
                      <div className="border-t border-[var(--border)] pt-2.5">
                        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block mb-1">Clinical Vitals</span>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700">BP: {p.vitals?.bp || 'N/A'}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700">HR: {p.vitals?.hr || 'N/A'} bpm</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700">SpO2: {p.vitals?.spo2 || 'N/A'}%</span>
                        </div>
                      </div>

                      {/* Alerts if any */}
                      {p.alerts && p.alerts.length > 0 && (
                        <div className="border-t border-[var(--border)] pt-2.5 space-y-1">
                          <span className="text-[10px] font-bold text-red-500 uppercase block">Active Alerts</span>
                          {p.alerts.map((a, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[10px] text-red-600 font-medium">
                              <AlertTriangle size={11} className="mt-0.5 shrink-0" />
                              <span>{a.message}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Labs snippet if any */}
                      {p.labs && p.labs.length > 0 && (
                        <div className="border-t border-[var(--border)] pt-2.5">
                          <span className="text-[10px] font-bold text-blue-500 uppercase block mb-1">Key Labs</span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {p.labs.slice(0, 4).map((l, idx) => (
                              <div key={idx} className="text-[10px] font-medium text-[var(--text)] flex justify-between bg-[var(--surface)] p-1 rounded border border-[var(--border)] px-1.5">
                                <span>{l.testName}</span>
                                <span className={`font-bold ${l.status === 'high' || l.status === 'critical-high' ? 'text-red-600' : l.status === 'low' || l.status === 'critical-low' ? 'text-blue-600' : 'text-green-600'}`}>
                                  {l.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Treatment Plan Medication Builder Card */}
            <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[var(--primary-container)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                    <Pill size={16} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-[var(--text)]">Active Medications</h3>
                    <p className="text-[10px] text-[var(--text-muted)]">Build the patient's pharmacological plan</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  {addedMeds.length} added
                </span>
              </div>

              {/* Entry Mode Selector */}
              <div className="grid grid-cols-2 bg-[var(--surface-dim)] p-1 rounded-xl border border-[var(--border)] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setEntryMode('manual')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    entryMode === 'manual'
                      ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm border border-[var(--border)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEntryMode('upload');
                    setUploadError(null);
                    setUploadSuccessMessage(null);
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    entryMode === 'upload'
                      ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm border border-[var(--border)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Sparkles size={12} className="text-[var(--primary)] animate-pulse" />
                  AI Document Scan
                </button>
              </div>

              {entryMode === 'manual' ? (
                /* Input Form */
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newMedName.trim()) return;
                  const newMed: AddedMedication = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: newMedName.trim(),
                    dose: newMedDose.trim(),
                    frequency: newMedFreq.trim(),
                    route: newMedRoute,
                  };
                  setAddedMeds([...addedMeds, newMed]);
                  setNewMedName('');
                  setNewMedDose('');
                  setNewMedFreq('');
                  setNewMedRoute('Oral');
                  setCheckResult(null);
                }} className="space-y-3">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Medication Name (Generic/Brand)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Warfarin, Amlodipine, Ibuprofen..."
                      value={newMedName}
                      onChange={(e) => setNewMedName(e.target.value)}
                      className="w-full bg-[var(--surface-dim)] text-xs text-[var(--text)] border border-[var(--border)] rounded-xl px-3 py-2.5 outline-none font-semibold focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Dose</label>
                      <input
                        type="text"
                        placeholder="e.g. 5mg, 500mg"
                        value={newMedDose}
                        onChange={(e) => setNewMedDose(e.target.value)}
                        className="w-full bg-[var(--surface-dim)] text-xs text-[var(--text)] border border-[var(--border)] rounded-xl px-2.5 py-2 outline-none font-semibold focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Frequency</label>
                      <input
                        type="text"
                        placeholder="e.g. OD, BD, TDS"
                        value={newMedFreq}
                        onChange={(e) => setNewMedFreq(e.target.value)}
                        className="w-full bg-[var(--surface-dim)] text-xs text-[var(--text)] border border-[var(--border)] rounded-xl px-2.5 py-2 outline-none font-semibold focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Route</label>
                      <select
                        value={newMedRoute}
                        onChange={(e) => setNewMedRoute(e.target.value)}
                        className="w-full bg-[var(--surface-dim)] text-xs text-[var(--text)] border border-[var(--border)] rounded-xl px-2 py-2 outline-none font-semibold cursor-pointer focus:border-[var(--primary)]"
                      >
                        <option value="Oral">Oral</option>
                        <option value="IV">IV</option>
                        <option value="IM">IM</option>
                        <option value="SC">SC</option>
                        <option value="Topical">Topical</option>
                        <option value="Inhalation">Inhalation</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-950 hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} /> Add Medication
                  </button>
                </form>
              ) : (
                /* AI Document Scan Component */
                <div className="space-y-3 text-left animate-in fade-in duration-200">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Upload Prescription or Treatment Sheet</span>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Let Clinova OS scan a photo or PDF to instantly extract patient medications.</p>
                  </div>
                  
                  {/* Drag and Drop Zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition-all flex flex-col items-center justify-center relative ${
                      dragActive 
                        ? 'border-[var(--primary)] bg-[var(--primary-container)]/10' 
                        : 'border-[var(--border)] bg-[var(--surface-dim)] hover:border-[var(--text-dim)]'
                    }`}
                  >
                    <input
                      type="file"
                      id="med-file-upload"
                      accept=".pdf,image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={fileUploading}
                    />
                    
                    {fileUploading ? (
                      <div className="space-y-3 py-2 flex flex-col items-center justify-center">
                        <Loader2 size={24} className="text-[var(--primary)] animate-spin" />
                        <div className="text-center">
                          <p className="text-xs font-bold text-[var(--text)]">Scanning Document...</p>
                          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Clinova is extracting medication records</p>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="med-file-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-2">
                        <FileUp size={24} className="text-[var(--text-dim)] mb-2 hover:text-[var(--primary)]" />
                        <span className="text-xs font-bold text-[var(--text)] block">
                          Drag & drop your file here, or <span className="text-[var(--primary)] underline">browse</span>
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] mt-1">
                          Supports PDF or Image (Prescription, Ward Chart)
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Upload Error Banner */}
                  {uploadError && (
                    <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl flex items-start gap-2 border border-red-100 animate-in slide-in-from-top-1">
                      <AlertTriangle size={14} className="text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold">Extraction Error:</span> {uploadError}
                      </div>
                    </div>
                  )}

                  {/* Upload Success Banner */}
                  {uploadSuccessMessage && (
                    <div className="p-3 bg-green-50 text-green-800 text-xs rounded-xl flex items-start gap-2 border border-green-100 animate-in slide-in-from-top-1">
                      <CheckCircle2 size={14} className="text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold">Success!</span> {uploadSuccessMessage}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* List of Added Medications */}
              {addedMeds.length > 0 ? (
                <div className="space-y-2 border-t border-[var(--border)] pt-4 max-h-[220px] overflow-y-auto pr-1">
                  {addedMeds.map((med) => (
                    <div key={med.id} className="flex items-center justify-between bg-[var(--surface-dim)] p-2.5 rounded-xl border border-[var(--border)] hover:border-[var(--text-dim)] transition-all animate-in fade-in duration-200">
                      <div className="flex items-center gap-2.5 text-left">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                          <Pill size={12} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[var(--text)] block">{med.name}</span>
                          {(med.dose || med.frequency) && (
                            <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                              {med.dose} • {med.frequency} • {med.route}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setAddedMeds(addedMeds.filter(m => m.id !== med.id));
                          setCheckResult(null);
                        }}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 text-center text-[var(--text-muted)] text-xs">
                  No medications added yet. Type a drug name above or load a quick test template below.
                </div>
              )}

              {/* Clinical Scenarios Templates */}
              <div className="border-t border-[var(--border)] pt-4 space-y-2 text-left">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Quick Test Scenarios (High Conflict)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setAddedMeds([
                        { id: '1', name: 'Sildenafil', dose: '50mg', frequency: 'PRN', route: 'Oral' },
                        { id: '2', name: 'Nitroglycerin', dose: '0.5mg', frequency: 'PRN', route: 'Oral' }
                      ]);
                      setSelectedPatientId('');
                      setCheckResult(null);
                    }}
                    className="px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 rounded-lg text-[10px] font-bold text-center cursor-pointer transition-colors"
                  >
                    Sildenafil + Nitrate
                  </button>
                  <button
                    onClick={() => {
                      setAddedMeds([
                        { id: '1', name: 'Warfarin', dose: '5mg', frequency: 'OD', route: 'Oral' },
                        { id: '2', name: 'Aspirin', dose: '75mg', frequency: 'OD', route: 'Oral' },
                        { id: '3', name: 'Ibuprofen', dose: '400mg', frequency: 'TDS', route: 'Oral' }
                      ]);
                      setSelectedPatientId('');
                      setCheckResult(null);
                    }}
                    className="px-2.5 py-1.5 bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100 rounded-lg text-[10px] font-bold text-center cursor-pointer transition-colors"
                  >
                    Triple Antiplatelet/NSAID
                  </button>
                  <button
                    onClick={() => {
                      setAddedMeds([
                        { id: '1', name: 'Spironolactone', dose: '25mg', frequency: 'OD', route: 'Oral' },
                        { id: '2', name: 'Potassium Chloride', dose: '600mg', frequency: 'BD', route: 'Oral' }
                      ]);
                      // Auto select a patient with High Potassium alert if available
                      const hyperKPat = patients.find(p => p.alerts?.some(a => a.message.toLowerCase().includes('potassium') || a.message.toLowerCase().includes('hyperkalemia')));
                      if (hyperKPat) {
                        setSelectedPatientId(hyperKPat.id);
                      }
                      setCheckResult(null);
                    }}
                    className="px-2.5 py-1.5 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-100 rounded-lg text-[10px] font-bold text-center cursor-pointer transition-colors"
                  >
                    Spironolactone + K
                  </button>
                </div>
              </div>

              {/* Evaluate Trigger Button */}
              <button
                onClick={handleCheckInteractions}
                disabled={isChecking || addedMeds.length === 0}
                className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isChecking ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analyzing Safety Regimen...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Evaluate Regimen Safety (AI Check)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel: Results View (col-span-7) */}
          <div className="lg:col-span-7 min-h-[450px]">
            {isChecking ? (
              <div className="bg-[var(--surface)] w-full h-full rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-4 bg-[var(--primary-container)] rounded-full animate-bounce">
                  <Sparkles size={36} className="text-[var(--primary)]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--text)]">Running Safety Diagnostics</h3>
                  <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
                    Cross-referencing drug interaction databases, KDI formulary alerts, Beers geriatric hazard lists, and patient laboratory indicators...
                  </p>
                </div>
                
                {/* Micro Steps Stepper */}
                <div className="space-y-2.5 text-xs text-[var(--text-muted)] font-mono text-left max-w-xs mx-auto">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <Check size={12} /> Map physical active ingredients...
                  </div>
                  <div className="flex items-center gap-2 text-[var(--primary)] font-bold animate-pulse">
                    <Activity size={12} className="animate-spin" /> Assessing drug-drug interactions...
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-slate-300"></div> Cross-checking vital & alert telemetry...
                  </div>
                </div>
              </div>
            ) : checkError ? (
              <div className="bg-[var(--surface)] w-full h-full rounded-2xl border border-red-100 p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600">Clinical Evaluation Failed</h3>
                  <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{checkError}</p>
                </div>
                <button 
                  onClick={handleCheckInteractions}
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Retry Analysis
                </button>
              </div>
            ) : checkResult ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Overall Evaluation Summary Card */}
                <div className={`p-6 rounded-2xl border text-left space-y-3 ${
                  checkResult.interactions.some(i => i.severity === 'Critical') || checkResult.patientSafetyFlags.some(f => f.severity === 'Critical')
                    ? 'bg-red-50/50 border-red-200 text-red-950'
                    : checkResult.interactions.length > 0 || checkResult.patientSafetyFlags.length > 0
                    ? 'bg-yellow-50/50 border-yellow-200 text-yellow-950'
                    : 'bg-green-50/50 border-green-200 text-green-950'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl shrink-0 ${
                      checkResult.interactions.some(i => i.severity === 'Critical') || checkResult.patientSafetyFlags.some(f => f.severity === 'Critical')
                        ? 'bg-red-100 text-red-600'
                        : checkResult.interactions.length > 0 || checkResult.patientSafetyFlags.length > 0
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {checkResult.interactions.some(i => i.severity === 'Critical') || checkResult.patientSafetyFlags.some(f => f.severity === 'Critical') ? (
                        <ShieldAlert size={24} />
                      ) : checkResult.interactions.length > 0 || checkResult.patientSafetyFlags.length > 0 ? (
                        <AlertTriangle size={24} />
                      ) : (
                        <CheckCircle2 size={24} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold uppercase tracking-wider">
                        {checkResult.interactions.some(i => i.severity === 'Critical') || checkResult.patientSafetyFlags.some(f => f.severity === 'Critical')
                          ? 'Critical Warning: High Risk Regimen'
                          : checkResult.interactions.length > 0 || checkResult.patientSafetyFlags.length > 0
                          ? 'Caution Required: Moderate Concerns Detected'
                          : 'Review Complete: Safe/No Conflicts Found'}
                      </h3>
                      <p className="text-xs leading-relaxed opacity-90">{checkResult.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Drug-Drug Conflicts Section */}
                <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm text-left space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                    <div className="w-7 h-7 bg-[var(--primary-container)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                      <Activity size={14} />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text)]">Identify Drug-Drug Interactions</h3>
                  </div>

                  {checkResult.interactions && checkResult.interactions.length > 0 ? (
                    <div className="space-y-4">
                      {checkResult.interactions.map((interaction, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border space-y-2.5 transition-all ${
                          interaction.severity === 'Critical'
                            ? 'bg-red-50/20 border-red-100'
                            : interaction.severity === 'Moderate'
                            ? 'bg-yellow-50/20 border-yellow-100'
                            : 'bg-blue-50/20 border-blue-100'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                interaction.severity === 'Critical' ? 'bg-red-500' : interaction.severity === 'Moderate' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></span>
                              {interaction.title}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              interaction.severity === 'Critical'
                                ? 'bg-red-100 text-red-700'
                                : interaction.severity === 'Moderate'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {interaction.severity}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-4">{interaction.description}</p>
                          <div className="bg-[var(--surface)] p-2.5 rounded-lg border border-[var(--border)] text-xs flex items-start gap-1.5">
                            <Info size={14} className="text-[var(--primary)] shrink-0 mt-0.5" />
                            <span className="font-semibold text-[var(--text)] text-left leading-relaxed">
                              <span className="font-bold text-[var(--primary)]">Recommendation:</span> {interaction.recommendation}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50/30 border border-green-100 text-green-800 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span>No active drug-drug conflicts or therapeutic duplications identified in this medication list.</span>
                    </div>
                  )}
                </div>

                {/* Patient Physiological/Alert safety checks if selected */}
                <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm text-left space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <User size={14} />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text)]">Patient-Specific Safety Warnings</h3>
                  </div>

                  {checkResult.patientSafetyFlags && checkResult.patientSafetyFlags.length > 0 ? (
                    <div className="space-y-3">
                      {checkResult.patientSafetyFlags.map((flag, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                            flag.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            <AlertTriangle size={14} />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-[var(--text)] block">{flag.message}</span>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{flag.rational}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50/30 border border-green-100 text-green-800 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span>All drugs appear compatible with the patient's age, gender, active vital signs, and laboratory clearance factors.</span>
                    </div>
                  )}
                </div>

                {/* Actionable Monitoring Parameters */}
                {checkResult.monitoringParameters && checkResult.monitoringParameters.length > 0 && (
                  <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm text-left space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                      <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                        <HeartPulse size={14} />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--text)]">Clinical Monitoring Guidelines</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {checkResult.monitoringParameters.map((param, idx) => (
                        <div key={idx} className="p-3.5 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)] space-y-1 text-left">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-xs font-bold text-[var(--text)]">{param.parameter}</span>
                            <span className="bg-slate-100 text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                              {param.frequency}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{param.rationale}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* National Library of Medicine Attribution */}
                <div className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)]/40 text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[var(--text-muted)] font-sans select-none">
                  <span>This safety engine utilizes clinical references and drug interaction databases from the U.S. National Library of Medicine (NLM).</span>
                  <span className="font-mono bg-[var(--surface-dim)] text-emerald-500 font-bold px-2 py-0.5 rounded border border-[var(--border)]">NLM RxNorm Verified</span>
                </div>

              </div>
            ) : (
              <div className="bg-[var(--surface)] w-full h-full rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={32} className="text-[var(--text-muted)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Awaiting Interaction Review</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-sm">
                  Add medications to the plan on the left, optionally select an active ward patient to load physical context, and trigger safety review.
                </p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
