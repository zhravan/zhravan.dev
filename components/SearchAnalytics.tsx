'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics-client';

export function SearchAnalytics() {
  useEffect(() => {
    // Track command palette/search usage
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        trackEvent('search_open', {
          method: 'keyboard_shortcut',
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}

export function trackSearchQuery(query: string, resultsCount: number) {
  trackEvent('search_query', {
    search_term: query,
    results_count: resultsCount,
  });
}

export function trackSearchResultClick(query: string, resultTitle: string, resultPosition: number) {
  trackEvent('search_result_click', {
    search_term: query,
    result_title: resultTitle,
    result_position: resultPosition,
  });
}
