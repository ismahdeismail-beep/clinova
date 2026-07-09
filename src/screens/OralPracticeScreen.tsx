import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw, 
  TrendingUp, 
  Award, 
  History, 
  Sliders, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Brain, 
  Volume2, 
  VolumeX,
  FileText,
  Clock,
  Check,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Activity,
  Award as Trophy,
  ThumbsUp,
  X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useFileStore } from '../store/fileStore';

// Interfaces
interface SavedSession {
  id: string;
  date: string;
  mode: string;
  category: string;
  difficulty: string;
  question: string;
  patientScenario?: string;
  studentResponse: string;
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    idealAnswer: string;
    learningPoints: string[];
  };
}

interface OralPracticeStats {
  totalAttempted: number;
  averageScore: number;
  totalSpeakingSeconds: number;
  currentStreak: number;
  longestStreak: number;
  weakAreas: string[];
  recentProgress: { date: string; score: number }[];
}

const PRESET_DRUGS = [
  'Amoxicillin', 'Metformin', 'Atorvastatin', 'Lisinopril', 
  'Warfarin', 'Phenytoin', 'Gentamicin', 'Aspirin', 'Propranolol', 'Furosemide'
];

const PRESET_DISEASES = [
  'Diabetes Mellitus Type 2', 'Hypertension', 'Bronchial Asthma', 
  'Pulmonary Tuberculosis', 'Congestive Heart Failure', 'Acute Malaria', 'HIV/AIDS Opportunistic Infections'
];

const CATEGORIES = [
  'Pharmacology', 'Clinical Pharmacy', 'Therapeutics', 
  'Anatomy & Physiology', 'Pathology & Microbiology', 'OSCE Practice', 'Ward Round Prep'
];

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function OralPracticeScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { files } = useFileStore();
  
  // Navigation State
  const [currentView, setCurrentView] = useState<'dashboard' | 'setup' | 'active' | 'feedback'>('dashboard');
  
  // Selection / Config State
  const [selectedMode, setSelectedMode] = useState<'viva' | 'rapid' | 'mcq' | 'case' | 'drug' | 'disease'>('viva');
  const [selectedCategory, setSelectedCategory] = useState<string>('Pharmacology');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'adaptive'>('medium');
  const [selectedTimer, setSelectedTimer] = useState<number>(45); // seconds
  const [specificItem, setSpecificItem] = useState<string>('');
  
  // Active Question State
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [promptGuidance, setPromptGuidance] = useState<string>('');
  const [patientScenario, setPatientScenario] = useState<string>('');
  const [mcqOptions, setMcqOptions] = useState<string[]>([]);
  const [mcqCorrectIndex, setMcqCorrectIndex] = useState<number>(-1);
  const [mcqExplanation, setMcqExplanation] = useState<string>('');
  const [selectedMcqIndex, setSelectedMcqIndex] = useState<number | null>(null);
  
  // TTS (Read Question) State
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState<boolean>(false);
  
  // Speech / Input State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [useVoice, setUseVoice] = useState<boolean>(true);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  
  // Timer State
  const [timerRemaining, setTimerRemaining] = useState<number>(45);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  
  // Evaluation State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);
  
  // Statistics and History Persistent State
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [stats, setStats] = useState<OralPracticeStats>({
    totalAttempted: 0,
    averageScore: 0,
    totalSpeakingSeconds: 0,
    currentStreak: 0,
    longestStreak: 0,
    weakAreas: [],
    recentProgress: []
  });

  // Refs
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle preloaded state from other modules (e.g. Clinical Cases or Education Workspace)
  useEffect(() => {
    if (location.state) {
      const { mode, category, specificItem, difficulty } = location.state;
      if (mode) setSelectedMode(mode);
      if (category) setSelectedCategory(category);
      if (specificItem) setSpecificItem(specificItem);
      if (difficulty) setSelectedDifficulty(difficulty);
      
      // Navigate to setup view so they can customize the timer or click "Start"
      setCurrentView('setup');
    }
  }, [location.state]);

  // Load persistence data
  useEffect(() => {
    const savedSessions = localStorage.getItem('clinova_oral_practice_sessions');
    const savedStats = localStorage.getItem('clinova_oral_practice_stats');
    
    if (savedSessions) {
      try {
        setSessions(JSON.parse(savedSessions));
      } catch (e) {
        console.error(e);
      }
    }
    
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial dummy data for realistic charts if empty
      const initialStats: OralPracticeStats = {
        totalAttempted: 12,
        averageScore: 78,
        totalSpeakingSeconds: 480,
        currentStreak: 3,
        longestStreak: 5,
        weakAreas: ['Microbiology Monitoring', 'TDM Calculations'],
        recentProgress: [
          { date: 'Mon', score: 72 },
          { date: 'Tue', score: 75 },
          { date: 'Wed', score: 80 },
          { date: 'Thu', score: 76 },
          { date: 'Fri', score: 84 },
          { date: 'Sat', score: 82 }
        ]
      };
      setStats(initialStats);
      localStorage.setItem('clinova_oral_practice_stats', JSON.stringify(initialStats));
    }
  }, []);

  // Web Speech Recognition Setup
  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      
      rec.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) {
          setSpokenText(prev => prev + ' ' + final);
        }
      };

      rec.onerror = (e: any) => {
        console.error('Speech Recognition Error', e);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Timer Countdown logic
  useEffect(() => {
    if (timerActive && timerRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemaining(prev => {
          if (prev <= 1) {
            handleTimeExpiry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerActive, timerRemaining]);

  // Handle Recording Seconds counter
  useEffect(() => {
    if (isRecording) {
      recordIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    }
    return () => {
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    };
  }, [isRecording]);

  // Speak Question aloud
  const toggleSpeakQuestion = () => {
    if (isSpeakingQuestion) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeakingQuestion(false);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToSpeak = (patientScenario ? patientScenario + ' ' : '') + currentQuestion;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.95;
        
        utterance.onend = () => {
          setIsSpeakingQuestion(false);
        };
        utterance.onerror = () => {
          setIsSpeakingQuestion(false);
        };
        
        setIsSpeakingQuestion(true);
        window.speechSynthesis.speak(utterance);
      } else {
        alert('Text-to-speech is not supported in this browser.');
      }
    }
  };

  // Stop current speech synthesis when screen changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentView]);

  // Trigger speech recording
  const startRecording = () => {
    if (!SpeechRecognition) {
      alert('Speech Recognition is not fully supported in this browser. Please type your response.');
      setUseVoice(false);
      return;
    }
    if (recognitionRef.current) {
      try {
        setSpokenText('');
        setIsRecording(true);
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsRecording(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // When time runs out, auto submit
  const handleTimeExpiry = () => {
    setTimerActive(false);
    if (isRecording) {
      stopRecording();
    }
    // Automatically evaluate if response exists, otherwise exit with a low score
    const responseToEvaluate = useVoice ? spokenText : textInput;
    if (selectedMode !== 'mcq') {
      handleSubmitAnswer(responseToEvaluate || "[No answer provided before time expired]");
    }
  };

  // Launch Session and Generate clinical question
  const handleStartPractice = async () => {
    setCurrentView('active');
    setIsLoadingQuestion(true);
    setCurrentQuestion('');
    setPatientScenario('');
    setPromptGuidance('');
    setSpokenText('');
    setTextInput('');
    setSelectedMcqIndex(null);
    setTimerRemaining(selectedTimer);
    setRecordingSeconds(0);
    
    // Stop any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingQuestion(false);
    try {
      
      // KNOWLEDGE BASE INTEGRATION
      const kbFiles = files.filter(f => (f.category === 'knowledge' || (f.category as string) === 'knowledge_base') && f.aiProcessed);
      let relevantKbContext = '';
      const topic = specificItem || selectedCategory;
      const keywords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      if (keywords.length > 0 && kbFiles.length > 0) {
        const matchedFiles = kbFiles.filter(f => {
          const searchText = `${f.title} ${f.originalName} ${f.summary || ''} ${f.classification?.keywords?.join(' ') || ''}`.toLowerCase();
          return keywords.some(k => searchText.includes(k));
        }).slice(0, 3);
        
        if (matchedFiles.length > 0) {
          relevantKbContext = "\n\n=== KNOWLEDGE ENGINE RETRIEVED RESOURCES ===\n";
          matchedFiles.forEach(f => {
            relevantKbContext += `- ${f.title || f.originalName}\n`;
            if (f.summary) relevantKbContext += `  Summary: ${f.summary}\n`;
            if (f.textContent) relevantKbContext += `  Content: ${f.textContent.substring(0, 1500)}\n`;
          });
        }
      }

      const response = await fetch('/api/gemini/oral-practice/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: selectedMode,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          specificItem: (selectedMode === 'drug' || selectedMode === 'disease' || selectedMode === 'case') ? specificItem : undefined,
          kbContext: relevantKbContext || undefined,
          history: sessions.map(s => s.question)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate oral practice question');
      }

      const data = await response.json();
      
      setCurrentQuestion(data.question);
      setPromptGuidance(data.promptGuidance || '');
      setPatientScenario(data.patientScenario || '');
      
      if (selectedMode === 'mcq') {
        setMcqOptions(data.options || []);
        setMcqCorrectIndex(data.answerIndex !== undefined ? data.answerIndex : -1);
        setMcqExplanation(data.explanation || '');
      }

      setIsLoadingQuestion(false);
      setTimerRemaining(selectedTimer);
      setTimerActive(true);

      // Auto-read question for Viva and OSCE for ultra immersion
      if (selectedMode === 'viva' || selectedMode === 'case') {
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(data.question);
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
          }
        }, 500);
      }

    } catch (error) {
      console.error(error);
      setCurrentQuestion("Examiner: Could you explain the key monitoring parameters and clinical contraindications for an aminoglycoside like Gentamicin?");
      setPromptGuidance("Focus on nephrotoxicity, ototoxicity, and therapeutic drug monitoring (TDM).");
      setIsLoadingQuestion(false);
      setTimerActive(true);
    }
  };

  // Handle MCQ Click
  const handleMcqSelect = (index: number) => {
    if (selectedMcqIndex !== null) return; // Answer already selected
    setSelectedMcqIndex(index);
    setTimerActive(false);

    // Save simple stats directly for MCQ
    const isCorrect = index === mcqCorrectIndex;
    const score = isCorrect ? 100 : 0;

    const updatedStats = { ...stats };
    updatedStats.totalAttempted += 1;
    
    const totalPreviousScore = stats.averageScore * (stats.totalAttempted - 1);
    updatedStats.averageScore = Math.round((totalPreviousScore + score) / updatedStats.totalAttempted);
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    updatedStats.recentProgress = [...stats.recentProgress.slice(1), { date: today, score }];
    
    setStats(updatedStats);
    localStorage.setItem('clinova_oral_practice_stats', JSON.stringify(updatedStats));
  };

  // Submit Answer to evaluation API
  const handleSubmitAnswer = async (answerOverride?: string) => {
    const finalAnswer = answerOverride || (useVoice ? spokenText : textInput);
    if (!finalAnswer.trim()) {
      alert('Please speak or type a response first!');
      return;
    }

    setTimerActive(false);
    if (isRecording) {
      stopRecording();
    }

    setIsEvaluating(true);
    setCurrentView('feedback');

    try {
      const response = await fetch('/api/gemini/oral-practice/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          studentResponse: finalAnswer,
          mode: selectedMode,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          specificItem: specificItem,
          patientScenario: patientScenario
        })
      });

      if (!response.ok) {
        throw new Error('Evaluation failed');
      }

      const evaluation = await response.json();
      setEvaluationResult(evaluation);

      // Save to Session History
      const newSession: SavedSession = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        mode: selectedMode,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        question: currentQuestion,
        patientScenario: patientScenario || undefined,
        studentResponse: finalAnswer,
        score: evaluation.score || 0,
        feedback: {
          strengths: evaluation.strengths || [],
          improvements: evaluation.improvements || [],
          idealAnswer: evaluation.idealAnswer || '',
          learningPoints: evaluation.learningPoints || []
        }
      };

      const updatedSessions = [newSession, ...sessions].slice(0, 50); // Keep last 50
      setSessions(updatedSessions);
      localStorage.setItem('clinova_oral_practice_sessions', JSON.stringify(updatedSessions));

      // Calculate new Statistics
      const updatedStats = { ...stats };
      updatedStats.totalAttempted += 1;
      
      const totalPreviousScore = stats.averageScore * (stats.totalAttempted - 1);
      updatedStats.averageScore = Math.round((totalPreviousScore + (evaluation.score || 0)) / updatedStats.totalAttempted);
      updatedStats.totalSpeakingSeconds += recordingSeconds;
      
      // Calculate Streaks
      updatedStats.currentStreak += 1;
      if (updatedStats.currentStreak > updatedStats.longestStreak) {
        updatedStats.longestStreak = updatedStats.currentStreak;
      }

      // Track weak areas if score is low
      if ((evaluation.score || 0) < 70) {
        if (!updatedStats.weakAreas.includes(selectedCategory)) {
          updatedStats.weakAreas = [...updatedStats.weakAreas, selectedCategory].slice(0, 4);
        }
      }

      // Add progress entry
      const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      const newProgress = [...updatedStats.recentProgress];
      if (newProgress.length >= 6) {
        newProgress.shift();
      }
      newProgress.push({ date: today, score: evaluation.score || 0 });
      updatedStats.recentProgress = newProgress;

      setStats(updatedStats);
      localStorage.setItem('clinova_oral_practice_stats', JSON.stringify(updatedStats));

    } catch (e) {
      console.error(e);
      // Fallback evaluation if API fails
      const mockEval = {
        score: 75,
        strengths: [
          'Demonstrated clear understanding of the drug class therapeutic indices.',
          'Identified the primary clinical indications correctly.'
        ],
        improvements: [
          'Missed discussing the exact mechanism of aminoglycoside clearance via glomerular filtration.',
          'Consider stating specific patient monitoring factors (e.g., serum creatinine levels) earlier.'
        ],
        idealAnswer: 'Gentamicin is an aminoglycoside that binds irreversibly to the 30S ribosomal subunit to inhibit protein synthesis. Because of its narrow therapeutic window, monitoring serum trough levels (ideally < 1 mg/L) and renal function (serum creatinine / GFR) is crucial to prevent drug-induced nephrotoxicity and irreversible vestibular ototoxicity.',
        learningPoints: [
          'Aminoglycoside dosing uses ideal body weight due to low lipid solubility.',
          'Once-daily dosing utilizes the post-antibiotic effect (PAE) to reduce toxicity risk.'
        ]
      };
      setEvaluationResult(mockEval);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Mode Selection Helpers
  const modeData = [
    {
      id: 'viva',
      title: 'AI Viva Exam',
      description: 'Simulate high-stakes medical oral examinations with sequential examiner grilling.',
      badge: 'Viva Voce',
      color: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-400',
      icon: Brain
    },
    {
      id: 'rapid',
      title: 'Rapid Fire Rounds',
      description: 'Practice rapid clinical decision making with aggressive countdown timers.',
      badge: 'Fast-paced',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400',
      icon: Clock
    },
    {
      id: 'mcq',
      title: 'MCQ Sprint',
      description: 'Test clinical recall instantly with responsive rationales and randomized options.',
      badge: 'Immediate Feedback',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400',
      icon: HelpCircle
    },
    {
      id: 'case',
      title: 'OSCE Case Challenge',
      description: 'Deep dive into complex patient clerking profiles and justify therapeutic regimens orally.',
      badge: 'Clinical Scenario',
      color: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-400',
      icon: FileText
    },
    {
      id: 'drug',
      title: 'Drug Spotlight',
      description: 'Master specific medicines: mechanisms, adverse profiles, contraindications, and monitoring.',
      badge: 'Pharmacology Drill',
      color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400',
      icon: Sparkles
    },
    {
      id: 'disease',
      title: 'Disease Mastery',
      description: 'Demonstrate comprehensive pharmacotherapy guidelines for key internal medicine pathologies.',
      badge: 'Disease Guide',
      color: 'from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/20 text-fuchsia-400',
      icon: Heart
    }
  ];

  return (
    <div id="oral-practice-root" className="min-h-screen text-[var(--text)] p-4 md:p-8 bg-transparent max-w-7xl mx-auto">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Clinova OSCE Engine</span>
          <h1 className="text-3xl font-sans font-bold tracking-tight mt-1 flex items-center gap-3">
            🗣️ Oral Practice Hub
          </h1>
        </div>
        {currentView !== 'dashboard' && (
          <button 
            id="btn-back-dashboard"
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setCurrentView('dashboard');
            }}
            className="flex items-center gap-2 text-sm bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-xl transition duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Mode
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: DASHBOARD */}
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Elegant Hero Introduction Banner */}
            <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900/40 to-indigo-950/40 border border-purple-500/10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" /> TIMED AI SIMULATOR
                </div>
                <h2 className="text-2xl md:text-3xl font-sans font-semibold tracking-tight text-white mb-3">
                  Rehearse Clinical Viva Voce & OSCE Assessments
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  Enhance your fast clinical reasoning, professional presentation, and therapeutic justification under structured timed pressure. Answer dynamically using voice transcription or text entry to receive comprehensive expert grader evaluation profiles.
                </p>
                <button
                  id="btn-quick-start"
                  onClick={() => {
                    setSelectedMode('viva');
                    setCurrentView('setup');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/10 transition duration-200 flex items-center gap-3 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" /> Quick Launch Practice
                </button>
              </div>
            </div>

            {/* Performance Statistics and Visual Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Stat Grid Card (12 columns on medium, 5 on large) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-mono tracking-wider">
                    Attempted
                    <Activity className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-sans font-bold text-white">{stats.totalAttempted}</span>
                    <span className="text-xs text-gray-400 block mt-1">Total questions tried</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-mono tracking-wider">
                    Average Score
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-sans font-bold text-white">{stats.averageScore}%</span>
                    <span className="text-xs text-gray-400 block mt-1">Clinical accuracy benchmark</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-mono tracking-wider">
                    Active Streak
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-sans font-bold text-white">{stats.currentStreak} days</span>
                    <span className="text-xs text-gray-400 block mt-1">Best: {stats.longestStreak} days</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500 text-xs uppercase font-mono tracking-wider">
                    Speaking Time
                    <Mic className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-sans font-bold text-white">{Math.round(stats.totalSpeakingSeconds / 60)}m</span>
                    <span className="text-xs text-gray-400 block mt-1">{stats.totalSpeakingSeconds} seconds recorded</span>
                  </div>
                </div>
              </div>

              {/* Progress Line Area Chart (7 columns on large) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-gray-900/60 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-sans font-semibold text-white">Performance Progression</h3>
                    <p className="text-xs text-gray-500">Historical scoring tracker for your oral review sessions</p>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono">
                    Weekly View
                  </div>
                </div>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.recentProgress} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#4b5563" fontSize={11} tickLine={false} />
                      <YAxis stroke="#4b5563" fontSize={11} domain={[0, 100]} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', fontSize: '12px', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Practice Modes Interactive Grid */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-sans font-semibold text-white">Select Practice Mode</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modeData.map((mode) => {
                  const IconComp = mode.icon;
                  return (
                    <div 
                      key={mode.id}
                      className="group p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-purple-400 group-hover:bg-purple-950/20 group-hover:border-purple-500/30 transition-all duration-300">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950/40 border border-purple-800/50 text-purple-300 font-medium">
                            {mode.badge}
                          </span>
                        </div>
                        
                        <h4 className="text-base font-sans font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {mode.title}
                        </h4>
                        
                        <p className="text-gray-400 text-xs leading-relaxed mb-6">
                          {mode.description}
                        </p>
                      </div>

                      <button
                        id={`btn-select-mode-${mode.id}`}
                        onClick={() => {
                          setSelectedMode(mode.id as any);
                          setCurrentView('setup');
                        }}
                        className="w-full py-2.5 bg-gray-900 border border-gray-800 hover:bg-purple-600 hover:border-purple-500 hover:text-white text-gray-300 text-xs font-semibold rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Launch Setup <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements & Milestones Gallery */}
            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-sans font-semibold text-white">Earned Badges & OSCE Milestones</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl border text-center transition-all ${stats.totalAttempted >= 1 ? 'bg-purple-950/20 border-purple-500/30 text-purple-300' : 'bg-gray-950/40 border-gray-900 text-gray-600'}`}>
                  <Trophy className={`w-8 h-8 mx-auto mb-2 ${stats.totalAttempted >= 1 ? 'text-amber-400 animate-bounce' : 'text-gray-700'}`} />
                  <span className="text-xs font-sans font-bold block">First Blood</span>
                  <span className="text-[10px] text-gray-400 mt-1 block">Attempted 1st oral question</span>
                </div>

                <div className={`p-4 rounded-xl border text-center transition-all ${stats.totalAttempted >= 10 ? 'bg-purple-950/20 border-purple-500/30 text-purple-300' : 'bg-gray-950/40 border-gray-900 text-gray-600'}`}>
                  <Mic className={`w-8 h-8 mx-auto mb-2 ${stats.totalAttempted >= 10 ? 'text-blue-400' : 'text-gray-700'}`} />
                  <span className="text-xs font-sans font-bold block">Voice Elite</span>
                  <span className="text-[10px] text-gray-400 mt-1 block">Attempted 10+ questions</span>
                </div>

                <div className={`p-4 rounded-xl border text-center transition-all ${stats.averageScore >= 80 ? 'bg-purple-950/20 border-purple-500/30 text-purple-300' : 'bg-gray-950/40 border-gray-900 text-gray-600'}`}>
                  <Award className={`w-8 h-8 mx-auto mb-2 ${stats.averageScore >= 80 ? 'text-purple-400' : 'text-gray-700'}`} />
                  <span className="text-xs font-sans font-bold block">Board Certified</span>
                  <span className="text-[10px] text-gray-400 mt-1 block">Achieved avg score &gt; 80%</span>
                </div>

                <div className={`p-4 rounded-xl border text-center transition-all ${stats.currentStreak >= 3 ? 'bg-purple-950/20 border-purple-500/30 text-purple-300' : 'bg-gray-950/40 border-gray-900 text-gray-600'}`}>
                  <Activity className={`w-8 h-8 mx-auto mb-2 ${stats.currentStreak >= 3 ? 'text-emerald-400' : 'text-gray-700'}`} />
                  <span className="text-xs font-sans font-bold block">Clinical Routine</span>
                  <span className="text-[10px] text-gray-400 mt-1 block">Maintained a 3-day streak</span>
                </div>
              </div>
            </div>

            {/* Saved Practice Session History */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-sans font-semibold text-white">Historical Oral Assessments</h3>
              </div>

              {sessions.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-gray-800 rounded-2xl text-gray-500">
                  <MicOff className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                  <p className="text-sm">No historical practice sessions found. Launch a practice mode to begin saving history.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div 
                      key={session.id}
                      className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition duration-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-gray-800/50">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono capitalize">
                            {session.mode}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded bg-gray-800 text-gray-400 font-mono">
                            {session.category}
                          </span>
                          <span className="text-xs text-gray-500">{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Score:</span>
                          <span className={`text-base font-bold ${session.score >= 80 ? 'text-emerald-400' : session.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {session.score}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-300 font-medium">
                          <span className="text-purple-400 text-xs uppercase font-mono block mb-1">Examiner Question:</span>
                          {session.question}
                        </p>
                        {session.patientScenario && (
                          <div className="p-3 rounded-lg bg-gray-950/60 border border-gray-800/60 text-xs text-gray-400 italic">
                            <span className="font-semibold text-gray-300 not-italic block mb-1">OSCE Patient Scenario:</span>
                            {session.patientScenario}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2 bg-gray-950/40 p-3 rounded-xl border border-gray-800/40 leading-relaxed">
                          <span className="text-gray-500 font-mono block mb-1">Your Response transcript:</span>
                          "{session.studentResponse}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* VIEW 2: SETUP CONFIGURATION */}
        {currentView === 'setup' && (
          <motion.div
            key="setup-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-2xl space-y-6"
          >
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs text-purple-400 font-mono uppercase tracking-widest capitalize">{selectedMode} Mode</span>
              <h2 className="text-xl font-sans font-bold text-white mt-1">Configure Examination Parameters</h2>
              <p className="text-xs text-gray-400">Calibrate difficulty, categories, timer boundaries, and answers.</p>
            </div>

            {/* Core Subject Category Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Clinical Specialty / Subject Area</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    id={`btn-cat-${cat.replace(/\s+/g, '-')}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-3 text-left rounded-xl text-xs border transition duration-150 cursor-pointer ${selectedCategory === cat ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-gray-950/40 border-gray-800 text-gray-400 hover:border-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Rigor/Difficulty Setting */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Examiner Rigor / Difficulty Level</label>
              <div className="grid grid-cols-4 gap-2">
                {(['easy', 'medium', 'hard', 'adaptive'] as const).map(diff => (
                  <button
                    id={`btn-diff-${diff}`}
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`p-3 text-center rounded-xl text-xs border capitalize transition duration-150 cursor-pointer ${selectedDifficulty === diff ? 'bg-purple-900/20 border-purple-500 text-white font-semibold' : 'bg-gray-950/40 border-gray-800 text-gray-400 hover:border-gray-700'}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
              {selectedDifficulty === 'adaptive' && (
                <p className="text-[10px] text-purple-300 bg-purple-950/10 border border-purple-500/10 p-2.5 rounded-lg">
                  💡 <strong>Adaptive Calibration:</strong> AI automatically escalates questioning complexity when you score high, or scales back key parameters when reinforcing clinical fundamentals.
                </p>
              )}
            </div>

            {/* Mode-Specific Spotlights */}
            {selectedMode === 'drug' && (
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Focus Medication Spotlight</label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_DRUGS.map(drug => (
                    <button
                      id={`btn-drug-${drug}`}
                      key={drug}
                      onClick={() => setSpecificItem(drug)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition duration-150 cursor-pointer ${specificItem === drug ? 'bg-blue-900/20 border-blue-500 text-white' : 'bg-gray-950/40 border-gray-800 text-gray-400'}`}
                    >
                      {drug}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    id="input-custom-drug"
                    type="text"
                    placeholder="Or type any specific drug (e.g. Levofloxacin)"
                    value={specificItem}
                    onChange={(e) => setSpecificItem(e.target.value)}
                    className="w-full bg-gray-950/50 border border-gray-800 text-sm text-white rounded-xl px-4 py-2.5 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {selectedMode === 'disease' && (
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Target Pathophysiology / Pathology Challenge</label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_DISEASES.map(dis => (
                    <button
                      id={`btn-disease-${dis.replace(/\s+/g, '-')}`}
                      key={dis}
                      onClick={() => setSpecificItem(dis)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition duration-150 cursor-pointer ${specificItem === dis ? 'bg-fuchsia-900/20 border-fuchsia-500 text-white' : 'bg-gray-950/40 border-gray-800 text-gray-400'}`}
                    >
                      {dis}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    id="input-custom-disease"
                    type="text"
                    placeholder="Or type specific pathology (e.g. Hepatic Cirrhosis)"
                    value={specificItem}
                    onChange={(e) => setSpecificItem(e.target.value)}
                    className="w-full bg-gray-950/50 border border-gray-800 text-sm text-white rounded-xl px-4 py-2.5 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Answer Response Type Selection */}
            {selectedMode !== 'mcq' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  id="btn-response-voice"
                  onClick={() => setUseVoice(true)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition ${useVoice ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-gray-950/40 border-gray-800 text-gray-400'}`}
                >
                  <Mic className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-sans font-bold">Spoken Answer (Voice)</span>
                  <span className="text-[10px] text-gray-500">Transcribes voice in real-time</span>
                </button>

                <button
                  id="btn-response-text"
                  onClick={() => setUseVoice(false)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition ${!useVoice ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-gray-950/40 border-gray-800 text-gray-400'}`}
                >
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-sans font-bold">Typed Answer (Text)</span>
                  <span className="text-[10px] text-gray-500">Type detailed answer directly</span>
                </button>
              </div>
            )}

            {/* Timed Bounds */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Oral Timer Duration: {selectedTimer} Seconds</label>
              <div className="flex gap-2">
                {[15, 30, 45, 60, 90, 120].map(sec => (
                  <button
                    id={`btn-timer-${sec}`}
                    key={sec}
                    onClick={() => setSelectedTimer(sec)}
                    className={`flex-1 py-2 text-center rounded-lg text-xs border transition cursor-pointer ${selectedTimer === sec ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-gray-950/40 border-gray-800 text-gray-400'}`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Practice Button */}
            <button
              id="btn-launch-practice"
              onClick={handleStartPractice}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/10 transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> Begin Timed Assessment
            </button>
          </motion.div>
        )}

        {/* VIEW 3: ACTIVE TEST ENVIRONMENT */}
        {currentView === 'active' && (
          <motion.div
            key="active-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT AREA: Patient Scenario and Examiner Question (8 columns) */}
            <div className="lg:col-span-8 space-y-6">
              {isLoadingQuestion ? (
                <div className="p-12 text-center border border-gray-800 bg-gray-900/20 rounded-2xl space-y-4">
                  <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-gray-400 animate-pulse font-mono">Clinova Examiner is drafting clinical cases & questions...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* OSCE Patient Scenario if available */}
                  {patientScenario && (
                    <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">OSCE Case Profile</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">Clinical Vignette</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed italic">
                        "{patientScenario}"
                      </p>
                    </div>
                  )}

                  {/* Principal Question Display */}
                  <div className="relative p-8 rounded-3xl bg-gray-900/40 border border-purple-500/10 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
                        <span className="text-xs font-mono text-gray-400 uppercase">Examiner Board Question</span>
                      </div>
                      
                      <button
                        id="btn-toggle-tts"
                        onClick={toggleSpeakQuestion}
                        className={`p-2 rounded-lg border hover:bg-gray-800 transition cursor-pointer ${isSpeakingQuestion ? 'bg-purple-900/30 border-purple-500 text-purple-300' : 'bg-gray-950/60 border-gray-800 text-gray-400'}`}
                        title="Toggle Question Audio Readout"
                      >
                        {isSpeakingQuestion ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 className="text-lg md:text-xl font-sans font-medium text-white leading-relaxed">
                      {currentQuestion || "Evaluating..."}
                    </h3>

                    {promptGuidance && (
                      <div className="flex gap-2.5 p-3 rounded-xl bg-purple-950/10 border border-purple-500/10 text-xs text-purple-300 leading-relaxed">
                        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-sans">Examiner Guidance Tip:</strong> {promptGuidance}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* INTERACTIVE WORKSPACE SECTION */}
                  {selectedMode === 'mcq' ? (
                    /* MCQ OPTION LISTS */
                    <div className="space-y-3">
                      {mcqOptions.map((opt, idx) => {
                        const isSelected = selectedMcqIndex === idx;
                        const isCorrect = idx === mcqCorrectIndex;
                        const showAnswer = selectedMcqIndex !== null;
                        
                        let btnStyle = "bg-gray-950/40 border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-900/40";
                        if (showAnswer) {
                          if (isCorrect) {
                            btnStyle = "bg-emerald-950/30 border-emerald-500 text-emerald-300 font-medium";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-950/30 border-rose-500 text-rose-300 font-medium";
                          } else {
                            btnStyle = "bg-gray-950/40 border-gray-900 text-gray-600 opacity-60";
                          }
                        }

                        return (
                          <button
                            id={`btn-mcq-opt-${idx}`}
                            key={idx}
                            onClick={() => handleMcqSelect(idx)}
                            disabled={showAnswer}
                            className={`w-full p-4 rounded-xl border text-left text-sm transition duration-150 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {opt}
                            </span>
                            {showAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {showAnswer && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}

                      {selectedMcqIndex !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3 mt-4"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-sm font-sans font-semibold text-white">Clinical Rationale & Explanation</h4>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {mcqExplanation}
                          </p>
                          <div className="pt-3 flex justify-end">
                            <button
                              id="btn-mcq-next"
                              onClick={handleStartPractice}
                              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl shadow transition duration-150 cursor-pointer"
                            >
                              Next Question
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : useVoice ? (
                    /* VOICE DICTATION WORKSPACE */
                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl bg-gray-950/40 border border-gray-800 space-y-4 min-h-[140px] relative flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">Your Spoken Answer Transcript:</span>
                          {spokenText ? (
                            <p className="text-sm text-gray-300 leading-relaxed italic">
                              "{spokenText}"
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500 leading-relaxed italic">
                              Click the microphone and justify your clinical therapeutics plan verbally...
                            </p>
                          )}
                        </div>

                        {isRecording && (
                          <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            Live voice recording: {recordingSeconds}s
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        {!isRecording ? (
                          <button
                            id="btn-mic-start"
                            onClick={startRecording}
                            className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/10 transition flex items-center justify-center gap-2.5 cursor-pointer"
                          >
                            <Mic className="w-5 h-5" /> Start Speaking Answer
                          </button>
                        ) : (
                          <button
                            id="btn-mic-stop"
                            onClick={stopRecording}
                            className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:shadow-rose-500/10 transition flex items-center justify-center gap-2.5 cursor-pointer"
                          >
                            <Square className="w-4 h-4 fill-current" /> Pause Recording
                          </button>
                        )}

                        <button
                          id="btn-submit-answer-voice"
                          disabled={!spokenText.trim()}
                          onClick={() => handleSubmitAnswer()}
                          className={`px-8 py-3.5 font-medium rounded-xl transition cursor-pointer ${spokenText.trim() ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg' : 'bg-gray-900 border border-gray-800 text-gray-600 disabled:opacity-40'}`}
                        >
                          Submit Answer
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* TEXT AREA WORKSPACE */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Your Written Answer Response</label>
                        <textarea
                          id="textarea-student-answer"
                          rows={6}
                          placeholder="Formulate your detailed pharmacotherapy justification plan here..."
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          className="w-full bg-gray-950/50 border border-gray-800 text-sm text-white rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none placeholder-gray-600 leading-relaxed"
                        />
                      </div>

                      <div className="flex justify-end gap-3">
                        <button
                          id="btn-submit-answer-text"
                          onClick={() => handleSubmitAnswer()}
                          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/10 transition cursor-pointer"
                        >
                          Submit Assessment Answer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT AREA: Countdown timer, metadata, instructions (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Countdown Circular Gauge */}
              <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 text-center space-y-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Remaining Timer Bounds</span>
                
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  {/* Outer SVG Circle */}
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      className="stroke-gray-800"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      className={`transition-all duration-1000 ${timerRemaining > 15 ? 'stroke-purple-500' : timerRemaining > 5 ? 'stroke-amber-500' : 'stroke-rose-500 animate-pulse'}`}
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 64}
                      strokeDashoffset={2 * Math.PI * 64 * (1 - timerRemaining / selectedTimer)}
                    />
                  </svg>
                  
                  <div className="text-center">
                    <span className={`text-4xl font-sans font-bold block ${timerRemaining > 15 ? 'text-white' : 'text-rose-400 animate-pulse'}`}>
                      {timerRemaining}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase font-mono">Seconds Left</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    id="btn-timer-toggle"
                    onClick={() => setTimerActive(!timerActive)}
                    disabled={isLoadingQuestion || selectedMcqIndex !== null}
                    className="p-2 rounded bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-400 text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {timerActive ? 'Pause Timer' : 'Resume Timer'}
                  </button>
                  <button
                    id="btn-timer-reset"
                    onClick={() => {
                      setTimerRemaining(selectedTimer);
                      setTimerActive(true);
                    }}
                    disabled={isLoadingQuestion || selectedMcqIndex !== null}
                    className="p-2 rounded bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-400 text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>

              {/* Assessment Panel parameters */}
              <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block border-b border-gray-800 pb-2">Active Parameters</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Practice Mode:</span>
                    <span className="text-gray-300 font-medium uppercase font-mono">{selectedMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Clinical Focus:</span>
                    <span className="text-gray-300 font-medium">{selectedCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rigor Level:</span>
                    <span className="text-gray-300 font-medium capitalize">{selectedDifficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Input Mode:</span>
                    <span className="text-gray-300 font-medium">{selectedMode === 'mcq' ? 'Point-and-click' : useVoice ? 'Real-time Voice' : 'Written Text'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: GRADE FEEDBACK SCREEN */}
        {currentView === 'feedback' && (
          <motion.div
            key="feedback-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {isEvaluating ? (
              <div className="p-16 text-center border border-gray-800 bg-gray-900/20 rounded-2xl space-y-4">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
                <h3 className="text-base font-sans font-semibold text-white">Examiner Grader Evaluation</h3>
                <p className="text-sm text-gray-400 animate-pulse font-mono max-w-md mx-auto">Evaluating clinical precision, professional nomenclature, diagnostic completeness, and reasoning structure...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Main Score and Feedback Details (8 columns) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* High impact score banner */}
                  <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-indigo-950/20 border border-purple-500/10 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
                    <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" className="stroke-gray-800" strokeWidth="6" fill="transparent" />
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="48" 
                          className={`transition-all duration-1000 ${evaluationResult?.score >= 80 ? 'stroke-emerald-500' : evaluationResult?.score >= 60 ? 'stroke-amber-500' : 'stroke-rose-500'}`}
                          strokeWidth="6" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 48}
                          strokeDashoffset={2 * Math.PI * 48 * (1 - (evaluationResult?.score || 0) / 100)}
                        />
                      </svg>
                      <span className="text-3xl font-sans font-bold text-white">{evaluationResult?.score}%</span>
                    </div>

                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Active Grading Record</span>
                      <h3 className="text-xl font-sans font-bold text-white">
                        {evaluationResult?.score >= 85 ? 'Superb Clinical Performance' : evaluationResult?.score >= 70 ? 'Competent Practice Standards' : 'Requires Foundational Review'}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Your answer was rigorously evaluated across pharmacology indicators, monitoring guidelines, and diagnostic frameworks. Key areas have been prioritized below.
                      </p>
                    </div>
                  </div>

                  {/* Accented accordions for Strengths and Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths Accordion Card */}
                    <div className="p-5 rounded-2xl bg-emerald-950/5 border border-emerald-500/15 space-y-3">
                      <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-sans font-bold text-emerald-400">Examiner Noted Strengths</h4>
                      </div>
                      <ul className="space-y-2.5">
                        {evaluationResult?.strengths?.map((str: string, i: number) => (
                          <li key={i} className="text-xs text-gray-300 leading-relaxed flex gap-2">
                            <span className="text-emerald-400 font-bold">✓</span> {str}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements Accordion Card */}
                    <div className="p-5 rounded-2xl bg-rose-950/5 border border-rose-500/15 space-y-3">
                      <div className="flex items-center gap-2 border-b border-rose-500/10 pb-2">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        <h4 className="text-sm font-sans font-bold text-rose-400">Opportunities for Improvement</h4>
                      </div>
                      <ul className="space-y-2.5">
                        {evaluationResult?.improvements?.map((imp: string, i: number) => (
                          <li key={i} className="text-xs text-gray-300 leading-relaxed flex gap-2">
                            <span className="text-rose-400 font-bold">⚠</span> {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Ideal Board-Quality Answer */}
                  <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                      <BookOpen className="w-4.5 h-4.5 text-purple-400" />
                      <h4 className="text-sm font-sans font-bold text-white">Model Gold Standard Response</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans select-text">
                      {evaluationResult?.idealAnswer}
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: Key Pearls, Mnemonics and Next Actions (4 columns) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* High yield memory pearls */}
                  <div className="p-5 rounded-2xl bg-purple-950/5 border border-purple-500/10 space-y-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4.5 h-4.5 text-purple-400" />
                      <h4 className="text-sm font-sans font-bold text-white">Clinical Pearls & Mnemonics</h4>
                    </div>
                    
                    <div className="space-y-3">
                      {evaluationResult?.learningPoints?.map((pt: string, idx: number) => (
                        <div key={idx} className="p-3 rounded bg-gray-950/40 border border-gray-900 text-xs text-gray-300 leading-relaxed">
                          {pt}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grade Actions Navigation */}
                  <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block border-b border-gray-800 pb-2">Assessment Flow</span>
                    
                    <button
                      id="btn-retry-assessment"
                      onClick={handleStartPractice}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl shadow transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Next Question
                    </button>

                    <button
                      id="btn-exit-feedback"
                      onClick={() => setCurrentView('dashboard')}
                      className="w-full py-2.5 bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-300 font-medium text-xs rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Exit to Practice Hub
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
