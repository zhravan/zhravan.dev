import Image from 'next/image';
import Link from 'next/link';
import { getDefaultMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';

const HOME_PROFILE_SRC = '/assets/ohmyscript.com%3C%3Ezhravan.webp';

export const metadata: Metadata = getDefaultMetadata();

export default function Home() {
  return (
    <main className="space-y-10 text-sm sm:text-[0.95rem]">
      <AnalyticsTracker contentType="page" contentTitle="Home" contentSlug="home" />

      <article className="space-y-8">
        <header className="flex items-center gap-4">
          <Image
            src={HOME_PROFILE_SRC}
            alt="Shravan Kumar B"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
            priority
          />
          <h1 className="text-lg tracking-tight text-[var(--color-foreground)] sm:text-xl">
            Shravan Kumar B
          </h1>
        </header>

        <div className="max-w-xl space-y-5 leading-7 text-[var(--color-muted-foreground)]">
          <p>I am a tinkerer, FOSS enthusiast, polymathic indie computer scientist, systems engineer, and data-science aficionado. I build systems that make life simpler for developers, teams, and curious humans.</p>
          <p>I work on problems that are interesting, challenging, and have real-world impact. I enjoy optimization challenges, resilient system design, clever abstractions, and performance-focused engineering.</p>
          <p>In my leisure time, I enjoy exploring ideas; scientific, philosophical, or just strange enough to be interesting. I like cooking, gardening, introspection, and discovering how people learn, build, and collaborate.</p>
        </div>
      </article>

      <nav aria-label="Explore" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link href="/writing/">writing</Link>
        <Link href="/projects/">projects</Link>
        <Link href="/about/">about</Link>
        <a href="mailto:shravan@eclosion.in">email</a>
      </nav>
    </main>
  );
}
