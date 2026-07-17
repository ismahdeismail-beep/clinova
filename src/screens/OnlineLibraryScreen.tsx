import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, Search, ExternalLink, Globe, BookMarked,
  FileText, ChevronRight, Sparkles, GraduationCap
} from 'lucide-react'
import { LIBRARY, type LibraryResource } from '../data/onlineLibraryData'

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
  oer: 'Open Resource',
  reference: 'Reference',
  companion: 'Companion',
  handbook: 'Handbook',
  formulary: 'Formulary',
}

const SECTIONS: { title: string; description: string; ids: string[] }[] = [
  {
    title: 'Core Textbooks',
    description: 'Essential pharmacology and therapeutics texts for the Brain Tree curriculum',
    ids: ['lib_katzung', 'lib_goodman', 'lib_rang_dale', 'lib_whalen', 'lib_dipiro', 'lib_shargel', 'lib_winter', 'lib_toxicology', 'lib_pharm_care', 'lib_pharmacotherapy_review'],
  },
  {
    title: 'Kenya Clinical Resources',
    description: 'National guidelines, formularies and references for Kenyan practice',
    ids: ['lib_ktg', 'lib_kenya_eml', 'lib_pharmacy_kenya', 'lib_kenya_pharmacopoeia', 'lib_kenya_tb', 'lib_kenya_malaria', 'lib_kenya_hiv', 'lib_kenya_poison'],
  },
  {
    title: 'Formularies & Drug References',
    description: 'Authoritative drug information, dosing and interaction references',
    ids: ['lib_bnf', 'lib_who_formulary', 'lib_sanford', 'lib_drug_interactions'],
  },
  {
    title: 'Clinical Guidelines',
    description: 'Standard-of-care guidelines from international bodies',
    ids: ['lib_gina', 'lib_gold', 'lib_esc_guidelines', 'lib_aha_guidelines', 'lib_ada', 'lib_thyroid', 'lib_kdigo', 'lib_nccn', 'lib_asco', 'lib_nice_cns', 'lib_who_pain', 'lib_who_antibiotic', 'lib_bsg', 'lib_ash', 'lib_nice_derm', 'lib_aaoo'],
  },
  {
    title: 'Open Resources & References',
    description: 'Freely accessible texts, references and educational materials',
    ids: ['lib_oer_pharma1', 'lib_oer_ncbi', 'lib_oer_merck', 'lib_brain_tree'],
  },
]

export default function OnlineLibraryScreen() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const allResources = LIBRARY
  const resourcesById = Object.fromEntries(allResources.map((r) => [r.id, r]))

  const filteredSections = SECTIONS.map((section) => {
    const books = section.ids
      .map((id) => resourcesById[id])
      .filter(Boolean) as LibraryResource[]

    if (!searchQuery.trim()) return { ...section, books }

    const q = searchQuery.toLowerCase()
    const matched = books.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.authors.toLowerCase().includes(q) ||
        r.keywords.toLowerCase().includes(q) ||
        r.subjects.some((s) => s.toLowerCase().includes(q)),
    )
    return { ...section, books: matched }
  }).filter((s) => s.books.length > 0)

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <BookOpen size={16} /> Online Library
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Clinova <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Library</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
              Curated textbooks, guidelines, and references for clinical pharmacy — aligned to the Brain Tree International Pharmacy Curriculum and Kenyan practice.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search by title, author, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
          <button onClick={() => navigate('/knowledge')} className="hover:text-[var(--primary)] transition-colors">Education Hub</button>
          <ChevronRight size={14} />
          <span className="text-[var(--text)] font-bold">Online Library</span>
        </div>

        {/* Book Sections */}
        {filteredSections.length > 0 ? (
          <div className="space-y-10">
            {filteredSections.map((section) => (
              <section key={section.title}>
                <div className="mb-4">
                  <h2 className="text-sm font-black text-[var(--text)] uppercase tracking-wider">{section.title}</h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{section.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {section.books.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-[var(--primary)] transition-all group"
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

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[var(--text-muted)] mb-2">
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
                        {resource.subjects.slice(0, 2).map((s) => (
                          <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-dim)] text-[var(--text-muted)] truncate max-w-[120px]">
                            {s}
                          </span>
                        ))}
                        {resource.subjects.length > 2 && (
                          <span className="text-[9px] text-[var(--text-dim)]">+{resource.subjects.length - 2}</span>
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
              </section>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">No books match your search</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">Try a different keyword.</p>
          </div>
        )}

      </div>
    </div>
  )
}
