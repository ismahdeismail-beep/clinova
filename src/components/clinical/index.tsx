import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  ChevronDown, Pill, Stethoscope, Lightbulb, AlertTriangle, CheckCircle2,
  BookOpen, FileText, FlaskConical, Activity, Link2, ListChecks,
} from 'lucide-react';

export const cx = clsx;

/* ---------------- Layout primitives ---------------- */

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('cl-card', className)} {...rest}>
      {children}
    </div>
  );
}

export function PageHeader({
  title, subtitle, icon, actions,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

/* ---------------- Collapsible section ---------------- */

export function Section({
  id, title, icon, children, defaultOpen = true, action, className,
}: {
  id?: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  action?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className={cx('scroll-mt-24', className)}>
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group flex items-center gap-2 text-left"
        >
          {icon && <span className="text-[var(--primary)]">{icon}</span>}
          <span className="cl-section-title group-hover:text-[var(--text)] transition-colors">{title}</span>
          <ChevronDown
            size={16}
            className={cx('text-[var(--text-muted)] transition-transform', !open && '-rotate-90')}
          />
        </button>
        {action}
      </div>
      {open && <div className="pl-0.5">{children}</div>}
    </section>
  );
}

/* ---------------- Medicine / disease links ---------------- */

export function MedicineLink({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <button type="button" className="cl-med" onClick={onClick} title={`Open ${name} monograph`}>
      {name}
    </button>
  );
}

export function DiseaseLink({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <button type="button" className="cl-dz" onClick={onClick} title={`Open ${name} monograph`}>
      {name}
    </button>
  );
}

export function MedicineChip({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <button type="button" className="cl-pill cl-pill-medicine" onClick={onClick}>
      <Pill size={13} /> {name}
    </button>
  );
}

export function DiseaseChip({ name, onClick }: { name: string; onClick?: () => void }) {
  return (
    <button type="button" className="cl-pill cl-pill-disease" onClick={onClick}>
      <Stethoscope size={13} /> {name}
    </button>
  );
}

/* ---------------- Highlight prose ---------------- */

function escapeReg(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function HighlightText({
  text, medicines = [], diseases = [], onMedicine, onDisease,
}: {
  text: string;
  medicines?: string[];
  diseases?: string[];
  onMedicine?: (name: string) => void;
  onDisease?: (name: string) => void;
}) {
  const terms = [
    ...medicines.map((m) => ({ t: m, kind: 'med' as const })),
    ...diseases.map((d) => ({ t: d, kind: 'dz' as const })),
  ].filter((x) => x.t && x.t.length > 2)
    .sort((a, b) => b.t.length - a.t.length);
  if (terms.length === 0) return <>{text}</>;
  const pattern = terms.map((x) => escapeReg(x.t)).join('|');
  const re = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) => {
        const match = terms.find((x) => x.t.toLowerCase() === part.toLowerCase());
        if (match && match.kind === 'med') {
          return <MedicineLink key={i} name={part} onClick={() => onMedicine?.(part)} />;
        }
        if (match && match.kind === 'dz') {
          return <DiseaseLink key={i} name={part} onClick={() => onDisease?.(part)} />;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

/* ---------------- Vitals & Labs ---------------- */

export function VitalsGrid({ vitals }: { vitals: { label: string; value: string; unit?: string; abnormal: boolean }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
      {vitals.map((v, i) => (
        <div key={i} className={cx('cl-vital', v.abnormal && 'cl-vital-abnormal')}>
          <div className="text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{v.label}</div>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className={cx('text-lg font-bold', v.abnormal ? 'text-[var(--danger)]' : 'text-[var(--text)]')}>
              {v.value || '—'}
            </span>
            {v.unit && <span className="text-xs text-[var(--text-muted)]">{v.unit}</span>}
          </div>
          {v.abnormal && (
            <span className="inline-flex items-center gap-0.5 text-[0.65rem] font-semibold text-[var(--danger)] mt-0.5">
              <AlertTriangle size={11} /> Abnormal
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function LabTable({ labs }: { labs: { test: string; value: string; unit?: string; range?: string; abnormal: boolean }[] }) {
  return (
    <div className="cl-card overflow-hidden">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-left border-b-2 border-[var(--border)]">
            <th className="px-4 py-3 font-semibold text-[var(--text)] border-b border-[var(--border)]">Test</th>
            <th className="px-4 py-3 font-semibold text-[var(--text)] border-b border-[var(--border)]">Result</th>
            <th className="px-4 py-3 font-semibold text-[var(--text)] border-b border-[var(--border)]">Reference</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((l, i) => (
            <tr key={i} className="border-t border-[var(--border)] hover:bg-[var(--surface-dim)]/50 transition-colors">
              <td className="px-4 py-3 text-[var(--text)] border-r border-[var(--border)]">{l.test}</td>
              <td className={cx('px-4 py-3 font-semibold text-[var(--text)] border-r border-[var(--border)]', l.abnormal ? 'cl-lab-abnormal' : 'cl-lab-normal')}>
                {l.value} {l.unit || ''}
                {l.abnormal && <AlertTriangle size={12} className="inline ml-1" />}
              </td>
              <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{l.range || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Panels ---------------- */

export function PearlPanel({ title = 'Clinical Pearl', children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="cl-panel cl-panel-pearl">
      <div className="flex items-center gap-2 font-semibold text-[var(--pearl)] mb-1">
        <Lightbulb size={16} /> {title}
      </div>
      <div className="text-sm text-[var(--text)] leading-relaxed">{children}</div>
    </div>
  );
}

export function WarningPanel({ title = 'Warning', children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="cl-panel cl-panel-warning">
      <div className="flex items-center gap-2 font-semibold text-[var(--danger)] mb-1">
        <AlertTriangle size={16} /> {title}
      </div>
      <div className="text-sm text-[var(--text)] leading-relaxed">{children}</div>
    </div>
  );
}

export function InfoPanel({ title = 'Note', children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="cl-panel cl-panel-info">
      <div className="flex items-center gap-2 font-semibold text-[var(--info)] mb-1">
        <CheckCircle2 size={16} /> {title}
      </div>
      <div className="text-sm text-[var(--text)] leading-relaxed">{children}</div>
    </div>
  );
}

export function DTPCard({ index, problem, onClick }: { index?: number; problem: string; onClick?: () => void }) {
  return (
    <div className="cl-card p-3.5 border-l-4 border-l-[var(--danger)]">
      <div className="flex items-start gap-2.5">
        <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--danger-container)] text-[var(--danger)] flex items-center justify-center text-xs font-bold">
          {index ?? '!'}
        </span>
        <p className="text-sm text-[var(--text)] leading-relaxed flex-1">{problem}</p>
        {onClick && (
          <button type="button" onClick={onClick} className="text-[var(--text-muted)] hover:text-[var(--primary)] shrink-0">
            <Link2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)]">
          <ListChecks size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Lists / chips ---------------- */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)]">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Sticky nav + scroll progress ---------------- */

export function StickySectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const root = document.getElementById('main-scroll-area');
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root, rootMargin: '0px 0px -70% 0px' },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);
  return (
    <nav className="cl-section-nav hidden xl:block w-52 shrink-0">
      <div className="cl-section-title mb-2">On this page</div>
      <ul className="space-y-1 border-l border-[var(--border)]">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cx(
                'block pl-3 -ml-px border-l-2 text-sm py-1 transition-colors',
                active === it.id
                  ? 'border-[var(--primary)] text-[var(--primary)] font-medium'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]',
              )}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const root = document.getElementById('main-scroll-area');
    const target = root ?? window;
    const onScroll = () => {
      const el = root;
      if (el) {
        const max = el.scrollHeight - el.clientHeight;
        setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
      }
    };
    target.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => target.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="cl-scroll-progress" style={{ width: `${pct}%` }} />;
}

/* ---------------- Related resources ---------------- */

export type RelatedItem = {
  kind: 'case' | 'drug' | 'disease' | 'book' | 'flashcard' | 'oral' | 'assessment' | 'guideline';
  title: string;
  subtitle?: string;
  onClick?: () => void;
};

const RELATED_ICON: Record<RelatedItem['kind'], React.ReactNode> = {
  case: <FileText size={15} />,
  drug: <Pill size={15} />,
  disease: <Stethoscope size={15} />,
  book: <BookOpen size={15} />,
  flashcard: <FlaskConical size={15} />,
  oral: <Activity size={15} />,
  assessment: <CheckCircle2 size={15} />,
  guideline: <FileText size={15} />,
};

export function RelatedResources({ items, title = 'Related Resources' }: { items: RelatedItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <div className="cl-card p-4">
      <div className="cl-section-title mb-3">{title}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={it.onClick}
            className="flex items-center gap-2.5 text-left p-2.5 rounded-lg hover:bg-[var(--surface-dim)] transition-colors border border-transparent hover:border-[var(--border)]"
          >
            <span className="shrink-0 w-8 h-8 rounded-lg bg-[var(--primary-container)] text-[var(--primary)] flex items-center justify-center">
              {RELATED_ICON[it.kind]}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-[var(--text)] truncate">{it.title}</span>
              {it.subtitle && <span className="block text-xs text-[var(--text-muted)] truncate">{it.subtitle}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Dashboard widgets ---------------- */

export function StatTile({ label, value, hint, icon }: { label: string; value: React.ReactNode; hint?: string; icon?: React.ReactNode }) {
  return (
    <div className="cl-card p-4">
      <div className="flex items-center justify-between">
        <span className="cl-section-title">{label}</span>
        {icon && <span className="text-[var(--text-muted)]">{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-[var(--text)] mt-1.5">{value}</div>
      {hint && <div className="text-xs text-[var(--text-muted)] mt-0.5">{hint}</div>}
    </div>
  );
}

export function ProgressRing({ value, label, size = 64 }: { value: number; label?: string; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-dim)" strokeWidth={6} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--primary)" strokeWidth={6} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
        />
      </svg>
      <div className="-mt-[calc(50%+2px)] text-sm font-bold text-[var(--text)]" style={{ height: 0 }}>
        {Math.round(value)}%
      </div>
      {label && <span className="text-xs text-[var(--text-muted)] mt-1">{label}</span>}
    </div>
  );
}

export function EmptyState({ icon, title, hint }: { icon?: React.ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      {icon && <div className="w-12 h-12 rounded-2xl bg-[var(--surface-dim)] text-[var(--text-muted)] flex items-center justify-center mb-3">{icon}</div>}
      <p className="font-medium text-[var(--text)]">{title}</p>
      {hint && <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs">{hint}</p>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx('cl-skeleton', className)} />;
}
