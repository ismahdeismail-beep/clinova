import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, Plus, Search, Loader2, X, User, Calendar, FileText, 
  Tag, Trash2, ArrowRight, ClipboardList, CheckCircle2 
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { 
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, 
  query, where, orderBy, Timestamp 
} from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

interface ClinicalCase {
  id: string;
  title: string;
  patientName: string;
  ipNumber: string;
  ward: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  createdAt: any;
  status: 'active' | 'archived';
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
  const [newPatientName, setNewPatientName] = useState('');
  const [newIpNumber, setNewIpNumber] = useState('');
  const [newWard, setNewWard] = useState('Medical Ward A');
  const [newChiefComplaint, setNewChiefComplaint] = useState('');
  const [newHpi, setNewHpi] = useState('');
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
          patientName: data.patientName || 'N/A',
          ipNumber: data.ipNumber || 'N/A',
          ward: data.ward || 'N/A',
          chiefComplaint: data.chiefComplaint || 'N/A',
          historyOfPresentIllness: data.historyOfPresentIllness || 'N/A',
          createdAt: data.createdAt,
          status: data.status || 'active',
          createdBy: data.createdBy || '',
          createdByName: data.createdByName || 'Clinical Pharmacist',
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
    if (!newTitle.trim() || !newPatientName.trim()) return;

    setIsSubmitting(true);
    const path = 'clinical_cases';
    try {
      const user = auth.currentUser;
      const caseData = {
        title: newTitle.trim(),
        patientName: newPatientName.trim(),
        ipNumber: newIpNumber.trim() || 'N/A',
        ward: newWard,
        chiefComplaint: newChiefComplaint.trim() || 'N/A',
        historyOfPresentIllness: newHpi.trim() || 'N/A',
        createdAt: Timestamp.now(),
        status: 'active',
        createdBy: user?.uid || 'anonymous',
        createdByName: user?.displayName || user?.email?.split('@')[0] || 'Clinical Pharmacist',
      };

      await addDoc(collection(db, path), caseData);
      
      // Reset fields
      setNewTitle('');
      setNewPatientName('');
      setNewIpNumber('');
      setNewWard('Medical Ward A');
      setNewChiefComplaint('');
      setNewHpi('');
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
    if (!window.confirm('Are you sure you want to delete this case?')) return;

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
    const newStatus = item.status === 'active' ? 'archived' : 'active';
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
      c.patientName.toLowerCase().includes(q) ||
      c.ipNumber.toLowerCase().includes(q) ||
      c.ward.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Clinical Cases</h1>
          <p className="text-[var(--text-muted)] text-sm">Create, review, and discuss active clinical case scenarios.</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-[var(--primary)] text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
        >
          <Plus size={18} />
          New Case Discussion
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
              placeholder="Search case title, patient, IP..." 
              className="flex-1 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
            />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {isLoading ? (
              <div className="p-8 text-center bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                <Loader2 size={24} className="animate-spin text-[var(--primary)] mx-auto mb-2" />
                <span className="text-xs text-[var(--text-muted)]">Loading clinical cases...</span>
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="bg-[var(--surface)] p-12 rounded-xl border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-3">
                  <FolderOpen size={24} className="text-[var(--text-muted)]" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text)] mb-1">No cases found</h3>
                <p className="text-[var(--text-muted)] text-xs max-w-xs">
                  {searchQuery ? 'Try adjusting your search query.' : 'Click "New Case Discussion" to add your first patient clinical case.'}
                </p>
              </div>
            ) : (
              filteredCases.map((item) => {
                const isSelected = selectedCase?.id === item.id;
                const formattedDate = item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'N/A';
                
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
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'active' 
                          ? (isSelected ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700')
                          : (isSelected ? 'bg-white/10 text-white/80' : 'bg-[var(--surface-dim)] text-[var(--text-muted)]')
                      }`}>
                        {item.status}
                      </span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {formattedDate}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm tracking-tight leading-tight group-hover:underline">{item.title}</h4>
                      <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        Patient: {item.patientName} ({item.ipNumber})
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-dashed border-[var(--border)] group-hover:border-transparent">
                      <span className={isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}>
                        {item.ward}
                      </span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={(e) => handleToggleStatus(item, e)}
                          title={item.status === 'active' ? 'Archive case' : 'Activate case'}
                          className={`p-1 rounded hover:bg-black/10 transition-colors ${isSelected ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--primary)]'}`}
                        >
                          <CheckCircle2 size={13} />
                        </button>
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
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedCase.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-[var(--surface-dim)] text-[var(--text-muted)]'
                    }`}>
                      {selectedCase.status} Case
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      Started by {selectedCase.createdByName}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--text)] tracking-tight">{selectedCase.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Patient Profile Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[var(--surface-dim)] p-4 rounded-xl border border-[var(--border)]">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Patient Name</span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                    <User size={15} className="text-[var(--primary)]" />
                    {selectedCase.patientName}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">IP Number</span>
                  <div className="text-sm font-semibold text-[var(--text)] font-mono">
                    {selectedCase.ipNumber}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">Admission Location</span>
                  <div className="text-sm font-semibold text-[var(--text)]">
                    {selectedCase.ward}
                  </div>
                </div>
              </div>

              {/* Case Narrative */}
              <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <h3 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
                    <ClipboardList size={16} className="text-[var(--primary)]" />
                    Chief Complaint
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed bg-[var(--surface-dim)] p-3 rounded-lg border border-[var(--border)] whitespace-pre-wrap">
                    {selectedCase.chiefComplaint}
                  </p>
                </div>

                <div className="space-y-1.5 text-left">
                  <h3 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
                    <FileText size={16} className="text-[var(--primary)]" />
                    History of Present Illness (HPI)
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed bg-[var(--surface-dim)] p-3 rounded-lg border border-[var(--border)] whitespace-pre-wrap">
                    {selectedCase.historyOfPresentIllness}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--text-muted)]">
                <span>Case ID: {selectedCase.id}</span>
                <span>Date Created: {selectedCase.createdAt ? new Date(selectedCase.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full min-h-[400px] bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
                <ClipboardList size={32} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Review Case Details</h3>
              <p className="text-[var(--text-muted)] text-sm max-w-sm">
                Select a clinical case from the list to view comprehensive demographics, admitting history, presentation timelines, and updates.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* New Case Modal Dialog */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--surface)] w-full max-w-lg rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-dim)]">
              <h3 className="text-lg font-bold text-[var(--text)]">Start New Case Discussion</h3>
              <button 
                onClick={() => setShowNewModal(false)}
                className="p-1.5 hover:bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCase}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Case Title</label>
                  <input 
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sepsis secondary to Urinary Tract Infection"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Patient Name</label>
                    <input 
                      type="text"
                      required
                      value={newPatientName}
                      onChange={(e) => setNewPatientName(e.target.value)}
                      placeholder="James Kamau"
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">IP/OP Number</label>
                    <input 
                      type="text"
                      value={newIpNumber}
                      onChange={(e) => setNewIpNumber(e.target.value)}
                      placeholder="IP-2026-8809"
                      className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)] font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Admitting Ward</label>
                  <select 
                    value={newWard}
                    onChange={(e) => setNewWard(e.target.value)}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="Medical Ward A">Medical Ward A</option>
                    <option value="Medical Ward B">Medical Ward B</option>
                    <option value="Surgical Ward">Surgical Ward</option>
                    <option value="ICU">ICU</option>
                    <option value="Maternity Wing">Maternity Wing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Chief Complaint</label>
                  <textarea 
                    value={newChiefComplaint}
                    onChange={(e) => setNewChiefComplaint(e.target.value)}
                    placeholder="Describe main symptoms and duration..."
                    rows={2}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">History of Present Illness (HPI)</label>
                  <textarea 
                    value={newHpi}
                    onChange={(e) => setNewHpi(e.target.value)}
                    placeholder="Enter full history of presenting illness, system review, and past medications..."
                    rows={3}
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--surface-dim)]">
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text)] font-semibold text-sm rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[var(--primary)] text-white font-semibold text-sm rounded-lg hover:opacity-95 transition-opacity flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
