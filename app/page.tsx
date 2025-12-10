import Link from 'next/link';
import { getDefaultMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...getDefaultMetadata(),
  openGraph: {
    ...getDefaultMetadata().openGraph,
    images: [
      {
        url: '/api/og?title=zhravan&description=tinkerer,%20polymathic%20indie%20computer%20scientist,%20systems%20engineer,%20and%20data-science%20aficionado.',
        width: 1200,
        height: 630,
        alt: 'zhravan - tinkerer, polymathic indie computer scientist',
      },
    ],
  },
  twitter: {
    ...getDefaultMetadata().twitter,
    images: ['/api/og?title=zhravan&description=tinkerer,%20polymathic%20indie%20computer%20scientist,%20systems%20engineer,%20and%20data-science%20aficionado.'],
  },
};

export default function Home() {
  return (
    <div className="space-y-6 text-xxs">
      <section className="animate-fade-in">
        <h1 className="text-sm mb-4">Shravan Kumar B</h1>
        <div className="prose space-y-3">
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            I am tinkerer, FOSS enthusiast, polymathic indie computer scientist, systems engineer, and data-science aficionado. I build systems that make life simpler for developers, teams, and curious humans.
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            I work on problems that are interesting, challenging, and have real-world impact. I enjoy optimization challenges, resilient system design, clever abstractions, and performance focused engineering.
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            In my leisure time, I enjoy exploring ideas - scientific, philosophical, or just strange enough to be interesting. I like gardening, introspection, and discovering how people learn, build, and collaborate.
          </p>
        </div>
      </section>

      {/* <section className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="text-sm mb-2">Featured Essays</h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/writing/developer-experience"
              className=""
              style={{ color: 'var(--color-link)' }}
            >
              Developer Experience Matters
            </Link>
          </li>
          <li>
            <Link
              href="/writing/welcome"
              className=""
              style={{ color: 'var(--color-link)' }}
            >
              Welcome to My Blog
            </Link>
          </li>
        </ul>
      </section> */}

      <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <p className="" style={{ color: 'var(--color-muted-foreground)' }}>
          You can <Link href="/writing">read my writing</Link>, check out my{' '}
          <Link href="/work">projects</Link>, or <Link href="/about">learn more about me</Link>. I am always interested in connecting with fellow developers and creators.
        </p>
      </section>
    </div>
  );
}
