import { getProjects } from '@/lib/projects';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';

const pageMetadata = { title: 'Projects', description: 'A selection of projects I have built and contributed to.' };

export const metadata: Metadata = getPageMetadata({ title: pageMetadata.title, description: pageMetadata.description, path: '/projects/' });

export default function Projects() {
  const projects = getProjects();

  return (
    <div className="space-y-10 text-sm">
      <AnalyticsTracker contentType="page" contentTitle={pageMetadata.title} contentSlug="projects" />
      <header className="space-y-2">
        <h1 className="text-lg text-[var(--color-foreground)] sm:text-xl">Projects</h1>
        <p className="max-w-xl text-[var(--color-muted-foreground)]">{pageMetadata.description}</p>
      </header>

      <div className="divide-y divide-[var(--color-border)]">
        {projects.map((project) => (
          <a key={project.title} href={project.link} target="_blank" rel="noopener noreferrer" className="group block border-b-0 py-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-sm text-[var(--color-foreground)] group-hover:opacity-70 sm:text-base">{project.title}</h2>
              {project.period && <span className="shrink-0 text-xs text-[var(--color-muted-foreground)]">{project.period}</span>}
            </div>
            {project.description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)]">{project.description}</p>}
            {project.tech && project.tech.length > 0 && <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">{project.tech.join(' · ')}</p>}
          </a>
        ))}
      </div>

      <p className="text-sm text-[var(--color-muted-foreground)]">
        More experiments and tools on <a href="https://github.com/zhravan" target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
    </div>
  );
}
