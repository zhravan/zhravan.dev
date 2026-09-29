import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { getProjects } from '@/lib/projects';
import { filterDrafts } from '@/lib/plugins/drafts';
import { getDefaultMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';

export const metadata: Metadata = getDefaultMetadata();

export default function Home() {
  const projects = getProjects();
  const featuredProjects = projects.slice(0, 5);
  const playground = projects.slice(5, 10);
  const writing = filterDrafts(getAllPosts()).slice(0, 4);

  return (
    <main className="space-y-16 text-sm">
      <AnalyticsTracker contentType="page" contentTitle="Home" contentSlug="home" />

      <section className="space-y-6">
        <h1 className="text-xl tracking-tight text-[var(--color-foreground)] sm:text-2xl">
          Hi, I&apos;m Shravan.
        </h1>

        <div className="max-w-2xl space-y-5 text-[0.95rem] leading-7 text-[var(--color-muted-foreground)]">
          <p>
            I am a tinkerer, FOSS enthusiast, polymathic indie computer scientist,
            systems engineer, and data-science aficionado. I build systems that make
            life simpler for developers, teams, and curious humans.
          </p>
          <p>
            I work on problems that are interesting, challenging, and have real-world
            impact. I enjoy optimization challenges, resilient system design, clever
            abstractions, and performance-focused engineering.
          </p>
        </div>

        <nav aria-label="Primary" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/projects/">Projects</Link>
          <Link href="/writing/">Writing</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </section>

      <section aria-labelledby="projects-heading" className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="projects-heading" className="text-base text-[var(--color-foreground)]">
            Projects
          </h2>
          <Link href="/projects/" className="text-xs">View all</Link>
        </div>

        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {featuredProjects.map((project) => (
            <a
              key={project.title}
              href={project.link || '/projects/'}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noopener noreferrer' : undefined}
              className="group block border-b-0 py-4"
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="text-sm text-[var(--color-foreground)] group-hover:opacity-70">
                  {project.title}
                </span>
                {project.period && (
                  <span className="shrink-0 text-xs text-[var(--color-muted-foreground)]">
                    {project.period}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="mt-1 max-w-2xl text-xs leading-5 text-[var(--color-muted-foreground)]">
                  {project.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="playground-heading" className="space-y-5">
        <h2 id="playground-heading" className="text-base text-[var(--color-foreground)]">
          Playground
        </h2>

        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {playground.map((project) => (
            <a
              key={project.title}
              href={project.link || '/projects/'}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noopener noreferrer' : undefined}
              className="group flex items-baseline justify-between gap-4 border-b-0 py-3"
            >
              <span className="text-sm text-[var(--color-foreground)] group-hover:opacity-70">
                {project.title}
              </span>
              <span className="shrink-0 text-xs text-[var(--color-muted-foreground)]">
                {project.tech.slice(0, 2).join(' · ')}
              </span>
            </a>
          ))}
        </div>
      </section>

      {writing.length > 0 && (
        <section aria-labelledby="writing-heading" className="space-y-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="writing-heading" className="text-base text-[var(--color-foreground)]">
              Writing
            </h2>
            <Link href="/writing/" className="text-xs">View all</Link>
          </div>

          <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {writing.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group block border-b-0 py-4"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-sm text-[var(--color-foreground)] group-hover:opacity-70">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-xs text-[var(--color-muted-foreground)]"
                  >
                    {post.date}
                  </time>
                </div>
                {post.description && (
                  <p className="mt-1 max-w-2xl text-xs leading-5 text-[var(--color-muted-foreground)]">
                    {post.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-border)] pt-5 text-xs text-[var(--color-muted-foreground)]">
        <a href="https://github.com/zhravan" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/zhravan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:shravan@eclosion.in">Email</a>
      </section>
    </main>
  );
}
