'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavPillProps {
  href: string;
  children: React.ReactNode;
}

export function NavPill({ href, children }: NavPillProps) {
  const pathname = usePathname();
  const isActive = href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className="transition-opacity duration-150 hover:opacity-70"
      style={{
        fontSize: '0.65rem',
        color: isActive ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
        textDecoration: isActive ? 'underline' : 'none',
        textUnderlineOffset: '3px',
      }}
    >
      {isActive && '#'}
      {children}
    </Link>
  );
}
