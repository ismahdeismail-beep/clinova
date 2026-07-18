import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, Download, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import { EXAM_PREP_UNITS, type ExamUnitSpec } from '../data/examPrepData';
import { getExamPrepPaper, type GeneratedPaper } from '../data/examPrepPapers';

const txt = (v: any): string => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join('\n');
  if (typeof v === 'object') {
    return Object.entries(v)
      .map(([k, val]) => `${k}: ${typeof val === 'object' ? JSON.stringify(val) : val}`)
      .join('\n');
  }
  return String(v);
};

const opts = (v: any): string[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? x : JSON.stringify(x)));
  return [txt(v)];
};

function PaperCard({ spec, variant }: { spec: ExamUnitSpec; variant: number }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const paper: GeneratedPaper | undefined = getExamPrepPaper(spec.id, variant);

  const download = () => {
    if (!paper) return;
    const lines: string[] = [];
    lines.push(`${paper.title} — Mock Paper ${paper.variant || variant}`);
    lines.push('='.repeat(60));
    lines.push('');
    paper.sections.forEach((sec) => {
      lines.push(`SECTION ${sec.letter}: ${sec.name} [${sec.marks} marks]`);
      lines.push('-'.repeat(40));
      sec.questions.forEach((q, i) => {
        lines.push(`${i + 1}. ${q.stem}`);
        if (q.options && q.options.length) q.options.forEach((o) => lines.push(`   ${o}`));
        if (showAnswers) {
          lines.push(`   ANSWER: ${q.answer || q.modelAnswer || ''}`);
          if (q.explanation) lines.push(`   NOTE: ${q.explanation}`);
        }
        lines.push('');
      });
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${spec.id}-paper-${variant}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!paper) {
    return (
      <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--surface)] text-xs text-[var(--text-muted)]">
        Mock Paper {variant} is not available yet.
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--surface)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[var(--primary)]">Mock Paper {variant}</span>
          <span className="text-[11px] text-[var(--text-muted)]">
            {spec.structure.reduce((a, s) => a + s.count, 0)} questions ·{' '}
            {spec.structure.reduce((a, s) => a + s.marks, 0)} marks
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAnswers((v) => !v)}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            {showAnswers ? <EyeOff size={13} /> : <Eye size={13} />}
            {showAnswers ? 'Hide answers' : 'Show answers'}
          </button>
          <button
            onClick={download}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            <Download size={13} /> Download
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-5">
        {paper.sections.map((sec) => (
          <div key={sec.letter}>
            <h4 className="text-[13px] font-bold text-[var(--text)] mb-2">
              Section {sec.letter}: {sec.name}{' '}
              <span className="text-[var(--text-muted)] font-normal">[{sec.marks} marks]</span>
            </h4>
            <ol className="space-y-3 list-decimal list-inside">
              {sec.questions.map((q, i) => (
                <li key={i} className="text-[13px] text-[var(--text)]">
                  <span className="font-medium">{txt(q.stem)}</span>
                  {opts(q.options).length > 0 && (
                    <ul className="mt-1 ml-5 list-[lower-alpha] space-y-0.5 text-[12px] text-[var(--text-muted)]">
                      {opts(q.options).map((o, oi) => (
                        <li key={oi} className={showAnswers && txt(q.answer) === o ? 'text-emerald-600 font-semibold' : ''}>
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}
                  {showAnswers && (q.answer || q.modelAnswer) && (
                    <div className="mt-1 ml-5 text-[12px] text-emerald-600">
                      <span className="font-semibold">Answer: </span>
                      {txt(q.answer || q.modelAnswer)}
                    </div>
                  )}
                  {showAnswers && q.explanation && (
                    <div className="mt-1 ml-5 text-[12px] text-[var(--text-muted)] italic">{txt(q.explanation)}</div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamSubjectCard({ spec }: { spec: ExamUnitSpec }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 hover:bg-[var(--surface-2)] transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          {open ? <BookOpen size={18} className="text-[var(--primary)]" /> : <FileText size={18} className="text-[var(--text-muted)]" />}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[var(--text)]">{spec.title}</span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">
              {spec.structure.length} sections · {spec.structure.reduce((a, s) => a + s.marks, 0)} marks ·{' '}
              {spec.topics.length} topic areas
            </span>
          </div>
        </div>
        {open ? null : <CheckCircle2 size={16} className="text-emerald-500" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <div className="grid gap-2 sm:grid-cols-3">
            {spec.structure.map((s) => (
              <div key={s.letter} className="rounded-xl border border-[var(--border)] p-3">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[var(--primary)]">
                  Section {s.letter}
                </div>
                <div className="text-[12px] text-[var(--text)] mt-1">{s.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {s.count} Qs · {s.marks} marks
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 italic">{s.instruction}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[12px] font-bold text-[var(--text)] mb-2 flex items-center gap-2">
              <FileText size={14} className="text-[var(--primary)]" /> Topics covered (from the latest past paper)
            </div>
            <div className="flex flex-wrap gap-2">
              {spec.topics.map((t, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[12px] font-bold text-[var(--text)]">Two mock papers (pre-generated)</div>
            <PaperCard spec={spec} variant={1} />
            <PaperCard spec={spec} variant={2} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExamPrepView({ subjectId }: { subjectId?: string }) {
  const specs = subjectId ? EXAM_PREP_UNITS.filter((s) => s.id === subjectId) : EXAM_PREP_UNITS;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-[var(--primary)]" />
        <h2 className="text-lg font-bold text-[var(--text)]">Exam Prep</h2>
      </div>
      <p className="text-sm text-[var(--text-muted)]">
        Practice papers modelled on the real clinical-pharmacy exam pattern. Each subject shows the section
        structure and topic areas drawn from the most recent past paper, then provides two full mock papers
        (Section A MCQs, Section B short answers, Section C long answers) generated from that exam's content.
        Toggle answers to self-mark.
      </p>
      <div className="space-y-4">
        {specs.map((spec) => (
          <ExamSubjectCard key={spec.id} spec={spec} />
        ))}
      </div>
    </div>
  );
}
