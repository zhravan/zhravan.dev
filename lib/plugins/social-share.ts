import { getPluginConfig } from './registry';
import { SITE_URL } from '@/lib/site';

export interface SocialShareConfig {
  enabled: boolean;
  showIcon: boolean;
  platforms: {
    copyLink: boolean;
    whatsapp: boolean;
    x: boolean;
    mastodon: boolean;
    linkedin: boolean;
  };
}

/**
 * Get social share configuration
 */
export function getSocialShareConfig(): SocialShareConfig | null {
  return getPluginConfig<SocialShareConfig>('social-share');
}

/**
 * Generate the full URL for a given path
 */
export function getShareUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * Generate the full URL for a blog post
 * @deprecated Prefer getShareUrl(`/blogs/${slug}`)
 */
export function getPostShareUrl(slug: string): string {
  return getShareUrl(`/blogs/${slug}`);
}

/**
 * Check if social share is enabled
 */
export function isSocialShareEnabled(): boolean {
  const config = getSocialShareConfig();
  return config !== null && config.enabled;
}
