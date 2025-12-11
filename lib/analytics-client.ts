'use client';

/**
 * Client-side analytics tracking utilities
 * These functions work directly with the global analytics objects
 * without requiring server-side configuration
 */

/**
 * Track custom event (client-side only)
 * @param eventName - Name of the event to track
 * @param props - Optional event properties
 */
export function trackEvent(eventName: string, props?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  try {
    // Try Google Analytics (gtag)
    if (window.gtag) {
      window.gtag('event', eventName, props);
      return;
    }
    
    // Try Plausible
    if (window.plausible) {
      window.plausible(eventName, { props });
      return;
    }
    
    // Try Umami
    if (window.umami) {
      window.umami.track(eventName, props);
      return;
    }
    
    // Try Simple Analytics
    if (window.sa_event) {
      window.sa_event(eventName);
      return;
    }
  } catch (error) {
    // Silently fail - analytics should never break the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics tracking error:', error);
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
    // Try Google Analytics (gtag)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pageUrl,
      });
      return;
    }
    
    // Try Plausible
    if (window.plausible) {
      window.plausible('pageview', { props: { url: pageUrl } });
      return;
    }
    
    // Try Umami
    if (window.umami) {
      window.umami.track({ url: pageUrl });
      return;
    }
    
    // Simple Analytics automatically tracks page views
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Analytics page view tracking error:', error);
    }
  }
}

// TypeScript declarations for analytics providers
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
    umami?: {
      track: (eventName: string | { url: string }, props?: Record<string, any>) => void;
    };
    sa_event?: (eventName: string) => void;
  }
}
