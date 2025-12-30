import { getAllContentTypes } from './content-types';
import { getContentForType, ContentItem } from './content';
import { filterDrafts } from './plugins/drafts';

/**
 * Get all unique tags across all content types
 */
export function getAllTags(): string[] {
  const contentTypes = getAllContentTypes();
  const allTags = new Set<string>();

  contentTypes
    .filter((ct) => ct.enabled && ct.contentDir)
    .forEach((ct) => {
      const items = filterDrafts(getContentForType(ct, true));
      items.forEach((item) => {
        if (item.tags && item.tags.length > 0) {
          item.tags.forEach((tag) => allTags.add(tag.toLowerCase()));
        }
      });
    });

  return Array.from(allTags).sort();
}

/**
 * Get all content items that have a specific tag
 */
export function getContentByTag(tag: string): ContentItem[] {
  const contentTypes = getAllContentTypes();
  const matchingItems: ContentItem[] = [];

  const normalizedTag = tag.toLowerCase();

  contentTypes
    .filter((ct) => ct.enabled && ct.contentDir)
    .forEach((ct) => {
      const items = filterDrafts(getContentForType(ct, true));
      items.forEach((item) => {
        if (
          item.tags &&
          item.tags.some((t) => t.toLowerCase() === normalizedTag)
        ) {
          matchingItems.push(item);
        }
      });
    });

  // Sort by date (newest first)
  return matchingItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get tag count (number of posts with this tag)
 */
export function getTagCount(tag: string): number {
  return getContentByTag(tag).length;
}

/**
 * Normalize tag for URL (slugify)
 */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get tag from slug (reverse slugify)
 */
export function getTagFromSlug(slug: string): string | null {
  const allTags = getAllTags();
  const normalizedSlug = slug.toLowerCase();
  
  // Try exact match first
  const exactMatch = allTags.find((tag) => slugifyTag(tag) === normalizedSlug);
  if (exactMatch) return exactMatch;
  
  // Try case-insensitive match
  const caseInsensitiveMatch = allTags.find(
    (tag) => tag.toLowerCase() === normalizedSlug
  );
  if (caseInsensitiveMatch) return caseInsensitiveMatch;
  
  return null;
}

