import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, CheckCircle2, Bot, BookOpen, GraduationCap, FileUp, ShieldAlert
} from 'lucide-react';
import ClinovaLogo from '../components/ClinovaLogo';

export default function LandingScreen() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      color: "text-[var(--primary)] bg-[var(--primary-container)]",
      title: "AI Review Assistant",
      description: "Automated clinical partner to audit regimens and suggest evidence-based optimizations."
    },
    {
      icon: BookOpen,
      color: "text-[var(--primary)] bg-[var(--primary-container)]",
      title: "Clinical Library",
      description: "Instant answers cited directly from KDI, Medscape, and your uploaded notes."
    },
    {
      icon: GraduationCap,
      color: "text-[var(--primary)] bg-[var(--primary-container)]",
      title: "Study Suite",
      description: "Instantly convert notes into structured summaries, MCQs, and Podcast overviews."
    },
    {
      icon: FileUp,
      color: "text-[var(--primary)] bg-[var(--primary-container)]",
      title: "Smart Uploads",
      description: "Upload PDFs and images for personalized AI summarization and organization."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <ClinovaLogo size={32} variant="colored" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-[var(--text)]">CLINOVA</span>
            <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--primary)]/10 text-[var(--primary)] uppercase tracking-wider hidden sm:inline-block">Clinical Assistant</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-medium text-sm transition-all shadow-sm shadow-[var(--primary)]/20 flex items-center gap-2 active:scale-95"
          >
            Sign In
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-6xl w-full mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-container)] text-[var(--primary)] text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-3 backdrop-blur-sm border border-[var(--primary)]/20">
          <Sparkles size={14} />
          Your Smart Clinical Companion
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)] max-w-4xl leading-[1.15] mb-6">
          Advanced AI Assistance for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-purple-600">
            Pharmacy &amp; Medicine
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl font-normal leading-relaxed mb-10">
          Unifying automated reviews, instant answers from standard books, and Clinova study tools to transform your workflow.
        </p>

        {/* CTA Box */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] text-base font-semibold rounded-2xl shadow-lg shadow-[var(--primary)]/25 flex items-center justify-center gap-3 transition-all active:scale-98"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[var(--primary)]" /> Fast access
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[var(--primary)]" /> Reliable sources
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-[var(--primary)]" /> Time saving
          </span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[var(--surface-dim)]/50 border-t border-[var(--border)] py-16 px-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text)] mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simple CTA Banner */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Ready to start?</h2>
        <p className="text-[var(--text-muted)] mb-8">
          Sign in seamlessly to access the clinical tools and study hub.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text)] font-bold rounded-2xl transition-all shadow-sm border border-[var(--border)]"
        >
          Sign In Now
          <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
}

