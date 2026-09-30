import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/lib/breadcrumbs';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const last = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
      <ol className="flex items-center gap-1 text-[13px] list-none m-0 p-0">
        {items.map((item, index) => {
          const isLast = index === last;

          return (
            <li
              key={`${item.url}-${index}`}
              className={`flex items-center gap-1 m-0 p-0 ${isLast ? 'min-w-0' : 'shrink-0'}`}
            >
              {index > 0 && (
                <ChevronRight size={14} className="opacity-50 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="truncate"
                  style={{ color: 'var(--color-foreground)' }}
                  aria-current="page"
                  title={item.name}
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
