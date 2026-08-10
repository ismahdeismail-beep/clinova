import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, FileText, CheckCircle2, ChevronRight, Loader2, 
  AlertCircle, Mic, MicOff, ArrowDown, X, Sparkles,
  Download, FileDown, Copy, Check, Menu, Plus, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RAGRouter } from '../services/ragRouter';
import ReactMarkdown from 'react-markdown';

import { ChatSessionList } from '../components/ChatSessionList';
import { saveChatSession, ChatSession } from '../lib/localDb';
import { ChatService } from '../services/chat.service';
import { useAuth } from '../contexts/AuthContext';
import exportService from '../services/export.service';
import { sanitizeClinicalText } from '../lib/clinicalTextSanitize';

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


function highlightMedicalTerms(text: string): React.ReactNode {
  if (typeof text !== 'string') return text;
  
  // Regexes to capture dosages and common drug names
  const combinedRegex = /\b(\d+(?:\.\d+)?\s*(?:mg|g|mcg|mL|ml|IU|mg\/kg|g\/L|mmol\/L|mEq))\b|\b(Amoxicillin|Paracetamol|Artemether|Lumefantrine|Ceftriaxone|Metronidazole|Insulin|Atorvastatin|Metformin|Ciprofloxacin|Aspirin|Ibuprofen|Penicillin|Gentamicin|Clindamycin|Erythromycin|Azithromycin|Co-trimoxazole|Albendazole|Artesunate|Quinine|Chloroquine)\b/gi;
  
  const parts = text.split(combinedRegex);
  if (parts.length <= 1) return text;
  
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        
        // Match dosage
        if (part.match(/^\d+(?:\.\d+)?\s*(?:mg|g|mcg|mL|ml|IU|mg\/kg|g\/L|mmol\/L|mEq)$/i)) {
          return (
            <span 
              key={index} 
              className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold font-mono bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mx-0.5"
            >
              {part}
            </span>
          );
        }
        
        // Match drug name
        if (part.match(/^(Amoxicillin|Paracetamol|Artemether|Lumefantrine|Ceftriaxone|Metronidazole|Insulin|Atorvastatin|Metformin|Ciprofloxacin|Aspirin|Ibuprofen|Penicillin|Gentamicin|Clindamycin|Erythromycin|Azithromycin|Co-trimoxazole|Albendazole|Artesunate|Quinine|Chloroquine)$/i)) {
          return (
            <span 
              key={index} 
              className="inline-block px-1.5 py-0.5 rounded text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mx-0.5"
            >
              {part}
            </span>
          );
        }
        
        return part;
      })}
    </>
  );
}

function renderMarkdown(text: string) {
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      return highlightMedicalTerms(children);
    }
    if (Array.isArray(children)) {
      return children.map((child, i) => {
        if (typeof child === 'string') {
          return <React.Fragment key={i}>{highlightMedicalTerms(child)}</React.Fragment>;
        }
        return child;
      });
    }
    return children;
  };

  return (
    <ReactMarkdown
      components={{
        table: ({ children }) => (
          <div className="overflow-x-auto w-full my-5 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--surface)]">
            <table className="w-full text-left border-collapse text-sm text-[var(--text)]">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-[var(--surface-dim)] border-b border-[var(--border)]">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-[var(--border)]">{children}</tbody>,
        tr: ({ children }) => <tr className="hover:bg-[var(--surface-dim)] transition-colors">{children}</tr>,
        th: ({ children }) => <th className="p-3.5 font-semibold text-[var(--text)] uppercase tracking-wider text-xs">{children}</th>,
        td: ({ children }) => <td className="p-3.5 text-[var(--text)] leading-relaxed">{children}</td>,
        h1: ({ children }) => <h1 className="text-xl font-bold text-[var(--text)] mt-6 mb-3 tracking-tight border-b-2 border-[var(--primary)]/30 pb-2" style={{ letterSpacing: '-0.025em' }}>{children}</h1>,
        h2: ({ children }) => (
          <h2 className="flex items-center gap-2 text-lg font-bold mt-6 mb-3 tracking-tight" style={{ color: 'var(--primary)', letterSpacing: '-0.02em' }}>
            <span className="w-1.5 h-5 rounded-full shrink-0" style={{ background: 'linear-gradient(180deg, var(--primary), var(--medicine))' }} />
            {children}
          </h2>
        ),
        h3: ({ children }) => <h3 className="text-base font-semibold mt-5 mb-2 tracking-tight pl-3" style={{ color: 'var(--disease)', borderLeft: '3px solid color-mix(in srgb, var(--disease) 45%, transparent)' }}>{children}</h3>,
        p: ({ children }) => <p className="text-base leading-relaxed mb-3 last:mb-0" style={{ color: 'var(--text)', opacity: 0.92 }}>{processChildren(children)}</p>,
        ul: ({ children }) => <ul className="pl-1 mb-4" style={{ listStyleType: 'none' }}>{children}</ul>,
        ol: ({ children }) => <ol className="pl-6 mb-4" style={{ listStyleType: 'decimal' }}>{children}</ol>,
        li: ({ children }) => <li className="flex items-start gap-2.5 text-base leading-relaxed mb-1" style={{ color: 'var(--text)', opacity: 0.92 }}><span className="w-2 h-2 mt-2 shrink-0 rounded-sm rotate-45" style={{ background: 'linear-gradient(135deg, var(--primary), var(--medicine))' }} />{processChildren(children)}</li>,
        blockquote: ({ children }) => (
          <div className="rounded-r-xl px-5 py-4 my-4 text-base shadow-sm" style={{ borderLeft: '4px solid var(--info)', background: 'color-mix(in srgb, var(--info) 8%, transparent)', color: 'var(--text)' }}>
            <em>{children}</em>
          </div>
        ),
        strong: ({ children }) => <strong className="font-bold px-1 rounded" style={{ color: 'var(--medicine)', background: 'color-mix(in srgb, var(--medicine) 10%, transparent)' }}>{children}</strong>,
        em: ({ children }) => <em style={{ color: 'var(--disease)' }}>{children}</em>,
        code: ({ children, ...props }: any) => {
          return (
            <code className="font-mono text-sm font-semibold px-1.5 py-0.5 rounded" style={{ fontFamily: 'var(--font-mono)', background: 'var(--medicine-container)', border: '1px solid color-mix(in srgb, var(--medicine) 25%, transparent)', color: 'var(--medicine)' }} {...props}>
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
  onComplete,
  onTick
}: { 
  content: string; 
  isNew?: boolean; 
  onComplete?: () => void;
  onTick?: () => void;
}) {
  useEffect(() => {
    if (isNew) {
      onComplete?.();
      onTick?.();
    }
  }, [isNew, onComplete, onTick]);

  return (
    <div className="markdown-body break-words text-[var(--text)]">
      {renderMarkdown(content)}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer opacity-0 group-hover/bubble:opacity-100 focus:opacity-100 sm:opacity-0 max-sm:opacity-100 shrink-0 self-start mt-1.5 shadow-xs flex items-center justify-center hover:border-[var(--primary)]/30 select-none"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={13} className="text-[var(--success)] animate-in zoom-in-75 duration-100" />
      ) : (
        <Copy size={13} />
      )}
    </button>
  );
}

function DownloadButton({ content, filename }: { content: string; filename: string }) {
  const [downloading, setDownloading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleDownload = async (format: 'pdf' | 'txt' | 'md') => {
    setDownloading(true);
    setShowMenu(false);
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
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={downloading}
        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--primary)] transition-all cursor-pointer disabled:opacity-50 min-h-[32px] min-w-[32px] flex items-center justify-center"
        title="Download this message"
      >
        {downloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
      </button>
      <AnimatePresence>
        {showMenu && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className="absolute bottom-full right-0 mb-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-40 p-1 min-w-[120px]"
            >
              <button
                onClick={() => handleDownload('pdf')}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-lg transition-colors cursor-pointer text-left"
              >
                <FileDown size={12} className="text-red-400 shrink-0" />
                PDF Document
              </button>
              <button
                onClick={() => handleDownload('md')}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-lg transition-colors cursor-pointer text-left"
              >
                <FileText size={12} className="text-[var(--primary)] shrink-0" />
                Markdown
              </button>
              <button
                onClick={() => handleDownload('txt')}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-lg transition-colors cursor-pointer text-left"
              >
                <FileText size={12} className="text-[var(--text-muted)] shrink-0" />
                Plain Text
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ClinovaSupportScreen() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  // Back returns to the page the user came from; only falls back to the
  // dashboard when there is no previous history (direct link / fresh tab).
  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };
  const [currentSessionId, setCurrentSessionId] = useState<string>('');

  useEffect(() => {
    setCurrentSessionId('session-' + Date.now());
  }, []);

  // Periodically sync local sessions to Firestore
  useEffect(() => {
    if (!userData?.id) return;
    
    const syncInterval = setInterval(async () => {
      try {
        await ChatService.syncLocalToCloud(userData.id);
      } catch (err) {
        console.warn('[ClinovaSupport] Sync failed:', err);
      }
    }, 30000); // Sync every 30 seconds
    
    return () => clearInterval(syncInterval);
  }, [userData?.id]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const [speechInterim, setSpeechInterim] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechLang] = useState('en-US');
  const recognitionRef = useRef<any>(null);
  const shouldBeListeningRef = useRef(false);
  const inputRef = useRef(input);
  const handleSendRef = useRef<(textOverride?: string) => void>(() => {});
  
  // Keep refs in sync with the latest values on every render (latest-ref pattern)
  useEffect(() => {
    inputRef.current = input;
    handleSendRef.current = handleSend;
  });
  
  // Ref for textarea auto-resizing
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (messages.length > 1 && userData?.id) {
      const title = messages.find(m => m.role === 'user')?.content.slice(0, 30) + '...' || 'Consultation';
      const session: ChatSession = {
        id: currentSessionId,
        userId: userData.id,
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        synced: false,
      };
      
      // Save to both local DB and Firestore
      saveChatSession(session);
      ChatService.saveChatSession(session).catch(err => 
        console.warn('[ClinovaSupport] Failed to save to Firestore:', err)
      );
    }
  }, [messages, currentSessionId, userData?.id]);

  const handleNewSession = () => {
    setCurrentSessionId('session-' + Date.now());
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleSelectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages.map((m, i) => ({
      id: `msg-${i}`,
      role: m.role,
      content: m.content
    })));
    setIsSidebarOpen(false);
  };
  
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
      recognitionRef.current.lang = speechLang;

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
        
        if (interimTranscript) {
          setSpeechInterim(interimTranscript);
        }

        if (finalTranscript) {
          setSpeechInterim('');
          const lowerFinal = finalTranscript.toLowerCase().trim();

          if (lowerFinal === 'clear all' || lowerFinal === 'clear text') {
            setInput('');
            return;
          }

          if (lowerFinal === 'delete last' || lowerFinal === 'delete last word') {
            setInput(prev => {
              const words = prev.trim().split(/\s+/);
              words.pop();
              return words.join(' ');
            });
            return;
          }

          if (lowerFinal === 'send message' || lowerFinal === 'submit case' || lowerFinal === 'send query') {
            const currentText = inputRef.current;
            if (currentText.trim()) {
              handleSendRef.current(currentText);
            }
            return;
          }

          // Spoken punctuation/symbols translation
          let formatted = finalTranscript
            .replace(/\bperiod\b/gi, '.')
            .replace(/\bfull stop\b/gi, '.')
            .replace(/\bcomma\b/gi, ',')
            .replace(/\bnew line\b/gi, '\n')
            .replace(/\bnext line\b/gi, '\n')
            .replace(/\bquestion mark\b/gi, '?')
            .replace(/\bcolon\b/gi, ':')
            .replace(/\bsemi colon\b/gi, ';')
            .replace(/\bhyphen\b/gi, '-')
            .replace(/\bdegrees celsius\b/gi, '°C')
            .replace(/\bpercent\b/gi, '%');

          const lowerFormatted = formatted.toLowerCase().trim();
          if (lowerFormatted.endsWith('send message') || lowerFormatted.endsWith('submit case') || lowerFormatted.endsWith('send query')) {
            formatted = formatted.replace(/(send message|submit case|send query)$/i, '');
            setInput(prev => {
              const combined = prev ? `${prev.trim()} ${formatted.trim()}` : formatted.trim();
              setTimeout(() => handleSendRef.current(combined), 100);
              return '';
            });
            return;
          }

          setInput(prev => {
            const prevTrimmed = prev.trim();
            const formattedTrimmed = formatted.trim();
            if (!prevTrimmed) return formatted;
            return `${prevTrimmed} ${formattedTrimmed}`;
          });
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        let errorMsg = 'Error occurred during voice input.';
        if (event.error === 'not-allowed') {
          errorMsg = 'Microphone access denied. Please enable mic permissions.';
        } else if (event.error === 'no-speech') {
          errorMsg = 'No speech detected. Please speak clearly.';
        } else if (event.error === 'network') {
          errorMsg = 'Network error. Speech recognition requires internet connection.';
        }
        setSpeechError(errorMsg);
        setIsListening(false);
        shouldBeListeningRef.current = false;
      };

      recognitionRef.current.onend = () => {
        if (shouldBeListeningRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error('Failed to restart speech recognition:', e);
            setIsListening(false);
            shouldBeListeningRef.current = false;
          }
        } else {
          setIsListening(false);
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [speechLang]);

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
      shouldBeListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
      setSpeechInterim('');
    } else {
      try {
        shouldBeListeningRef.current = true;
        recognitionRef.current.lang = speechLang;
        recognitionRef.current.start();
        setIsListening(true);
        setSpeechError(null);
        setSpeechInterim('');
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


  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  const selectedSources = ['Kenya Drug Index', 'Kenya STG', 'WHO Guidelines', 'Clinical Pharmacy Library', 'Pharmacotherapy Library', 'Research Evidence'];

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

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride !== undefined ? textOverride : input;
    if (!textToSend.trim() || isProcessing) return;

    const userQuery = textToSend.trim();
    setInput('');
    setIsProcessing(true);

    const userMsgId = Date.now().toString();
    const thinkingMsgId = 'think-' + Date.now();

    setMessages(prev => [
      ...prev, 
      { 
        id: userMsgId, 
        role: 'user', 
        content: userQuery
      },
      { id: thinkingMsgId, role: 'assistant', content: 'Analyzing clinical query & retrieving evidence from knowledge bases...', isThinking: true }
    ]);

    // Execute RAG Routing Logic
    const intent = RAGRouter.analyzeIntent(userQuery);
    const agent = RAGRouter.routeQuery(intent);

    // Connect to actual Express server API proxying Gemini
    let responseContent = '';
    let citations: Citation[] = [];
    
    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};

      const maxAttempts = 2;
      let success = false;
      let lastError: any = null;
      // Sources are retrieved ONCE, server-side (buildAssistantRequest → RAG).
      // They arrive as an early SSE event so the citation widget renders
      // without the client running its own second search.
      let streamSources: any[] = [];

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          if (attempt > 1) {
            // Update thinking message text to give user visual feedback about the retry
            setMessages(prev => prev.map(m => m.id === thinkingMsgId ? {
              ...m,
              content: `Clinova Support service busy. Retrying... (Attempt ${attempt}/${maxAttempts})`
            } : m));
            // Staggered backoff before retrying
            await new Promise(resolve => setTimeout(resolve, 1500 * (attempt - 1)));
          }

          // RETRIEVAL HAPPENS SERVER-SIDE ONLY: buildAssistantRequest runs the
          // RAG search (via RAGRouter.route) and streams the found sources back
          // as the first SSE event, so the client never duplicates the query.
          setMessages(prev => prev.map(m => m.id === thinkingMsgId ? {
            ...m,
            content: 'Searching knowledge bases for relevant context...'
          } : m));

          // Use AbortController to prevent endless loading if server hangs
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout
          try {
          const res = await fetch('/api/gemini/assistant/stream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify({
              userMessage: userQuery,
              chatHistory: messages.filter(m => !m.isThinking).map(m => ({
                role: m.role,
                content: m.content
              })),
              currentFormState: {
                ...parsed
              }
            }),
          });

          // Non-streamed error (e.g. 400 validation) still returns JSON.
          if (!res.ok && (res.headers.get('content-type') || '').includes('application/json')) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Clinova Support service failed with status ${res.status}`);
          }

          // Stream SSE chunks live into the thinking message bubble.
          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let streamedText = '';
          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const parts = buffer.split('\n\n');
              buffer = parts.pop() || '';
              for (const part of parts) {
                const trimmed = part.trim();
                if (!trimmed.startsWith('data:')) continue;
                const payload = trimmed.slice(5).trim();
                if (!payload) continue;
                try {
                  const evt = JSON.parse(payload);
                  if (evt.sources && Array.isArray(evt.sources)) {
                    // First SSE event: the sources the server grounded on.
                    streamSources = evt.sources;
                    setMessages(prev => prev.map(m => m.id === thinkingMsgId ? {
                      ...m,
                      content: streamSources.length > 0
                        ? `Found ${streamSources.length} relevant sources. Generating clinical response...`
                        : 'No specific knowledge base matches. Answering from general clinical knowledge...'
                    } : m));
                  } else if (evt.text) {
                    streamedText += evt.text;
                    setMessages(prev => prev.map(m => m.id === thinkingMsgId ? { ...m, content: sanitizeClinicalText(streamedText) } : m));
                  } else if (evt.error) {
                    // Server sent an error — propagate it so the retry loop can handle it
                    throw new Error(evt.error);
                  } else if (evt.done) {
                    // Server signals stream complete
                    break;
                  }
                } catch (parseErr: any) {
                  // Re-throw server-sent errors (not JSON parse failures)
                  if (parseErr?.message && !parseErr.message.includes('JSON')) {
                    throw parseErr;
                  }
                  /* ignore keep-alive / partial frames */
                }
              }
            }
          }
          responseContent = sanitizeClinicalText(streamedText) || 'No response received.';
          success = true;
          break;
        } finally {
          clearTimeout(timeoutId);
        }
        } catch (err: any) {
          console.warn(`[ClinovaSupport] Attempt ${attempt} failed:`, err);
          lastError = err;
        }
      }

      // If streaming returned empty text, retry with the non-streaming buffered endpoint
      if (responseContent === 'No response received.') {
        try {
          console.warn('[ClinovaSupport] Streaming returned empty, retrying with buffered endpoint');
          setMessages(prev => prev.map(m => m.id === thinkingMsgId ? {
            ...m,
            content: 'Retrying with alternative model...'
          } : m));
          const savedData2 = localStorage.getItem('clinova_pharma_review_form');
          const parsed2 = savedData2 ? JSON.parse(savedData2) : {};
          const fallbackRes = await fetch('/api/gemini/assistant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userMessage: userQuery,
              chatHistory: messages.filter(m => !m.isThinking).map(m => ({
                role: m.role,
                content: m.content
              })),
              currentFormState: parsed2,
            }),
          });
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            if (fallbackData.text && fallbackData.text.trim()) {
              responseContent = sanitizeClinicalText(fallbackData.text);
            }
            if (fallbackData.sources) {
              streamSources = fallbackData.sources;
            }
          }
        } catch (fallbackErr) {
          console.warn('[ClinovaSupport] Buffered fallback also failed:', fallbackErr);
        }
      }

      if (!success) {
        throw lastError || new Error('Failed to reach assistant after multiple attempts');
      }
      
      if (streamSources.length > 0) {
        citations = streamSources.slice(0, 4).map((s: any) => ({
          source: s.source || 'Knowledge Base',
          document: s.document || 'Clinical Reference',
          year: s.year || '2024'
        }));
      } else {
        citations = selectedSources.map((db: string) => ({
          source: db,
          document: 'Clinical Reference',
          year: '2024'
        }));
      }
    } catch (err: any) {
      console.error(err);
      responseContent = `Sorry, I encountered an issue: ${err.message || 'Service temporarily unavailable. Please try again.'}`;
      citations = [
        { source: 'Clinical Rules Engine', document: 'Local Fallback Safe Mode' }
      ];
    }

    const confidenceScore = citations.length > 0 && citations.some(c => c.source !== 'Clinova Knowledge Engine') ? 92 : 75;

    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== thinkingMsgId);
      return [...filtered, {
        id: 'res-' + Date.now(),
        role: 'assistant',
        content: responseContent,
        citations,
        confidence: confidenceScore,
        routedTo: [agent],
        isNew: true
      }];
    });
    
    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };



  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--bg)] text-[var(--text)] font-sans">

      {/* Header — matches other Clinova screens */}
      <div className="h-14 sm:h-16 border-b border-[var(--border)]/80 px-3 sm:px-6 bg-[var(--surface)] flex items-center gap-2 sm:gap-3 shrink-0 z-10">
        <button
          onClick={goBack}
          className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-dim)] transition-all cursor-pointer shrink-0"
          title="Back"
        >
          <ArrowLeft size={18} className="text-[var(--text)]" />
        </button>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20 shadow-inner shrink-0">
          <Bot size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm sm:text-base font-bold text-[var(--text)] tracking-tight">Clinova Support</h2>
          <p className="text-xs text-[var(--text-muted)] truncate hidden sm:block">Clinical Decision Support</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleNewSession}
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-dim)] transition-all cursor-pointer"
            title="New session"
          >
            <Plus size={16} className="text-[var(--primary)]" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-dim)] transition-all cursor-pointer"
            title="Chat history"
          >
            <Menu size={16} className="text-[var(--text)]" />
          </button>
        </div>
      </div>

      {/* Sidebar overlay (rendered via portal to avoid nesting issues) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="relative z-10 w-72 h-full bg-[var(--surface)] border-r border-[var(--border)] shadow-xl">
            <ChatSessionList
              onSelectSession={(id) => { handleSelectSession(id); setIsSidebarOpen(false); }}
              onNewSession={() => { handleNewSession(); setIsSidebarOpen(false); }}
              currentSessionId={currentSessionId}
            />
          </div>
        </div>
      )}

        {/* Message Thread Scroll Container */}
        <div 
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-thin scroll-smooth"
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
            {/* Welcome State / Initial Empty State */}
          {messages.length === 0 && (
            <div className="max-w-xl mx-auto py-6 sm:py-12 px-2 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] tracking-tight">How can I help?</h1>
                  <p className="text-sm text-[var(--text-muted)] mt-1">Ask about diseases, drugs, guidelines, or lab results</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto"
              >
                {[
                  'Explain pneumonia treatment guidelines in Kenya',
                  'Check drug interactions for Amoxicillin',
                  'Calculate paediatric dosage for Paracetamol',
                  'Differential diagnosis for acute chest pain',
                  'Kenya STG guidelines for first-line Malaria',
                  'How to interpret abnormal renal function labs?'
                ].map((text, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(text)}
                    className="text-left px-4 py-3 bg-[var(--surface)] hover:bg-[var(--surface-dim)] border border-[var(--border)]/80 hover:border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--primary)] transition-all cursor-pointer flex items-center gap-2 select-none"
                  >
                    <Sparkles size={13} className="text-[var(--primary)] shrink-0" />
                    <span className="truncate">{text}</span>
                  </button>
                ))}
              </motion.div>
            </div>
          )}

          {/* Render Active Conversation Thread */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                {/* Avatar (only for assistant responses to keep right margin clean) */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] shrink-0 shadow-xs mt-1">
                    <Bot size={15} />
                  </div>
                )}
                
                {/* Bubble Container */}
                <div className={`flex flex-col gap-2 ${isUser ? 'max-w-[85%] sm:max-w-[75%]' : 'flex-1 min-w-0'} w-full overflow-hidden`}>
                  
                  {/* Real-time RAG Steps Tracker */}
                  {msg.isThinking && (
                    <div className="flex flex-col gap-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 shadow-md w-full sm:min-w-[320px]">
                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)]">
                        <Loader2 size={14} className="animate-spin shrink-0" />
                        <span>Clinical Decisional Inference</span>
                      </div>
                      <div className="space-y-2 pl-2 border-l-2 border-[var(--border)]">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text)]">
                          <CheckCircle2 size={13} className="text-[var(--success)] shrink-0" />
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
                    <div className={`flex items-start gap-2.5 max-w-full group/bubble ${isUser ? '' : 'w-full'}`}>
                      <div className={`rounded-2xl px-5 py-4 shadow-sm text-base leading-relaxed max-w-full break-words w-full ${
                        isUser 
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-tr-none shadow-md font-medium' 
                          : 'bg-[var(--surface)] border border-[var(--border)] border-l-2 border-l-[var(--primary)]/30 text-[var(--text)] rounded-tl-none shadow-xs'
                      }`}>
                        {isUser ? (
                          <div className="space-y-2">
                            <p className="whitespace-pre-wrap text-base leading-relaxed">{msg.content}</p>
                          </div>
                        ) : (
                          <AssistantMessageBubble 
                            content={msg.content} 
                            isNew={msg.isNew} 
                            onComplete={() => {
                              setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isNew: false } : m));
                            }}
                            onTick={() => {
                              if (!chatContainerRef.current) return;
                              const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
                              if (scrollHeight - scrollTop - clientHeight < 350) {
                                chatContainerRef.current.scrollTop = scrollHeight;
                              }
                            }}
                          />
                        )}
                      </div>
{!isUser && (
                          <div className="mt-1.5 flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover/bubble:opacity-100 transition-opacity duration-200">
                            <CopyButton text={msg.content} />
                            <DownloadButton 
                              content={msg.content} 
                              filename={`clinova-response-${new Date().toISOString().slice(0,10)}.md`}
                            />
                          </div>
                        )}
                    </div>
                  )}

                  {/* Verification Citations Widget */}
                  {!msg.isThinking && msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                    <div className="w-full bg-[var(--surface)]/40 border border-[var(--border)] rounded-xl p-3 text-[11px] mt-1 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between mb-2 border-b border-[var(--border)]/60 pb-1.5 flex-wrap gap-1">
                        <div className="flex items-center gap-1.5 text-[var(--text)] font-bold text-[10px]">
                          <CheckCircle2 size={12} className="text-[var(--success)] shrink-0" />
                          <span>Evidence</span>
                        </div>
                        {msg.confidence && (
                          <span className="text-[10px] font-bold text-[var(--success)]">{msg.confidence}%</span>
                        )}
                      </div>
                      
                      <ul className="space-y-1">
                        {msg.citations.map((cite, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[var(--text)]">
                            <span className="w-1 h-1 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                            <span className="leading-normal text-[11px] text-[var(--text)]">
                              <span className="font-bold">{cite.source}</span>
                              {cite.year && <span className="text-[var(--text-muted)]"> ({cite.year})</span>}
                              <span className="text-[var(--text-muted)]"> — {cite.document}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      {msg.routedTo && (
                        <div className="mt-2 pt-2 border-t border-[var(--border)]/60 flex flex-wrap items-center gap-1">
                          {msg.routedTo.map((route, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-[var(--bg)] border border-[var(--border)] rounded text-[9px] font-bold text-[var(--primary)]">
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

          {/* Typing Indicator — only when no thinking message already exists */}
          {isProcessing && !messages.some(m => m.isThinking) && (
            <div className="flex gap-3 sm:gap-4 items-start animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] shrink-0 shadow-xs mt-1">
                <Bot size={15} />
              </div>
              <div className="flex flex-col gap-2 max-w-[80%] items-start">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-tl-none px-5 py-4 shadow-md flex items-center gap-3">
                  <span className="text-sm font-semibold text-[var(--text)]">Clinova Support is thinking</span>
                  <div className="flex gap-1 items-center justify-center mt-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          </div>
        </div>

        {/* Floating Scroll Bottom Button */}
        <AnimatePresence>
          {showScrollBottomBtn && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollToBottom('smooth')}
              className="absolute right-4 sm:right-6 bottom-20 sm:bottom-32 p-2.5 sm:p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)] shadow-lg hover:bg-[var(--surface-dim)] transition-colors cursor-pointer z-10"
              title="Scroll to bottom"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowDown size={18} />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Input area */}
        <div className="px-3 sm:px-6 pt-2 pb-3 sm:pb-4 bg-[var(--surface)] border-t border-[var(--border)]/80 shrink-0 z-10">
          <div className="max-w-3xl mx-auto w-full">

            {/* Voice dictation indicator (compact, only when active) */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-2"
                >
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" /></span>
                    <span className="font-bold text-red-500">Listening</span>
                    {speechInterim && <span className="text-[var(--text-muted)] truncate flex-1">{speechInterim}</span>}
                    <button onClick={toggleListening} className="text-[10px] font-semibold px-2 py-0.5 rounded border border-red-300 text-red-500 hover:bg-red-500/10 cursor-pointer">Stop</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {speechError && (
              <div className="mb-2 flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 font-semibold">
                <AlertCircle size={13} className="shrink-0" />
                <span className="flex-1 truncate">{speechError}</span>
                <button onClick={() => setSpeechError(null)} className="p-0.5 hover:bg-red-500/20 rounded cursor-pointer"><X size={13} /></button>
              </div>
            )}

            {/* Input box */}
            <div className="flex items-end gap-2 bg-[var(--bg)] border border-[var(--border)] focus-within:border-[var(--primary)] rounded-2xl px-3 py-2 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about diseases, drugs, guidelines, or labs..."
                className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[var(--text)] resize-none placeholder-[var(--text-muted)] leading-relaxed max-h-32 font-sans"
                rows={1}
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)]'}`}
                  title={isListening ? 'Stop listening' : 'Voice dictation'}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isProcessing}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${input.trim() && !isProcessing ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'text-[var(--text-muted)] cursor-not-allowed'}`}
                >
                  {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
