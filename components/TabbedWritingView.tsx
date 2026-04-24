'use client';

import { useMemo, useCallback, useLayoutEffect, useEffect, useState } from 'react';
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

function tagsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const x of a) {
    if (!b.has(x)) return false;
  }
  return true;
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

type ViewState = {
  ready: boolean;
  tab: WritingTab;
  tags: Set<string>;
};

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

  const [view, setView] = useState<ViewState>(() => ({
    ready: false,
    tab: defaultTab,
    tags: new Set<string>(),
  }));

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

  /**
   * Resolve tab/tags from the real URL and sessionStorage before paint, so we never
   * flash "All" while useSearchParams / router.replace catch up.
   */
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isWritingRoute(pathname)) {
      setView({ ready: true, tab: defaultTab, tags: new Set() });
      return;
    }

    const sp = new URLSearchParams(window.location.search);
    let tab = parseTabParam(sp.get('tab'), defaultTab);
    let tags = new Set(sp.getAll('tag').filter(Boolean));

    if (!sp.toString()) {
      try {
        const raw = sessionStorage.getItem(WRITING_VIEW_STATE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { tab?: string; tags?: string[] };
          tab = parseTabParam(parsed.tab ?? null, defaultTab);
          tags = new Set(Array.isArray(parsed.tags) ? parsed.tags.filter(Boolean) : []);
          const params = new URLSearchParams();
          if (tab !== defaultTab) params.set('tab', tab);
          tags.forEach((t) => params.append('tag', t));
          const qs = params.toString();
          if (qs) {
            router.replace(`${pathname}?${qs}`, { scroll: false });
          }
        }
      } catch {
        /* ignore */
      }
    }

    persistWritingState(tab, [...tags]);
    setView({ ready: true, tab, tags });
  }, [pathname, router, defaultTab]);

  /**
   * Browser back/forward and client navigations: align view with the URL.
   * Skip while `searchParams` is still empty so we do not flash/overwrite the tab
   * that `useLayoutEffect` already set from `window.location` / sessionStorage
   * before `router.replace` updates Next’s searchParams.
   */
  useEffect(() => {
    if (!view.ready) return;
    if (!searchParams.toString()) return;

    const t = parseTabParam(searchParams.get('tab'), defaultTab);
    const g = new Set(searchParams.getAll('tag').filter(Boolean));
    setView((prev) => {
      if (prev.tab === t && tagsEqual(prev.tags, g)) return prev;
      persistWritingState(t, [...g]);
      return { ...prev, tab: t, tags: g };
    });
  }, [searchParams, defaultTab, view.ready]);

  /**
   * Client navigation to bare `/writing/` (e.g. header link): no query string, so
   * `searchParams` stays empty - restore from sessionStorage like the first visit.
   */
  useEffect(() => {
    if (!view.ready) return;
    if (!isWritingRoute(pathname)) return;
    if (searchParams.toString()) return;
    if (typeof window === 'undefined') return;
    if (window.location.search) return;

    try {
      const raw = sessionStorage.getItem(WRITING_VIEW_STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { tab?: string; tags?: string[] };
        const tab = parseTabParam(parsed.tab ?? null, defaultTab);
        const tags = new Set(Array.isArray(parsed.tags) ? parsed.tags.filter(Boolean) : []);
        const params = new URLSearchParams();
        if (tab !== defaultTab) params.set('tab', tab);
        tags.forEach((x) => params.append('tag', x));
        const qs = params.toString();
        if (qs) {
          router.replace(`${pathname}?${qs}`, { scroll: false });
        }
        setView((prev) => {
          if (prev.tab === tab && tagsEqual(prev.tags, tags)) return prev;
          persistWritingState(tab, [...tags]);
          return { ...prev, tab, tags };
        });
        return;
      }
    } catch {
      /* ignore */
    }

    setView((prev) => {
      if (prev.tab === defaultTab && prev.tags.size === 0) return prev;
      persistWritingState(defaultTab, []);
      return { ...prev, tab: defaultTab, tags: new Set() };
    });
  }, [pathname, searchParams, view.ready, defaultTab, router]);

  const setTab = useCallback(
    (tab: WritingTab) => {
      const nextTags = new Set<string>();
      setView((v) => ({ ...v, ready: true, tab, tags: nextTags }));
      persistWritingState(tab, []);
      router.replace(buildUrl(tab, nextTags), { scroll: false });
    },
    [router, buildUrl]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      setView((v) => {
        const next = new Set(v.tags);
        if (next.has(tag)) next.delete(tag);
        else next.add(tag);
        persistWritingState(v.tab, [...next]);
        router.replace(buildUrl(v.tab, next), { scroll: false });
        return { ...v, tags: next };
      });
    },
    [router, buildUrl]
  );

  const activeTab = view.tab;
  const selectedTags = view.tags;

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
      .map((year) => ({ year, items: byYear[year] }));
  };

  const writingItems = [...blogPosts, ...thoughts, ...secondBrain, ...newsletterPosts];

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

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    allPostsUnfiltered.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((t) => tagSet.add(t));
      }
    });
    return Array.from(tagSet).sort();
  }, [allPostsUnfiltered]);

  const allPosts = useMemo(() => {
    if (selectedTags.size === 0) {
      return allPostsUnfiltered;
    }
    return allPostsUnfiltered.filter(
      (post) => post.tags && post.tags.some((t) => selectedTags.has(t))
    );
  }, [allPostsUnfiltered, selectedTags]);

  const groupedPosts = groupByYear(allPosts);

  const getPostUrl = (post: ContentItem) =>
    `${basePathForContentItem(post)}/${post.slug}/`;

  const postTitleLinkClass =
    '!border-b-0 pb-0 transition-colors break-words leading-tight';

  if (!view.ready) {
    return (
      <div
        className="space-y-6 text-xxs min-h-[280px]"
        aria-busy="true"
        aria-label="Loading writing list"
      >
        <div className="flex flex-wrap gap-4 pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-5 w-14 rounded animate-pulse opacity-30"
              style={{ backgroundColor: 'var(--color-muted)' }}
            />
          ))}
        </div>
        <div className="space-y-3 opacity-30">
          <div
            className="h-3 w-20 rounded animate-pulse"
            style={{ backgroundColor: 'var(--color-muted)' }}
          />
          <div
            className="h-4 max-w-md rounded animate-pulse"
            style={{ backgroundColor: 'var(--color-muted)' }}
          />
          <div
            className="h-4 max-w-sm rounded animate-pulse"
            style={{ backgroundColor: 'var(--color-muted)' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 text-xxs">
      <div className="flex items-center gap-4 pb-2 flex-wrap">
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
            color:
              activeTab === 'second-brain'
                ? 'var(--color-foreground)'
                : 'var(--color-muted-foreground)',
            borderColor:
              activeTab === 'second-brain' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Second Brain <span className="text-[10px] opacity-40">({secondBrain.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('newsletter')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color:
              activeTab === 'newsletter'
                ? 'var(--color-foreground)'
                : 'var(--color-muted-foreground)',
            borderColor:
              activeTab === 'newsletter' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Newsletter <span className="text-[10px] opacity-40">({newsletterPosts.length})</span>
        </button>
      </div>

      <div className="space-y-4">
        {groupedPosts.length > 0 ? (
          groupedPosts.map(({ year, items }) => (
            <section key={year} className="space-y-1.5">
              <div className="flex items-start justify-between gap-4">
                <h2
                  className="text-[0.8rem] leading-none tracking-tight sm:text-[1.25rem]"
                  style={{
                    color: 'color-mix(in srgb, var(--color-foreground) 92%, transparent)',
                    fontFamily: 'var(--font-family-display)',
                  }}
                >
                  {year}
                  <span
                    className="ml-1 inline-block"
                    style={{ color: 'hsl(163 89% 45%)' }}
                    aria-hidden
                  >
                    .
                  </span>
                </h2>
                <span
                  className="pt-0.5 text-[8px] sm:text-[10px]"
                  style={{
                    color: 'color-mix(in srgb, var(--color-muted-foreground) 78%, transparent)',
                    fontFamily: 'var(--code-font-family)',
                  }}
                >
                  {items.length}
                </span>
              </div>

              <ul
                className="m-0 list-none overflow-hidden p-0"
              >
                {items.map((post, index) => (
                  <li
                    key={post.slug}
                    className="group"
                  >
                    <div className="px-2.5 py-2 sm:px-3 sm:py-2">
                      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 flex items-start gap-2 sm:items-center sm:gap-3">
                          <span className="shrink-0 opacity-40" aria-hidden>→</span>

                          <div className="min-w-0 flex-1">
                            {post.externalUrl ? (
                              <a
                                href={post.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${postTitleLinkClass} text-[0.55rem] sm:text-[0.65rem]`}
                                style={{
                                  color: 'hsl(163 71% 44%)',
                                  fontFamily: 'var(--code-font-family)',
                                }}
                              >
                                <span className="break-words">{post.title}</span>
                                <span className="ml-1.5 text-[10px] opacity-40" aria-hidden>
                                  ↗
                                </span>
                              </a>
                            ) : (
                              <Link
                                href={getPostUrl(post)}
                                className={`${postTitleLinkClass} text-[0.55rem] sm:text-[0.65rem]`}
                                style={{
                                  color: 'hsl(163 71% 44%)',
                                  fontFamily: 'var(--code-font-family)',
                                }}
                              >
                                {post.title}
                              </Link>
                            )}
                          </div>

                          <time
                            className="shrink-0 text-[6px] uppercase tracking-[0.1em] sm:text-[7px]"
                            style={{
                              color:
                                'color-mix(in srgb, var(--color-muted-foreground) 88%, transparent)',
                              fontFamily: 'var(--code-font-family)',
                            }}
                            dateTime={post.date}
                          >
                            {formatDate(post.date)}
                          </time>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                          <div className="hidden flex-wrap gap-1 opacity-50 transition-opacity duration-200 sm:flex sm:justify-end sm:opacity-0 sm:group-hover:opacity-60">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border px-1.5 py-0.5 text-[8px] uppercase tracking-[0.12em]"
                                style={{
                                  borderColor:
                                    'color-mix(in srgb, var(--color-border) 90%, transparent)',
                                  color:
                                    'color-mix(in srgb, var(--color-muted-foreground) 90%, transparent)',
                                  fontFamily: 'var(--code-font-family)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="text-xs opacity-50 py-8">No posts found matching selected tags.</div>
        )}
      </div>

      {availableTags.length > 0 && (
        <div className="pt-8 mt-8 border-t" style={{ borderColor: 'hsla(220, 12%, 15%, 0.4)' }}>
          {selectedTags.size > 0 && (
            <div className="mb-4">
              <div className="text-[10px] opacity-50 mb-2">Selected tags:</div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(selectedTags).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="px-2 py-1 rounded border text-[10px] transition-all"
                    style={{
                      borderColor: 'var(--color-foreground)',
                      backgroundColor: 'var(--color-muted)',
                      color: 'var(--color-foreground)',
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
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="px-1.5 py-0.5 rounded border text-[10px] transition-all"
                    style={{
                      borderColor: isSelected ? 'var(--color-foreground)' : 'var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-muted)' : 'transparent',
                      color: isSelected ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                      opacity: isSelected ? 1 : 0.7,
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
