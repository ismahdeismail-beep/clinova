import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ChevronRight, Search, Activity, Accessibility, Dna, FlaskConical, 
  Droplets, Flame, Beaker, HeartPulse, Bug, Skull, Heart, Award, FileText,
  Briefcase, HelpCircle, Layers, Headphones, FileArchive, Calendar, BrainCircuit,
  Bookmark, Download, History, ChevronLeft, Bot, Play, FileUp, List, Sparkles, CheckCircle2, Clock, Database, Mic
} from 'lucide-react';
import Markdown from 'react-markdown';
import { MODULES, LearningModule, LearningUnit } from '../data/educationHubData';
import FileUploader from '../components/FileUploader';
import { useFileStore } from '../store/fileStore';
import { useAuth } from '../contexts/AuthContext';

export default function EducationHubScreen() {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const filteredModules = MODULES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
              Your primary academic workspace. Structured learning, AI-assisted revision, personal notes, and progress tracking.
            </p>
          </div>

          {!selectedModule && (
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="Search modules, units, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
              />
            </div>
          )}
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] overflow-x-auto pb-2 whitespace-nowrap">
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
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToModules} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
                  <ChevronLeft size={18} className="text-[var(--text)]" />
                </button>
                <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3">
                  <ModuleIcon name={selectedModule.icon} className={`text-${selectedModule.color}-500`} /> 
                  {selectedModule.title}
                </h2>
              </div>
              
              {selectedModule.units.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedModule.units.map((unit) => (
                    <div 
                      key={unit.id}
                      onClick={() => handleUnitClick(unit)}
                      className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md group flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{unit.title}</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{unit.estimatedHours} Hours Estimated</p>
                      </div>
                      <ChevronRight size={18} className="text-[var(--border)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <List size={32} className="text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)]">No Units Available Yet</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm mx-auto">
                    Learning units for {selectedModule.title} are currently being added. Please check back later.
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
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{module.units.length} Units</p>
        </div>
      </div>
      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-auto">{module.description}</p>
    </div>
  );
}

function LearningWorkspace({ unit, module, onBack }: { unit: LearningUnit, module: LearningModule, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tutor', label: 'AI Tutor' },
    { id: 'notes', label: 'My Notes' },
    { id: 'resources', label: 'Resources' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'mcqs', label: 'MCQs' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors">
            <ChevronLeft size={18} className="text-[var(--text)]" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)] leading-tight">{unit.title}</h2>
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
              <span>{module.title}</span>
              <span>&bull;</span>
              <span>Workspace</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Workspace Tabs */}
        <div className="flex overflow-x-auto border-b border-[var(--border)] no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-[var(--primary)] text-[var(--primary)]' 
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Workspace Content */}
        <div className="flex-1 p-6 bg-[var(--bg)]">
          {activeTab === 'overview' && <WorkspaceOverview unit={unit} />}
          {activeTab === 'tutor' && <WorkspaceTutor unit={unit} />}
          {activeTab === 'notes' && <WorkspaceNotes unit={unit} />}
          {activeTab === 'resources' && <WorkspaceResources unit={unit} />}
          {activeTab === 'flashcards' && <WorkspacePlaceholder title="Flashcards" desc="AI-generated spaced repetition decks will appear here." icon={Layers} />}
          {activeTab === 'mcqs' && <WorkspacePlaceholder title="MCQs" desc="Practice multiple choice questions based on your notes and guidelines." icon={HelpCircle} />}
        </div>
      </div>
    </div>
  );
}

function WorkspaceOverview({ unit }: { unit: LearningUnit }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider">Est. Time</p>
            <p className="text-lg font-bold text-[var(--text)]">{unit.estimatedHours} Hours</p>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider">Progress</p>
            <p className="text-lg font-bold text-[var(--text)]">0%</p>
          </div>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider">Recent Activity</p>
            <p className="text-lg font-bold text-[var(--text)]">Not started</p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
        <h3 className="text-lg font-bold text-[var(--text)] mb-4">Learning Objectives</h3>
        <ul className="space-y-3">
          {[
            'Understand the fundamental concepts of this unit.',
            'Apply evidence-based guidelines to clinical scenarios.',
            'Evaluate pharmacological profiles and mechanisms.',
            'Generate personalized revision material using AI Study Tools.'
          ].map((obj, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--text-muted)]">
              <span className="w-5 h-5 rounded-full bg-[var(--surface-dim)] text-[var(--text)] flex items-center justify-center shrink-0 font-bold text-xs">{i+1}</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WorkspaceTutor({ unit }: { unit: LearningUnit }) {
  const [tutorMessage, setTutorMessage] = useState('');
  const [tutorChat, setTutorChat] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: `Hello! I am your AI Tutor for **${unit.title}**. I have access to your uploaded notes, open textbooks, WHO guidelines, and peer-reviewed journals. How can I assist you with your studies today?` }
  ]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorMessage.trim()) return;

    const userMsg = tutorMessage;
    setTutorMessage('');
    
    const newChat = [...tutorChat, { role: 'user' as const, content: userMsg }];
    setTutorChat(newChat);
    setIsTutorThinking(true);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      setTimeout(() => {
        setTutorChat([...newChat, { 
          role: 'assistant', 
          content: `This is a simulated RAG response addressing "${userMsg}" in the context of ${unit.title}. In the real implementation, this will query embeddings from your notes and authoritative sources, providing citations and confidence scores.` 
        }]);
        setIsTutorThinking(false);
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1500);
    } catch (error) {
      console.error('Error asking tutor:', error);
      setIsTutorThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
      <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text)]">Intelligent RAG Tutor</h3>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Context-Aware</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
          <Database size={14} /> Knowledge Indexed
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tutorChat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-br-sm' 
                : 'bg-[var(--surface-dim)] border border-[var(--border)] text-[var(--text)] rounded-bl-sm'
            }`}>
              <div className={msg.role === 'user' ? 'prose-invert' : ''}>
                <Markdown>{msg.content}</Markdown>
              </div>
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
            placeholder="Ask a question about this unit..."
            className="flex-1 px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
          <button
            type="submit"
            disabled={!tutorMessage.trim() || isTutorThinking}
            className="px-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:opacity-95 disabled:opacity-50 transition-opacity flex items-center justify-center shrink-0 cursor-pointer font-bold"
          >
            Ask AI
          </button>
        </form>
      </div>
    </div>
  );
}

function WorkspaceNotes({ unit }: { unit: LearningUnit }) {
  const { userData } = useAuth();
  const { files } = useFileStore();
  
  // Filter files that belong to this unit (mocking with a unit tag)
  const unitFiles = files.filter(f => f.category === 'study_source' && f.studyId === unit.id);

  return (
    <div className="space-y-6">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text)]">Personal Notes</h3>
            <p className="text-sm text-[var(--text-muted)]">Upload PDFs, Docs, PPTs, or paste text. The AI will extract text, OCR scanned documents, and index them for this unit exclusively.</p>
          </div>
        </div>
        <FileUploader category="study_source" studyId={unit.id} />
      </div>

      {unitFiles.length > 0 ? (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[var(--text)] mb-4">Indexed Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unitFiles.map((file) => (
              <div key={file.id} className="border border-[var(--border)] rounded-xl p-4 flex items-start gap-4 hover:border-[var(--primary)] transition-colors">
                <div className="w-10 h-10 bg-[var(--surface-dim)] rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] truncate">{file.originalName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] bg-[var(--surface-dim)] px-2 py-0.5 rounded">
                      {file.mimeType.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-[var(--border)] rounded-xl p-12 text-center">
          <FileUp size={32} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h4 className="text-base font-bold text-[var(--text)]">No notes uploaded yet</h4>
          <p className="text-sm text-[var(--text-muted)] mt-1">Upload your first document to power up the AI Tutor.</p>
        </div>
      )}
    </div>
  );
}

function WorkspaceResources({ unit }: { unit: LearningUnit }) {
  const resources = [
    { title: 'Clinical Guidelines 2024', author: 'Ministry of Health', type: 'PDF' },
    { title: 'Standard Treatment Protocol', author: 'WHO', type: 'Link' },
    { title: 'Essential Medicines List', author: 'KEMSA', type: 'PDF' },
    { title: 'Pharmacotherapy Lecture Slides', author: 'Prof. Smith', type: 'PPTX' }
  ];

  return (
    <div className="space-y-4">
      {resources.map((res, i) => (
        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex items-center justify-between hover:border-[var(--primary)] transition-colors group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[var(--surface-dim)] rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-[var(--primary)]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{res.title}</h4>
              <p className="text-xs text-[var(--text-muted)]">{res.author} &bull; {res.type}</p>
            </div>
          </div>
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors">
            <Download size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

function WorkspacePlaceholder({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) {
  return (
    <div className="h-[400px] border border-dashed border-[var(--border)] rounded-xl flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
        <Icon size={32} className="text-[var(--text-muted)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--text)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] max-w-sm">{desc}</p>
      <button className="mt-6 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl flex items-center gap-2">
        <Sparkles size={16} /> Generate with AI
      </button>
    </div>
  );
}

// Ensure icons like Clock, Database are imported above
