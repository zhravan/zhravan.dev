import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

type UsesItem = { name: string; config: string; note?: string; };
type UsesSection = { id: string; number: string; title: string; description: string; items: UsesItem[]; };

const pageMetadata = { title: 'Uses', description: 'Everything i use, day in and day out; updated when something changes.' };

const usesSections: UsesSection[] = [
  { id: 'hardware', number: '01', title: 'Hardware', description: 'The main machines, peripherals, and devices in the current setup.', items: [
    { name: 'MacBook Pro', config: 'M2, 32GB', note: 'Primary workhorse.' }, { name: 'Mac mini', config: 'M4, 10C/10G, 512GB', note: 'Secondary workstation for android dev or local ML workloads.' }, { name: 'Samsung 27" Curved Monitor', config: '27-inch, 100Hz, 1800R', note: 'Primary display.' }, { name: 'BenQ GW2790', config: '27-inch FHD IPS, 100Hz', note: 'Secondary display.' }, { name: 'Phone', config: 'One Plus 11R', note: 'Main phone.' }, { name: 'iPad', config: 'A16, 11-inch', note: 'iOS app testing or reading book.' }, { name: 'Smart Watch', config: 'Nothing CMF', note: 'Used for fitness tracking and notifications.' }, { name: 'Remax CozyBuds W17 Pro', config: 'Wireless Earbuds', note: 'Daily headphones.' }, { name: 'soundcore Q20i', config: 'Wireless Headphone', note: 'For music only.' }, { name: 'Apple Earpods', config: 'Wired Earphone', note: 'General purpose.' }, { name: 'Portronics Toad One', config: 'Ambidextrous Optical Mous', note: 'Preferred everyday mouse.' }, { name: 'Raspberry Pi 5', config: '2.4GHz quad-core 64-bit Arm Cortex-A76 8 GB RAM', note: 'Tinkering purposes.' }
  ]},
  { id: 'editor', number: '02', title: 'Editor', description: 'A minimal editing setup without much ceremony.', items: [{ name: 'Cursor & Zed', config: 'Primary', note: 'Main editor.' }, { name: 'nano', config: 'SSH', note: 'Used over SSH instead of Vim.' }]},
  { id: 'software', number: '04', title: 'Software', description: 'Mostly reliable, boring software. That is the point.', items: [
    { name: 'Zen', config: 'Browser', note: 'Primary browser. Aggresively move away from Chrome' }, { name: 'Terminal', config: 'iTerm', note: 'iTerm2 terminal emulator with Zsh Shell' }, { name: 'Bruno', config: 'API Client', note: 'Used for API dev and testing.' }, { name: 'RustDesk', config: 'Remote Desktop', note: 'Used for remote desktop access.' }, { name: 'OBS Studio', config: 'Screen Recording', note: 'Used for screen recording and streaming.' }, { name: 'Notion', config: 'Notes and organization', note: 'for note-taking, management, & general organization.' }, { name: 'Spotify', config: 'Music streaming', note: 'Used for music streaming.' }, { name: 'VLC Media Player', config: 'Media playback', note: 'Used for media playback.' }, { name: 'Db Gate', config: 'Database management', note: 'GUI for DB.' }, { name: 'Docker Desktop', config: 'Containerization', note: 'Used for container management and development.' }, { name: 'Mole', config: 'Mac maintenance tool', note: 'Deep clean and optimize your Mac.' }
  ]},
  { id: 'runtime', number: '05', title: 'Runtime', description: 'Different runtimes for different jobs.', items: [{ name: 'Node', config: 'Primary', note: 'Main runtime, typically LTS.' }, { name: 'Bun', config: 'Sometimes', note: 'Used where it fits.' }, { name: 'Cloudflare Workers', config: 'Edge runtime', note: 'For serverless and edge workloads.' }]},
  { id: 'services', number: '06', title: 'Services', description: 'Hosted services and infrastructure in regular use.', items: [{ name: 'Cloudflare', config: 'DNS and hosting', note: 'Core edge and hosting layer.' }, { name: 'Personal VPS', config: 'Self Hosting', note: 'For self-hosted applications and services.' }, { name: 'GitHub', config: 'Code', note: 'Source hosting and collaboration.' }, { name: 'GitLab', config: 'Code', note: 'Some of my projects are hosted on GitLab.' }]}
];

export const metadata: Metadata = getPageMetadata({ title: pageMetadata.title, description: pageMetadata.description, path: '/uses/' });

export default function UsesPage() {
  return (
    <div className="space-y-10 text-sm">
      <AnalyticsTracker contentType="page" contentTitle={pageMetadata.title} contentSlug="uses" />
      <header className="space-y-2">
        <h1 className="text-lg text-[var(--color-foreground)] sm:text-xl">Uses</h1>
        <p className="max-w-xl text-[var(--color-muted-foreground)]">{pageMetadata.description}</p>
      </header>
      <div className="space-y-10">
        {usesSections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
            <div><h2 className="text-base text-[var(--color-foreground)]">{section.title}</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[var(--color-muted-foreground)]">{section.description}</p></div>
            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {section.items.map((item) => (
                <li key={`${section.id}-${item.name}`} className="py-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="text-sm text-[var(--color-foreground)]">{item.name}</span>
                    <span className="text-xs text-[var(--color-muted-foreground)]">{item.config}</span>
                  </div>
                  {item.note && <p className="mt-1 text-xs leading-5 text-[var(--color-muted-foreground)]">{item.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
