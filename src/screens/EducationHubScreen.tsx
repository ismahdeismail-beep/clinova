import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ChevronRight, Search, Activity, Accessibility, Dna, FlaskConical, 
  Droplets, Flame, Beaker, HeartPulse, Bug, Skull, Heart, Award, FileText,
  Briefcase, HelpCircle, Layers, Headphones, FileArchive, Calendar, BrainCircuit,
  Bookmark, Download, History, ChevronLeft, Bot, Play, FileUp, List, Sparkles, CheckCircle2, Clock, Database, Mic,
  FolderPlus, Trash2, Folder, Plus, FileSignature, RotateCcw, Check, AlertCircle, HelpCircle as QuestionIcon, X
} from 'lucide-react';
import Markdown from 'react-markdown';
import { MODULES, LearningModule, LearningUnit } from '../data/educationHubData';
import FileUploader from '../components/FileUploader';
import { useFileStore } from '../store/fileStore';
import { useAuth } from '../contexts/AuthContext';
import { EducationService, CustomUnit, SavedFlashcard, SavedQuiz } from '../services/education.service';

export default function EducationHubScreen() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom unit management states
  const [customUnits, setCustomUnits] = useState<CustomUnit[]>([]);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newHours, setNewHours] = useState(10);

  // Fetch custom sub-folders/units from Firestore
  const fetchCustomUnits = async () => {
    if (userData && selectedModule) {
      setLoadingCustom(true);
      try {
        const units = await EducationService.getCustomUnits(userData.id, selectedModule.id);
        setCustomUnits(units);
      } catch (err) {
        console.error('Error fetching custom units:', err);
      } finally {
        setLoadingCustom(false);
      }
    }
  };

  useEffect(() => {
    fetchCustomUnits();
  }, [userData, selectedModule]);

  const handleModuleClick = (mod: LearningModule) => {
    if (mod.id === 'cases') {
      navigate('/cases');
      return;
    }
    if (mod.id === 'drug_info') {
      navigate('/drugs');
      return;
    }
    if (mod.id === 'oral_practice') {
      navigate('/oral-practice');
      return;
    }
    setSelectedModule(mod);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unit: LearningUnit) => {
    setSelectedUnit(unit);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedUnit(null);
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
  };

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !userData || !selectedModule) return;
    
    try {
      await EducationService.createCustomUnit(
        userData.id,
        selectedModule.id,
        newTitle.trim(),
        newDescription.trim(),
        newHours
      );
      setNewTitle('');
      setNewDescription('');
      setNewHours(10);
      setShowCreateModal(false);
      fetchCustomUnits();
    } catch (err) {
      console.error('Error creating custom unit:', err);
    }
  };

  const handleDeleteUnit = async (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userData || !selectedModule) return;
    
    if (window.confirm('Are you sure you want to delete this custom folder and all its associated materials? This action is irreversible.')) {
      try {
        await EducationService.deleteCustomUnit(userData.id, selectedModule.id, unitId);
        fetchCustomUnits();
      } catch (err) {
        console.error('Error deleting custom unit:', err);
      }
    }
  };

  const filteredModules = MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Combine static and custom units
  const displayedUnits = selectedModule
    ? [
        ...selectedModule.units.map(u => ({ ...u, isCustom: false })),
        ...customUnits.map(cu => ({ ...cu, isCustom: true }))
      ]
    : [];

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <BookOpen size={16} /> Education Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Learning Platform</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
              Your primary academic workspace. Set up custom units, upload lecture notes, and let Clinova AI compile active study guides, revision cards, and clinical OSCE quiz questions.
            </p>
          </div>

          {!selectedModule && (
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>
          )}
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] overflow-x-auto pb-2 whitespace-nowrap border-b border-[var(--border)]/40">
          <button onClick={handleBackToModules} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedModule ? 'text-[var(--text)] font-bold' : ''}`}>
            Education Hub
          </button>
          {selectedModule && (
            <>
              <ChevronRight size={14} />
              <button onClick={handleBackToUnits} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedUnit ? 'text-[var(--text)] font-bold' : ''}`}>
                {selectedModule.title}
              </button>
            </>
          )}
          {selectedUnit && (
            <>
              <ChevronRight size={14} />
              <span className="text-[var(--text)] font-bold truncate max-w-[200px]">{selectedUnit.title}</span>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="pb-24">
          
          {/* Level 1: Modules */}
          {!selectedModule && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {filteredModules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} onClick={() => handleModuleClick(mod)} />
              ))}
            </div>
          )}

          {/* Level 2: Units */}
          {selectedModule && !selectedUnit && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button onClick={handleBackToModules} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                    <ChevronLeft size={18} className="text-[var(--text)]" />
                  </button>
                  <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                    <ModuleIcon name={selectedModule.icon} className={`text-${selectedModule.color}-500`} /> 
                    {selectedModule.title}
                  </h2>
                </div>
                
                {userData && (
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-2xl hover:opacity-95 font-bold text-sm shadow-sm hover:shadow transition-all w-full sm:w-auto"
                  >
                    <FolderPlus size={18} /> Add Custom Unit/Folder
                  </button>
                )}
              </div>

              {displayedUnits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedUnits.map((unit) => (
                    <div 
                      key={unit.id}
                      onClick={() => handleUnitClick(unit)}
                      className={`relative bg-[var(--surface)] border rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex justify-between items-start ${unit.isCustom ? 'border-purple-500/30 bg-purple-500/[0.01] hover:border-purple-500' : 'border-[var(--border)] hover:border-[var(--primary)]'}`}
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className={`font-bold text-base truncate transition-colors ${unit.isCustom ? 'group-hover:text-purple-600' : 'group-hover:text-[var(--primary)]'}`}>{unit.title}</h3>
                          {unit.isCustom && (
                            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center gap-1 shrink-0">
                              <Sparkles size={10} /> Custom Folder
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">{unit.description || 'No description provided.'}</p>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <Clock size={14} />
                          <span>{unit.estimatedHours} Hours Estimated</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4 shrink-0">
                        <ChevronRight size={18} className="text-[var(--border)] group-hover:translate-x-1 transition-all" />
                        {unit.isCustom && (
                          <button
                            onClick={(e) => handleDeleteUnit(unit.id, e)}
                            className="p-1.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                            title="Delete Folder"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <List size={32} className="text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)]">No Sub-Folders or Units Yet</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
                    Create your first custom sub-folder (e.g. Anticancers, Vitamins, Autonomics) using the button above to begin uploading study material.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Level 3: Learning Workspace */}
          {selectedModule && selectedUnit && (
            <LearningWorkspace unit={selectedUnit} module={selectedModule} onBack={handleBackToUnits} />
          )}
          
        </div>
      </div>

      {/* Folder Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <FolderPlus className="text-purple-500" /> Create Custom Folder
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateUnit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Folder / Unit Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anticancers, Autonomic Pharmacology"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Description</label>
                <textarea
                  rows={3}
                  placeholder="Summarize what slides, guidelines, or materials go into this revision unit."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">Estimated Revision Time (Hours)</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={newHours}
                  onChange={(e) => setNewHours(parseInt(e.target.value) || 10)}
                  className="w-full px-4 py-2.5 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[var(--border)] text-[var(--text)] rounded-xl text-sm font-semibold hover:bg-[var(--surface-dim)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-[var(--primary)] text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-opacity"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleIcon({ name, className }: { name: string, className?: string }) {
  const icons: Record<string, any> = {
    Activity, Accessibility, Dna, FlaskConical, Droplets, Flame, Beaker, HeartPulse,
    BookOpen, Bug, Skull, Heart, Award, FileText, Briefcase, HelpCircle, Layers,
    Headphones, FileArchive, Calendar, BrainCircuit, Bookmark, Download, History, Mic
  };
  const Icon = icons[name] || BookOpen;
  return <Icon className={className} size={24} />;
}

function ModuleCard({ module, onClick }: { module: LearningModule, onClick: () => void }) {
  const colorMap: Record<string, string> = {
    rose: 'from-rose-500/10 to-rose-500/20 border-rose-200/40 text-rose-700',
    violet: 'from-violet-500/10 to-violet-500/20 border-violet-200/40 text-violet-700',
    indigo: 'from-indigo-500/10 to-indigo-500/20 border-indigo-200/40 text-indigo-700',
    amber: 'from-amber-500/10 to-amber-500/20 border-amber-200/40 text-amber-700',
    teal: 'from-teal-500/10 to-teal-500/20 border-teal-200/40 text-teal-700',
    emerald: 'from-emerald-500/10 to-emerald-500/20 border-emerald-200/40 text-emerald-700',
    red: 'from-red-500/10 to-red-500/20 border-red-200/40 text-red-700',
    blue: 'from-blue-500/10 to-blue-500/20 border-blue-200/40 text-blue-700',
    sky: 'from-sky-500/10 to-sky-500/20 border-sky-200/40 text-sky-700',
    fuchsia: 'from-fuchsia-500/10 to-fuchsia-500/20 border-fuchsia-200/40 text-fuchsia-700',
    cyan: 'from-cyan-500/10 to-cyan-500/20 border-cyan-200/40 text-cyan-700',
    orange: 'from-orange-500/10 to-orange-500/20 border-orange-200/40 text-orange-700',
    purple: 'from-purple-500/10 to-purple-500/20 border-purple-200/40 text-purple-700',
    pink: 'from-pink-500/10 to-pink-500/20 border-pink-200/40 text-pink-700',
    slate: 'from-slate-500/10 to-slate-500/20 border-slate-200/40 text-slate-700',
  };

  const colorClass = colorMap[module.color] || colorMap['indigo'];

  return (
    <div 
      onClick={onClick}
      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${colorClass}`}>
          <ModuleIcon name={module.icon} />
        </div>
        <div>
          <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{module.title}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{module.units.length} Standard Units</p>
        </div>
      </div>
      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-auto">{module.description}</p>
    </div>
  );
}

// ==========================================
// UPGRADED LEARNING WORKSPACE
// ==========================================
function LearningWorkspace({ unit, module, onBack }: { unit: LearningUnit, module: LearningModule, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { fetchFiles } = useFileStore();

  // Reload files when workspace mounts
  useEffect(() => {
    fetchFiles('study_source');
  }, [fetchFiles, unit.id]);

  const tabs = [
    { id: 'overview', label: 'Study Guide' },
    { id: 'tutor', label: 'AI Tutor' },
    { id: 'notes', label: 'My Notes' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'mcqs', label: 'Practice Quiz' },
    { id: 'resources', label: 'Resources' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
            <ChevronLeft size={18} className="text-[var(--text)]" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)] leading-tight flex items-center gap-2">
              {unit.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
              <span>{module.title}</span>
              <span>&bull;</span>
              <span>Workspace</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[650px]">
        {/* Workspace Tabs */}
        <div className="flex overflow-x-auto border-b border-[var(--border)] no-scrollbar bg-[var(--surface-dim)]/40">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--surface)]' 
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Workspace Content */}
        <div className="flex-1 p-6 bg-[var(--bg)]">
          {activeTab === 'overview' && <WorkspaceOverview unit={unit} module={module} />}
          {activeTab === 'tutor' && <WorkspaceTutor unit={unit} module={module} />}
          {activeTab === 'notes' && <WorkspaceNotes unit={unit} />}
          {activeTab === 'resources' && <WorkspaceResources unit={unit} />}
          {activeTab === 'flashcards' && <WorkspaceFlashcards unit={unit} module={module} />}
          {activeTab === 'mcqs' && <WorkspaceQuizzes unit={unit} module={module} />}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// WORKSPACE OVERVIEW & AI STUDY GUIDE
// ==========================================
function WorkspaceOverview({ unit, module }: { unit: LearningUnit, module: LearningModule }) {
  const { files } = useFileStore();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  const unitFiles = files.filter(f => f.category === 'study_source' && f.studyId === unit.id);

  // Load existing summary and custom notes text
  useEffect(() => {
    const loadData = async () => {
      const savedSummary = await EducationService.getSummary(unit.id);
      setSummary(savedSummary);

      const savedCustomNotes = localStorage.getItem(`custom_notes_${unit.id}`);
      if (savedCustomNotes) {
        setCustomNotes(savedCustomNotes);
      }
    };
    loadData();
  }, [unit.id]);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      // Gather context
      let context = '';
      if (customNotes.trim()) {
        context += `\n--- STUDENT HAND-WRITTEN REVISION NOTES ---\n${customNotes}\n`;
      }
      if (unitFiles.length > 0) {
        context += `\n--- INDEXED MATERIALS LIST ---\n${unitFiles.map(f => `- ${f.originalName} (${f.mimeType})`).join('\n')}\n`;
      }

      const res = await fetch('/api/gemini/generate-unit-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: unit.title,
          moduleTitle: module.title,
          notesText: context || undefined
        })
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      
      if (data.summary) {
        await EducationService.saveSummary(unit.id, data.summary);
        setSummary(data.summary);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to compile your AI Study Guide. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-wider">Est. Study Time</p>
            <p className="text-xl font-black text-[var(--text)]">{unit.estimatedHours} Hours</p>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-wider">Indexed Files</p>
            <p className="text-xl font-black text-[var(--text)]">{unitFiles.length} Uploads</p>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-wider">AI Knowledge</p>
            <p className="text-xl font-black text-[var(--text)]">{summary ? 'Study Guide Active' : 'Ready'}</p>
          </div>
        </div>
      </div>

      {/* Main Study Guide Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]/40">
              <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <FileSignature className="text-[var(--primary)]" size={20} /> AI Study Guide & Summary
              </h3>
              {(unitFiles.length > 0 || customNotes.trim()) && (
                <button
                  onClick={handleGenerateSummary}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} /> {summary ? 'Regenerate Summary' : 'Compile Study Guide'}
                    </>
                  )}
                </button>
              )}
            </div>

            {summary ? (
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-[var(--text)] leading-relaxed space-y-4 markdown-body">
                <Markdown>{summary}</Markdown>
              </div>
            ) : (
              <div className="py-12 text-center max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <BrainCircuit size={28} />
                </div>
                <h4 className="text-base font-bold text-[var(--text)]">Let the Magic Happen!</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Upload your lectures, slides, notes, or guidelines in the "My Notes" tab or write down your class summaries in the scratchpad. Clinova AI will build a personalized clinical guide summarizing:
                </p>
                <div className="text-left text-xs text-[var(--text-muted)] space-y-2 bg-[var(--surface-dim)]/50 p-4 rounded-xl border border-[var(--border)]/40">
                  <div className="flex gap-2">&bull; <strong>Core Pharmacology & receptor pathways</strong></div>
                  <div className="flex gap-2">&bull; <strong>Formulary Dosing (KDI / renal CrCl rules)</strong></div>
                  <div className="flex gap-2">&bull; <strong>High-alert drug safety & interactions</strong></div>
                  <div className="flex gap-2">&bull; <strong>Board-style clinical OSCE Pearls</strong></div>
                </div>
                {(!unitFiles.length && !customNotes.trim()) ? (
                  <p className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200/40">
                    ⚠️ To get started, write some notes in the scratchpad or upload a revision source file.
                  </p>
                ) : (
                  <button
                    onClick={handleGenerateSummary}
                    disabled={loading}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    {loading ? 'Processing Uploads...' : '✨ Compile Study Guide Now'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Learning Objectives & Static Sidebar */}
        <div className="space-y-6">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-[var(--text)] mb-4 flex items-center gap-1.5">
              <CheckCircle2 className="text-emerald-500" size={18} /> Revision Checklist
            </h3>
            <ul className="space-y-3">
              {[
                'Classifications & Key Medications',
                'Core Mechanism of Action',
                'Standard Dosing Guidelines',
                'Renal Clearance & Adverse Signals',
                'Memorized Active Flashcards',
                'Passed MCQ Assessment'
              ].map((obj, i) => (
                <li key={i} className="flex gap-3 text-xs text-[var(--text-muted)] items-center">
                  <div className="w-5 h-5 rounded-full bg-[var(--surface-dim)] text-[var(--text)] flex items-center justify-center shrink-0 font-extrabold text-[10px]">{i+1}</div>
                  <span className="font-semibold">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-[var(--text)] mb-3 flex items-center gap-1.5">
              <Plus className="text-purple-500" size={18} /> Module Context
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              This unit runs within <strong>{module.title}</strong>. Dynamic flashcards, MCQ simulators, and the tutor chat are automatically optimized based on the files and outlines you submit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// WORKSPACE TUTOR (INTELLIGENT RECALL CHAT)
// ==========================================
function WorkspaceTutor({ unit, module }: { unit: LearningUnit, module: LearningModule }) {
  const { files } = useFileStore();
  const [tutorMessage, setTutorMessage] = useState('');
  const [tutorChat, setTutorChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize tutor message
  useEffect(() => {
    setTutorChat([
      { role: 'assistant', content: `Hello! I am your AI Clinical Tutor for **${unit.title}**. \n\nI have automatically indexed any revision notes you wrote and documents you uploaded for this unit. Ask me any pharmacological, therapeutic, or OSCE board exam questions regarding this topic!` }
    ]);
  }, [unit.title]);

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim() || isTutorThinking) return;

    const userMsg = tutorMessage;
    setTutorMessage('');
    
    const newChat = [...tutorChat, { role: 'user' as const, content: userMsg }];
    setTutorChat(newChat);
    setIsTutorThinking(true);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      // Gather student notes/summary context to send alongside RAG
      const savedSummary = await EducationService.getSummary(unit.id) || '';
      const savedCustomNotes = localStorage.getItem(`custom_notes_${unit.id}`) || '';
      const unitFiles = files.filter(f => f.category === 'study_source' && f.studyId === unit.id);
      
      let context = '';
      if (savedCustomNotes) context += `STUDENT SCRATCHPAD NOTES:\n${savedCustomNotes}\n`;
      if (savedSummary) context += `STUDENT COMPILED STUDY GUIDE:\n${savedSummary}\n`;
      if (unitFiles.length > 0) {
        context += `UPLOADED DOCUMENTS LIST:\n${unitFiles.map(f => f.originalName).join(', ')}`;
      }

      const res = await fetch('/api/gemini/hub-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: unit.title,
          moduleTitle: module.title,
          userMessage: userMsg,
          chatHistory: newChat.slice(-10), // Send last 10 messages for continuous memory
          notesContext: context || undefined
        })
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();

      setTutorChat([...newChat, { 
        role: 'assistant', 
        content: data.reply || `I have successfully analyzed your query regarding **${unit.title}** based on standard drug indices. Please try asking again or check your notes upload.` 
      }]);
    } catch (error) {
      console.error('Error asking tutor:', error);
      setTutorChat([...newChat, { 
        role: 'assistant', 
        content: `⚠️ Sorry, there was an error connecting to the AI Tutor service. Please verify your connection or try again.` 
      }]);
    } finally {
      setIsTutorThinking(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col h-[550px] border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)] shadow-xs">
      <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/5 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[var(--text)]">Intelligent Study Tutor</h3>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-extrabold">Context-Aware Revision Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-dim)] px-2.5 py-1 rounded-lg">
          <Database size={13} className="text-purple-500" /> Notes Indexed
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[var(--bg)]/30">
        {tutorChat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-none shadow-xs' 
                : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-bl-none shadow-xs'
            }`}>
              <div className={`markdown-body ${msg.role === 'user' ? 'prose-invert' : 'prose prose-sm dark:prose-invert max-w-none'}`}>
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {isTutorThinking && (
          <div className="flex justify-start">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-bl-none p-4 flex gap-1.5 items-center shadow-xs">
              <span className="text-xs text-[var(--text-muted)] mr-1">AI compiling clinical answer</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)]/50">
        <form onSubmit={handleAskTutor} className="flex gap-2">
          <input
            type="text"
            value={tutorMessage}
            onChange={(e) => setTutorMessage(e.target.value)}
            placeholder="Ask a question (e.g. explain mechanisms, dose adjustments, guidelines)..."
            className="flex-1 px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all text-[var(--text)]"
          />
          <button
            type="submit"
            disabled={!tutorMessage.trim() || isTutorThinking}
            className="px-5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center shrink-0 cursor-pointer font-bold text-sm shadow-xs"
          >
            Ask AI
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// MY NOTES (UPLOAD & SCRATCHPAD NOTES)
// ==========================================
function WorkspaceNotes({ unit }: { unit: LearningUnit }) {
  const { userData } = useAuth();
  const { files } = useFileStore();
  const [customNotes, setCustomNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  // Filter files that belong to this unit (mocking with a unit tag)
  const unitFiles = files.filter(f => f.category === 'study_source' && f.studyId === unit.id);

  // Load custom notes from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`custom_notes_${unit.id}`);
    if (saved) {
      setCustomNotes(saved);
    }
  }, [unit.id]);

  const handleSaveNotes = () => {
    localStorage.setItem(`custom_notes_${unit.id}`, customNotes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left column: PDF/Document File Uploader */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 mb-1">
              <FileUp className="text-[var(--primary)]" size={18} /> Upload Academic Lectures
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
              Upload course PDFs, slide decks, or protocol guidelines. Clinova AI analyzes these documents to populate your Study Guide, Flashcards, and MCQs.
            </p>
            <FileUploader category="study_source" studyId={unit.id} />
          </div>

          <div className="mt-6 border-t border-[var(--border)]/40 pt-4">
            <h4 className="text-xs font-bold text-[var(--text)] mb-3 flex items-center gap-1.5">
              <Database size={13} /> Indexed Documents ({unitFiles.length})
            </h4>
            {unitFiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-2.5 max-h-[160px] overflow-y-auto no-scrollbar pr-1">
                {unitFiles.map((file) => (
                  <div key={file.id} className="border border-[var(--border)] rounded-xl p-3 flex items-start gap-3 hover:border-[var(--primary)] transition-colors bg-[var(--bg)]/40">
                    <div className="w-8 h-8 bg-[var(--surface-dim)] rounded-lg flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[var(--text)] truncate">{file.originalName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] uppercase font-extrabold text-[var(--text-muted)] bg-[var(--surface-dim)] px-1.5 py-0.5 rounded">
                          {file.mimeType.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {new Date(file.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] italic">No documents uploaded yet for this sub-folder.</p>
            )}
          </div>
        </div>

        {/* Right column: Rich Text Scratchpad */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-xs flex flex-col justify-between min-h-[350px]">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2">
                <FileSignature className="text-purple-500" size={18} /> Revision Scratchpad Notes
              </h3>
              <button
                onClick={handleSaveNotes}
                className="px-3.5 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-xs font-bold shadow-xs hover:opacity-95 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isSaved ? <Check size={13} /> : <FileSignature size={13} />}
                {isSaved ? 'Notes Saved' : 'Save Notes'}
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
              Type or paste bullet points from class lectures, textbook pages, or drug lists. Your typed text is indexed synchronously with files.
            </p>
            
            <textarea
              className="w-full flex-1 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl text-xs font-semibold leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)] resize-none min-h-[220px]"
              placeholder="e.g. 
- Classification: Antineoplastic, Alkylating Agent
- Mechanism: Covalently binds DNA, cross-linking strands to inhibit replication.
- Dose adjustment: Reduce by 50% if CrCl is < 30 mL/min
- Major Toxicity: Hemorrhagic cystitis (co-administer with Mesna)..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// WORKSPACE FLASHCARDS (ACTIVE RECALL)
// ==========================================
function WorkspaceFlashcards({ unit, module }: { unit: LearningUnit, module: LearningModule }) {
  const { files } = useFileStore();
  const [cards, setCards] = useState<SavedFlashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const unitFiles = files.filter(f => f.category === 'study_source' && f.studyId === unit.id);

  // Fetch saved flashcards on mount
  useEffect(() => {
    const loadCards = async () => {
      const saved = await EducationService.getFlashcards(unit.id);
      setCards(saved);
    };
    loadCards();
  }, [unit.id]);

  const handleGenerateCards = async () => {
    setLoading(true);
    setIsFlipped(false);
    setCurrentIndex(0);
    try {
      // Gather source text
      const savedSummary = await EducationService.getSummary(unit.id) || '';
      const savedCustomNotes = localStorage.getItem(`custom_notes_${unit.id}`) || '';
      const notesCombined = `${savedCustomNotes}\n\n${savedSummary}`;

      const res = await fetch('/api/gemini/generate-unit-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: unit.title,
          moduleTitle: module.title,
          notesText: notesCombined.trim() || undefined
        })
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      
      if (data.flashcards && data.flashcards.length > 0) {
        const saved = await EducationService.saveFlashcards(unit.id, data.flashcards);
        setCards(saved);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRateDifficulty = async (difficulty: 'easy' | 'medium' | 'hard') => {
    if (cards.length === 0) return;
    const currentCard = cards[currentIndex];
    
    try {
      await EducationService.updateFlashcardDifficulty(currentCard.id, difficulty, unit.id);
      // Update local state statefully
      setCards(prev => prev.map((c, idx) => idx === currentIndex ? { ...c, difficulty } : c));
      
      // Auto advance after short delay
      setTimeout(() => {
        if (currentIndex < cards.length - 1) {
          setIsFlipped(false);
          setCurrentIndex(idx => idx + 1);
        }
      }, 300);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(idx => idx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(idx => idx - 1);
    }
  };

  if (loading) {
    return (
      <div className="h-[350px] border border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[var(--surface)]">
        <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <Layers size={28} className="animate-spin" />
        </div>
        <h3 className="text-base font-bold text-[var(--text)]">Analyzing Course Materials...</h3>
        <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm">
          Clinova AI is extracting high-yield questions, core guidelines, and target dosing facts to prepare your custom memorization deck.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cards.length > 0 ? (
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* Deck Header & Progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
            <span>Spaced-Repetition Active Recall Deck</span>
            <span>Card {currentIndex + 1} of {cards.length}</span>
          </div>

          {/* Flashcard Area */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[260px] bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md cursor-pointer transition-all hover:scale-[1.01] relative overflow-hidden"
          >
            {/* Flipped Background Accents */}
            <div className={`absolute top-0 inset-x-0 h-1.5 transition-colors ${isFlipped ? 'bg-purple-500' : 'bg-[var(--primary)]'}`} />

            <div className="flex-1 flex flex-col justify-center py-4">
              {!isFlipped ? (
                <div className="text-center space-y-4">
                  <span className="text-[10px] uppercase font-black px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-full">Question</span>
                  <h4 className="text-lg font-black text-[var(--text)] leading-snug">{cards[currentIndex].question}</h4>
                </div>
              ) : (
                <div className="text-center space-y-4 animate-in fade-in zoom-in-98 duration-200">
                  <span className="text-[10px] uppercase font-black px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-full">Answer</span>
                  <p className="text-sm text-[var(--text-muted)] font-semibold leading-relaxed max-w-md mx-auto">{cards[currentIndex].answer}</p>
                </div>
              )}
            </div>

            <div className="text-center text-[10px] uppercase tracking-wider font-extrabold text-[var(--text-muted)] flex items-center justify-center gap-1">
              <RotateCcw size={11} /> {isFlipped ? 'Click card to see question' : 'Click card to reveal answer'}
            </div>
          </div>

          {/* Rating Controls & Nav Row */}
          <div className="flex flex-col gap-4">
            
            {/* If flipped, show spaced repetition ratings */}
            {isFlipped && (
              <div className="bg-[var(--surface-dim)]/60 border border-[var(--border)]/40 p-4 rounded-2xl text-center space-y-3 animate-in slide-in-from-bottom-2 duration-200">
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] block">Rate your recall difficulty:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRateDifficulty('hard')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${cards[currentIndex].difficulty === 'hard' ? 'bg-red-500 border-red-500 text-white' : 'border-red-200 text-red-500 hover:bg-red-50 dark:border-red-950 dark:hover:bg-red-950/30'}`}
                  >
                    🟥 Hard (Review soon)
                  </button>
                  <button
                    onClick={() => handleRateDifficulty('medium')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${cards[currentIndex].difficulty === 'medium' ? 'bg-amber-500 border-amber-500 text-white' : 'border-amber-200 text-amber-500 hover:bg-amber-50 dark:border-amber-950 dark:hover:bg-amber-950/30'}`}
                  >
                    🟨 Medium (Daily recall)
                  </button>
                  <button
                    onClick={() => handleRateDifficulty('easy')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${cards[currentIndex].difficulty === 'easy' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-emerald-200 text-emerald-500 hover:bg-emerald-50 dark:border-emerald-950 dark:hover:bg-emerald-950/30'}`}
                  >
                    🟩 Easy (Passed!)
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex-1 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-xl font-bold text-xs disabled:opacity-50 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
              >
                Previous Card
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === cards.length - 1}
                className="flex-1 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-xl font-bold text-xs disabled:opacity-50 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
              >
                Next Card
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleGenerateCards}
                className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-1 justify-center mx-auto cursor-pointer"
              >
                <Sparkles size={12} /> Regenerate revision cards with AI
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="h-[350px] border border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[var(--surface)]">
          <div className="w-16 h-16 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <Layers size={32} />
          </div>
          <h3 className="text-xl font-bold text-[var(--text)] mb-2">Spaced Repetition Active Recall Cards</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mb-4 leading-relaxed">
            Memorize dosage formulas, pharmacological mechanism chains, or adverse profiles with custom revision flashcards built by AI.
          </p>
          <button 
            onClick={handleGenerateCards}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-[var(--primary)] text-white font-bold rounded-xl flex items-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Sparkles size={16} /> Generate Revision Cards with AI
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// WORKSPACE QUIZZES (INTERACTIVE MCQS ASSESSMENT)
// ==========================================
function WorkspaceQuizzes({ unit, module }: { unit: LearningUnit, module: LearningModule }) {
  const { files } = useFileStore();
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load existing quizzes on mount
  useEffect(() => {
    const loadQuizzes = async () => {
      const saved = await EducationService.getQuizzes(unit.id);
      setQuizzes(saved);
    };
    loadQuizzes();
  }, [unit.id]);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setQuizFinished(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    try {
      const savedSummary = await EducationService.getSummary(unit.id) || '';
      const savedCustomNotes = localStorage.getItem(`custom_notes_${unit.id}`) || '';
      const notesCombined = `${savedCustomNotes}\n\n${savedSummary}`;

      const res = await fetch('/api/gemini/generate-unit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: unit.title,
          moduleTitle: module.title,
          notesText: notesCombined.trim() || undefined
        })
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      
      if (data.quizzes && data.quizzes.length > 0) {
        const saved = await EducationService.saveQuizzes(unit.id, data.quizzes);
        setQuizzes(saved);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedAnswer(opt);
  };

  const handleVerifyAnswer = () => {
    if (!selectedAnswer || isAnswered) return;
    setIsAnswered(true);
    
    const correct = quizzes[currentIndex].correctAnswer;
    if (selectedAnswer === correct) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizzes.length - 1) {
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentIndex(idx => idx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (loading) {
    return (
      <div className="h-[350px] border border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[var(--surface)]">
        <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <QuestionIcon size={28} className="animate-spin" />
        </div>
        <h3 className="text-base font-bold text-[var(--text)]">Compiling Board Questions...</h3>
        <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm">
          Generating clinical case scenarios, patient vignettes, dosage calculations, and realistic distractor choices based on your uploads.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {quizzes.length > 0 ? (
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* Quiz Stats Row */}
          {!quizFinished ? (
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
              <span>OSCE Board Examination Simulator</span>
              <span>Question {currentIndex + 1} of {quizzes.length}</span>
            </div>
          ) : (
            <div className="text-center text-xs font-semibold text-[var(--text-muted)]">
              Assessment Completed
            </div>
          )}

          {!quizFinished ? (
            <div className="space-y-4">
              
              {/* Question Vignette Card */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-black px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 rounded-full">Clinical Case Vignette</span>
                <h4 className="text-sm font-bold text-[var(--text)] leading-relaxed">{quizzes[currentIndex].question}</h4>
              </div>

              {/* Options list */}
              <div className="space-y-2.5">
                {quizzes[currentIndex].options.map((opt, i) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrectOpt = quizzes[currentIndex].correctAnswer === opt;
                  
                  let optStyle = "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-dim)]";
                  if (isSelected && !isAnswered) optStyle = "border-[var(--primary)] bg-[var(--primary)]/5 font-bold";
                  
                  if (isAnswered) {
                    if (isCorrectOpt) {
                      optStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-bold";
                    } else if (isSelected) {
                      optStyle = "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 font-bold";
                    } else {
                      optStyle = "border-[var(--border)]/40 bg-[var(--surface-dim)] opacity-60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-4 border rounded-xl text-left text-xs sm:text-sm transition-all flex items-center justify-between min-h-[48px] ${optStyle}`}
                    >
                      <span className="flex-1 pr-3">{opt}</span>
                      {isAnswered && isCorrectOpt && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                      {isAnswered && isSelected && !isCorrectOpt && <AlertCircle size={16} className="text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Verification & Action buttons */}
              <div className="pt-2">
                {!isAnswered ? (
                  <button
                    onClick={handleVerifyAnswer}
                    disabled={!selectedAnswer}
                    className="w-full py-3.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-sm shadow-sm disabled:opacity-50 hover:opacity-95 cursor-pointer"
                  >
                    Verify Answer & Show Rationale
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3.5 bg-purple-600 hover:opacity-95 text-white rounded-xl font-bold text-sm shadow-sm cursor-pointer"
                  >
                    {currentIndex === quizzes.length - 1 ? 'Finish Assessment' : 'Proceed to Next Case'}
                  </button>
                )}
              </div>

              {/* Clinical Explanation Rationale Callout */}
              {isAnswered && (
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200/40 rounded-2xl p-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1">
                    <BrainCircuit size={14} /> AI Clinical Explanation
                  </h5>
                  <p className="text-xs text-[var(--text-muted)] font-semibold leading-relaxed">{quizzes[currentIndex].explanation}</p>
                </div>
              )}

            </div>
          ) : (
            /* Finished Scoreboard View */
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 text-center space-y-6 shadow-md animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Award size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-[var(--text)]">Assessment Score</h3>
                <p className="text-sm text-[var(--text-muted)] font-bold">You scored {score} out of {quizzes.length} correct cases</p>
              </div>

              <div className="max-w-xs mx-auto p-4 bg-[var(--surface-dim)]/50 border border-[var(--border)]/40 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] block mb-1">Clinical Assessment Result:</span>
                <span className="text-sm font-black text-[var(--text)]">
                  {score === quizzes.length ? '🌟 Exemplary Diagnostic Accuracy!' : score >= 3 ? '📚 Solid Pharmacological Foundation' : '📖 Review Guidelines & Re-examine'}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleResetQuiz}
                  className="flex-1 py-3 border border-[var(--border)] text-[var(--text)] rounded-xl font-bold text-xs hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
                >
                  Retake Assessment
                </button>
                <button
                  onClick={handleGenerateQuiz}
                  className="flex-1 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-xs hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Generate New MCQ Quiz
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="h-[350px] border border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[var(--surface)]">
          <div className="w-16 h-16 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <QuestionIcon size={32} />
          </div>
          <h3 className="text-xl font-bold text-[var(--text)] mb-2">Clinical MCQ Board Simulator</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mb-4 leading-relaxed">
            Practice board-style vignette questions, diagnostic formulas, and medication reconciliation challenges compiled from your uploaded notes.
          </p>
          <button 
            onClick={handleGenerateQuiz}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-[var(--primary)] text-white font-bold rounded-xl flex items-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Sparkles size={16} /> Generate MCQ Practice Quiz
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// STATIC WORKSPACE RESOURCES
// ==========================================
function WorkspaceResources({ unit }: { unit: LearningUnit }) {
  const resources = [
    { title: 'Clinical Treatment Guidelines 2024', author: 'Ministry of Health Kenya', type: 'PDF' },
    { title: 'Standard Treatment Protocol Guidelines (STGs)', author: 'World Health Organization', type: 'Link' },
    { title: 'Essential Medicines List (EML)', author: 'KDI Standard Reference', type: 'PDF' },
    { title: 'Osce Clinical Board Exam Blueprints', author: 'School of Pharmacy Council', type: 'PPTX' }
  ];

  return (
    <div className="space-y-4">
      {resources.map((res, i) => (
        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex items-center justify-between hover:border-[var(--primary)] transition-colors group cursor-pointer shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[var(--surface-dim)] rounded-xl flex items-center justify-center text-[var(--primary)]">
              <BookOpen size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{res.title}</h4>
              <p className="text-[10px] text-[var(--text-muted)] font-bold">{res.author} &bull; {res.type}</p>
            </div>
          </div>
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors cursor-pointer">
            <Download size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
