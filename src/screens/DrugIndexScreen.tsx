import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
  Pill,
  Search,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Heart,
  Bug,
  HeartPulse,
  Brain,
  Utensils,
  Gauge,
  Wind,
  Droplets,
  Ribbon,
  Shield,
  Hand,
  Filter,
  Apple,
  Moon,
  Eye,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react'
import { DrugMonographView } from '../components/DrugMonographView'
import { DrugIcon } from '../components/DrugIcon'
import { getMonographCached, pinMonograph } from '../lib/getMonograph'
import { pinDrugImages } from '../lib/localDb'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { DrugMonographService, type DrugMonograph } from '../services/drugMonograph.service'
import { monographToMarkdown } from '../lib/monographToMarkdown'
import SavedMonographsPanel, { SaveMonographButton } from '../components/SavedMonographsPanel'
import { BUNDLED_DRUGS } from '../data/drugIndexData'
import { getDrugClassConfig } from '../data/drugClassColors'
import { getDrugCategory, type TherapeuticCategory } from '../lib/drugCategory'
import { getDrugSubclass, getSubclassesForCategory } from '../lib/drugSubclass'
import { getSubclassColor } from '../lib/drugSubclassColors'
import { useMinimumLoading } from '../hooks/useMinimumLoading'
import { PageLoader, InlineLoader } from '../components/PageLoader'

const QUICK_DRUGS: { name: string; category: string }[] = [
  { name: 'Ceftriaxone', category: 'Anti-infectives' },
  { name: 'Amlodipine', category: 'Cardiovascular' },
  { name: 'Metformin', category: 'Endocrine' },
  { name: 'Omeprazole', category: 'Gastrointestinal' },
  { name: 'Amitriptyline', category: 'Central Nervous System' },
]

const CATEGORIES = [
  'Anti-infectives',
  'Cardiovascular',
  'Central Nervous System',
  'Analgesics',
  'Gastrointestinal',
  'Endocrine',
  'Respiratory',
  'Anticoagulants',
  'Oncology',
  'Immunology',
  'Dermatology',
  'Renal/Electrolytes',
  'Nutrition/Vitamins',
  'Anaesthesia',
  'Ophthalmology',
  'Toxicology/Antidotes',
  'General',
]

// Per-category accent colors for the KDI browse grid (first page).
// Each class gets a distinct hue — gradient icon tile, tinted card wash,
// colored border + shadow on hover, and colored count text.
const CATEGORY_COLORS: Record<string, { card: string; hover: string; tile: string; text: string }> =
  {
    'Anti-infectives': {
      card: 'from-[var(--surface)] to-red-500/10',
      hover: 'hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10',
      tile: 'from-red-500 to-rose-500',
      text: 'text-red-600 dark:text-red-400',
    },
    Cardiovascular: {
      card: 'from-[var(--surface)] to-rose-500/10',
      hover: 'hover:border-rose-400 hover:shadow-lg hover:shadow-rose-500/10',
      tile: 'from-rose-500 to-pink-500',
      text: 'text-rose-600 dark:text-rose-400',
    },
    'Central Nervous System': {
      card: 'from-[var(--surface)] to-violet-500/10',
      hover: 'hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10',
      tile: 'from-violet-500 to-purple-500',
      text: 'text-violet-600 dark:text-violet-400',
    },
    Analgesics: {
      card: 'from-[var(--surface)] to-orange-500/10',
      hover: 'hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/10',
      tile: 'from-orange-500 to-amber-500',
      text: 'text-orange-600 dark:text-orange-400',
    },
    Gastrointestinal: {
      card: 'from-[var(--surface)] to-emerald-500/10',
      hover: 'hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10',
      tile: 'from-emerald-500 to-teal-500',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    Endocrine: {
      card: 'from-[var(--surface)] to-amber-500/10',
      hover: 'hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10',
      tile: 'from-amber-500 to-yellow-500',
      text: 'text-amber-600 dark:text-amber-400',
    },
    Respiratory: {
      card: 'from-[var(--surface)] to-sky-500/10',
      hover: 'hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10',
      tile: 'from-sky-500 to-cyan-500',
      text: 'text-sky-600 dark:text-sky-400',
    },
    Anticoagulants: {
      card: 'from-[var(--surface)] to-fuchsia-500/10',
      hover: 'hover:border-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/10',
      tile: 'from-fuchsia-500 to-pink-500',
      text: 'text-fuchsia-600 dark:text-fuchsia-400',
    },
    Oncology: {
      card: 'from-[var(--surface)] to-indigo-500/10',
      hover: 'hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10',
      tile: 'from-indigo-500 to-violet-500',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    Immunology: {
      card: 'from-[var(--surface)] to-green-500/10',
      hover: 'hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10',
      tile: 'from-green-500 to-emerald-500',
      text: 'text-green-600 dark:text-green-400',
    },
    Dermatology: {
      card: 'from-[var(--surface)] to-slate-500/10',
      hover: 'hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/10',
      tile: 'from-slate-500 to-slate-600',
      text: 'text-slate-600 dark:text-slate-400',
    },
    'Renal/Electrolytes': {
      card: 'from-[var(--surface)] to-teal-500/10',
      hover: 'hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10',
      tile: 'from-teal-500 to-cyan-600',
      text: 'text-teal-600 dark:text-teal-400',
    },
    'Nutrition/Vitamins': {
      card: 'from-[var(--surface)] to-lime-500/10',
      hover: 'hover:border-lime-400 hover:shadow-lg hover:shadow-lime-500/10',
      tile: 'from-lime-500 to-green-500',
      text: 'text-lime-600 dark:text-lime-400',
    },
    Anaesthesia: {
      card: 'from-[var(--surface)] to-cyan-500/10',
      hover: 'hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10',
      tile: 'from-cyan-500 to-sky-500',
      text: 'text-cyan-600 dark:text-cyan-400',
    },
    Ophthalmology: {
      card: 'from-[var(--surface)] to-pink-500/10',
      hover: 'hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/10',
      tile: 'from-pink-500 to-rose-500',
      text: 'text-pink-600 dark:text-pink-400',
    },
    'Toxicology/Antidotes': {
      card: 'from-[var(--surface)] to-yellow-500/10',
      hover: 'hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10',
      tile: 'from-yellow-500 to-amber-500',
      text: 'text-yellow-600 dark:text-yellow-400',
    },
    General: {
      card: 'from-[var(--surface)] to-slate-500/10',
      hover: 'hover:border-slate-400 hover:shadow-lg hover:shadow-slate-500/10',
      tile: 'from-slate-500 to-slate-600',
      text: 'text-slate-600 dark:text-slate-400',
    },
  }

// Distinct icon per therapeutic class — each category gets its own symbol
// instead of a single generic pill (mirrors the typeIcons pattern used in
// clinical cases / library resources).
const CATEGORY_SYMBOLS: Record<string, LucideIcon> = {
  'Anti-infectives': Bug,
  Cardiovascular: HeartPulse,
  'Central Nervous System': Brain,
  Analgesics: Pill,
  Gastrointestinal: Utensils,
  Endocrine: Gauge,
  Respiratory: Wind,
  Anticoagulants: Droplets,
  Oncology: Ribbon,
  Immunology: Shield,
  Dermatology: Hand,
  'Renal/Electrolytes': Filter,
  'Nutrition/Vitamins': Apple,
  Anaesthesia: Moon,
  Ophthalmology: Eye,
  'Toxicology/Antidotes': FlaskConical,
  General: BookOpen,
}

function LikeButton({ monographId }: { monographId: string }) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    DrugMonographService.isMonographSaved(monographId)
      .then(setSaved)
      .finally(() => setLoading(false))
  }, [monographId])

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (saved) {
      await DrugMonographService.removeSavedMonograph(monographId)
      setSaved(false)
    } else {
      await DrugMonographService.saveMonograph(monographId)
      setSaved(true)
    }
  }

  if (loading)
    return (
      <div className="w-7 h-7 shrink-0 flex items-center justify-center">
        <InlineLoader size={14} />
      </div>
    )

  return (
    <button
      onClick={toggle}
      className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
        saved
          ? 'text-rose-500 bg-rose-50 hover:bg-rose-100'
          : 'text-[var(--text-dim)] hover:text-rose-400 hover:bg-rose-50/50'
      }`}
      title={saved ? 'Remove from My Library' : 'Save to My Library'}
    >
      {saved ? <Heart size={14} className="fill-rose-500" /> : <Heart size={14} />}
    </button>
  )
}

// Drug icon for cards — real gallery image when available (PubChem/PDB 3D
// renders are preferred), otherwise a deterministic class-colored monogram
// tile so every drug in the index shows a distinct icon.
function DrugThumb({ m, size = 'md' }: { m: DrugMonograph; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <DrugIcon
      name={m.name || m.generic_name || 'Drug'}
      thumbnailUrl={m.thumbnail_url}
      drugClass={m.drug_class_name || m.drug_class}
      size={size}
    />
  )
}

export default function DrugIndexScreen() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { category: categoryParam, subclass: subclassParam } = useParams<{
    category: string
    subclass: string
  }>()

  // Navigation State
  const [activeTab, setActiveTab] = useState<'monograph' | 'library'>('monograph')

  // Monograph Browser State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const showLoading = useMinimumLoading(isLoading)
  const [error, setError] = useState<string | null>(null)
  const [monograph, setMonograph] = useState<string | null>(null)
  const [monographKey, setMonographKey] = useState<string>('')
  const [currentMonographId, setCurrentMonographId] = useState<string | null>(null)
  const [selectedDrugName, setSelectedDrugName] = useState<string | null>(null)

  // Alpha filter + recent search state
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recentDrugSearches') || '[]')
    } catch {
      return []
    }
  })
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  // Search results list, type-ahead suggestions, and AI-upgrade flag
  const [searchResults, setSearchResults] = useState<DrugMonograph[] | null>(null)
  const [resultsQuery, setResultsQuery] = useState('')
  const [suggestions, setSuggestions] = useState<DrugMonograph[]>([])
  const [needsAi, setNeedsAi] = useState(false)
  const viewPushedRef = useRef(false)

  // Seeded catalog: bundled data first, Supabase enhances it
  const [catalog, setCatalog] = useState<DrugMonograph[]>(BUNDLED_DRUGS)
  const [catalogLoading, setCatalogLoading] = useState(false)

  // Load monographs from Supabase; fall back to bundled data
  useEffect(() => {
    const loadCatalog = async () => {
      setCatalogLoading(true)
      try {
        // Race the catalog fetch against a timeout so a slow/hung Supabase
        // query never leaves the KDI grid stuck on skeleton loaders forever.
        const list = await Promise.race([
          DrugMonographService.getCatalog(),
          new Promise<DrugMonograph[]>((_, reject) =>
            setTimeout(() => reject(new Error('Catalog load timeout')), 10000),
          ),
        ])
        if (list.length > 0) setCatalog(list)
      } catch (err) {
        console.warn('[DrugIndex] Supabase unavailable, using bundled data:', err)
      } finally {
        setCatalogLoading(false)
      }
    }
    loadCatalog()
  }, [])

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return
    setRecentSearches((prev) => {
      const next = [term, ...prev.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5)
      localStorage.setItem('recentDrugSearches', JSON.stringify(next))
      return next
    })
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const viewOpen = monograph !== null || searchResults !== null
  // Close one view layer at a time so Back returns to the exact place the
  // user came from: monograph → its results/category context → browse mode.
  // The pushed history entry belongs to the FIRST-opened layer (results, or
  // a monograph opened from Level 1/category) — only pop when closing that
  // owner layer, otherwise the popstate handler would close the parent too.
  const closeView = useCallback(
    (popHistory = true) => {
      const closingMonograph = !!monograph
      const closingResults = !monograph && !!searchResults
      if (closingMonograph) {
        setMonograph(null)
        setCurrentMonographId(null)
        setMonographKey('')
        setSelectedDrugName(null)
        setNeedsAi(false)
        setError(null)
      } else if (closingResults) {
        setSearchResults(null)
        setResultsQuery('')
      }
      setSuggestions([])
      const ownsHistoryEntry = closingResults || (closingMonograph && !searchResults)
      if (popHistory && ownsHistoryEntry && window.history.state?.kdi === 'view') {
        window.history.back()
      }
    },
    [monograph, searchResults],
  )

  // Browser back closes the detail/results view instead of leaving the KDI screen
  useEffect(() => {
    if (!viewOpen) return
    if (viewPushedRef.current) return
    viewPushedRef.current = true
    const onPop = () => {
      // If the image lightbox is open, its own popstate handler closes it first
      if (document.querySelector('.clinova-lightbox')) return
      closeView(false)
    }
    window.history.pushState({ kdi: 'view' }, '')
    window.addEventListener('popstate', onPop)
    return () => {
      viewPushedRef.current = false
      window.removeEventListener('popstate', onPop)
    }
  }, [viewOpen, closeView])

  // Type-ahead suggestions (debounced)
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase()
    if (q.length < 2) {
      setSuggestions([])
      return
    }
    const t = setTimeout(() => {
      const local = catalog
        .filter(
          (m) =>
            (m.name || '').toLowerCase().includes(q) ||
            (m.generic_name || '').toLowerCase().includes(q) ||
            (m.brand_names || []).some((bn) => bn.toLowerCase().includes(q)),
        )
        .slice(0, 8)
      if (local.length > 0) {
        setSuggestions(local)
      } else {
        DrugMonographService.search(q)
          .then((rows) => setSuggestions(rows.slice(0, 8)))
          .catch(() => setSuggestions([]))
      }
    }, 200)
    return () => clearTimeout(t)
  }, [searchQuery, catalog])

  const hasClinicalContent = (m: DrugMonograph): boolean =>
    (m.indications?.length ?? 0) > 0 ||
    (m.side_effects?.length ?? 0) > 0 ||
    (m.contraindications?.length ?? 0) > 0 ||
    !!m.monitoring ||
    (m.interactions?.length ?? 0) > 0

  // A monograph is only "Full" when its enriched pharmacology core (mechanism
  // of action + ADME/pharmacokinetics) is drug-specific — not class-generic
  // boilerplate like "Mechanism varies by subclass…" or "Refer to prescribing
  // information for ADME…". Monographs missing that core get the AI-enrichment
  // banner so users can generate a complete, drug-specific profile.
  const BOILERPLATE_CORE =
    /^(refer to|consult|seek immediate|mechanism varies|mechanism of action varies|information not yet available)/i
  const hasEnrichedContent = (m: DrugMonograph): boolean =>
    hasClinicalContent(m) &&
    !!m.mechanism_of_action &&
    !BOILERPLATE_CORE.test(m.mechanism_of_action.trim()) &&
    !!m.pharmacokinetics &&
    !BOILERPLATE_CORE.test(m.pharmacokinetics.trim())

  const openSeeded = async (m: DrugMonograph) => {
    setSuggestions([])
    let full = m
    try {
      // The browse grid ships lightweight rows (no mechanism/ADME). Fetch the
      // full row so opened monographs always render the enriched sections.
      const detailed = await DrugMonographService.getById(m.id)
      if (detailed) full = detailed
    } catch {
      // Keep the light copy if the detail fetch fails.
    }
    setMonograph(monographToMarkdown(full))
    setMonographKey((full.name || full.generic_name || '').toLowerCase())
    setCurrentMonographId(full.id)
    setSelectedDrugName(full.name || full.generic_name || null)
    setNeedsAi(!hasEnrichedContent(full))
    setError(null)
  }

  const generateWithAi = async (query: string, categoryName?: string) => {
    const q = (query || categoryName || '').trim()
    if (!q) return
    setIsLoading(true)
    setError(null)
    setMonograph(null)
    setCurrentMonographId(null)
    setMonographKey('')
    setSelectedDrugName(q || categoryName || null)
    setNeedsAi(false)
    try {
      const entry = await getMonographCached(q, categoryName)
      setMonograph(entry.content)
      setMonographKey(entry.key)
      try {
        const m = await DrugMonographService.getByName(q)
        if (m) setCurrentMonographId(m.id)
      } catch {
        // Optional id enrichment — ignore failures
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An error occurred while generating the drug profile.')
    } finally {
      setIsLoading(false)
    }
  }

  const showResults = async (q: string) => {
    const lower = q.toLowerCase()
    const merged = new Map<string, DrugMonograph>()
    for (const m of catalog) {
      const name = (m.name || '').toLowerCase()
      const generic = (m.generic_name || '').toLowerCase()
      const brandHit = (m.brand_names || []).some((bn) => bn.toLowerCase().includes(lower))
      if (name.includes(lower) || generic.includes(lower) || brandHit) merged.set(m.id, m)
    }
    try {
      const remote = await DrugMonographService.search(q)
      for (const m of remote) {
        if (!merged.has(m.id)) merged.set(m.id, m)
      }
    } catch {
      // Remote search is best-effort
    }
    setResultsQuery(q)
    setSearchResults([...merged.values()].slice(0, 24))
    setActiveTab('monograph')
  }

  const runSearch = async (query: string) => {
    const q = query.trim()
    if (!q) return
    setIsLoading(true)
    setError(null)
    setMonograph(null)
    setCurrentMonographId(null)
    setMonographKey('')
    setSelectedDrugName(null)
    setNeedsAi(false)
    setSearchResults(null)
    setResultsQuery('')
    const lower = q.toLowerCase()
    try {
      // 1. Exact match in the loaded catalog (name, generic, or brand) with real content
      const exact = catalog.find(
        (m) =>
          (m.name && m.name.toLowerCase() === lower) ||
          (m.generic_name && m.generic_name.toLowerCase() === lower) ||
          (m.brand_names || []).some((bn) => bn.toLowerCase() === lower),
      )
      if (exact && hasClinicalContent(exact)) {
        openSeeded(exact)
        return
      }

      // 2. Best match from Supabase (name or generic) with real content
      const seeded = await DrugMonographService.getByName(q)
      if (seeded && hasClinicalContent(seeded)) {
        openSeeded(seeded)
        return
      }

      // 3. Strong local match (typo-tolerant prefix/substring) — only open if it has real content
      let bestMatch: DrugMonograph | null = null
      let bestScore = 0
      for (const m of catalog) {
        const name = (m.name || '').toLowerCase()
        const generic = (m.generic_name || '').toLowerCase()
        let score = 0
        if (name === lower || generic === lower) score = 100
        else if (name.startsWith(lower) || generic.startsWith(lower)) score = 80
        else if (name.includes(lower) || generic.includes(lower)) score = 60
        else if ((m.brand_names || []).some((bn) => bn.toLowerCase().includes(lower))) score = 50
        if (score > bestScore) {
          bestScore = score
          bestMatch = m
        }
      }
      if (bestMatch && bestScore >= 60 && hasClinicalContent(bestMatch)) {
        openSeeded(bestMatch)
        return
      }

      // 4. Show a results list (local + remote matches) with an AI fallback option
      await showResults(q)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An error occurred while searching the Kenya Drug Index.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (m: DrugMonograph) => {
    setSearchQuery(m.name || m.generic_name || '')
    saveRecentSearch(m.name || m.generic_name || '')
    setShowSearchDropdown(false)
    openSeeded(m)
  }

  const handlePinForOffline = async () => {
    if (!monographKey) return
    await pinMonograph(monographKey)

    // Pin images too: download thumbnails + full images into the local cache so the
    // gallery works fully offline for this drug.
    try {
      if (currentMonographId) {
        const res = await fetch(`/api/drugs/${currentMonographId}/images`)
        const data = await res.json()
        if (data.ok && Array.isArray(data.data) && data.data.length > 0) {
          await pinDrugImages(currentMonographId, data.data)
        }
      } else if (selectedDrugName) {
        const res = await fetch(`/api/images/search?q=${encodeURIComponent(selectedDrugName)}`)
        const data = await res.json()
        if (data.ok && Array.isArray(data.data) && data.data.length > 0) {
          const drugId = data.data[0]?.drug_id
          if (drugId) await pinDrugImages(drugId, data.data)
        }
      }
    } catch (err) {
      console.warn('Could not download images for offline pin:', err)
    }

    alert('Monograph saved for offline access!')
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setSelectedLetter(null)
    setSelectedCategory(null)
    setSelectedSubclass(null)
    setSuggestions([])
    saveRecentSearch(searchQuery.trim())
    setShowSearchDropdown(false)
    navigate('/drugs')
    runSearch(searchQuery.trim())
  }

  const handleBackToCategories = () => {
    navigate('/drugs')
    setSelectedLetter(null)
    setSelectedSubclass(null)
    setSearchQuery('')
    setSuggestions([])
    closeView()
  }

  const handleCategoryClick = (category: string) => {
    setSelectedLetter(null)
    setSelectedSubclass(null)
    setSearchQuery('') // ← clears the global search so it doesn't persist
    setSuggestions([])
    closeView()
    setError(null)
    navigate(`/drugs/class/${encodeURIComponent(category)}`)
  }

  const handleQuickDrugClick = (drugName: string) => {
    setSearchQuery(drugName)
    setSelectedLetter(null)
    setSelectedCategory(null)
    setSelectedSubclass(null)
    setSuggestions([])
    saveRecentSearch(drugName)
    setShowSearchDropdown(false)
    navigate('/drugs')
    runSearch(drugName)
  }

  // Pre-fill search when arriving with ?q=
  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setSearchQuery(q)
      runSearch(q)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Drill-down sync: /drugs/class/:category and /drugs/class/:category/sub/:subclass
  useEffect(() => {
    const cat = categoryParam ? decodeURIComponent(categoryParam) : null
    const sub = subclassParam ? decodeURIComponent(subclassParam) : null
    setSelectedCategory((prev) => (cat === prev ? prev : cat))
    setSelectedSubclass((prev) => (sub === prev ? prev : sub))
    setSelectedLetter(null)
    if (cat && searchQuery) setSearchQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, subclassParam])

  // Filtered view of the catalog
  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let list = catalog
    if (selectedCategory) {
      list = list.filter((m) => getDrugCategory(m) === selectedCategory)
      if (selectedSubclass) {
        list = list.filter(
          (m) => getDrugSubclass(m, selectedCategory as TherapeuticCategory) === selectedSubclass,
        )
      }
    } else if (q) {
      list = list.filter(
        (m) =>
          (m.name || '').toLowerCase().includes(q) ||
          (m.generic_name || '').toLowerCase().includes(q) ||
          (m.drug_class_name || '').toLowerCase().includes(q) ||
          (m.brand_names || []).some((bn) => bn.toLowerCase().includes(q)),
      )
    }
    if (selectedCategory && q) {
      list = list.filter(
        (m) =>
          (m.name || '').toLowerCase().includes(q) ||
          (m.generic_name || '').toLowerCase().includes(q) ||
          (m.drug_class_name || '').toLowerCase().includes(q) ||
          (m.brand_names || []).some((bn) => bn.toLowerCase().includes(q)),
      )
    }
    if (selectedLetter) {
      list = list.filter((m) => (m.name || '').toUpperCase().startsWith(selectedLetter))
    }
    return list
  }, [catalog, searchQuery, selectedCategory, selectedLetter, selectedSubclass])

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      {/* ── Monograph Detail View ── */}
      {monograph ? (
        <>
          <div className="flex items-center gap-3">
            <button
              onClick={() => closeView()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer"
            >
              <ChevronLeft size={14} />
              Back
            </button>
            {selectedCategory && (
              <span className="text-sm text-[var(--text-muted)] min-w-0 flex items-center gap-1">
                <button
                  onClick={() => closeView()}
                  className="hover:text-[var(--primary)] transition-colors shrink-0"
                >
                  {selectedCategory}
                </button>
                <ChevronRight size={14} className="inline shrink-0" />
                <span className="text-[var(--text)] font-semibold truncate min-w-0">
                  {selectedDrugName}
                </span>
              </span>
            )}
          </div>

          {showLoading ? (
            <PageLoader
              title="Loading Formulary Profile"
              subtitle="Checking Kenya Drug Index database for monograph..."
            />
          ) : error ? (
            <div className="w-full bg-[var(--surface)] rounded-2xl border border-red-200/20 p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Pill size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-600">Failed to Retrieve Monograph</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{error}</p>
              </div>
              <button
                onClick={() => generateWithAi(searchQuery || 'Ceftriaxone')}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <>
              {needsAi && selectedDrugName && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                      Limited formulary data for {selectedDrugName}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      This entry has no clinical details yet. Generate a complete, drug-specific
                      monograph.
                    </p>
                  </div>
                  <button
                    onClick={() => generateWithAi(selectedDrugName)}
                    disabled={isLoading}
                    className="shrink-0 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Sparkles size={14} />
                    Generate monograph
                  </button>
                </div>
              )}
              <DrugMonographView
                content={monograph}
                drugName={selectedDrugName || searchQuery || 'Medication Monograph'}
                genericName={
                  catalog.find(
                    (m) =>
                      m.name.toLowerCase() ===
                      (selectedDrugName || searchQuery || '').toLowerCase(),
                  )?.generic_name
                }
                drugClass={
                  catalog.find(
                    (m) =>
                      m.name.toLowerCase() ===
                      (selectedDrugName || searchQuery || '').toLowerCase(),
                  )?.drug_class_name ||
                  catalog.find(
                    (m) =>
                      m.name.toLowerCase() ===
                      (selectedDrugName || searchQuery || '').toLowerCase(),
                  )?.drug_class
                }
                drugId={currentMonographId || undefined}
                isSeeded={!!currentMonographId}
                onBack={() => closeView()}
                onPin={handlePinForOffline}
                saveButton={
                  currentMonographId ? (
                    <SaveMonographButton monographId={currentMonographId} />
                  ) : undefined
                }
              />
            </>
          )}
        </>
      ) : (
        <>
          {/* ── Browse Mode: Header + Tabs ── */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[var(--text)] tracking-tight">
              Kenya Drug Index{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-emerald-500 to-purple-500">
                (KDI)
              </span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Browse monographs by therapeutic class or search for a specific drug
            </p>
          </div>

          {/* ── Global Search Bar (only when not in a category) ── */}
          {!monograph && !selectedCategory && (
            <div className="relative" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-[var(--surface)] p-2 rounded-xl border border-[var(--border)] shadow-sm w-full"
              >
                <div className="flex-1 min-w-0 flex items-center gap-3 px-3">
                  <Search size={20} className="text-[var(--text-dim)] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowSearchDropdown(true)
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    placeholder="Search by generic (e.g., Ceftriaxone, Amoxicillin) or brand name..."
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-[var(--text)] text-sm focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 w-full sm:w-auto px-5 py-2.5 bg-[var(--primary)] hover:opacity-90 transition-opacity text-[var(--primary-foreground)] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  {showLoading ? <InlineLoader size={16} /> : <Search size={16} />}
                  Search
                </button>
              </form>

              {showSearchDropdown &&
                (searchQuery.trim().length >= 2 ? (
                  suggestions.length > 0 ? (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-10 p-2 animate-in fade-in slide-in-from-top-1 duration-150 max-h-80 overflow-y-auto">
                      <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 py-1">
                        Suggestions
                      </div>
                      {suggestions.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => handleSuggestionClick(m)}
                          className="w-full text-left px-2 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--surface-dim)] transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <DrugThumb m={m} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="font-semibold block truncate">{m.name}</span>
                            {m.generic_name && m.generic_name !== m.name && (
                              <span className="text-[var(--text-muted)] block truncate">
                                {m.generic_name}
                              </span>
                            )}
                          </span>
                          {!hasEnrichedContent(m) && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 shrink-0">
                              Limited
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-10 p-3 animate-in fade-in slide-in-from-top-1 duration-150">
                      <p className="text-xs text-[var(--text-muted)]">
                        No matches in the index yet — press{' '}
                        <span className="font-bold text-[var(--text)]">Search</span> to generate a
                        monograph.
                      </p>
                    </div>
                  )
                ) : recentSearches.length > 0 ? (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg z-10 p-2 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 py-1">
                      Recent Searches
                    </div>
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleQuickDrugClick(term)}
                        className="w-full text-left px-2 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--surface-dim)] transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Search size={12} className="text-[var(--text-dim)] shrink-0" />
                        {term}
                      </button>
                    ))}
                  </div>
                ) : null)}
            </div>
          )}

          {/* ── Quick Search Tags ── */}
          {!monograph && !selectedCategory && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Quick Search:
              </span>
              {QUICK_DRUGS.map((drug) => (
                <button
                  key={drug.name}
                  onClick={() => handleQuickDrugClick(drug.name)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)] hover:text-[var(--primary)] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Pill size={12} />
                  {drug.name}
                </button>
              ))}
            </div>
          )}

          {/* ── Tabs Navigation ── */}
          <div className="relative flex border-b border-[var(--border)] overflow-x-auto">
            {(
              [
                { id: 'monograph', label: 'Monographs', icon: BookOpen },
                { id: 'library', label: 'My Library', icon: Heart },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-label={tab.label}
                  aria-selected={active}
                  role="tab"
                  className={`flex-1 shrink-0 px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-inset border-b-2 ${
                    active
                      ? 'text-[var(--primary)] border-[var(--primary)] bg-[var(--primary-container)]/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)]/50 border-transparent hover:border-[var(--border)]'
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* ── Tab: Monographs ── */}
          {activeTab === 'monograph' ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {searchResults ? (
                <div className="animate-in fade-in duration-200 space-y-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => closeView()}
                      className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={18} className="text-[var(--text)]" />
                    </button>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-[var(--text)] flex items-center gap-3 truncate">
                        <Search size={20} className="text-[var(--primary)] shrink-0" /> Results for
                        “{resultsQuery}”
                      </h2>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {searchResults.length} match{searchResults.length !== 1 ? 'es' : ''} in the
                        Kenya Drug Index
                      </p>
                    </div>
                  </div>

                  {showLoading ? (
                    <PageLoader
                      title="Generating Monograph"
                      subtitle="Generating a complete drug-specific monograph..."
                    />
                  ) : error ? (
                    <div className="w-full bg-[var(--surface)] rounded-2xl border border-red-200/20 p-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <Pill size={32} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-600">
                          Failed to Generate Monograph
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{error}</p>
                      </div>
                      <button
                        onClick={() => generateWithAi(resultsQuery)}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
                      >
                        Retry Request
                      </button>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center">
                        <Search size={32} className="text-[var(--text-muted)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                          No exact match in the Kenya Drug Index
                        </h3>
                        <p className="text-[var(--text-muted)] text-sm max-w-md">
                          “{resultsQuery}” isn't in the index. Generate a complete monograph
                          instead.
                        </p>
                      </div>
                      <button
                        onClick={() => generateWithAi(resultsQuery)}
                        disabled={isLoading}
                        className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Sparkles size={16} />
                        Generate monograph
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {searchResults.map((m) => (
                          <div
                            key={m.id}
                            className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl transition-all group overflow-hidden"
                          >
                            <button
                              onClick={() => openSeeded(m)}
                              className="w-full text-left p-4 cursor-pointer"
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <DrugThumb m={m} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 min-w-0">
                                    <div className="font-semibold text-[var(--text)] text-sm group-hover:text-[var(--primary)] transition-colors truncate">
                                      {m.name}
                                    </div>
                                    <span
                                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${hasEnrichedContent(m) ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}
                                    >
                                      {hasEnrichedContent(m) ? 'Full' : 'Limited'}
                                    </span>
                                  </div>
                                  {m.generic_name && m.generic_name !== m.name && (
                                    <div className="text-xs text-[var(--text-muted)] truncate">
                                      {m.generic_name}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {(m.drug_class_name || m.drug_class) &&
                                (() => {
                                  const cc = getDrugClassConfig(m.drug_class_name || m.drug_class)
                                  return (
                                    <span
                                      className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cc.badge} ${cc.border} max-w-full`}
                                    >
                                      {cc.subtitle && (
                                        <span className="opacity-70 shrink-0">{cc.subtitle}</span>
                                      )}
                                      <span className="font-bold shrink-0">·</span>
                                      <span className="truncate min-w-0">
                                        {m.drug_class_name || m.drug_class}
                                      </span>
                                    </span>
                                  )
                                })()}
                              {(() => {
                                const sub = getDrugSubclass(m)
                                if (sub === 'Other') return null
                                return (
                                  <span
                                    className={`mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border bg-[var(--surface)] ${getSubclassColor(sub).text} border-[var(--border)] max-w-full`}
                                  >
                                    <span className="truncate min-w-0">{sub}</span>
                                  </span>
                                )
                              })()}
                            </button>
                            <div className="px-4 pb-3 flex justify-end">
                              <LikeButton monographId={m.id} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col items-center gap-2 pt-5 border-t border-[var(--border)]">
                        <button
                          onClick={() => generateWithAi(resultsQuery)}
                          disabled={isLoading}
                          className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                        >
                          {showLoading ? <InlineLoader size={16} /> : <Sparkles size={16} />}
                          {isLoading ? 'Generating...' : 'Generate full monograph'}
                        </button>
                        <p className="text-xs text-[var(--text-muted)]">
                          No good match? Get a complete, drug-specific monograph.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {/* Breadcrumb — long class/subclass names must truncate instead of overflowing the page */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] pb-3 min-w-0">
                    <span
                      className={`${!selectedCategory ? 'text-[var(--text)] font-bold' : 'hover:text-[var(--primary)] transition-colors cursor-pointer'} shrink-0`}
                      onClick={!selectedCategory ? undefined : handleBackToCategories}
                    >
                      Drug Index
                    </span>
                    {selectedCategory && (
                      <>
                        <ChevronRight size={14} className="shrink-0" />
                        <span
                          className={`${!selectedSubclass ? 'text-[var(--text)] font-bold' : 'hover:text-[var(--primary)] transition-colors cursor-pointer'} min-w-0 truncate`}
                          onClick={
                            !selectedSubclass
                              ? undefined
                              : () =>
                                  navigate(`/drugs/class/${encodeURIComponent(selectedCategory)}`)
                          }
                        >
                          {selectedCategory}
                        </span>
                      </>
                    )}
                    {selectedCategory && selectedSubclass && (
                      <>
                        <ChevronRight size={14} className="shrink-0" />
                        <span className="text-[var(--text)] font-bold truncate min-w-0">
                          {selectedSubclass}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="min-h-[400px]">
                    {showLoading ? (
                      <PageLoader
                        title="Loading Formulary Profile"
                        subtitle="Checking Kenya Drug Index database for monograph..."
                      />
                    ) : error ? (
                      <div className="w-full bg-[var(--surface)] rounded-2xl border border-red-200/20 p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                          <Pill size={32} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-red-600">
                            Failed to Retrieve Monograph
                          </h3>
                          <p className="text-[var(--text-muted)] text-sm max-w-sm mt-1">{error}</p>
                        </div>
                        <button
                          onClick={() => generateWithAi(searchQuery || 'Ceftriaxone')}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 cursor-pointer"
                        >
                          Retry Request
                        </button>
                      </div>
                    ) : !selectedCategory ? (
                      /* ── Level 1: Category Cards ── */
                      <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold text-[var(--text)] border-l-4 border-[var(--primary)] pl-3">
                            Therapeutic Classes
                          </h2>
                          <div className="text-sm text-[var(--text-muted)] font-medium">
                            {catalogLoading ? (
                              <span
                                className="inline-block w-16 h-4 rounded bg-[var(--surface-dim)] animate-pulse align-middle"
                                aria-hidden
                              />
                            ) : (
                              `${catalog.length} monographs`
                            )}
                          </div>
                        </div>

                        {catalogLoading ? (
                          /* Skeleton cards — never flash bundled-seed counts before the live catalog arrives */
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div
                                key={i}
                                className="rounded-2xl border border-[var(--border)] p-5 animate-pulse"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-dim)]" />
                                  <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-3/4 rounded bg-[var(--surface-dim)]" />
                                    <div className="h-3 w-1/2 rounded bg-[var(--surface-dim)]" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {CATEGORIES.map((cat) => {
                                const count = catalog.filter(
                                  (m) => getDrugCategory(m) === cat,
                                ).length
                                if (count === 0) return null
                                const cc = CATEGORY_COLORS[cat] || CATEGORY_COLORS.Immunology
                                return (
                                  <button
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat)}
                                    className={`text-left bg-gradient-to-br ${cc.card} border border-[var(--border)] rounded-2xl p-5 cursor-pointer transition-all group ${cc.hover}`}
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cc.tile} flex items-center justify-center shrink-0 shadow-sm`}
                                      >
                                        {(() => {
                                          const Sym = CATEGORY_SYMBOLS[cat] || Pill
                                          return <Sym size={18} className="text-white" />
                                        })()}
                                      </div>
                                      <div className="min-w-0">
                                        <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-sm truncate">
                                          {cat}
                                        </h3>
                                        <p className={`text-xs font-medium ${cc.text}`}>
                                          {count} monograph{count !== 1 ? 's' : ''}
                                        </p>
                                      </div>
                                      <ChevronRight
                                        size={16}
                                        className={`${cc.text} ml-auto shrink-0 group-hover:translate-x-1 transition-all`}
                                      />
                                    </div>
                                  </button>
                                )
                              })}
                            </div>

                            {CATEGORIES.every((cat) => {
                              const count = catalog.filter((m) => getDrugCategory(m) === cat).length
                              return count === 0
                            }) && (
                              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
                                <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
                                  <BookOpen size={32} className="text-[var(--text-muted)]" />
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text)]">
                                  No monographs loaded
                                </h3>
                                <p className="text-sm text-[var(--text-muted)] mt-2">
                                  The Kenya Drug Index is being populated.
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : !selectedSubclass ? (
                      /* ── Level 2: Subclasses in Selected Category ── */
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleBackToCategories}
                            className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors cursor-pointer shadow-xs"
                          >
                            <ChevronLeft size={18} className="text-[var(--text)]" />
                          </button>
                          <div className="min-w-0">
                            <h2 className="text-2xl font-bold text-[var(--text)] border-l-4 border-[var(--primary)] pl-3 flex items-center gap-3 min-w-0">
                              {(() => {
                                const Sym = CATEGORY_SYMBOLS[selectedCategory] || Pill
                                return <Sym size={20} className="text-[var(--primary)] shrink-0" />
                              })()}
                              <span className="truncate min-w-0">{selectedCategory}</span>
                            </h2>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">
                              {
                                catalog.filter((m) => getDrugCategory(m) === selectedCategory)
                                  .length
                              }{' '}
                              monographs · choose a subclass
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getSubclassesForCategory(selectedCategory as TherapeuticCategory).map(
                            (sub) => {
                              const drugs = catalog.filter(
                                (m) =>
                                  getDrugCategory(m) === selectedCategory &&
                                  getDrugSubclass(m, selectedCategory as TherapeuticCategory) ===
                                    sub,
                              )
                              if (drugs.length === 0) return null
                              const subColors = getSubclassColor(sub)
                              const samples = drugs
                                .slice(0, 3)
                                .map((m) => m.name || m.generic_name || '')
                                .filter(Boolean)
                              return (
                                <button
                                  key={sub}
                                  onClick={() =>
                                    navigate(
                                      `/drugs/class/${encodeURIComponent(selectedCategory)}/sub/${encodeURIComponent(sub)}`,
                                    )
                                  }
                                  className={`text-left bg-gradient-to-br ${subColors.card} border border-[var(--border)] rounded-2xl p-5 transition-all group ${subColors.hover}`}
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <div
                                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subColors.tile} flex items-center justify-center shrink-0 shadow-sm`}
                                    >
                                      {(() => {
                                        const Sym = CATEGORY_SYMBOLS[selectedCategory] || Pill
                                        return <Sym size={18} className="text-white" />
                                      })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-sm truncate">
                                        {sub}
                                      </h3>
                                      <p className={`text-xs font-medium ${subColors.text}`}>
                                        {drugs.length} monograph{drugs.length !== 1 ? 's' : ''}
                                      </p>
                                    </div>
                                    <ChevronRight
                                      size={16}
                                      className={`${subColors.text} ml-auto shrink-0 group-hover:translate-x-1 transition-all`}
                                    />
                                  </div>
                                  {samples.length > 0 && (
                                    <p className="text-xs text-[var(--text-muted)] truncate">
                                      e.g. {samples.join(', ')}
                                    </p>
                                  )}
                                </button>
                              )
                            },
                          )}
                        </div>
                      </div>
                    ) : (
                      /* ── Level 3: Drugs in Selected Subclass ── */
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/drugs/class/${encodeURIComponent(selectedCategory)}`)
                            }
                            className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors cursor-pointer shadow-xs"
                          >
                            <ChevronLeft size={18} className="text-[var(--text)]" />
                          </button>
                          <div className="min-w-0">
                            <h2 className="text-2xl font-bold text-[var(--text)] border-l-4 border-[var(--primary)] pl-3 flex items-center gap-3 min-w-0">
                              {(() => {
                                const Sym = CATEGORY_SYMBOLS[selectedCategory] || Pill
                                return <Sym size={20} className="text-[var(--primary)] shrink-0" />
                              })()}
                              <span className="truncate min-w-0">{selectedSubclass}</span>
                            </h2>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">
                              {filteredCatalog.length} monograph
                              {filteredCatalog.length !== 1 ? 's' : ''} in{' '}
                              <button
                                onClick={() =>
                                  navigate(`/drugs/class/${encodeURIComponent(selectedCategory)}`)
                                }
                                className="font-bold underline underline-offset-2 hover:text-[var(--primary)] transition-colors cursor-pointer"
                              >
                                {selectedCategory}
                              </button>
                            </p>
                          </div>
                        </div>

                        {/* Search within category — scoped, no global search bar above */}
                        <div className="relative">
                          <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                          />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value)
                              setSelectedLetter(null)
                            }}
                            placeholder="Search drugs within this class..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                          />
                        </div>

                        {/* Alpha filter */}
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mr-1">
                            Alpha:
                          </span>
                          <button
                            onClick={() => setSelectedLetter(null)}
                            className={`px-2 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                              !selectedLetter
                                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--primary)]'
                            }`}
                          >
                            All
                          </button>
                          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
                            const hasDrugs = filteredCatalog.some((m) =>
                              (m.name || '').toUpperCase().startsWith(letter),
                            )
                            if (!hasDrugs) return null
                            return (
                              <button
                                key={letter}
                                onClick={() =>
                                  setSelectedLetter(letter === selectedLetter ? null : letter)
                                }
                                className={`w-6 h-6 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                  selectedLetter === letter
                                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                                    : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                                }`}
                              >
                                {letter}
                              </button>
                            )
                          })}
                        </div>

                        {/* Drug Grid */}
                        {filteredCatalog.length === 0 ? (
                          <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center">
                              <Pill size={32} className="text-[var(--text-muted)]" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-[var(--text)] mb-1">
                                No local monographs found
                              </h3>
                              <p className="text-[var(--text-muted)] text-sm max-w-md">
                                No monographs match your current filter in this class.
                              </p>
                            </div>
                            <button
                              onClick={() => generateWithAi(searchQuery || selectedCategory || '')}
                              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                            >
                              <Sparkles size={16} />
                              Search
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {filteredCatalog.map((m) => {
                              const subCc = getSubclassColor(selectedSubclass || '')
                              return (
                                <div
                                  key={m.id}
                                  className={`bg-gradient-to-br ${subCc.card} border border-[var(--border)] rounded-xl transition-all group overflow-hidden ${subCc.hover}`}
                                >
                                  <button
                                    onClick={() => openSeeded(m)}
                                    className="w-full text-left p-4 cursor-pointer"
                                  >
                                    <div className="flex items-start gap-3 min-w-0">
                                      <DrugThumb m={m} />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 min-w-0">
                                          <div className="font-semibold text-[var(--text)] text-sm group-hover:text-[var(--primary)] transition-colors truncate">
                                            {m.name}
                                          </div>
                                        </div>
                                        {m.generic_name && m.generic_name !== m.name && (
                                          <div className="text-xs text-[var(--text-muted)] truncate">
                                            {m.generic_name}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {(m.drug_class_name || m.drug_class) &&
                                      (() => {
                                        const cc = getDrugClassConfig(
                                          m.drug_class_name || m.drug_class,
                                        )
                                        return (
                                          <span
                                            className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cc.badge} ${cc.border} max-w-full`}
                                          >
                                            {cc.subtitle && (
                                              <span className="opacity-70 shrink-0">
                                                {cc.subtitle}
                                              </span>
                                            )}
                                            <span className="font-bold shrink-0">·</span>
                                            <span className="truncate min-w-0">
                                              {m.drug_class_name || m.drug_class}
                                            </span>
                                          </span>
                                        )
                                      })()}
                                    {(() => {
                                      const sub = getDrugSubclass(m)
                                      if (sub === 'Other') return null
                                      return (
                                        <span
                                          className={`mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border bg-[var(--surface)] ${getSubclassColor(sub).text} border-[var(--border)] max-w-full`}
                                        >
                                          <span className="truncate min-w-0">{sub}</span>
                                        </span>
                                      )
                                    })()}
                                  </button>
                                  <div className="px-4 pb-3 flex justify-end">
                                    <LikeButton monographId={m.id} />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* ── Tab: My Library ── */
            <div className="animate-in fade-in duration-200 max-w-3xl mx-auto">
              <SavedMonographsPanel
                onNavigateToDrug={(name) => {
                  setActiveTab('monograph')
                  setSearchQuery(name)
                  setSelectedCategory(null)
                  runSearch(name)
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
