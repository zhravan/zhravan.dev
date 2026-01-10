import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
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
import { findRelatedPosts } from '@/lib/plugins/related-posts';
import { ReadingTimeBadge } from '@/components/ReadingTimeBadge';
import { TableOfContents } from '@/components/TableOfContents';
import { MobileTOC } from '@/components/MobileTOC';
import { PostNavigation } from '@/components/PostNavigation';
import { TagsList } from '@/components/TagsList';
import { SocialShare } from '@/components/SocialShare';
import { DraftBadge } from '@/components/DraftBadge';
import { DraftPreviewGate } from '@/components/DraftPreviewGate';
import { SeriesNavigator } from '@/components/SeriesNavigator';
import { RelatedPosts } from '@/components/RelatedPosts';
import { getContentByTag, slugifyTag } from '@/lib/tags';
import { Suspense } from 'react';
import { getBreadcrumbStructuredData } from '@/lib/breadcrumbs';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export async function generateStaticParams() {
  const allPosts = getAllPosts(true); // Include drafts for static generation
  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug, true); // Include drafts for static generation

    if (!post) {
      return {
        title: 'Post Not Found'
      };
    }

    return getPostMetadata({
      title: post.title,
      description: post.description,
      path: `/blogs/${slug}/`,
      date: post.date,
      tags: post.tags,
      ogImage: post.ogImage
    });
  } catch (error) {
    console.error('Error generating metadata for blog post:', error);
    return {
      title: 'Post Not Found'
    };
  }
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, true); // Include drafts for static generation

  if (!post) {
    console.warn(`Blog post not found: ${slug}. Available posts:`, getAllPosts(true).map(p => p.slug));
    notFound();
  }

  let Content;
  try {
    Content = (await import(`@/content/blog/${slug}.mdx`)).default;
  } catch (error) {
    console.error(`Failed to load blog post MDX file: ${slug}`, error);
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
  const relatedPostsConfig = getPluginConfig<{ enabled: boolean; count: number; showDate: boolean; showDescription: boolean }>('related-posts');
  
  // Use article-specific preview token if available, fallback to global token
  const previewToken = (post as any).previewToken || draftsConfig?.previewToken || '';
  
  // Get related posts
  const relatedPosts = relatedPostsConfig?.enabled ? findRelatedPosts(slug) : null;
  
  // Get "more from this tag" posts (posts with the same primary tag)
  const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : null;
  const moreFromTag = primaryTag ? getContentByTag(primaryTag).filter(p => p.slug !== slug).slice(0, 3) : null;
  
  const showTocSidebar = tocHeadings && tocConfig && tocConfig.position !== 'inline';
  const showTocInline = tocHeadings && tocConfig && tocConfig.position === 'inline';
  const showSidebar = true; // Always show sidebar for metadata
  
  // Generate share URL
  const shareUrl = getShareUrl(`/blogs/${slug}/`);

  const structuredData = getArticleStructuredData({
    title: post.title,
    description: post.description,
    path: `/blogs/${slug}/`,
    date: post.date,
    tags: post.tags
  });

  const breadcrumbData = getBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Writing', url: '/writing/' },
    { name: post.title, url: `/blogs/${slug}/` },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StructuredData data={[structuredData, breadcrumbData]} />
      <AnalyticsTracker
        contentType="article"
        contentTitle={post.title}
        contentSlug={slug}
        contentTags={post.tags}
        contentCategory={post.tags?.[0]}
        readingTimeMinutes={readingTime?.minutes}
      />
      <DraftPreviewGate 
        isDraft={isDraft(post)} 
        previewToken={previewToken}
      >
        <div className="space-y-6 text-xxs">
          <div className="flex items-center gap-2 mb-8">
            <BackLink href="/writing/">Back to Writing</BackLink>
            {isDraft(post) && <DraftBadge draft={true} />}
          </div>

      {/* Metadata section - above content on mobile only */}
      <div className="space-y-2 mb-6 lg:hidden">
        <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
          {post.date}
        </p>
        {readingTime && readingTimeConfig && (
          <ReadingTimeBadge
            minutes={readingTime.minutes}
            words={readingTime.words}
            showIcon={readingTimeConfig.showIcon}
            showWordCount={readingTimeConfig.showWordCount}
          />
        )}
        {post.tags && post.tags.length > 0 && (
          <TagsList tags={post.tags} />
        )}
        {socialShareConfig && (
          <SocialShare
            title={post.title}
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

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts 
              posts={relatedPosts} 
              showDate={relatedPostsConfig?.showDate ?? true}
              showDescription={relatedPostsConfig?.showDescription ?? false}
            />
          )}

          {/* More from this tag */}
          {moreFromTag && moreFromTag.length > 0 && primaryTag && (
            <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[10px] font-medium opacity-40 uppercase tracking-wider">
                  More from <Link href={`/tags/${slugifyTag(primaryTag)}/`} className="hover:opacity-100 transition-opacity">{primaryTag}</Link>
                </h2>
                <Link 
                  href={`/tags/${slugifyTag(primaryTag)}/`}
                  className="text-[10px] opacity-50 hover:opacity-100 transition-opacity"
                >
                  View all →
                </Link>
              </div>
              <RelatedPosts 
                posts={moreFromTag} 
                showDate={true}
                showDescription={false}
              />
            </section>
          )}

          {/* Giscus comments plugin (self-contained enable/disable via config) */}
          <br/>
          <Giscus />

        </article>

        {showSidebar && (
          <aside className="hidden lg:block space-y-6">
            {/* Metadata section - always show in sidebar on desktop */}
            <div className="space-y-2 pb-6 border-b border-gray-200 dark:border-gray-800">
              <p className="text-[10px] opacity-50" style={{ color: 'var(--color-muted-foreground)' }}>
                {post.date}
              </p>
              {readingTime && readingTimeConfig && (
                <ReadingTimeBadge
                  minutes={readingTime.minutes}
                  words={readingTime.words}
                  showIcon={readingTimeConfig.showIcon}
                  showWordCount={readingTimeConfig.showWordCount}
                />
              )}
              {post.tags && post.tags.length > 0 && (
                <TagsList tags={post.tags} />
              )}
              {socialShareConfig && (
                <SocialShare
                  title={post.title}
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
