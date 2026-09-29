'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavPillProps { href: string; children: React.ReactNode; }

export function NavPill({ href, children }: NavPillProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className="text-sm transition-opacity duration-150 hover:opacity-60"
      style={{
        color: isActive ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
        textDecoration: isActive ? 'underline' : 'none',
        textUnderlineOffset: '4px',
      }}
    >
      {children}
    </Link>
  );
}
