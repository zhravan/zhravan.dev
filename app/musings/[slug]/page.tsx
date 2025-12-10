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

export async function generateStaticParams() {
  const allThoughts = getContentByType('thoughts', true); // Include drafts for static generation
  return allThoughts.map((thought) => ({
    slug: thought.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = getContentItemBySlug('thoughts', slug);

  if (!thought) {
    return {
      title: 'Thought Not Found'
    };
  }

  return getPostMetadata({
    title: thought.title,
    description: thought.description,
    slug,
    date: thought.date,
    tags: thought.tags
  });
}

export default async function ThoughtPost({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = getContentItemBySlug('thoughts', slug);

  if (!thought) {
    notFound();
  }

  let Content;
  try {
    Content = (await import(`@/content/thoughts/${slug}.mdx`)).default;
  } catch (error) {
    console.error(`Failed to load thought post: ${slug}`, error);
    notFound();
  }

  // Load plugin data
  const readingTime = await getReadingTimeForPost(slug);
  const tocHeadings = await getTocForPost(slug);
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

  // Generate share URL
  const shareUrl = `/musings/${slug}`;

  const structuredData = getArticleStructuredData({
    title: thought.title,
    description: thought.description,
    slug,
    date: thought.date,
    tags: thought.tags
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StructuredData data={structuredData} />
      <DraftPreviewGate
        isDraft={isDraft(thought)}
        previewToken={draftsConfig?.previewToken || ''}
      >
        <div className="space-y-6 text-xxs">
          <div className="flex items-center gap-2 mb-8">
            <BackLink href="/writing">Back to Writing</BackLink>
            {isDraft(thought) && <DraftBadge draft={true} />}
          </div>

      {/* Metadata section - above content on mobile only */}
      <div className="space-y-2 mb-6 lg:hidden">
        <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
          {thought.date}
        </p>
        {readingTime && readingTimeConfig && (
          <ReadingTimeBadge
            minutes={readingTime.minutes}
            words={readingTime.words}
            showIcon={readingTimeConfig.showIcon}
            showWordCount={readingTimeConfig.showWordCount}
          />
        )}
        {thought.tags && thought.tags.length > 0 && (
          <TagsList tags={thought.tags} />
        )}
        {socialShareConfig && (
          <SocialShare
            title={thought.title}
            url={shareUrl}
            showIcon={socialShareConfig.showIcon}
          />
        )}
      </div>

      {/* Mobile TOC */}
      {tocHeadings && tocHeadings.length > 0 && (
        <MobileTOC headings={tocHeadings} />
      )}

      <div className={showTocSidebar ? 'lg:grid lg:grid-cols-[1fr_250px] lg:gap-12' : ''}>
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

        {showTocSidebar && (
          <aside className="hidden lg:block space-y-6">
            {/* Metadata section - in sidebar on desktop */}
            <div className="space-y-2 pb-6 border-b border-gray-200 dark:border-gray-800">
              <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
                {thought.date}
              </p>
              {readingTime && readingTimeConfig && (
                <ReadingTimeBadge
                  minutes={readingTime.minutes}
                  words={readingTime.words}
                  showIcon={readingTimeConfig.showIcon}
                  showWordCount={readingTimeConfig.showWordCount}
                />
              )}
              {thought.tags && thought.tags.length > 0 && (
                <TagsList tags={thought.tags} />
              )}
              {socialShareConfig && (
                <SocialShare
                  title={thought.title}
                  url={shareUrl}
                  showIcon={socialShareConfig.showIcon}
                />
              )}
            </div>

            <TableOfContents
              headings={tocHeadings}
              position={tocConfig.position}
              sticky={tocConfig.sticky}
            />
          </aside>
        )}
      </div>
        </div>
      </DraftPreviewGate>
    </Suspense>
  );
}
