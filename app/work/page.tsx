import { getProjects } from '@/lib/projects';
import { PageHeader } from '@/components/PageHeader';
import { ProjectDescription } from '@/components/ProjectDescription';
import { getPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Work',
  description: 'A selection of projects I have built and contributed to.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/work'
});

export default function Work() {
  const projects = getProjects();

  return (
    <div className="space-y-6 text-xxs">
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="project-title">
                {project.title}
              </h3>
              {project.period && (
                <span className="project-period">{project.period}</span>
              )}
            </div>
            {project.description && (
              <ProjectDescription description={project.description} />
            )}
            <div className="project-tech">
              {project.tech && project.tech.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            {project.roles && project.roles.length > 0 && (
              <div className="project-roles">
                {project.roles.join(', ')}
              </div>
            )}
          </a>
        ))}
      </div>

      <section className="pt-4">
        <p style={{ color: 'var(--color-muted-foreground)' }}>
          You can find more of my experiments and tools on{' '}
          <a href="https://github.com/zhravan" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
