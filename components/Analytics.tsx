'use client';

/**
 * Analytics component - PostHog is handled by PostHogProvider component
 * This component is kept for backward compatibility but doesn't render anything
 * since PostHog uses npm package instead of script tags
 */
export function Analytics() {
  // PostHog is initialized via PostHogProvider component (npm package)
  // No script tags needed
  return null;
}
