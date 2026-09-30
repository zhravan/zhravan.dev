import { Github, Linkedin, Rss } from 'lucide-react';

interface SiteSocialsProps {
  socialLinks: {
    github?: string;
    linkedin?: string;
  };
}

const ICON_SIZE = 14;

export function SiteSocials({ socialLinks }: SiteSocialsProps) {
  return (
    <div className="flex flex-nowrap items-center justify-center gap-0.5">
      {socialLinks.github && (
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="dock-link" aria-label="GitHub">
          <Github size={ICON_SIZE} />
        </a>
      )}
      {socialLinks.linkedin && (
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="dock-link" aria-label="LinkedIn">
          <Linkedin size={ICON_SIZE} />
        </a>
      )}
      <a href="/feed.xml" className="dock-link" aria-label="RSS Feed">
        <Rss size={ICON_SIZE} />
      </a>
    </div>
  );
}
