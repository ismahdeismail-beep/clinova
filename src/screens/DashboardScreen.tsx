import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Search,
  Bot,
  BookOpen,
  Stethoscope,
  Sparkles,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  Mail,
  MessageCircle,
  Handshake,
  Activity,
  Pill,
  TrendingUp,
  ClipboardCheck,
  Award,
  X,
  ChevronLeft,
  Clock,
  Send,
  Newspaper,
  Library,
  Users,
  BarChart3,
  Target,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ClinovaLogo from '../components/ClinovaLogo'
import DailySpotlight from '../components/DailySpotlight'
import { SearchService, type UnifiedSearchResult } from '../services/search.service'
import { loadBundledDrugs } from '../lib/lazyDrugData'
import { useDebounce } from '../hooks/useDebounce'
import { useContentStats, getFallbackDrugCount, FALLBACK_CASES } from '../hooks/useContentStats'
import { DAILY_READINGS as DAILY_ARTICLES } from '../data/dailyReadings'

const STUDY_TRACKS: Record<
  string,
  { title: string; subtitle: string; points: string[]; color: string; badge: string }
> = {
  Cardiology: {
    title: 'Cardiovascular Therapeutics (CVS)',
    subtitle: 'High-yield guidelines & active clinical pearls',
    badge: 'CVS',
    color: 'border-rose-500/20 bg-rose-500/[0.03]',
    points: [
      'Guideline check: Heart Failure with Reduced Ejection Fraction (HFrEF) mandates Quadruple Therapy (ARNI/ACEi/ARB, Beta-blocker, MRA, SGLT2i).',
      'Kenya Drug Index check: Verapamil is contraindicated in HFrEF or accessory bypass tracts.',
      'Dosage pearl: Target dose for Sacubitril/Valsartan is 97/103 mg twice daily as tolerated.',
    ],
  },
  Nephrology: {
    title: 'Nephrology & Renal Staging',
    subtitle: 'Dose adjustments & electrolyte management',
    badge: 'Renal',
    color: 'border-sky-500/20 bg-sky-500/[0.03]',
    points: [
      'Guideline check: Calculate GFR using CKD-EPI (2021) for staging; Cockcroft-Gault for drug dosing.',
      'Kenya Drug Index check: Avoid Metformin if eGFR drops below 30 mL/min/1.73m².',
      'Dosage pearl: Enoxaparin prophylactic dose is 30 mg SC once daily if CrCl < 30 mL/min.',
    ],
  },
  Gastrointestinal: {
    title: 'Gastroenterology (GI Track)',
    subtitle: 'Acid-peptic diseases & hepatic modifications',
    badge: 'GI',
    color: 'border-amber-500/20 bg-amber-500/[0.03]',
    points: [
      'Guideline check: H. pylori eradication requires Triple/Quadruple therapy for 14 days.',
      'Kenya Drug Index check: Reduce Paracetamol limit to 2g/24 hours in stable liver cirrhosis.',
      'Dosage pearl: Omeprazole taken 30-60 minutes before the first meal of the day.',
    ],
  },
  'Infectious Disease': {
    title: 'Infectious Disease & Antimicrobials',
    subtitle: 'Stewardship, pneumonia & local protocols',
    badge: 'ID',
    color: 'border-emerald-500/20 bg-emerald-500/[0.03]',
    points: [
      'Guideline check: For CURB-65 ≥ 2, initiate Ceftriaxone + Azithromycin/Clarithromycin.',
      'Kenya Drug Index check: Avoid Ceftriaxone in neonates receiving IV Calcium solutions.',
      'Dosage pearl: Vancomycin trough targets are 15-20 mcg/mL for severe MRSA infections.',
    ],
  },
  Endocrinology: {
    title: 'Endocrine & Metabolic Regimens',
    subtitle: 'Insulin dosing & glycemic targets',
    badge: 'Endo',
    color: 'border-purple-500/20 bg-purple-500/[0.03]',
    points: [
      'Guideline check: ADA/EASD recommends SGLT2i or GLP-1 RA first-line for T2DM with high CV risk.',
      'Kenya Drug Index check: Check thyroid panel before initiating Amiodarone therapy.',
      'Dosage pearl: Rapid-acting insulin analogues within 15 minutes of meals.',
    ],
  },
  Neurology: {
    title: 'Central Nervous System Therapeutics',
    subtitle: 'Seizure control & stroke prevention',
    badge: 'CNS',
    color: 'border-indigo-500/20 bg-indigo-500/[0.03]',
    points: [
      'First-line for focal seizures: Lamotrigine or Levetiracetam; avoid Valproic Acid in women of childbearing age.',
      'High-risk interaction: Phenytoin drastically reduces DOAC levels.',
      'Carbamazepine requires slow titration to minimize dizziness and ataxia.',
    ],
  },
}

const QUICK_LINKS = [
  {
    to: '/knowledge',
    icon: BookOpen,
    label: 'Education Hub',
    desc: 'Exam, therapeutics, books, cases',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    to: '/knowledge/exam/board-exam',
    icon: Award,
    label: 'Board Exam',
    desc: 'Dedicated mock papers & revision',
    gradient: 'from-violet-500 to-violet-600',
  },
  {
    to: '/knowledge/exam/prep',
    icon: GraduationCap,
    label: 'Exam Prep',
    desc: 'Mock papers in 30/40/30 format',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    to: '/cases',
    icon: Stethoscope,
    label: 'Clinical Cases',
    desc: 'Real-world scenarios across 17 therapeutic areas',
    gradient: 'from-sky-500 to-sky-600',
  },
  {
    to: '/care-plan',
    icon: ClipboardCheck,
    label: 'Care Plan',
    desc: 'NANDA nursing care plans across 19 specialties',
    gradient: 'from-teal-500 to-teal-600',
  },
  {
    to: '/drugs',
    icon: Pill,
    label: 'Drug Index',
    desc: 'Comprehensive monographs with dosing & interactions',
    gradient: 'from-rose-500 to-rose-600',
  },
  {
    to: '/assistant',
    icon: Bot,
    label: 'Clinova Support',
    desc: 'Regimen review & drug Q&A',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    to: '/library',
    icon: Library,
    label: 'Online Library',
    desc: 'Clinical reference books & textbooks',
    gradient: 'from-cyan-500 to-cyan-600',
  },
]

const COMING_SOON_FEATURES = [
  {
    icon: Users,
    label: 'InContact',
    desc: 'Connect with fellow pharmacy students, clinicians & mentors across Kenya.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Newspaper,
    label: 'Clinova Info',
    desc: 'Stay updated with the latest clinical guidelines, pharmacovigilance alerts & health news.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Send,
    label: 'Add Research',
    desc: 'Publish your clinical research, case reports & pharmacy articles. Have work to share? Send it to us — we will feature it.',
    gradient: 'from-rose-500 to-orange-500',
    action: 'mailto:ismahdeismail@gmail.com?subject=Clinova%20Research%20Submission',
  },
]

const RESULT_ICONS: Record<string, React.ReactNode> = {
  drug: <Pill size={14} className="text-blue-500" />,
  disease: <Activity size={14} className="text-rose-500" />,
  case: <Stethoscope size={14} className="text-emerald-500" />,
}

const RESULT_ROUTES: Record<string, string> = {
  drug: '/drug-index',
  disease: '/knowledge',
  case: '/cases',
}

export default function DashboardScreen() {
  const navigate = useNavigate()
  const { userData } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [searchResults, setSearchResults] = useState<UnifiedSearchResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // First-time user detection
  const [isFirstTime, setIsFirstTime] = useState(false)
  useEffect(() => {
    if (!userData?.id) return
    const key = `clinova_welcomed_${userData.id}`
    const hasVisited = localStorage.getItem(key)
    if (!hasVisited) {
      setIsFirstTime(true)
      localStorage.setItem(key, '1')
    }
  }, [userData?.id])

  // ── Stable stats (single source of truth via useContentStats) ──
  const {
    drugCount,
    caseCount,
    areaCount,
    carePlanCount,
    loading: statsLoading,
  } = useContentStats()

  // Featured article index (rotates daily)
  const [currentArticleIdx, setCurrentArticleIdx] = useState(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    )
    return dayOfYear % DAILY_ARTICLES.length
  })

  // Fetch search results when debounced value changes
  useEffect(() => {
    const q = debouncedSearch.trim()
    if (q.length < 2) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }
    setSearchLoading(true)
    SearchService.unified(q, 8).then((res) => {
      setSearchResults(res)
      setSearchLoading(false)
      setShowResults(true)
    })
  }, [debouncedSearch])

  // Close results dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    loadBundledDrugs().catch(console.error)
  }, [])

  const handleSearchSelect = useCallback(
    (result: UnifiedSearchResult) => {
      setShowResults(false)
      setSearchQuery('')
      const route = RESULT_ROUTES[result.result_type] || '/knowledge'
      const params = new URLSearchParams()
      if (result.result_type === 'drug') {
        params.set('q', result.title)
        navigate(`${route}?${params.toString()}`)
      } else {
        navigate(route)
      }
    },
    [navigate],
  )

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearchSelect(searchResults[0])
    }
    if (e.key === 'Escape') {
      setShowResults(false)
    }
  }

  const currentArticle = DAILY_ARTICLES[currentArticleIdx]
  const ArticleIcon = currentArticle.icon

  // Auto-swipe Today's Reading every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIdx((prev) => (prev + 1) % DAILY_ARTICLES.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-full 2xl:max-w-7xl mx-auto space-y-6 md:space-y-8 pb-24">
      {/* ── Welcome Banner ── */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-indigo-700 p-6 md:p-8 text-white overflow-hidden shadow-lg">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/[0.07] blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/[0.05] blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md">
              <ClinovaLogo size={28} variant="light" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-1">
                {isFirstTime
                  ? `Welcome to Clinova, ${userData?.name || 'Student'}`
                  : `Welcome back, ${userData?.name || 'Student'}`}
              </h1>
              <p className="text-white/80 text-sm max-w-xl leading-relaxed">
                {isFirstTime
                  ? 'Your all-in-one clinical pharmacy & nursing companion — explore cases, care plans, practice exams, and master therapeutics.'
                  : 'Your clinical pharmacy & nursing companion — study cases, review care plans, and master therapeutics.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/cases"
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-[var(--primary)] rounded-xl font-semibold hover:shadow-md transition-all text-sm"
            >
              <Stethoscope size={16} />
              Clinical Cases
            </Link>
            <Link
              to="/care-plan"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl font-semibold backdrop-blur-sm transition-all text-sm"
            >
              <ClipboardCheck size={16} />
              Care Plans
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            icon: Pill,
            label: 'Drug Monographs',
            value: String(drugCount ?? getFallbackDrugCount()),
            color: 'text-blue-600',
            bg: 'bg-blue-500/10',
          },
          {
            icon: BarChart3,
            label: 'Clinical Cases',
            value: String(caseCount ?? FALLBACK_CASES),
            color: 'text-emerald-600',
            bg: 'bg-emerald-500/10',
          },
          {
            icon: ClipboardCheck,
            label: 'Care Plans',
            value: String(carePlanCount),
            color: 'text-teal-600',
            bg: 'bg-teal-500/10',
          },
          {
            icon: TrendingUp,
            label: 'Therapeutic Areas',
            value: String(areaCount),
            color: 'text-rose-600',
            bg: 'bg-rose-500/10',
          },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={20} className={stat.color} />
              </div>
              <div>
                {statsLoading ? (
                  <span
                    className="block w-12 h-6 rounded bg-[var(--surface-dim)] animate-pulse"
                    aria-hidden
                  />
                ) : (
                  <p className="text-lg font-extrabold tracking-tight text-[var(--text)]">
                    {stat.value}
                  </p>
                )}
                <p className="text-[11px] text-[var(--text-muted)] font-medium">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Quick Action Grid ── */}
      <div>
        <h2 className="text-base font-bold text-[var(--text)] mb-3 flex items-center gap-2">
          <Target size={16} className="text-[var(--primary)]" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((link, idx) => {
            const Icon = link.icon
            return (
              <Link
                key={idx}
                to={link.to}
                className="group flex flex-col items-center text-center p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-xs font-bold text-[var(--text)]">{link.label}</span>
                <span className="text-[10px] text-[var(--text-muted)] leading-tight mt-0.5 line-clamp-2">
                  {link.desc}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Global Search ── */}
      <div ref={searchRef} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
          <Search
            size={18}
            className="text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors"
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => {
            if (searchResults.length > 0) setShowResults(true)
          }}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search drugs, diseases, clinical cases..."
          className="w-full pl-11 pr-10 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none text-[var(--text)] text-sm shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSearchResults([])
              setShowResults(false)
            }}
            className="absolute inset-y-0 right-4 flex items-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors z-10 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}

        {/* Results dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden">
            {searchLoading ? (
              <div className="p-4 text-center text-sm text-[var(--text-muted)]">
                <span className="animate-pulse">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="divide-y divide-[var(--border)]/50 max-h-80 overflow-y-auto">
                {searchResults.map((r, i) => (
                  <button
                    key={`${r.result_type}-${r.id}-${i}`}
                    onClick={() => handleSearchSelect(r)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-dim)] transition-colors text-left cursor-pointer"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[var(--surface-dim)] flex items-center justify-center shrink-0">
                      {RESULT_ICONS[r.result_type]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[var(--text)] truncate">{r.title}</p>
                      {r.subtitle && (
                        <p className="text-[11px] text-[var(--text-muted)] truncate">
                          {r.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[var(--surface-dim)] text-[var(--text-muted)] shrink-0">
                      {r.result_type}
                    </span>
                  </button>
                ))}
              </div>
            ) : debouncedSearch.trim().length >= 2 ? (
              <div className="p-6 text-center">
                <Search size={24} className="mx-auto text-[var(--text-muted)]/40 mb-2" />
                <p className="text-sm text-[var(--text-muted)]">No results found</p>
                <p className="text-xs text-[var(--text-muted)]/60 mt-1">
                  Try a different search term
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* ── Daily Spotlight ── */}
      <DailySpotlight />

      {/* ── Featured Article ── */}
      <div
        className={`rounded-xl border ${currentArticle.theme.border} bg-[var(--surface)] shadow-sm overflow-hidden`}
      >
        <div
          className={`p-4 sm:p-5 border-b ${currentArticle.theme.border} bg-gradient-to-r ${currentArticle.theme.chip} flex items-center justify-between`}
        >
          <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentArticle.theme.gradient} flex items-center justify-center shadow-sm`}
            >
              <ArticleIcon size={14} className="text-white" />
            </span>
            Today's Reading
          </h3>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setCurrentArticleIdx(
                  (prev) => (prev - 1 + DAILY_ARTICLES.length) % DAILY_ARTICLES.length,
                )
              }
              className="p-1 rounded-lg hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              aria-label="Previous reading"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentArticleIdx((prev) => (prev + 1) % DAILY_ARTICLES.length)}
              className="p-1 rounded-lg hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              aria-label="Next reading"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentArticle.theme.chip} uppercase tracking-wider`}
            >
              {currentArticle.badge}
            </span>
            <span className={`text-[10px] font-bold ${currentArticle.theme.text}`}>
              {currentArticle.category}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">·</span>
            <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
              <Clock size={10} />
              {currentArticle.readTime}
            </span>
          </div>
          <h4 className="font-bold text-[var(--text)] text-sm sm:text-base mb-1.5">
            {currentArticle.title}
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-3">
            {currentArticle.summary}
          </p>
          <Link
            to={`/reading/${currentArticle.id}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${currentArticle.theme.button} text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm`}
          >
            Read More <ArrowRight size={12} />
          </Link>
        </div>
        {/* Auto-swipe indicator */}
        <div className="flex justify-center gap-1.5 mt-3 pb-4">
          {DAILY_ARTICLES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentArticleIdx(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${idx === currentArticleIdx ? `${currentArticle.theme.dot} w-4` : 'bg-[var(--border)]'}`}
            />
          ))}
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Tracks */}
          {userData?.clinicalInterests && userData.clinicalInterests.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[var(--text)] flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--primary)]" />
                  Your Study Tracks
                </h2>
              </div>
              <div className="space-y-3">
                {Array.from(new Set(userData.clinicalInterests)).map((interest) => {
                  const track = STUDY_TRACKS[interest]
                  if (!track) return null
                  return (
                    <div
                      key={interest}
                      className={`p-5 rounded-xl border ${track.color} bg-[var(--surface)] shadow-sm hover:shadow-md transition-all`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] uppercase tracking-wider shrink-0">
                            {track.badge}
                          </span>
                          <h3 className="font-bold text-sm text-[var(--text)] truncate">
                            {track.title}
                          </h3>
                        </div>
                        <span className="text-[11px] text-[var(--text-muted)] italic hidden sm:block shrink-0">
                          {track.subtitle}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {track.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/60 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Learning Path progress hint */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <h3 className="font-bold text-[var(--text)] flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-[var(--primary)]" />
              Continue Learning
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Pick up where you left off — dive into clinical cases, review disease monographs,
              attempt the next exam paper, or explore nursing care plans in your study plan.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link
                to="/cases"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
              >
                <Stethoscope size={14} /> Browse Cases
              </Link>
              <Link
                to="/knowledge/exam/prep"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
              >
                <GraduationCap size={14} /> Exam Prep
              </Link>
              <Link
                to="/care-plan"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
              >
                <ClipboardCheck size={14} /> Care Plan
              </Link>
              <Link
                to="/knowledge"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
              >
                <BookOpen size={14} /> Education Hub
              </Link>
              <Link
                to="/drugs"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
              >
                <Pill size={14} /> Drug Index
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column — 1/3 */}
        <div className="space-y-4">
          {/* Coming Soon */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <Sparkles size={15} className="text-amber-500" />
                Coming Soon
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-1">
                Exciting features on the way — stay tuned.
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {COMING_SOON_FEATURES.map((feature) => {
                const Icon = feature.icon
                const Wrapper: React.FC<{ children: React.ReactNode }> = feature.action
                  ? ({ children }) => (
                      <a
                        href={feature.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {children}
                      </a>
                    )
                  : ({ children }) => <div>{children}</div>
                return (
                  <Wrapper key={feature.label}>
                    <div className="p-3.5 flex items-start gap-3 hover:bg-[var(--surface-dim)] transition-colors">
                      <span
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        <Icon size={14} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[var(--text)]">{feature.label}</p>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 uppercase tracking-wider">
                            Soon
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5">
                          {feature.desc}
                        </p>
                        {feature.action && (
                          <p className="text-[10px] text-[var(--primary)] font-semibold mt-1 flex items-center gap-1">
                            <Send size={9} /> Submit your work
                          </p>
                        )}
                      </div>
                    </div>
                  </Wrapper>
                )
              })}
            </div>
          </div>

          {/* Contact & Feedback */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <MessageCircle size={15} className="text-[var(--primary)]" />
                Contact & Feedback
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-1">
                Suggestions, issues, or collaboration opportunities — we would love to hear from
                you.
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              <a
                href="mailto:ismahdeismail@gmail.com?subject=Clinova%20Feedback"
                className="p-3.5 flex items-center gap-3 hover:bg-[var(--surface-dim)] transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Mail size={14} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider">
                    Email
                  </p>
                  <p className="text-xs font-medium text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors">
                    ismahdeismail@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="https://wa.me/254115516281"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 flex items-center gap-3 hover:bg-[var(--surface-dim)] transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle size={14} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] text-[var(--text-muted)] uppercase font-semibold tracking-wider">
                    WhatsApp
                  </p>
                  <p className="text-xs font-medium text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors">
                    +254 115 516 281
                  </p>
                </div>
              </a>
              <div className="p-3.5 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Handshake size={14} />
                </span>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Open to partnerships, collaboration, and investment opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Clinical References */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <Activity size={15} className="text-[var(--text-muted)]" />
                Clinical References
              </h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {[
                {
                  name: 'WHO Guidelines & Essential Medicines',
                  url: 'https://www.who.int/publications',
                },
                {
                  name: 'Kenya MOH Clinical Guidelines',
                  url: 'https://www.health.go.ke/resources/guidelines',
                },
                { name: 'NICE Guidance (UK)', url: 'https://www.nice.org.uk/guidance' },
                { name: 'Kenya Essential Medicines List', url: 'https://www.health.go.ke' },
              ].map((ref) => (
                <a
                  key={ref.name}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 flex items-center justify-between gap-3 hover:bg-[var(--surface-dim)] transition-colors group"
                >
                  <span className="text-xs font-medium text-[var(--text)] truncate">
                    {ref.name}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
