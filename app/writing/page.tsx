import { getAllPosts } from '@/lib/blog';
import { getContentByType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { PageHeader } from '@/components/PageHeader';
import { TabbedWritingView } from '@/components/TabbedWritingView';
import { getPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Writing',
  description: 'Blogs on technology, engineering, building products, and personal musings reflections.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/writing'
});

export default function Blog() {
  const allBlogPosts = getAllPosts();
  const blogPosts = filterDrafts(allBlogPosts);

  const allThoughts = getContentByType('thoughts');
  const thoughts = filterDrafts(allThoughts);

  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />
      <TabbedWritingView blogPosts={blogPosts} thoughts={thoughts} defaultTab="all" />
    </div>
  );
}