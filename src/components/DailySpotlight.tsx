import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pill,
  CalendarDays,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Globe2,
} from "lucide-react";
import { getDailySpotlight } from "../lib/dailySpotlight";

export default function DailySpotlight() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const spot = getDailySpotlight();

  const dateLabel = spot.date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const drug = spot.drug;
  const indications = (drug.indications || []).filter(Boolean);
  const isObservance = spot.isObservanceDay;

  const openMonograph = () =>
    navigate(`/drugs?q=${encodeURIComponent(drug.name)}`);

  return (
    <section
      aria-label="Daily clinical spotlight"
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden animate-in fade-in duration-300"
    >
      {/* Header band */}
      <div
        className={`flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[var(--border)] ${
          isObservance
            ? "bg-gradient-to-r from-[var(--primary)]/10 to-transparent"
            : "bg-[var(--surface-dim)]/60"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wide border shrink-0 ${
              isObservance
                ? "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20"
                : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]"
            }`}
          >
            {isObservance ? <Globe2 size={12} /> : <Sparkles size={12} />}
            {isObservance ? "WHO Health Day" : "Drug of the Day"}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[var(--text-muted)] font-medium">
            <CalendarDays size={13} className="shrink-0" />
            {dateLabel}
          </span>
        </div>
        {isObservance && (
          <span className="hidden sm:block text-xs font-semibold text-[var(--primary)] truncate">
            {spot.observance?.title}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Left: headline + explanation */}
        <div className="md:col-span-2 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center border border-[var(--primary)]/20 shrink-0">
              <Pill size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] tracking-tight leading-tight truncate">
                {isObservance ? drug.name : drug.name}
              </h2>
              {drug.generic_name && (
                <p className="text-xs text-[var(--text-muted)] truncate">
                  <span className="font-medium">Generic:</span> {drug.generic_name}
                </p>
              )}
            </div>
          </div>

          {drug.drug_class && (
            <span className="cl-pill cl-pill-medicine mt-3 inline-flex pointer-events-none">
              <Pill size={13} />
              {drug.drug_class}
            </span>
          )}

          <p className="text-sm leading-relaxed text-[var(--text-muted)] mt-3">
            {spot.lede}
          </p>

          {/* Expandable "Did you know" */}
          <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface-dim)]/50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--primary)] shrink-0" />
                Did you know?
              </span>
              <ChevronDown
                size={16}
                className={`text-[var(--text-muted)] shrink-0 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {expanded && (
              <div className="px-3.5 pb-3.5 -mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                {spot.fact}
              </div>
            )}
          </div>
        </div>

        {/* Right: actions + quick facts */}
        <div className="flex flex-col gap-3 md:border-l md:border-[var(--border)] md:pl-5">
          <button
            onClick={openMonograph}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-semibold hover:opacity-90 transition-all cursor-pointer"
          >
            View full monograph
            <ArrowRight size={15} />
          </button>

          {isObservance && spot.observance?.learnMoreUrl && (
            <a
              href={spot.observance.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-xl text-sm font-semibold hover:bg-[var(--surface-dim)] transition-all"
            >
              Learn more on WHO
              <ExternalLink size={14} />
            </a>
          )}

          {indications.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] p-3.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Key indications
              </div>
              <ul className="space-y-1.5">
                {indications.slice(0, 4).map((ind, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[var(--text)] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/60 mt-1.5 shrink-0" />
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
