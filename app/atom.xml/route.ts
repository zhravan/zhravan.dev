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
  const updated = allContent[0]?.date ? new Date(allContent[0].date).toISOString() : new Date().toISOString();

  const entries = allContent
    .map((post) => {
      const urlPath = post.type === 'blog' ? 'blogs' : post.type;
      const url = `${siteUrl}/${urlPath}/${post.slug}`;
      const title = post.title || post.slug;
      const summary = post.description || '';
      const content = extractMdxContent(post.type, post.slug);
      const published = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
      return `\n    <entry>\n      <title><![CDATA[${title}]]></title>\n      <link href="${url}" />\n      <id>${url}</id>\n      <updated>${published}</updated>\n      <summary><![CDATA[${summary}]]></summary>\n      <content type="html"><![CDATA[${content}]]></content>\n    </entry>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <title><![CDATA[${SITE_TITLE}]]></title>\n  <subtitle><![CDATA[${SITE_DESCRIPTION}]]></subtitle>\n  <link href="${siteUrl}/atom.xml" rel="self" />\n  <link href="${siteUrl}" />\n  <updated>${updated}</updated>\n  <id>${siteUrl}</id>${entries}\n</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}

