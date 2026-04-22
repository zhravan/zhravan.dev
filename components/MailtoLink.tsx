'use client';

import type { CSSProperties, MouseEvent, ReactNode } from 'react';

type MailtoLinkProps = {
  email: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  subject?: string;
  body?: string;
  title?: string;
};

function buildMailtoHref(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const qs = params.toString();
  return qs ? `mailto:${email}?${qs}` : `mailto:${email}`;
}

function buildGmailComposeUrl(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
  });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function MailtoLink({
  email,
  children,
  className,
  style,
  subject,
  body,
  title,
}: MailtoLinkProps) {
  const href = buildMailtoHref(email, subject, body);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Try native mail client first; fall back to web compose when unsupported.
    e.preventDefault();

    let didBlur = false;
    const onBlur = () => {
      didBlur = true;
    };

    window.addEventListener('blur', onBlur, { once: true });
    window.location.href = href;

    window.setTimeout(() => {
      if (!didBlur) {
        window.open(buildGmailComposeUrl(email, subject, body), '_blank', 'noopener,noreferrer');
      }
      window.removeEventListener('blur', onBlur);
    }, 900);
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style} title={title}>
      {children}
    </a>
  );
}
