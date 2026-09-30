'use client';

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PagedGridProps {
  children: ReactNode;
  pageSize: number;
  className?: string;
  label: string;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

const pad = (n: number) => String(n).padStart(2, '0');

export function PagedGrid({ children, pageSize, className, label }: PagedGridProps) {
  const items = Children.toArray(children);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const [page, setPage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      const target = Math.min(pageCount - 1, Math.max(0, next));
      if (target === page) return;
      setPage(target);
      const top = gridRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [page, pageCount]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || isTypingTarget(e.target)) return;
      if (e.key === 'ArrowLeft') goTo(page - 1);
      else if (e.key === 'ArrowRight') goTo(page + 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo, page]);

  const first = page * pageSize;

  return (
    <>
      <div ref={gridRef} className={`scroll-mt-8 ${className ?? ''}`}>
        {items.map((item, i) => {
          const visible = i >= first && i < first + pageSize;
          return (
            <div
              key={visible ? `${page}-${i}` : `hidden-${i}`}
              hidden={!visible}
              className={visible ? 'pager-item' : undefined}
              style={visible ? ({ '--pager-delay': `${(i - first) * 40}ms` } as CSSProperties) : undefined}
            >
              {item}
            </div>
          );
        })}
      </div>

      {pageCount > 1 && (
        <nav aria-label={`${label} pages`} className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="pager-segment"
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === page ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <span className="text-[11px] tabular-nums" style={{ color: 'var(--color-muted-foreground)' }} aria-hidden="true">
              <span style={{ color: 'var(--color-foreground)' }}>{pad(page + 1)}</span> / {pad(pageCount)}
            </span>
            <span className="sr-only" aria-live="polite">
              Page {page + 1} of {pageCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="pager-arrow" aria-label="Previous page" disabled={page === 0} onClick={() => goTo(page - 1)}>
              <ChevronLeft size={14} />
            </button>
            <button type="button" className="pager-arrow" aria-label="Next page" disabled={page === pageCount - 1} onClick={() => goTo(page + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
