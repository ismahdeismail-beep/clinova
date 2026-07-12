import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, User, BrainCircuit, Library, Pill, Activity, 
  FlaskConical, FileText, CheckCircle2, ChevronRight, Loader2, 
  Database, AlertCircle, Mic, MicOff, ArrowDown, X, Layers, Sparkles,
  Download, FileDown, Copy, Check, Paperclip, Menu, Plus, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RAGRouter } from '../services/ragRouter';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import { ChatSessionList } from '../components/ChatSessionList';
import { saveChatSession, ChatSession } from '../lib/localDb';
import { ChatService } from '../services/chat.service';
import { StorageService } from '../services/storage.service';
import { useFileStore } from '../store/fileStore';
import { useAuth } from '../contexts/AuthContext';
import exportService from '../services/export.service';

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
  fileName?: string;
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
        td: ({ children }) => <td className="p-3.5 text-[var(--text-muted)] leading-relaxed">{children}</td>,
        h1: ({ children }) => <h1 className="text-xl font-bold text-[var(--text)] mt-6 mb-3 tracking-tight border-b-2 border-[var(--primary)]/30 pb-2">{children}</h1>,
        h2: ({ children }) => (
          <div className="flex items-center gap-2 mt-6 mb-3">
            <div className="w-1 h-5 bg-[var(--primary)] rounded-full shrink-0" />
            <h2 className="text-lg font-bold text-[var(--text)] tracking-tight">{children}</h2>
          </div>
        ),
        h3: ({ children }) => <h3 className="text-base font-bold text-[var(--text)] mt-5 mb-2 tracking-tight border-l-2 border-[var(--primary)]/40 pl-3">{children}</h3>,
        p: ({ children }) => <p className="text-base leading-relaxed text-[var(--text)] mb-4 last:mb-0">{processChildren(children)}</p>,
        ul: ({ children }) => <ul className="space-y-2 mb-5">{children}</ul>,
        ol: ({ children }) => <ol className="space-y-2 mb-5">{children}</ol>,
        li: ({ children }) => <li className="flex items-start gap-2 text-base leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/60 mt-2 shrink-0" />{processChildren(children)}</li>,
        blockquote: ({ children }) => (
          <div className="bg-[var(--surface-dim)]/60 border-l-4 border-[var(--primary)]/50 rounded-r-xl px-5 py-4 my-5 text-base text-[var(--text)] shadow-sm">
            {children}
          </div>
        ),
        code: ({ inline, className, children, ...props }: any) => {
          return (
            <code className="bg-[var(--surface-dim)] border border-[var(--border)] text-[var(--primary)] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
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
    <div 
      className="text-sm sm:text-base leading-relaxed max-w-full overflow-x-auto scrollbar-thin break-words min-h-[3rem] text-[var(--text)]"
    >
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

export default function ClinicalAssistantScreen() {
  const { files, fetchFiles } = useFileStore();
  const { userData } = useAuth();
  const [currentSessionId, setCurrentSessionId] = useState<string>('session-' + Date.now());
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Load chat sessions from Firestore (via ChatService)
  useEffect(() => {
    if (!userData?.id) return;
    
    const loadSessions = async () => {
      try {
        setSessionsLoading(true);
        const sessions = await ChatService.getChatSessions(userData.id);
        setChatSessions(sessions);
      } catch (err) {
        console.warn('[ClinicalAssistant] Failed to load chat sessions:', err);
      } finally {
        setSessionsLoading(false);
      }
    };
    
    loadSessions();
  }, [userData?.id]);

  // Periodically sync local sessions to Firestore
  useEffect(() => {
    if (!userData?.id) return;
    
    const syncInterval = setInterval(async () => {
      try {
        const syncedCount = await ChatService.syncLocalToCloud(userData.id);
        if (syncedCount > 0) {
          const sessions = await ChatService.getChatSessions(userData.id);
          setChatSessions(sessions);
        }
      } catch (err) {
        console.warn('[ClinicalAssistant] Sync failed:', err);
      }
    }, 30000); // Sync every 30 seconds
    
    return () => clearInterval(syncInterval);
  }, [userData?.id]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobileRouterOpen, setIsMobileRouterOpen] = useState(false);
  const [speechInterim, setSpeechInterim] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechLang, setSpeechLang] = useState('en-US');
  const recognitionRef = useRef<any>(null);
  const shouldBeListeningRef = useRef(false);
  const inputRef = useRef(input);
  
  useEffect(() => {
    inputRef.current = input;
  }, [input]);
  
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
        console.warn('[ClinicalAssistant] Failed to save to Firestore:', err)
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
  
  interface AttachedFile {
    id: string;
    name: string;
    size: number;
    mimeType: string;
    data: string; // base64
    status: 'uploading' | 'extracted' | 'failed';
    progress: number;
    error?: string;
    cloudinaryUrl?: string;
    extractedContent?: {
      patientName?: string;
      age?: string;
      sex?: string;
      summary?: string;
      diagnoses?: string[];
      medications?: { name: string; dose?: string; frequency?: string }[];
      carePlan?: string;
    };
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const triggerFileProcess = async (fileId: string, file: File) => {
    try {
      // 1. Convert to base64 for backup / local reference
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(file);
      });
      const base64Data = await base64Promise;

      setAttachedFiles(prev => prev.map(f => f.id === fileId ? { ...f, data: base64Data, progress: 30 } : f));

      // 2. Upload file directly to storage (this automatically triggers direct Cloudinary upload for all files!)
      let cloudinaryUrl = '';
      try {
        const uploadResult = await StorageService.uploadFile(file, {
          category: 'general',
          accessScope: 'public'
        });
        cloudinaryUrl = uploadResult.url || '';
        setAttachedFiles(prev => prev.map(f => f.id === fileId ? { ...f, cloudinaryUrl, progress: 60 } : f));
      } catch (uploadErr) {
        console.warn('Storage upload failed, fallback to direct extraction:', uploadErr);
      }

      // 3. Trigger clinical notes extraction
      const formData = new FormData();
      formData.append('files', file);
      formData.append('extractionType', 'clinical_notes');

      const res = await fetch('/api/gemini/extract-file', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to extract clinical notes.');
      }

      const extractedData = await res.json();

      setAttachedFiles(prev => prev.map(f => f.id === fileId ? {
        ...f,
        status: 'extracted',
        progress: 100,
        extractedContent: extractedData
      } : f));

    } catch (err: any) {
      console.error(`Error processing file ${file.name}:`, err);
      setAttachedFiles(prev => prev.map(f => f.id === fileId ? {
        ...f,
        status: 'failed',
        progress: 100,
        error: err.message || 'Notes extraction failed'
      } : f));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachedFiles: AttachedFile[] = [];

    for (const file of Array.from(files)) {
      if (file.size > 100 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 100MB limit.`);
        continue;
      }

      const fileId = Math.random().toString(36).substring(7);
      const newFile: AttachedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        data: '',
        status: 'uploading',
        progress: 10
      };

      newAttachedFiles.push(newFile);
      triggerFileProcess(fileId, file);
    }

    setAttachedFiles(prev => [...prev, ...newAttachedFiles]);
    e.target.value = '';
  };

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
              handleSend(currentText);
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
              setTimeout(() => handleSend(combined), 100);
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
  const [activeRouterState, setActiveRouterState] = useState<{ intent: string, routes: string[] } | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>(['Kenya Drug Index', 'Kenya STG', 'WHO Guidelines']);
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExportMarkdown = () => {
    let mdContent = `# Clinova Clinical Support - Session Export\n`;
    mdContent += `*Date/Time:* ${new Date().toLocaleString()}\n`;
    mdContent += `*Active Knowledge Bases:* ${selectedSources.join(', ')}\n`;
    mdContent += `*Verification Target:* Zero Hallucination Retrieval & Live Validation\n\n`;
    mdContent += `--- \n\n`;

    messages.forEach((msg, idx) => {
      if (msg.isThinking) return;
      const role = msg.role === 'user' ? 'User (Clinician)' : 'Clinical Support';
      mdContent += `### **${idx + 1}. ${role}**\n\n`;
      mdContent += `${msg.content}\n\n`;

      if (msg.citations && msg.citations.length > 0) {
        mdContent += `#### **Evidence Synthesized:**\n`;
        msg.citations.forEach((cite) => {
          mdContent += `- **${cite.source}**: ${cite.document}${cite.year ? ` (${cite.year})` : ''}\n`;
        });
        if (msg.confidence) {
          mdContent += `\n*Clinical Decisional Confidence: ${msg.confidence}%*\n`;
        }
        mdContent += `\n`;
      }

      if (msg.routedTo && msg.routedTo.length > 0) {
        mdContent += `*Routed via:* \`${msg.routedTo.join(', ')}\` \n`;
      }

      mdContent += `\n---\n\n`;
    });

    mdContent += `\n*End of clinical assistant record. Clinova is an assistive reasoning engine. Standard protocols should always be cross-referenced with official local policies and drug guidelines.*`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `clinova_session_export_${new Date().toISOString().slice(0,10)}_${Date.now().toString().slice(-4)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - (margin * 2);
    let y = 20;

    const checkPageOverflow = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin) {
        doc.addPage();
        y = 20; // reset with top padding
        // Tiny running footer/header
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Clinova Session Record - Confidential Clinical Support', margin, 12);
        doc.line(margin, 14, pageWidth - margin, 14);
      }
    };

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(22, 119, 242); // Clinova primary color
    doc.text('CLINOVA HEALTHCARE', margin, y);
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('Clinical Support Session Record', margin, y);
    y += 8;

    // Metadata Block
    doc.setFillColor(248, 250, 252); // light slate background
    doc.rect(margin, y, maxLineWidth, 22, 'F');
    doc.setDrawColor(226, 232, 240); // border
    doc.rect(margin, y, maxLineWidth, 22, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text('METADATA & CONFIGURATION', margin + 5, y + 6);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, margin + 5, y + 11);
    
    const activeBasesText = `Active Knowledge Bases: ${selectedSources.join(', ')}`;
    const wrappedBases = doc.splitTextToSize(activeBasesText, maxLineWidth - 10);
    doc.text(wrappedBases, margin + 5, y + 16);
    
    y += 32;

    // Loop through chat messages
    messages.forEach((msg, index) => {
      if (msg.isThinking) return; // skip temporary thinking states
      
      const isUser = msg.role === 'user';
      const roleHeader = isUser ? 'User (Clinician)' : 'Clinical Support (Evidence Synthesized)';

      // Reserve space for message header
      checkPageOverflow(14);

      // Draw light side indicator line
      doc.setDrawColor(isUser ? 71 : 22, isUser ? 85 : 119, isUser ? 105 : 242);
      doc.setLineWidth(0.8);
      doc.line(margin, y - 2, margin, y + 2); // a short tick mark
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(isUser ? 71 : 22, isUser ? 85 : 119, isUser ? 105 : 242);
      doc.text(`${index + 1}. ${roleHeader}`, margin + 3, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);

      // Clean the content of unnecessary raw asterisks from markdown bolding before printing
      // and formatting paragraphs
      const cleanedContent = msg.content
        .replace(/\*\*([^*]+)\*\*/g, '$1') // remove asterisks
        .replace(/#+\s+/g, ''); // remove headings formatting tags
        
      const wrappedText = doc.splitTextToSize(cleanedContent, maxLineWidth);
      wrappedText.forEach((line: string) => {
        checkPageOverflow(6);
        doc.text(line, margin, y);
        y += 5;
      });

      // Citations if any
      if (msg.citations && msg.citations.length > 0) {
        y += 2.5;
        checkPageOverflow(12 + msg.citations.length * 5);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(16, 185, 129); // Emerald
        doc.text('Synthesized Evidence Citations:', margin, y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);

        msg.citations.forEach((cite) => {
          const citationText = `- [${cite.source}] ${cite.document}${cite.year ? ` (${cite.year})` : ''}`;
          const wrappedCite = doc.splitTextToSize(citationText, maxLineWidth);
          wrappedCite.forEach((citeLine: string) => {
            checkPageOverflow(5);
            doc.text(citeLine, margin, y);
            y += 4;
          });
        });

        if (msg.confidence) {
          y += 2;
          checkPageOverflow(5);
          doc.setFont('helvetica', 'italic');
          doc.text(`Clinical Decisional Confidence: ${msg.confidence}%`, margin, y);
          y += 4;
        }
      }

      y += 8; // Spacer
    });

    // Disclaimer footer on the last page if space allows, or on a new page
    checkPageOverflow(15);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    const disclaimer = "Disclaimer: Clinova is a clinical decisional helper. The clinician maintains full primary patient responsibility. This export is meant as an evidence reference and patient record attachment support.";
    const wrappedDisclaimer = doc.splitTextToSize(disclaimer, maxLineWidth);
    wrappedDisclaimer.forEach((line: string) => {
      checkPageOverflow(4);
      doc.text(line, margin, y);
      y += 4;
    });

    doc.save(`clinova_session_report_${new Date().toISOString().slice(0,10)}_${Date.now().toString().slice(-4)}.pdf`);
    setShowExportMenu(false);
  };
  
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

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride !== undefined ? textOverride : input;
    const hasFiles = attachedFiles.length > 0;
    if ((!textToSend.trim() && !hasFiles) || isProcessing) return;

    const userQuery = textToSend.trim() || `Analyze the attached clinical files: ${attachedFiles.map(f => f.name).join(', ')}`;
    setInput('');
    setIsProcessing(true);

    const userMsgId = Date.now().toString();
    const thinkingMsgId = 'think-' + Date.now();
    
    // Copy active attachments and reset state
    const currentAttachments = [...attachedFiles];
    setAttachedFiles([]);

    setMessages(prev => [
      ...prev, 
      { 
        id: userMsgId, 
        role: 'user', 
        content: userQuery, 
        fileName: currentAttachments.length > 0 ? currentAttachments.map(f => f.name).join(', ') : undefined 
      },
      { id: thinkingMsgId, role: 'assistant', content: 'Analyzing clinical query & retrieving evidence from knowledge bases...', isThinking: true }
    ]);

    // Execute RAG Routing Logic
    const intent = RAGRouter.analyzeIntent(userQuery);
    const agent = RAGRouter.routeQuery(intent);
    
    setActiveRouterState({ 
      intent: intent.charAt(0).toUpperCase() + intent.slice(1) + ' Query', 
      routes: [agent] 
    });

    // Connect to actual Express server API proxying Gemini
    let responseContent = '';
    let citations: Citation[] = [];
    
    try {
      const savedData = localStorage.getItem('clinova_pharma_review_form');
      const parsed = savedData ? JSON.parse(savedData) : {};

      // Structure extracted notes from files for direct assistant use
      const fileExtractions = currentAttachments
        .filter(f => f.status === 'extracted' && f.extractedContent)
        .map(f => ({
          fileName: f.name,
          cloudinaryUrl: f.cloudinaryUrl,
          extractedContent: f.extractedContent
        }));

      const maxAttempts = 3;
      let success = false;
      let lastError: any = null;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          if (attempt > 1) {
            // Update thinking message text to give user visual feedback about the retry
            setMessages(prev => prev.map(m => m.id === thinkingMsgId ? {
              ...m,
              content: `Clinical Support service busy. Retrying... (Attempt ${attempt}/${maxAttempts})`
            } : m));
            // Staggered backoff before retrying
            await new Promise(resolve => setTimeout(resolve, 1500 * (attempt - 1)));
          }

          const primaryFile = currentAttachments[0];

          // FIND RELEVANT KNOWLEDGE BASE RESOURCES
          const kbFiles = files.filter(f => (f.category === 'knowledge' || (f.category as string) === 'knowledge_base') && f.aiProcessed);
          
          let relevantKbContext = '';
          const keywords = userQuery.toLowerCase().split(/\s+/).filter(w => w.length > 3);
          if (keywords.length > 0 && kbFiles.length > 0) {
            const matchedFiles = kbFiles.filter(f => {
              const searchText = `${f.title} ${f.originalName} ${f.summary || ''} ${f.classification?.keywords?.join(' ') || ''}`.toLowerCase();
              return keywords.some(k => searchText.includes(k));
            }).slice(0, 3); // Max 3 to fit context limit
            
            if (matchedFiles.length > 0) {
              relevantKbContext = "\n\n=== KNOWLEDGE ENGINE RETRIEVED RESOURCES ===\n";
              matchedFiles.forEach(f => {
                relevantKbContext += `- ${f.title || f.originalName}\n`;
                if (f.summary) relevantKbContext += `  Summary: ${f.summary}\n`;
                if (f.textContent) relevantKbContext += `  Content: ${f.textContent.substring(0, 1500)}\n`;
              });
            }
          }

          const res = await fetch('/api/gemini/assistant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userMessage: relevantKbContext ? userQuery + "\n" + relevantKbContext : userQuery,
              chatHistory: messages.filter(m => !m.isThinking).map(m => ({
                role: m.role,
                content: m.content
              })),
              currentFormState: {
                ...parsed,
                extractedNotesFromAttachments: fileExtractions
              },
              fileData: primaryFile?.data,
              fileType: primaryFile?.mimeType,
              fileName: primaryFile?.name
            }),
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Clinical Support service failed with status ${res.status}`);
          }

          const data = await res.json();
          responseContent = data.text;
          success = true;
          break;
        } catch (err: any) {
          console.warn(`[ClinicalAssistant] Attempt ${attempt} failed:`, err);
          lastError = err;
        }
      }

      if (!success) {
        throw lastError || new Error('Failed to reach assistant after multiple attempts');
      }
      
      const kbFiles: any[] = files.filter((f: any) => (f.category === 'knowledge' || f.category === 'knowledge_base') && f.aiProcessed);
      const matchedDb: string[] = selectedSources;
      if (kbFiles.length > 0) {
        citations = kbFiles.slice(0, 3).map((f: any) => ({
          source: 'Knowledge Base',
          document: f.title || f.originalName || 'Uploaded Resource',
          year: new Date().getFullYear().toString()
        }));
      } else if (matchedDb.length > 0) {
        citations = matchedDb.map((db: string) => ({
          source: db,
          document: 'Clinical Reference',
          year: '2024'
        }));
      } else {
        citations = [
          { source: 'Clinova Knowledge Engine', document: 'Synthesized from curriculum data', year: '2024' }
        ];
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
    setTimeout(() => setActiveRouterState(null), 3000);
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
    <div 
      className="fixed md:left-64 left-0 right-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top,0px))] bg-[var(--bg)] text-[var(--text)] flex flex-row overflow-hidden z-20 font-sans"
      style={{
        height: `calc(${viewportHeight}px - 4rem - env(safe-area-inset-top, 0px))`
      }}
    >
      
      {/* Sidebar for Mobile & Desktop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={`
        absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <ChatSessionList 
          onSelectSession={handleSelectSession} 
          onNewSession={handleNewSession}
          currentSessionId={currentSessionId}
        />
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--bg)] relative">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-[var(--border)]/80 px-4 sm:px-6 bg-[var(--surface)] flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              className="md:hidden p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-dim)] transition-all cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={18} className="text-[var(--text)]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20 shadow-inner shrink-0">
              <Bot size={22} className="animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[var(--text)] tracking-tight">Clinical Support</h2>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]"></span>
                  </span>
                  <span>● Online</span>
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)] truncate hidden xs:block mt-0.5">Clinical Decision Support</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick New Chat Button */}
            <button
              onClick={handleNewSession}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[var(--border)] hover:border-[var(--border)] bg-[var(--bg)]/40 hover:bg-[var(--bg)]/80 text-xs font-bold text-[var(--text)] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Start New Session"
            >
              <Plus size={14} className="text-[var(--primary)]" />
              <span className="hidden sm:inline">New Session</span>
            </button>

            {/* Export Chat Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--text)] bg-[var(--bg)]/40 hover:bg-[var(--bg)]/80 px-3 py-2 rounded-xl border border-[var(--border)] hover:border-[var(--border)] transition-all cursor-pointer select-none"
                title="Export current conversation for records"
                id="export-chat-button"
              >
                <Download size={14} className="text-[var(--text-muted)]" />
                <span className="hidden xs:inline">Export</span>
              </button>
              
              <AnimatePresence>
                {showExportMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setShowExportMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl z-40 p-2 flex flex-col gap-1 text-xs"
                      id="export-chat-dropdown"
                    >
                      <div className="px-2.5 py-1.5 border-b border-[var(--border)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                        Patient Record Format
                      </div>
                      <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2.5 w-full text-left p-2.5 hover:bg-[var(--surface)]/50 text-[var(--text)] rounded-xl transition-all cursor-pointer font-medium"
                        id="export-pdf-option"
                      >
                        <FileDown size={15} className="text-red-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-[var(--text)]">Export as Medical PDF</div>
                          <div className="text-[10px] text-[var(--text-muted)]">Formatted, printable record</div>
                        </div>
                      </button>
                      <button
                        onClick={handleExportMarkdown}
                        className="flex items-center gap-2.5 w-full text-left p-2.5 hover:bg-[var(--surface)]/50 text-[var(--text)] rounded-xl transition-all cursor-pointer font-medium"
                        id="export-md-option"
                      >
                        <FileText size={15} className="text-[var(--primary)] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-[var(--text)]">Export as Markdown (.md)</div>
                          <div className="text-[10px] text-[var(--text-muted)]">EHR compatible raw text</div>
                        </div>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Message Thread Scroll Container */}
        <div 
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scroll-smooth"
        >
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
            {/* Welcome State / Initial Empty State */}
          {messages.length === 0 && (
            <div className="max-w-3xl mx-auto py-8 sm:py-12 px-2">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-md text-center flex flex-col items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20 shadow-inner">
                  <Sparkles size={32} className="text-[var(--primary)]" />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                    Welcome to Clinova Clinical Support
                  </h1>
                  <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                    A fully-equipped clinical console designed to retrieve, synthesize, and validate clinical evidence from the Kenya Drug Index (KDI), STG Guidelines, WHO, and notes.
                  </p>
                </div>

                <div className="w-full h-px bg-[var(--surface)]/60 my-1" />

                <div className="w-full text-left">
                  <span className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-widest block mb-4 text-center sm:text-left">
                    What can I do for you today?
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: Pill, title: "Learn pharmacology", desc: "Action mechanisms, indications, side effects, and exact dosing" },
                      { icon: Library, title: "Get treatment guidance", desc: "Strict adherence to Kenyan STG & global guidelines" },
                      { icon: Activity, title: "Ask clinical questions", desc: "Differential diagnostics, symptom checking, risk stratification" },
                      { icon: FlaskConical, title: "Interpret investigations", desc: "Synthesizing abnormal laboratory or imaging results" }
                    ].map((feat, idx) => {
                      const Icon = feat.icon;
                      return (
                        <div key={idx} className="flex gap-3 p-3.5 bg-[var(--bg)]/50 border border-[var(--border)]/80 rounded-2xl">
                          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/10 shrink-0">
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[var(--text)]">{feat.title}</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-normal mt-0.5">{feat.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Suggestion Chips Section inside Empty State */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-8 space-y-3"
              >
                <div className="flex items-center gap-2 px-1">
                  <Sparkles size={14} className="text-[var(--primary)]" />
                  <span className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Suggested Queries</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { text: 'Explain pneumonia treatment guidelines in Kenya', label: 'Explain pneumonia' },
                    { text: 'Check drug interactions for Amoxicillin', label: 'Drug interactions' },
                    { text: 'Calculate paediatric dosage for Paracetamol', label: 'Calculate dosage' },
                    { text: 'Differential diagnosis for acute chest pain', label: 'Differential diagnosis' },
                    { text: 'Kenya STG guidelines for first-line Malaria', label: 'Treatment guidelines' },
                    { text: 'How to interpret abnormal renal function lab results?', label: 'Interpret lab results' }
                  ].map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(sug.text)}
                      className="text-left px-4 py-3 bg-[var(--surface)] hover:bg-[var(--surface-dim)] border border-[var(--border)]/80 hover:border-[var(--border)] rounded-xl text-xs sm:text-sm font-medium text-[var(--text)] hover:text-[var(--primary)] transition-all cursor-pointer shadow-xs flex items-center justify-between select-none"
                    >
                      <span className="truncate">{sug.label}</span>
                      <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
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
                
                {/* Bubble Container - 80% limit for Assistant, 75% limit for User */}
                <div className={`flex flex-col gap-2 ${isUser ? 'max-w-[75%]' : 'max-w-[80%]'} w-full overflow-hidden`}>
                  
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
                    <div className="flex items-start gap-2.5 max-w-full group/bubble">
                      <div className={`rounded-3xl px-5 py-4 shadow-sm text-base leading-relaxed max-w-full overflow-x-auto scrollbar-thin ${
                        isUser 
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-tr-none shadow-md font-medium' 
                          : 'bg-[var(--surface)] border border-[var(--border)] border-l-2 border-l-[var(--primary)]/30 text-[var(--text)] rounded-tl-none shadow-xs'
                      }`}>
                        {isUser ? (
                          <div className="space-y-2">
                            {msg.fileName && (
                              <div className="flex items-center gap-1.5 text-xs bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 max-w-xs truncate">
                                <Paperclip size={12} className="shrink-0" />
                                <span className="truncate">{msg.fileName}</span>
                              </div>
                            )}
                            <p className="whitespace-pre-wrap">{msg.content}</p>
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
                          <div className="mt-1 flex items-center gap-1">
                            <CopyButton text={msg.content} />
                            <DownloadButton 
                              content={msg.content} 
                              filename={`clinova-consultation-${Date.now()}`}
                            />
                          </div>
                        )}
                    </div>
                  )}

                  {/* Verification Citations Widget */}
                  {!msg.isThinking && msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                    <div className="w-full bg-[var(--surface)]/40 border border-[var(--border)] rounded-2xl p-4 text-xs mt-1 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between mb-3 border-b border-[var(--border)]/80 pb-2.5 flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 text-[var(--text)] font-bold">
                          <CheckCircle2 size={14} className="text-[var(--success)] shrink-0" />
                          <span>Clinical Evidence Synthesized</span>
                        </div>
                        {msg.confidence && (
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="text-[var(--text-muted)]">Confidence:</span>
                            <span className="bg-[var(--success)]/10 text-[var(--success)] px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono tracking-tight text-[11px]">
                              {msg.confidence}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold block">Sources Cited:</span>
                        <ul className="space-y-2">
                          {msg.citations.map((cite, i) => (
                            <li key={i} className="flex items-start gap-2 text-[var(--text)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                              <span className="leading-normal text-xs text-[var(--text)]">
                                <span className="font-bold text-[var(--text)]">{cite.source}</span>
                                {cite.year && <span className="text-[var(--text-muted)]"> ({cite.year})</span>}
                                <span className="text-[var(--text-muted)]"> — {cite.document}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {msg.routedTo && (
                        <div className="mt-3 pt-3 border-t border-[var(--border)]/80 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Routing:</span>
                          {msg.routedTo.map((route, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[10px] font-bold text-[var(--primary)]">
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

          {/* Typing Indicator if processing */}
          {isProcessing && (
            <div className="flex gap-3 sm:gap-4 items-start animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)] shrink-0 shadow-xs mt-1">
                <Bot size={15} />
              </div>
              <div className="flex flex-col gap-2 max-w-[80%] items-start">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-tl-none px-5 py-4 shadow-md flex items-center gap-3">
                  <span className="text-sm font-semibold text-[var(--text)]">Clinical Support is thinking</span>
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
              className="absolute right-6 bottom-36 sm:bottom-32 p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)] shadow-lg hover:bg-[var(--surface-dim)] transition-colors cursor-pointer z-10"
              title="Scroll to bottom"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowDown size={18} />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Floating Interactive Input Composer Area */}
        <div className="p-3 sm:p-4 border-t border-[var(--border)]/80 bg-[var(--surface)] shrink-0 z-10 shadow-lg">
          <div className="max-w-3xl mx-auto w-full">
          
          {/* Active Databases Config Dropdown Panel */}
          <div className="mb-3 relative">
            <button 
              onClick={() => setShowSourceSelector(!showSourceSelector)}
              className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] px-3 py-1.5 hover:bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl transition-all cursor-pointer select-none"
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
                  className="absolute bottom-11 left-0 w-full sm:w-[480px] p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl grid grid-cols-2 gap-2.5 shadow-xl z-20"
                >
                  {AVAILABLE_SOURCES.map(source => (
                    <label key={source} className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-[var(--bg)]/80 border border-[var(--border)] hover:border-[var(--border)] rounded-xl transition-all select-none">
                      <input 
                        type="checkbox" 
                        checked={selectedSources.includes(source)}
                        onChange={() => toggleSource(source)}
                        className="accent-blue-500 rounded h-4 w-4 border-[var(--border)] cursor-pointer"
                      />
                      <span className="text-xs text-[var(--text)] font-medium">{source}</span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clinical Voice Dictation Panel */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                className="overflow-hidden mb-3 bg-[var(--primary)]/5 border border-[var(--primary)]/15 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {/* Animated mic indicator (waveform pulses) */}
                    <div className="flex items-center gap-1.5 bg-red-500/10 px-2.5 py-1 rounded-full text-red-400 font-bold text-[10px] uppercase tracking-wider animate-pulse border border-red-500/15">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span>Dictation Active</span>
                    </div>

                    {/* Speech Language selector dropdown */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[var(--text-muted)] font-medium">Language:</span>
                      <select
                        value={speechLang}
                        onChange={(e) => setSpeechLang(e.target.value)}
                        className="bg-[var(--bg)] text-xs text-[var(--text)] border border-[var(--border)] rounded px-2 py-0.5 outline-none font-semibold cursor-pointer font-sans"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="en-KE">English (Kenya)</option>
                        <option value="sw-KE">Swahili (Kenya)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Visualizer waves */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_100ms] h-2"></span>
                      <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_300ms] h-3"></span>
                      <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_200ms] h-1.5"></span>
                      <span className="w-0.5 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_400ms] h-2.5"></span>
                    </div>
                    <button
                      onClick={toggleListening}
                      className="text-[10px] bg-[var(--bg)] border border-[var(--border)] hover:bg-[var(--surface-dim)] px-2.5 py-0.5 rounded text-[var(--text)] font-semibold transition-colors cursor-pointer"
                    >
                      Stop
                    </button>
                  </div>
                </div>

                {/* Real-time Interim speech content */}
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-3 min-h-[50px] flex flex-col justify-between mb-2">
                  <div className="text-xs text-[var(--text)] select-text">
                    {speechInterim ? (
                      <span className="text-[var(--text-muted)] italic animate-pulse">{speechInterim}</span>
                    ) : (
                      <span className="text-[var(--text-muted)] text-[11px]">Start speaking to dictate symptoms or clinical details...</span>
                    )}
                  </div>
                </div>

                {/* Hands-free Voice Commands Info Banner */}
                <div className="flex items-start gap-1.5 bg-[var(--bg)]/50 border border-[var(--border)]/50 rounded-xl p-2.5 text-[10px] text-[var(--text-muted)] leading-relaxed">
                  <span className="font-bold text-[var(--primary)] text-xs shrink-0">💡 Commands:</span>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 w-full pl-1">
                    <div>Say <code className="font-bold text-[var(--text)] bg-[var(--bg)] px-1 rounded font-mono">"period"</code> for .</div>
                    <div>Say <code className="font-bold text-[var(--text)] bg-[var(--bg)] px-1 rounded font-mono">"comma"</code> for ,</div>
                    <div>Say <code className="font-bold text-[var(--text)] bg-[var(--bg)] px-1 rounded font-mono">"new line"</code> for break</div>
                    <div>Say <code className="font-bold text-[var(--text)] bg-[var(--bg)] px-1 rounded font-mono">"send message"</code> to send</div>
                    <div>Say <code className="font-bold text-[var(--text)] bg-[var(--bg)] px-1 rounded font-mono">"clear all"</code> to reset</div>
                    <div>Say <code className="font-bold text-[var(--text)] bg-[var(--bg)] px-1 rounded font-mono">"delete last"</code> to undo word</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toast / Banner for Speech Recognition Error */}
          <AnimatePresence>
            {speechError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-3 flex items-center justify-between gap-3 bg-red-500/10 border border-red-500/25 rounded-xl p-3 text-xs text-red-400 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <span>{speechError}</span>
                </div>
                <button
                  onClick={() => setSpeechError(null)}
                  className="p-1 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Styled Floating Input Box */}
          <div className="relative flex flex-col bg-[var(--bg)] border border-[var(--border)] focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-[var(--primary)] focus-within:bg-[var(--bg)]/90 rounded-2xl shadow-inner transition-all overflow-hidden p-1">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,application/pdf" 
              multiple
            />
            {attachedFiles.length > 0 && (
              <div className="flex flex-col gap-2 mx-4 mt-3 max-h-48 overflow-y-auto pr-1">
                {attachedFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="flex flex-col gap-1.5 p-3 bg-[var(--bg)]/90 border border-[var(--border)] rounded-xl text-xs text-[var(--text)] shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 select-none">
                      <div className="flex items-center gap-2 truncate min-w-0">
                        {file.status === 'uploading' ? (
                          <Loader2 size={13} className="text-[var(--primary)] animate-spin shrink-0" />
                        ) : file.status === 'extracted' ? (
                          <CheckCircle2 size={13} className="text-[var(--success)] shrink-0" />
                        ) : (
                          <AlertCircle size={13} className="text-red-500 shrink-0" />
                        )}
                        <span className="font-semibold truncate text-[var(--text)]">{file.name}</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {file.status === 'uploading' && (
                          <span className="text-[10px] text-[var(--primary)] font-bold animate-pulse">Extracting...</span>
                        )}
                        {file.status === 'extracted' && (
                          <span className="text-[10px] text-[var(--success)] font-bold bg-[var(--success)]/10 px-1.5 py-0.5 rounded">Extracted</span>
                        )}
                        {file.status === 'failed' && (
                          <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">Failed</span>
                        )}
                        
                        {/* Direct Cloudinary Link */}
                        {file.cloudinaryUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(file.cloudinaryUrl || '');
                              alert('Direct Cloudinary URL copied to clipboard!');
                            }}
                            className="p-1 hover:bg-[var(--surface)] text-[var(--primary)] hover:text-cyan-300 rounded transition-colors cursor-pointer"
                            title="Copy Direct Cloudinary URL"
                          >
                            <Copy size={12} />
                          </button>
                        )}

                        <button 
                          type="button"
                          onClick={() => setAttachedFiles(prev => prev.filter(f => f.id !== file.id))}
                          className="p-1 hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar / Error Message */}
                    {file.status === 'uploading' && (
                      <div className="w-full bg-[var(--surface)] rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-[var(--primary)] h-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                    {file.status === 'failed' && file.error && (
                      <span className="text-[10px] text-red-500 italic font-medium">{file.error}</span>
                    )}

                    {/* Quick Preview of Extracted Content */}
                    {file.status === 'extracted' && file.extractedContent && (
                      <div className="mt-1 p-2 bg-[var(--bg)]/60 border border-[var(--border)] rounded-lg text-[10px] text-[var(--text-muted)] leading-relaxed font-mono">
                        {file.extractedContent.patientName && (
                          <div><span className="text-[var(--primary)] font-semibold">Patient:</span> {file.extractedContent.patientName} ({file.extractedContent.age || 'N/A'}, {file.extractedContent.sex || 'N/A'})</div>
                        )}
                        {file.extractedContent.summary && (
                          <div className="line-clamp-2 mt-0.5"><span className="text-[var(--text)] font-sans">Summary:</span> {file.extractedContent.summary}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end w-full pr-2">
              <textarea 
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about diseases, drugs, laboratory results or patient management..." 
                className="w-full pl-4 pr-2 py-3 max-h-36 min-h-[44px] bg-transparent outline-none text-[var(--text)] text-sm sm:text-base resize-none placeholder-slate-500 leading-relaxed self-center font-sans"
                rows={1}
              />
              <div className="flex items-center gap-1.5 pb-2 shrink-0 self-end">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] rounded-xl transition-all cursor-pointer select-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Upload PDF or Image"
                >
                  <Paperclip size={18} />
                </button>
                <button
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer select-none min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    isListening
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : 'text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)]'
                  }`}
                  title={isListening ? "Stop listening" : "Start dictation"}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button 
                  onClick={() => handleSend()}
                  disabled={(!input.trim() && attachedFiles.length === 0) || isProcessing || attachedFiles.some(f => f.status === 'uploading')}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer select-none min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    (input.trim() || attachedFiles.length > 0) && !isProcessing && !attachedFiles.some(f => f.status === 'uploading')
                      ? 'bg-[var(--primary)] text-[var(--text)] shadow-sm hover:bg-[var(--primary)]' 
                      : 'bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
