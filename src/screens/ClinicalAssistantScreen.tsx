import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, BrainCircuit, Library, Pill, Activity, FlaskConical, FileText, CheckCircle2, ChevronRight, Loader2, Database, AlertCircle } from 'lucide-react';
import { RagRouterService } from '../services/ragRouter';

interface Citation {
  source: string;
  document: string;
  year?: string;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  citations?: Citation[];
  confidence?: number;
  routedTo?: string[];
  isThinking?: boolean;
}

const RAG_SOURCES = [
  { id: 'drug', name: 'Drug RAG', icon: Pill },
  { id: 'guideline', name: 'Guideline RAG', icon: Library },
  { id: 'pharma', name: 'Pharmacotherapy RAG', icon: FlaskConical },
  { id: 'research', name: 'Research RAG', icon: BrainCircuit },
  { id: 'notes', name: 'User Notes RAG', icon: FileText },
  { id: 'ward', name: 'Ward-AID RAG', icon: Activity },
];

export default function ClinicalAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome',
      role: 'assistant', 
      content: 'Welcome to the Clinova Knowledge & Reasoning Engine. I can retrieve and synthesize evidence from the Kenya Drug Index (KDI), STG Guidelines, WHO, and your clinical notes.\n\nHow can I assist your clinical decision making today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRouterState, setActiveRouterState] = useState<{ intent: string, routes: string[] } | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>(['Kenya Drug Index', 'Kenya STG', 'WHO Guidelines']);
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const AVAILABLE_SOURCES = [
    'Kenya Drug Index', 'Kenya STG', 'WHO Guidelines', 'Uploaded Notes', 
    'Clinical Pharmacy Library', 'Pharmacotherapy Library', 'Research Evidence'
  ];

  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userQuery = input.trim();
    setInput('');
    setIsProcessing(true);

    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: userQuery }]);

    // Execute RAG Routing Logic
    const routingResult = RagRouterService.routeQuery(userQuery);
    
    setActiveRouterState({ 
      intent: routingResult.intent, 
      routes: routingResult.selectedSources 
    });

    const thinkingMsgId = 'think-' + Date.now();
    setMessages(prev => [...prev, { 
      id: thinkingMsgId, 
      role: 'assistant', 
      content: 'Analyzing query intent...',
      isThinking: true 
    }]);

    await new Promise(r => setTimeout(r, 600));

    setMessages(prev => prev.map(m => m.id === thinkingMsgId ? { 
      ...m, 
      content: `Routing to: ${routingResult.selectedSources.join(', ')}`, 
      routedTo: routingResult.selectedSources 
    } : m));

    await new Promise(r => setTimeout(r, 1200));

    setMessages(prev => prev.map(m => m.id === thinkingMsgId ? { 
      ...m, 
      content: 'Retrieving evidence and validating...', 
      routedTo: routingResult.selectedSources 
    } : m));

    await new Promise(r => setTimeout(r, 1200));

    // Determine mock response based on query
    let responseContent = '';
    let citations: Citation[] = [];

    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('cap') || lowerQuery.includes('pneumonia')) {
      responseContent = "**Answer:**\nFor Community-Acquired Pneumonia (CAP) empirical treatment in adults without severe comorbidities is:\n\n1. **First-line:** Amoxicillin 1g orally every 8 hours for 5-7 days.\n2. **Alternative:** Azithromycin 500mg orally daily for 3 days.\n\n**Renal Dose Adjustment (Amoxicillin):**\n- **CrCl 10-30 mL/min:** 500mg every 12 hours.\n- **CrCl < 10 mL/min:** 500mg every 24 hours.\n\n**Explanation:**\nAmoxicillin provides excellent coverage against *Streptococcus pneumoniae*, the most common typical pathogen in CAP. Macrolides are preferred alternatives for atypical coverage or penicillin allergy.\n\n**Clinical Pearl:**\nAssess clinical response after 48-72 hours. Monitor respiratory rate, oxygen saturation, and temperature.";
      citations = [
        { source: 'Kenya STG', document: 'Respiratory Tract Infections, Pg 45', year: '2024' },
        { source: 'WHO Guidelines', document: 'Empirical Antibiotic Use', year: '2023' },
        { source: 'Kenya Drug Index (KDI)', document: 'Amoxicillin Monograph', year: '2024' }
      ];
    } else if (lowerQuery.includes('malaria')) {
      responseContent = "**Answer:**\n**Uncomplicated Malaria Treatment**\n\nThe recommended first-line treatment for uncomplicated *Plasmodium falciparum* malaria in Kenya is Artemether-Lumefantrine (AL).\n\n**Dosage (Adults >34kg):**\n- 4 tablets (20mg/120mg) initially, followed by 4 tablets after 8 hours, then 4 tablets twice daily for the next 2 days (Total: 24 tablets over 3 days).\n\n**Explanation:**\nAL is an artemisinin-based combination therapy (ACT). Artemether provides rapid parasite clearance, while lumefantrine eliminates residual parasites to prevent recrudescence.\n\n**Clinical Pearl:**\nAL should be taken with a fatty meal or milk to ensure optimal absorption of lumefantrine. Avoid concurrent use with strong CYP3A4 inhibitors.";
      citations = [
        { source: 'Kenya STG', document: 'Malaria Treatment Protocols, Pg 82', year: '2024' },
        { source: 'Kenya Drug Index (KDI)', document: 'Artemether-Lumefantrine', year: '2024' }
      ];
    } else {
      responseContent = "**Answer:**\nBased on the available clinical evidence, I have retrieved information regarding your query. \n\n**Explanation:**\nIt is recommended to monitor the patient's renal and hepatic profiles when initiating this therapy. Adjust dosages if CrCl falls below 30 mL/min.\n\n**Clinical Pearl:**\nAlways check for specific drug-drug interactions with the patient's current medication list, particularly regarding QTc prolongation.";
      citations = [
        { source: 'Pharmacotherapy Reference', document: 'General Prescribing Principles' },
        { source: 'Clinical Pharmacy Notes', document: 'Monitoring Parameters' }
      ];
    }

    // Replace thinking message with final response
    setMessages(prev => prev.filter(m => m.id !== thinkingMsgId));
    setMessages(prev => [...prev, {
      id: 'res-' + Date.now(),
      role: 'assistant',
      content: responseContent,
      citations,
      confidence: routingResult.confidence,
      routedTo: routingResult.selectedSources
    }]);
    
    setIsProcessing(false);
    setTimeout(() => setActiveRouterState(null), 3000); // clear router state after a delay
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-2rem)]">
      {/* Left Sidebar: Master Router Status */}
      <div className="hidden lg:flex w-64 flex-col gap-4 shrink-0">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm relative overflow-hidden">
          {activeRouterState && (
            <div className="absolute inset-0 bg-[var(--primary)]/5 animate-pulse rounded-xl pointer-events-none" />
          )}
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <Database size={18} className="text-[var(--primary)]" />
            <h3 className="font-semibold text-[var(--text)]">Master Router</h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4 relative z-10">
            Intelligently routes queries to the most relevant knowledge bases for &gt;95% evidence-backed responses.
          </p>
          <div className="space-y-2.5 relative z-10">
            {RAG_SOURCES.map(source => {
              const Icon = source.icon;
              const isActiveRoute = activeRouterState?.routes.includes(source.name);
              return (
                <div 
                  key={source.id} 
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 ${
                    isActiveRoute 
                      ? 'bg-[var(--primary-container)] border-[var(--primary)]/30' 
                      : 'bg-[var(--surface-dim)] border-[var(--border)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={isActiveRoute ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'} />
                    <span className={`text-xs font-medium ${isActiveRoute ? 'text-[var(--primary)]' : 'text-[var(--text)]'}`}>
                      {source.name}
                    </span>
                  </div>
                  {isActiveRoute ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_4px_var(--primary)] animate-pulse"></div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div>
                  )}
                </div>
              );
            })}
          </div>
          {activeRouterState && (
             <div className="mt-4 pt-4 border-t border-[var(--border)] relative z-10">
               <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)] mb-1">Detected Intent</div>
               <div className="text-xs text-[var(--primary)] font-medium">{activeRouterState.intent}</div>
             </div>
          )}
        </div>
        
        <div className="bg-[var(--primary-container)] border border-[var(--primary)]/20 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-[var(--primary)] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[var(--primary)] mb-1">Zero Hallucination Target</h4>
              <p className="text-xs text-[var(--text)] opacity-80 leading-relaxed">
                Every response requires retrieval of validated evidence and generates a clinical confidence score.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface-dim)] text-[var(--primary)] border border-[var(--border)]'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Assistant Processing Indicators */}
                {msg.isThinking && (
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--primary)] bg-[var(--primary-container)] px-3 py-1.5 rounded-full mb-1">
                    <Loader2 size={12} className="animate-spin" />
                    {msg.content}
                    {msg.routedTo && (
                      <span className="ml-2 text-[var(--text-muted)] flex items-center gap-1">
                        <ChevronRight size={10} /> {msg.routedTo.join(', ')}
                      </span>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                {!msg.isThinking && (
                  <div className={`rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--primary)] text-white rounded-tr-none' 
                      : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-tl-none'
                  }`}>
                    {/* Render Content with basic markdown-like support */}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content.split('**').map((text, i) => i % 2 === 1 ? <strong key={i} className="font-semibold">{text}</strong> : text)}
                    </div>
                  </div>
                )}

                {/* Verification Metadata (Only for Assistant Responses) */}
                {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2 w-full bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl p-4 text-xs">
                    <div className="flex items-center justify-between mb-3 border-b border-[var(--border)] pb-2">
                      <div className="flex items-center gap-2 text-[var(--text-muted)] font-medium">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Clinical Evidence Synthesized
                      </div>
                      {msg.confidence && (
                        <div className={`flex items-center gap-1.5 font-bold ${
                          msg.confidence >= 95 ? 'text-emerald-500' : 
                          msg.confidence >= 85 ? 'text-blue-500' : 'text-amber-500'
                        }`}>
                          <span>Confidence Score:</span>
                          <span className="bg-white/50 px-2 py-0.5 rounded-md border border-[var(--border)] shadow-sm">{msg.confidence}%</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <span className="text-[var(--text-muted)] uppercase tracking-wider font-semibold text-[10px]">Sources Cited:</span>
                      <ul className="space-y-1.5">
                        {msg.citations.map((cite, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0"></div>
                            <span className="text-[var(--text)]">
                              <span className="font-semibold">{cite.source}</span>
                              {cite.year && <span className="text-[var(--text-muted)]"> ({cite.year})</span>}
                              <span className="text-[var(--text-muted)]"> — {cite.document}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {msg.routedTo && (
                      <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                        <span className="text-[var(--text-muted)] uppercase tracking-wider font-semibold text-[10px]">Retrieved From:</span>
                        {msg.routedTo.map((route, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[10px] font-medium text-[var(--text-secondary)]">
                            {route}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)]">
          {/* Quick Prompts */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
            {['Best antibiotic for CAP?', 'Renal dose adjustment for Amoxicillin?', 'Alternative therapy for Malaria?'].map((prompt, i) => (
              <button 
                key={i}
                onClick={() => setInput(prompt)}
                className="shrink-0 px-3 py-1.5 bg-[var(--surface-dim)] hover:bg-[var(--primary-container)] border border-[var(--border)] rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Source Selector Toggle */}
          <div className="mb-2">
            <button 
              onClick={() => setShowSourceSelector(!showSourceSelector)}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] px-2 py-1 hover:bg-[var(--primary-container)] rounded-md transition-colors"
            >
              <Library size={14} /> 
              Selected Sources ({selectedSources.length})
            </button>
            
            {showSourceSelector && (
              <div className="mt-2 p-3 bg-[var(--surface-dim)] border border-[var(--border)] rounded-lg grid grid-cols-2 md:grid-cols-3 gap-2">
                {AVAILABLE_SOURCES.map(source => (
                  <label key={source} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-[var(--surface)] rounded-md">
                    <input 
                      type="checkbox" 
                      checked={selectedSources.includes(source)}
                      onChange={() => toggleSource(source)}
                      className="accent-[var(--primary)]"
                    />
                    <span className="text-xs text-[var(--text)]">{source}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-end gap-2">
            <div className="relative flex-1">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask clinical queries, verify doses, or check guidelines..." 
                className="w-full pl-4 pr-12 py-3 max-h-32 min-h-[50px] bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none text-[var(--text)] text-sm resize-none"
                rows={1}
              />
            </div>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              className={`p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center ${
                input.trim() && !isProcessing
                  ? 'bg-[var(--primary)] text-white hover:opacity-90 shadow-sm' 
                  : 'bg-[var(--surface-dim)] text-[var(--text-muted)] cursor-not-allowed'
              }`}
            >
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <p className="text-[10px] text-[var(--text-muted)]">Clinova uses a Multi-RAG engine. Always verify critical decisions.</p>
            <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Validation Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
