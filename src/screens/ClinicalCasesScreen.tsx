import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, Plus, Search, Loader2, X, BookOpen, 
  Lightbulb, CheckCircle2, ChevronRight, BookMarked, Trash2
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { 
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, 
  query, orderBy, Timestamp 
} from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

interface ClinicalCase {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scenario: string;
  learningPoints: string;
  createdAt: any;
  status: 'published' | 'draft';
  createdBy: string;
  createdByName: string;
}

export default function ClinicalCasesScreen() {
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  
  // New Case form state
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Cardiology');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newScenario, setNewScenario] = useState('');
  const [newLearningPoints, setNewLearningPoints] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCases = async () => {
    setIsLoading(true);
    const path = 'clinical_cases';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const caseList: ClinicalCase[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        caseList.push({
          id: docSnap.id,
          title: data.title || 'Untitled Case',
          topic: data.topic || data.ward || 'General Practice',
          difficulty: data.difficulty || 'Intermediate',
          scenario: data.scenario || data.chiefComplaint || data.historyOfPresentIllness || 'No scenario provided.',
          learningPoints: data.learningPoints || 'No learning points documented.',
          createdAt: data.createdAt,
          status: data.status === 'active' ? 'published' : (data.status || 'published'),
          createdBy: data.createdBy || '',
          createdByName: data.createdByName || 'Clinical Educator',
        });
      });
      setCases(caseList);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newScenario.trim()) return;

    setIsSubmitting(true);
    const path = 'clinical_cases';
    try {
      const user = auth.currentUser;
      const caseData = {
        title: newTitle.trim(),
        topic: newTopic,
        difficulty: newDifficulty,
        scenario: newScenario.trim(),
        learningPoints: newLearningPoints.trim(),
        createdAt: Timestamp.now(),
        status: 'published',
        createdBy: user?.uid || 'anonymous',
        createdByName: user?.displayName || user?.email?.split('@')[0] || 'Clinical Educator',
      };

      await addDoc(collection(db, path), caseData);
      
      // Reset fields
      setNewTitle('');
      setNewTopic('Cardiology');
      setNewDifficulty('Beginner');
      setNewScenario('');
      setNewLearningPoints('');
      setShowNewModal(false);
      
      // Refresh list
      await fetchCases();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCase = async (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this case study?')) return;

    const path = `clinical_cases/${caseId}`;
    try {
      await deleteDoc(doc(db, 'clinical_cases', caseId));
      if (selectedCase?.id === caseId) {
        setSelectedCase(null);
      }
      setCases(prev => prev.filter(c => c.id !== caseId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleToggleStatus = async (item: ClinicalCase, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    const path = `clinical_cases/${item.id}`;
    try {
      await updateDoc(doc(db, 'clinical_cases', item.id), { status: newStatus });
      setCases(prev => prev.map(c => c.id === item.id ? { ...c, status: newStatus as any } : c));
      if (selectedCase?.id === item.id) {
        setSelectedCase(prev => prev ? { ...prev, status: newStatus as any } : null);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const filteredCases = cases.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.topic.toLowerCase().includes(q) ||
      c.scenario.toLowerCase().includes(q)
    );
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Case Studies Library</h1>
          <p className="text-[var(--text-muted)] text-sm">Explore interactive clinical scenarios to improve your pharmacotherapy reasoning.</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-[var(--primary)] text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
        >
          <Plus size={18} />
          Create Case Study
        </button>
      </div>

      {/* Main Grid: List left, Detailed view right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cases List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-3">
            <Search size={18} className="text-[var(--text-dim)]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, conditions..." 
              className="flex-1 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
            />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {isLoading ? (
              <div className="p-8 text-center bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                <Loader2 size={24} className="animate-spin text-[var(--primary)] mx-auto mb-2" />
                <span className="text-xs text-[var(--text-muted)]">Loading case library...</span>
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="bg-[var(--surface)] p-12 rounded-xl border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-3">
                  <BookMarked size={24} className="text-[var(--text-muted)]" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text)] mb-1">No case studies found</h3>
                <p className="text-[var(--text-muted)] text-xs max-w-xs">
                  {searchQuery ? 'Try adjusting your search query.' : 'Click "Create Case Study" to add the first clinical vignette.'}
                </p>
              </div>
            ) : (
              filteredCases.map((item) => {
                const isSelected = selectedCase?.id === item.id;
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedCase(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-3 group ${
                      isSelected 
                        ? 'bg-[var(--primary)] text-white border-transparent' 
                        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${
                        isSelected ? 'bg-white/20 text-white border-white/10' : getDifficultyColor(item.difficulty)
                      }`}>
                        {item.difficulty}
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {item.topic}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm tracking-tight leading-tight group-hover:underline line-clamp-2">{item.title}</h4>
                      <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {item.scenario}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-dashed border-[var(--border)] group-hover:border-transparent">
                      <span className={isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}>
                        By {item.createdByName}
                      </span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => handleDeleteCase(item.id, e)}
                          title="Delete case"
                          className={`p-1 rounded hover:bg-black/10 transition-colors ${isSelected ? 'text-white' : 'text-red-500'}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detailed Case View Panel */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[var(--border)]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${getDifficultyColor(selectedCase.difficulty)}`}>
                      {selectedCase.difficulty}
                    </span>
                    <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                      {selectedCase.topic}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text)] tracking-tight leading-tight">{selectedCase.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Case Narrative */}
              <div className="space-y-6">
                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-bold text-[var(--text)] flex items-center gap-2 uppercase tracking-wider">
                    <BookOpen size={16} className="text-[var(--primary)]" />
                    Clinical Scenario
                  </h3>
                  <div className="text-[var(--text)] leading-relaxed bg-[var(--bg)] p-5 rounded-xl border border-[var(--border)] whitespace-pre-wrap text-[15px] font-medium shadow-inner">
                    {selectedCase.scenario}
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-bold text-[var(--text)] flex items-center gap-2 uppercase tracking-wider">
                    <Lightbulb size={16} className="text-amber-500" />
                    Key Learning Points
                  </h3>
                  <div className="text-[var(--text)] leading-relaxed bg-amber-500/5 p-5 rounded-xl border border-amber-500/20 whitespace-pre-wrap text-sm">
                    {selectedCase.learningPoints}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--text-muted)]">
                <span>Case ID: {selectedCase.id}</span>
                <span>Authored by: {selectedCase.createdByName}</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full min-h-[400px] bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
                <BookMarked size={32} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Read Case Studies</h3>
              <p className="text-[var(--text-muted)] text-sm max-w-sm">
                Select a clinical case from the library to test your knowledge, review patient scenarios, and master critical pharmacotherapy concepts.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* New Case Modal Dialog */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-2xl rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-dim)]">
              <h3 className="text-lg font-bold text-[var(--text)]">Draft New Case Study</h3>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCase}>
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Case Title</label>
                  <input 
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. 55-year-old male with Acute Decompensated Heart Failure"
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Therapeutic Area / Topic</label>
                    <select 
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Infectious Disease">Infectious Disease</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Critical Care">Critical Care</option>
                      <option value="General Practice">General Practice</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Difficulty Level</label>
                    <select 
                      value={newDifficulty}
                      onChange={(e) => setNewDifficulty(e.target.value as any)}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="Beginner">Beginner (P1/P2 Level)</option>
                      <option value="Intermediate">Intermediate (P3/P4 Level)</option>
                      <option value="Advanced">Advanced (Board Level)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Clinical Scenario (Vignette)</label>
                  <textarea 
                    value={newScenario}
                    onChange={(e) => setNewScenario(e.target.value)}
                    required
                    placeholder="Describe the patient presentation, history of present illness, vitals, labs, and current medications..."
                    rows={6}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-y"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Key Learning Points & Resolution</label>
                  <textarea 
                    value={newLearningPoints}
                    onChange={(e) => setNewLearningPoints(e.target.value)}
                    placeholder="Provide the rationale, guidelines to reference, and the correct pharmacotherapy intervention..."
                    rows={4}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-y"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--surface-dim)]">
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text)] font-semibold text-sm rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-[var(--primary)] text-white font-semibold text-sm rounded-xl hover:opacity-95 transition-opacity flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
                  Publish Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

