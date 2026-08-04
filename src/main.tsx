import React from "react";
import ReactDOM from "react-dom/client";
import "./lib/env.ts"; // Validate environment variables
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { UpdateManager } from "./components/UpdateManager.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { syncManager } from "./lib/syncManager.ts";
import { initSupabaseSync } from "./lib/supabaseSync";
import "./index.css";

import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Initialize sync managers
syncManager.sync();
initSupabaseSync();

ReactDOM.createRoot(document.getElementById("root")!).render(
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
);
