import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentByTag, getTagFromSlug, getAllTags } from '@/lib/tags';
import { getContentTypeById } from '@/lib/content-types';
import { getPageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allTags = getAllTags();
  return allTags.map((tag) => ({
    tag: tag
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, ''),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagFromSlug(tagSlug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  const posts = getContentByTag(tag);
  const count = posts.length;

  return getPageMetadata({
    title: `Tag: ${tag}`,
    description: `Browse ${count} ${count === 1 ? 'post' : 'posts'} tagged with "${tag}"`,
    path: `/tags/${tagSlug}/`,
  });
}

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = getTagFromSlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = getContentByTag(tag);
  const count = posts.length;

  const pageMetadata = {
    title: `Tag: ${tag}`,
    description: `${count} ${count === 1 ? 'post' : 'posts'} tagged with "${tag}"`,
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} />
      
      <div className="space-y-1">
        <p className="text-xs opacity-60 mb-6">
          {count} {count === 1 ? 'post' : 'posts'} found
        </p>

        <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
          {posts.map((item) => {
            const contentType = getContentTypeById(item.contentType);
            const basePath =
              contentType?.id === 'blog' ? '/blogs' : contentType?.path || '';
            const itemPath = `${basePath}/${item.slug}`;

            return (
              <li key={`${item.contentType}-${item.slug}`} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                  <div className="flex items-baseline gap-2 min-w-0 flex-1">
                    <span className="opacity-30">→</span>
                    <Link
                      href={itemPath}
                      className="hover:opacity-70 transition-opacity truncate font-semibold"
                    >
                      {item.title}
                    </Link>
                    <time
                      className="opacity-50 text-[11px] shrink-0"
                      dateTime={item.date}
                    >
                      {formatDate(item.date)}
                    </time>
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="opacity-0 group-hover:opacity-70 text-[10px] transition-all duration-200 flex gap-1 flex-wrap pl-0 sm:pl-2">
                      {item.tags
                        .filter((t) => t.toLowerCase() !== tag.toLowerCase())
                        .slice(0, 3)
                        .map((t) => (
                          <Link
                            key={t}
                            href={`/tags/${t
                              .toLowerCase()
                              .trim()
                              .replace(/[^\w\s-]/g, '')
                              .replace(/[\s_-]+/g, '-')
                              .replace(/^-+|-+$/g, '')}/`}
                            className="px-1.5 py-0.5 rounded border hover:opacity-100 transition-opacity"
                            style={{ borderColor: 'var(--color-border)' }}
                          >
                            {t}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

