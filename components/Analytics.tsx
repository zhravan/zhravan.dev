'use client';

import Script from 'next/script';
import type { AnalyticsConfig } from '@/lib/plugins/analytics';

interface AnalyticsProps {
  config: AnalyticsConfig | null;
  scriptSrc: string;
  scriptAttrs: Record<string, string>;
}

export function Analytics({ config, scriptSrc, scriptAttrs }: AnalyticsProps) {
  if (!config?.enabled) {
    return null;
  }

  // Google Analytics requires trackingId, others require domain
  const hasRequiredConfig = config.provider === 'google-analytics' 
    ? !!config.trackingId 
    : !!config.domain;

  if (!hasRequiredConfig) {
    return null;
  }

  // Google Analytics needs inline initialization script
  if (config.provider === 'google-analytics' && config.trackingId) {
    return (
      <>
        <Script
          src={scriptSrc}
          strategy="afterInteractive"
          {...scriptAttrs}
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.trackingId}', {
                page_path: window.location.pathname,
                ${config.respectDoNotTrack ? "anonymize_ip: true," : ""}
              });
            `,
          }}
        />
      </>
    );
  }

  return (
    <Script
      src={scriptSrc}
      strategy="afterInteractive"
      defer
      {...scriptAttrs}
    />
  );
}
