import Image from 'next/image';
import Link from 'next/link';
import { getDefaultMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { HomeActions } from '@/components/HomeActions';
import type { Metadata } from 'next';

/** Public URL; filename contains `<>`, so encode for a valid path. */
const HOME_PROFILE_SRC = '/assets/ohmyscript.com%3C%3Ezhravan.webp';
const EMAIL = 'shravan@eclosion.in';

export const metadata: Metadata = getDefaultMetadata();

export default function Home() {
  return (
    <div className="animate-fade-in">
      <AnalyticsTracker contentType="page" contentTitle="Home" contentSlug="home" />

      <header className="flex w-fit max-w-full flex-col items-start gap-3">
        <h1 className="sr-only">Hi, I&apos;m Shravan</h1>
        <Image
          src={HOME_PROFILE_SRC}
          alt="Shravan Kumar B"
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
          priority
        />
        <p className="m-0 flex max-w-full flex-wrap items-center gap-x-1.5">
          <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>
            Shravan Kumar B
          </span>
          <span>Systems Engineer</span>
        </p>
      </header>

      <p className="mt-6">
        I am a tinkerer, FOSS enthusiast, polymathic indie computer scientist, systems engineer, and data-science aficionado. I build systems that make life simpler for developers, teams, and curious humans.
      </p>
      <p className="mt-6">
        I work on problems that are interesting, challenging, and have real-world impact. I enjoy optimization challenges, resilient system design, clever abstractions, and performance-focused engineering.
      </p>
      <p className="mt-6">
        In my leisure time, I enjoy exploring ideas; scientific, philosophical, or just strange enough to be interesting. I like cooking, gardening, introspection, and discovering how people learn, build, and collaborate.
      </p>
      <p className="mt-6">
        You can <Link href="/writing/">read my writing</Link>, check out my <Link href="/projects/">projects</Link> and{' '}
        <Link href="/talks/">talks</Link>, or <Link href="/about/">learn more about me</Link>.
      </p>

      <HomeActions email={EMAIL} />
    </div>
  );
}
