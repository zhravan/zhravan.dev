import { getAllPosts } from '@/lib/blog';
import { getContentByType } from '@/lib/content';
import { loadSeoConfig } from '@/lib/seo';
import { filterDrafts } from '@/lib/plugins/drafts';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

// Helper to extract MDX content (remove frontmatter and exports)
function extractMdxContent(contentType: string, slug: string): string {
  const contentDirs: Record<string, string> = {
    'blog': 'content/blog',
    'musings': 'content/thoughts',
    'second-brain': 'content/second-brain'
  };
  
  const dir = contentDirs[contentType];
  if (!dir) return '';
  
  const filePath = path.join(process.cwd(), dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return '';
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Remove frontmatter export
  let content = fileContent.replace(/export const frontmatter = \{[\s\S]*?\};?\n*/g, '');
  
  // Remove other exports and imports
  content = content.replace(/^import .*$/gm, '');
  content = content.replace(/^export .*$/gm, '');
  
  return content.trim();
}

export async function GET() {
  const allBlogPosts = getAllPosts(true);
  const blogPosts = filterDrafts(allBlogPosts);
  
  const allThoughts = getContentByType('thoughts', true);
  const thoughts = filterDrafts(allThoughts);
  
  const allSecondBrain = getContentByType('second-brain', true);
  const secondBrain = filterDrafts(allSecondBrain);

  // Combine all content types and sort by date
  const allContent = [
    ...blogPosts.map(p => ({ ...p, type: 'blog' })),
    ...thoughts.map(p => ({ ...p, type: 'musings' })),
    ...secondBrain.map(p => ({ ...p, type: 'second-brain' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const { siteUrl, title: SITE_TITLE, description: SITE_DESCRIPTION } = loadSeoConfig();

  const items = allContent.map((post) => {
    const urlPath = post.type === 'blog' ? 'blogs' : post.type;
    const url = `${siteUrl}/${urlPath}/${post.slug}/`;
    const content = extractMdxContent(post.type, post.slug);
    
    return {
      id: url,
      url,
      title: post.title || post.slug,
      content_html: content,
      content_text: post.description || '',
      date_published: post.date ? new Date(post.date).toISOString() : undefined
    };
  });

  const json = {
    version: 'https://jsonfeed.org/version/1',
  title: SITE_TITLE,
  home_page_url: siteUrl,
  feed_url: `${siteUrl}/feed.json`,
  description: SITE_DESCRIPTION,
    items
  };

  return new Response(JSON.stringify(json, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}

