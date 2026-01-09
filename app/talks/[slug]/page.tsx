import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getContentTypeById } from '@/lib/content-types';
import { getContentForType, getContentBySlug } from '@/lib/content';
import { filterDrafts, isDraft } from '@/lib/plugins/drafts';
import { DraftPreviewGate } from '@/components/DraftPreviewGate';
import { getPluginConfig } from '@/lib/plugins/registry';
import { Giscus } from '@/lib/plugins';
import { getReadingTimeForPost } from '@/lib/plugins/reading-time';
import { getTocForPost } from '@/lib/plugins/toc';
import { getShareUrl } from '@/lib/plugins/social-share';
import { getPostMetadata, getArticleStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/StructuredData';
import { BackLink } from '@/components/navigation';
import { DraftBadge } from '@/components/DraftBadge';
import { TagsList } from '@/components/TagsList';
import { ReadingTimeBadge } from '@/components/ReadingTimeBadge';
import { TableOfContents } from '@/components/TableOfContents';
import { MobileTOC } from '@/components/MobileTOC';
import { SocialShare } from '@/components/SocialShare';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { getBreadcrumbStructuredData } from '@/lib/breadcrumbs';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Disable dynamic params for static export - only pre-generated slugs are valid
export const dynamicParams = false;

export async function generateStaticParams() {
  const contentType = getContentTypeById('talks');
  if (!contentType) return [];
  
  const allItems = getContentForType(contentType);
  const items = filterDrafts(allItems);
  
  return items.map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const contentType = getContentTypeById('talks');
  
  if (!contentType) {
    return {
      title: 'Talk Not Found'
    };
  }
  
  const item = getContentBySlug(contentType, slug);
  if (!item) {
    return {
      title: 'Talk Not Found'
    };
  }

  return getPostMetadata({
    title: item.title,
    description: item.description,
    path: `${contentType.path}/${slug}/`,
    date: item.date,
    tags: item.tags
  });
}

export default async function TalksPost({ params }: PageProps) {
  const { slug } = await params;
  const contentType = getContentTypeById('talks');
  
  if (!contentType) {
    notFound();
  }
  
  const item = getContentBySlug(contentType, slug);
  if (!item) {
    notFound();
  }

  // Import the MDX content dynamically
  let MdxContent;
  try {
    MdxContent = (await import(`@/content/talks/${slug}.mdx`)).default;
  } catch (e) {
    notFound();
  }

  // Load plugin data
  const readingTime = await getReadingTimeForPost(slug, 'talks');
  const tocHeadings = await getTocForPost(slug, 'talks');

  // Get plugin configs
  const tocConfig = getPluginConfig<{ position: 'left' | 'right' | 'inline'; sticky: boolean }>('toc');
  const readingTimeConfig = getPluginConfig<{ showIcon: boolean; showWordCount: boolean }>('reading-time');
  const draftsConfig = getPluginConfig<{ enabled: boolean; previewToken: string }>('drafts');
  const socialShareConfig = getPluginConfig<{ enabled: boolean; showIcon: boolean }>('social-share');

  const showTocSidebar = tocHeadings && tocConfig && tocConfig.position !== 'inline';
  const showTocInline = tocHeadings && tocConfig && tocConfig.position === 'inline';
  const showSidebar = true; // Always show sidebar for metadata

  // Generate share URL
  const shareUrl = getShareUrl(`/talks/${slug}/`);

  const structuredData = getArticleStructuredData({
    title: item.title,
    description: item.description,
    path: `${contentType.path}/${item.slug}/`,
    date: item.date,
    tags: item.tags
  });

  const breadcrumbData = getBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Talks', url: '/talks/' },
    { name: item.title, url: `/talks/${slug}/` },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StructuredData data={[structuredData, breadcrumbData]} />
      <AnalyticsTracker
        contentType="talk"
        contentTitle={item.title}
        contentSlug={slug}
        contentTags={item.tags}
        contentCategory={item.tags?.[0]}
        readingTimeMinutes={readingTime?.minutes}
      />
      <DraftPreviewGate 
        isDraft={isDraft(item)}
        previewToken={draftsConfig?.previewToken || ''}
      >
        <div className="space-y-6 text-xxs">
          <div className="flex items-center gap-2 mb-8">
            <BackLink href="/talks/">Back to Talks</BackLink>
            {isDraft(item) && <DraftBadge draft={true} />}
          </div>

          {/* Metadata section - above content on mobile only */}
          <div className="space-y-2 mb-6 lg:hidden">
            <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
              {item.date}
            </p>
            {readingTime && readingTimeConfig && (
              <ReadingTimeBadge
                minutes={readingTime.minutes}
                words={readingTime.words}
                showIcon={readingTimeConfig.showIcon}
                showWordCount={readingTimeConfig.showWordCount}
              />
            )}
            {item.tags && item.tags.length > 0 && (
              <TagsList tags={item.tags} />
            )}
            {socialShareConfig && (
              <SocialShare
                title={item.title}
                url={shareUrl}
                showIcon={socialShareConfig.showIcon}
              />
            )}
          </div>

          {/* Mobile TOC */}
          {tocHeadings && tocHeadings.length > 0 && (
            <MobileTOC headings={tocHeadings} />
          )}

          <div className={showSidebar ? 'lg:grid lg:grid-cols-[1fr_250px] lg:gap-12' : ''}>
            <article className="animate-fade-in prose max-w-none">
              {showTocInline && (
                <TableOfContents
                  headings={tocHeadings}
                  position="inline"
                  sticky={false}
                />
              )}

              <MdxContent />

              {/* Giscus comments plugin */}
              <br/>
              <Giscus />
            </article>

            {showSidebar && (
              <aside className="hidden lg:block space-y-6">
                {/* Metadata section - always show in sidebar on desktop */}
                <div className="space-y-2 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
                    {item.date}
                  </p>
                  {readingTime && readingTimeConfig && (
                    <ReadingTimeBadge
                      minutes={readingTime.minutes}
                      words={readingTime.words}
                      showIcon={readingTimeConfig.showIcon}
                      showWordCount={readingTimeConfig.showWordCount}
                    />
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <TagsList tags={item.tags} />
                  )}
                  {socialShareConfig && (
                    <SocialShare
                      title={item.title}
                      url={shareUrl}
                      showIcon={socialShareConfig.showIcon}
                    />
                  )}
                </div>

                {showTocSidebar && (
                  <TableOfContents
                    headings={tocHeadings}
                    position={tocConfig.position}
                    sticky={tocConfig.sticky}
                  />
                )}
              </aside>
            )}
          </div>
        </div>
      </DraftPreviewGate>
    </Suspense>
  );
}
