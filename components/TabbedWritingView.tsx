'use client';

import { useMemo, useCallback, useLayoutEffect, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { ContentItem } from '@/lib/content';

const WRITING_VIEW_STATE_KEY = 'ohmyscript:writing-view';

type WritingTab = 'all' | 'blogs' | 'musings' | 'second-brain' | 'newsletter';

const VALID_TABS: WritingTab[] = [
  'all',
  'blogs',
  'musings',
  'second-brain',
  'newsletter',
];

function parseTabParam(raw: string | null, fallback: WritingTab): WritingTab {
  if (raw && VALID_TABS.includes(raw as WritingTab)) {
    return raw as WritingTab;
  }
  return fallback;
}

function isWritingRoute(path: string): boolean {
  const normalized = path.replace(/\/$/, '') || '/';
  return normalized.endsWith('/writing');
}

function persistWritingState(tab: WritingTab, tags: string[]) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(WRITING_VIEW_STATE_KEY, JSON.stringify({ tab, tags }));
  } catch {
    /* quota / private mode */
  }
}

function basePathForContentItem(post: ContentItem): string {
  switch (post.contentType) {
    case 'blog':
      return '/blogs';
    case 'thoughts':
      return '/musings';
    case 'second-brain':
      return '/second-brain';
    case 'newsletter':
      return '/newsletter';
    default:
      return '/blogs';
  }
}

interface TabbedWritingViewProps {
  blogPosts: ContentItem[];
  thoughts: ContentItem[];
  secondBrain: ContentItem[];
  newsletterPosts: ContentItem[];
  defaultTab?: WritingTab;
}

export function TabbedWritingView({
  blogPosts,
  thoughts,
  secondBrain,
  newsletterPosts,
  defaultTab = 'all',
}: TabbedWritingViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(
    () => parseTabParam(searchParams.get('tab'), defaultTab),
    [searchParams, defaultTab]
  );

  const selectedTags = useMemo(
    () => new Set(searchParams.getAll('tag').filter(Boolean)),
    [searchParams]
  );

  const buildUrl = useCallback(
    (tab: WritingTab, tags: Set<string>) => {
      const params = new URLSearchParams();
      if (tab !== defaultTab) {
        params.set('tab', tab);
      }
      tags.forEach((t) => params.append('tag', t));
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, defaultTab]
  );

  const setTab = useCallback(
    (tab: WritingTab) => {
      const nextTags = new Set<string>();
      persistWritingState(tab, []);
      router.replace(buildUrl(tab, nextTags), { scroll: false });
    },
    [router, buildUrl]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const next = new Set(selectedTags);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      persistWritingState(activeTab, [...next]);
      router.replace(buildUrl(activeTab, next), { scroll: false });
    },
    [activeTab, selectedTags, router, buildUrl]
  );

  /** Bare /writing/ with no query: restore last tab/tags from session (e.g. main nav). */
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isWritingRoute(pathname)) return;
    if (searchParams.toString()) return;
    try {
      const raw = sessionStorage.getItem(WRITING_VIEW_STATE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { tab?: string; tags?: string[] };
      const tab = parseTabParam(parsed.tab ?? null, defaultTab);
      const tags = Array.isArray(parsed.tags) ? parsed.tags.filter(Boolean) : [];
      const params = new URLSearchParams();
      if (tab !== defaultTab) params.set('tab', tab);
      tags.forEach((t) => params.append('tag', t));
      const qs = params.toString();
      if (!qs) return;
      router.replace(`${pathname}?${qs}`, { scroll: false });
    } catch {
      /* ignore invalid JSON */
    }
  }, [pathname, searchParams, router, defaultTab]);

  /** When URL has filters, persist so “Writing” nav without query can restore them. */
  useEffect(() => {
    if (!isWritingRoute(pathname)) return;
    if (!searchParams.toString()) return;
    const tab = parseTabParam(searchParams.get('tab'), defaultTab);
    const tags = searchParams.getAll('tag').filter(Boolean);
    persistWritingState(tab, tags);
  }, [pathname, searchParams, defaultTab]);

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  const groupByYear = (posts: ContentItem[]) => {
    const byYear = posts.reduce<Record<string, ContentItem[]>>((acc, p) => {
      const y = new Date(p.date).getFullYear();
      const key = isNaN(y) ? 'Unknown' : String(y);
      (acc[key] ||= []).push(p);
      return acc;
    }, {});

    return Object.keys(byYear)
      .sort((a, b) => (b === 'Unknown' ? -1 : a === 'Unknown' ? 1 : Number(b) - Number(a)))
      .map(year => ({ year, items: byYear[year] }));
  };

  const writingItems = [...blogPosts, ...thoughts, ...secondBrain, ...newsletterPosts];

  // Combine and sort all posts by date for 'all' tab
  const allPostsUnfiltered =
    activeTab === 'all'
      ? [...writingItems].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      : activeTab === 'blogs'
        ? blogPosts
        : activeTab === 'musings'
          ? thoughts
          : activeTab === 'second-brain'
            ? secondBrain
            : newsletterPosts;

  // Extract unique tags from current tab's posts
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    allPostsUnfiltered.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [allPostsUnfiltered]);

  // Filter posts based on selected tags
  const allPosts = useMemo(() => {
    if (selectedTags.size === 0) {
      return allPostsUnfiltered;
    }
    return allPostsUnfiltered.filter(post => 
      post.tags && post.tags.some(tag => selectedTags.has(tag))
    );
  }, [allPostsUnfiltered, selectedTags]);

  const groupedPosts = groupByYear(allPosts);

  const getPostUrl = (post: ContentItem) =>
    `${basePathForContentItem(post)}/${post.slug}/`;

  const postTitleLinkClass =
    'hover:opacity-70 transition-opacity truncate font-semibold inline-flex items-center gap-1 min-w-0';

  return (
    <div className="space-y-6 text-xxs">
      {/* Tabs */}
      <div className="flex items-center gap-4 pb-2">
        <button
          type="button"
          onClick={() => setTab('all')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'all' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'all' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          All <span className="text-[10px] opacity-40">({writingItems.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('blogs')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'blogs' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'blogs' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Blogs <span className="text-[10px] opacity-40">({blogPosts.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('musings')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'musings' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'musings' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Musings <span className="text-[10px] opacity-40">({thoughts.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('second-brain')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'second-brain' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'second-brain' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Second Brain <span className="text-[10px] opacity-40">({secondBrain.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('newsletter')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'newsletter' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'newsletter' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Newsletter <span className="text-[10px] opacity-40">({newsletterPosts.length})</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {groupedPosts.length > 0 ? (
          groupedPosts.map(({ year, items }) => (
            <section key={year} className="space-y-1.5">
              <h2 className="text-xs opacity-50 mb-2">{year}</h2>
              <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
                {items.map((post) => (
                  <li key={post.slug} className="group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1">
                        <span className="opacity-30">→</span>
                        {post.externalUrl ? (
                          <a
                            href={post.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={postTitleLinkClass}
                          >
                            <span className="truncate">{post.title}</span>
                            <span className="opacity-40 shrink-0 text-[10px]" aria-hidden>
                              ↗
                            </span>
                          </a>
                        ) : (
                          <Link href={getPostUrl(post)} className={postTitleLinkClass}>
                            {post.title}
                          </Link>
                        )}
                        <time className="opacity-50 text-[11px] shrink-0" dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="opacity-0 group-hover:opacity-70 text-[10px] transition-all duration-200 flex gap-1 flex-wrap pl-0 sm:pl-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded border"
                              style={{ borderColor: 'var(--color-border)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="text-xs opacity-50 py-8">
            No posts found matching selected tags.
          </div>
        )}
      </div>

      {/* Tags Section */}
      {availableTags.length > 0 && (
        <div className="pt-8 mt-8 border-t" style={{ borderColor: 'hsla(220, 12%, 15%, 0.4)' }}>
          {/* Selected Tags Preview */}
          {selectedTags.size > 0 && (
            <div className="mb-4">
              <div className="text-[10px] opacity-50 mb-2">Selected tags:</div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(selectedTags).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-2 py-1 rounded border text-[10px] transition-all"
                    style={{
                      borderColor: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-muted)',
                      color: 'var(--color-foreground)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.backgroundColor = 'var(--color-muted)';
                    }}
                  >
                    {tag} ×
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Tags */}
          <div>
            <div className="text-[10px] opacity-50 mb-2">
              {selectedTags.size > 0 ? 'Filter by tags:' : 'Tags:'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.has(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-1.5 py-0.5 rounded border text-[10px] transition-all"
                    style={{
                      borderColor: isSelected ? 'var(--color-foreground)' : 'var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-muted)' : 'transparent',
                      color: isSelected ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                      opacity: isSelected ? 1 : 0.7
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.backgroundColor = 'var(--color-muted)';
                        e.currentTarget.style.borderColor = 'var(--color-foreground)';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--color-muted)';
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
