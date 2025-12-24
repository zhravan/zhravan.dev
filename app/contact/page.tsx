import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';

const pageMetadata = {
  title: 'Contact',
  description: 'Get in touch with me.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/contact/'
});

export default function Contact() {
  return (
    <div className="space-y-6 text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle={pageMetadata.title}
        contentSlug="contact"
      />
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <section className="prose animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h2 className="text-sm">Contact Me</h2>
        <p style={{ color: 'var(--color-muted-foreground)' }}>
          Email: <a href="mailto:hi@ohmyscript.com" className="transition-opacity hover:opacity-70">hi [at] ohmyscript [dot] com</a>
        </p>

        <h2 className="text-sm mt-8">My other identities:</h2>
        <ul className="space-y-1 list-none p-0 m-0" style={{ color: 'var(--color-muted-foreground)' }}>
          <li>
            Twitter: <a href="https://x.com/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">@zhravan</a>
          </li>
          <li>
            GitHub: <a href="https://github.com/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            GitLab: <a href="https://gitlab.com/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            GitLab Mirror: <a href="https://gitlab.com/shravan_20" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">shravan_20</a>
          </li>
          <li>
            LinkedIn: <a href="https://www.linkedin.com/in/zhravan/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            X: <a href="https://x.com/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">@zhravan</a>
          </li>
          <li>
            Twitch: <a href="https://www.twitch.tv/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            Cal.com: <a href="https://cal.com/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            Stack Overflow: <a href="https://stackoverflow.com/users/11899809/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            YouTube: <a href="https://www.youtube.com/@ohmycuriosity" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">@ohmycuriosity</a>
          </li>
          <li>
            Dev.to: <a href="https://dev.to/zhravan" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
          <li>
            Spotify: <a href="https://open.spotify.com/user/31fwuia2mxmmftz44wdw35bldw64" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">zhravan</a>
          </li>
        </ul>
      </section>
    </div>
  );
}

