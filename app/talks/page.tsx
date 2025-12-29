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

      <div className="space-y-5">
        {yearKeys.map((year) => {
          const yearItems = byYear[year];
          return (
            <section key={year} className="space-y-1.5">
              <h2 className="text-xs opacity-50 mb-2">{year}</h2>
              <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
                {yearItems.map((item) => (
                  <li key={item.slug} className="group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                      <div className="flex items-baseline gap-2 min-w-0 flex-1">
                        <span className="opacity-30">▶</span>
                        <Link
                          href={`${contentType.path}/${item.slug}`}
                          className="hover:opacity-70 transition-opacity truncate font-semibold"
                        >
                          {item.title}
                        </Link>
                        <time className="opacity-50 text-[11px] shrink-0" dateTime={item.date}>
                          {formatDate(item.date)}
                        </time>
                      </div>
                      {item.tags && item.tags.length > 0 && (
                        <div className="opacity-0 group-hover:opacity-70 text-[10px] transition-all duration-200 flex gap-1 flex-wrap pl-0 sm:pl-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded border"
                              style={{ borderColor: 'var(--color-border)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
