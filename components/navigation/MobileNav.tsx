'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { OhMyScript } from '@/components/OhMyScript';

interface NavItem {
  name: string;
  path: string;
  icon?: string | null;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 transition-opacity hover:opacity-80"
        style={{
          backgroundColor: 'var(--color-muted)',
          color: 'var(--color-foreground)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.375rem',
        }}
        aria-label="Open navigation menu"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{
          backgroundColor: 'var(--color-background)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <Link
              href="/"
              className="text-sm font-medium transition-opacity hover:opacity-90 focus:opacity-90"
              style={{
                color: 'var(--color-foreground)',
                textDecoration: 'none',
                borderBottom: 'none',
                paddingBottom: 0
              }}
              onClick={() => setIsOpen(false)}
            >
              <OhMyScript />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 transition-opacity hover:opacity-80"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-1.5 transition-opacity hover:opacity-70"
                      style={{
                        fontSize: '0.75rem',
                        color: active
                          ? 'var(--color-foreground)'
                          : 'var(--color-muted-foreground)',
                        textDecoration: active ? 'underline' : 'none',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      {active && '#'}
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

