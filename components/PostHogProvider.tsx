'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import type { PostHogConfig } from '@/lib/plugins/analytics';

interface PostHogProviderProps {
  config: PostHogConfig | null;
}

export function PostHogProvider({ config: posthogConfig }: PostHogProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!posthogConfig || !posthogConfig.trackingId || typeof window === 'undefined') {
      return;
    }

    // Initialize PostHog only once
    if (!window.posthog) {
      const initOptions: any = {
        api_host: posthogConfig.host || 'https://app.posthog.com',
        loaded: (posthogInstance: any) => {
          if (process.env.NODE_ENV === 'development') {
            posthogInstance.debug();
          }
        },
        capture_pageview: false, // We'll handle pageviews manually
        respect_dnt: posthogConfig.respectDoNotTrack || false,
      };

      // Configure session replay if settings provided
      if (posthogConfig.sessionReplay !== undefined) {
        initOptions.session_recording = {
          // Enable session replay (default: true in PostHog, but we allow explicit control)
          ...(posthogConfig.sessionReplay.enabled !== undefined && {
            enabled: posthogConfig.sessionReplay.enabled,
          }),
          // Privacy options
          ...(posthogConfig.sessionReplay.maskAllInputs !== undefined && {
            maskAllInputs: posthogConfig.sessionReplay.maskAllInputs,
          }),
          ...(posthogConfig.sessionReplay.maskTextSelector && {
            maskTextSelector: posthogConfig.sessionReplay.maskTextSelector,
          }),
          ...(posthogConfig.sessionReplay.recordCrossOriginIframes !== undefined && {
            recordCrossOriginIframes: posthogConfig.sessionReplay.recordCrossOriginIframes,
          }),
        };
      }

      const initializedPosthog = posthog.init(posthogConfig.trackingId, initOptions);

      // Make posthog available globally
      window.posthog = initializedPosthog;
    }
  }, [posthogConfig]);

  // Track pageviews on route change
  useEffect(() => {
    if (!posthogConfig || typeof window === 'undefined' || !window.posthog) {
      return;
    }

    const url = pathname + (window.location.search || '');
    window.posthog.capture('$pageview', {
      $current_url: url,
    });
  }, [pathname, posthogConfig]);

  return null;
}

