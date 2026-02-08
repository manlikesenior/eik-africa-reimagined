import posthog from "posthog-js";

/**
 * Initialize PostHog for product analytics
 * 
 * To use: Add your PostHog API key to your .env file:
 * VITE_POSTHOG_KEY=phc_your_key_here
 * VITE_POSTHOG_HOST=https://app.posthog.com (or your self-hosted instance)
 * 
 * Get your API key from: https://app.posthog.com -> Project Settings
 */
export function initPostHog() {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || "https://app.posthog.com";

  if (!apiKey) {
    console.warn("PostHog API key not configured. Add VITE_POSTHOG_KEY to your .env file.");
    return;
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    
    // Capture page views automatically
    capture_pageview: true,
    
    // Capture page leaves
    capture_pageleave: true,
    
    // Enable session recording (optional)
    enable_recording_console_log: false,
    
    // Disable in development
    loaded: (ph) => {
      if (import.meta.env.MODE === "development") {
        ph.opt_out_capturing();
        ph.debug();
        console.log("[PostHog] Development mode - capturing disabled");
      }
    },
    
    // Respect Do Not Track
    respect_dnt: true,
    
    // Persistence settings
    persistence: "localStorage+cookie",
    
    // Sampling rate (adjust based on traffic volume)
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-mask="true"]',
    },
  });
}

/**
 * Track custom events
 * 
 * Usage:
 * trackEvent("booking_started", { tour_name: "Safari Tour", tier: "gold" })
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (import.meta.env.MODE === "development") {
    console.log("[PostHog Event]", eventName, properties);
    return;
  }
  posthog.capture(eventName, properties);
}

/**
 * Identify a user
 */
export function identifyUser(userId: string, userProperties?: Record<string, unknown>) {
  posthog.identify(userId, userProperties);
}

/**
 * Reset user identification (on logout)
 */
export function resetUser() {
  posthog.reset();
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, unknown>) {
  posthog.people.set(properties);
}

/**
 * Common events for a travel booking site
 */
export const Analytics = {
  // Page views with context
  pageView: (pageName: string, properties?: Record<string, unknown>) => {
    trackEvent("page_view", { page: pageName, ...properties });
  },

  // Tour interactions
  tourViewed: (tourSlug: string, tourName: string) => {
    trackEvent("tour_viewed", { tour_slug: tourSlug, tour_name: tourName });
  },

  tourTierSelected: (tourSlug: string, tier: string, price: number) => {
    trackEvent("tour_tier_selected", { tour_slug: tourSlug, tier, price });
  },

  // Booking funnel
  bookingStarted: (tourName?: string, tier?: string) => {
    trackEvent("booking_started", { tour_name: tourName, tier });
  },

  bookingFormFilled: (step: string) => {
    trackEvent("booking_form_filled", { step });
  },

  bookingSubmitted: (tourName: string, tier?: string, budget?: string) => {
    trackEvent("booking_submitted", { tour_name: tourName, tier, budget });
  },

  // Newsletter
  newsletterSubscribed: (source: string) => {
    trackEvent("newsletter_subscribed", { source });
  },

  // Search
  searchPerformed: (query: string, resultsCount: number) => {
    trackEvent("search_performed", { query, results_count: resultsCount });
  },

  // Contact
  contactFormSubmitted: (subject?: string) => {
    trackEvent("contact_form_submitted", { subject });
  },
};

export { posthog };
