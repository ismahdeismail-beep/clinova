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
} from 'lucide-react'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import type {
  PharmaceuticalTopic,
  IndustryKnowledgeEntry,
  IndustryTerm,
  KenyanManufacturer,
} from '../types/knowledge'

type Tab = 'topics' | 'glossary' | 'manufacturers'

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

const CATEGORY_COLORS: Record<string, string> = {
  'Manufacturing & Formulation': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Regulatory Affairs': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Pharmacovigilance: 'bg-red-500/10 text-red-600 border-red-500/20',
  'Supply Chain': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Local Kenyan Industry': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Careers & Professional Development': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
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

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [t, te, m] = await Promise.all([
          IndustryKnowledgeService.getTopicTree(),
          IndustryKnowledgeService.searchTerms('', 100),
          IndustryKnowledgeService.getManufacturers(),
        ])
        if (!cancelled) {
          setTopics(t)
          setTerms(te)
          setManufacturers(m)
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

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {React.createElement(getIcon(selectedTopic.icon), {
              size: 24,
              className: 'text-[var(--primary)]',
            })}
            <h1 className="text-xl font-bold text-[var(--text)]">{selectedTopic.name}</h1>
          </div>
          {selectedTopic.description && (
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {selectedTopic.description}
            </p>
          )}
        </div>

        {loadingEntries ? (
          <div className="flex items-center justify-center py-12 text-[var(--text-muted)]">
            <Loader2 size={18} className="animate-spin mr-2" />
            Loading content...
          </div>
        ) : topicEntries.length > 0 ? (
          <div className="space-y-4">
            {topicEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-sm font-bold text-[var(--text)]">{entry.title}</h3>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                      entry.difficulty === 'basic'
                        ? 'bg-green-500/10 text-green-600 border-green-500/20'
                        : entry.difficulty === 'intermediate'
                          ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                          : 'bg-red-500/10 text-red-600 border-red-500/20'
                    }`}
                  >
                    {entry.difficulty}
                  </span>
                </div>

                <div className="text-xs text-[var(--text-muted)] leading-relaxed space-y-3">
                  {typeof entry.content === 'object' &&
                    Object.entries(entry.content).map(([key, value]) => {
                      if (typeof value === 'string') {
                        return (
                          <div key={key}>
                            <span className="font-semibold text-[var(--text)] capitalize">
                              {key.replace(/_/g, ' ')}:
                            </span>{' '}
                            {value}
                          </div>
                        )
                      }
                      if (Array.isArray(value)) {
                        return (
                          <div key={key}>
                            <span className="font-semibold text-[var(--text)] capitalize">
                              {key.replace(/_/g, ' ')}:
                            </span>
                            <ul className="mt-1.5 ml-4 space-y-1 list-disc">
                              {(value as string[]).map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      }
                      return null
                    })}
                </div>

                {entry.source && (
                  <div className="mt-3 pt-3 border-t border-[var(--border)]/60 flex items-center gap-1.5">
                    <BookOpen size={10} className="text-[var(--success)]" />
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      Source: {entry.source}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen size={40} className="mx-auto mb-3 text-[var(--text-muted)]/40" />
            <p className="text-sm text-[var(--text-muted)]">
              No detailed content available for this topic yet.
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Content will be added as the pharmaceutical knowledge base grows.
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

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)] mb-5">
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
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key)
              setSearchQuery('')
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === tab.key
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
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
            const colorClass =
              CATEGORY_COLORS[topic.name] || 'bg-gray-500/10 text-gray-600 border-gray-500/20'

            return (
              <div key={topic.id}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-dim)] transition-colors ${
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
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${colorClass}`}
                  >
                    <Icon size={16} />
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
                  <div className="ml-6 mt-1 space-y-1 border-l border-[var(--border)]/60 pl-3">
                    {topic.children!.map((child) => {
                      const ChildIcon = getIcon(child.icon)
                      const childHasChildren = child.children && child.children.length > 0
                      const childColor =
                        CATEGORY_COLORS[child.name] ||
                        'bg-gray-500/10 text-gray-600 border-gray-500/20'

                      return (
                        <div key={child.id}>
                          <div
                            className={`flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[var(--surface-dim)] transition-colors ${
                              !childHasChildren ? 'cursor-pointer' : ''
                            }`}
                            onClick={() => {
                              if (childHasChildren) {
                                setExpandedTopic(
                                  expandedTopic === child.id ? null : child.id,
                                )
                              } else {
                                handleTopicClick(child)
                              }
                            }}
                          >
                            <ChildIcon size={14} className={`shrink-0 ${childColor.split(' ')[1]}`} />
                            <span className="text-xs font-medium text-[var(--text)] flex-1">
                              {child.name}
                            </span>
                            {childHasChildren && (
                              <ChevronRight
                                size={12}
                                className="text-[var(--text-muted)]"
                              />
                            )}
                          </div>

                          {/* Grandchildren */}
                          {childHasChildren && expandedTopic === child.id && (
                            <div className="ml-5 mt-0.5 space-y-0.5 border-l border-[var(--border)]/40 pl-2">
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
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-sm font-bold text-[var(--text)]">{term.term}</h3>
                  {term.aliases.length > 0 && (
                    <span className="text-[9px] font-mono text-[var(--text-muted)] shrink-0">
                      AKA: {term.aliases.join(', ')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                  {term.definition}
                </p>
                {term.examples.length > 0 && (
                  <div className="mt-2 pl-3 border-l-2 border-[var(--primary)]/30">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text)]">Example:</span>{' '}
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
            filteredManufacturers.map((mfr) => (
              <div
                key={mfr.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)]">{mfr.name}</h3>
                    {mfr.location && (
                      <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {mfr.location}
                      </p>
                    )}
                  </div>
                  {mfr.regulatory_status && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[var(--success-container)] text-[var(--success)] border border-[var(--success)]/20 shrink-0">
                      {mfr.regulatory_status}
                    </span>
                  )}
                </div>

                {mfr.products_description && (
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                    {mfr.products_description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 mb-2">
                  {mfr.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--primary-container)]/60 text-[var(--primary)] border border-[var(--primary)]/10"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
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
                </div>

                {mfr.notes && (
                  <p className="text-[10px] text-[var(--text-muted)] mt-2 italic">{mfr.notes}</p>
                )}

                {mfr.website && (
                  <a
                    href={mfr.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-[10px] text-[var(--primary)] hover:underline"
                  >
                    <ExternalLink size={9} />
                    Website
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
