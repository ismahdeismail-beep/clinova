import { useEffect, useRef } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { useNotifications } from '../contexts/NotificationContext'

const CHECK_INTERVAL_MS = 15 * 60 * 1000
const RELOAD_DELAY_MS = 2500

export function UpdateManager() {
  const { addNotification } = useNotifications()
  const notifyRef = useRef(addNotification)
  notifyRef.current = addNotification
  const refreshingRef = useRef(false)

  useEffect(() => {
    let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined
    let registrationRef: ServiceWorkerRegistration | undefined
    let interval: number | undefined

    const checkForUpdate = () => {
      if (refreshingRef.current || document.hidden || !registrationRef) return
      registrationRef.update().catch(() => {})
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') checkForUpdate()
    }

    updateSW = registerSW({
      immediate: true,
      onRegisteredSW(_swUrl: string, registration: ServiceWorkerRegistration | undefined) {
        registrationRef = registration
        if (!registration) return
        checkForUpdate()
        interval = window.setInterval(checkForUpdate, CHECK_INTERVAL_MS)
        document.addEventListener('visibilitychange', onVisible)
        window.addEventListener('focus', checkForUpdate)
      },
      onNeedRefresh() {
        if (refreshingRef.current) return
        refreshingRef.current = true
        notifyRef.current({
          type: 'update',
          title: 'Clinova Updated',
          message: 'A new version was installed. Refreshing to apply the update…',
          iconName: 'Megaphone',
          color: 'text-cyan-500',
          bg: 'bg-cyan-500/10',
        })
        window.setTimeout(() => updateSW?.(true), RELOAD_DELAY_MS)
      },
      onOfflineReady() {
        console.log('App ready to work offline')
      },
    })

    return () => {
      if (interval) window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', checkForUpdate)
      updateSW = undefined
    }
  }, [])

  return null
}
