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

  const totalBooks = read.length;
  const currentYear = new Date().getFullYear();
  const booksThisYear = read.filter(b => 
    b.dateFinished && new Date(b.dateFinished).getFullYear() === currentYear
  ).length;

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="space-y-8 text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      {/* Stats */}
      <div className="flex gap-6 text-xs">
        <div>
          <span className="opacity-40">Read </span>
          <span className="font-medium">{totalBooks}</span>
        </div>
        <div>
          <span className="opacity-40">This year </span>
          <span className="font-medium">{booksThisYear}</span>
        </div>
        <div>
          <span className="opacity-40">Reading </span>
          <span className="font-medium">{reading.length}</span>
        </div>
      </div>

      {/* Currently Reading */}
      {reading.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs opacity-50">Currently Reading</h2>
          <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
            {reading.map((book) => (
              <li key={book.id} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                  <div className="flex items-baseline gap-2 min-w-0 flex-1">
                    <span className="opacity-30">→</span>
                    <span className="group-hover:opacity-70 transition-opacity truncate font-medium">
                      {book.title}
                    </span>
                    <span className="text-[11px] opacity-50">{book.author}</span>
                  </div>
                  {book.tags && book.tags.length > 0 && (
                    <div className="opacity-0 group-hover:opacity-70 text-[10px] transition-all duration-200 flex gap-1 flex-wrap pl-0 sm:pl-2">
                      {book.tags.map((tag) => (
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
      )}

      {/* Read Books */}
      {read.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs opacity-50">Read</h2>
          <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
            {read.map((book) => (
              <li key={book.id} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs leading-relaxed">
                  <div className="flex items-baseline gap-2 min-w-0 flex-1">
                    <span className="opacity-30">→</span>
                    <span className="group-hover:opacity-70 transition-opacity truncate font-medium">
                      {book.title}
                    </span>
                    <span className="text-[11px] opacity-50">{book.author}</span>
                    {book.rating && (
                      <span className="text-[10px] opacity-30">
                        {book.rating}/5
                      </span>
                    )}
                    {book.dateFinished && (
                      <time className="text-[10px] opacity-30 shrink-0" dateTime={book.dateFinished}>
                        {formatDate(book.dateFinished)}
                      </time>
                    )}
                  </div>
                  {book.tags && book.tags.length > 0 && (
                    <div className="opacity-0 group-hover:opacity-70 text-[10px] transition-all duration-200 flex gap-1 flex-wrap pl-0 sm:pl-2">
                      {book.tags.map((tag) => (
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
      )}

      {/* Want to Read */}
      {toRead.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xs opacity-50">Want to Read</h2>
          <ul className="list-none p-0 m-0 space-y-2.5 sm:space-y-1.5">
            {toRead.map((book) => (
              <li key={book.id} className="group">
                <div className="flex items-baseline gap-2 text-xs leading-relaxed">
                  <span className="opacity-30">→</span>
                  <span className="group-hover:opacity-70 transition-opacity truncate font-medium">
                    {book.title}
                  </span>
                  <span className="text-[11px] opacity-50">{book.author}</span>
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
