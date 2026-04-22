import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

type UsesItem = {
  name: string;
  config: string;
  note?: string;
};

type UsesSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: UsesItem[];
};

const pageMetadata = {
  title: 'Uses',
  description: 'Everything i use, day in and day out; updated when something changes.'
};

const usesSections: UsesSection[] = [
  {
    id: 'hardware',
    number: '01',
    title: 'Hardware',
    description: 'The main machines, peripherals, and devices in the current setup.',
    items: [
      { name: 'MacBook Pro', config: 'M2, 32GB', note: 'Primary workhorse.' },
      { name: 'Mac mini', config: 'M4, 10C/10G, 512GB', note: 'Secondary workstation for android dev or local ML workloads.' },
      { name: 'Samsung 27" Curved Monitor', config: '27-inch, 100Hz, 1800R', note: 'Primary display.' },
      { name: 'BenQ GW2790', config: '27-inch FHD IPS, 100Hz', note: 'Secondary display.' },
      { name: 'Phone', config: 'One Plus 11R', note: 'Main phone.' },
      { name: 'iPad', config: 'A16, 11-inch', note: 'iOS app testing or reading book.' },
      { name: 'Smart Watch', config: 'Nothing CMF', note: 'Used for fitness tracking and notifications.' },
      { name: 'Remax CozyBuds W17 Pro', config: 'Wireless Earbuds', note: 'Daily headphones.' },
      { name: 'soundcore Q20i', config: 'Wireless Headphone', note: 'For music only.' },
      { name: 'Apple Earpods', config: 'Wired Earphone', note: 'General purpose.' },
      { name: 'Portronics Toad One', config: 'Ambidextrous Optical Mous', note: 'Preferred everyday mouse.' },
      { name: 'Raspberry Pi 5', config: '2.4GHz quad-core 64-bit Arm Cortex-A76 8 GB RAM', note: 'Tinkering purposes.' }
    ]
  },
  {
    id: 'editor',
    number: '02',
    title: 'Editor',
    description: 'A minimal editing setup without much ceremony.',
    items: [
      { name: 'Cursor & Zed ', config: 'Primary', note: 'Main editor.' },
      { name: 'nano', config: 'SSH', note: 'Used over SSH instead of Vim.' }
    ]
  },
  {
    id: 'software',
    number: '04',
    title: 'Software',
    description: 'Mostly reliable, boring software. That is the point.',
    items: [
      { name: 'Zen', config: 'Browser', note: 'Primary browser. Aggresively move away from Chrome' },
      { name: 'Terminal', config: 'iTerm', note: 'iTerm2 terminal emulator with Zsh Shell' },
      { name: 'Bruno', config: 'API Client', note: 'Used for API dev and testing.' },
      { name: 'RustDesk', config: 'Remote Desktop', note: 'Used for remote desktop access.' },
      { name: 'OBS Studio', config: 'Screen Recording', note: 'Used for screen recording and streaming.' },
      { name: 'Notion', config: 'Notes and organization', note: 'for note-taking, management, & general organization.' },
      { name: 'Spotify', config: 'Music streaming', note: 'Used for music streaming.' },
      { name: 'VLC Media Player', config: 'Media playback', note: 'Used for media playback.' },
      { name: 'Db Gate', config: 'Database management', note: 'GUI for DB.' },
      { name: 'Docker Desktop', config: 'Containerization', note: 'Used for container management and development.' },
      { name: 'Mole', config: 'Mac maintenance tool', note: 'Deep clean and optimize your Mac.' }
    ]
  },
  {
    id: 'runtime',
    number: '05',
    title: 'Runtime',
    description: 'Different runtimes for different jobs.',
    items: [
      { name: 'Node', config: 'Primary', note: 'Main runtime, typically LTS.' },
      { name: 'Bun', config: 'Sometimes', note: 'Used where it fits.' },
      { name: 'Cloudflare Workers', config: 'Edge runtime', note: 'For serverless and edge workloads.' },
    ]
  },
  {
    id: 'services',
    number: '06',
    title: 'Services',
    description: 'Hosted services and infrastructure in regular use.',
    items: [
      { name: 'Cloudflare', config: 'DNS and hosting', note: 'Core edge and hosting layer.' },
      { name: 'Personal VPS', config: 'Self Hosting', note: 'For self-hosted applications and services.' },
      { name: 'GitHub', config: 'Code', note: 'Source hosting and collaboration.' },
      { name: 'GitLab', config: 'Code', note: 'Some of my projects are hosted on GitLab.' },
    ]
  }
];

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/uses/'
});

export default function UsesPage() {
  // Group sections: Hardware and Software side-by-side, then Runtime/Services/Editor in third column
  const hardwareSection = usesSections.find(s => s.id === 'hardware');
  const softwareSection = usesSections.find(s => s.id === 'software');
  const rightColumnSections = usesSections.filter(s => ['runtime', 'services', 'editor'].includes(s.id));

  return (
    <div className="text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle={pageMetadata.title}
        contentSlug="uses"
      />
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Hardware */}
        {hardwareSection && (
          <section
            key={hardwareSection.id}
            id={hardwareSection.id}
            className="animate-fade-up scroll-mt-24 space-y-3"
            style={{ animationDelay: `150ms` }}
          >
            <h2 className="page-title text-lg" style={{ color: 'var(--color-foreground)' }}>
              {hardwareSection.title}
            </h2>
            <SectionList section={hardwareSection} />
          </section>
        )}

        {/* Software */}
        {softwareSection && (
          <section
            key={softwareSection.id}
            id={softwareSection.id}
            className="animate-fade-up scroll-mt-24 space-y-3"
            style={{ animationDelay: `190ms` }}
          >
            <h2 className="page-title text-lg" style={{ color: 'var(--color-foreground)' }}>
              {softwareSection.title}
            </h2>
            <SectionList section={softwareSection} />
          </section>
        )}

        {/* Right column: Runtime, Services, Editor stacked */}
        <div className="space-y-6">
          {rightColumnSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="animate-fade-up scroll-mt-24 space-y-3"
              style={{ animationDelay: `${230 + index * 40}ms` }}
            >
              <h2 className="page-title text-lg" style={{ color: 'var(--color-foreground)' }}>
                {section.title}
              </h2>
              <SectionList section={section} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionList({ section }: { section: UsesSection }) {
  return (
    <ul
      className="m-0 list-none overflow-hidden rounded-lg border p-0"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-card) 74%, var(--color-background))',
        borderColor: 'color-mix(in srgb, var(--color-border) 78%, transparent)',
      }}
    >
      {section.items.map((item, index) => (
        <li
          key={`${section.id}-${item.name}`}
          className="group"
          style={{
            borderTop:
              index === 0
                ? 'none'
                : '1px dashed color-mix(in srgb, var(--color-border) 62%, transparent)',
          }}
        >
          <div className="px-2.5 py-2.5 sm:px-3 sm:py-2.5">
            <div className="flex flex-col gap-1 sm:flex-col">
              <div className="min-w-0 flex-1">
                <div
                  className="font-medium text-xs"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {item.name}
                </div>
              </div>
              {item.note && (
                <div
                  className="text-[10px]"
                  style={{ color: 'var(--color-muted-foreground)' }}
                >
                  {item.note}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
