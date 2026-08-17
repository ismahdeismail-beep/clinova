import React, { useState, useEffect } from 'react'
import {
  Factory,
  FlaskConical,
  Shield,
  Truck,
  ExternalLink,
  MapPin,
  Award,
  ChevronDown,
  ChevronUp,
  Pill,
  Loader2,
} from 'lucide-react'
import { IndustryKnowledgeService } from '../services/industryKnowledge.service'
import type { DrugIndustryConnection, KenyanManufacturer } from '../types/knowledge'

interface DrugIndustryTabProps {
  drugId: string
  drugName: string
  genericName?: string
}

const CATEGORY_ICONS: Record<string, typeof Factory> = {
  manufacturing_process: FlaskConical,
  regulatory: Shield,
  formulation: Pill,
  supply_chain: Truck,
  quality: Award,
}

const CATEGORY_LABELS: Record<string, string> = {
  manufacturing_process: 'Manufacturing Process',
  regulatory: 'Regulatory Status',
  formulation: 'Formulation & Dosage',
  supply_chain: 'Supply Chain',
  quality: 'Quality Assurance',
}

export function DrugIndustryTab({ drugId, drugName, genericName }: DrugIndustryTabProps) {
  const [connections, setConnections] = useState<DrugIndustryConnection[]>([])
  const [manufacturers, setManufacturers] = useState<KenyanManufacturer[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const [conns, mfrs] = await Promise.all([
          IndustryKnowledgeService.getForDrug(drugId),
          IndustryKnowledgeService.getManufacturers(),
        ])
        if (!cancelled) {
          setConnections(conns)
          setManufacturers(mfrs)
        }
      } catch {
        if (!cancelled) {
          setConnections([])
          setManufacturers([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [drugId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-[var(--text-muted)]">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading industry data for {drugName}...
      </div>
    )
  }

  if (connections.length === 0 && manufacturers.length === 0) {
    return (
      <div className="text-center py-12">
        <Factory size={40} className="mx-auto mb-3 text-[var(--text-muted)]/40" />
        <p className="text-sm text-[var(--text-muted)]">
          No industry data available for {drugName} yet.
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Industry connections will appear as the pharmaceutical knowledge base grows.
        </p>
      </div>
    )
  }

  const grouped = connections.reduce<Record<string, DrugIndustryConnection[]>>((acc, c) => {
    const cat = c.connection_type
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(c)
    return acc
  }, {})

  const toggleCategory = (cat: string) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat))
  }

  const formatContent = (content: Record<string, any>): string => {
    if (!content) return ''
    return Object.entries(content)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}: ${value}`
        return `${key}: ${JSON.stringify(value)}`
      })
      .join('\n')
  }

  return (
    <div className="space-y-4">
      {/* Drug Identity Header */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-dim)] border border-[var(--border)]">
        <div className="w-10 h-10 rounded-lg bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)]">
          <Pill size={20} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text)]">{drugName}</h3>
          {genericName && (
            <p className="text-xs text-[var(--text-muted)]">Generic: {genericName}</p>
          )}
        </div>
      </div>

      {/* Connection Categories */}
      {Object.entries(grouped).map(([category, items]) => {
        const Icon = CATEGORY_ICONS[category] || Factory
        const label = CATEGORY_LABELS[category] || category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        const isExpanded = expandedCategory === category

        return (
          <div
            key={category}
            className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--surface)]"
          >
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface-dim)] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className="text-[var(--primary)]" />
                <span className="text-sm font-semibold text-[var(--text)]">{label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--primary-container)] text-[var(--primary)]">
                  {items.length}
                </span>
              </div>
              {isExpanded ? (
                <ChevronUp size={16} className="text-[var(--text-muted)]" />
              ) : (
                <ChevronDown size={16} className="text-[var(--text-muted)]" />
              )}
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)]/60">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="mt-3 p-3 rounded-lg bg-[var(--surface-dim)] border border-[var(--border)]/60"
                  >
                    {item.entry?.title && (
                      <h4 className="text-xs font-bold text-[var(--text)] mb-1">{item.entry.title}</h4>
                    )}
                    {item.context && (
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                        {item.context}
                      </p>
                    )}
                    {item.entry?.content && (
                      <div className="text-xs text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                        {formatContent(item.entry.content)}
                      </div>
                    )}
                    {item.entry?.source && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <Shield size={10} className="text-[var(--success)]" />
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Source: {item.entry.source}
                        </span>
                      </div>
                    )}
                    {item.entry?.source_url && (
                      <a
                        href={item.entry.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-[var(--primary)] hover:underline"
                      >
                        <ExternalLink size={10} />
                        View Source
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Kenyan Manufacturers Section */}
      {manufacturers.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--surface)]">
          <div className="px-4 py-3 border-t border-[var(--border)]/60">
            <div className="flex items-center gap-2.5">
              <Factory size={16} className="text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--text)]">Kenyan Manufacturers</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--primary-container)] text-[var(--primary)]">
                {manufacturers.length}
              </span>
            </div>
          </div>
          <div className="px-4 pb-4 space-y-2">
            {manufacturers.map((mfr) => (
              <div
                key={mfr.id}
                className="p-3 rounded-lg bg-[var(--surface-dim)] border border-[var(--border)]/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text)]">{mfr.name}</h4>
                    {mfr.location && (
                      <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {mfr.location}
                      </p>
                    )}
                  </div>
                  {mfr.regulatory_status && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--success-container)] text-[var(--success)] border border-[var(--success)]/20 shrink-0">
                      {mfr.regulatory_status}
                    </span>
                  )}
                </div>
                {mfr.products_description && (
                  <p className="text-[10px] text-[var(--text-muted)] mt-1.5 leading-relaxed">
                    {mfr.products_description}
                  </p>
                )}
                {mfr.capabilities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mfr.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--primary-container)]/60 text-[var(--primary)] border border-[var(--primary)]/10"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                )}
                {mfr.website && (
                  <a
                    href={mfr.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-[var(--primary)] hover:underline"
                  >
                    <ExternalLink size={10} />
                    Website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
