'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics-client';

export function LinkTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;

      const href = link.getAttribute('href');
      const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
      const isDownload = link.hasAttribute('download');
      
      if (isExternal) {
        trackEvent('external_link_click', {
          link_url: href,
          link_text: link.textContent?.trim() || '',
          link_domain: new URL(href).hostname,
        });
      } else if (isDownload) {
        trackEvent('file_download', {
          file_url: href,
          file_name: link.textContent?.trim() || '',
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
