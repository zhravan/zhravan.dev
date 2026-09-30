import { getProjects, type Project } from '@/lib/projects';
import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { geistMono } from '@/app/fonts';
import { PagedGrid } from '@/components/PagedGrid';
import { ArrowUpRight, ChevronRight, FolderGit2, icons } from 'lucide-react';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Projects',
  description: 'A selection of projects I have built and contributed to.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/projects/'
});

const CATEGORY_COLORS: Record<string, string> = {
  CLI: '#a1a1aa',
  Web: '#fb923c',
  API: '#facc15',
  Data: '#60a5fa',
  ML: '#f472b6',
  IoT: '#4ade80',
  Infra: '#a78bfa',
  Edge: '#f87171',
  Library: '#c084fc',
  Tool: '#38bdf8',
};

function getMeta(project: Project) {
  const category = project.category?.toLowerCase();
  const tech = project.tech.find((t) => t.toLowerCase() !== category);
  const role = project.roles?.find((r) => r.toLowerCase() !== 'developer');
  return [
    project.category,
    tech,
    role && role.charAt(0).toUpperCase() + role.slice(1),
  ].filter(Boolean).join(' · ');
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = (project.icon && icons[project.icon as keyof typeof icons]) || FolderGit2;
  const color = (project.category && CATEGORY_COLORS[project.category]) || 'var(--color-muted-foreground)';
  const meta = getMeta(project);
  const linkLabel = project.link?.includes('github.com') ? 'GitHub' : 'Visit';

  return (
    <details name="project" className="project-details group h-full border-b" style={{ borderColor: 'var(--color-border)' }}>
      <summary className="flex cursor-pointer list-none items-start gap-3 py-4 outline-none [&::-webkit-details-marker]:hidden">
        <Icon aria-hidden="true" size={20} strokeWidth={2} className="mt-px shrink-0" style={{ color }} />
        <h3
          className="m-0 min-w-0 flex-1 text-[13px] font-medium leading-[21px] opacity-85 transition-opacity group-hover:opacity-100 group-open:opacity-100"
          style={{ color: 'var(--color-foreground)' }}
        >
          {project.title}
        </h3>
        <ChevronRight
          aria-hidden="true"
          size={14}
          className="mt-[3px] shrink-0 opacity-50 transition-transform duration-150 group-hover:opacity-100 group-open:rotate-90"
          style={{ color: 'var(--color-foreground)' }}
        />
      </summary>

      <div className="project-details__body pb-5 pl-8">
        {project.description && (
          <p className="m-0 text-[12px] leading-5" style={{ color: 'var(--color-muted-foreground)' }}>
            {project.description}
          </p>
        )}
        {meta && (
          <p className="m-0 mt-2.5 text-[11px] opacity-70" style={{ color: 'var(--color-muted-foreground)' }}>
            {meta}
          </p>
        )}
        {(project.period || project.link) && (
          <div className="mt-3 flex items-center justify-between gap-3 text-[11px]">
            <span className="opacity-60" style={{ color: 'var(--color-muted-foreground)' }}>
              {project.period}
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1"
                style={{ color: 'var(--color-foreground)' }}
              >
                {linkLabel}
                <ArrowUpRight aria-hidden="true" size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

export default function Projects() {
  const projects = getProjects();

  return (
    <div className="text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle={pageMetadata.title}
        contentSlug="projects"
      />
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <div className={`${geistMono.className} mt-6 lg:-mx-32`}>
        <PagedGrid pageSize={9} label="Projects" className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </PagedGrid>
      </div>

      <p className="mt-8" style={{ color: 'var(--color-muted-foreground)' }}>
        You can find more of my experiments and tools on{' '}
        <a href="https://github.com/zhravan" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
