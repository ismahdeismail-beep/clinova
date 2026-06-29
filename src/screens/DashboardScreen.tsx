import React, { useState } from "react";
import {
  Search,
  Bot,
  BookOpen,
  Clock,
  Activity,
  Bookmark,
  ChevronRight,
  BrainCircuit,
  FileText,
  Pill,
  Stethoscope,
  Sparkles,
  FileUp,
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  Users,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

import { PatientTriage } from "../components/PatientTriage";
import { ShiftHandoverModal } from "../components/ShiftHandoverModal";

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const { userData } = useAuth();
  const isAdmin = userData?.role === "admin";

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] rounded-2xl p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              Pharmacy AI &amp; Study Assistant
            </h1>
            <p className="text-white/80 max-w-lg text-sm leading-relaxed">
              {isAdmin
                ? "Admin Repository Management: Add authoritative books, formularies, and reference URLs accessible to the entire learning community."
                : "Your automated AI partner for pharmacotherapy reviews, instant answers from KDI and Medscape, and converting study notes into exam questions &amp; podcasts."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/knowledge"
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-sm transition-all text-sm shrink-0 w-max"
            >
              <BookOpen size={18} />
              Online Books Hub
            </Link>
            <Link
              to="/assistant"
              className="flex items-center gap-2 px-5 py-3 bg-white text-[var(--primary)] rounded-xl font-semibold hover:shadow-md transition-shadow text-sm shrink-0 w-max"
            >
              <Bot size={18} />
              Auto AI Review Form
            </Link>
          </div>
        </div>
      </div>

      {!isAdmin ? (
        <>
          {/* Quick Search */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search
                size={20}
                className="text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors"
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kenya Drug Index, Guidelines, your notes, or ask a clinical question..."
              className="w-full pl-12 pr-4 py-4 bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none text-[var(--text)] text-base shadow-sm transition-all backdrop-blur-md"
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-dim)] px-2 py-1 rounded border border-[var(--border)]">
                ⌘ K
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[var(--text)] text-lg tracking-tight">
                    Quick Access Tools
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link
                    to="/review"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ClipboardList size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Care Plan
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Review &amp; Audit</span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Online Books
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">KDI, Medscape</span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Study Prep
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Convert Notes</span>
                  </Link>
                  <Link
                    to="/assistant"
                    className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-all group text-center h-full shadow-sm backdrop-blur-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Bot size={28} />
                    </div>
                    <span className="text-sm font-bold text-[var(--text)]">
                      Auto AI
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Ask Questions</span>
                  </Link>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Clock size={18} className="text-[var(--text-muted)]" />
                    Recent Clinical Activity
                  </h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="p-4 flex items-start gap-4 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                      <ClipboardList
                        size={18}
                        className="text-[var(--primary)]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        Pharmacotherapy Review: IP-89432
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        AI Assisted • Community-Acquired Pneumonia
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-bold uppercase tracking-wider">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-4 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Sparkles size={18} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        Generated Short Notes
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        From: "Cardiovascular Guidelines 2024.pdf"
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-bold uppercase tracking-wider">
                        Yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Saved Work */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Bookmark size={18} className="text-[var(--text-muted)]" />
                    Your Uploads &amp; Saves
                  </h3>
                </div>
                <div className="p-2">
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <FileText
                      size={18}
                      className="text-blue-500 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        My Lecture Notes
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        Pharmacokinetics of Aminoglycosides
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <BookOpen
                      size={18}
                      className="text-emerald-500 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[var(--text)] truncate">
                        KDI Formulary Note
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        Saved Reference Link
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)] text-center">
                  <Link
                    to="/knowledge"
                    className="text-xs font-bold text-[var(--primary)] hover:underline"
                  >
                    Open Library →
                  </Link>
                </div>
              </div>

              {/* Clinical Updates & Notifications */}
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden backdrop-blur-md">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Activity size={18} className="text-[var(--text-muted)]" />
                    Latest System Updates
                  </h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--primary-container)] text-[var(--primary)] uppercase tracking-wider">
                        New Book Added
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[var(--text)]">
                      Medscape Monographs
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Admin added new online reference links to the library.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Specific Summary Cards */}
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Active Users</p>
              <p className="text-2xl font-bold text-[var(--text)]">1,248</p>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">System Health</p>
              <p className="text-2xl font-bold text-[var(--text)]">99.9%</p>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              <Settings size={24} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Pending Updates
              </p>
              <p className="text-2xl font-bold text-[var(--text)]">3</p>
            </div>
          </div>

          <div className="md:col-span-3 mt-4">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center w-full bg-[var(--surface)] hover:bg-[var(--surface-dim)] border border-[var(--border)] p-4 rounded-xl text-[var(--primary)] font-medium transition-colors"
            >
              Open Full Admin Console{" "}
              <ChevronRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      )}

      {showHandoverModal && (
        <ShiftHandoverModal onClose={() => setShowHandoverModal(false)} />
      )}
    </div>
  );
}
