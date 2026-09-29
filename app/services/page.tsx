import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';

const pageMetadata = { title: 'Work', description: 'A few ways I can help build, improve, and reason about technical systems.' };

export const metadata: Metadata = getPageMetadata({ title: pageMetadata.title, description: pageMetadata.description, path: '/services/' });

const services = [
  ['01', 'Product engineering', 'Build and ship products from an early idea through a working system.'],
  ['02', 'Systems & infrastructure', 'Design backend systems, data pipelines, APIs, and infrastructure that can grow without unnecessary complexity.'],
  ['03', 'Technical advisory', 'Work through architecture, technology choices, performance problems, and difficult engineering decisions.'],
];

export default function Services() {
  return (
    <div className="space-y-10 text-sm">
      <AnalyticsTracker contentType="page" contentTitle={pageMetadata.title} contentSlug="services" />
      <header className="space-y-2">
        <h1 className="text-lg text-[var(--color-foreground)] sm:text-xl">Work</h1>
        <p className="max-w-xl text-[var(--color-muted-foreground)]">{pageMetadata.description}</p>
      </header>

      <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {services.map(([number, title, description]) => (
          <section key={number} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]">
            <span className="text-xs text-[var(--color-muted-foreground)]">{number}</span>
            <div>
              <h2 className="text-base text-[var(--color-foreground)]">{title}</h2>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">{description}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="space-y-3 text-sm text-[var(--color-muted-foreground)]">
        <p>Selected work spans product engineering, distributed systems, data, AI, and hardware.</p>
        <p><a href="mailto:shravan@eclosion.in">Email me</a> or <a href="https://cal.com/zhravan" target="_blank" rel="noopener noreferrer">schedule a conversation</a>.</p>
      </div>
    </div>
  );
}
