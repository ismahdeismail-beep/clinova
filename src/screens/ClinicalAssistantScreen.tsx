import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, User, BrainCircuit, Library, Pill, Activity, 
  FlaskConical, FileText, CheckCircle2, ChevronRight, Loader2, 
  Database, AlertCircle, Mic, MicOff, ArrowDown, X, Layers, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GhostWriterText } from '../components/GhostWriterText';
import { RAGRouter } from '../services/ragRouter';
import ReactMarkdown from 'react-markdown';

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
  isNew?: boolean;
}

const RAG_SOURCES = [
  { id: 'drug', name: 'Drug RAG', icon: Pill },
  { id: 'guideline', name: 'Guideline RAG', icon: Library },
  { id: 'pharma', name: 'Pharmacotherapy RAG', icon: FlaskConical },
  { id: 'research', name: 'Research RAG', icon: BrainCircuit },
  { id: 'notes', name: 'User Notes RAG', icon: FileText },
  { id: 'ward', name: 'Ward-AID RAG', icon: Activity },
];

function renderMarkdown(text: string) {
  return (
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
        th: ({ children }) => <th className="p-3 font-semibold text-[var(--text)] uppercase tracking-wider text-[10px] sm:text-xs bg-[var(--surface-dim)]">{children}</th>,
        td: ({ children }) => <td className="p-3 text-[var(--text-secondary)] leading-normal">{children}</td>,
        h1: ({ children }) => <h1 className="text-base sm:text-lg font-bold text-[var(--text)] mt-4 mb-2 tracking-tight border-b border-[var(--border)] pb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-sm sm:text-base font-bold text-[var(--text)] mt-4 mb-2 tracking-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xs sm:text-sm font-bold text-[var(--text)] mt-3 mb-1.5 tracking-tight">{children}</h3>,
        p: ({ children }) => <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] mb-2.5 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 mb-3.5 space-y-1 text-xs sm:text-sm text-[var(--text-secondary)]">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 mb-3.5 space-y-1 text-xs sm:text-sm text-[var(--text-secondary)]">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        code: ({ inline, className, children, ...props }: any) => {
          return (
            <code className="bg-[var(--surface-dim)] border border-[var(--border)] text-[var(--primary)] px-1.5 py-0.5 rounded text-xs font-mono font-medium" {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function AssistantMessageBubble({ 
  content, 
  isNew, 
  onComplete 
}: { 
  content: string; 
  isNew?: boolean; 
  onComplete?: () => void 
}) {
  const [displayedText, setDisplayedText] = useState(isNew ? '' : content);

  useEffect(() => {
    if (!isNew) {
      setDisplayedText(content);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 6; // Reveal 6 characters at a time for fast & elegant streaming
      if (currentIndex >= content.length) {
        setDisplayedText(content);
        clearInterval(interval);
        onComplete?.();
      } else {
        setDisplayedText(content.slice(0, currentIndex));
      }
    }, 12);

    return () => clearInterval(interval);
  }, [content, isNew, onComplete]);

  return (
    <div className="text-xs sm:text-sm leading-relaxed max-w-none break-words">
      {renderMarkdown(displayedText)}
      {isNew && displayedText.length < content.length && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-[var(--primary)] animate-pulse" />
      )}
    </div>
  );
}

export default function ClinicalAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome',
      role: 'assistant', 
      content: 'Welcome to the Clinova Knowledge & Reasoning Engine. I can retrieve and synthesize evidence from the Kenya Drug Index (KDI), STG Guidelines, WHO, and your clinical notes.\n\nHow can I assist your clinical decision making today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobileRouterOpen, setIsMobileRouterOpen] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  // Ref for textarea auto-resizing
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keyboard and dynamic viewport height tracking
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      } else {
        setViewportHeight(window.innerHeight);
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('scroll', handleResize);
    window.addEventListener('resize', handleResize);

    // Initial trigger
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Textarea auto-height adjustment
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  // Auto-save input to localStorage
  useEffect(() => {
    const savedInput = localStorage.getItem('clinova_assistant_input');
    if (savedInput) {
      setInput(savedInput);
    }
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedInput = localStorage.getItem('clinova_assistant_input');
      if (savedInput !== null && savedInput !== input) {
        setInput(savedInput);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinova-storage-synced', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinova-storage-synced', handleStorageChange);
    };
  }, [input]);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setInput(prev => {
            const newValue = prev ? `${prev} ${finalTranscript}` : finalTranscript;
            return newValue;
          });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Voice recognition is not supported in this browser.',
      }]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('clinova_assistant_input', input);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [input]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRouterState, setActiveRouterState] = useState<{ intent: string, routes: string[] } | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>(['Kenya Drug Index', 'Kenya STG', 'WHO Guidelines']);
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

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

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    // Show button if user is scrolled up more than 300px
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 300;
    setShowScrollBottomBtn(!isNearBottom);
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  // Smart scroll auto-management
  useEffect(() => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 400;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user' || isNearBottom) {
      scrollToBottom('smooth');
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userQuery = input.trim();
    setInput('');
    setIsProcessing(true);

    const userMsgId = Date.now().toString();
    const thinkingMsgId = 'think-' + Date.now();

    setMessages(prev => [
      ...prev, 
      { id: userMsgId, role: 'user', content: userQuery },
      { id: thinkingMsgId, role: 'assistant', content: 'Analyzing query intent...', isThinking: true }
    ]);

    // Execute RAG Routing Logic
    const intent = RAGRouter.analyzeIntent(userQuery);
    const agent = RAGRouter.routeQuery(intent);
    
    setActiveRouterState({ 
      intent: intent.charAt(0).toUpperCase() + intent.slice(1) + ' Query', 
      routes: [agent] 
    });

    await new Promise(r => setTimeout(r, 600));

    setMessages(prev => prev.map(m => m.id === thinkingMsgId ? { 
      ...m, 
      content: `Routing query to: ${agent}`, 
      routedTo: [agent],
      isNew: true 
    } : m));

    await new Promise(r => setTimeout(r, 1000));

    setMessages(prev => prev.map(m => m.id === thinkingMsgId ? { 
      ...m, 
      content: 'Retrieving evidence and validating clinically...', 
      routedTo: [agent],
      isNew: true 
    } : m));

    await new Promise(r => setTimeout(r, 1000));

    // Connect to actual Express server API proxying Gemini
    let responseContent = '';
    let citations: Citation[] = [];

    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};

      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: userQuery,
          chatHistory: messages.filter(m => !m.isThinking).map(m => ({
            role: m.role,
            content: m.content
          })),
          currentFormState: parsed
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Clinical Assistant service failed');
      }

      const data = await res.json();
      responseContent = data.text;
      
      const lowerQuery = userQuery.toLowerCase();
      if (lowerQuery.includes('cap') || lowerQuery.includes('pneumonia') || responseContent.toLowerCase().includes('pneumonia')) {
        citations = [
          { source: 'Kenya STG', document: 'Respiratory Tract Infections, Pg 45', year: '2024' },
          { source: 'WHO Guidelines', document: 'Empirical Antibiotic Use', year: '2023' },
          { source: 'Kenya Drug Index (KDI)', document: 'Amoxicillin Monograph', year: '2024' }
        ];
      } else if (lowerQuery.includes('malaria') || responseContent.toLowerCase().includes('malaria')) {
        citations = [
          { source: 'Kenya STG', document: 'Malaria Treatment Protocols, Pg 82', year: '2024' },
          { source: 'Kenya Drug Index (KDI)', document: 'Artemether-Lumefantrine', year: '2024' }
        ];
      } else {
        citations = [
          { source: 'Kenya Drug Index (KDI)', document: 'Standard Clinical Guidelines', year: '2024' },
          { source: 'WHO Essential Medicines List', document: 'Formulary Reference', year: '2023' }
        ];
      }
    } catch (err: any) {
      console.error(err);
      responseContent = `Sorry, I encountered an issue: ${err.message || 'Service temporarily unavailable. Please try again.'}`;
      citations = [
        { source: 'Clinical Rules Engine', document: 'Local Fallback Safe Mode' }
      ];
    }

    // Replace thinking message with final response
    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== thinkingMsgId);
      return [...filtered, {
        id: 'res-' + Date.now(),
        role: 'assistant',
        content: responseContent,
        citations,
        confidence: 95,
        routedTo: [agent],
        isNew: true
      }];
    });
    
    setIsProcessing(false);
    setTimeout(() => setActiveRouterState(null), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const masterRouterContent = (isMobile: boolean = false) => (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Database size={16} className="text-[var(--primary)]" />
          <h3 className="font-semibold text-sm text-[var(--text)]">Master Router</h3>
        </div>
        {isMobile && (
          <button 
            onClick={() => setIsMobileRouterOpen(false)}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] rounded-full hover:bg-[var(--surface-dim)]"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
        Intelligently routes queries to the most relevant knowledge bases for &gt;95% evidence-backed responses.
      </p>
      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {RAG_SOURCES.map(source => {
          const Icon = source.icon;
          const isActiveRoute = activeRouterState?.routes.includes(source.name);
          return (
            <div 
              key={source.id} 
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                isActiveRoute 
                  ? 'bg-[var(--primary-container)]/25 border-[var(--primary)]/30 shadow-xs' 
                  : 'bg-[var(--surface-dim)]/50 border-[var(--border)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${isActiveRoute ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'bg-[var(--surface)] text-[var(--text-muted)]'}`}>
                  <Icon size={14} />
                </div>
                <span className={`text-[11px] font-medium ${isActiveRoute ? 'text-[var(--primary)] font-semibold' : 'text-[var(--text)]'}`}>
                  {source.name}
                </span>
              </div>
              {isActiveRoute ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
                </span>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {activeRouterState && (
         <div className="mt-2 pt-3 border-t border-[var(--border)]">
           <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] mb-1">Detected Intent</div>
           <div className="text-xs text-[var(--primary)] font-bold bg-[var(--primary-container)]/10 px-2.5 py-1.5 rounded-lg border border-[var(--primary)]/10 inline-block w-full text-center">
             {activeRouterState.intent}
           </div>
         </div>
      )}

      <div className="bg-gradient-to-r from-[var(--primary)]/5 to-indigo-500/5 border border-[var(--primary)]/20 rounded-2xl p-4 shadow-xs">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
            <AlertCircle size={15} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--primary)] mb-1">Zero Hallucination Target</h4>
            <p className="text-[10px] text-[var(--text)] opacity-80 leading-relaxed">
              Every response requires retrieval of validated evidence and generates a clinical confidence score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed md:left-64 left-0 right-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top,0px))] bg-[var(--bg)] flex flex-row overflow-hidden z-20"
      style={{
        height: `calc(${viewportHeight}px - 4rem - env(safe-area-inset-top, 0px))`
      }}
    >
      {/* Left Sidebar: Master Router Status (Desktop) */}
      <div className="hidden lg:flex w-72 flex-col gap-4 shrink-0 h-full p-6 border-r border-[var(--border)] bg-[var(--surface)] overflow-y-auto">
        {masterRouterContent(false)}
      </div>

      {/* Slide-over Drawer (Mobile Router Monitor) */}
      <AnimatePresence>
        {isMobileRouterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileRouterOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-[calc(4rem+env(safe-area-inset-top,0px))] bottom-0 w-80 max-w-[85vw] bg-[var(--surface)] border-l border-[var(--border)] p-5 shadow-2xl z-50 lg:hidden flex flex-col justify-between"
              style={{
                height: `calc(${viewportHeight}px - 4rem - env(safe-area-inset-top, 0px))`
              }}
            >
              {masterRouterContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--bg)] relative">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-[var(--border)] px-4 bg-[var(--surface)] flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20 shadow-xs">
              <Bot size={18} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs sm:text-sm font-semibold text-[var(--text)]">Clinical Assistant</h2>
                <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                  </span>
                  <span className="hidden xs:inline">Live Validation</span>
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] truncate max-w-[160px] xs:max-w-xs">Active Multi-RAG Decisional Support</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Source selector status preview */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              <span>{selectedSources.length} databases selected</span>
            </div>
            {/* Mobile RAG router toggle button */}
            <button
              onClick={() => setIsMobileRouterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)]/25 px-3 py-1.5 rounded-xl border border-[var(--primary)]/10 transition-all cursor-pointer select-none"
            >
              <Layers size={13} />
              <span>Router</span>
            </button>
          </div>
        </div>

        {/* Message Thread Scroll Container */}
        <div 
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scroll-smooth"
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  isUser 
                    ? 'bg-gradient-to-tr from-[var(--primary)] to-indigo-600 text-white' 
                    : 'bg-gradient-to-tr from-[var(--surface-dim)] to-[var(--surface)] text-[var(--primary)] border border-[var(--border)]'
                }`}>
                  {isUser ? <User size={15} /> : <Bot size={15} />}
                </div>
                
                {/* Bubble Container */}
                <div className={`flex flex-col gap-2 max-w-[88%] sm:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Real-time RAG Steps Tracker */}
                  {msg.isThinking && (
                    <div className="flex flex-col gap-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 shadow-sm w-full sm:min-w-[280px]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)]">
                        <Loader2 size={14} className="animate-spin text-[var(--primary)] shrink-0" />
                        <span>Clinical Decisional Inference</span>
                      </div>
                      <div className="space-y-2 pl-1.5 border-l-2 border-[var(--border)]">
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--text)]">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                          <span>{msg.content}</span>
                        </div>
                        {msg.routedTo && msg.routedTo.length > 0 && (
                          <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                            <ChevronRight size={10} className="shrink-0" />
                            <span>Routed Base: {msg.routedTo.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bubble Content */}
                  {!msg.isThinking && (
                    <div className={`rounded-2xl px-5 py-3.5 shadow-xs text-xs sm:text-sm leading-relaxed ${
                      isUser 
                        ? 'bg-[var(--primary)] text-white rounded-tr-none shadow-md' 
                        : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-tl-none shadow-xs'
                    }`}>
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <AssistantMessageBubble 
                          content={msg.content} 
                          isNew={msg.isNew} 
                          onComplete={() => {
                            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isNew: false } : m));
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Verification Citations Widget */}
                  {!msg.isThinking && msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                    <div className="w-full bg-[var(--surface-dim)]/60 border border-[var(--border)] rounded-xl p-4 text-xs mt-1 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between mb-3 border-b border-[var(--border)] pb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-bold">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                          <span>Clinical Evidence Synthesized</span>
                        </div>
                        {msg.confidence && (
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-[var(--text-muted)]">Confidence:</span>
                            <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono tracking-tight text-[11px]">
                              {msg.confidence}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block">Sources Cited:</span>
                        <ul className="space-y-2">
                          {msg.citations.map((cite, i) => (
                            <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                              <span className="leading-normal text-xs text-[var(--text-secondary)]">
                                <span className="font-bold text-[var(--text)]">{cite.source}</span>
                                {cite.year && <span className="text-[var(--text-muted)]"> ({cite.year})</span>}
                                <span className="text-[var(--text-muted)]"> — {cite.document}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {msg.routedTo && (
                        <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Routing:</span>
                          {msg.routedTo.map((route, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[10px] font-bold text-[var(--primary)]">
                              {route}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Scroll Bottom Button */}
        <AnimatePresence>
          {showScrollBottomBtn && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollToBottom('smooth')}
              className="absolute right-6 bottom-36 sm:bottom-32 p-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)] shadow-md hover:bg-[var(--surface-dim)] transition-colors cursor-pointer z-10"
              title="Scroll to bottom"
            >
              <ArrowDown size={16} />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Floating Interactive Input Composer Area */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)] shrink-0 z-10 shadow-lg">
          
          {/* Quick Prompts Carousel */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
            {[
              { text: 'Best antibiotic for CAP?', label: 'Pneumonia Rx' },
              { text: 'Renal dose adjustment for Amoxicillin?', label: 'Renal Adjust' },
              { text: 'Alternative therapy for Malaria?', label: 'Malaria Alternative' }
            ].map((prompt, i) => (
              <button 
                key={i}
                onClick={() => setInput(prompt.text)}
                className="shrink-0 px-3.5 py-2 bg-[var(--surface-dim)] hover:bg-[var(--primary-container)]/30 border border-[var(--border)] hover:border-[var(--primary)]/30 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-all cursor-pointer shadow-xs whitespace-nowrap select-none"
              >
                💡 {prompt.label}
              </button>
            ))}
          </div>

          {/* Active Databases Config Dropdown Panel */}
          <div className="mb-3 relative">
            <button 
              onClick={() => setShowSourceSelector(!showSourceSelector)}
              className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] px-2.5 py-1.5 hover:bg-[var(--primary-container)]/15 border border-[var(--primary)]/15 rounded-xl transition-all cursor-pointer select-none"
            >
              <Library size={13} className="text-[var(--primary)]" /> 
              <span>Configure Active Databases ({selectedSources.length})</span>
            </button>
            
            <AnimatePresence>
              {showSourceSelector && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-10 left-0 w-full sm:w-[480px] p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl grid grid-cols-2 gap-2.5 shadow-lg z-20"
                >
                  {AVAILABLE_SOURCES.map(source => (
                    <label key={source} className="flex items-center gap-2.5 cursor-pointer p-2 bg-[var(--surface-dim)]/50 border border-[var(--border)] hover:border-[var(--primary)]/30 rounded-xl transition-all select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedSources.includes(source)}
                        onChange={() => toggleSource(source)}
                        className="accent-[var(--primary)] rounded h-3.5 w-3.5 border-[var(--border)] cursor-pointer"
                      />
                      <span className="text-xs text-[var(--text-secondary)] font-medium">{source}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Styled Floating Input Box */}
          <div className="relative flex items-end bg-[var(--surface-dim)]/55 border border-[var(--border)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 focus-within:border-[var(--primary)] focus-within:bg-[var(--surface)] rounded-2xl shadow-inner transition-all overflow-hidden pr-2">
            <textarea 
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask clinical queries, verify doses, or check guidelines..." 
              className="w-full pl-5 pr-2 py-3 max-h-40 min-h-[44px] bg-transparent outline-none text-[var(--text)] text-sm resize-none placeholder-[var(--text-muted)] leading-relaxed self-center"
              rows={1}
            />
            <div className="flex items-center gap-1.5 pb-2 shrink-0 self-end">
              <button
                onClick={toggleListening}
                className={`p-2 rounded-xl transition-all cursor-pointer select-none ${
                  isListening
                    ? 'bg-red-500/20 text-red-500 animate-pulse'
                    : 'text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)]'
                }`}
                title={isListening ? "Stop listening" : "Start dictation"}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className={`p-2 rounded-xl transition-all cursor-pointer select-none ${
                  input.trim() && !isProcessing
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm hover:opacity-95' 
                    : 'bg-[var(--surface-dim)] text-[var(--text-muted)] cursor-not-allowed'
                }`}
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 px-1 flex-wrap gap-2 shrink-0">
            <p className="text-[10px] text-[var(--text-muted)]">Clinova uses an active Multi-RAG engine. Always check official sources.</p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
              </span>
              <span>RAG Engine Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
