'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

interface TabbedWritingViewProps {
  blogPosts: ContentItem[];
  thoughts: ContentItem[];
  secondBrain: ContentItem[];
  defaultTab?: 'all' | 'blogs' | 'musings' | 'second-brain';
}

export function TabbedWritingView({ blogPosts, thoughts, secondBrain, defaultTab = 'all' }: TabbedWritingViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'blogs' | 'musings' | 'second-brain'>(defaultTab);

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

  // Combine and sort all posts by date for 'all' tab
  const allPosts = activeTab === 'all'
    ? [...blogPosts, ...thoughts, ...secondBrain].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : activeTab === 'blogs' ? blogPosts : activeTab === 'musings' ? thoughts : secondBrain;

  const groupedPosts = groupByYear(allPosts);

  // Determine the correct URL based on post type
  const getPostUrl = (post: ContentItem) => {
    if (activeTab === 'all') {
      // Check if post is from second-brain, thoughts (musings), or blog
      if (secondBrain.some(s => s.slug === post.slug)) return `/second-brain/${post.slug}`;
      return thoughts.some(t => t.slug === post.slug) ? `/musings/${post.slug}` : `/blogs/${post.slug}`;
    }
    return activeTab === 'blogs' ? `/blogs/${post.slug}` : activeTab === 'musings' ? `/musings/${post.slug}` : `/second-brain/${post.slug}`;
  };

  return (
    <div className="space-y-6 text-xxs">
      {/* Tabs */}
      <div className="flex items-center gap-4 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'all' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'all' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'blogs' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'blogs' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Blogs
        </button>
        <button
          onClick={() => setActiveTab('musings')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'musings' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'musings' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Musings
        </button>
        <button
          onClick={() => setActiveTab('second-brain')}
          className="text-xs transition-all hover:opacity-70 pb-1 border-b-2"
          style={{
            color: activeTab === 'second-brain' ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            borderColor: activeTab === 'second-brain' ? 'var(--color-foreground)' : 'transparent',
          }}
        >
          Second Brain
        </button>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {groupedPosts.map(({ year, items }) => (
          <section key={year} className="space-y-1.5">
            <h2 className="text-xs opacity-50 mb-2">{year}</h2>
            <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
              {items.map((post) => (
                <li key={post.slug} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                    <div className="flex items-baseline gap-2 min-w-0 flex-1">
                      <span className="opacity-30">→</span>
                      <Link
                        href={getPostUrl(post)}
                        className="hover:opacity-70 transition-opacity truncate"
                      >
                        {post.title}
                      </Link>
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
        ))}
      </div>
    </div>
  );
}
