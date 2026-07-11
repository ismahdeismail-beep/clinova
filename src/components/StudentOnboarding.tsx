import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Pill, 
  Brain, 
  Flame, 
  ShieldAlert, 
  Check, 
  GraduationCap, 
  ChevronRight, 
  Sparkles,
  Award,
  BookOpen,
  Search,
  X,
  PlusCircle,
  Wind,
  Baby,
  Skull,
  Smile,
  Droplet
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TopicOption {
  id: string;
  name: string;
  system: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const CLINICAL_TOPICS: TopicOption[] = [
  { 
    id: 'Cardiology', 
    name: 'Cardiology (CVS)', 
    system: 'Cardiovascular', 
    description: 'Hypertension, heart failure, ischemic heart disease, and antiarrhythmics.', 
    icon: Heart, 
    color: 'from-rose-500/10 to-rose-500/20 text-rose-500 border-rose-200/50' 
  },
  { 
    id: 'Nephrology', 
    name: 'Nephrology (Renal)', 
    system: 'Renal Staging', 
    description: 'Acute kidney injury, CKD staging, and renal dose adjustments.', 
    icon: Activity, 
    color: 'from-sky-500/10 to-sky-500/20 text-sky-500 border-sky-200/50' 
  },
  { 
    id: 'Gastrointestinal', 
    name: 'Gastroenterology (GI)', 
    system: 'Gastrointestinal', 
    description: 'Peptic ulcer disease, GERD, inflammatory bowel disease, and hepatic dosing.', 
    icon: Flame, 
    color: 'from-amber-500/10 to-amber-500/20 text-amber-500 border-amber-200/50' 
  },
  { 
    id: 'Infectious Disease', 
    name: 'Infectious Disease', 
    system: 'Antimicrobials', 
    description: 'Antibiotic stewardship, pneumonia protocols, and tropical medicine.', 
    icon: ShieldAlert, 
    color: 'from-emerald-500/10 to-emerald-500/20 text-emerald-500 border-emerald-200/50' 
  },
  { 
    id: 'Endocrinology', 
    name: 'Endocrinology', 
    system: 'Hormonal & Diabetes', 
    description: 'Insulin regimens, thyroid management, and glucose controllers.', 
    icon: Pill, 
    color: 'from-purple-500/10 to-purple-500/20 text-purple-500 border-purple-200/50' 
  },
  { 
    id: 'Neurology', 
    name: 'Neurology (CNS)', 
    system: 'Central Nervous System', 
    description: 'Antiepileptics, stroke management, neuropathic pain, and sedatives.', 
    icon: Brain, 
    color: 'from-indigo-500/10 to-indigo-500/20 text-indigo-500 border-indigo-200/50' 
  },
  { 
    id: 'Pulmonology', 
    name: 'Pulmonology', 
    system: 'Respiratory Systems', 
    description: 'Asthma, COPD, pulmonary hypertension, and inhaler pharmacology.', 
    icon: Wind, 
    color: 'from-teal-500/10 to-teal-500/20 text-teal-500 border-teal-200/50' 
  },
  { 
    id: 'Pediatrics', 
    name: 'Pediatrics', 
    system: 'Pediatric Therapeutics', 
    description: 'Neonatal kinetics, weight-based dosing, and childhood infections.', 
    icon: Baby, 
    color: 'from-pink-500/10 to-pink-500/20 text-pink-500 border-pink-200/50' 
  },
  { 
    id: 'Critical Care', 
    name: 'Critical Care', 
    system: 'ICU & Emergency', 
    description: 'Sepsis resuscitation, vasopressors, blood gas analysis, and sedatives.', 
    icon: Stethoscope, 
    color: 'from-red-500/10 to-red-500/20 text-red-500 border-red-200/50' 
  },
  { 
    id: 'Oncology', 
    name: 'Oncology', 
    system: 'Cancer Care', 
    description: 'Chemotherapy regimens, supportive care, emesis control, and toxicity management.', 
    icon: Sparkles, 
    color: 'from-yellow-500/10 to-yellow-500/20 text-yellow-500 border-yellow-200/50' 
  },
  { 
    id: 'Toxicology & Poison Management', 
    name: 'Toxicology & Poison Management', 
    system: 'Overdose & Antidotes', 
    description: 'Poison management, pesticide toxicity, heavy metal chelators, and common antidotes.', 
    icon: Skull, 
    color: 'from-orange-500/10 to-orange-500/20 text-orange-500 border-orange-200/50' 
  },
  { 
    id: 'Psychiatry', 
    name: 'Psychiatry & Mental Health', 
    system: 'Behavioral Health', 
    description: 'Antidepressants, antipsychotics, mood stabilizers, and anxiety therapeutics.', 
    icon: Smile, 
    color: 'from-violet-500/10 to-violet-500/20 text-violet-500 border-violet-200/50' 
  },
  { 
    id: 'Hematology', 
    name: 'Hematology', 
    system: 'Blood & Coagulation', 
    description: 'Anemias, sickle cell disease, anticoagulation control, and antiplatelets.', 
    icon: Droplet, 
    color: 'from-red-600/10 to-red-600/20 text-red-600 border-red-200/50' 
  },
];

interface LevelOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const ACADEMIC_LEVELS: LevelOption[] = [
  {
    id: 'Year 1: Basic Medical Sciences',
    title: 'Year 1: Basic Medical Sciences',
    description: 'Foundational medical sciences including anatomy, physiology, biochemistry, microbiology, and introductory pharmacy.',
    icon: GraduationCap
  },
  {
    id: 'Year 2: Foundational Pharmacology',
    title: 'Year 2: Foundational Pharmacology',
    description: 'Basic principles including pharmacokinetics (ADME) and pharmacodynamics (drug-receptor, agonists/antagonists).',
    icon: GraduationCap
  },
  {
    id: 'Year 3: Systems & Clinical Intro',
    title: 'Year 3: Systems Pharmacology & Clinical Practice',
    description: 'Autonomic system, CVS therapeutics, renal diuretics, patient profile analysis, and care planning.',
    icon: BookOpen
  },
  {
    id: 'Year 4: Advanced Systems & ID',
    title: 'Year 4: Advanced Systems & Infectious Diseases',
    description: 'Endocrine, GI, respiratory agents, chemotherapy mechanisms, and infectious disease therapeutic management.',
    icon: Award
  },
  {
    id: 'Year 5: Specialty & Toxicology',
    title: 'Year 5: Specialty Therapeutics & Clinical Practice',
    description: 'Pediatric/geriatric therapeutics, oncology, hospital clinical rounds, toxicology, and TDM.',
    icon: Stethoscope
  }
];

export default function StudentOnboarding({ onClose }: { onClose?: () => void }) {
  const { userData, updatePreferences } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<string>('Year 1: Basic Medical Sciences');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Cardiology', 'Nephrology']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customTopics, setCustomTopics] = useState<TopicOption[]>([]);

  React.useEffect(() => {
    if (userData?.clinicalInterests) {
      const customs = userData.clinicalInterests.filter(
        id => !CLINICAL_TOPICS.some(t => t.id === id)
      );
      if (customs.length > 0) {
        setCustomTopics(customs.map(id => ({
          id,
          name: id,
          system: 'Custom Clinical Focus',
          description: `AI-customized clinical cases, dosing guidelines, and learning pearls.`,
          icon: Sparkles,
          color: 'from-violet-500/10 to-violet-500/20 text-violet-500 border-violet-200/50'
        })));
      }
      setSelectedTopics(userData.clinicalInterests);
    }
  }, [userData]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleComplete = async () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one clinical system/topic of interest.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updatePreferences(selectedTopics, selectedLevel);
      if (onClose) {
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] pt-[env(safe-area-inset-top,24px)]">
      <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        
        {/* Banner header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[var(--primary)] to-indigo-600 text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          
          {/* Close button if onboarding is completed or onClose is passed */}
          {(userData?.onboardingCompleted || onClose) && (
            <button
              type="button"
              onClick={onClose || (() => updatePreferences(userData?.clinicalInterests || [], userData?.academicLevel || ''))}
              className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer z-30"
              title="Close personalization"
            >
              <X size={18} />
            </button>
          )}

          <div className="relative z-10">
            <span className="text-[10px] bg-white/20 text-white border border-white/20 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
              <Sparkles size={11} className="animate-pulse" /> Student Personalization Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-3 tracking-tight">
              Welcome, {userData?.name}!
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Clinova adapts to your academic level and learning interests so you feel completely at home, no matter where you are in your journey.
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="absolute bottom-6 right-6 sm:right-8 flex gap-1.5">
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 1 ? 'bg-white w-5' : 'bg-white/45'}`} />
            <span className={`w-2 h-2 rounded-full transition-all duration-300 ${step === 2 ? 'bg-white w-5' : 'bg-white/45'}`} />
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {step === 1 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[var(--text)]">
                  Step 1: Where are you in your academic/professional journey?
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  This customizes the clinical complexity of study notes, guidelines, and dosage recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {ACADEMIC_LEVELS.map((level) => {
                  const Icon = level.icon;
                  const isSelected = selectedLevel === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedLevel(level.id)}
                      className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3 w-full cursor-pointer relative group ${
                        isSelected 
                          ? 'border-[var(--primary)] bg-[var(--primary-container)]/10 shadow-sm' 
                          : 'border-[var(--border)] hover:border-[var(--primary)]/30 bg-[var(--surface-dim)]/50'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-[var(--primary)] text-white' 
                          : 'bg-[var(--surface)] text-[var(--text-muted)] group-hover:text-[var(--text)]'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 pr-4">
                        <p className="font-bold text-xs sm:text-sm text-[var(--text)] leading-tight">{level.title}</p>
                        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-1">{level.description}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[var(--text)]">
                  Step 2: Select your primary clinical systems &amp; interest topics
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  We will tailor your Clinical Case rotations, Drug Index, and Quick Quizzes to your selected topics.
                </p>
              </div>

              {/* Search and Custom Topic Engine */}
              <div className="space-y-3 bg-[var(--surface-dim)]/40 p-4 rounded-2xl border border-[var(--border)]/60">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search systems (e.g., Cardiology, Pulmonology) or type custom focus..."
                    className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--primary)] outline-none rounded-xl transition-all text-[var(--text)]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-full hover:bg-[var(--surface-dim)]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Selected topics badge row */}
                {selectedTopics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center pt-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] mr-1">Active Focus:</span>
                    {Array.from(new Set(selectedTopics)).map(topicId => {
                      const topicObj = Array.from(new Map([...CLINICAL_TOPICS, ...customTopics].map(t => [t.id, t])).values()).find(t => t.id === topicId);
                      const displayName = topicObj ? topicObj.name : topicId;
                      return (
                        <span key={topicId} className="inline-flex items-center gap-1 text-[11px] bg-[var(--primary-container)]/60 text-[var(--primary)] font-semibold px-2.5 py-1 rounded-xl border border-[var(--primary)]/10 animate-in zoom-in-95 duration-150">
                          {displayName}
                          <button
                            type="button"
                            onClick={() => toggleTopic(topicId)}
                            className="hover:bg-[var(--primary)]/20 p-0.5 rounded-full text-[var(--primary)] transition-colors cursor-pointer"
                          >
                            <X size={10} strokeWidth={2.5} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Custom topic prompt if no perfect match */}
                {searchQuery.trim() && !([...CLINICAL_TOPICS, ...customTopics].some(t => t.name.toLowerCase() === searchQuery.trim().toLowerCase())) && (
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = searchQuery.trim();
                      const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                      const newTopicOption: TopicOption = {
                        id: formatted,
                        name: formatted,
                        system: 'Custom Clinical Focus',
                        description: `AI-customized clinical cases, dosing guidelines, and learning pearls.`,
                        icon: Sparkles,
                        color: 'from-violet-500/10 to-violet-500/20 text-violet-500 border-violet-200/50'
                      };
                      setCustomTopics(prev => [...prev, newTopicOption]);
                      setSelectedTopics(prev => prev.includes(formatted) ? prev : [...prev, formatted]);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-3.5 bg-gradient-to-r from-[var(--primary)]/5 to-indigo-500/5 border border-dashed border-[var(--primary)]/30 rounded-xl text-xs sm:text-sm font-semibold text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                        <PlusCircle size={15} />
                      </div>
                      <div>
                        <span className="block font-bold">Create Custom Focus: "{searchQuery.trim()}"</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-normal block leading-tight mt-0.5">Generate customized cases, board exam guides, and reference resources for this specific focus.</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-[var(--primary)] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 max-h-[260px] overflow-y-auto pr-1">
                {Array.from(new Map([...CLINICAL_TOPICS, ...customTopics].map(t => [t.id, t])).values())
                  .filter(t => {
                    const q = searchQuery.toLowerCase();
                    return t.name.toLowerCase().includes(q) || t.system.toLowerCase().includes(q);
                  }).map((topic) => {
                  const Icon = topic.icon;
                  const isSelected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      className={`text-left p-3 rounded-2xl border transition-all flex items-start gap-3 w-full cursor-pointer relative group ${
                        isSelected 
                          ? 'border-[var(--primary)] bg-[var(--primary-container)]/15 shadow-sm' 
                          : 'border-[var(--border)] hover:border-[var(--primary)]/30 bg-[var(--surface-dim)]/50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 bg-gradient-to-tr ${topic.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 pr-4">
                        <p className="font-bold text-xs sm:text-sm text-[var(--text)] leading-tight">{topic.name}</p>
                        <p className="text-[9px] text-[var(--primary)] font-medium uppercase tracking-wider mt-0.5">{topic.system}</p>
                        <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mt-1">{topic.description}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-3.5 right-3.5 w-4 h-4 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-6 border-t border-[var(--border)] bg-[var(--surface-dim)] flex items-center justify-between shrink-0">
          {step === 2 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] rounded-xl transition-all cursor-pointer"
            >
              Back to Step 1
            </button>
          ) : (
            <span className="text-[11px] text-[var(--text-muted)] font-medium">You can adjust these settings anytime.</span>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-[var(--primary)] hover:opacity-95 text-[var(--primary-foreground)] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              Next: Select Topics <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={isSubmitting || selectedTopics.length === 0}
              className="px-6 py-2.5 bg-[var(--primary)] hover:opacity-95 text-[var(--primary-foreground)] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Personalizing...' : 'Personalize My Clinova'} <Sparkles size={14} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
