import { getContentTypeById } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { ContentListing } from '@/components/ContentListing';
import { getPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const contentType = getContentTypeById('talks');
  return getPageMetadata({
    title: contentType?.label || 'Tech Talks',
    description: contentType?.description || 'Presentations and speaking engagements',
    path: '/talks/'
  });
}

export default function TalksPage() {
  const contentType = getContentTypeById('talks');
  
  if (!contentType) {
    return <div>Content type not found</div>;
  }

  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);

  return <ContentListing items={items} contentType={contentType} />;
}
