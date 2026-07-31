import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ClipboardCheck, ChevronRight } from 'lucide-react';
import { EXAM_PREP_UNITS } from '../data/examPrepData';

const EXAM_MODULES = [
  {
    id: 'board-exam',
    title: 'Board Exam',
    description: 'Past board exam papers with instant feedback, model answers, and scoring. Test your readiness with real clinical pharmacy questions.',
    icon: GraduationCap,
    color: 'from-indigo-500/10 to-indigo-500/20',
    iconColor: 'text-indigo-600',
    route: '/exam/board-exam',
    count: '5 Sets',
  },
  {
    id: 'exam-prep',
    title: 'Exam Prep',
    description: 'Practice papers modelled on the clinical pharmacy exam pattern. Section A MCQs, Section B short-answer, and Section C structured questions.',
    icon: ClipboardCheck,
    color: 'from-violet-500/10 to-violet-500/20',
    iconColor: 'text-violet-600',
    route: '/exam/prep',
    count: `${EXAM_PREP_UNITS.length} Units`,
  },
];

export default function ExamScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <GraduationCap size={16} /> Exam
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight leading-tight">
              Board Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">& Exam Prep</span>
            </h1>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAM_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => navigate(mod.route)}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-md group flex flex-col h-full relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${mod.color}`}>
                    <Icon size={26} className={mod.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{mod.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{mod.count}</p>
                  </div>
                  <ChevronRight size={20} className="text-[var(--border)] group-hover:translate-x-1 group-hover:text-[var(--primary)] transition-all shrink-0" />
                </div>
                <p className="text-sm text-[var(--text-muted)] line-clamp-2 mt-auto leading-relaxed">{mod.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
