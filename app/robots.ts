import { loadSeoConfig } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots() {
  const { siteUrl } = loadSeoConfig();
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/']
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}

