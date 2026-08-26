import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  Factory,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  FlaskConical,
  Shield,
  Truck,
  HeartPulse,
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
  Building2,
  Loader2,
  BookOpen,
  Package,
  Pill,
  Clock,
  FileText,
  Scale,
  AlertTriangle,
  Bell,
  ShoppingCart,
  Warehouse,
  Landmark,
  GraduationCap,
  CheckCircle,
  Target,
  Lightbulb,
  BookMarked,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import type {
  PharmaceuticalTopic,
  IndustryKnowledgeEntry,
  IndustryTerm,
  KenyanManufacturer,
  IndustryQuizQuestion,
  KemlCrossReference,
} from '../types/knowledge'

type Tab = 'topics' | 'glossary' | 'manufacturers' | 'quiz' | 'keml'

const TOPIC_ICONS: Record<string, typeof Factory> = {
  Factory,
  FlaskConical,
  CircleDot: Pill,
  Pill,
  Droplets: Truck,
  Droplet: Truck,
  Paintbrush: Package,
  Syringe: Shield,
  Settings: Factory,
  ArrowDownUp: Package,
  ArrowDown: Package,
  ShieldCheck: Shield,
  TestTube: FlaskConical,
  CheckCircle: Award,
  Clock,
  Package,
  Award,
  Scale,
  FileText,
  ClipboardCheck: FileText,
  HeartPulse,
  AlertTriangle,
  Bell,
  Truck,
  ShoppingCart,
  Warehouse,
  MapPin,
  Building2,
  Landmark,
  Briefcase,
  GraduationCap,
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; icon: string }> =
  {
    'Manufacturing & Formulation': {
      bg: 'bg-blue-500/8',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-400/30',
      icon: 'text-blue-500',
    },
    'Regulatory Affairs': {
      bg: 'bg-purple-500/8',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-400/30',
      icon: 'text-purple-500',
    },
    Pharmacovigilance: {
      bg: 'bg-red-500/8',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-400/30',
      icon: 'text-red-500',
    },
    'Supply Chain': {
      bg: 'bg-emerald-500/8',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-400/30',
      icon: 'text-emerald-500',
    },
    'Local Kenyan Industry': {
      bg: 'bg-amber-500/8',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-400/30',
      icon: 'text-amber-500',
    },
    'Careers & Professional Development': {
      bg: 'bg-cyan-500/8',
      text: 'text-cyan-700 dark:text-cyan-400',
      border: 'border-cyan-400/30',
      icon: 'text-cyan-500',
    },
    Quality: {
      bg: 'bg-teal-500/8',
      text: 'text-teal-700 dark:text-teal-400',
      border: 'border-teal-400/30',
      icon: 'text-teal-500',
    },
  }

function getCategoryColors(categoryName: string) {
  return (
    CATEGORY_COLORS[categoryName] || {
      bg: 'bg-gray-500/8',
      text: 'text-gray-700 dark:text-gray-400',
      border: 'border-gray-400/30',
      icon: 'text-gray-500',
    }
  )
}

const SECTION_STYLES: Record<
  string,
  { color: string; border: string; icon: React.ElementType; label: string }
> = {
  overview: {
    color: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-l-blue-400',
    icon: BookOpen,
    label: 'Overview',
  },
  key_concepts: {
    color: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-l-violet-400',
    icon: Lightbulb,
    label: 'Key Concepts',
  },
  key_steps: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: ClipboardCheck,
    label: 'Key Steps',
  },
  process_steps: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: ClipboardCheck,
    label: 'Process Steps',
  },
  workflow: {
    color: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-l-orange-400',
    icon: ArrowRight,
    label: 'Workflow',
  },
  components: {
    color: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-l-emerald-400',
    icon: Package,
    label: 'Components',
  },
  equipment: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: SettingsIcon,
    label: 'Equipment',
  },
  materials: {
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-l-cyan-400',
    icon: FlaskConical,
    label: 'Materials',
  },
  raw_materials: {
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-l-cyan-400',
    icon: FlaskConical,
    label: 'Raw Materials',
  },
  excipients: {
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-l-cyan-400',
    icon: FlaskConical,
    label: 'Excipients',
  },
  forms: {
    color: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-l-pink-400',
    icon: Pill,
    label: 'Dosage Forms',
  },
  formulation_types: {
    color: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-l-pink-400',
    icon: Pill,
    label: 'Formulation Types',
  },
  types: {
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-l-indigo-400',
    icon: Target,
    label: 'Types',
  },
  methods: {
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-l-indigo-400',
    icon: Target,
    label: 'Methods',
  },
  quality_control: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: ShieldCheck,
    label: 'Quality Control',
  },
  quality_assurance: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: ShieldCheck,
    label: 'Quality Assurance',
  },
  standards: {
    color: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-l-rose-400',
    icon: Award,
    label: 'Standards',
  },
  regulations: {
    color: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-l-purple-400',
    icon: Scale,
    label: 'Regulations',
  },
  regulatory_requirements: {
    color: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-l-purple-400',
    icon: Scale,
    label: 'Regulatory Requirements',
  },
  documentation: {
    color: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-l-sky-400',
    icon: FileText,
    label: 'Documentation',
  },
  key_documents: {
    color: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-l-sky-400',
    icon: FileText,
    label: 'Key Documents',
  },
  benefits: {
    color: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-l-green-400',
    icon: CheckCircle,
    label: 'Benefits',
  },
  advantages: {
    color: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-l-green-400',
    icon: CheckCircle,
    label: 'Advantages',
  },
  challenges: {
    color: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-l-red-400',
    icon: AlertTriangle,
    label: 'Challenges',
  },
  limitations: {
    color: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-l-red-400',
    icon: AlertTriangle,
    label: 'Limitations',
  },
  safety: {
    color: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-l-red-400',
    icon: Shield,
    label: 'Safety',
  },
  preconditions: {
    color: 'bg-slate-50 dark:bg-slate-950/30',
    border: 'border-l-slate-400',
    icon: CheckCircle,
    label: 'Preconditions',
  },
  steps: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: ClipboardCheck,
    label: 'Steps',
  },
  testing_methods: {
    color: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-l-violet-400',
    icon: FlaskConical,
    label: 'Testing Methods',
  },
  parameters: {
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-l-indigo-400',
    icon: Target,
    label: 'Parameters',
  },
  routes: {
    color: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-l-blue-400',
    icon: Truck,
    label: 'Routes',
  },
  systems: {
    color: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-l-emerald-400',
    icon: Warehouse,
    label: 'Systems',
  },
  reporting: {
    color: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-l-orange-400',
    icon: Bell,
    label: 'Reporting',
  },
  career_paths: {
    color: 'bg-cyan-50 dark:bg-cyan-950/30',
    border: 'border-l-cyan-400',
    icon: Briefcase,
    label: 'Career Paths',
  },
  skills_required: {
    color: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-l-violet-400',
    icon: GraduationCap,
    label: 'Skills Required',
  },
  certifications: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: Award,
    label: 'Certifications',
  },
  opportunities: {
    color: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-l-green-400',
    icon: Sparkles,
    label: 'Opportunities',
  },
  market: {
    color: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-l-emerald-400',
    icon: ShoppingCart,
    label: 'Market',
  },
  kenya_context: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: MapPin,
    label: 'Kenya Context',
  },
  local_context: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: MapPin,
    label: 'Local Context',
  },
  recent_reforms: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: Sparkles,
    label: 'Recent Reforms',
  },
  reforms_2025_2026: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: Sparkles,
    label: '2025-2026 Reforms',
  },
  key_reforms: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: Sparkles,
    label: 'Key Reforms',
  },
  who_framework: {
    color: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-l-blue-400',
    icon: Globe,
    label: 'WHO Framework',
  },
  global_standards: {
    color: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-l-blue-400',
    icon: Globe,
    label: 'Global Standards',
  },
  applications: {
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-l-indigo-400',
    icon: Lightbulb,
    label: 'Applications',
  },
  requirements: {
    color: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-l-rose-400',
    icon: CheckCircle,
    label: 'Requirements',
  },
  assessment: {
    color: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-l-violet-400',
    icon: Target,
    label: 'Assessment',
  },
  process: {
    color: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-l-amber-400',
    icon: ClipboardCheck,
    label: 'Process',
  },
  monitoring: {
    color: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-l-emerald-400',
    icon: HeartPulse,
    label: 'Monitoring',
  },
  reporting_systems: {
    color: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-l-orange-400',
    icon: Bell,
    label: 'Reporting Systems',
  },
  classification: {
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-l-indigo-400',
    icon: Target,
    label: 'Classification',
  },
  classifications: {
    color: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-l-indigo-400',
    icon: Target,
    label: 'Classifications',
  },
  procurement: {
    color: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-l-emerald-400',
    icon: ShoppingCart,
    label: 'Procurement',
  },
  distribution: {
    color: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-l-blue-400',
    icon: Truck,
    label: 'Distribution',
  },
  storage: {
    color: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-l-teal-400',
    icon: Warehouse,
    label: 'Storage',
  },
  cold_chain: {
    color: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-l-sky-400',
    icon: Truck,
    label: 'Cold Chain',
  },
  essential_medicines: {
    color: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-l-green-400',
    icon: Pill,
    label: 'Essential Medicines',
  },
  counterfeit_detection: {
    color: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-l-red-400',
    icon: AlertTriangle,
    label: 'Counterfeit Detection',
  },
  technology: {
    color: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-l-violet-400',
    icon: Lightbulb,
    label: 'Technology',
  },
  innovation: {
    color: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-l-violet-400',
    icon: Sparkles,
    label: 'Innovation',
  },
}

function getSectionStyle(key: string) {
  const normalized = key.toLowerCase().replace(/[\s-]+/g, '_')
  return (
    SECTION_STYLES[normalized] || {
      color: 'bg-gray-50 dark:bg-gray-950/30',
      border: 'border-l-gray-400',
      icon: FileText,
      label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    }
  )
}

function formatKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function renderContentValue(value: unknown): React.ReactNode {
  if (typeof value === 'string') {
    return <p className="leading-relaxed">{value}</p>
  }
  if (Array.isArray(value)) {
    return (
      <ul className="space-y-1.5">
        {value.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
            <span>{String(item)}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (value && typeof value === 'object') {
    return (
      <div className="space-y-2">
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <div key={k}>
            <span className="font-semibold text-[var(--text)]">{formatKey(k)}: </span>
            <span>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
          </div>
        ))}
      </div>
    )
  }
  return <p>{String(value)}</p>
}

// ── Globe icon (not in lucide import) ─────────────────────
function Globe({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

function SettingsIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function getIcon(iconName: string | null): typeof Factory {
  if (!iconName) return Factory
  return TOPIC_ICONS[iconName] || Factory
}

export default function IndustryHubScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('topics')
  const [searchQuery, setSearchQuery] = useState('')
  const [topics, setTopics] = useState<PharmaceuticalTopic[]>([])
  const [terms, setTerms] = useState<IndustryTerm[]>([])
  const [manufacturers, setManufacturers] = useState<KenyanManufacturer[]>([])
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<PharmaceuticalTopic | null>(null)
  const [topicEntries, setTopicEntries] = useState<IndustryKnowledgeEntry[]>([])
  const [loadingEntries, setLoadingEntries] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [quizQuestions, setQuizQuestions] = useState<IndustryQuizQuestion[]>([])
  const [quizCategories, setQuizCategories] = useState<string[]>([])
  const [selectedQuizCategory, setSelectedQuizCategory] = useState<string>('All')
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizSelected, setQuizSelected] = useState<number | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [kemlRefs, setKemlRefs] = useState<KemlCrossReference[]>([])
  const [kemlSearch, setKemlSearch] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [t, te, m, quiz, cats, keml] = await Promise.all([
          IndustryKnowledgeService.getTopicTree(),
          IndustryKnowledgeService.searchTerms('', 100),
          IndustryKnowledgeService.getManufacturers(),
          IndustryKnowledgeService.getQuizQuestions(),
          IndustryKnowledgeService.getQuizCategories(),
          IndustryKnowledgeService.getKemlReferences(),
        ])
        if (!cancelled) {
          setTopics(t)
          setTerms(te)
          setManufacturers(m)
          setQuizQuestions(quiz)
          setQuizCategories(cats)
          setKemlRefs(keml)
        }
      } catch {
        /* empty */
      } finally {
        if (!cancelled) setInitialLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleTopicClick = useCallback(async (topic: PharmaceuticalTopic) => {
    setSelectedTopic(topic)
    setLoadingEntries(true)
    try {
      const entries = await IndustryKnowledgeService.getByTopic(topic.slug, { limit: 20 })
      setTopicEntries(entries)
    } catch {
      setTopicEntries([])
    } finally {
      setLoadingEntries(false)
    }
  }, [])

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return terms
    const q = searchQuery.toLowerCase()
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.aliases.some((a) => a.toLowerCase().includes(q)),
    )
  }, [terms, searchQuery])

  const filteredManufacturers = useMemo(() => {
    if (!searchQuery.trim()) return manufacturers
    const q = searchQuery.toLowerCase()
    return manufacturers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.location && m.location.toLowerCase().includes(q)) ||
        m.capabilities.some((c) => c.toLowerCase().includes(q)) ||
        (m.products_description && m.products_description.toLowerCase().includes(q)),
    )
  }, [manufacturers, searchQuery])

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-[var(--text-muted)]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading pharmaceutical industry data...
      </div>
    )
  }

  // ── Topic Detail View ──────────────────────────────────────
  if (selectedTopic) {
    const parentCategory = topics.find((t) =>
      t.children?.some((c) => c.id === selectedTopic.id || c.slug === selectedTopic.slug),
    )
    const catColors = getCategoryColors(parentCategory?.name || selectedTopic.name)

    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <button
          onClick={() => {
            setSelectedTopic(null)
            setTopicEntries([])
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline mb-4 cursor-pointer"
        >
          <ChevronLeft size={14} />
          Back to Topics
        </button>

        {/* Topic Header */}
        <div className={`rounded-2xl border ${catColors.border} ${catColors.bg} p-5 sm:p-6 mb-6`}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-xl ${catColors.bg} border ${catColors.border} flex items-center justify-center`}
            >
              {React.createElement(getIcon(selectedTopic.icon), {
                size: 20,
                className: catColors.icon,
              })}
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--text)]">{selectedTopic.name}</h1>
              {parentCategory && (
                <p className={`text-[11px] font-medium ${catColors.text}`}>{parentCategory.name}</p>
              )}
            </div>
          </div>
          {selectedTopic.description && (
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {selectedTopic.description}
            </p>
          )}
        </div>

        {/* Sub-topics navigation (P13) */}
        {selectedTopic.children && selectedTopic.children.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-3">
              Sub-topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedTopic.children.map((child) => {
                const ChildIcon = getIcon(child.icon)
                return (
                  <button
                    key={child.id}
                    onClick={() => handleTopicClick(child)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border ${catColors.border} ${catColors.bg} hover:brightness-95 transition-all text-left cursor-pointer`}
                  >
                    <ChildIcon size={14} className={catColors.icon} />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-[var(--text)]">{child.name}</span>
                      {child.description && (
                        <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                          {child.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={12} className="text-[var(--text-muted)] shrink-0" />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* KEML Cross-References (P12) */}
        {(() => {
          const kemlDrug = kemlRefs.find(
            (k) =>
              topicEntries.some((e) =>
                e.content?.kenyan_context?.toLowerCase().includes(k.drug_name.toLowerCase()),
              ) || selectedTopic.slug.includes('essential'),
          )
          if (!kemlDrug) return null
          return (
            <div className="mb-6 rounded-2xl border border-emerald-300/30 dark:border-emerald-700/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Pill size={16} className="text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-[var(--text)]">KEML Status</h3>
              </div>
              <div className="space-y-2 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                  <span>
                    Listed on <span className="font-semibold">Kenya Essential Medicines List</span>{' '}
                    — {kemlDrug.keml_tier} tier
                  </span>
                </div>
                {kemlDrug.who_eml_listed && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                    <span>
                      Also listed on <span className="font-semibold">WHO Model EML</span>
                    </span>
                  </div>
                )}
                {kemlDrug.local_manufacturers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Building2 size={12} className="text-emerald-500 shrink-0" />
                    <span>Locally manufactured by: {kemlDrug.local_manufacturers.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {loadingEntries ? (
          <div className="flex items-center justify-center py-12 text-[var(--text-muted)]">
            <Loader2 size={18} className="animate-spin mr-2" />
            Loading content...
          </div>
        ) : topicEntries.length > 0 ? (
          <div className="space-y-5">
            {topicEntries.map((entry) => {
              const contentObj =
                typeof entry.content === 'object' && entry.content !== null
                  ? (entry.content as Record<string, unknown>)
                  : null
              const contentEntries = contentObj ? Object.entries(contentObj) : []

              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
                >
                  {/* Entry Header */}
                  <div className="px-4 sm:px-5 py-4 border-b border-[var(--border)]/60">
                    <div className="flex items-start justify-between gap-2 sm:gap-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-[var(--text)] break-words">
                          {entry.title}
                        </h3>
                        {entry.source && (
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <BookMarked size={11} className="text-[var(--success)] shrink-0" />
                            <span className="text-[10px] font-medium text-[var(--success)] break-words">
                              {entry.source}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            entry.difficulty === 'basic'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300/40 dark:border-emerald-700/40'
                              : entry.difficulty === 'intermediate'
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300/40 dark:border-amber-700/40'
                                : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-300/40 dark:border-red-700/40'
                          }`}
                        >
                          {entry.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Sections */}
                  {contentEntries.length > 0 && (
                    <div className="p-4 sm:p-5 space-y-3">
                      {contentEntries.map(([key, value]) => {
                        const style = getSectionStyle(key)
                        const SectionIcon = style.icon

                        return (
                          <div
                            key={key}
                            className={`rounded-xl border-l-4 ${style.border} ${style.color} p-4`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <SectionIcon size={14} className={catColors.icon} />
                              <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wide">
                                {style.label}
                              </h4>
                            </div>
                            <div className="text-xs text-[var(--text-muted)] leading-relaxed pl-6">
                              {renderContentValue(value)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Keywords */}
                  {entry.keywords && entry.keywords.length > 0 && (
                    <div className="px-5 py-3 border-t border-[var(--border)]/60 bg-[var(--surface-dim)]/50">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[var(--primary-container)]/60 text-[var(--primary)] border border-[var(--primary)]/10"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div
              className={`w-16 h-16 rounded-2xl ${catColors.bg} border ${catColors.border} flex items-center justify-center mx-auto mb-4`}
            >
              <BookOpen size={28} className={catColors.icon} />
            </div>
            <p className="text-sm font-semibold text-[var(--text)]">No content yet</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Detailed content for this topic will be added as the knowledge base grows.
            </p>
          </div>
        )}
      </div>
    )
  }

  // ── Main View ──────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center">
            <Factory size={20} className="text-[var(--primary)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text)]">Pharmaceutical Industry</h1>
            <p className="text-xs text-[var(--text-muted)]">
              Manufacturing, regulatory, pharmacovigilance, supply chain & careers
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          type="text"
          placeholder={
            activeTab === 'topics'
              ? 'Search topics...'
              : activeTab === 'glossary'
                ? 'Search industry terms...'
                : 'Search manufacturers...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-dim)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
        />
      </div>

      {/* Tabs — horizontally scrollable on mobile */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-[var(--border)] mb-5 gap-0">
        {(
          [
            { key: 'topics', label: 'Topics', icon: BookOpen, count: topics.length },
            { key: 'glossary', label: 'Glossary', icon: FileText, count: terms.length },
            {
              key: 'manufacturers',
              label: 'Manufacturers',
              icon: Building2,
              count: manufacturers.length,
            },
            { key: 'quiz', label: 'Quiz', icon: Target, count: quizQuestions.length },
            { key: 'keml', label: 'KEML', icon: Pill, count: kemlRefs.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key)
              setSearchQuery('')
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2.5 text-[11px] sm:text-xs font-semibold transition-colors border-b-2 cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === tab.key
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
            <span className="text-[10px] font-mono opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* ── Topics Tab ─────────────────────────────────────── */}
      {activeTab === 'topics' && (
        <div className="space-y-2">
          {topics.map((topic) => {
            const Icon = getIcon(topic.icon)
            const hasChildren = topic.children && topic.children.length > 0
            const isExpanded = expandedTopic === topic.id
            const catColors = getCategoryColors(topic.name)

            return (
              <div key={topic.id}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border ${catColors.border} ${catColors.bg} hover:brightness-95 transition-all ${
                    !hasChildren ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (hasChildren) {
                      setExpandedTopic(isExpanded ? null : topic.id)
                    } else {
                      handleTopicClick(topic)
                    }
                  }}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${catColors.border} bg-white/50 dark:bg-black/20`}
                  >
                    <Icon size={16} className={catColors.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--text)]">{topic.name}</h3>
                    {topic.description && (
                      <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                        {topic.description}
                      </p>
                    )}
                  </div>
                  {hasChildren && (
                    <div className="shrink-0">
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-[var(--text-muted)]" />
                      ) : (
                        <ChevronRight size={16} className="text-[var(--text-muted)]" />
                      )}
                    </div>
                  )}
                </div>

                {/* Children */}
                {hasChildren && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-[var(--border)]/40 pl-3">
                    {topic.children!.map((child) => {
                      const ChildIcon = getIcon(child.icon)
                      const childHasChildren = child.children && child.children.length > 0
                      const childColors = getCategoryColors(topic.name)

                      return (
                        <div key={child.id}>
                          <div
                            className={`flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[var(--surface-dim)] transition-colors ${
                              !childHasChildren ? 'cursor-pointer' : ''
                            }`}
                            onClick={() => {
                              if (childHasChildren) {
                                setExpandedTopic(expandedTopic === child.id ? null : child.id)
                              } else {
                                handleTopicClick(child)
                              }
                            }}
                          >
                            <ChildIcon size={14} className={`shrink-0 ${childColors.icon}`} />
                            <span className="text-xs font-medium text-[var(--text)] flex-1">
                              {child.name}
                            </span>
                            {childHasChildren && (
                              <ChevronRight size={12} className="text-[var(--text-muted)]" />
                            )}
                          </div>

                          {/* Grandchildren */}
                          {childHasChildren && expandedTopic === child.id && (
                            <div className="ml-5 mt-0.5 space-y-0.5 border-l border-[var(--border)]/30 pl-2">
                              {child.children!.map((gc) => (
                                <div
                                  key={gc.id}
                                  className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
                                  onClick={() => handleTopicClick(gc)}
                                >
                                  <span className="text-[11px] text-[var(--text-muted)]">
                                    {gc.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Glossary Tab ───────────────────────────────────── */}
      {activeTab === 'glossary' && (
        <div className="space-y-2">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={40} className="mx-auto mb-3 text-[var(--text-muted)]/40" />
              <p className="text-sm text-[var(--text-muted)]">No terms found</p>
            </div>
          ) : (
            filteredTerms.map((term) => (
              <div
                key={term.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--primary)]/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                  <h3 className="text-sm font-bold text-[var(--text)] break-words">{term.term}</h3>
                  {term.aliases.length > 0 && (
                    <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--surface-dim)] px-2 py-0.5 rounded-full max-w-full break-words">
                      AKA: {term.aliases.join(', ')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                  {term.definition}
                </p>
                {term.examples.length > 0 && (
                  <div className="mt-2 pl-3 border-l-2 border-[var(--primary)]/30 bg-[var(--primary-container)]/20 rounded-r-lg p-2">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--primary)]">Example:</span>{' '}
                      {term.examples[0]}
                    </p>
                  </div>
                )}
                {term.related_terms.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {term.related_terms.map((rt) => (
                      <span
                        key={rt}
                        className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--surface-dim)] text-[var(--text-muted)] border border-[var(--border)]"
                      >
                        {rt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Manufacturers Tab ──────────────────────────────── */}
      {activeTab === 'manufacturers' && (
        <div className="space-y-3">
          {filteredManufacturers.length === 0 ? (
            <div className="text-center py-12">
              <Building2 size={40} className="mx-auto mb-3 text-[var(--text-muted)]/40" />
              <p className="text-sm text-[var(--text-muted)]">No manufacturers found</p>
            </div>
          ) : (
            filteredManufacturers.map((mfr) => {
              const isActive = mfr.regulatory_status?.toLowerCase().includes('active')
              const isSuspended = mfr.regulatory_status?.toLowerCase().includes('suspended')

              return (
                <div
                  key={mfr.id}
                  className={`rounded-xl border bg-[var(--surface)] p-4 transition-colors hover:border-[var(--primary)]/20 ${
                    isSuspended
                      ? 'border-amber-300/40 dark:border-amber-700/40'
                      : 'border-[var(--border)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-[var(--text)] truncate">
                          {mfr.name}
                        </h3>
                        {mfr.registration_number && (
                          <span className="text-[8px] font-mono text-[var(--text-muted)] bg-[var(--surface-dim)] px-1.5 py-0.5 rounded shrink-0">
                            PPB: {mfr.registration_number}
                          </span>
                        )}
                      </div>
                      {mfr.location && (
                        <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                          <MapPin size={10} />
                          {mfr.location}
                        </p>
                      )}
                    </div>
                    {mfr.regulatory_status && (
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300/40 dark:border-emerald-700/40'
                            : isSuspended
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300/40 dark:border-amber-700/40'
                              : 'bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 border-slate-300/40 dark:border-slate-700/40'
                        }`}
                      >
                        {mfr.regulatory_status}
                      </span>
                    )}
                  </div>

                  {mfr.products_description && (
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                      {mfr.products_description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {mfr.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[var(--primary-container)]/60 text-[var(--primary)] border border-[var(--primary)]/10"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border)]/40">
                    {mfr.founded_year && (
                      <span className="flex items-center gap-1">
                        <Clock size={9} />
                        Est. {mfr.founded_year}
                      </span>
                    )}
                    {mfr.employee_count && (
                      <span className="flex items-center gap-1">
                        <Building2 size={9} />
                        {mfr.employee_count} employees
                      </span>
                    )}
                    {mfr.certifications.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Award size={9} />
                        {mfr.certifications.join(', ')}
                      </span>
                    )}
                    {mfr.website && (
                      <a
                        href={mfr.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--primary)] hover:underline ml-auto"
                      >
                        <ExternalLink size={9} />
                        Website
                      </a>
                    )}
                  </div>

                  {mfr.notes && (
                    <p className="text-[10px] text-[var(--text-muted)] mt-2 italic bg-[var(--surface-dim)]/50 rounded-lg px-3 py-1.5">
                      {mfr.notes}
                    </p>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {/* ── Quiz Tab ─────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['All', ...quizCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedQuizCategory(cat)
                  setQuizIndex(0)
                  setQuizSelected(null)
                  setQuizAnswered(false)
                  setQuizFinished(false)
                  setQuizScore(0)
                }}
                className={`text-[9px] sm:text-[10px] font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedQuizCategory === cat
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-[var(--surface-dim)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(() => {
            const filteredQuiz =
              selectedQuizCategory === 'All'
                ? quizQuestions
                : quizQuestions.filter((q) => q.category === selectedQuizCategory)
            if (filteredQuiz.length === 0) {
              return (
                <div className="text-center py-12">
                  <Target size={40} className="mx-auto mb-3 text-[var(--text-muted)]/40" />
                  <p className="text-sm text-[var(--text-muted)]">No questions in this category</p>
                </div>
              )
            }

            if (quizFinished) {
              return (
                <div className="text-center py-8 sm:py-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-[var(--primary-container)] flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1">
                    Quiz Complete!
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-4">
                    You scored <span className="font-bold text-[var(--primary)]">{quizScore}</span>{' '}
                    out of <span className="font-bold">{filteredQuiz.length}</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mb-6">
                    {Math.round((quizScore / filteredQuiz.length) * 100)}% correct
                  </p>
                  <button
                    onClick={() => {
                      setQuizIndex(0)
                      setQuizSelected(null)
                      setQuizAnswered(false)
                      setQuizFinished(false)
                      setQuizScore(0)
                    }}
                    className="text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              )
            }

            const currentQ = filteredQuiz[quizIndex]
            if (!currentQ) return null

            return (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                {/* Progress */}
                <div className="px-4 sm:px-5 py-3 border-b border-[var(--border)]/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {quizIndex + 1} / {filteredQuiz.length}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--primary)]">
                    Score: {quizScore}
                  </span>
                </div>

                {/* Question */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        currentQ.type === 'clinical_scenario'
                          ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-300/40'
                          : currentQ.type === 'true_false'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300/40'
                            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-300/40'
                      }`}
                    >
                      {currentQ.type === 'clinical_scenario'
                        ? 'Clinical Scenario'
                        : currentQ.type === 'true_false'
                          ? 'True / False'
                          : 'MCQ'}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        currentQ.difficulty === 'basic'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300/40'
                          : currentQ.difficulty === 'intermediate'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300/40'
                            : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-300/40'
                      }`}
                    >
                      {currentQ.difficulty}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[var(--text)] leading-relaxed mb-4">
                    {currentQ.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {currentQ.options.map((opt, i) => {
                      const isCorrect = i === currentQ.correct_answer
                      const isSelected = quizSelected === i
                      let optionStyle = 'border-[var(--border)] hover:border-[var(--primary)]/30'
                      if (quizAnswered) {
                        if (isCorrect) {
                          optionStyle = 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-red-400 bg-red-50 dark:bg-red-950/30'
                        } else {
                          optionStyle = 'border-[var(--border)] opacity-50'
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-[var(--primary)] bg-[var(--primary-container)]/20'
                      }

                      return (
                        <button
                          key={i}
                          disabled={quizAnswered}
                          onClick={() => !quizAnswered && setQuizSelected(i)}
                          className={`w-full text-left p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs transition-all ${
                            quizAnswered ? 'cursor-default' : 'cursor-pointer'
                          } ${optionStyle}`}
                        >
                          <span className="font-semibold text-[var(--text)] mr-1.5">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <span className="text-[var(--text-muted)]">{opt}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  {quizAnswered && (
                    <div className="mt-3 p-2.5 sm:p-3 rounded-xl bg-[var(--surface-dim)] border border-[var(--border)]/60">
                      <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] leading-relaxed">
                        <span className="font-bold text-[var(--primary)]">Explanation: </span>
                        {currentQ.explanation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-4 py-3 border-t border-[var(--border)]/60 flex items-center justify-between">
                  {!quizAnswered ? (
                    <button
                      disabled={quizSelected === null}
                      onClick={() => {
                        setQuizAnswered(true)
                        if (quizSelected === currentQ.correct_answer) {
                          setQuizScore((s) => s + 1)
                        }
                      }}
                      className={`text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl transition-opacity cursor-pointer ${
                        quizSelected === null
                          ? 'bg-[var(--surface-dim)] text-[var(--text-muted)] cursor-not-allowed'
                          : 'bg-[var(--primary)] text-white hover:opacity-90'
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (quizIndex + 1 >= filteredQuiz.length) {
                          setQuizFinished(true)
                        } else {
                          setQuizIndex((i) => i + 1)
                          setQuizSelected(null)
                          setQuizAnswered(false)
                        }
                      }}
                      className="text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      {quizIndex + 1 >= filteredQuiz.length ? 'See Results' : 'Next Question'}
                    </button>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* ── KEML Tab ─────────────────────────────────────────── */}
      {activeTab === 'keml' && (
        <div className="space-y-4">
          {/* KEML Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {(() => {
              const total = kemlRefs.length
              const local = kemlRefs.filter(
                (k) =>
                  k.local_availability === 'locally_manufactured' ||
                  k.local_availability === 'both',
              ).length
              const core = kemlRefs.filter((k) => k.keml_tier === 'core').length
              return (
                <>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:p-3 text-center">
                    <p className="text-base sm:text-lg font-bold text-[var(--primary)]">{total}</p>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[var(--text-muted)]">
                      KEML Drugs
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-300/30 dark:border-emerald-700/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 sm:p-3 text-center">
                    <p className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {local}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[var(--text-muted)]">
                      Local Mfg
                    </p>
                  </div>
                  <div className="rounded-xl border border-amber-300/30 dark:border-amber-700/30 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 sm:p-3 text-center">
                    <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
                      {core}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-medium text-[var(--text-muted)]">
                      Core List
                    </p>
                  </div>
                </>
              )
            })()}
          </div>

          {/* KEML Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              type="text"
              placeholder="Search KEML drugs..."
              value={kemlSearch}
              onChange={(e) => setKemlSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--surface-dim)] border border-[var(--border)] text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/50 transition-all"
            />
          </div>

          {/* KEML Drug List */}
          <div className="space-y-2">
            {kemlRefs
              .filter(
                (k) =>
                  !kemlSearch.trim() ||
                  k.drug_name.toLowerCase().includes(kemlSearch.toLowerCase()) ||
                  (k.keml_category &&
                    k.keml_category.toLowerCase().includes(kemlSearch.toLowerCase())),
              )
              .map((keml) => (
                <div
                  key={keml.drug_id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--primary)]/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-[var(--text)] break-words">
                      {keml.drug_name}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {keml.keml_tier === 'core' ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-700/40">
                          Core
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-300/40 dark:border-amber-700/40">
                          Complementary
                        </span>
                      )}
                      {keml.who_eml_listed && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-300/40 dark:border-blue-700/40">
                          WHO EML
                        </span>
                      )}
                    </div>
                  </div>

                  {keml.keml_category && (
                    <p className="text-[11px] text-[var(--text-muted)] mb-2">
                      {keml.keml_category}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {keml.local_availability === 'locally_manufactured' ||
                    keml.local_availability === 'both' ? (
                      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40">
                        Locally Manufactured
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 border border-slate-300/40">
                        Imported
                      </span>
                    )}
                  </div>

                  {keml.local_manufacturers.length > 0 && (
                    <p className="text-[10px] text-[var(--text-muted)]">
                      <span className="font-semibold">Local manufacturers:</span>{' '}
                      {keml.local_manufacturers.join(', ')}
                    </p>
                  )}

                  <p className="text-[10px] text-[var(--text-muted)] mt-1.5 italic">{keml.notes}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
