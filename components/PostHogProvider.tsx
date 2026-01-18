'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
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

    // Delay PostHog initialization to not block initial render
    const timeoutId = setTimeout(async () => {
      // Initialize PostHog only once
      if (!window.posthog) {
        // Dynamic import to reduce initial bundle
        const { default: posthog } = await import('posthog-js');
        
        const initOptions: any = {
          api_host: posthogConfig.host || 'https://app.posthog.com',
          loaded: (posthogInstance: any) => {
            if (process.env.NODE_ENV === 'development') {
              posthogInstance.debug();
            }
          },
          capture_pageview: false, // We'll handle pageviews manually
          respect_dnt: posthogConfig.respectDoNotTrack || false,
          persistence: 'localStorage',
          autocapture: false, // Disable autocapture for better performance
        };

        // Configure session replay if settings provided
        if (posthogConfig.sessionReplay !== undefined) {
          initOptions.session_recording = {
            ...(posthogConfig.sessionReplay.enabled !== undefined && {
              enabled: posthogConfig.sessionReplay.enabled,
            }),
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
        window.posthog = initializedPosthog;
        
        // Capture initial pageview after init
        if (initializedPosthog) {
          initializedPosthog.capture('$pageview', {
            $current_url: pathname + (window.location.search || ''),
          });
        }
      }
    }, 100); // Small delay to let main content render first

    return () => clearTimeout(timeoutId);
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

