import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import { useAuth } from './AuthContext'

export interface AppNotification {
  id: string
  type: 'alert' | 'reminder' | 'update' | 'info'
  title: string
  message: string
  time: string
  timestamp: number
  read: boolean
  iconName: string
  color: string
  bg: string
  link?: string
  /** Set when the row exists in the Supabase feed (server-synced id). */
  serverId?: string
}

interface NotificationContextType {
  notifications: AppNotification[]
  unreadCount: number
  addNotification: (
    notification: Omit<AppNotification, 'id' | 'time' | 'read' | 'timestamp'>,
  ) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  scheduleMedicationReminder: (
    patientName: string,
    medication: string,
    delayMinutes: number,
  ) => void
  requestNotificationPermission: () => Promise<NotificationPermission>
  subscribePush: () => Promise<boolean>
  unsubscribePush: () => Promise<boolean>
}

const NotificationContext = createContext<NotificationContextType | null>(null)

interface FeedRow {
  id: string
  type: string
  title: string
  message: string
  link: string | null
  icon_name: string | null
  color: string | null
  bg: string | null
  read: boolean
  created_at: string
}

function timeLabel(iso: string): string {
  const t = new Date(iso).getTime()
  const diff = Date.now() - t
  if (diff < 60_000) return 'Just now'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
  return new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function rowToNotification(row: FeedRow): AppNotification {
  const type =
    row.type === 'alert' || row.type === 'reminder' || row.type === 'update' || row.type === 'info'
      ? row.type
      : 'info'
  return {
    id: row.id,
    serverId: row.id,
    type,
    title: row.title,
    message: row.message,
    time: timeLabel(row.created_at),
    timestamp: new Date(row.created_at).getTime(),
    read: row.read,
    iconName: row.icon_name || 'BellRing',
    color: row.color || 'text-[var(--primary)]',
    bg: row.bg || 'bg-[var(--primary)]/10',
    link: row.link || undefined,
  }
}

// Converts a base64url VAPID public key into the Uint8Array that
// pushManager.subscribe() requires for the applicationServerKey option.
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { getIdToken, userData } = useAuth()
  const uid = userData?.id ?? null

  // Local copy is the render source (fast + works offline). When a user is
  // authed it hydrates from the Supabase feed, so the same notifications
  // appear across devices; localStorage is only the offline cache.
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('clinova_notifications')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      } catch {
        /* ignore */
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('clinova_notifications', JSON.stringify(notifications))
  }, [notifications])

  // Pull the user's feed from the server (source of truth), keeping any
  // unsynced local-only items (created while offline) on top.
  const refreshFeed = useCallback(async () => {
    if (!uid) return
    const token = await getIdToken()
    if (!token) return
    try {
      const resp = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!resp.ok) return
      const data = await resp.json()
      const rows: FeedRow[] = Array.isArray(data.notifications) ? data.notifications : []
      const serverNotifs = rows.map(rowToNotification)
      setNotifications((prev) => {
        const localOnly = prev.filter((n) => !n.serverId)
        return [...localOnly, ...serverNotifs]
      })
    } catch {
      // Offline: keep the local cache untouched.
    }
  }, [uid, getIdToken])

  // On login: insert welcome rows once per user (server is idempotent), then
  // hydrate. Keep the feed fresh via focus + a 60s poll while authed.
  useEffect(() => {
    if (!uid) return
    let active = true
    ;(async () => {
      const token = await getIdToken()
      if (!token) return
      try {
        await fetch('/api/notifications/welcome', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        /* ignore */
      }
      if (active) refreshFeed()
    })()
    const onFocus = () => refreshFeed()
    window.addEventListener('focus', onFocus)
    const interval = setInterval(refreshFeed, 60000)
    return () => {
      active = false
      window.removeEventListener('focus', onFocus)
      clearInterval(interval)
    }
  }, [uid, getIdToken, refreshFeed])

  // Request browser notification permission
  const requestNotificationPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) return 'denied'
    if (Notification.permission === 'granted') return 'granted'
    const result = await Notification.requestPermission()
    localStorage.setItem('clinova_push_permission', result)
    return result
  }, [])

  // Browser notification permission is only requested on a user gesture
  // (e.g. the toggle in Settings) — modern browsers ignore permission
  // requests made on page load without one.

  // Registers this device for web-push: PushManager.subscribe with the VAPID
  // public key, then persists the subscription server-side (Supabase) using a
  // verified Firebase ID token. Returns true when the endpoint is saved.
  const subscribePush = useCallback(async (): Promise<boolean> => {
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false
      const token = await getIdToken()
      if (!token) return false
      const registration = await navigator.serviceWorker.ready
      let subscription = await registration.pushManager.getSubscription()
      if (!subscription) {
        const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined
        if (!vapidKey) return false
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        })
      }
      const json = subscription.toJSON()
      const resp = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscription: {
            endpoint: json.endpoint,
            keys: { p256dh: json.keys?.p256dh, auth: json.keys?.auth },
          },
        }),
      })
      return resp.ok
    } catch (e) {
      console.error('[push] subscribe failed', e)
      return false
    }
  }, [getIdToken])

  // Unsubscribes this device: removes the local push subscription and tells the
  // server to delete the row. Safe to call when nothing is subscribed.
  const unsubscribePush = useCallback(async (): Promise<boolean> => {
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return true
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      let endpoint: string | undefined
      if (subscription) {
        endpoint = subscription.toJSON().endpoint
        await subscription.unsubscribe()
      }
      if (endpoint) {
        const token = await getIdToken()
        if (token) {
          await fetch('/api/push/unsubscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ endpoint }),
          })
        }
      }
      return true
    } catch (e) {
      console.error('[push] unsubscribe failed', e)
      return false
    }
  }, [getIdToken])

  // Adds a notification to the feed (in-app + browser when permitted). When a
  // user is signed in it is also persisted to the Supabase feed so it syncs
  // across devices; offline, it stays local until the next fetch.
  const addNotification = useCallback(
    (notif: Omit<AppNotification, 'id' | 'time' | 'read' | 'timestamp'>) => {
      const localId = Math.random().toString(36).substring(7)
      const newNotif: AppNotification = {
        ...notif,
        id: localId,
        time: 'Just now',
        timestamp: Date.now(),
        read: false,
      }
      setNotifications((prev) => [newNotif, ...prev])

      // Show browser push notification
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(notif.title, {
            body: notif.message,
            icon: '/pwa-192x192.png',
          })
        } catch {
          // Browser notifications may fail in some contexts
        }
      }

      ;(async () => {
        const token = await getIdToken()
        if (!token) return
        try {
          const resp = await fetch('/api/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: notif.type,
              title: notif.title,
              message: notif.message,
              link: notif.link,
              iconName: notif.iconName,
              color: notif.color,
              bg: notif.bg,
            }),
          })
          if (!resp.ok) return
          const data = await resp.json()
          if (data.id) {
            setNotifications((prev) =>
              prev.map((n) => (n.id === localId ? { ...n, id: data.id, serverId: data.id } : n)),
            )
          }
        } catch {
          // Offline: stays local-only.
        }
      })()
    },
    [getIdToken],
  )

  const scheduleMedicationReminder = (
    patientName: string,
    medication: string,
    delayMinutes: number,
  ) => {
    setTimeout(
      () => {
        addNotification({
          type: 'reminder',
          title: 'Medication Administration Due',
          message: `Time to administer ${medication} to ${patientName}.`,
          iconName: 'Pill',
          color: 'text-amber-500',
          bg: 'bg-amber-500/10',
        })
      },
      delayMinutes * 60 * 1000,
    )
  }

  const markAsRead = useCallback(
    (id: string) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      const target = notifications.find((n) => n.id === id)
      if (!target?.serverId) return
      ;(async () => {
        const token = await getIdToken()
        if (!token) return
        try {
          await fetch('/api/notifications/read', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: target.serverId }),
          })
        } catch {
          /* ignore */
        }
      })()
    },
    [getIdToken, notifications],
  )

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    ;(async () => {
      const token = await getIdToken()
      if (!token) return
      try {
        await fetch('/api/notifications/read-all', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        /* ignore */
      }
    })()
  }, [getIdToken])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        scheduleMedicationReminder,
        requestNotificationPermission,
        subscribePush,
        unsubscribePush,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
