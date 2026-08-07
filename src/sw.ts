/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
  type PrecacheEntry,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<PrecacheEntry | string>
}

// Precache the app build (injected manifest) + clean up old cache versions
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// SPA navigation fallback — same behavior as the previous generateSW config
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')))

interface PushPayload {
  title?: string
  body?: string
  url?: string
  icon?: string
  badge?: string
}

// Receive push messages while the app is closed
self.addEventListener('push', (event) => {
  let payload: PushPayload = {}
  try {
    const raw = event.data?.json()
    if (raw && typeof raw === 'object') payload = raw as PushPayload
  } catch {
    /* non-JSON payload: fall back to defaults */
  }

  const title = payload.title || 'Clinova'
  const options: NotificationOptions = {
    body: payload.body || '',
    icon: payload.icon || '/pwa-192x192.png',
    badge: payload.badge || '/pwa-192x192.png',
    data: { url: payload.url || '/' },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Open the app when a notification is clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data as { url?: string } | undefined)?.url || '/'

  event.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      for (const client of windowClients) {
        if ('navigate' in client) {
          await client.navigate(url)
          await client.focus()
          return
        }
      }
      await self.clients.openWindow(url)
    })()
  )
})

self.skipWaiting()
