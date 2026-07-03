import React from "react";
import ReactDOM from "react-dom/client";
import "./lib/env.ts"; // Validate environment variables
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { syncManager } from "./lib/syncManager.ts";
import { initSupabaseSync } from "./lib/supabaseSync";
import "./index.css";

import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Initialize sync managers
syncManager.sync();
initSupabaseSync();

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true);
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
