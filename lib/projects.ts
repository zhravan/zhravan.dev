import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  roles?: string[];
  period?: string;
  sequence?: number;
}

const projectsPath = path.join(process.cwd(), 'config', 'projects.yaml');

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;

  if (!fs.existsSync(projectsPath)) {
    cache = [];
    return cache;
  }

  const file = fs.readFileSync(projectsPath, 'utf8');
  const data = YAML.parse(file) as any;

  if (!Array.isArray(data)) {
    cache = [];
    return cache;
  }

  cache = data.map((p) => ({
    title: String(p.title || ''),
    description: String(p.description || ''),
    tech: Array.isArray(p.tech) ? p.tech.map(String) : [],
    link: String(p.link || ''),
    roles: Array.isArray(p.roles) ? p.roles.map(String) : undefined,
    period: p.period ? String(p.period) : undefined,
    sequence: typeof p.sequence === 'number' ? p.sequence : undefined
  }));

  // Sort by sequence number (lower numbers first), then by title if sequence is missing
  cache.sort((a, b) => {
    const seqA = a.sequence ?? Infinity;
    const seqB = b.sequence ?? Infinity;
    if (seqA !== seqB) {
      return seqA - seqB;
    }
    return a.title.localeCompare(b.title);
  });

  return cache;
}
