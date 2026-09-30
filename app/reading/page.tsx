import { getBooks, type Book } from '@/lib/books';
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

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

function BookRow({ book, date }: { book: Book; date?: string }) {
  const content = (
    <span className="relative z-[1] flex items-center gap-3">
      <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
        <span className="list-row__title max-w-full shrink-0 truncate">{book.title}</span>
        <span className="hidden max-w-[40%] shrink-0 truncate text-[12px] opacity-60 sm:block">{book.author}</span>
        {book.tags && book.tags.length > 0 && (
          <span className="list-row__tags" style={{ flexShrink: 999 }} aria-label="Tags">
            {book.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </span>
        )}
      </span>
      {(book.rating || date) && (
        <span className="flex shrink-0 items-center gap-2 text-[12px] tabular-nums opacity-70">
          {book.rating && <span aria-label={`Rated ${book.rating} out of 5`}>{book.rating}/5</span>}
          {date && <time dateTime={date}>{formatDate(date)}</time>}
        </span>
      )}
    </span>
  );

  return (
    <li>
      {book.amazonLink ? (
        <a
          href={book.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="list-row"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          {content}
        </a>
      ) : (
        <div className="list-row" style={{ color: 'var(--color-muted-foreground)' }}>
          {content}
        </div>
      )}
    </li>
  );
}

function BookSection({ label, books, dateOf }: { label: string; books: Book[]; dateOf?: (book: Book) => string | undefined }) {
  if (books.length === 0) return null;
  return (
    <section className="mt-8 first:mt-4">
      <h2 className="mb-2 font-normal leading-none" style={{ color: 'var(--color-muted-foreground)' }}>
        {label} <span className="text-[10px] opacity-40">({books.length})</span>
      </h2>
      <ul className="m-0 flex list-none flex-col py-0 pr-0 pl-3">
        {books.map((book) => (
          <BookRow key={book.id} book={book} date={dateOf?.(book)} />
        ))}
      </ul>
    </section>
  );
}

export default function ReadingPage() {
  const allBooks = getBooks();
  const reading = allBooks.filter(b => b.status === 'reading');
  const read = allBooks.filter(b => b.status === 'read').sort((a, b) => {
    if (!a.dateFinished) return 1;
    if (!b.dateFinished) return -1;
    return new Date(b.dateFinished).getTime() - new Date(a.dateFinished).getTime();
  });
  const toRead = allBooks.filter(b => b.status === 'to-read');

  return (
    <div className="text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <BookSection label="Currently reading" books={reading} dateOf={(b) => b.dateStarted} />
      <BookSection label="Read" books={read} dateOf={(b) => b.dateFinished} />
      <BookSection label="Want to read" books={toRead} />

      {allBooks.length === 0 && (
        <p className="text-xs opacity-40">No books yet.</p>
      )}
    </div>
  );
}
