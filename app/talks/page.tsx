import { getContentTypeById } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { getPageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import { TalksList } from '@/components/TalksList';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Tech Talks',
  description: 'Presentations and talks I\'ve given at conferences and meetups.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/talks/'
});

export default function TalksPage() {
  const contentType = getContentTypeById('talks');
  
  if (!contentType) {
    return <div>Content type not found</div>;
  }

  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);

  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />
      <TalksList items={items} contentType={contentType} />
    </div>
  );
}
