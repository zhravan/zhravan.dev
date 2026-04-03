import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import yaml from 'yaml';
import Parser from 'rss-parser';
import type { ContentItem } from '@/lib/content';
import { getContentByType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';

interface RssFeedConfig {
  id: string;
  url: string;
  tag?: string;
}

interface NewsletterSourcesFile {
  rssFeeds: RssFeedConfig[];
}

const CONFIG_PATH = path.join(process.cwd(), 'config', 'newsletter-sources.yaml');

function loadNewsletterSources(): NewsletterSourcesFile {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    const parsed = yaml.parse(raw) as NewsletterSourcesFile;
    return { rssFeeds: parsed?.rssFeeds ?? [] };
  } catch {
    return { rssFeeds: [] };
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toDateString(pubDate?: string): string {
  if (!pubDate) return '';
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function slugForRssItem(link: string, feedId: string): string {
  try {
    const u = new URL(link);
    const parts = u.pathname.split('/').filter(Boolean);
    const seg = parts[parts.length - 1] || 'issue';
    const safe = seg.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
    return `rss-${feedId}-${safe}`;
  } catch {
    return `rss-${feedId}-${Date.now()}`;
  }
}

function normalizeCategories(entry: { categories?: unknown }): string[] {
  const raw = entry.categories;
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : [raw];
  return list
    .map((c) => {
      if (typeof c === 'string') return c.trim();
      if (c && typeof c === 'object' && '_' in c && typeof (c as { _: string })._ === 'string') {
        return (c as { _: string })._.trim();
      }
      return '';
    })
    .filter(Boolean);
}

/**
 * Fetches configured RSS feeds (e.g. Beehiiv) and returns synthetic ContentItems
 * with externalUrl set. Safe to call from server components / build.
 */
export async function fetchNewsletterRssItems(): Promise<ContentItem[]> {
  const { rssFeeds } = loadNewsletterSources();
  if (!rssFeeds.length) return [];

  const parser = new Parser({
    timeout: 30000,
    headers: {
      'User-Agent': 'OhMyScript.com/1.0 (+https://ohmyscript.com)',
    },
  });

  const out: ContentItem[] = [];

  for (const feed of rssFeeds) {
    if (!feed.url?.trim()) continue;
    try {
      const parsed = await parser.parseURL(feed.url.trim());
      const feedTag = feed.tag?.trim();
      for (const entry of parsed.items ?? []) {
        const link = entry.link?.trim();
        if (!link) continue;

        const title = entry.title?.trim() || 'Untitled';
        const rawDesc =
          entry.contentSnippet ||
          entry.summary ||
          (entry.content ? stripHtml(entry.content).slice(0, 280) : '');
        const description = rawDesc.slice(0, 500);

        const categories = normalizeCategories(entry);
        const tags = [...new Set([...(feedTag ? [feedTag] : []), ...categories])];

        out.push({
          slug: slugForRssItem(link, feed.id),
          title,
          date: toDateString(entry.pubDate || entry.isoDate),
          description,
          tags: tags.length > 0 ? tags : feedTag ? [feedTag] : undefined,
          contentType: 'newsletter',
          externalUrl: link,
        });
      }
    } catch (err) {
      console.error(`[newsletter-feeds] Failed to fetch RSS feed "${feed.id}":`, err);
    }
  }

  return out.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Local MDX newsletter posts plus RSS-fed issues, newest first.
 * Cached per request so RootLayout and /writing do not double-fetch RSS.
 */
export const getNewsletterListItems = cache(async (): Promise<ContentItem[]> => {
  const mdx = filterDrafts(getContentByType('newsletter'));
  const rss = await fetchNewsletterRssItems();
  return [...mdx, ...rss].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});
