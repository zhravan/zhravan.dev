import { notFound } from 'next/navigation';
import { getContentItemBySlug, getContentByType } from '@/lib/content';
import { getPostMetadata, getArticleStructuredData } from '@/lib/seo';
import { BackLink } from '@/components/navigation';
import { StructuredData } from '@/components/StructuredData';
import { getPluginConfig } from '@/lib/plugins/registry';
import { Giscus } from '@/lib/plugins';
import { getReadingTimeForPost } from '@/lib/plugins/reading-time';
import { getTocForPost } from '@/lib/plugins/toc';
import { getPostNavigation } from '@/lib/plugins/post-navigation';
import { isDraft } from '@/lib/plugins/drafts';
import { getShareUrl } from '@/lib/plugins/social-share';
import { getSeriesForPost } from '@/lib/plugins/series';
import { ReadingTimeBadge } from '@/components/ReadingTimeBadge';
import { TableOfContents } from '@/components/TableOfContents';
import { MobileTOC } from '@/components/MobileTOC';
import { PostNavigation } from '@/components/PostNavigation';
import { TagsList } from '@/components/TagsList';
import { SocialShare } from '@/components/SocialShare';
import { DraftBadge } from '@/components/DraftBadge';
import { DraftPreviewGate } from '@/components/DraftPreviewGate';
import { SeriesNavigator } from '@/components/SeriesNavigator';
import { Suspense } from 'react';
import { getBreadcrumbStructuredData } from '@/lib/breadcrumbs';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export async function generateStaticParams() {
  const allSecondBrain = getContentByType('second-brain', true);
  return allSecondBrain.map((note) => ({
    slug: note.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getContentItemBySlug('second-brain', slug);

  if (!note) {
    return {
      title: 'Note Not Found'
    };
  }

  return getPostMetadata({
    title: note.title,
    description: note.description,
    path: `/second-brain/${slug}`,
    date: note.date,
    tags: note.tags
  });
}

export default async function SecondBrainNote({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getContentItemBySlug('second-brain', slug);

  if (!note) {
    notFound();
  }

  let Content;
  try {
    Content = (await import(`@/content/second-brain/${slug}.mdx`)).default;
  } catch (error) {
    console.error(`Failed to load second brain note: ${slug}`, error);
    notFound();
  }

  // Load plugin data
  const readingTime = await getReadingTimeForPost(slug, 'second-brain');
  const tocHeadings = await getTocForPost(slug, 'second-brain');
  const postNav = getPostNavigation(slug);
  const seriesInfo = getSeriesForPost(slug);

  // Get plugin configs
  const tocConfig = getPluginConfig<{ position: 'left' | 'right' | 'inline'; sticky: boolean }>('toc');
  const readingTimeConfig = getPluginConfig<{ showIcon: boolean; showWordCount: boolean }>('reading-time');
  const draftsConfig = getPluginConfig<{ enabled: boolean; previewToken: string }>('drafts');
  const socialShareConfig = getPluginConfig<{ enabled: boolean; showIcon: boolean }>('social-share');
  const seriesConfig = getPluginConfig<{ enabled: boolean }>('series');
  
  const showTocSidebar = tocHeadings && tocConfig && tocConfig.position !== 'inline';
  const showTocInline = tocHeadings && tocConfig && tocConfig.position === 'inline';
  const showSidebar = true; // Always show sidebar for metadata
  
  // Generate share URL
  const shareUrl = getShareUrl(`/second-brain/${slug}`);

  const structuredData = getArticleStructuredData({
    title: note.title,
    description: note.description,
    path: `/second-brain/${slug}`,
    date: note.date,
    tags: note.tags
  });

  const breadcrumbData = getBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Writing', url: '/writing' },
    { name: note.title, url: `/second-brain/${slug}` },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StructuredData data={[structuredData, breadcrumbData]} />
      <AnalyticsTracker
        contentType="article"
        contentTitle={note.title}
        contentSlug={slug}
        contentTags={note.tags}
        contentCategory={note.tags?.[0]}
        readingTimeMinutes={readingTime?.minutes}
      />
      <DraftPreviewGate 
        isDraft={isDraft(note)} 
        previewToken={draftsConfig?.previewToken || ''}
      >
        <div className="space-y-6 text-xxs">
          <div className="flex items-center gap-2 mb-8">
            <BackLink href="/writing">Back to Writing</BackLink>
            {isDraft(note) && <DraftBadge draft={true} />}
          </div>

      {/* Metadata section - above content on mobile only */}
      <div className="space-y-2 mb-6 lg:hidden">
        <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
          {note.date}
        </p>
        {readingTime && readingTimeConfig && (
          <ReadingTimeBadge
            minutes={readingTime.minutes}
            words={readingTime.words}
            showIcon={readingTimeConfig.showIcon}
            showWordCount={readingTimeConfig.showWordCount}
          />
        )}
        {note.tags && note.tags.length > 0 && (
          <TagsList tags={note.tags} />
        )}
        {socialShareConfig && (
          <SocialShare
            title={note.title}
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

          {seriesConfig && seriesInfo && (
            <SeriesNavigator series={seriesInfo} />
          )}

          <Content />

          <PostNavigation previous={postNav.previous} next={postNav.next} />

          {/* Giscus comments plugin (self-contained enable/disable via config) */}
          <br/>
          <Giscus />

        </article>

        {showSidebar && (
          <aside className="hidden lg:block space-y-6">
            {/* Metadata section - always show in sidebar on desktop */}
            <div className="space-y-2 pb-6 border-b border-gray-200 dark:border-gray-800">
              <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
                {note.date}
              </p>
              {readingTime && readingTimeConfig && (
                <ReadingTimeBadge
                  minutes={readingTime.minutes}
                  words={readingTime.words}
                  showIcon={readingTimeConfig.showIcon}
                  showWordCount={readingTimeConfig.showWordCount}
                />
              )}
              {note.tags && note.tags.length > 0 && (
                <TagsList tags={note.tags} />
              )}
              {socialShareConfig && (
                <SocialShare
                  title={note.title}
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
