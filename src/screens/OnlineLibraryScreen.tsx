import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Search, ExternalLink, Globe, BookMarked,
  FileText, ChevronRight, ArrowLeft, Sparkles, GraduationCap
} from 'lucide-react'
import { LIBRARY, type LibraryResource, getResourcesByType } from '../data/onlineLibraryData'
import { crawlLibraryMany, type CrawlResult } from '../services/libraryCrawler.client'

const TYPE_ICONS: Record<LibraryResource['type'], React.ReactNode> = {
  textbook: <BookOpen size={16} />,
  guideline: <FileText size={16} />,
  oer: <Globe size={16} />,
  reference: <BookMarked size={16} />,
  companion: <GraduationCap size={16} />,
  handbook: <BookOpen size={16} />,
  formulary: <FileText size={16} />,
}

const TYPE_LABELS: Record<LibraryResource['type'], string> = {
  textbook: 'Textbook',
  guideline: 'Guideline',
  oer: 'Open Educational Resource',
  reference: 'Reference',
  companion: 'Companion',
  handbook: 'Handbook',
  formulary: 'Formulary',
}

export default function OnlineLibraryScreen() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<LibraryResource['type'] | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  const allSubjects = Array.from(new Set(LIBRARY.flatMap((r) => r.subjects))).sort()

  const filtered = LIBRARY.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        r.title.toLowerCase().includes(q) ||
        r.authors.toLowerCase().includes(q) ||
        r.keywords.toLowerCase().includes(q) ||
        r.subjects.some((s) => s.toLowerCase().includes(q))
      if (!matchesSearch) return false
    }
    if (subjectFilter && !r.subjects.includes(subjectFilter)) return false
    if (typeFilter && r.type !== typeFilter) return false
    return true
  })

  const freeCount = LIBRARY.filter((r) => r.isFree).length

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <BookOpen size={16} /> Online Library
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Clinova <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Library</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
              Curated textbooks, guidelines, open educational resources, and references for clinical pharmacy.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
          <button onClick={() => navigate('/knowledge')} className="hover:text-[var(--primary)] transition-colors">Education Hub</button>
          <ChevronRight size={14} />
          <span className="text-[var(--text)] font-bold">Online Library</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-2xl font-black text-[var(--text)]">{LIBRARY.length}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mt-1">Total Resources</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-2xl font-black text-emerald-600">{freeCount}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mt-1">Free Resources</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-2xl font-black text-[var(--text)]">{allSubjects.length}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mt-1">Subjects</p>
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-2xl font-black text-[var(--text)]">{getResourcesByType('textbook').length}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider mt-1">Textbooks</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={async () => {
              setSyncing(true)
              setSyncMsg(null)
              const sources = LIBRARY.filter((r) => r.publisherUrl).map((r) => ({
                id: r.id,
                title: r.title,
                url: r.publisherUrl,
                authors: r.authors,
                type: r.type,
                subject: r.subjects[0],
              }))
              try {
                const results: CrawlResult[] = await crawlLibraryMany(sources)
                const stored = results.reduce((a, r) => a + r.stored, 0)
                const skipped = results.filter((r) => r.skipped).length
                setSyncMsg(
                  skipped > 0
                    ? `Supermemory not configured — ${skipped} sources skipped. Set SUPERMEMORY_API_KEY + FIRECRAWL_API_KEY on the server to enable crawling.`
                    : `Ingested ${stored} passages from ${results.length} sources into the knowledge base.`
                )
              } catch (err: any) {
                setSyncMsg(err?.message || 'Sync failed')
              } finally {
                setSyncing(false)
              }
            }}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl font-bold text-sm shadow-sm hover:opacity-95 transition-all disabled:opacity-50"
          >
            <Sparkles size={16} /> {syncing ? 'Syncing…' : 'Sync Library to Knowledge Base'}
          </button>
          {syncMsg && <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xl">{syncMsg}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setSubjectFilter(null); setTypeFilter(null) }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${!subjectFilter && !typeFilter ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]'}`}
          >
            All
          </button>
          {(['textbook', 'guideline', 'oer', 'reference', 'handbook', 'formulary'] as LibraryResource['type'][]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(typeFilter === t ? null : t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${typeFilter === t ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)]'}`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
              <div
                key={resource.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:shadow-md hover:border-[var(--primary)] transition-all group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0 text-[var(--primary)]">
                    {TYPE_ICONS[resource.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                      {resource.title}
                    </h3>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5 font-medium">{resource.authors}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-[var(--surface-dim)] font-bold uppercase">
                    {TYPE_LABELS[resource.type]}
                  </span>
                  {resource.edition && (
                    <span className="px-2 py-0.5 rounded-md bg-[var(--surface-dim)]">{resource.edition}</span>
                  )}
                  <span>{resource.year}</span>
                  {resource.isFree && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 font-bold flex items-center gap-1">
                      <Sparkles size={10} /> Free
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-[var(--text-muted)] line-clamp-2">{resource.publisher}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {resource.subjects.slice(0, 3).map((s) => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-dim)] text-[var(--text-muted)] truncate max-w-[100px]">
                      {s}
                    </span>
                  ))}
                  {resource.subjects.length > 3 && (
                    <span className="text-[9px] text-[var(--text-dim)]">+{resource.subjects.length - 3}</span>
                  )}
                </div>

                {resource.publisherUrl && (
                  <a
                    href={resource.publisherUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline"
                  >
                    <ExternalLink size={12} /> Visit Resource
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">No resources match your search</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">Try adjusting your filters.</p>
          </div>
        )}

      </div>
    </div>
  )
}
