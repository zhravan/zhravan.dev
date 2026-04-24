import { getBooks } from '@/lib/books';
import { getPageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/PageHeader';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Reading',
  description: 'Books I am reading, have read, and thoughts on them.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/reading'
});

export default function ReadingPage() {
  const allBooks = getBooks();
  const reading = allBooks.filter(b => b.status === 'reading');
  const read = allBooks.filter(b => b.status === 'read').sort((a, b) => {
    if (!a.dateFinished) return 1;
    if (!b.dateFinished) return -1;
    return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
  });
  const toRead = allBooks.filter(b => b.status === 'to-read');

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };

  const sectionTitleClass = 'text-[0.8rem] leading-none tracking-tight sm:text-[1.25rem]';
  const bookTitleClass = 'break-words leading-tight text-[0.55rem] sm:text-[0.65rem]';

  return (
    <div className="space-y-6 sm:space-y-8 text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      {/* Currently Reading */}
      {reading.length > 0 && (
        <section className="space-y-1.5">
          <h2
            className={sectionTitleClass}
            style={{ color: 'color-mix(in srgb, var(--color-foreground) 92%, transparent)', fontFamily: 'var(--font-family-display)' }}
          >
            Currently Reading<span className="ml-1 inline-block" style={{ color: 'hsl(163 89% 45%)' }} aria-hidden>.</span>
          </h2>
          <ul className="m-0 list-none p-0">
            {reading.map((book) => (
              <li key={book.id} className="group">
                <div className="px-2.5 py-2 sm:px-3 sm:py-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex items-start gap-2 sm:items-center sm:gap-3">
                      <span className="shrink-0 opacity-40" aria-hidden>→</span>

                      <div className="min-w-0 flex-1">
                        <span className={bookTitleClass} style={{ color: 'hsl(163 71% 44%)', fontFamily: 'var(--code-font-family)' }}>
                          {book.title}
                        </span>
                      </div>

                      <div className="shrink-0 text-[6px] uppercase tracking-[0.1em] sm:text-[7px]" style={{ color: 'color-mix(in srgb, var(--color-muted-foreground) 88%, transparent)', fontFamily: 'var(--code-font-family)' }}>
                        {book.author}
                      </div>
                    </div>
                    {book.tags && book.tags.length > 0 && (
                      <div className="hidden flex-wrap gap-1 opacity-50 transition-opacity duration-200 sm:flex sm:justify-end sm:opacity-0 sm:group-hover:opacity-60">
                        {book.tags.map((tag) => (
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
      )}

      {/* Read Books */}
      {read.length > 0 && (
        <section className="space-y-1.5">
          <h2
            className={sectionTitleClass}
            style={{ color: 'color-mix(in srgb, var(--color-foreground) 92%, transparent)', fontFamily: 'var(--font-family-display)' }}
          >
            Read<span className="ml-1 inline-block" style={{ color: 'hsl(163 89% 45%)' }} aria-hidden>.</span>
          </h2>
          <ul className="m-0 list-none p-0">
            {read.map((book) => (
              <li key={book.id} className="group">
                <div className="px-2.5 py-2 sm:px-3 sm:py-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex items-start gap-2 sm:items-center sm:gap-3">
                      <span className="shrink-0 opacity-40" aria-hidden>→</span>

                      <div className="min-w-0 flex-1">
                        <span className={bookTitleClass} style={{ color: 'hsl(163 71% 44%)', fontFamily: 'var(--code-font-family)' }}>
                          {book.title}
                        </span>
                      </div>

                      <div className="shrink-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[6px] uppercase tracking-[0.1em] sm:text-[7px]" style={{ color: 'color-mix(in srgb, var(--color-muted-foreground) 88%, transparent)', fontFamily: 'var(--code-font-family)' }}>
                        <span>{book.author}</span>
                        {book.rating && <span>{book.rating}/5</span>}
                        {book.dateFinished && (
                          <time dateTime={book.dateFinished}>{formatDate(book.dateFinished)}</time>
                        )}
                      </div>
                    </div>
                    {book.tags && book.tags.length > 0 && (
                      <div className="hidden flex-wrap gap-1 opacity-50 transition-opacity duration-200 sm:flex sm:justify-end sm:opacity-0 sm:group-hover:opacity-60">
                        {book.tags.map((tag) => (
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
      )}

      {/* Want to Read */}
      {toRead.length > 0 && (
        <section className="space-y-1.5">
          <h2
            className={sectionTitleClass}
            style={{ color: 'color-mix(in srgb, var(--color-foreground) 92%, transparent)', fontFamily: 'var(--font-family-display)' }}
          >
            Want to Read<span className="ml-1 inline-block" style={{ color: 'hsl(163 89% 45%)' }} aria-hidden>.</span>
          </h2>
          <ul className="m-0 list-none p-0">
            {toRead.map((book) => (
              <li key={book.id} className="group">
                <div className="px-2.5 py-2 sm:px-3 sm:py-2">
                  <div className="min-w-0 flex items-start gap-2 sm:items-center sm:gap-3">
                    <span className="shrink-0 opacity-40" aria-hidden>→</span>

                    <div className="min-w-0 flex-1">
                      <span className={bookTitleClass} style={{ color: 'hsl(163 71% 44%)', fontFamily: 'var(--code-font-family)' }}>
                        {book.title}
                      </span>
                    </div>

                    <div className="shrink-0 text-[6px] uppercase tracking-[0.1em] sm:text-[7px]" style={{ color: 'color-mix(in srgb, var(--color-muted-foreground) 88%, transparent)', fontFamily: 'var(--code-font-family)' }}>
                      {book.author}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {allBooks.length === 0 && (
        <p className="text-xs opacity-40">No books yet.</p>
      )}
    </div>
  );
}
