import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';

const pageMetadata = { title: 'Contact', description: 'Get in touch with me.' };

export const metadata: Metadata = getPageMetadata({ title: pageMetadata.title, description: pageMetadata.description, path: '/contact/' });

const primaryLinks = [
  ['email', 'mailto:shravan@eclosion.in'],
  ['calendar', 'https://cal.com/zhravan'],
  ['github', 'https://github.com/zhravan'],
  ['linkedin', 'https://www.linkedin.com/in/zhravan/'],
];

const elsewhereLinks = [
  ['gitlab', 'https://gitlab.com/zhravan'],
  ['gitlab / shravan_20', 'https://gitlab.com/shravan_20'],
  ['x / @zhravan', 'https://x.com/zhravan'],
  ['youtube / @ohmycuriosity', 'https://www.youtube.com/@ohmycuriosity'],
  ['twitch / zhravan', 'https://www.twitch.tv/zhravan'],
  ['stackoverflow / zhravan', 'https://stackoverflow.com/users/11899809/zhravan'],
  ['dev.to / zhravan', 'https://dev.to/zhravan'],
  ['spotify / zhravan', 'https://open.spotify.com/user/31fwuia2mxmmftz44wdw35bldw64'],
];

function LinkList({ links }: { links: string[][] }) {
  return <div className="flex flex-col items-start gap-2">{links.map(([label, url]) => <a key={url} href={url} target={url.startsWith('http') ? '_blank' : undefined} rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}>{label}</a>)}</div>;
}

export default function Contact() {
  return (
    <div className="space-y-10 text-sm">
      <AnalyticsTracker contentType="page" contentTitle={pageMetadata.title} contentSlug="contact" />
      <header className="space-y-2">
        <h1 className="text-lg text-[var(--color-foreground)] sm:text-xl">Contact</h1>
        <p className="max-w-xl text-[var(--color-muted-foreground)]">Currently available for freelance projects and consulting engagements.</p>
      </header>
      <section className="space-y-3">
        <h2 className="text-sm text-[var(--color-foreground)]">Direct</h2>
        <LinkList links={primaryLinks} />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm text-[var(--color-foreground)]">Elsewhere</h2>
        <LinkList links={elsewhereLinks} />
      </section>
    </div>
  );
}
