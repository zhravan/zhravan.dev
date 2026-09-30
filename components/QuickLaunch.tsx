'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  Home,
  PenLine,
  FolderGit2,
  Mic,
  BookOpen,
  Wrench,
  Briefcase,
  User,
  Mail,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react';

const PAGES: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Writing', href: '/writing/', icon: PenLine },
  { label: 'Projects', href: '/projects/', icon: FolderGit2 },
  { label: 'Talks', href: '/talks/', icon: Mic },
  { label: 'Reading', href: '/reading/', icon: BookOpen },
  { label: 'Uses', href: '/uses/', icon: Wrench },
  { label: 'Services', href: '/services/', icon: Briefcase },
  { label: 'About', href: '/about/', icon: User },
  { label: 'Contact', href: '/contact/', icon: Mail },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href.replace(/\/$/, ''));
}

export function QuickLaunch() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <>
      <div className="quick-launch-fade" aria-hidden="true" />
      <div ref={containerRef} className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        <nav
          id="quick-launch"
          aria-label="Quick access"
          className={`quick-launch-panel ${open ? 'quick-launch-panel--open' : ''}`}
          aria-hidden={!open}
        >
          <ul className="m-0 grid list-none grid-cols-3 gap-1 p-0">
            {PAGES.map(({ label, href, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? 'page' : undefined}
                    className={`quick-launch-item ${active ? 'quick-launch-item--active' : ''}`}
                  >
                    <span className="list-icon-squircle" style={{ '--list-icon-size': '32px', '--list-icon-radius': '9px' } as CSSProperties}>
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="quick-launch"
          aria-label={open ? 'Close quick access' : 'Open quick access'}
          className="quick-launch-trigger"
        >
          <LayoutGrid size={14} strokeWidth={1.75} />
        </button>
      </div>
    </>
  );
}
