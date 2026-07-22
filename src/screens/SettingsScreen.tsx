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
  Bell,
  BellOff,
  BellRing,
  CheckCheck,
  LogOut,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useNotifications } from "../contexts/NotificationContext"

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
  const { userData, updatePreferences, logout } = useAuth()
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    requestNotificationPermission,
  } = useNotifications()

  const [saved, setSaved] = useState(false)
  const [clinicalInterests, setClinicalInterests] = useState<string[]>(
    userData?.clinicalInterests || ["Cardiology", "Nephrology"]
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [pushEnabled, setPushEnabled] = useState(() => {
    if (!("Notification" in window)) return false
    return Notification.permission === "granted"
  })
  const [loggingOut, setLoggingOut] = useState(false)

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

  const handleTogglePush = async () => {
    const result = await requestNotificationPermission()
    setPushEnabled(result === "granted")
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
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

        {/* ── Notifications Section ── */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="font-bold text-[var(--text)] flex items-center gap-2">
              <Bell size={18} className="text-[var(--primary)]" />
              Notifications
            </h2>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {/* Push Notifications Toggle */}
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text)]">Push Notifications</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Receive browser alerts for drug of the day and reminders
                </p>
              </div>
              <button
                type="button"
                onClick={handleTogglePush}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 ${
                  pushEnabled ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    pushEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Recent Notifications */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text)]">Recent Notifications</p>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] py-4 text-center">No notifications yet</p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.slice(0, 10).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => !n.read && markAsRead(n.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        n.read
                          ? "bg-[var(--bg)]/50 border-[var(--border)]/40 opacity-60"
                          : "bg-[var(--primary)]/5 border-[var(--primary)]/15 hover:border-[var(--primary)]/30"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.bg}`}>
                        <BellRing size={14} className={n.color} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[var(--text)] truncate">{n.title}</p>
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-1 font-medium">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Account Section ── */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="font-bold text-[var(--text)] flex items-center gap-2">
              <Shield size={18} className="text-[var(--primary)]" />
              Account
            </h2>
          </div>
          <div className="p-5">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-semibold text-[var(--destructive)] border border-[var(--destructive)]/20 hover:bg-[var(--destructive)]/10 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loggingOut ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[var(--destructive)]/30 border-t-[var(--destructive)] rounded-full animate-spin" />
                  Signing out...
                </span>
              ) : (
                <>
                  <LogOut size={16} />
                  Sign Out
                </>
              )}
            </button>
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
