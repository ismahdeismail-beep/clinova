import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartPulse, Wind, Flame, ShieldAlert, Droplets, Activity, Brain, 
  Smile, Pill, Baby, User, AlertTriangle, ChevronRight,
  Search, BookOpen, Stethoscope, ChevronLeft, BrainCircuit,
  MessageSquare, Loader2, Play, Sparkles
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ClinicalCase, SPECIALTIES, DISEASES_BY_SPECIALTY, INITIAL_CASES } from '../data/clinicalCasesData';

export default function ClinicalCasesScreen() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Tutor states
  const [tutorMessage, setTutorMessage] = useState('');
  const [tutorChat, setTutorChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSpecialtyClick = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSelectedDisease(null);
    setSelectedCase(null);
  };

  const handleDiseaseClick = (disease: string) => {
    setSelectedDisease(disease);
    setSelectedCase(null);
  };

  const handleCaseClick = (clinicalCase: ClinicalCase) => {
    setSelectedCase(clinicalCase);
    setTutorChat([
      {
        role: 'assistant',
        content: `Welcome to the Clinical Case on **${clinicalCase.title}**. I am your AI Clinical Tutor. I have loaded the case details, patient history, guidelines for ${clinicalCase.disease}, and relevant pharmacological concepts. How can I assist you with your clinical reasoning for this case?`
      }
    ]);
  };

  const handleBackToSpecialties = () => {
    setSelectedSpecialty(null);
    setSelectedDisease(null);
    setSelectedCase(null);
  };

  const handleBackToDiseases = () => {
    setSelectedDisease(null);
    setSelectedCase(null);
  };

  const handleBackToCases = () => {
    setSelectedCase(null);
  };

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'Cardiology': return <HeartPulse className="text-rose-500" />;
      case 'Respiratory Medicine': return <Wind className="text-sky-500" />;
      case 'Endocrinology': return <Flame className="text-orange-500" />;
      case 'Infectious Diseases': return <ShieldAlert className="text-emerald-500" />;
      case 'Nephrology': return <Droplets className="text-blue-500" />;
      case 'Gastroenterology': return <Activity className="text-amber-500" />;
      case 'Neurology': return <Brain className="text-violet-500" />;
      case 'Psychiatry': return <BrainCircuit className="text-fuchsia-500" />;
      case 'Hematology': return <Droplets className="text-red-500" />;
      case 'Oncology': return <Activity className="text-purple-500" />;
      case 'Pediatrics': return <Baby className="text-teal-500" />;
      case 'Obstetrics & Gynecology': return <User className="text-pink-500" />;
      case 'Emergency Medicine': return <AlertTriangle className="text-yellow-500" />;
      default: return <Stethoscope className="text-indigo-500" />;
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Cardiology': return 'from-rose-500/10 to-rose-500/20 border-rose-200/40 text-rose-700';
      case 'Respiratory Medicine': return 'from-sky-500/10 to-sky-500/20 border-sky-200/40 text-sky-700';
      case 'Endocrinology': return 'from-orange-500/10 to-orange-500/20 border-orange-200/40 text-orange-700';
      case 'Infectious Diseases': return 'from-emerald-500/10 to-emerald-500/20 border-emerald-200/40 text-emerald-700';
      case 'Nephrology': return 'from-blue-500/10 to-blue-500/20 border-blue-200/40 text-blue-700';
      case 'Gastroenterology': return 'from-amber-500/10 to-amber-500/20 border-amber-200/40 text-amber-700';
      case 'Neurology': return 'from-violet-500/10 to-violet-500/20 border-violet-200/40 text-violet-700';
      case 'Psychiatry': return 'from-fuchsia-500/10 to-fuchsia-500/20 border-fuchsia-200/40 text-fuchsia-700';
      case 'Hematology': return 'from-red-500/10 to-red-500/20 border-red-200/40 text-red-700';
      case 'Oncology': return 'from-purple-500/10 to-purple-500/20 border-purple-200/40 text-purple-700';
      case 'Pediatrics': return 'from-teal-500/10 to-teal-500/20 border-teal-200/40 text-teal-700';
      case 'Obstetrics & Gynecology': return 'from-pink-500/10 to-pink-500/20 border-pink-200/40 text-pink-700';
      case 'Emergency Medicine': return 'from-yellow-500/10 to-yellow-500/20 border-yellow-200/40 text-yellow-700';
      default: return 'from-indigo-500/10 to-indigo-500/20 border-indigo-200/40 text-indigo-700';
    }
  };

  const filteredSpecialties = SPECIALTIES.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim() || !selectedCase) return;

    const userMsg = tutorMessage;
    setTutorMessage('');
    
    const newChat = [...tutorChat, { role: 'user' as const, content: userMsg }];
    setTutorChat(newChat);
    setIsTutorThinking(true);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const response = await fetch('/api/gemini/case-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: selectedCase.specialty,
          disease: selectedCase.disease,
          caseTitle: selectedCase.title,
          caseData: selectedCase,
          chatHistory: tutorChat,
          userMessage: userMsg
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setTutorChat([...newChat, { 
        role: 'assistant', 
        content: data.reply 
      }]);
      setIsTutorThinking(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error asking tutor:', error);
      setIsTutorThinking(false);
    }
  };

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Stethoscope size={16} /> Clinical Cases
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Clinical Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Studies</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
              Integrate knowledge from multiple disciplines to simulate real patient care. Practice diagnostic reasoning and pharmacotherapy management.
            </p>
          </div>

          {!selectedSpecialty && (
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="Search specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>
          )}
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] overflow-x-auto pb-2 whitespace-nowrap">
          <button onClick={() => navigate('/knowledge')} className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">Education Hub</button>
          <ChevronRight size={14} />
          <button onClick={handleBackToSpecialties} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedSpecialty ? 'text-[var(--text)] font-bold' : ''}`}>
            Clinical Cases
          </button>
          {selectedSpecialty && (
            <>
              <ChevronRight size={14} />
              <button onClick={handleBackToDiseases} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedDisease ? 'text-[var(--text)] font-bold' : ''}`}>
                {selectedSpecialty}
              </button>
            </>
          )}
          {selectedDisease && (
            <>
              <ChevronRight size={14} />
              <button onClick={handleBackToCases} className={`hover:text-[var(--primary)] transition-colors flex items-center gap-1 ${!selectedCase ? 'text-[var(--text)] font-bold' : ''}`}>
                {selectedDisease}
              </button>
            </>
          )}
          {selectedCase && (
            <>
              <ChevronRight size={14} />
              <span className="text-[var(--text)] font-bold truncate max-w-[200px]">{selectedCase.title}</span>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="pb-24">
          
          {/* Level 1: Specialties */}
          {!selectedSpecialty && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {filteredSpecialties.map((specialty, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleSpecialtyClick(specialty)}
                  className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${getSpecialtyColor(specialty)}`}>
                      {getSpecialtyIcon(specialty)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{specialty}</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{DISEASES_BY_SPECIALTY[specialty]?.length || 0} Diseases</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Level 2: Diseases */}
          {selectedSpecialty && !selectedDisease && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToSpecialties} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                  <ChevronLeft size={18} className="text-[var(--text)]" />
                </button>
                <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                  {getSpecialtyIcon(selectedSpecialty)} {selectedSpecialty}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(DISEASES_BY_SPECIALTY[selectedSpecialty] || []).map((disease, idx) => {
                  const casesCount = INITIAL_CASES.filter(c => c.specialty === selectedSpecialty && c.disease === disease).length;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleDiseaseClick(disease)}
                      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{disease}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{casesCount} {casesCount === 1 ? 'Case' : 'Cases'} Available</p>
                      </div>
                      <ChevronRight size={18} className="text-[var(--border)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Level 3: Cases */}
          {selectedSpecialty && selectedDisease && !selectedCase && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToDiseases} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                  <ChevronLeft size={18} className="text-[var(--text)]" />
                </button>
                <h2 className="text-2xl font-bold text-[var(--text)]">
                  {selectedDisease} Cases
                </h2>
              </div>
              
              <div className="space-y-4">
                {INITIAL_CASES.filter(c => c.specialty === selectedSpecialty && c.disease === selectedDisease).map((clinicalCase, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleCaseClick(clinicalCase)}
                    className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-md group"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                            clinicalCase.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600' :
                            clinicalCase.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600' :
                            'bg-rose-500/10 text-rose-600'
                          }`}>
                            {clinicalCase.difficulty} Level
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">By {clinicalCase.createdByName}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-2">
                          {clinicalCase.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                          <span className="font-semibold">Patient:</span> {clinicalCase.demographics}. <span className="font-semibold">CC:</span> {clinicalCase.chiefComplaint}
                        </p>
                      </div>
                      <div className="flex items-center justify-end md:items-center">
                        <div className="flex items-center gap-2 text-[var(--primary)] font-semibold text-sm">
                          Review Case <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {INITIAL_CASES.filter(c => c.specialty === selectedSpecialty && c.disease === selectedDisease).length === 0 && (
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen size={32} className="text-[var(--text-muted)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text)]">No Cases Available Yet</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
                      Teaching cases for {selectedDisease} are currently being compiled by the faculty. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Level 4: Case Details */}
          {selectedCase && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToCases} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                  <ChevronLeft size={18} className="text-[var(--text)]" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text)] leading-tight">{selectedCase.title}</h2>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                    <span>{selectedCase.specialty}</span>
                    <span>&bull;</span>
                    <span>{selectedCase.disease}</span>
                    <span>&bull;</span>
                    <span className={`font-semibold ${
                      selectedCase.difficulty === 'Beginner' ? 'text-emerald-600' :
                      selectedCase.difficulty === 'Intermediate' ? 'text-amber-600' :
                      'text-rose-600'
                    }`}>{selectedCase.difficulty} Level</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Case Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Presentation Section */}
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-[var(--text)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
                      <User size={20} className="text-[var(--primary)]" /> Clinical Presentation
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Demographics</h4>
                          <p className="text-sm text-[var(--text)]">{selectedCase.demographics}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Chief Complaint</h4>
                          <p className="text-sm text-[var(--text)] font-medium">"{selectedCase.chiefComplaint}"</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">History of Presenting Illness</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.hpi}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Past Medical History</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.pmh}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Medication History</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.medHx}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Allergies</h4>
                          <p className="text-sm text-[var(--text)] text-rose-600 font-medium">{selectedCase.allergies}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Physical Examination</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.pe}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Vital Signs</h4>
                          <p className="text-sm text-[var(--text)] font-mono bg-[var(--surface-dim)] p-2 rounded-lg">{selectedCase.vitals}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investigations Section */}
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-[var(--text)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
                      <Activity size={20} className="text-[var(--primary)]" /> Investigations
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Laboratory Results</h4>
                        <div className="text-sm text-[var(--text)] leading-relaxed bg-[var(--surface-dim)] p-4 rounded-xl font-mono whitespace-pre-wrap">
                          {selectedCase.labs}
                        </div>
                      </div>
                      {selectedCase.imaging && (
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2">Imaging / Other</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.imaging}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Management Section */}
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-[var(--text)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
                      <Stethoscope size={20} className="text-[var(--primary)]" /> Assessment & Management
                    </h3>
                    
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Diagnosis</h4>
                        <p className="text-base font-bold text-[var(--primary)]">{selectedCase.diagnosis}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Differential Diagnoses</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedCase.ddx.map((d, i) => (
                            <span key={i} className="px-3 py-1 bg-[var(--surface-dim)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)]">{d}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Therapeutic Goals</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.goals}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Drug Therapy Problems</h4>
                          <p className="text-sm text-amber-600 font-medium leading-relaxed bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">{selectedCase.dtps}</p>
                        </div>
                      </div>

                      <div className="bg-[var(--primary-container)]/10 p-5 rounded-2xl border border-[var(--primary)]/20 space-y-4">
                        <h4 className="font-bold text-[var(--primary)] flex items-center gap-2">
                          <Pill size={16} /> Pharmaceutical Care Plan
                        </h4>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Pharmacological Management</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.pharm}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Non-Pharmacological Management</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.nonPharm}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Comprehensive Care Plan</h5>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.carePlan}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Monitoring Parameters</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.monitoring}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] mb-1">Patient Counselling</h4>
                          <p className="text-sm text-[var(--text)] leading-relaxed">{selectedCase.counselling}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pearls Section */}
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Sparkles size={16} /> Clinical Pearls & References
                    </h3>
                    <p className="text-sm text-[var(--text)] leading-relaxed mb-4">{selectedCase.pearls}</p>
                    <div className="border-t border-[var(--border)] pt-4">
                      <h4 className="text-xs font-bold text-[var(--text-muted)] mb-2">References:</h4>
                      <ul className="space-y-1">
                        {selectedCase.references.map((ref, i) => (
                          <li key={i} className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                            <BookOpen size={12} /> {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* AI Discussion Sidebar */}
                <div className="lg:col-span-1 h-[calc(100vh-160px)] sticky top-6">
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl h-full flex flex-col shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-transparent flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                        <BrainCircuit size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text)]">AI Case Discussion</h3>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Context-Aware Tutor</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {tutorChat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-sm' 
                              : 'bg-[var(--surface-dim)] border border-[var(--border)] text-[var(--text)] rounded-bl-sm'
                          }`}>
                            <div className={msg.role === 'user' ? 'prose-invert' : ''}><Markdown>{msg.content}</Markdown></div>
                          </div>
                        </div>
                      ))}
                      {isTutorThinking && (
                        <div className="flex justify-start">
                          <div className="bg-[var(--surface-dim)] border border-[var(--border)] rounded-2xl rounded-bl-sm p-4 flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)]/50">
                      <form onSubmit={handleAskTutor} className="flex gap-2">
                        <input
                          type="text"
                          value={tutorMessage}
                          onChange={(e) => setTutorMessage(e.target.value)}
                          placeholder="Ask about this case..."
                          className="flex-1 px-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                        />
                        <button
                          type="submit"
                          disabled={!tutorMessage.trim() || isTutorThinking}
                          className="p-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <Play size={18} className="fill-current" />
                        </button>
                      </form>
                      <p className="text-[9px] text-center text-[var(--text-muted)] mt-2">
                        AI answers are based on guidelines and the specific case context.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
