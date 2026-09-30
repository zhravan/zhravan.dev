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
   * before `router.replace` updates Next's searchParams.
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
          className="text-[13px] transition-colors hover:opacity-80 pb-1 border-b"
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
          className="text-[13px] transition-colors hover:opacity-80 pb-1 border-b"
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
          className="text-[13px] transition-colors hover:opacity-80 pb-1 border-b"
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
          className="text-[13px] transition-colors hover:opacity-80 pb-1 border-b"
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
          className="text-[13px] transition-colors hover:opacity-80 pb-1 border-b"
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
            <section key={year} className="mt-8 first:mt-4">
              <h2 className="mb-2 font-normal leading-none" style={{ color: 'var(--color-muted-foreground)' }}>
                {year} <span className="text-[10px] opacity-40">({items.length})</span>
              </h2>

              <ul className="m-0 flex list-none flex-col py-0 pr-0 pl-3">
                {items.map((post) => {
                  const isExternal = Boolean(post.externalUrl);
                  const row = (
                    <span className="relative z-[1] flex items-center gap-3">
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        <span className="list-row__title max-w-full shrink-0 truncate">
                          {post.title}
                        </span>
                        {post.tags && post.tags.length > 0 && (
                          <span className="list-row__tags" aria-label="Tags">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="tag-pill">
                                {tag}
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                      <time className="shrink-0 text-[12px] tabular-nums opacity-70" dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                    </span>
                  );

                  return (
                    <li key={post.slug}>
                      {isExternal ? (
                        <a
                          href={post.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="list-row"
                          style={{ color: 'var(--color-muted-foreground)' }}
                        >
                          {row}
                        </a>
                      ) : (
                        <Link href={getPostUrl(post)} className="list-row" style={{ color: 'var(--color-muted-foreground)' }}>
                          {row}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        ) : (
          <div className="text-xs opacity-50 py-8">No posts found matching selected tags.</div>
        )}
      </div>

      {availableTags.length > 0 && (
        <div className="pt-8 mt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
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
                    className="px-2 py-0.5 rounded-md border text-[12px] transition-all"
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
