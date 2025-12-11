'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics-client';

interface AnalyticsTrackerProps {
  contentType?: 'article' | 'page' | 'project' | 'talk';
  contentTitle?: string;
  contentSlug?: string;
  contentTags?: string[];
  contentCategory?: string;
  readingTimeMinutes?: number;
}

export function AnalyticsTracker({
  contentType = 'page',
  contentTitle,
  contentSlug,
  contentTags = [],
  contentCategory,
  readingTimeMinutes
}: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<number>(0);
  const hasTrackedRead = useRef<boolean>(false);
  const hasTracked25 = useRef<boolean>(false);
  const hasTracked50 = useRef<boolean>(false);
  const hasTracked75 = useRef<boolean>(false);
  const hasTracked100 = useRef<boolean>(false);

  // Track page view on mount
  useEffect(() => {
    trackEvent('page_view', {
      page_path: pathname,
      page_title: contentTitle || document.title,
      content_type: contentType,
      content_slug: contentSlug,
      content_category: contentCategory,
    });

    // Track article-specific view
    if (contentType === 'article' && contentTitle) {
      trackEvent('article_view', {
        article_title: contentTitle,
        article_slug: contentSlug,
        article_tags: contentTags.join(', '),
        article_category: contentCategory,
        reading_time: readingTimeMinutes,
      });
    }
  }, [pathname, contentType, contentTitle, contentSlug, contentTags, contentCategory, readingTimeMinutes]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      scrollDepthRef.current = Math.max(scrollDepthRef.current, scrollPercentage);

      // Track milestones
      if (scrollPercentage >= 25 && !hasTracked25.current) {
        hasTracked25.current = true;
        trackEvent('scroll_depth', {
          depth: 25,
          content_type: contentType,
          content_title: contentTitle,
          content_slug: contentSlug,
        });
      }
      if (scrollPercentage >= 50 && !hasTracked50.current) {
        hasTracked50.current = true;
        trackEvent('scroll_depth', {
          depth: 50,
          content_type: contentType,
          content_title: contentTitle,
          content_slug: contentSlug,
        });
      }
      if (scrollPercentage >= 75 && !hasTracked75.current) {
        hasTracked75.current = true;
        trackEvent('scroll_depth', {
          depth: 75,
          content_type: contentType,
          content_title: contentTitle,
          content_slug: contentSlug,
        });
      }
      if (scrollPercentage >= 90 && !hasTracked100.current) {
        hasTracked100.current = true;
        trackEvent('scroll_depth', {
          depth: 100,
          content_type: contentType,
          content_title: contentTitle,
          content_slug: contentSlug,
        });
        
        // Track article completion
        if (contentType === 'article' && !hasTrackedRead.current) {
          hasTrackedRead.current = true;
          const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
          trackEvent('article_read_complete', {
            article_title: contentTitle,
            article_slug: contentSlug,
            time_spent_seconds: timeSpent,
            reading_time: readingTimeMinutes,
            scroll_depth: Math.round(scrollDepthRef.current),
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentType, contentTitle, contentSlug, readingTimeMinutes]);

  // Track time on page before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      const scrollDepth = Math.round(scrollDepthRef.current);

      trackEvent('page_exit', {
        page_path: pathname,
        content_type: contentType,
        content_title: contentTitle,
        content_slug: contentSlug,
        time_spent_seconds: timeSpent,
        scroll_depth: scrollDepth,
      });

      // Track article engagement for articles
      if (contentType === 'article') {
        const engagementLevel = 
          scrollDepth >= 90 ? 'high' : 
          scrollDepth >= 50 ? 'medium' : 
          'low';

        trackEvent('article_engagement', {
          article_title: contentTitle,
          article_slug: contentSlug,
          engagement_level: engagementLevel,
          time_spent_seconds: timeSpent,
          scroll_depth: scrollDepth,
          reading_time: readingTimeMinutes,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname, contentType, contentTitle, contentSlug, readingTimeMinutes]);

  return null;
}
