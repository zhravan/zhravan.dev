import { getAllPosts } from '@/lib/blog';
import { loadSeoConfig } from '@/lib/seo';
import { filterDrafts } from '@/lib/plugins/drafts';
import { getAllContentTypes, getContentTypeById } from '@/lib/content-types';

export const dynamic = 'force-static';

export default async function sitemap() {
  const allPosts = getAllPosts(true);
  const posts = filterDrafts(allPosts); // Filter drafts from sitemap
  const { siteUrl } = loadSeoConfig();
  const contentTypes = getAllContentTypes();

  // Generate URLs for all posts across all content types
  const postUrls = posts.map((post) => {
    const postDate = post.date ? new Date(post.date) : new Date();
    const contentType = getContentTypeById(post.contentType);
    const basePath = contentType?.path || `/${post.contentType}`;
    
    return {
      url: `${siteUrl}${basePath}/${post.slug}`,
      lastModified: postDate.toISOString()
    };
  });

  // Generate static routes: homepage + about + all enabled content type paths
  const contentTypePaths = contentTypes.map((ct) => ct.path);
  
  const staticRoutes = ['', '/about', ...contentTypePaths].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...staticRoutes, ...postUrls];
}
