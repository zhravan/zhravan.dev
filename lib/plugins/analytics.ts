import { getPluginConfig } from './registry';

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

export interface PostHogConfig {
  enabled: boolean;
  trackingId: string; // PostHog Project API Key
  respectDoNotTrack?: boolean;
  host?: string; // PostHog host URL (optional, defaults to app.posthog.com)
  // Session Replay options
  sessionReplay?: {
    enabled?: boolean; // Enable session replay (default: true in PostHog)
    maskAllInputs?: boolean; // Mask all input fields for privacy (default: false)
    maskTextSelector?: string; // CSS selector for elements to mask (e.g., '.sensitive')
    recordCrossOriginIframes?: boolean; // Record cross-origin iframes (default: false)
  };
}

/**
 * Get PostHog configuration
 */
export function getPostHogConfig(): PostHogConfig | null {
  const config = getPluginConfig<any>('analytics');
  if (!config?.enabled) {
    return null;
  }

  // Get trackingId from environment variable first, then fallback to config
  const trackingId = process.env.NEXT_PUBLIC_POSTHOG_API_KEY || config.trackingId;

  // Support both new format (direct PostHog config) and old format (providers array)
  if (trackingId && config.provider === 'posthog') {
    return {
      enabled: config.enabled,
      trackingId: trackingId,
      respectDoNotTrack: config.respectDoNotTrack,
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || config.host,
      sessionReplay: config.sessionReplay,
    };
  }

  // Support providers array format
  if (config.providers && Array.isArray(config.providers)) {
    const posthogProvider = config.providers.find((p: any) => p.provider === 'posthog');
    if (posthogProvider) {
      const providerTrackingId = process.env.NEXT_PUBLIC_POSTHOG_API_KEY || posthogProvider.trackingId;
      return {
        enabled: config.enabled,
        trackingId: providerTrackingId,
        respectDoNotTrack: posthogProvider.respectDoNotTrack ?? config.respectDoNotTrack,
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || posthogProvider.host ?? config.host,
        sessionReplay: posthogProvider.sessionReplay,
      };
    }
  }

  return null;
}

/**
 * Check if PostHog should be loaded
 */
export function shouldLoadPostHog(): boolean {
  const config = getPostHogConfig();
  return config !== null && config.enabled && !!config.trackingId;
}

/**
 * Track custom event (client-side only)
 * @param eventName - Name of the event to track
 * @param props - Optional event properties
 */
export function trackEvent(eventName: string, props?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  
  const config = getPostHogConfig();
  if (!config?.enabled) return;

  try {
    // @ts-ignore - PostHog is loaded via npm package
    if (window.posthog) {
      window.posthog.capture(eventName, props);
    }
  } catch (error) {
    // Silently fail - analytics should never break the app
    console.warn('PostHog tracking error:', error);
  }
}

/**
 * Track page view (usually automatic, but can be called manually for SPA navigation)
 * @param url - Optional URL to track (defaults to current page)
 */
export function trackPageView(url?: string): void {
  if (typeof window === 'undefined') return;
  
  const config = getPostHogConfig();
  if (!config?.enabled) return;

  const pageUrl = url || window.location.pathname + window.location.search;

  try {
    // @ts-ignore - PostHog is loaded via npm package
    if (window.posthog) {
      window.posthog.capture('$pageview', {
        $current_url: pageUrl,
      });
    }
  } catch (error) {
    console.warn('PostHog page view tracking error:', error);
  }
}
