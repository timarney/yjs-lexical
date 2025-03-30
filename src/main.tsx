"use client";

/**
 * External dependencies
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "react-error-boundary";

/**
 * Internal dependencies
 */
import { App } from "./App.tsx";
import { ErrorFallback } from "./ErrorFallback";


import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<ErrorFallback />}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </ErrorBoundary>
);
