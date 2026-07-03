import React, { useState } from "react";
import {
  Search,
  Bot,
  BookOpen,
  Clock,
  Activity,
  Bookmark,
  ChevronRight,
  BrainCircuit,
  FileText,
  Pill,
  Stethoscope,
  Sparkles,
  FileUp,
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  Users,
  Settings,
  Heart,
  Flame,
  ShieldAlert,
  Check,
  ChevronDown,
  Award,
  Settings2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

import { PatientTriage } from "../components/PatientTriage";
import { ShiftHandoverModal } from "../components/ShiftHandoverModal";
import ClinovaLogo from "../components/ClinovaLogo";

const STUDY_TRACKS: Record<string, { title: string; subtitle: string; points: string[]; color: string; badge: string }> = {
  'Cardiology': {
    title: 'Cardiovascular Therapeutics (CVS)',
    subtitle: 'High-yield guidelines & active clinical pearls',
    badge: 'CVS',
    color: 'border-rose-100 dark:border-rose-500/10 bg-rose-500/5',
    points: [
      'Guideline check: Heart Failure with Reduced Ejection Fraction (HFrEF) mandates the use of Quadruple Therapy (ARNI/ACEi/ARB, Beta-blocker, MRA, SGLT2i).',
      'Kenya Drug Index check: Verapamil is strictly contraindicated in patients with HFrEF or accessory bypass tracts.',
      'Dosage pearl: Target dose for Sacubitril/Valsartan is 97/103 mg twice daily as tolerated.'
    ]
  },
  'Nephrology': {
    title: 'Nephrology & Renal Staging',
    subtitle: 'Dose adjustments & electrolyte management',
    badge: 'Renal',
    color: 'border-sky-100 dark:border-sky-500/10 bg-sky-500/5',
    points: [
      'Guideline check: Calculate GFR using CKD-EPI (2021) equations rather than Cockcroft-Gault for staging, but Cockcroft-Gault remains default for drug package insert dosing.',
      'Kenya Drug Index check: Avoid Metformin if eGFR drops below 30 mL/min/1.73m² due to lactic acidosis risk.',
      'Dosage pearl: Enoxaparin prophylactic dose is adjusted to 30 mg SC once daily if CrCl < 30 mL/min.'
    ]
  },
  'Gastrointestinal': {
    title: 'Gastroenterology (GI Track)',
    subtitle: 'Acid-peptic diseases & hepatic modifications',
    badge: 'GI',
    color: 'border-amber-100 dark:border-amber-500/10 bg-amber-500/5',
    points: [
      'Guideline check: H. pylori eradication requires Triple/Quadruple therapy (Clarithromycin + Amoxicillin/Metronidazole + PPI + Bismuth) for 14 days.',
      'Kenya Drug Index check: Liver safety - reduce Paracetamol limit to 2g/24 hours in stable liver cirrhosis.',
      'Dosage pearl: Omeprazole should be taken 30-60 minutes before the first meal of the day.'
    ]
  },
  'Infectious Disease': {
    title: 'Infectious Disease & Antimicrobials',
    subtitle: 'Stewardship, pneumonia & local protocols',
    badge: 'Infectious',
    color: 'border-emerald-100 dark:border-emerald-500/10 bg-emerald-500/5',
    points: [
      'Guideline check: For CURB-65 score ≥ 2 (Moderate-severe CAP), initiate dual therapy with Ceftriaxone + Azithromycin/Clarithromycin.',
      'Kenya Drug Index check: Avoid Ceftriaxone in neonates receiving IV Calcium-containing solutions to prevent particulate precipitation.',
      'Dosage pearl: Vancomycin trough targets are 15-20 mcg/mL for severe MRSA infections.'
    ]
  },
  'Endocrinology': {
    title: 'Endocrine & Metabolic Regimens',
    subtitle: 'Insulin dosing & glycemic targets',
    badge: 'Endo',
    color: 'border-purple-100 dark:border-purple-500/10 bg-purple-500/5',
    points: [
      'Guideline check: ADA/EASD recommends SGLT2i or GLP-1 RA as first-line for Type 2 Diabetes with high cardiovascular risk, independent of HbA1c.',
      'Kenya Drug Index check: Always check thyroid panel before initiating Amiodarone therapy due to high iodine content.',
      'Dosage pearl: Rapid-acting insulin analogues should be administered immediately before or within 15 minutes of meals.'
    ]
  },
  'Neurology': {
    title: 'Central Nervous System Therapeutics',
    subtitle: 'Seizure control & stroke prevention',
    badge: 'CNS',
    color: 'border-indigo-100 dark:border-indigo-500/10 bg-indigo-500/5',
    points: [
      'Guideline check: First-line for focal seizures is Lamotrigine or Levetiracetam; avoid Valproic Acid in female students/patients of childbearing age.',
      'Kenya Drug Index check: High-risk interaction - Phenytoin drastically reduces direct oral anticoagulant (DOAC) levels.',
      'Dosage pearl: Carbamazepine requires slow titration to minimize dizziness, drowsiness, and ataxia.'
    ]
  },
};

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const { userData, updatePreferences } = useAuth();
  const isAdmin = userData?.role === "admin";

  const [isEditingPrefs, setIsEditingPrefs] = useState(false);
  const [prefLevel, setPrefLevel] = useState(userData?.academicLevel || 'Senior Pharmacy Student');
  const [prefTopics, setPrefTopics] = useState<string[]>(userData?.clinicalInterests || ['Cardiology', 'Nephrology']);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0 shadow-inner backdrop-blur-md">
              <ClinovaLogo size={32} variant="light" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight flex items-center gap-2 flex-wrap">
                Clinova OS 
                {userData?.academicLevel && (
                  <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold border border-white/20 uppercase tracking-wider block sm:inline-block">
                    {userData.academicLevel}
                  </span>
                )}
              </h1>
              <p className="text-white/85 max-w-lg text-sm leading-relaxed">
                {isAdmin
                  ? "Admin Repository Management: Add authoritative books, formularies, and reference URLs accessible to the entire learning community."
                  : `Welcome back, ${userData?.name || 'Student'}! Adapt your clinical focus to your active rotations. Your clinical hub is currently adjusted to your professional stage and interests.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link
              to="/knowledge"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm transition-all text-sm shrink-0 w-full sm:w-max"
            >
              <BookOpen size={18} />
              Online Books Hub
            </Link>
            <Link
              to="/assistant"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-[var(--primary)] rounded-xl font-semibold hover:shadow-md transition-all text-sm shrink-0 w-full sm:w-max"
            >
              <Bot size={18} />
              Auto AI Review Form
            </Link>
          </div>
        </div>
      </div>

      {!isAdmin ? (
        <>
          {/* Quick Search */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search
                size={20}
                className="text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors"
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kenya Drug Index, Guidelines, your notes, or ask a clinical question..."
              className="w-full pl-12 pr-4 py-4 bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none text-[var(--text)] text-base shadow-sm transition-all backdrop-blur-md"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-dim)] px-2 py-1 rounded border border-[var(--border)]">
                ⌘ K
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column (Main Content) */}
            <div className="md:col-span-2 space-y-6 md:space-y-8">
              {/* Quick Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[var(--text)] text-lg tracking-tight">
                    Quick Access Tools
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link
                    to="/review"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ClipboardList size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Care Plan
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Review &amp; Audit</span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Online Books
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">KDI, Medscape</span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Study Prep
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Convert Notes</span>
                  </Link>
                  <Link
                    to="/assistant"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Bot size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Auto AI
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Ask Questions</span>
                  </Link>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Clock size={18} className="text-[var(--text-muted)]" />
                    Recent Clinical Activity
                  </h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="p-4 flex items-start gap-4 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                      <ClipboardList
                        size={18}
                        className="text-[var(--primary)]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        Pharmacotherapy Review: IP-89432
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        AI Assisted • Community-Acquired Pneumonia
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-bold uppercase tracking-wider">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-4 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                      <Sparkles size={18} className="text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        Generated Short Notes
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        From: "Cardiovascular Guidelines 2024.pdf"
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-bold uppercase tracking-wider">
                        Yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <PatientTriage />

              {/* Student Personalized Study Tracks */}
              {userData && userData.clinicalInterests && userData.clinicalInterests.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[var(--text)] text-lg tracking-tight flex items-center gap-2">
                      <Sparkles size={18} className="text-[var(--primary)]" />
                      Dynamic Clinical Study Tracks
                    </h3>
                    <span className="text-xs text-[var(--text-muted)]">Tailored for {userData.academicLevel || 'Student'}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {userData.clinicalInterests.map((interest) => {
                      const track = STUDY_TRACKS[interest];
                      if (!track) return null;
                      return (
                        <div key={interest} className={`p-5 border border-[var(--border)] rounded-2xl transition-all shadow-sm ${track.color} hover:shadow-md`}>
                          <div className="flex items-center justify-between gap-4 mb-3">
                            <div>
                              <span className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{track.badge}</span>
                              <h4 className="font-bold text-sm sm:text-base text-[var(--text)] mt-1">{track.title}</h4>
                            </div>
                            <span className="text-xs text-[var(--text-muted)] italic hidden sm:inline">{track.subtitle}</span>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-[var(--text)]">
                            {track.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[var(--primary)] font-bold shrink-0 mt-0.5">•</span>
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Clinical Focus Profile & Preferences Adjuster */}
              {userData && (
                <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                  <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                    <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                      <GraduationCap size={18} className="text-[var(--primary)]" />
                      Clinical Focus Profile
                    </h3>
                    <button 
                      onClick={() => {
                        setPrefLevel(userData.academicLevel || 'Senior Pharmacy Student');
                        setPrefTopics(userData.clinicalInterests || ['Cardiology', 'Nephrology']);
                        setIsEditingPrefs(!isEditingPrefs);
                      }}
                      className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isEditingPrefs ? 'Cancel' : 'Adjust Focus ⚙️'}
                    </button>
                  </div>
                  
                  {!isEditingPrefs ? (
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Academic Stage</p>
                        <p className="text-sm font-bold text-[var(--text)] mt-0.5">{userData.academicLevel || 'Senior Pharmacy Student'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1.5">Clinical Interests</p>
                        <div className="flex flex-wrap gap-1.5">
                          {userData.clinicalInterests && userData.clinicalInterests.length > 0 ? (
                            userData.clinicalInterests.map((interest) => (
                              <span key={interest} className="text-xs bg-[var(--primary-container)]/50 text-[var(--primary)] px-2.5 py-1 rounded-xl font-medium border border-[var(--primary)]/10">
                                {interest}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-[var(--text-muted)]">No systems selected. Click adjust to personalize.</span>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                        Clinova dynamically filters rotation scenarios, Care Plan guidelines, and reference booklets based on these preferences.
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 space-y-4 bg-[var(--surface-dim)]/50 animate-in fade-in duration-200">
                      <div>
                        <label className="text-xs font-bold text-[var(--text)] block mb-1">Academic Stage</label>
                        <select 
                          value={prefLevel} 
                          onChange={(e) => setPrefLevel(e.target.value)}
                          className="w-full text-xs p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[var(--primary)] outline-none"
                        >
                          <option value="Junior Pharmacy Student">Junior Pharmacy Student (Y1-2)</option>
                          <option value="Senior Pharmacy Student">Senior Pharmacy Student (Y3-5)</option>
                          <option value="Pharmacy Intern">Pharmacy Intern / Novice</option>
                          <option value="Clinical Pharmacist">Clinical Pharmacist / Resident</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-[var(--text)] block mb-1">Clinical Systems (Toggle)</label>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          {['Cardiology', 'Nephrology', 'Gastrointestinal', 'Infectious Disease', 'Endocrinology', 'Neurology'].map((system) => {
                            const isChecked = prefTopics.includes(system);
                            return (
                              <button
                                key={system}
                                type="button"
                                onClick={() => {
                                  setPrefTopics(prev => 
                                    prev.includes(system) 
                                      ? prev.filter(t => t !== system) 
                                      : [...prev, system]
                                  );
                                }}
                                className={`px-2 py-1.5 rounded-lg border text-left text-[11px] font-medium transition-all cursor-pointer ${
                                  isChecked 
                                    ? 'border-[var(--primary)] bg-[var(--primary-container)]/25 text-[var(--primary)]' 
                                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]'
                                }`}
                              >
                                {isChecked ? '✓ ' : ''}{system}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={async () => {
                          if (prefTopics.length === 0) {
                            alert("Please select at least one clinical system/topic of interest.");
                            return;
                          }
                          await updatePreferences(prefTopics, prefLevel);
                          setIsEditingPrefs(false);
                        }}
                        className="w-full py-2 bg-[var(--primary)] hover:opacity-95 text-[var(--primary-foreground)] font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all"
                      >
                        Save Adaptations
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* Saved Work */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Bookmark size={18} className="text-[var(--text-muted)]" />
                    Your Uploads &amp; Saves
                  </h3>
                </div>
                <div className="p-2">
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <FileText
                      size={18}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        My Lecture Notes
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        Pharmacokinetics of Aminoglycosides
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <BookOpen
                      size={18}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        KDI Formulary Note
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        Saved Reference Link
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)] text-center">
                  <Link
                    to="/knowledge"
                    className="text-xs font-bold text-[var(--primary)] hover:underline"
                  >
                    Open Library →
                  </Link>
                </div>
              </div>

              {/* Clinical Updates & Notifications */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Activity size={18} className="text-[var(--text-muted)]" />
                    Latest System Updates
                  </h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--primary-container)] text-[var(--primary)] uppercase tracking-wider">
                        New Book Added
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[var(--text)]">
                      Medscape Monographs
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Admin added new online reference links to the library.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Specific Summary Cards */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Active Users</p>
              <p className="text-2xl font-bold text-[var(--text)]">1,248</p>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">System Health</p>
              <p className="text-2xl font-bold text-[var(--text)]">99.9%</p>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              <Settings size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Pending Updates
              </p>
              <p className="text-2xl font-bold text-[var(--text)]">3</p>
            </div>
          </div>

          <div className="md:col-span-3 mt-4">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center w-full bg-[var(--surface)] hover:bg-[var(--surface-dim)] border border-[var(--border)] p-4 rounded-xl text-[var(--primary)] font-medium transition-colors"
            >
              Open Full Admin Console{" "}
              <ChevronRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      )}

      {showHandoverModal && (
        <ShiftHandoverModal onClose={() => setShowHandoverModal(false)} />
      )}
    </div>
  );
}
