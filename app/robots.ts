import { loadSeoConfig } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots() {
  const { siteUrl } = loadSeoConfig();
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/403']
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'] // Opt out of AI training
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}

