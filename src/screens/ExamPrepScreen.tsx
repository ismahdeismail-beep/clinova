import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Award, FlaskConical, FileText, History } from 'lucide-react';
import { EXAM_PREP_MODULES, getExamPrepModule, getTrackById, findUnitTrack } from '../data/examPrepData';
import { ModuleCard, ModuleOverview, UnitCard, PaperLinkCard, PaperCard, TrackCard, getPaperCount } from '../components/ExamPrepView';

const backButtonClass =
  'inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer';

export default function ExamPrepScreen() {
  const { moduleId, trackId, unitId, variant } = useParams<{
    moduleId?: string;
    trackId?: string;
    unitId?: string;
    variant?: string;
  }>();
  const navigate = useNavigate();

  const module = moduleId ? getExamPrepModule(moduleId) : undefined;
  const track = module && trackId ? getTrackById(module, trackId) : undefined;

  // Legacy deep-link redirect: pre-track URLs were moduleId/unitId[/variant].
  const legacyUnit = module && trackId && !track ? module.units.find((u) => u.id === trackId) : undefined;
  useEffect(() => {
    if (legacyUnit && module) {
      const owningTrack = findUnitTrack(module, legacyUnit.id);
      if (owningTrack) {
        const suffix = unitId ? `/${encodeURIComponent(unitId)}` : '';
        navigate(
          `/knowledge/exam/prep/${encodeURIComponent(module.id)}/${owningTrack.id}/${encodeURIComponent(legacyUnit.id)}${suffix}`,
          { replace: true }
        );
      }
    }
  }, [legacyUnit, module, unitId, navigate]);

  // ── Hub: no module selected (or unknown module id) ──
  if (!moduleId || !module) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold text-[var(--text)]">Exam Prep</h2>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Choose a module, then pick your curriculum track — Traditional (pre-revision syllabus) or Revised (current
          syllabus) — to practise the papers for that track.
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

  // Legacy redirect pending — effect will replace the URL.
  if (legacyUnit) {
    return null;
  }

  const ModuleIcon = module.id === 'clinical-pharmacy-exam' ? Award : FlaskConical;
  const unit = track ? track.units.find((u) => u.id === unitId) : undefined;

  // ── Paper page: full content, one paper at a time ──
  if (track && unit && variant !== undefined) {
    const variantNum = Number(variant);
    if (!Number.isNaN(variantNum) && variantNum >= 1 && variantNum <= getPaperCount(unit)) {
      return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
          <button
            onClick={() =>
              navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${track.id}/${encodeURIComponent(unit.id)}`)
            }
            className={backButtonClass}
          >
            <ArrowLeft size={14} /> {unit.title}
          </button>
          <PaperCard spec={unit} variant={variantNum} />
        </div>
      );
    }
  }

  // ── Unit page: list of papers ──
  if (track && unit) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
        <button
          onClick={() => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${track.id}`)}
          className={backButtonClass}
        >
          <ArrowLeft size={14} /> {track.shortLabel}
        </button>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-bold text-[var(--text)]">{unit.title}</h2>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          {unit.year && unit.trimester ? `Year ${unit.year} · Trimester ${unit.trimester} · ` : ''}
          {unit.structure.length} sections · {unit.structure.reduce((a, s) => a + s.count, 0)} questions ·{' '}
          {unit.structure.reduce((a, s) => a + s.marks, 0)} marks
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Array.from({ length: getPaperCount(unit) }, (_, i) => i + 1).map((v) => (
            <PaperLinkCard
              key={v}
              spec={unit}
              variant={v}
              onSelect={(vv) =>
                navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${track.id}/${encodeURIComponent(unit.id)}/${vv}`)
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Track page: list of units for the chosen curriculum track ──
  if (track) {
    const TrackIcon = track.id === 'traditional' ? History : Sparkles;
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
        <button onClick={() => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}`)} className={backButtonClass}>
          <ArrowLeft size={14} /> {module.title}
        </button>
        <div className="flex items-center gap-2">
          <TrackIcon size={18} className="text-[var(--primary)]" />
          <h2 className="text-lg font-bold text-[var(--text)]">{track.title}</h2>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          <span className="font-semibold text-[var(--primary)]">{track.badge}</span> — {track.description}
        </p>
        <div className="space-y-3">
          {track.units.map((spec) => (
            <UnitCard
              key={spec.id}
              spec={spec}
              onSelect={(u) =>
                navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${track.id}/${encodeURIComponent(u)}`)
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Module page: choose a curriculum track ──
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      <button onClick={() => navigate('/knowledge/exam/prep')} className={backButtonClass}>
        <ArrowLeft size={14} /> All modules
      </button>
      <div className="flex items-center gap-2">
        <ModuleIcon size={18} className="text-[var(--primary)]" />
        <h2 className="text-lg font-bold text-[var(--text)]">{module.title}</h2>
      </div>
      <p className="text-sm text-[var(--text-muted)]">{module.description}</p>
      <ModuleOverview mod={module} />
      <div className="grid gap-4">
        {module.tracks.map((t) => (
          <TrackCard
            key={t.id}
            track={t}
            onSelect={(tid) => navigate(`/knowledge/exam/prep/${encodeURIComponent(module.id)}/${tid}`)}
          />
        ))}
      </div>
    </div>
  );
}
