import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ChevronRight, Search, Activity, Accessibility, Dna, FlaskConical, 
  Droplets, Flame, Beaker, HeartPulse, Bug, Skull, Heart, Award, FileText,
  Briefcase, HelpCircle, Layers, Headphones, FileArchive, Calendar, BrainCircuit,
  Bookmark, Download, History, ChevronLeft, Bot, Play, List, Sparkles, CheckCircle2, Clock, Database, Mic,
  FolderPlus, Trash2, Folder, Plus, FileSignature, RotateCcw, Check, AlertCircle, HelpCircle as QuestionIcon, X, Printer, Star, ArrowUpRight,
  Compass, FileDown, MoreHorizontal, ArrowLeft, ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { EDUCATION_MODULES, type EducationModule, type EducationModuleUnit, getModuleUnits } from '../data/educationHubData';
import { INITIAL_CASES } from '../data/clinicalCasesData';
import { useAuth } from '../contexts/AuthContext';
import { EducationService, CustomUnit, SubFolder, SavedFlashcard, SavedQuiz } 
from '../services/education.service';
import { AIContentService } from '../services/aiContent.service';
import exportService from '../services/export.service';
import CurriculumGraph from '../components/CurriculumGraph';
import { getResourcesForUnit } from '../data/unitToLibraryMapping';
import { getStaticContent } from '../data/unitStaticContent';
import { LIBRARY, type LibraryResource } from '../data/onlineLibraryData';
import { DISEASE_NOTES, type DiseaseNote } from '../data/diseaseNotes';

function DownloadButton({ content, filename }: { content: string; filename: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: 'pdf' | 'txt' | 'md') => {
    setDownloading(true);
    try {
      await exportService.exportAndDownload({
        title: filename.replace(/\.[^/.]+$/, ''),
        content,
        format,
        filename: filename,
      });
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleDownload('pdf')}
        disabled={downloading}
        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer disabled:opacity-50 min-h-[36px] min-w-[36px] flex items-center justify-center"
        title="Download as PDF"
      >
        <FileDown size={14} />
      </button>
      <div className="relative">
        <button
          onClick={() => handleDownload('md')}
          disabled={downloading}
          className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer disabled:opacity-50 min-h-[36px] min-w-[36px] flex items-center justify-center"
          title="Download as Markdown"
        >
          <FileText size={14} />
        </button>
      </div>
    </div>
  );
}

export default function EducationHubScreen() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  
  const [selectedModule, setSelectedModule] = useState<EducationModule | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<EducationModuleUnit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef<{ units: number }>({ units: 0 });
  const isAdmin = userData?.role === 'admin';
  const [viewMode, setViewMode] = useState<'grid' | 'graph'>('grid');
  
  // Custom unit management states
  const [customUnits, setCustomUnits] = useState<CustomUnit[]>([]);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newHours, setNewHours] = useState(10);
  const [isCreatingUnit, setIsCreatingUnit] = useState(false);
  const [unitError, setUnitError] = useState<string | null>(null);

  // Favorite state management
  const [favoriteModules, setFavoriteModules] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(`fav_modules_${userData?.id || 'guest'}`) || '[]');
    } catch {
      return [];
    }
  });

  const [favoriteUnits, setFavoriteUnits] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(`fav_units_${userData?.id || 'guest'}`) || '[]');
    } catch {
      return [];
    }
  });

  // Sync favorites when user loads or switches
  useEffect(() => {
    if (userData?.id) {
      try {
        const savedMods = localStorage.getItem(`fav_modules_${userData.id}`);
        if (savedMods) setFavoriteModules(JSON.parse(savedMods));
        const savedUnits = localStorage.getItem(`fav_units_${userData.id}`);
        if (savedUnits) setFavoriteUnits(JSON.parse(savedUnits));
      } catch (err) {
        console.error('Error loading favorites from cache:', err);
      }
    }
  }, [userData]);

  const toggleModuleFavorite = (modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = favoriteModules.includes(modId)
      ? favoriteModules.filter(id => id !== modId)
      : [...favoriteModules, modId];
    setFavoriteModules(next);
    localStorage.setItem(`fav_modules_${userData?.id || 'guest'}`, JSON.stringify(next));
  };

  const toggleUnitFavorite = (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = favoriteUnits.includes(unitId)
      ? favoriteUnits.filter(id => id !== unitId)
      : [...favoriteUnits, unitId];
    setFavoriteUnits(next);
    localStorage.setItem(`fav_units_${userData?.id || 'guest'}`, JSON.stringify(next));
  };

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

  const handleModuleClick = (mod: EducationModule) => {
    if (mod.id === 'cases') {
      navigate('/cases');
      return;
    }
    if (mod.id === 'drug_info') {
      navigate('/drugs');
      return;
    }
    if (mod.id === 'board_exam') {
      navigate('/board-exam');
      return;
    }
    setSelectedModule(mod);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unit: EducationModuleUnit) => {
    if (scrollContainerRef.current) {
      scrollPositions.current.units = scrollContainerRef.current.scrollTop;
    }
    setSelectedUnit(unit);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedUnit(null);
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
    setTimeout(() => {
      if (scrollContainerRef.current && scrollPositions.current.units > 0) {
        scrollContainerRef.current.scrollTop = scrollPositions.current.units;
      }
    }, 0);
  };

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title || !userData || !selectedModule) return;

    // Check for duplicate custom unit titles (case insensitive)
    const isDuplicate = [
      ...getModuleUnits(selectedModule.id),
      ...customUnits
    ].some(u => u.title.toLowerCase() === title.toLowerCase());

    if (isDuplicate) {
      setUnitError(`A unit or folder named "${title}" already exists in this module.`);
      return;
    }

    setIsCreatingUnit(true);
    setUnitError(null);
    
    try {
      await EducationService.createCustomUnit(
        userData.id,
        selectedModule.id,
        title,
        newDescription.trim(),
        newHours
      );
      setNewTitle('');
      setNewDescription('');
      setNewHours(10);
      setUnitError(null);
      setShowCreateModal(false);
      await fetchCustomUnits();
    } catch (err) {
      console.error('Error creating custom unit:', err);
      setUnitError('Failed to create custom unit. Please try again.');
    } finally {
      setIsCreatingUnit(false);
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

  // Combine static and custom units, search and sort by favorites
  const rawUnits = selectedModule
    ? [
        ...getModuleUnits(selectedModule.id).map(u => ({ ...u, isCustom: false })),
        ...customUnits.map(cu => ({ ...cu, isCustom: true }))
      ]
    : [];

  const filteredUnits = searchQuery 
    ? rawUnits.filter(u => 
        u.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (u.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : rawUnits;

  const sortedUnits = [...filteredUnits].sort((a, b) => {
    const aFav = favoriteUnits.includes(a.id);
    const bFav = favoriteUnits.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.title.localeCompare(b.title);
  });

  // Filter modules by search and Year level
  const filteredMods = EDUCATION_MODULES.filter(m => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return m.title.toLowerCase().includes(q) ||
           m.description.toLowerCase().includes(q) ||
           getModuleUnits(m.id).some(u => u.title.toLowerCase().includes(q) || (u.description || '').toLowerCase().includes(q));
  });

  const sortedModules = [...filteredMods].sort((a, b) => {
    const aFav = favoriteModules.includes(a.id);
    const bFav = favoriteModules.includes(b.id);
    
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    
    return a.title.localeCompare(b.title);
  });

  return (
    <div ref={scrollContainerRef} className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        {selectedModule ? (
          <div className="flex items-center gap-3">
            <button onClick={handleBackToModules} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer">
              <ChevronLeft size={14} />
              Back
            </button>
            <span className="text-sm text-[var(--text-muted)]">
              {selectedUnit ? (
                <>
                  <button onClick={handleBackToUnits} className="hover:text-[var(--primary)] transition-colors">{selectedModule.title}</button>
                  <ChevronRight size={14} className="inline mx-1" />
                  <span className="text-[var(--text)] font-semibold">{selectedUnit.title}</span>
                </>
              ) : (
                <span className="text-[var(--text)] font-semibold">{selectedModule.title}</span>
              )}
            </span>
          </div>
        ) : (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <BookOpen size={16} /> Education Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Clinova <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Learning Platform</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
              Your primary academic workspace. Set up custom units and let Clinova AI compile active study guides, revision cards, and clinical OSCE quiz questions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {/* Grid vs Graph Toggles — admin only */}
            {isAdmin && !selectedModule && (
              <div className="flex bg-[var(--surface-dim)] p-1 rounded-2xl border border-[var(--border)] shrink-0 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-[var(--surface)] text-[var(--text)] shadow-xs font-extrabold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                >
                  <Layers size={14} /> Grid View
                </button>
                <button
                  onClick={() => setViewMode('graph')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === 'graph' ? 'bg-[var(--surface)] text-[var(--text)] shadow-xs font-extrabold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                >
                  <Compass size={14} /> Curriculum Map
                </button>
              </div>
            )}

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder={selectedModule ? "Search units..." : "Search modules & units..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>
          </div>
        </div>
        )}

        {/* Breadcrumb Navigation — only at top level; drill-in view has its own header/breadcrumb */}
        {!selectedModule && (
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] overflow-x-auto pb-2 whitespace-nowrap border-b border-[var(--border)]/40">
            <button onClick={handleBackToModules} className="text-[var(--text)] font-bold flex items-center gap-1">
              Education Hub
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="pb-24">
          
          {/* Level 1: Modules — CurriculumGraph admin-only */}
          {isAdmin && !selectedModule && viewMode === 'graph' && (
            <div className="animate-in fade-in duration-300">
              <CurriculumGraph />
            </div>
          )}

          {!selectedModule && viewMode === 'grid' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {sortedModules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sortedModules.map((mod) => (
                    <ModuleCard 
                      key={mod.id} 
                      module={mod} 
                      onClick={() => handleModuleClick(mod)} 
                      isFavorite={favoriteModules.includes(mod.id)}
                      onToggleFavorite={(e) => toggleModuleFavorite(mod.id, e)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                  <p className="text-sm text-[var(--text-muted)] italic font-semibold">No subjects match your active search or filters.</p>
                </div>
              )}
            </div>
          )}

          {/* Level 2: Units */}
          {selectedModule && !selectedUnit && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                  <ModuleIcon name={selectedModule.icon} className={`text-${selectedModule.color}-500`} /> 
                  {selectedModule.title}
                </h2>
                
                {userData && (
                  <button 
                    onClick={() => {
                      setUnitError(null);
                      setShowCreateModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-2xl hover:opacity-95 font-bold text-sm shadow-sm hover:shadow transition-all w-full sm:w-auto"
                  >
                    <FolderPlus size={18} /> Add Custom Unit/Folder
                  </button>
                )}
              </div>

              {sortedUnits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedUnits.map((unit) => (
                    <div 
                      key={unit.id}
                      onClick={() => handleUnitClick(unit)}
                      className={`relative bg-[var(--surface)] border rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex justify-between items-start ${unit.isCustom ? 'border-purple-500/30 bg-purple-500/[0.01] hover:border-purple-500' : 'border-[var(--border)] hover:border-[var(--primary)]'}`}
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <button
                            onClick={(e) => toggleUnitFavorite(unit.id, e)}
                            className={`p-1 hover:bg-[var(--surface-dim)] rounded-lg transition-all shrink-0 ${favoriteUnits.includes(unit.id) ? 'text-amber-500 fill-amber-500' : 'text-[var(--text-muted)] hover:text-amber-500'}`}
                            title={favoriteUnits.includes(unit.id) ? 'Remove from favorites' : 'Mark as favorite'}
                          >
                            <Star size={14} className="transition-transform hover:scale-110" />
                          </button>
                          <h3 className={`font-bold text-base whitespace-normal break-words transition-colors ${unit.isCustom ? 'group-hover:text-purple-600' : 'group-hover:text-[var(--primary)]'}`}>{unit.title}</h3>
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
                    Create your first custom sub-folder (e.g. Anticancers, Vitamins, Autonomics) using the button above to begin organizing your study material.
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
                onClick={() => {
                  setUnitError(null);
                  setShowCreateModal(false);
                }}
                className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
                disabled={isCreatingUnit}
              >
                <X size={20} />
              </button>
            </div>

            {unitError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2 text-xs text-red-500 mb-4 animate-in fade-in duration-200">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{unitError}</span>
              </div>
            )}
            
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
                  disabled={isCreatingUnit}
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
                  disabled={isCreatingUnit}
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
                  disabled={isCreatingUnit}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUnitError(null);
                    setShowCreateModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 border border-[var(--border)] text-[var(--text)] rounded-xl text-sm font-semibold hover:bg-[var(--surface-dim)] transition-colors"
                  disabled={isCreatingUnit}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-[var(--primary)] text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={isCreatingUnit}
                >
                  {isCreatingUnit ? (
                    <>
                      <RotateCcw className="animate-spin" size={16} />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Folder</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleIcon({ name, className }: { name?: string, className?: string }) {
  const icons: Record<string, any> = {
    Activity, Accessibility, Dna, FlaskConical, Droplets, Flame, Beaker, HeartPulse,
    BookOpen, Bug, Skull, Heart, Award, FileText, Briefcase, HelpCircle, Layers,
    Headphones, FileArchive, Calendar, BrainCircuit, Bookmark, Download, History, Mic
  };
  const Icon = name ? icons[name] || BookOpen : BookOpen;
  return <Icon className={className} size={24} />;
}

function ModuleCard({ 
  module, 
  onClick, 
  isFavorite, 
  onToggleFavorite 
}: { 
  module: EducationModule, 
  onClick: () => void, 
  isFavorite?: boolean, 
  onToggleFavorite?: (e: React.MouseEvent) => void 
}) {
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

  const colorClass = module.color ? colorMap[module.color] || colorMap['indigo'] : colorMap['indigo'];

  return (
    <div 
      onClick={onClick}
      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex flex-col h-full relative"
    >
      {onToggleFavorite && (
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[var(--surface-dim)] transition-all z-10 ${isFavorite ? 'text-amber-500 fill-amber-500' : 'text-[var(--text-muted)] hover:text-amber-500'}`}
          title={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
        >
          <Star size={16} className="transition-transform hover:scale-110" />
        </button>
      )}
      <div className="flex items-center gap-4 mb-3 pr-8">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${colorClass}`}>
          <ModuleIcon name={module.icon} />
        </div>
        <div>
          <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors whitespace-normal break-words">{module.title}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{getModuleUnits(module.id).length} Standard Units</p>
        </div>
      </div>
      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-auto">{module.description}</p>
    </div>
  );
}

// ==========================================
// UPGRADED LEARNING WORKSPACE WITH RECURSIVE SUB-FOLDERS
// ==========================================
function LearningWorkspace({ unit, module, onBack }: { unit: EducationModuleUnit, module: EducationModule, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState(() => module.id === 'clinical_pharm' ? 'disease-notes' : 'overview');
  const { userData } = useAuth();

  // Folder states
  const [subFolders, setSubFolders] = useState<SubFolder[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState(unit.id);
  const [folderStack, setFolderStack] = useState<SubFolder[]>([]);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDesc, setNewFolderDesc] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderError, setFolderError] = useState<string | null>(null);
  const [showTabs, setShowTabs] = useState(true);

  const handleWorkspaceBack = () => {
    if (folderStack.length > 0) {
      const newStack = [...folderStack];
      newStack.pop();
      setFolderStack(newStack);
      if (newStack.length === 0) {
        setCurrentFolderId(unit.id);
      } else {
        setCurrentFolderId(newStack[newStack.length - 1].id);
      }
    } else {
      onBack();
    }
  };

  // Export consolidated PDF state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportData, setExportData] = useState<{
    summary: string | null;
    scratchpad: string;
    flashcards: SavedFlashcard[];
    quizzes: SavedQuiz[];
  }>({
    summary: null,
    scratchpad: '',
    flashcards: [],
    quizzes: []
  });

  const [includeCover, setIncludeCover] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeScratchpad, setIncludeScratchpad] = useState(true);
  const [includeFlashcards, setIncludeFlashcards] = useState(true);
  const [includeQuizzes, setIncludeQuizzes] = useState(true);

  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handleOpenExportModal = async () => {
    setShowExportModal(true);
    setExportLoading(true);
    try {
      // 1. Fetch study guide summary
      const savedSummary = await EducationService.getSummary(currentFolderId);
      
      // 2. Fetch scratchpad notes
      const savedNotes = localStorage.getItem(`custom_notes_${currentFolderId}`) || '';

      // 3. Fetch flashcards
      const savedCards = await EducationService.getFlashcards(currentFolderId);

      // 4. Fetch quizzes
      const savedQuizzes = await EducationService.getQuizzes(currentFolderId);

      setExportData({
        summary: savedSummary,
        scratchpad: savedNotes,
        flashcards: savedCards,
        quizzes: savedQuizzes
      });
    } catch (err) {
      console.error('Error compiling export data:', err);
    } finally {
      setExportLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-report-sheet');
    if (!printContent) return;

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <title>${currentFolderName} - Consolidated Study Report</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #0f172a;
              background-color: #ffffff;
              padding: 40px;
              line-height: 1.6;
            }
            h1, h2, h3, h4 {
              color: #0f172a;
              font-weight: 800;
              margin-top: 1.8em;
              margin-bottom: 0.6em;
            }
            h1 { font-size: 26px; border-bottom: 3px solid #0f172a; padding-bottom: 12px; margin-top: 0; text-transform: uppercase; letter-spacing: -0.5px; }
            h2 { font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; color: #1e293b; }
            h3 { font-size: 14px; color: #334155; }
            p { margin-bottom: 1.2em; font-size: 12.5px; color: #334155; }
            ul, ol { margin-bottom: 1.2em; padding-left: 24px; font-size: 12.5px; color: #334155; }
            li { margin-bottom: 0.4em; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 1.8em; font-size: 11.5px; }
            th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: 700; color: #1e293b; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
            .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; background-color: #f1f5f9; border: 1px solid #e2e8f0; }
            .badge-easy { background-color: #f0fdf4; color: #166534; border-color: #bbf7d0; }
            .badge-medium { background-color: #fffbeb; color: #92400e; border-color: #fef3c7; }
            .badge-hard { background-color: #fef2f2; color: #991b1b; border-color: #fee2e2; }
            .flashcard { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px; background-color: #fafbfc; page-break-inside: avoid; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02); }
            .quiz-question { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px; page-break-inside: avoid; }
            .rationale { margin-top: 10px; font-style: italic; color: #475569; font-size: 11.5px; background-color: #f8fafc; padding: 10px 14px; border-left: 4px solid #64748b; border-radius: 0 8px 8px 0; }
            .cover-page { text-align: center; padding: 100px 20px; page-break-after: always; display: flex; flex-direction: column; justify-content: center; min-height: 80vh; }
            .cover-title { font-size: 36px; font-weight: 800; color: #0f172a; margin-bottom: 10px; line-height: 1.2; letter-spacing: -1px; }
            .cover-subtitle { font-size: 18px; color: #475569; margin-bottom: 40px; font-weight: 500; }
            .cover-meta { font-size: 12px; color: #64748b; margin-top: 60px; line-height: 1.8; border-top: 1px solid #e2e8f0; padding-top: 20px; display: inline-block; width: 60%; margin-left: auto; margin-right: auto; }
            .footer { font-size: 10px; color: #94a3b8; text-align: center; margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 15px; text-transform: uppercase; letter-spacing: 1px; }
            @media print {
              .no-print { display: none; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <div class="footer">
            CLINOVA LEARNING ENGINE &bull; COGNITIVE MEDICAL REVISION SYSTEMS
          </div>
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow?.focus();
    setTimeout(() => {
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById('print-report-sheet');
    if (!reportElement) return;

    setPdfGenerating(true);

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 1.5, // optimal scale to balance resolution and bundle size
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // Page 1
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Loop to create extra pages as needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const cleanFolderName = currentFolderName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`clinova_${cleanFolderName}_consolidated_report.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Could not compile PDF automatically due to browser memory limits. Please use the "Print & Save to PDF" option instead.');
    } finally {
      setPdfGenerating(false);
    }
  };

  // Fetch subfolders from service
  const fetchFolders = async () => {
    if (userData) {
      try {
        const folders = await EducationService.getSubFolders(userData.id, unit.id);
        setSubFolders(folders);
      } catch (err) {
        console.error('Error fetching subfolders:', err);
      }
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [userData, unit.id]);

  const activeParentId = currentFolderId === unit.id ? 'root' : currentFolderId;
  const currentLevelFolders = subFolders.filter(f => f.parentId === activeParentId);
  const currentFolderName = currentFolderId === unit.id 
    ? unit.title 
    : subFolders.find(f => f.id === currentFolderId)?.title || unit.title;

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newFolderName.trim();
    if (!userData || !name) return;

    // Check for duplicate folder names within the current parent scope
    const isDuplicate = subFolders.some(
      f => f.parentId === activeParentId && f.title.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      setFolderError(`A folder named "${name}" already exists in this directory.`);
      return;
    }

    setIsCreatingFolder(true);
    setFolderError(null);

    try {
      await EducationService.createSubFolder(
        userData.id, 
        unit.id, 
        activeParentId, 
        name, 
        newFolderDesc.trim()
      );
      setNewFolderName('');
      setNewFolderDesc('');
      setFolderError(null);
      setShowAddFolder(false);
      await fetchFolders();
    } catch (err) {
      console.error('Error creating folder:', err);
      setFolderError('Failed to create folder. Please try again.');
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!userData) return;
    if (window.confirm('Are you sure you want to delete this sub-folder? All nested items will be detached.')) {
      try {
        await EducationService.deleteSubFolder(userData.id, unit.id, folderId);
        // If current active directory was deleted or was a descendant of deleted folder, reset to root
        const isCurrentDeleted = currentFolderId === folderId;
        const isParentInStackDeleted = folderStack.some(f => f.id === folderId);
        if (isCurrentDeleted || isParentInStackDeleted) {
          setCurrentFolderId(unit.id);
          setFolderStack([]);
        }
        await fetchFolders();
      } catch (err) {
        console.error('Error deleting folder:', err);
      }
    }
  };

  const handleNavigateToRoot = () => {
    setCurrentFolderId(unit.id);
    setFolderStack([]);
  };

  const handleNavigateToStack = (idx: number) => {
    const clicked = folderStack[idx];
    setCurrentFolderId(clicked.id);
    setFolderStack(folderStack.slice(0, idx + 1));
  };

  const handleEnterFolder = (folder: SubFolder) => {
    setCurrentFolderId(folder.id);
    setFolderStack([...folderStack, folder]);
  };

  const tabs = [
    { id: 'overview', label: 'Study Guide' },
    { id: 'disease-notes', label: 'Disease Notes' },
    { id: 'tutor', label: 'Tutor' },
    { id: 'resources', label: 'Resources' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'mcqs', label: 'Practice Quiz' },
  ]

  const isClinicalPharm = module.id === 'clinical_pharm'
  const workspaceTabs = isClinicalPharm
    ? tabs.filter(t => t.id === 'disease-notes')
    : tabs;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={handleWorkspaceBack} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors" title="Go Back">
            <ChevronLeft size={18} className="text-[var(--text)]" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)] leading-tight flex items-center gap-2">
              {unit.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
              <span>{module.title}</span>
              <span>&bull;</span>
              <span>Workspace Directory</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleOpenExportModal}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <FileText size={15} />
          Export Study Report (PDF)
        </button>
      </div>

      {/* RECURSIVE SUB-FOLDERS CONTAINER */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 mb-6 shadow-sm space-y-4">
        {/* Breadcrumb Navigation Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]/40">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)]">
            <button 
              onClick={handleNavigateToRoot}
              className={`flex items-center gap-1 hover:text-[var(--primary)] transition-colors ${currentFolderId === unit.id ? 'text-[var(--primary)] font-extrabold' : ''}`}
            >
              <Folder size={14} className={currentFolderId === unit.id ? 'text-[var(--primary)]' : 'text-amber-500'} />
              <span>{unit.title}</span>
            </button>
            
            {folderStack.map((folder, idx) => (
              <React.Fragment key={folder.id}>
                <ChevronRight size={12} className="opacity-60 shrink-0" />
                <button
                  onClick={() => handleNavigateToStack(idx)}
                  className={`hover:text-[var(--primary)] transition-colors shrink-0 ${idx === folderStack.length - 1 ? 'text-[var(--primary)] font-extrabold' : ''}`}
                >
                  <span>{folder.title}</span>
                </button>
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => {
              setFolderError(null);
              setShowAddFolder(!showAddFolder);
            }}
            className="px-3.5 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <FolderPlus size={14} />
            New Folder
          </button>
        </div>

        {/* Inline Create Sub-Folder Dialog */}
        {showAddFolder && (
          <form onSubmit={handleCreateFolder} className="p-4 bg-[var(--surface-dim)]/50 border border-[var(--border)]/40 rounded-2xl space-y-3 max-w-md animate-in slide-in-from-top-2 duration-200">
            <h4 className="text-xs font-black text-[var(--text)] uppercase tracking-wider flex items-center gap-1">
              <FolderPlus size={13} className="text-[var(--primary)]" /> Create Sub-folder in {currentFolderName}
            </h4>
            
            {folderError && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 flex items-start gap-1.5 animate-in fade-in duration-200">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{folderError}</span>
              </div>
            )}

            <div className="space-y-2">
              <input
                type="text"
                required
                placeholder="Sub-folder Name (e.g. Anticancers, Vitamins, Endocrine)"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3.5 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
                disabled={isCreatingFolder}
              />
              <input
                type="text"
                placeholder="Brief Description (e.g. Cytotoxic agents and protocols)"
                value={newFolderDesc}
                onChange={(e) => setNewFolderDesc(e.target.value)}
                className="w-full px-3.5 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
                disabled={isCreatingFolder}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-xs font-bold hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
                disabled={isCreatingFolder}
              >
                {isCreatingFolder ? (
                  <>
                    <RotateCcw className="animate-spin" size={12} />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFolderError(null);
                  setShowAddFolder(false);
                }}
                className="px-3.5 py-1.5 border border-[var(--border)] text-[var(--text)] rounded-xl text-xs font-bold hover:bg-[var(--surface-dim)] transition-all cursor-pointer"
                disabled={isCreatingFolder}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Directory Contents Row/Grid */}
        {currentLevelFolders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentLevelFolders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => handleEnterFolder(folder)}
                className="group border border-[var(--border)]/60 rounded-xl p-3 flex items-start justify-between hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Folder size={18} />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-extrabold text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors">
                      {folder.title}
                    </h5>
                    {folder.description && (
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                        {folder.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(folder.id);
                  }}
                  className="p-1 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                  title="Delete subfolder"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-[var(--text-muted)] font-semibold italic flex items-center gap-1.5">
            <Folder size={13} className="text-amber-500 opacity-60" />
            <span>This directory has no subfolders yet. Click "New Folder" to sub-categorize your materials.</span>
          </p>
        )}
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[650px]">
        {/* Active Context Bar */}
        <div className="bg-amber-500/5 px-6 py-2.5 border-b border-[var(--border)]/40 flex items-center justify-between text-xs font-bold text-[var(--text)]">
          <span className="flex items-center gap-1.5 text-[var(--text)]">
            <Folder size={13} className="text-amber-500" />
            Active Sub-folder: <span className="text-[var(--primary)] underline">{currentFolderName}</span>
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            All AI tools and notes will sync specifically within this subfolder context.
          </span>
        </div>

        {/* Workspace Content */}
        <div className="flex-1 p-6 bg-[var(--bg)] min-h-[500px]">
{activeTab === 'overview' && <WorkspaceOverview unit={unit} module={module} currentFolderId={currentFolderId} currentFolderName={currentFolderName} userData={userData} />}
          {activeTab === 'disease-notes' && <DiseaseNotesView unit={unit} />}
          {activeTab === 'tutor' && <WorkspaceTutor unit={unit} module={module} currentFolderId={currentFolderId} currentFolderName={currentFolderName} userData={userData} />}
          {activeTab === 'resources' && <WorkspaceResources unit={unit} currentFolderId={currentFolderId} currentFolderName={currentFolderName} />}
          {activeTab === 'flashcards' && <WorkspaceFlashcards unit={unit} module={module} currentFolderId={currentFolderId} currentFolderName={currentFolderName} userData={userData} />}
          {activeTab === 'mcqs' && <WorkspaceQuizzes unit={unit} module={module} currentFolderId={currentFolderId} currentFolderName={currentFolderName} userData={userData} />}
        </div>

        {/* Bottom Tabs — retractable */}
        <div className="border-t border-[var(--border)] bg-[var(--surface-dim)]/40">
          <button
            onClick={() => setShowTabs(!showTabs)}
            className="w-full flex items-center justify-center py-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            title={showTabs ? 'Collapse tabs' : 'Expand tabs'}
          >
            <MoreHorizontal size={16} className={`transition-transform ${showTabs ? 'rotate-0' : ''}`} />
          </button>
          {showTabs && (
            <div className="flex overflow-x-auto no-scrollbar px-2 pb-2 gap-1">
              {workspaceTabs.map(tab => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                        : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/80 border border-[var(--border)]/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* CONSOLIDATED STUDY REPORT PREVIEW & EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
          <div className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* LEFT COLUMN: Controls & Options */}
            <div className="w-full md:w-80 border-r border-[var(--border)]/60 bg-[var(--surface-dim)]/50 p-6 overflow-y-auto overscroll-contain space-y-6 shrink-0 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <FileText className="text-[var(--primary)]" size={16} /> Report Customization
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1.5 leading-relaxed">
                    Toggle sections to tailor your consolidated clinical revision report. Perfect for offline study guides or OSCE folders.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Include Sections</h4>
                  
                  <label className="flex items-center gap-3 text-xs font-semibold text-[var(--text)] cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeCover} 
                      onChange={(e) => setIncludeCover(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--bg)]"
                    />
                    <span>Cover Page & Details</span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-semibold text-[var(--text)] cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeSummary} 
                      onChange={(e) => setIncludeSummary(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--bg)]"
                    />
                    <span className="flex items-center gap-1.5 justify-between w-full">
                      <span>Study Guide Summary</span>
                      {exportData.summary && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-black">Active</span>}
                    </span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-semibold text-[var(--text)] cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeScratchpad} 
                      onChange={(e) => setIncludeScratchpad(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--bg)]"
                    />
                    <span className="flex items-center gap-1.5 justify-between w-full">
                      <span>Revision Scratchpad</span>
                      {exportData.scratchpad.trim() && <span className="text-[10px] bg-purple-500/10 text-purple-500 px-1.5 py-0.5 rounded font-black">Active</span>}
                    </span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-semibold text-[var(--text)] cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeFlashcards} 
                      onChange={(e) => setIncludeFlashcards(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--bg)]"
                    />
                    <span className="flex items-center gap-1.5 justify-between w-full">
                      <span>Active Recall Flashcards</span>
                      {exportData.flashcards.length > 0 && <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-black">{exportData.flashcards.length}</span>}
                    </span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-semibold text-[var(--text)] cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={includeQuizzes} 
                      onChange={(e) => setIncludeQuizzes(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] bg-[var(--bg)]"
                    />
                    <span className="flex items-center gap-1.5 justify-between w-full">
                      <span>Practice Quizzes (MCQs)</span>
                      {exportData.quizzes.length > 0 && <span className="text-[10px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded font-black">{exportData.quizzes.length}</span>}
                    </span>
                  </label>

                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)]/60 space-y-2 mt-6 md:mt-0">
                <button
                  type="button"
                  disabled={exportLoading || pdfGenerating}
                  onClick={handleDownloadPDF}
                  className="w-full py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold rounded-xl text-xs hover:from-red-700 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {pdfGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      Download PDF Document
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={exportLoading}
                  onClick={handlePrint}
                  className="w-full py-2.5 bg-[var(--surface)] hover:bg-[var(--surface-dim)] border border-[var(--border)] text-[var(--text)] font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Printer size={14} className="text-amber-500" />
                  Print / Save using Browser
                </button>

                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="w-full py-2.5 bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] text-xs font-bold transition-all text-center cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Document Sheet Preview */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[var(--surface-dim)]">
              <div className="px-6 py-4 border-b border-[var(--border)]/60 bg-[var(--surface)] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-[var(--text)] uppercase tracking-wider">
                    High-Yield Study Report Preview
                  </h4>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    This high-contrast theme is optimized for printer ink efficiency and offline reading.
                  </p>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-xl transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 select-text font-sans">
                {exportLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-3">
                    <div className="w-8 h-8 border-3 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin"></div>
                    <span className="text-xs font-bold text-[var(--text-muted)]">Compiling active subfolder materials...</span>
                  </div>
                ) : (
                  <div 
                    id="print-report-sheet"
                    className="bg-white text-slate-900 shadow-xl p-8 sm:p-12 rounded-2xl mx-auto max-w-[760px] border border-slate-200/60 leading-relaxed text-left text-xs"
                    style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                  >
                    {/* COVER PAGE */}
                    {includeCover && (
                      <div className="text-center py-12 border-b-2 border-slate-900 mb-8 flex flex-col justify-center min-h-[400px]">
                        <div className="mx-auto w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center font-extrabold text-lg mb-4 tracking-tighter">
                          CN
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight leading-tight">
                          Clinova Revision Study Report
                        </h1>
                        <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-widest">
                          {module.title}
                        </p>
                        
                        <div className="my-8 py-4 px-6 border-y border-slate-200 inline-block mx-auto max-w-md">
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Path Context</p>
                          <p className="text-xs font-extrabold text-slate-800">
                            {unit.title} {folderStack.map(f => ` → ${f.title}`)}
                          </p>
                        </div>

                        <div className="mt-8 text-[11px] text-slate-400 space-y-1 font-semibold">
                          <p>GENERATED ON {new Date().toLocaleDateString()}</p>
                          <p>STUDENT PROFILE: {userData?.email || 'clinova_learner'}</p>
                          <p className="text-[9px] tracking-wider text-slate-300">CLINOVA COGNITIVE HEALTH SCIENCES SYSTEM</p>
                        </div>
                      </div>
                    )}

                    {/* STUDY GUIDE SUMMARY */}
                    {includeSummary && (
                      <div className="mb-8 page-break-after">
                        <h2 className="text-base font-black text-slate-950 border-b-2 border-slate-900 pb-1.5 uppercase tracking-wide mb-4">
                          1. Study Guide & High-Yield Summary
                        </h2>
                        {exportData.summary ? (
                          <div className="prose prose-slate max-w-none prose-xs text-slate-800">
                            <Markdown>{exportData.summary}</Markdown>
                          </div>
                        ) : (
                          <p className="text-slate-400 italic">
                            No study guide was generated for this folder yet. Generate a guide in the "Study Guide" tab to include it here.
                          </p>
                        )}
                      </div>
                    )}

                    {/* SCRATCHPAD NOTES */}
                    {includeScratchpad && (
                      <div className="mb-8 page-break-after">
                        <h2 className="text-base font-black text-slate-950 border-b-2 border-slate-900 pb-1.5 uppercase tracking-wide mb-4">
                          2. Revision Scratchpad Notes
                        </h2>
                        {exportData.scratchpad.trim() ? (
                          <div className="whitespace-pre-wrap text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-[11px] leading-relaxed">
                            {exportData.scratchpad}
                          </div>
                        ) : (
                          <p className="text-slate-400 italic">
                            No personalized scratchpad notes have been saved in this directory.
                          </p>
                        )}
                      </div>
                    )}

                    {/* FLASHCARDS */}
                    {includeFlashcards && (
                      <div className="mb-8 page-break-after">
                        <h2 className="text-base font-black text-slate-950 border-b-2 border-slate-900 pb-1.5 uppercase tracking-wide mb-4">
                          3. Active Recall Flashcards
                        </h2>
                        {exportData.flashcards.length > 0 ? (
                          <div className="space-y-4">
                            {exportData.flashcards.map((card, idx) => (
                              <div key={card.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 break-inside-avoid">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                    Card #{idx + 1}
                                  </span>
                                  {card.difficulty && (
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                      card.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                                      card.difficulty === 'medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                                      'bg-red-50 text-red-800 border border-red-200'
                                    }`}>
                                      {card.difficulty}
                                    </span>
                                  )}
                                </div>
                                <p className="font-extrabold text-slate-900 text-xs mb-2">
                                  Q: {card.question}
                                </p>
                                <p className="text-slate-600 bg-white border border-slate-100 p-2.5 rounded-lg text-xs font-semibold">
                                  A: {card.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 italic">
                            No flashcards have been generated for this subfolder yet.
                          </p>
                        )}
                      </div>
                    )}

                    {/* PRACTICE QUIZZES / MCQS */}
                    {includeQuizzes && (
                      <div className="mb-8 page-break-after">
                        <h2 className="text-base font-black text-slate-950 border-b-2 border-slate-900 pb-1.5 uppercase tracking-wide mb-4">
                          4. Practice Board Quizzes & Assessments
                        </h2>
                        {exportData.quizzes.length > 0 ? (
                          <div className="space-y-6">
                            {exportData.quizzes.map((quiz, idx) => (
                              <div key={quiz.id} className="border border-slate-200 rounded-xl p-4 break-inside-avoid">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                                  Assessment Item #{idx + 1}
                                </span>
                                <p className="font-extrabold text-slate-950 text-xs mb-3">
                                  {quiz.question}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                  {quiz.options.map((option, optIdx) => {
                                    const isCorrect = option === quiz.correctAnswer;
                                    return (
                                      <div 
                                        key={optIdx} 
                                        className={`p-2 rounded-lg border text-xs font-semibold ${
                                          isCorrect 
                                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900' 
                                            : 'border-slate-200 bg-white text-slate-700'
                                        }`}
                                      >
                                        <span className="font-extrabold mr-1">
                                          {String.fromCharCode(65 + optIdx)})
                                        </span>
                                        {option}
                                      </div>
                                    );
                                  })}
                                </div>
                                {quiz.explanation && (
                                  <div className="mt-3 text-[11px] text-slate-600 bg-slate-50 border-l-4 border-slate-400 p-3 rounded-r-lg italic">
                                    <strong className="not-italic text-slate-800 font-extrabold block mb-0.5 uppercase tracking-wider text-[9px]">Rationale:</strong>
                                    {quiz.explanation}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 italic">
                            No practice quizzes have been generated for this subfolder yet.
                          </p>
                        )}
                      </div>
                    )}


                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// WORKSPACE OVERVIEW & AI STUDY GUIDE
// ==========================================
function WorkspaceOverview({ unit, module, currentFolderId, currentFolderName, userData }: { unit: EducationModuleUnit, module: EducationModule, currentFolderId: string, currentFolderName: string, userData: any }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const staticContent = getStaticContent(unit.id);

  // Load existing summary and custom notes text
  useEffect(() => {
    const loadData = async () => {
      const savedSummary = await EducationService.getSummary(currentFolderId);
      setSummary(savedSummary);

      const savedCustomNotes = localStorage.getItem(`custom_notes_${currentFolderId}`);
      if (savedCustomNotes) {
        setCustomNotes(savedCustomNotes);
      } else {
        setCustomNotes('');
      }
    };
    loadData();
  }, [currentFolderId]);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      // Gather context
      let context = '';
      if (customNotes.trim()) {
        context += `\n--- STUDENT HAND-WRITTEN REVISION NOTES ---\n${customNotes}\n`;
      }
      const res = await fetch('/api/gemini/generate-unit-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: currentFolderName,
          moduleTitle: module.title,
          notesText: context || undefined
        })
      });

      if (!res.ok) throw new Error('Service unavailable');
      const data = await res.json();
      
      if (data.summary) {
        await EducationService.saveSummary(currentFolderId, data.summary);
        
        // Also save to AIContentService for cross-referencing and export
        if (userData?.id) {
          try {
            await AIContentService.saveGeneratedSummary(
              userData.id,
              currentFolderId,
              currentFolderName,
              `Study Guide: ${currentFolderName}`,
              data.summary,
              {
                specialty: module.title,
                curriculumUnitId: currentFolderId,
              }
            );
          } catch (err) {
            console.warn('[EducationHub] Failed to save summary to AIContentService:', err);
          }
        }
        
        setSummary(data.summary);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to compile your Study Guide. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-extrabold tracking-wider">Knowledge</p>
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
                <FileSignature className="text-[var(--primary)]" size={20} /> Study Guide & Summary
              </h3>
              {(customNotes.trim()) && (
                <div className="flex items-center gap-2">
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
                  {summary && userData?.id && (
                    <DownloadButton 
                      content={summary} 
                      filename={`study-guide-${currentFolderName.replace(/\s+/g, '-').toLowerCase()}`}
                    />
                  )}
                </div>
              )}
            </div>

            {summary ? (
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-[var(--text)] leading-relaxed space-y-4 markdown-body">
                <Markdown>{summary}</Markdown>
              </div>
            ) : staticContent ? (
              <div className="space-y-4">
                <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-[var(--text)] leading-relaxed space-y-4 markdown-body">
                  <Markdown>{staticContent.summary}</Markdown>
                </div>
                {staticContent.keyPoints && (
                  <div className="bg-[var(--surface-dim)]/50 border border-[var(--border)]/40 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-[var(--text)] mb-3 uppercase tracking-wider">Key Points</h4>
                    <ul className="space-y-2">
                      {staticContent.keyPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-[var(--text-muted)] flex gap-2">
                          <span className="text-emerald-500 mt-0.5">&bull;</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {staticContent.drugClasses && staticContent.drugClasses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {staticContent.drugClasses.map((dc) => (
                      <span key={dc} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/10">
                        {dc}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleGenerateSummary}
                  disabled={loading}
                  className="w-full mt-4 py-2.5 bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      Regenerate with AI
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="py-12 text-center max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <BrainCircuit size={28} />
                </div>
                <h4 className="text-base font-bold text-[var(--text)]">Let the Magic Happen!</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Write down your class summaries in the scratchpad. Clinova AI will build a personalized clinical guide summarizing:
                </p>
                <div className="text-left text-xs text-[var(--text-muted)] space-y-2 bg-[var(--surface-dim)]/50 p-4 rounded-xl border border-[var(--border)]/40">
                  <div className="flex gap-2">&bull; <strong>Core Pharmacology & receptor pathways</strong></div>
                  <div className="flex gap-2">&bull; <strong>Formulary Dosing (KDI / renal CrCl rules)</strong></div>
                  <div className="flex gap-2">&bull; <strong>High-alert drug safety & interactions</strong></div>
                  <div className="flex gap-2">&bull; <strong>Board-style clinical OSCE Pearls</strong></div>
                </div>
                {!customNotes.trim() ? (
                  <p className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200/40">
                    To get started, write some notes in the scratchpad.
                  </p>
                ) : (
                  <button
                    onClick={handleGenerateSummary}
                    disabled={loading}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    {loading ? 'Generating...' : 'Compile Study Guide Now'}
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
              This unit runs within <strong>{module.title}</strong>. Dynamic flashcards, MCQ simulators, and the tutor chat are automatically optimized based on your notes and outlines.
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
function WorkspaceTutor({ unit, module, currentFolderId, currentFolderName, userData }: { unit: EducationModuleUnit, module: EducationModule, currentFolderId: string, currentFolderName: string, userData: any }) {
  const [tutorMessage, setTutorMessage] = useState('');
  const [tutorChat, setTutorChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize tutor message
  useEffect(() => {
    setTutorChat([
      { role: 'assistant', content: `Hello! I am your Clinical Coach for **${currentFolderName}**. \n\nI have analyzed your revision notes for this folder. Ask me any pharmacological, therapeutic, or OSCE board exam questions regarding this topic!` }
    ]);
  }, [currentFolderName]);

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
      const savedSummary = await EducationService.getSummary(currentFolderId) || '';
      const savedCustomNotes = localStorage.getItem(`custom_notes_${currentFolderId}`) || '';
      
      let context = '';
      if (savedCustomNotes) context += `STUDENT SCRATCHPAD NOTES:\n${savedCustomNotes}\n`;
      if (savedSummary) context += `STUDENT COMPILED STUDY GUIDE:\n${savedSummary}\n`;

      const res = await fetch('/api/gemini/hub-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: currentFolderName,
          moduleTitle: module.title,
          userMessage: userMsg,
          chatHistory: newChat.slice(-10), // Send last 10 messages for continuous memory
          notesContext: context || undefined
        })
      });

      if (!res.ok) throw new Error('Service unavailable');
      const data = await res.json();

      setTutorChat([...newChat, { 
        role: 'assistant', 
        content: data.reply || `I have successfully analyzed your query regarding **${currentFolderName}** based on standard drug indices. Please try asking again.` 
      }]);
    } catch (error) {
      console.error('Error asking tutor:', error);
      setTutorChat([...newChat, { 
        role: 'assistant', 
        content: `⚠️ Sorry, there was an error connecting to the Clinical Coach service. Please verify your connection or try again.` 
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
            <h3 className="font-bold text-sm text-[var(--text)]">Intelligent Study Coach</h3>
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
// DISEASE NOTES — full-page detail view
// ==========================================
function DiseaseNotesView({ unit }: { unit: EducationModuleUnit }) {
  const notes = DISEASE_NOTES.filter(n => n.unitId === unit.id)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  if (selectedIdx !== null) {
    return (
      <DiseaseDetailView
        note={notes[selectedIdx]}
        hasPrev={selectedIdx > 0}
        hasNext={selectedIdx < notes.length - 1}
        onPrev={() => setSelectedIdx(selectedIdx - 1)}
        onNext={() => setSelectedIdx(selectedIdx + 1)}
        onBack={() => setSelectedIdx(null)}
      />
    )
  }

  if (notes.length === 0) {
    return (
      <div className="py-12 text-center max-w-md mx-auto space-y-4">
        <div className="w-14 h-14 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto">
          <FileText size={28} className="text-[var(--text-muted)]" />
        </div>
        <h4 className="text-base font-bold text-[var(--text)]">No Disease Notes Yet</h4>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Curated disease-specific notes are not available for this folder yet. They will appear automatically for standard CP&T units.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">
        {notes.length} Disease Note{notes.length !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map(note => (
          <button
            key={note.id}
            onClick={() => setSelectedIdx(notes.indexOf(note))}
            className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md rounded-2xl p-5 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-purple-500/20 text-[var(--primary)] flex items-center justify-center shrink-0">
                <FileText size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{note.name}</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-semibold">{note.specialty}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">{note.overview}</p>
            {note.diagram && (
              <div className="mt-3 flex items-center gap-1 text-[10px] text-[var(--primary)] font-bold">
                <FileText size={11} /> Includes diagram
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function DiseaseDetailView({ note, onBack, hasPrev, hasNext, onPrev, onNext }: { note: DiseaseNote; onBack: () => void; hasPrev?: boolean; hasNext?: boolean; onPrev?: () => void; onNext?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
          title="Back to list"
        >
          <ChevronLeft size={18} className="text-[var(--text)]" />
        </button>
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Previous disease"
        >
          <ArrowLeft size={16} className="text-[var(--text)]" />
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Next disease"
        >
          <ArrowRight size={16} className="text-[var(--text)]" />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--text)]">{note.name}</h2>
          <p className="text-xs text-[var(--text-muted)] font-semibold mt-0.5">{note.specialty}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--primary)] mb-3">Overview</h3>
        <p className="text-sm text-[var(--text)] leading-relaxed">{note.overview}</p>
      </div>

      {/* Diagram */}
      {note.diagram && (
        <div className="bg-white dark:bg-gray-900 border border-[var(--border)] rounded-2xl p-6 shadow-sm overflow-x-auto flex justify-center">
          <div dangerouslySetInnerHTML={{ __html: note.diagram }} className="max-w-full" />
        </div>
      )}

      {/* Key Drugs */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--primary)] mb-4">Key Drugs & Side Effects</h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--surface-dim)] text-[var(--text-muted)] font-bold uppercase text-[11px] tracking-wider">
                <th className="px-4 py-3 text-left w-[30%]">Drug</th>
                <th className="px-4 py-3 text-left w-[25%]">Class</th>
                <th className="px-4 py-3 text-left">Side Effects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/30">
              {note.keyDrugs.map((d, i) => (
                <tr key={i} className="hover:bg-[var(--surface-dim)]/30">
                  <td className="px-4 py-3 font-bold text-[var(--text)]">{d.drug}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{d.class}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {d.sideEffects.map((se, j) => (
                        <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200/40 font-semibold">{se}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monitoring */}
      <div className="bg-amber-500/5 border border-amber-200/30 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 mb-3">Monitoring Parameters</h3>
        <p className="text-sm text-[var(--text)] leading-relaxed">{note.monitoring}</p>
      </div>

      {/* MCQs */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--primary)] mb-4">Practice Questions</h3>
        <div className="space-y-6">
          {note.mcqs.map((mcq, i) => (
            <MCQBlock key={i} mcq={mcq} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MCQBlock({ mcq, index }: { mcq: DiseaseNote['mcqs'][number]; index: number }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (opt: string) => {
    if (answered) return
    setSelected(opt)
  }

  const handleVerify = () => {
    if (!selected) return
    setAnswered(true)
  }

  const handleReset = () => {
    setSelected(null)
    setAnswered(false)
  }

  const correctLetter = mcq.correctAnswer

  return (
    <div className="border border-[var(--border)]/40 rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-[10px] font-black text-[var(--text-muted)] bg-[var(--surface-dim)] px-1.5 py-0.5 rounded shrink-0 mt-0.5">Q{index + 1}</span>
        <p className="text-xs font-bold text-[var(--text)] leading-relaxed">{mcq.question}</p>
      </div>
      <div className="space-y-1.5">
        {mcq.options.map((opt) => {
          const letter = opt.charAt(0)
          const isSelected = selected === opt
          const isCorrect = letter === correctLetter

          let style = 'border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--surface-dim)]'
          if (answered) {
            if (isCorrect) style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 font-bold'
            else if (isSelected) style = 'border-red-500 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-300'
            else style = 'border-[var(--border)]/30 bg-[var(--surface-dim)] opacity-50'
          } else if (isSelected) {
            style = 'border-[var(--primary)] bg-[var(--primary)]/5 font-bold'
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              className={`w-full px-3 py-2 rounded-lg border text-xs text-left transition-all ${style}`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {!answered ? (
        <button
          onClick={handleVerify}
          disabled={!selected}
          className="px-4 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-xs font-bold disabled:opacity-50 hover:opacity-95 transition-all cursor-pointer"
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-2">
          <div className={`text-xs font-semibold ${selected?.charAt(0) === correctLetter ? 'text-emerald-600' : 'text-red-600'}`}>
            {selected?.charAt(0) === correctLetter ? 'Correct' : `Incorrect — Answer: ${correctLetter}`}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed bg-[var(--surface-dim)]/50 rounded-lg p-3 border border-[var(--border)]/30">
            {mcq.explanation}
          </p>
          <button onClick={handleReset} className="text-xs text-[var(--primary)] font-bold hover:underline cursor-pointer">
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

// ==========================================
// WORKSPACE FLASHCARDS (ACTIVE RECALL)
// ==========================================
function WorkspaceFlashcards({ unit, module, currentFolderId, currentFolderName, userData }: { unit: EducationModuleUnit, module: EducationModule, currentFolderId: string, currentFolderName: string, userData: any }) {
  const [cards, setCards] = useState<SavedFlashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fetch saved flashcards on mount/folder change
  useEffect(() => {
    const loadCards = async () => {
      const saved = await EducationService.getFlashcards(currentFolderId);
      setCards(saved);
      setCurrentIndex(0);
      setIsFlipped(false);
    };
    loadCards();
  }, [currentFolderId]);

  const handleGenerateCards = async () => {
    setLoading(true);
    setIsFlipped(false);
    setCurrentIndex(0);
    try {
      // Gather source text
      const savedSummary = await EducationService.getSummary(currentFolderId) || '';
      const savedCustomNotes = localStorage.getItem(`custom_notes_${currentFolderId}`) || '';
      const notesCombined = `${savedCustomNotes}\n\n${savedSummary}\n`;

      const res = await fetch('/api/gemini/generate-unit-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: currentFolderName,
          moduleTitle: module.title,
          notesText: notesCombined.trim() || undefined
        })
      });

      if (!res.ok) throw new Error('Service unavailable');
      const data = await res.json();
      
      if (data.flashcards && data.flashcards.length > 0) {
        const saved = await EducationService.saveFlashcards(currentFolderId, data.flashcards);
        setCards(saved);
        
        // Also save to AIContentService for cross-referencing and export
        if (userData?.id) {
          try {
            await AIContentService.saveGeneratedFlashcards(
              userData.id,
              currentFolderId,
              currentFolderName,
              `Flashcards: ${currentFolderName}`,
              JSON.stringify(data.flashcards),
              {
                specialty: module.title,
                curriculumUnitId: currentFolderId,
                difficulty: 'Intermediate',
              }
            );
          } catch (err) {
            console.warn('[EducationHub] Failed to save flashcards to AIContentService:', err);
          }
        }
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
      await EducationService.updateFlashcardDifficulty(currentCard.id, difficulty, currentFolderId);
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
            {/* Download buttons */}
            <div className="flex gap-2 justify-center pt-4 border-t border-[var(--border)]/40">
              <button
                onClick={() => {
                  const content = cards.map((c, i) => `**Card ${i + 1}**\n\n**Q:** ${c.question}\n\n**A:** ${c.answer}\n`).join('\n---\n');
                  exportService.exportAndDownload({
                    title: `Flashcards: ${currentFolderName}`,
                    content,
                    format: 'pdf',
                    filename: `flashcards-${currentFolderName.toLowerCase().replace(/\s+/g, '-')}`,
                  });
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 rounded-lg hover:bg-[var(--primary)]/20 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FileDown size={10} /> PDF
              </button>
              <button
                onClick={() => {
                  const content = cards.map((c, i) => `**Card ${i + 1}**\n\n**Q:** ${c.question}\n\n**A:** ${c.answer}\n`).join('\n---\n');
                  exportService.exportAndDownload({
                    title: `Flashcards: ${currentFolderName}`,
                    content,
                    format: 'md',
                    filename: `flashcards-${currentFolderName.toLowerCase().replace(/\s+/g, '-')}`,
                  });
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FileText size={10} /> MD
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
function WorkspaceQuizzes({ unit, module, currentFolderId, currentFolderName, userData }: { unit: EducationModuleUnit, module: EducationModule, currentFolderId: string, currentFolderName: string, userData: any }) {
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load existing quizzes on mount/folder change
  useEffect(() => {
    const loadQuizzes = async () => {
      const saved = await EducationService.getQuizzes(currentFolderId);
      setQuizzes(saved);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setScore(0);
      setQuizFinished(false);
    };
    loadQuizzes();
  }, [currentFolderId]);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setQuizFinished(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    try {
      const savedSummary = await EducationService.getSummary(currentFolderId) || '';
      const savedCustomNotes = localStorage.getItem(`custom_notes_${currentFolderId}`) || '';
      const notesCombined = `${savedCustomNotes}\n\n${savedSummary}\n`;

      const res = await fetch('/api/gemini/generate-unit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: currentFolderName,
          moduleTitle: module.title,
          notesText: notesCombined.trim() || undefined
        })
      });

      if (!res.ok) throw new Error('Service unavailable');
      const data = await res.json();
      
      if (data.quizzes && data.quizzes.length > 0) {
        const saved = await EducationService.saveQuizzes(currentFolderId, data.quizzes);
        setQuizzes(saved);
        
        // Also save to AIContentService for cross-referencing and export
        if (userData?.id) {
          try {
            await AIContentService.saveGeneratedQuiz(
              userData.id,
              currentFolderId,
              currentFolderName,
              `Quiz: ${currentFolderName}`,
              JSON.stringify(data.quizzes),
              {
                specialty: module.title,
                curriculumUnitId: currentFolderId,
                difficulty: 'Intermediate',
              }
            );
          } catch (err) {
            console.warn('[EducationHub] Failed to save quiz to AIContentService:', err);
          }
        }
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
          Generating clinical case scenarios, patient vignettes, dosage calculations, and realistic distractor choices based on your notes.
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
                    <BrainCircuit size={14} /> Clinical Explanation
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
              {/* Download buttons for completed quiz */}
              <div className="flex gap-2 justify-center pt-4 border-t border-[var(--border)]/40">
                <button
                  onClick={() => {
                    const content = quizzes.map((q, i) => 
                      `**Question ${i + 1}**\n\n${q.question}\n\n**Options:**\n${q.options.map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`).join('\n')}\n\n**Answer:** ${q.correctAnswer}\n\n**Explanation:** ${q.explanation}\n`
                    ).join('\n---\n');
                    exportService.exportAndDownload({
                      title: `Quiz: ${currentFolderName}`,
                      content,
                      format: 'pdf',
                      filename: `quiz-${currentFolderName.toLowerCase().replace(/\s+/g, '-')}`,
                    });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 rounded-lg hover:bg-[var(--primary)]/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FileDown size={10} /> PDF
                </button>
                <button
                  onClick={() => {
                    const content = quizzes.map((q, i) => 
                      `**Question ${i + 1}**\n\n${q.question}\n\n**Options:**\n${q.options.map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`).join('\n')}\n\n**Answer:** ${q.correctAnswer}\n\n**Explanation:** ${q.explanation}\n`
                    ).join('\n---\n');
                    exportService.exportAndDownload({
                      title: `Quiz: ${currentFolderName}`,
                      content,
                      format: 'md',
                      filename: `quiz-${currentFolderName.toLowerCase().replace(/\s+/g, '-')}`,
                    });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FileText size={10} /> MD
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
            Practice board-style vignette questions, diagnostic formulas, and medication reconciliation challenges compiled from your notes.
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
function WorkspaceResources({ unit, currentFolderId, currentFolderName }: { unit: EducationModuleUnit, currentFolderId: string, currentFolderName: string }) {
  const unitResources = useMemo(() => getResourcesForUnit(unit.id), [unit.id]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookSearch, setBookSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | LibraryResource['type']>('all');

  const displayedUnit = isExpanded ? unitResources : unitResources.slice(0, 8);

  const filteredBooks = useMemo(() => {
    let books = LIBRARY
    if (typeFilter !== 'all') {
      books = books.filter(b => b.type === typeFilter)
    }
    if (bookSearch.trim()) {
      const q = bookSearch.toLowerCase()
      books = books.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.authors.toLowerCase().includes(q) ||
        b.keywords.toLowerCase().includes(q) ||
        b.subjects.some(s => s.toLowerCase().includes(q))
      )
    }
    return books
  }, [bookSearch, typeFilter])

  const typeIcons: Record<string, React.ReactNode> = {
    textbook: <BookOpen size={16} />,
    guideline: <FileText size={16} />,
    reference: <Database size={16} />,
    handbook: <BookOpen size={16} />,
    formulary: <FileText size={16} />,
    oer: <Award size={16} />,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-[var(--text)] flex items-center gap-2">
            <BookOpen size={18} className="text-[var(--primary)]" />
            Online Clinical Library
          </h3>
          <p className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5">
            {LIBRARY.length} textbooks, guidelines, formularies & references
          </p>
        </div>
        <span className="text-[10px] text-[var(--primary)] font-semibold bg-[var(--primary)]/5 px-2 py-0.5 rounded-lg shrink-0">
          {currentFolderName}
        </span>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={bookSearch}
            onChange={e => setBookSearch(e.target.value)}
            placeholder="Search all books, authors, subjects..."
            className="w-full pl-9 pr-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as any)}
          className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="textbook">Textbooks</option>
          <option value="guideline">Guidelines</option>
          <option value="reference">References</option>
          <option value="handbook">Handbooks</option>
          <option value="formulary">Formularies</option>
          <option value="oer">Open Resources</option>
        </select>
      </div>

      {/* Unit-tagged resources */}
      {unitResources.length > 0 && (
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Tagged for this unit ({unitResources.length})
          </p>
          {displayedUnit.map((res) => (
            <div key={res.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex items-start justify-between hover:border-[var(--primary)] transition-colors group shadow-xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[var(--surface-dim)] flex items-center justify-center text-[var(--primary)] shrink-0 mt-0.5">
                  {typeIcons[res.type] || <BookOpen size={16} />}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-tight">{res.title}</h4>
                  <p className="text-[10px] text-[var(--text-muted)] font-semibold mt-1">
                    {res.authors} &bull; {res.edition ? `${res.edition}, ` : ''}{res.year}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--primary)]/5 text-[var(--primary)] capitalize">{res.type}</span>
                    {res.isFree && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600">Free</span>}
                  </div>
                </div>
              </div>
              {res.publisherUrl && (
                <a href={res.publisherUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors cursor-pointer shrink-0" title="Open resource">
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          ))}
          {unitResources.length > 8 && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full py-2 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 rounded-xl transition-colors cursor-pointer">
              {isExpanded ? `Show fewer (${8} of ${unitResources.length})` : `Show all ${unitResources.length} resources`}
            </button>
          )}
        </div>
      )}

      {/* Full Library */}
      <div className="space-y-3">
        <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
          Full Library ({filteredBooks.length} of {LIBRARY.length})
        </p>
        {filteredBooks.length === 0 ? (
          <div className="py-8 text-center">
            <BookOpen size={24} className="text-[var(--text-muted)] mx-auto mb-2 opacity-50" />
            <p className="text-xs text-[var(--text-muted)]">No books match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredBooks.map((res) => (
              <div key={res.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex flex-col hover:border-[var(--primary)] transition-colors group shadow-xs">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface-dim)] flex items-center justify-center text-[var(--primary)] shrink-0 mt-0.5">
                    {typeIcons[res.type] || <BookOpen size={16} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-tight">{res.title}</h4>
                    <p className="text-[10px] text-[var(--text-muted)] font-semibold mt-1 line-clamp-1">
                      {res.authors}
                    </p>
                    <p className="text-[9px] text-[var(--text-muted)] mt-0.5">
                      {res.publisher} &bull; {res.year}{res.edition ? ` &bull; ${res.edition}` : ''}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--primary)]/5 text-[var(--primary)] capitalize">{res.type}</span>
                      {res.isFree && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600">Free</span>}
                      {res.language && res.language !== 'en' && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 uppercase">{res.language}</span>}
                    </div>
                  </div>
                </div>
                {res.publisherUrl && (
                  <a href={res.publisherUrl} target="_blank" rel="noopener noreferrer" className="mt-2 w-full py-1.5 text-center text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 rounded-xl transition-colors" title="Open resource">
                    Access Resource →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
