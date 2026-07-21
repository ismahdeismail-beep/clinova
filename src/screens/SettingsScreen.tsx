import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Pill,
  Search,
  Sparkles,
  X,
  PlusCircle,
  ChevronRight,
  User,
  Mail,
  Shield,
  Save,
  CheckCircle2,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const ALL_CLINICAL_SYSTEMS = [
  "Cardiology",
  "Nephrology",
  "Gastrointestinal",
  "Infectious Disease",
  "Endocrinology",
  "Neurology",
  "Pulmonology",
  "Pediatrics",
  "Critical Care",
  "Oncology",
  "Toxicology & Poison Management",
  "Psychiatry",
  "Hematology",
]

export default function SettingsScreen() {
  const navigate = useNavigate()
  const { userData, updatePreferences } = useAuth()

  const [saved, setSaved] = useState(false)
  const [clinicalInterests, setClinicalInterests] = useState<string[]>(
    userData?.clinicalInterests || ["Cardiology", "Nephrology"]
  )
  const [searchQuery, setSearchQuery] = useState("")

  // Re-sync local state when userData changes from external source (login, Firestore sync)
  useEffect(() => {
    if (userData?.clinicalInterests) {
      setClinicalInterests(userData.clinicalInterests)
    }
  }, [userData?.clinicalInterests])

  // Auto-save: propagate changes to Dashboard immediately when toggled
  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreferences(clinicalInterests)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 300) // 300ms debounce for rapid toggling
    return () => clearTimeout(timer)
  }, [clinicalInterests]) // eslint-disable-line react-hooks/exhaustive-deps

const handleSave = async () => {
    await updatePreferences(clinicalInterests)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Settings
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Manage your profile and clinical focus areas
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="font-bold text-[var(--text)] flex items-center gap-2">
              <User size={18} className="text-[var(--primary)]" />
              Profile
            </h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xl shadow-sm border-2 border-white shrink-0">
                {userData?.name
                  ? userData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)
                  : "G"}
              </div>
              <div>
                <p className="text-lg font-bold text-[var(--text)]">{userData?.name || "Guest"}</p>
                <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5">
                  <Mail size={13} />
                  {userData?.email || "No email"}
                </p>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5 capitalize">
                  <Shield size={13} />
                  {userData?.role || "user"}
                </p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="font-bold text-[var(--text)] flex items-center gap-2">
              <Pill size={18} className="text-[var(--primary)]" />
              Clinical Focus Areas
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or add custom focus area..."
                className="w-full pl-10 pr-8 py-2.5 bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--primary)] outline-none rounded-xl text-sm text-[var(--text)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {searchQuery.trim() &&
              !ALL_CLINICAL_SYSTEMS.some(
                (s) => s.toLowerCase() === searchQuery.trim().toLowerCase()
              ) &&
              !clinicalInterests.some(
                (t) => t.toLowerCase() === searchQuery.trim().toLowerCase()
              ) && (
                <button
                  type="button"
                  onClick={() => {
                    const trimmed = searchQuery.trim()
                    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
                    setClinicalInterests((prev) =>
                      prev.includes(formatted) ? prev : [...prev, formatted]
                    )
                    setSearchQuery("")
                  }}
                  className="w-full text-left p-3 bg-[var(--primary-container)]/10 border border-dashed border-[var(--primary)]/30 rounded-xl text-sm font-semibold text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <PlusCircle size={16} />
                    Add custom: &quot;{searchQuery.trim()}&quot;
                  </span>
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

            {clinicalInterests.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-[var(--bg)]/50 border border-[var(--border)]/40">
                {Array.from(new Set(clinicalInterests)).map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center gap-1 text-xs bg-[var(--primary-container)]/50 text-[var(--primary)] font-semibold px-2.5 py-1 rounded-lg border border-[var(--primary)]/10"
                  >
                    {topic}
                    <button
                      type="button"
                      onClick={() =>
                        setClinicalInterests((prev) => prev.filter((t) => t !== topic))
                      }
                      className="hover:bg-[var(--primary)]/20 p-0.5 rounded-full text-[var(--primary)] transition-colors cursor-pointer"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-h-64 overflow-y-auto pr-1">
              {Array.from(new Set([...ALL_CLINICAL_SYSTEMS, ...clinicalInterests]))
                .filter((system) => system.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((system) => {
                  const isSelected = clinicalInterests.includes(system)
                  return (
                    <button
                      key={system}
                      type="button"
                      onClick={() =>
                        setClinicalInterests((prev) =>
                          prev.includes(system)
                            ? prev.filter((t) => t !== system)
                            : [...prev, system]
                        )
                      }
                      className={`px-3 py-2 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer truncate ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary-container)]/25 text-[var(--primary)] font-semibold"
                          : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      {isSelected ? "✓ " : ""}
                      {system}
                    </button>
                  )
                })}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={clinicalInterests.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-sm rounded-xl hover:opacity-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Save size={16} />
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--success)] animate-in fade-in duration-200">
              <CheckCircle2 size={16} />
              Saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
