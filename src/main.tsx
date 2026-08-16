import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './lib/env.ts' // Validate environment variables
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { UpdateManager } from './components/UpdateManager.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { syncManager } from './lib/syncManager.ts'
import { initSupabaseSync } from './lib/supabaseSync'
import './index.css'

import { NotificationProvider } from './contexts/NotificationContext'
import { ThemeProvider } from './contexts/ThemeContext'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 0.1,
  })
}

// Initialize sync managers
syncManager.sync()
initSupabaseSync()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            <UpdateManager />
            <App />
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
