import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/breadcrumbs';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const last = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs list-none m-0 p-0">
        {items.map((item, index) => {
          const isLast = index === last;

          return (
            <li key={`${item.url}-${index}`} className="flex items-center gap-2 m-0 p-0">
              {index > 0 && (
                <span
                  className="opacity-35 select-none shrink-0"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {isLast ? (
                <span
                  className="truncate max-w-[min(100%,14rem)] sm:max-w-[min(100%,32rem)]"
                  style={{ color: 'var(--color-foreground)' }}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="no-underline border-none pb-0 shrink-0 transition-colors hover:opacity-100 opacity-90"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
