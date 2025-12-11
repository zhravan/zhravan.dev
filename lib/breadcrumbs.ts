import { StructuredData } from './seo';
import { loadSeoConfig } from './seo';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbStructuredData(items: BreadcrumbItem[]): StructuredData {
  const { siteUrl } = loadSeoConfig();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
