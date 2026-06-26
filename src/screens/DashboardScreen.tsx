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
              Welcome, {userData?.name || "Guest"}
            </h1>
            <p className="text-white/80 max-w-lg">
              {isAdmin
                ? "Your admin console is ready. Manage users, monitor system health, and configure platform settings."
                : "Your clinical intelligence platform is ready. How can I assist you with clinical decisions, care plans, or literature review today?"}
            </p>
          </div>
          {!isAdmin && (
            <Link
              to="/assistant"
              className="flex items-center gap-2 px-6 py-3 bg-white text-[var(--primary)] rounded-xl font-semibold hover:shadow-md transition-shadow shrink-0 w-max"
            >
              <Bot size={20} />
              Ask Clinova AI
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-6 py-3 bg-white text-[var(--primary)] rounded-xl font-semibold hover:shadow-md transition-shadow shrink-0 w-max"
            >
              <ShieldCheck size={20} />
              Admin Console
            </Link>
          )}
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
              className="w-full pl-12 pr-4 py-4 bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 outline-none text-[var(--text)] text-base shadow-sm transition-all"
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
                    Clinical Workflows
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <Link
                    to="/review"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-colors group text-center h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ClipboardList size={24} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">
                      Care Plan
                    </span>
                  </Link>
                  <Link
                    to="/drugs"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-colors group text-center h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Pill size={24} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">
                      Drug Index
                    </span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-colors group text-center h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">
                      Guidelines
                    </span>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-colors group text-center h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <GraduationCap size={24} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">
                      Learning
                    </span>
                  </Link>
                  <button
                    onClick={() => setShowHandoverModal(true)}
                    className="flex flex-col items-center justify-center p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 hover:bg-[var(--primary-container)] transition-colors group text-center h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Clock size={24} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text)]">
                      Handover
                    </span>
                  </button>
                </div>
              </div>

              {/* AI Patient Triage */}
              <PatientTriage />

              {/* Patient Activity Overview */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[var(--text)] text-lg tracking-tight">
                    Patient Activity
                  </h3>
                  <select className="bg-[var(--surface-dim)] text-xs text-[var(--text)] border border-[var(--border)] rounded-lg px-3 py-1.5 outline-none">
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { name: "Mon", cases: 12 },
                        { name: "Tue", cases: 19 },
                        { name: "Wed", cases: 15 },
                        { name: "Thu", cases: 22 },
                        { name: "Fri", cases: 28 },
                        { name: "Sat", cases: 14 },
                        { name: "Sun", cases: 8 },
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorCases"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--primary)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--primary)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--border)"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                          color: "var(--text)",
                        }}
                        itemStyle={{ color: "var(--primary)" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cases"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCases)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Capabilities / Learning Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BrainCircuit
                        size={20}
                        className="text-[var(--primary)]"
                      />
                      <h3 className="font-semibold text-[var(--text)]">
                        AI Autofill Engine
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    Clinova can automatically draft treatment plans and
                    counselling notes from patient data.
                  </p>
                  <Link
                    to="/review"
                    className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline w-max"
                  >
                    Start new Pharmacotherapy Review <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileUp size={20} className="text-[var(--primary)]" />
                      <h3 className="font-semibold text-[var(--text)]">
                        Knowledge Generator
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    Convert your uploaded PDFs and notes into clinical cases,
                    MCQs, and flashcards.
                  </p>
                  <Link
                    to="/knowledge"
                    className="text-xs font-semibold text-[var(--primary)] flex items-center gap-1 hover:underline w-max"
                  >
                    Upload notes & generate <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Clock size={18} className="text-[var(--text-muted)]" />
                    Recent Clinical Activity
                  </h3>
                  <button className="text-xs font-medium text-[var(--primary)] hover:underline">
                    View all
                  </button>
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
                      <p className="text-sm font-medium text-[var(--text)] truncate">
                        Pharmacotherapy Review: IP-89432
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        AI Assisted • Community-Acquired Pneumonia
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-medium uppercase tracking-wider">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-4 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                      <Bot size={18} className="text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text)] truncate">
                        AI Consultation
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        Renal dose adjustment for Ceftriaxone
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-medium uppercase tracking-wider">
                        5 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-4 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                      <Sparkles size={18} className="text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text)] truncate">
                        Generated Case Study
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                        From: "Cardiovascular Guidelines 2024.pdf"
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5 font-medium uppercase tracking-wider">
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
              <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Bookmark size={18} className="text-[var(--text-muted)]" />
                    Saved References
                  </h3>
                </div>
                <div className="p-2">
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <BookOpen
                      size={16}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text)] truncate">
                        Kenya STG 2024
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        Chapter 4: Respiratory Infections
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/knowledge"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <FileText
                      size={16}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text)] truncate">
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
                    <GraduationCap
                      size={16}
                      className="text-[var(--primary)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text)] truncate">
                        Generated MCQ Set
                      </p>
                      <p className="text-xs text-[var(--text-muted)] truncate">
                        Cardiology Case Studies
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)]">
                  <Link
                    to="/knowledge"
                    className="text-xs font-semibold text-[var(--primary)] w-full text-center block hover:underline"
                  >
                    View Education Hub
                  </Link>
                </div>
              </div>

              {/* Clinical Updates & Notifications */}
              <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--text)] flex items-center gap-2">
                    <Activity size={18} className="text-[var(--text-muted)]" />
                    Clinical Updates
                  </h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--primary-container)] text-[var(--primary)] uppercase tracking-wider">
                        Guideline Update
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-medium">
                        Oct 24
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--text)]">
                      New Malaria Treatment Protocol
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      WHO has released updated guidelines for severe malaria
                      management.
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 uppercase tracking-wider">
                        Drug Alert
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-medium">
                        Oct 20
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--text)]">
                      Supply Shortage: IV Paracetamol
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Alternative analgesic protocols have been uploaded to the
                      clinical library.
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
