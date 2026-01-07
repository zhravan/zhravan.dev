import { loadSeoConfig } from '@/lib/seo';
import { filterDrafts } from '@/lib/plugins/drafts';
import { getAllContentTypes } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { getAllTags, slugifyTag } from '@/lib/tags';

export const dynamic = 'force-static';

export default async function sitemap() {
  const { siteUrl } = loadSeoConfig();
  const contentTypes = getAllContentTypes();

  const getDetailBasePath = (contentTypeId: string, configuredPath: string) => {
    // The "blog" content type lists at /writing, but detail routes live at /blogs/[slug]
    if (contentTypeId === 'blog') return '/blogs';
    return configuredPath;
  };

  // Generate URLs for all content items across enabled content types with MDX content
  const contentItemUrls = contentTypes
    .filter((ct) => ct.enabled && ct.contentDir)
    .flatMap((ct) => {
      const items = filterDrafts(getContentForType(ct, true));
      const basePath = getDetailBasePath(ct.id, ct.path);

      return items.map((item) => {
        const itemDate = item.date ? new Date(item.date) : new Date();
        return {
          url: `${siteUrl}${basePath}/${item.slug}/`,
          lastModified: itemDate.toISOString()
        };
      });
    });

  // Generate tag pages
  const tagUrls = getAllTags().map((tag) => ({
    url: `${siteUrl}/tags/${slugifyTag(tag)}/`,
    lastModified: new Date().toISOString()
  }));

  // Generate static routes (only routes that actually exist as pages)
  // Note: Empty string for homepage should not have trailing slash
  const staticRoutes = ['', '/about', '/writing', '/projects', '/talks'].map(
    (route) => ({
      url: route === '' ? `${siteUrl}/` : `${siteUrl}${route}/`,
      lastModified: new Date().toISOString()
    })
  );

  return [...staticRoutes, ...contentItemUrls, ...tagUrls];
}
