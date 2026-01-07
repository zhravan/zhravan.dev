import { loadSeoConfig, getSocialLinks } from '@/lib/seo';
import { getAllContentTypes } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';

export const dynamic = 'force-static';

export async function GET() {
  const { siteUrl, title, description, author } = loadSeoConfig();
  const socialLinks = getSocialLinks();
  const contentTypes = getAllContentTypes();

  // Get content counts for each type
  const contentStats = contentTypes
    .filter((ct) => ct.enabled && ct.contentDir)
    .map((ct) => {
      const items = filterDrafts(getContentForType(ct, true));
      return {
        type: ct.label,
        path: ct.path,
        count: items.length,
        description: ct.description
      };
    });

  const llmsTxt = `# ${title}

## About
${description}

${author?.name ? `Author: ${author.name}` : ''}
${author?.url ? `Website: ${author.url}` : ''}
${siteUrl ? `Site URL: ${siteUrl}` : ''}

## Content Overview
This site contains technical writing, projects, talks, and personal musings focused on:
- Software engineering and systems architecture
- Backend development and distributed systems
- Platform engineering and developer tools
- AI engineering and agentic systems
- Open source contributions
- Technical writing and documentation

## Main Sections

### Writing
Path: ${siteUrl}/writing/
Description: Technical blog posts, tutorials, and articles on software engineering, development practices, and technology insights.
${contentStats.find(s => s.type === 'Writing') ? `Content count: ${contentStats.find(s => s.type === 'Writing')?.count} articles` : ''}

### Projects
Path: ${siteUrl}/projects/
Description: A selection of projects I have built and contributed to, including open source work and commercial products.

### Tech Talks
Path: ${siteUrl}/talks/
Description: Presentations and speaking engagements on technical topics.
${contentStats.find(s => s.type === 'Tech Talks') ? `Content count: ${contentStats.find(s => s.type === 'Tech Talks')?.count} talks` : ''}

### Musings
Path: ${siteUrl}/musings/
Description: Personal and philosophical thoughts on technology, culture, and life.
${contentStats.find(s => s.type === 'Musings') ? `Content count: ${contentStats.find(s => s.type === 'Musings')?.count} posts` : ''}

### Second Brain
Path: ${siteUrl}/second-brain/
Description: A digital garden for storing and organizing knowledge, ideas, and personal insights.
${contentStats.find(s => s.type === 'Second Brain') ? `Content count: ${contentStats.find(s => s.type === 'Second Brain')?.count} notes` : ''}

### Reading
Path: ${siteUrl}/reading/
Description: Books I'm reading, have read, and thoughts on them.

## Key Pages
- Home: ${siteUrl}/
- About: ${siteUrl}/about/
- Services: ${siteUrl}/services/
- Contact: ${siteUrl}/contact/

## Feeds & APIs
- RSS Feed: ${siteUrl}/feed.xml
- Atom Feed: ${siteUrl}/atom.xml
- JSON Feed: ${siteUrl}/feed.json
- Sitemap: ${siteUrl}/sitemap.xml

## Contact & Social
${socialLinks.github ? `GitHub: ${socialLinks.github}` : ''}
${socialLinks.twitter ? `Twitter/X: ${socialLinks.twitter}` : ''}
${socialLinks.linkedin ? `LinkedIn: ${socialLinks.linkedin}` : ''}
${socialLinks.gitlab ? `GitLab: ${socialLinks.gitlab}` : ''}
Email: hi@ohmyscript.com

## Content Guidelines
- Technical content focuses on practical implementation and real-world experience
- Code examples and architectural patterns are common
- Open source philosophy and FOSS advocacy are recurring themes
- Content is written from a practitioner's perspective with emphasis on developer experience

## Last Updated
${new Date().toISOString().split('T')[0]}
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}



