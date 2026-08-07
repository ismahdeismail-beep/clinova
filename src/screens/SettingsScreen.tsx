import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Bell,
  BellRing,
  ChevronDown,
  CheckCheck,
  LogOut,
  Mail,
  Shield,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useNotifications } from "../contexts/NotificationContext"

export default function SettingsScreen() {
  const navigate = useNavigate()
  const { userData, logout } = useAuth()
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    requestNotificationPermission,
    subscribePush,
    unsubscribePush,
  } = useNotifications()

  const [pushEnabled, setPushEnabled] = useState(false)
  const [pushSubscribed, setPushSubscribed] = useState(false)
  const [pushBusy, setPushBusy] = useState(false)
  const [pushHint, setPushHint] = useState("")
  const [loggingOut, setLoggingOut] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Sync the toggle with the real state: browser permission + existing
  // PushManager subscription for this device.
  useEffect(() => {
    let active = true
    const sync = async () => {
      if (!("Notification" in window)) {
        if (active) setPushEnabled(false)
        return
      }
      let subscribed = false
      try {
        if ("serviceWorker" in navigator && "PushManager" in window) {
          const registration = await navigator.serviceWorker.ready
          const sub = await registration.pushManager.getSubscription()
          subscribed = Boolean(sub)
        }
      } catch {
        subscribed = false
      }
      if (active) {
        setPushSubscribed(subscribed)
        setPushEnabled(subscribed || Notification.permission === "granted")
      }
    }
    sync()
    return () => {
      active = false
    }
  }, [])

  const handleTogglePush = async () => {
    if (!("Notification" in window)) {
      setPushHint("Browser notifications are not supported in this browser.")
      setPushEnabled(false)
      return
    }
    if (pushBusy) return
    setPushBusy(true)
    setPushHint("")
    try {
      // Turning OFF: remove the subscription for this device.
      if (pushEnabled) {
        setPushEnabled(false)
        const ok = await unsubscribePush()
        setPushSubscribed(false)
        setPushHint(ok ? "Push notifications turned off for this device." : "Could not remove this device's push subscription.")
        return
      }
      if (Notification.permission === "denied") {
        setPushHint("Notifications are blocked for this site. Enable them in your browser's site settings.")
        setPushEnabled(false)
        return
      }
      const result = await requestNotificationPermission()
      if (result !== "granted") {
        setPushEnabled(false)
        setPushHint(
          result === "denied"
            ? "Notifications were blocked. You can enable them in your browser's site settings."
            : ""
        )
        return
      }
      const ok = await subscribePush()
      setPushSubscribed(ok)
      setPushEnabled(ok)
      setPushHint(ok ? "" : "Could not register this device for push. Your browser may block push notifications.")
    } finally {
      setPushBusy(false)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
  }

  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
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
              Manage your profile and notifications
            </p>
          </div>
        </div>

        {/* ── Profile ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] px-1 mb-2">
            Profile
          </h2>
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm divide-y divide-[var(--border)] overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-4 min-w-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white shrink-0">
                {userData?.name
                  ? userData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)
                  : "G"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-[var(--text)] truncate">
                  {userData?.name || "Guest"}
                </p>
                <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5 truncate">
                  <Mail size={13} className="shrink-0" />
                  <span className="truncate">{userData?.email || "No email"}</span>
                </p>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5 capitalize">
                  <Shield size={13} className="shrink-0" />
                  {userData?.role || "user"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Notifications ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] px-1 mb-2">
            Notifications
          </h2>
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm divide-y divide-[var(--border)] overflow-hidden">
            {/* Push Notifications */}
            <div className="flex items-center justify-between gap-4 px-4 py-3.5 min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-xl bg-[var(--primary-container)]/25 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Bell size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)]">Push Notifications</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Browser alerts for drug of the day and reminders
                  </p>
                  {pushSubscribed && (
                    <p className="text-xs text-[var(--primary)] mt-0.5">
                      This device is registered for push
                    </p>
                  )}
                  {pushHint && <p className="text-xs text-amber-500 mt-1">{pushHint}</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={handleTogglePush}
                disabled={pushBusy}
                aria-pressed={pushEnabled}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-50 ${
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

            {/* Recent Notifications (accordion) */}
            <div className="px-4 py-3.5">
              <button
                type="button"
                onClick={() => setShowNotifications((s) => !s)}
                className="flex items-center justify-between w-full gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-xl bg-[var(--primary-container)]/25 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <BellRing size={18} />
                  </span>
                  <p className="text-sm font-semibold text-[var(--text)]">Recent Notifications</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {unreadCount > 0 && (
                    <span className="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                  <ChevronDown
                    size={16}
                    className={`text-[var(--text-muted)] transition-transform duration-200 ${
                      showNotifications ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {showNotifications && (
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[var(--text-muted)]">
                      {notifications.length > 0
                        ? `${notifications.length} notification${notifications.length === 1 ? "" : "s"}`
                        : "No notifications yet"}
                    </p>
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
                    <p className="text-sm text-[var(--text-muted)] py-4 text-center">
                      No notifications yet
                    </p>
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
              )}
            </div>
          </div>
        </section>

        {/* ── Account ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] px-1 mb-2">
            Account
          </h2>
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm divide-y divide-[var(--border)] overflow-hidden">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-[var(--destructive)] hover:bg-[var(--destructive)]/5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <span className="w-9 h-9 rounded-xl bg-[var(--destructive)]/10 text-[var(--destructive)] flex items-center justify-center shrink-0">
                <LogOut size={18} />
              </span>
              <span className="text-sm font-semibold flex-1 text-left">
                {loggingOut ? "Signing out..." : "Sign Out"}
              </span>
              {loggingOut && (
                <span className="w-4 h-4 border-2 border-[var(--destructive)]/30 border-t-[var(--destructive)] rounded-full animate-spin shrink-0" />
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
