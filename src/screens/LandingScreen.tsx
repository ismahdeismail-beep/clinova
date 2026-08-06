import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Sparkles, CheckCircle2, Bot, BookOpen, GraduationCap,
  FileText, Shield, Brain, Stethoscope, Library, Target,
  ChevronRight, Star, Users, BarChart3, Layers, Pill,
  ClipboardCheck, Image,
} from 'lucide-react'
import ClinovaLogo from '../components/ClinovaLogo'
import { useContentStats, FALLBACK_DRUGS, FALLBACK_CASES } from '../hooks/useContentStats'
import { getAllCarePlanDiseases } from '../data/carePlanData'

const CARE_PLAN_COUNT = getAllCarePlanDiseases().length

export default function LandingScreen() {
  const navigate = useNavigate()

  const { drugCount, caseCount, areaCount, carePlanCount, loading } = useContentStats()
  const therapeuticAreaCount = areaCount

  const stats = [
    { value: String(therapeuticAreaCount), label: 'Therapeutic Areas', icon: Layers, live: !loading },
    { value: String(caseCount ?? FALLBACK_CASES), label: 'Clinical Cases', icon: Stethoscope, live: !loading },
    { value: String(drugCount ?? FALLBACK_DRUGS), label: 'Drug Monographs', icon: Pill, live: !loading },
    { value: String(carePlanCount || CARE_PLAN_COUNT), label: 'Care Plans', icon: ClipboardCheck, live: !loading },
  ]

  const features = [
    {
      icon: Stethoscope,
      title: 'Clinical Cases',
      description:
        `Work through real-world clinical scenarios across ${therapeuticAreaCount} therapeutic areas. Build diagnostic reasoning and treatment planning skills with guided feedback.`,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: BookOpen,
      title: 'Education Hub',
      description:
        'Five integrated modules — Exam (Board Exam & Exam Prep), Clinical Pharmacy & Therapeutics, Online Books, Clinical Cases, and Clinova Support — with disease monographs, study guides, tutor sessions, flashcards, and curated pharmacy resources.',
      gradient: 'from-sky-500 to-blue-600',
    },
    {
      icon: GraduationCap,
      title: 'Exam & Board Exam',
      description:
        'Mock papers modelled on the real clinical-pharmacy exam in standard 30/40/30 format, plus a dedicated Board Exam module for focused preparation. Covers both clinical pharmacy and pharmacology curricula.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: ClipboardCheck,
      title: 'Nursing Care Plans',
      description:
        'Structured NANDA, NIC, and NOC care plans across 19 specialties with 92 fully detailed care plans covering pathophysiology, diagnoses, interventions, and discharge planning.',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Bot,
      title: 'Clinova Support',
      description:
        'Clinical decision support — audit regimens, answer drug questions, and suggest evidence-based optimisations from trusted references.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Drug Index',
      description:
        'Comprehensive drug monographs with dosing, interactions, contraindications, adverse effects, and therapeutic monitoring parameters.',
      gradient: 'from-cyan-500 to-indigo-600',
    },
    {
      icon: Image,
      title: 'Drug Visuals',
      description:
        'Thousands of medicine images — tablets, injections, and dosage forms — embedded in drug monographs for visual identification and safe prescribing.',
      gradient: 'from-rose-500 to-pink-600',
    },
  ]

  const steps = [
    {
      step: '01',
      title: 'Choose Your Focus',
      desc: 'Pick a therapeutic area, clinical case, exam paper, or care plan specialty that matches your learning goals.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      step: '02',
      title: 'Learn & Practice',
      desc: 'Review disease monographs, work through cases, attempt timed mock papers, or study structured care plans.',
      color: 'from-sky-500 to-blue-500',
    },
    {
      step: '03',
      title: 'Track Progress',
      desc: 'Monitor your performance across subjects, identify weak areas, and build confidence before exam day.',
      color: 'from-violet-500 to-purple-500',
    },
  ]

  const audiences = [
    {
      title: 'Pharmacy Students',
      desc: 'Prepare for clinical pharmacy exams with mock papers, case-based learning, care plans, and comprehensive disease reviews.',
      icon: GraduationCap,
    },
    {
      title: 'Clinical Pharmacists',
      desc: 'Stay current with evidence-based guidelines, drug monographs, and clinical decision-support tools.',
      icon: Stethoscope,
    },
    {
      title: 'Nursing & Allied Health',
      desc: 'Access structured nursing care plans with NANDA/NIC/NOC standards across 19 clinical specialties.',
      icon: ClipboardCheck,
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] overflow-x-hidden">
      {/* ──────────────────────── Sticky Top Bar ──────────────────────── */}
      <header className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ClinovaLogo size={30} variant="colored" />
            <span className="font-bold text-lg tracking-tight">CLINOVA</span>
            <span className="ml-1.5 hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--primary)]/10 text-[var(--primary)] uppercase tracking-widest">
              Clinical Support
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold text-sm transition-all shadow-lg shadow-[var(--primary)]/25 flex items-center gap-2 active:scale-95"
            >
              Sign In
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────────────── Hero Section ──────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--primary)]/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--primary)]/5 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-3">
            <Sparkles size={14} />
            Your Smart Clinical Companion
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6">
            Advanced Clinical Training for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-purple-600">
              Pharmacy &amp; Medicine
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl font-normal leading-relaxed mb-10">
            Master clinical pharmacy with integrated case-based learning, structured nursing care plans,
            mock exam papers, disease monographs, and clinical support — all in one platform.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
            <button
              onClick={() => navigate('/login')}
              className="group w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-base font-semibold rounded-2xl shadow-xl shadow-[var(--primary)]/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              Get Started Free
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm font-medium text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Evidence-based content
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Curriculum-aligned
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Free to use
            </span>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Stats Bar ──────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--surface-dim)]/40">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                <Icon size={22} className="text-[var(--primary)]" />
                {s.live ? (
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{s.value}</span>
                ) : (
                  <span className="block w-16 h-8 rounded-md bg-[var(--surface-dim)] animate-pulse" aria-hidden />
                )}
                <span className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">{s.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ──────────────────────── Features Grid ──────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Everything you need to excel
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              A complete clinical pharmacy study ecosystem — from care plans to exam preparation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon
              return (
                <div
                  key={idx}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-[var(--surface)]/70 backdrop-blur-sm border border-[var(--border)] hover:border-[var(--primary)]/30 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Gradient icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${f.gradient} shadow-md`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────── How It Works ──────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-[var(--surface-dim)]/30 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              How it works
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Three simple steps to transform your clinical pharmacy study routine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500" />

            {steps.map((s, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div
                  className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-xl mb-6`}
                >
                  <span className="text-white text-lg font-black">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── For Whom ──────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Built for the clinical pharmacy community
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Whether you are studying, teaching, or practising — Clinova fits your workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {audiences.map((a, idx) => {
              const Icon = a.icon
              return (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-2xl bg-[var(--surface)]/50 border border-[var(--border)] hover:border-[var(--primary)]/20 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{a.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{a.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────── Final CTA ──────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[var(--surface-dim)]/40 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold mb-6">
            <Star size={14} />
            Start learning today
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">Ready to elevate your practice?</h2>
          <p className="text-[var(--text-muted)] text-lg mb-8 max-w-xl mx-auto">
            Join clinical pharmacy students and professionals using Clinova to study smarter and deliver better care.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-bold rounded-2xl shadow-xl shadow-[var(--primary)]/25 transition-all active:scale-[0.98]"
          >
            Get Started Free
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-xs text-[var(--text-muted)]">No credit card required. Free forever.</p>
        </div>
      </section>

      {/* ──────────────────────── Footer ──────────────────────── */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ClinovaLogo size={22} variant="colored" />
            <span className="text-sm font-bold tracking-tight">CLINOVA</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--text-muted)]">
            <span>Clinical Support Platform</span>
            <span className="hidden sm:inline">·</span>
            <span>&copy; {new Date().getFullYear()} Clinova. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
