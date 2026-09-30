'use client';

import { getCalApi } from '@calcom/embed-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { ACTIVE_THEME } from '@/lib/site';
import { getTheme, getThemeColorScheme } from '@/lib/themes';

interface HomeActionsProps {
  email: string;
}

const CAL_NAMESPACE = 'book-a-call';
const CAL_LINK = 'zhravan/catchup';
const CAL_THEME = getThemeColorScheme(ACTIVE_THEME);
const CAL_BRAND = getTheme(ACTIVE_THEME).colors.primary;
const CAL_CONFIG = {
  layout: 'month_view',
  theme: CAL_THEME,
  'ui.color-scheme': CAL_THEME,
} as const;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

export function HomeActions({ email }: HomeActionsProps) {
  const router = useRouter();

  useEffect(() => {
    getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      cal('ui', {
        theme: CAL_THEME,
        colorScheme: CAL_THEME,
        layout: 'month_view',
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          dark: { 'cal-brand': CAL_BRAND },
          light: { 'cal-brand': CAL_BRAND },
        },
      });
      cal('preload', { calLink: CAL_LINK });
    });
  }, []);

  const openBooking = useCallback(async () => {
    const cal = await getCalApi({ namespace: CAL_NAMESPACE });
    cal('modal', { calLink: CAL_LINK, config: CAL_CONFIG });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || isTypingTarget(e.target)) return;
      const key = e.key.toLowerCase();
      if (key === 'c') {
        e.preventDefault();
        openBooking();
      } else if (key === 'w') {
        router.push('/services');
      } else if (key === 'e') {
        window.location.href = `mailto:${email}`;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [email, router, openBooking]);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <button type="button" onClick={openBooking} className="btn-soft btn-soft--solid">
        Book a call
        <kbd aria-hidden="true" className="kbd hidden sm:inline-flex">C</kbd>
      </button>
      <Link href="/services" className="btn-soft btn-soft--ghost">
        Work with me
        <kbd aria-hidden="true" className="kbd hidden sm:inline-flex">W</kbd>
      </Link>
      <a href={`mailto:${email}`} className="btn-soft btn-soft--ghost">
        Email me
        <kbd aria-hidden="true" className="kbd hidden sm:inline-flex">E</kbd>
      </a>
    </div>
  );
}
