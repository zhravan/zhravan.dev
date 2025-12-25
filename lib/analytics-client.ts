'use client';

/**
 * Client-side analytics tracking utilities for PostHog
 */

/**
 * Track custom event (client-side only)
 * @param eventName - Name of the event to track
 * @param props - Optional event properties
 */
export function trackEvent(eventName: string, props?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.posthog) {
      window.posthog.capture(eventName, props);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog tracking error:', error);
    }
  }
}

/**
 * Track page view (usually automatic, but can be called manually for SPA navigation)
 * @param url - Optional URL to track (defaults to current page)
 */
export function trackPageView(url?: string): void {
  if (typeof window === 'undefined') return;

  const pageUrl = url || window.location.pathname + window.location.search;

  try {
    if (window.posthog) {
      window.posthog.capture('$pageview', {
        $current_url: pageUrl,
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog pageview error:', error);
    }
  }
}

// TypeScript declarations for PostHog
declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: Record<string, any>) => void;
      identify: (distinctId: string, properties?: Record<string, any>) => void;
      reset: () => void;
    };
  }
}
