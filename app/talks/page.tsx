import { getContentTypeById } from '@/lib/content-types';
import { getContentForType } from '@/lib/content';
import { filterDrafts } from '@/lib/plugins/drafts';
import { getPageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import type { Metadata } from 'next';
import Link from 'next/link';

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

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  const postTitleLinkClass =
    '!border-b-0 pb-0 transition-colors break-words leading-tight';

  // Group items by year (descending)
  const byYear = items.reduce<Record<string, typeof items>>((acc, item) => {
    const y = (new Date(item.date)).getFullYear();
    const key = isNaN(y) ? 'Unknown' : String(y);
    (acc[key] ||= []).push(item);
    return acc;
  }, {});

  const yearKeys = Object.keys(byYear)
    .sort((a, b) => (b === 'Unknown' ? -1 : a === 'Unknown' ? 1 : Number(b) - Number(a)));

  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      {items.length === 0 ? (
        <div className="text-xs opacity-50">
          Yet to add talks.
        </div>
      ) : (
        <div className="space-y-4">
          {yearKeys.map((year) => {
            const yearItems = byYear[year];
            return (
              <section key={year} className="space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <h2
                    className="text-[0.8rem] leading-none tracking-tight sm:text-[1.25rem]"
                    style={{
                      color: 'color-mix(in srgb, var(--color-foreground) 92%, transparent)',
                      fontFamily: 'var(--font-family-display)',
                    }}
                  >
                    {year}
                    <span
                      className="ml-1 inline-block"
                      style={{ color: 'hsl(163 89% 45%)' }}
                      aria-hidden
                    >
                      .
                    </span>
                  </h2>
                  <span
                    className="pt-0.5 text-[8px] sm:text-[10px]"
                    style={{
                      color: 'color-mix(in srgb, var(--color-muted-foreground) 78%, transparent)',
                      fontFamily: 'var(--code-font-family)',
                    }}
                  >
                    {yearItems.length}
                  </span>
                </div>

                <ul
                  className="m-0 list-none overflow-hidden rounded-[0.8rem] border p-0"
                  style={{
                    backgroundColor:
                      'color-mix(in srgb, var(--color-card) 74%, var(--color-background))',
                    borderColor: 'color-mix(in srgb, var(--color-border) 78%, transparent)',
                  }}
                >
                  {yearItems.map((item, index) => (
                    <li
                      key={item.slug}
                      className="group"
                      style={{
                        borderTop:
                          index === 0
                            ? 'none'
                            : '1px dashed color-mix(in srgb, var(--color-border) 62%, transparent)',
                      }}
                    >
                      <div className="px-2.5 py-4.5 sm:px-3 sm:py-4.5">
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0 flex items-start gap-2 sm:items-center sm:gap-3">
                            <time
                              className="shrink-0 text-[6px] uppercase tracking-[0.1em] sm:text-[7px]"
                              style={{
                                color:
                                  'color-mix(in srgb, var(--color-muted-foreground) 88%, transparent)',
                                fontFamily: 'var(--code-font-family)',
                              }}
                              dateTime={item.date}
                            >
                              {formatDate(item.date)}
                            </time>

                            <div className="min-w-0 flex-1">
                              <Link
                                href={`${contentType.path}/${item.slug}`}
                                className={`${postTitleLinkClass} text-[0.62rem] sm:text-[0.72rem]`}
                                style={{
                                  color: 'hsl(163 71% 44%)',
                                  fontFamily: 'var(--code-font-family)',
                                }}
                              >
                                {item.title}
                              </Link>
                            </div>
                          </div>

                          {item.tags && item.tags.length > 0 && (
                            <div className="hidden flex-wrap gap-1 opacity-50 transition-opacity duration-200 sm:flex sm:justify-end sm:opacity-0 sm:group-hover:opacity-60">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border px-1.5 py-0.5 text-[8px] uppercase tracking-[0.12em]"
                                  style={{
                                    borderColor:
                                      'color-mix(in srgb, var(--color-border) 90%, transparent)',
                                    color:
                                      'color-mix(in srgb, var(--color-muted-foreground) 90%, transparent)',
                                    fontFamily: 'var(--code-font-family)',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
