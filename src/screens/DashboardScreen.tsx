import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bot,
  BookOpen,
  Activity,
  ChevronRight,
  FileText,
  Sparkles,
  GraduationCap,
  X,
  PlusCircle,
  ArrowRight,
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

import ClinovaLogo from "../components/ClinovaLogo";
import DailySpotlight from "../components/DailySpotlight";

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

const ALL_CLINICAL_SYSTEMS = [
  'Cardiology',
  'Nephrology',
  'Gastrointestinal',
  'Infectious Disease',
  'Endocrinology',
  'Neurology',
  'Pulmonology',
  'Pediatrics',
  'Critical Care',
  'Oncology',
  'Toxicology & Poison Management',
  'Psychiatry',
  'Hematology'
];

export default function DashboardScreen() {
    const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchResults: any[] = [];
  const { userData, updatePreferences } = useAuth();

  const [isEditingPrefs, setIsEditingPrefs] = useState(false);
  const [prefLevel, setPrefLevel] = useState(userData?.academicLevel || 'Year 1: Basic Medical Sciences');
  const [prefTopics, setPrefTopics] = useState<string[]>(userData?.clinicalInterests || ['Cardiology', 'Nephrology']);
  const [prefsSearchQuery, setPrefsSearchQuery] = useState("");

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full 2xl:max-w-7xl mx-auto space-y-4 md:space-y-8 pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-indigo-600 rounded-2xl p-5 md:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0 shadow-inner backdrop-blur-md">
              <ClinovaLogo size={28} variant="light" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 md:mb-2 tracking-tight flex items-center gap-2 flex-wrap">
                Clinova Clinical Companion 
                {userData?.academicLevel && (
                  <span className="text-[9px] md:text-[10px] bg-white/20 px-2 md:px-2.5 py-0.5 rounded-full font-bold border border-white/20 uppercase tracking-wider block sm:inline-block">
                    {userData.academicLevel}
                  </span>
                )}
              </h1>
              <p className="text-white/85 max-w-lg text-xs md:text-sm leading-relaxed">
                Welcome back, {userData?.name || 'Student'}! Adapt your clinical focus to your active rotations. Your clinical hub is currently adjusted to your professional stage and interests.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full lg:w-auto">
            <Link
              to="/library"
              className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm transition-all text-sm shrink-0 w-full sm:w-max"
            >
              <BookOpen size={18} />
              Online Library
            </Link>
            <Link
              to="/assistant"
              className="flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-white text-[var(--primary)] rounded-xl font-semibold hover:shadow-md transition-all text-sm shrink-0 w-full sm:w-max"
            >
              <Bot size={18} />
              Clinical Guide Assistant
            </Link>
          </div>
        </div>
      </div>

      <>
          {/* Quick Search */}
          <div className="relative group z-30">
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
              placeholder="Search Knowledge Base, Guidelines, your notes, or ask a clinical question..."
              className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none text-[var(--text)] text-sm md:text-base shadow-sm transition-all backdrop-blur-md"
            />
            {searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Knowledge Base Results
                    </div>
                    {searchResults.map(res => (
                      <div 
                        key={res.id} 
                        onClick={() => {
                          if (res.storagePath) {
                            window.open(res.storagePath, '_blank');
                          }
                        }}
                        className="px-4 py-3 hover:bg-[var(--surface-dim)] cursor-pointer flex items-center gap-3 border-b border-[var(--border)] last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-[var(--text)] truncate">{res.title || res.originalName}</div>
                          {res.summary && <div className="text-xs text-[var(--text-muted)] truncate">{res.summary}</div>}
                        </div>
                        {res.aiProcessed && (
                           <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full shrink-0">
                             <Sparkles size={10} /> AI
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-[var(--text-muted)]">
                    No exact matches in the Knowledge Base.
                  </div>
                )}
                <div 
                   className="p-3 bg-[var(--primary)]/5 border-t border-[var(--border)] flex items-center justify-center gap-2 text-sm font-semibold text-[var(--primary)] cursor-pointer hover:bg-[var(--primary)]/10 transition-colors"
                   onClick={() => navigate('/assistant')}
                >
                  <Sparkles size={16} /> Open Clinical Support
                </div>
              </div>
            )}
          </div>

          <DailySpotlight />

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {/* Left Column (Main Content) */}
            <div className="md:col-span-2 xl:col-span-3 space-y-4 md:space-y-8">
              {/* Quick Actions */}
              <div>
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-semibold text-[var(--text)] text-base md:text-lg tracking-tight">
                    Quick Access Tools
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group shadow-sm backdrop-blur-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <span className="text-xs font-bold text-[var(--text)]">Care Plan Review</span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group shadow-sm backdrop-blur-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <span className="text-xs font-bold text-[var(--text)]">Knowledge Hub</span>
                  </Link>
                  <Link
                    to="/assistant"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group shadow-sm backdrop-blur-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Bot size={20} />
                    </div>
                    <span className="text-xs font-bold text-[var(--text)]">Ask Assistant</span>
                  </Link>
                </div>
              </div>

              {/* Continue Learning */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <BookOpen size={18} className="text-[var(--text-muted)]" />
                    Continue Learning
                  </h3>
                  <Link to="/knowledge" className="text-xs font-bold text-[var(--primary)] hover:underline">
                    Browse All
                  </Link>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="p-5 text-center text-sm text-[var(--text-muted)]">
                    <p>Explore clinical cases, drug monographs, and board exam prep materials.</p>
                    <Link to="/knowledge" className="text-[var(--primary)] font-semibold hover:underline inline-block mt-2">
                      Go to Education Hub
                    </Link>
                  </div>
                </div>
              </div>

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
                    {Array.from(new Set(userData.clinicalInterests || [])).map((interest) => {
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
            <div className="space-y-4 md:space-y-8">
              {/* Clinical Focus Profile & Preferences Adjuster */}
              {userData && (
                <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                  <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                    <button onClick={() => navigate('/settings')} className="font-semibold text-[var(--text)] flex items-center gap-2 hover:text-[var(--primary)] transition-colors cursor-pointer text-left">
                      <GraduationCap size={18} className="text-[var(--primary)]" />
                      Clinical Focus Profile
                    </button>
                    <button 
                      onClick={() => {
                        setPrefLevel(userData.academicLevel || 'Year 1: Basic Medical Sciences');
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
                        <p className="text-sm font-bold text-[var(--text)] mt-0.5">{userData.academicLevel || 'Year 1: Basic Medical Sciences'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1.5">Clinical Interests</p>
                        <div className="flex flex-wrap gap-1.5">
                          {userData.clinicalInterests && userData.clinicalInterests.length > 0 ? (
                            Array.from(new Set(userData.clinicalInterests)).map((interest) => (
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
                          className="w-full text-xs p-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[var(--primary)] outline-none cursor-pointer"
                        >
                          <option value="Year 1: Basic Medical Sciences">Year 1: Basic Medical Sciences</option>
                          <option value="Year 2: Foundational Pharmacology">Year 2: Foundational Pharmacology</option>
                          <option value="Year 3: Systems & Clinical Intro">Year 3: Systems Pharmacology &amp; Clinical Practice</option>
                          <option value="Year 4: Advanced Systems & ID">Year 4: Advanced Systems &amp; Infectious Diseases</option>
                          <option value="Year 5: Specialty &amp; Toxicology">Year 5: Specialty Therapeutics &amp; Clinical Practice</option>
                          <option value="Graduate / Clinical Pharmacist">Graduate / Healthcare Professional</option>
                        </select>
                      </div>
                      
                       <div>
                        <label className="text-xs font-bold text-[var(--text)] block mb-1">Clinical Systems &amp; Topics</label>
                        
                        {/* Interactive Search for Clinical Interests */}
                        <div className="space-y-2.5">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                            <input
                              type="text"
                              value={prefsSearchQuery}
                              onChange={(e) => setPrefsSearchQuery(e.target.value)}
                              placeholder="Search or type custom focus..."
                              className="w-full text-xs pl-8 pr-8 py-2 bg-[var(--surface)] border border-[var(--border)] focus:border-[var(--primary)] outline-none rounded-xl text-[var(--text)]"
                            />
                            {prefsSearchQuery && (
                              <button
                                type="button"
                                onClick={() => setPrefsSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] p-0.5 rounded-full hover:bg-[var(--surface-dim)]"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>

                          {/* Custom Topic Generator Prompt */}
                          {prefsSearchQuery.trim() && !(ALL_CLINICAL_SYSTEMS.some(s => s.toLowerCase() === prefsSearchQuery.trim().toLowerCase()) || prefTopics.some(t => t.toLowerCase() === prefsSearchQuery.trim().toLowerCase())) && (
                            <button
                              type="button"
                              onClick={() => {
                                const trimmed = prefsSearchQuery.trim();
                                const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                                setPrefTopics(prev => prev.includes(formatted) ? prev : [...prev, formatted]);
                                setPrefsSearchQuery('');
                              }}
                              className="w-full text-left p-2.5 bg-[var(--primary-container)]/10 border border-dashed border-[var(--primary)]/30 rounded-xl text-xs font-semibold text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <span className="flex items-center gap-1.5 min-w-0">
                                <PlusCircle size={14} className="shrink-0" />
                                <span className="truncate">Add custom: "{prefsSearchQuery.trim()}"</span>
                              </span>
                              <ChevronRight size={14} className="text-[var(--primary)] group-hover:translate-x-0.5 transition-transform shrink-0" />
                            </button>
                          )}

                          {/* Active Focus Badges */}
                          {prefTopics.length > 0 && (
                            <div className="flex flex-wrap gap-1 items-center p-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]/40 max-h-[100px] overflow-y-auto">
                              {Array.from(new Set(prefTopics)).map(topic => (
                                <span key={topic} className="inline-flex items-center gap-1 text-[10px] bg-[var(--primary-container)]/50 text-[var(--primary)] font-semibold px-2 py-0.5 rounded-lg border border-[var(--primary)]/10 animate-in zoom-in-95 duration-100">
                                  {topic}
                                  <button
                                    type="button"
                                    onClick={() => setPrefTopics(prev => prev.filter(t => t !== topic))}
                                    className="hover:bg-[var(--primary)]/20 p-0.5 rounded-full text-[var(--primary)] transition-colors cursor-pointer"
                                  >
                                    <X size={8} strokeWidth={3} />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Suggestions grid with matching */}
                          <div className="grid grid-cols-2 gap-1.5 pt-1 max-h-[150px] overflow-y-auto pr-1">
                            {Array.from(new Set([...ALL_CLINICAL_SYSTEMS, ...prefTopics]))
                              .filter(system => {
                                const q = prefsSearchQuery.toLowerCase();
                                return system.toLowerCase().includes(q);
                              })
                              .map((system) => {
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
                                    className={`px-2 py-1.5 rounded-lg border text-left text-[11px] font-medium transition-all cursor-pointer truncate ${
                                      isChecked 
                                        ? 'border-[var(--primary)] bg-[var(--primary-container)]/25 text-[var(--primary)] font-semibold' 
                                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]'
                                    }`}
                                  >
                                    {isChecked ? '✓ ' : ''}{system}
                                  </button>
                                );
                              })}
                          </div>
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
              {/* Quick Clinical References */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Activity size={18} className="text-[var(--text-muted)]" />
                    Quick Clinical References
                  </h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {[
                    { name: 'WHO Guidelines & Essential Medicines', url: 'https://www.who.int/publications' },
                    { name: 'Kenya MOH Clinical Guidelines', url: 'https://www.health.go.ke/resources/guidelines' },
                    { name: 'NICE Guidance (UK)', url: 'https://www.nice.org.uk/guidance' },
                    { name: 'Kenya Essential Medicines List', url: 'https://www.health.go.ke' },
                  ].map((ref) => (
                    <a
                      key={ref.name}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 flex items-center justify-between gap-3 hover:bg-[var(--surface-dim)] transition-colors group"
                    >
                      <span className="text-sm font-medium text-[var(--text)] truncate min-w-0">{ref.name}</span>
                      <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </>
    </div>
  );
}
