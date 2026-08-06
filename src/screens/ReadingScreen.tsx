import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  Sparkles,
  Lightbulb,
} from 'lucide-react'
import { DAILY_READINGS, getDailyReadingById } from '../data/dailyReadings'

export default function ReadingScreen() {
  const { articleId } = useParams<{ articleId: string }>()
  const navigate = useNavigate()
  const reading = getDailyReadingById(articleId || '')

  if (!reading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto pt-16">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-10 text-center">
          <BookOpen size={36} className="mx-auto text-[var(--text-muted)]/40 mb-3" />
          <h1 className="text-lg font-bold text-[var(--text)]">Reading not found</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            This reading may have been updated. Pick another one below.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>
        </div>
        <RelatedReadings currentId={''} />
      </div>
    )
  }

  const Icon = reading.icon
  const related = DAILY_READINGS.filter((r) => r.id !== reading.id).slice(0, 3)

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-6 pb-24">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Hero */}
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${reading.theme.gradient} text-white overflow-hidden shadow-lg`}
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/[0.08] blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              <Icon size={12} />
              {reading.badge}
            </span>
            <span className="text-[11px] text-white/80 font-medium">{reading.category}</span>
            <span className="text-white/50">·</span>
            <span className="text-[11px] text-white/80 flex items-center gap-1">
              <Clock size={11} />
              {reading.readTime}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            {reading.title}
          </h1>
          <p className="text-white/85 text-sm leading-relaxed mt-3 max-w-2xl">
            {reading.summary}
          </p>
        </div>
      </div>

      {/* Sections */}
      <article className="space-y-6">
        {reading.sections.map((section, idx) => (
          <section
            key={idx}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden"
          >
            <div className={`px-5 py-3 border-b border-[var(--border)] flex items-center gap-2.5 bg-gradient-to-r ${reading.theme.chip} bg-opacity-50`}>
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${reading.theme.chip}`}>
                {idx + 1}
              </span>
              <h2 className="font-bold text-sm text-[var(--text)]">{section.heading}</h2>
            </div>
            <div className="p-5 space-y-3">
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 pt-1">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text)]">
                      <span className={`w-1.5 h-1.5 rounded-full ${reading.theme.dot} mt-1.5 shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.callout && (
                <div className={`rounded-xl border ${reading.theme.border} ${reading.theme.chip} p-4 flex items-start gap-3`}>
                  <Lightbulb size={16} className="shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed font-medium">{section.callout}</p>
                </div>
              )}
            </div>
          </section>
        ))}
      </article>

      {/* Related readings */}
      {related.length > 0 && (
        <div className="pt-2">
          <h3 className="text-base font-bold text-[var(--text)] flex items-center gap-2 mb-3">
            <Sparkles size={16} className={reading.theme.text} />
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {related.map((r) => {
              const RIcon = r.icon
              return (
                <Link
                  key={r.id}
                  to={`/reading/${r.id}`}
                  className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:shadow-md transition-all p-4 flex flex-col"
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${r.theme.gradient} flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform`}>
                    <RIcon size={16} className="text-white" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    {r.category}
                  </p>
                  <p className="text-xs font-bold text-[var(--text)] leading-snug line-clamp-2 mb-2 flex-1">
                    {r.title}
                  </p>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${reading.theme.text}`}>
                    Read
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function RelatedReadings({ currentId }: { currentId?: string }) {
  const related = DAILY_READINGS.filter((r) => r.id !== currentId).slice(0, 3)
  if (related.length === 0) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
      {related.map((r) => {
        const RIcon = r.icon
        return (
          <Link
            key={r.id}
            to={`/reading/${r.id}`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:shadow-md transition-all p-4 flex flex-col"
          >
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${r.theme.gradient} flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform`}>
              <RIcon size={16} className="text-white" />
            </div>
            <p className="text-xs font-bold text-[var(--text)] leading-snug line-clamp-2 mb-2 flex-1">
              {r.title}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--primary)]">
              Read
              <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
