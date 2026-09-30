'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from './Breadcrumbs';

interface PageTrailProps {
  labels: Record<string, string>;
}

function toTitle(segment: string) {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Home › Section trail for top-level pages; detail pages render their own breadcrumbs. */
export function PageTrail({ labels }: PageTrailProps) {
  const pathname = usePathname() ?? '/';
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;
  if (segments.length > 1 && segments[0] !== 'tags') return null;

  const section = `/${segments[0]}`;
  const items = [
    { name: 'Home', url: '/' },
    { name: labels[section] ?? toTitle(segments[0]), url: section },
    ...(segments[1] ? [{ name: `#${decodeURIComponent(segments[1])}`, url: pathname }] : []),
  ];

  return (
    <div className="mb-8">
      <Breadcrumbs items={items} />
    </div>
  );
}
