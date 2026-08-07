import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Award, FlaskConical, FileText } from 'lucide-react';
import { EXAM_PREP_MODULES, getExamPrepModule } from '../data/examPrepData';
import { ModuleCard, ModuleOverview, UnitCard, PaperLinkCard, PaperCard, getPaperCount } from '../components/ExamPrepView';

const backButtonClass =
  'inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer';

export default function ExamPrepScreen() {
  const { moduleId, unitId, variant } = useParams<{ moduleId?: string; unitId?: string; variant?: string }>();
  const navigate = useNavigate();

  const module = moduleId ? getExamPrepModule(moduleId) : undefined;

  // ── Hub: no module selected (or unknown module id) ──
  if (!moduleId || !module) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold text-[var(--text)]">Exam Prep</h2>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Choose a module to start practising. Each unit has mock papers with answers; past papers are also available.
        </p>
        <div className="grid gap-4">
          {EXAM_PREP_MODULES.map((mod) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              onSelect={(id) => navigate(`/knowledge/exam/prep/${encodeURIComponent(id)}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  const ModuleIcon = module.id === 'clinical-pharmacy-exam' ? Award : FlaskConical;
  const unit = unitId ? module.units.find((u) => u.id === unitId) : undefined;

  // ── Module page: list of units ──
  if (!unitId || !unit) {
    return (
      <div className="space-y-5">
        <button onClick={() => navigate('/knowledge/exam/prep')} className={backButtonClass}>
          <ArrowLeft size={14} /> All modules
        </button>
        <div className="flex items-center gap-2">
          <ModuleIcon size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-bold text-[var(--text)]">{module.title}</h2>
        </div>
        <p className="text-sm text-[var(--text-muted)]">{module.description}</p>
        <ModuleOverview mod={module} />
        <div className="space-y-3">
          {module.units.map((spec) => (
            <UnitCard
              key={spec.id}
              spec={spec}
              onSelect={(u) => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${encodeURIComponent(u)}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  const variantNum = variant !== undefined ? Number(variant) : NaN;
  const maxVariant = getPaperCount(unit);
  const validVariant = !Number.isNaN(variantNum) && variantNum >= 1 && variantNum <= maxVariant;

  // ── Unit page: list of papers ──
  if (variant === undefined || !validVariant) {
    return (
      <div className="space-y-5">
        <button onClick={() => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}`)} className={backButtonClass}>
          <ArrowLeft size={14} /> {module.title}
        </button>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-bold text-[var(--text)]">{unit.title}</h2>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          {unit.structure.length} sections · {unit.structure.reduce((a, s) => a + s.count, 0)} questions ·{' '}
          {unit.structure.reduce((a, s) => a + s.marks, 0)} marks
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {unit.source === 'real' ? (
            <div className="grid grid-cols-1 gap-3 max-w-sm">
              <PaperLinkCard
                spec={unit}
                variant={1}
                onSelect={(v) => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${encodeURIComponent(unit.id)}/${v}`)}
              />
            </div>
          ) : (
            [1, 2, 3].map((v) => (
              <PaperLinkCard
                key={v}
                spec={unit}
                variant={v}
                onSelect={(vv) => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${encodeURIComponent(unit.id)}/${vv}`)}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  // ── Paper page: full content, one paper at a time ──
  return (
    <div className="space-y-4">
      <button onClick={() => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${encodeURIComponent(unit.id)}`)} className={backButtonClass}>
        <ArrowLeft size={14} /> {unit.title}
      </button>
      <PaperCard spec={unit} variant={variantNum} />
    </div>
  );
}
