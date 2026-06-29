import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Stethoscope, Users, Pill, Bot, BookOpen, GraduationCap, 
  ArrowRight, Sparkles, CheckCircle2, FileText, Headphones, FileUp, ShieldCheck
} from 'lucide-react';

export default function LandingScreen() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      color: "text-purple-500 bg-purple-500/10",
      title: "Auto AI & Pharmacotherapy Review Assistance",
      description: "Our interactive Pharmacotherapy Review Form helps evaluate drug indications, dosing accuracy, contraindications, and potential interactions. The AI acts as an automated clinical partner to audit regimens and suggest evidence-based optimizations."
    },
    {
      icon: BookOpen,
      color: "text-emerald-500 bg-emerald-500/10",
      title: "Online Reference Library (KDI, Medscape & More)",
      description: "Integrated directly with authoritative sources including Kenya Drug Index (KDI), Essential Medicines lists, and Medscape monographs. Ask any question and receive accurate answers cited directly from these books or your uploaded notes."
    },
    {
      icon: GraduationCap,
      color: "text-blue-500 bg-blue-500/10",
      title: "Exam Preparation & Study Suite",
      description: "Tailored assistance for reading and preparing for professional examinations. Instantly convert uploaded notes and chapters into structured short notes, multiple question formats (MCQs, OSCEs, true/false), and generated Podcast Audio overviews."
    },
    {
      icon: FileUp,
      color: "text-amber-500 bg-amber-500/10",
      title: "Smart Uploads & Curated Resources",
      description: "Upload your personal lecture notes, PDFs, and images for personalized AI summarization. Administrators maintain global quality by adding official books, clinical URLs, and standardized study materials accessible to the entire community."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col selection:bg-[var(--primary)] selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)] shadow-sm">
            <Pill size={24} />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-[var(--text)]">CLINOVA</span>
            <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--primary)]/10 text-[var(--primary)] uppercase tracking-wider">Pharmacy AI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium text-sm transition-all shadow-sm shadow-[var(--primary)]/20 flex items-center gap-2 active:scale-95"
          >
            Sign In
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-6xl w-full mx-auto px-6 pt-12 pb-20 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-container)] text-[var(--primary)] text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-3">
          <Sparkles size={14} />
          Dedicated Hub for Pharmacists, Pharmacy Students & Healthcare Professionals
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)] max-w-4xl leading-[1.15] mb-6">
          Advanced AI Assistance for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-indigo-500 to-purple-600">
            Pharmacy Practice & Study Prep
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-3xl font-normal leading-relaxed mb-10">
          Unifying automated Pharmacotherapy Reviews, instant Q&amp;A from standard medical books like KDI and Medscape, and AI-powered study conversion tools to transform how you learn and practice.
        </p>

        {/* CTA Box */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-base font-semibold rounded-2xl shadow-lg shadow-[var(--primary)]/25 flex items-center justify-center gap-3 transition-all active:scale-98"
          >
            Access Portal / Sign In
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" /> Google Account Access
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" /> Notes to Short Notes &amp; Audio
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-500" /> KDI &amp; Essential Medicines
          </span>
        </div>
      </section>

      {/* Explanation Banner / What it's all about */}
      <section className="bg-[var(--surface)] border-y border-[var(--border)] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--primary)] mb-2">What The Site is All About</h2>
            <p className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
              Intelligent assistance designed to empower pharmaceutical care and academic success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 ${f.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pharmacotherapy Review Deep Dive */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[var(--primary-container)]/30 via-[var(--surface)] to-[var(--surface)] p-8 sm:p-12 rounded-3xl border border-[var(--border)] flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-600 font-semibold text-xs uppercase tracking-wider">
              Clinical Core
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              Understanding the Pharmacotherapy Review Form
            </h2>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
              The Pharmacotherapy Review Form is a structured tool for evaluating patient medication profiles. It systematically guides healthcare professionals through indication matching, dose checking, drug interaction auditing, and monitoring plan setup.
            </p>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
              <strong>Auto AI Integration:</strong> Simply input or upload patient cases, and the Auto AI engine instantly checks regimens against KDI formularies and clinical references to flag duplications, renal dose adjustments, and safety alerts.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline"
              >
                Sign in to try the Review Form <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-80 bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)] shadow-sm space-y-3 shrink-0">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider pb-1 border-b border-[var(--border)]">
              Review Checklist Example
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <CheckCircle2 size={16} /> Indication &amp; Efficacy Verified
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <CheckCircle2 size={16} /> Dosing &amp; Administration Checked
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
              <Sparkles size={16} /> Auto AI Interaction Audit
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
              <BookOpen size={16} /> KDI &amp; Medscape Monograph Match
            </div>
          </div>
        </div>
      </section>

      {/* Simple Step Banner */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Ready to enter your study &amp; clinical assistant?</h2>
        <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
          Sign in seamlessly with your Google email or returning access to start converting notes, checking drugs, and exploring online books.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[var(--primary)]/20"
        >
          Go to Sign In Page
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6 text-center text-xs text-[var(--text-muted)] bg-[var(--surface)] mt-auto">
        <p>© {new Date().getFullYear()} Clinova Hub. All rights reserved. Built for Pharmacists, Students &amp; Healthcare Givers.</p>
      </footer>
    </div>
  );
}
