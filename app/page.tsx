import Image from 'next/image';
import Link from 'next/link';
import { getDefaultMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { MailtoLink } from '@/components/MailtoLink';
import type { Metadata } from 'next';

/** Public URL; filename contains `<>`, so encode for a valid path. */
const HOME_PROFILE_SRC = '/assets/ohmyscript.com%3C%3Ezhravan.webp';

export const metadata: Metadata = getDefaultMetadata();

export default function Home() {
  return (
    <main className="space-y-6 text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle="Home"
        contentSlug="home"
      />
      <article className="animate-fade-in">
        <header className="mb-6">
          <div className="flex flex-col items-start gap-3">
            <Image
              src={HOME_PROFILE_SRC}
              alt="Shravan Kumar B"
              width={88}
              height={88}
              className="h-[5.5rem] w-[5.5rem] shrink-0 rounded-full object-cover ring-1 ring-[var(--color-border)] ring-offset-2 ring-offset-[var(--color-background)]"
              priority
            />
            <div className="min-w-0 space-y-2.5">
              <h1
                className="page-title text-lg sm:text-xl tracking-tight m-0"
                style={{ color: 'var(--color-foreground)' }}
              >
                Shravan Kumar B
              </h1>
              <span
                className="block h-px w-11 max-w-full opacity-70"
                style={{ backgroundColor: 'var(--color-border)' }}
                aria-hidden
              />
            </div>
          </div>
        </header>
        <div className="prose space-y-3">
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            I am a tinkerer, FOSS enthusiast, polymathic indie computer scientist, systems engineer, and data-science aficionado. I build systems that make life simpler for developers, teams, and curious humans.
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            I work on problems that are interesting, challenging, and have real-world impact. I enjoy optimization challenges, resilient system design, clever abstractions, and performance-focused engineering.
          </p>
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            In my leisure time, I enjoy exploring ideas; scientific, philosophical, or just strange enough to be interesting. <br />
            I like cooking, gardening, introspection, and discovering how people learn, build, and collaborate.
          </p>
        </div>
      </article>

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
          You can <Link href="/writing/">read my writing</Link>, check out my{' '}
          <Link href="/projects/">projects</Link>, or <Link href="/about/">learn more about me</Link>. I am always interested in connecting with fellow developers and creators. You can reachout to me via <MailtoLink email="shravan@eclosion.in" className="transition-opacity hover:opacity-70">shravan@eclosion.in</MailtoLink>.
        </p>
      </section>

      <section className="animate-fade-up" style={{ animationDelay: '260ms' }}>
        <div
          className="rounded-[2px] border px-4 py-3 sm:px-5 sm:py-3.5"
          style={{
            borderColor: 'color-mix(in srgb, hsl(145 96% 36%) 76%, var(--color-border))',
            backgroundColor: 'color-mix(in srgb, hsl(206 80% 5%) 55%, var(--color-card))',
            boxShadow: '0 0 0 1px color-mix(in srgb, hsl(145 96% 36%) 28%, transparent) inset',
          }}
        >
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p
                className="m-0 text-sm sm:text-base tracking-wide break-words"
                style={{
                  color: 'color-mix(in srgb, var(--color-foreground) 90%, hsl(145 28% 75%))',
                  fontFamily: 'var(--code-font-family)',
                }}
              >
                say hi at{' '}
                <MailtoLink
                  email="shravan@eclosion.in"
                  className="border-b-0 pb-0 transition-opacity hover:opacity-80"
                  style={{ color: 'hsl(145 96% 40%)' }}
                >
                  shravan@eclosion.in
                </MailtoLink>
              </p>
              <p
                className="m-0 mt-1 text-[10px]"
                style={{
                  color: 'color-mix(in srgb, var(--color-muted-foreground) 68%, transparent)',
                  fontFamily: 'var(--code-font-family)',
                }}
              >
                replies within 1-2 days.
              </p>
            </div>
            <MailtoLink
              email="shravan@eclosion.in"
              className="inline-flex w-fit items-center justify-center border px-2.5 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-opacity hover:opacity-80"
              style={{
                borderColor: 'hsl(145 96% 36%)',
                color: 'hsl(145 96% 40%)',
                fontFamily: 'var(--code-font-family)',
              }}
              title="Send email"
            >
              send.mail
            </MailtoLink>
          </div>
        </div>
      </section>

    </main>
  );
}
