import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking and performance monitoring
 * 
 * To use: Add your Sentry DSN to your .env file:
 * VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
 * 
 * Get your DSN from: https://sentry.io -> Project Settings -> Client Keys
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.warn("Sentry DSN not configured. Add VITE_SENTRY_DSN to your .env file.");
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    
    // Performance Monitoring
    tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
    
    // Session Replay (optional - captures user sessions for debugging)
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions
    replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors
    
    // Integration options
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Filter out non-critical errors
    beforeSend(event) {
      // Don't send errors in development
      if (import.meta.env.MODE === "development") {
        console.log("[Sentry Debug]", event);
        return null;
      }
      return event;
    },
  });
}

/**
 * Capture a custom error
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, { extra: context });
}

/**
 * Capture a custom message
 */
export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email?: string; name?: string } | null) {
  if (user) {
    Sentry.setUser(user);
  } else {
    Sentry.setUser(null);
  }
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, category: string, data?: Record<string, unknown>) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  });
}

export { Sentry };
