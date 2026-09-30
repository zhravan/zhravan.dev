import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import {
  CodeXml,
  Computer,
  Database,
  Headphones,
  Laptop,
  LayoutGrid,
  Monitor,
  Mouse,
  Play,
  Server,
  Sparkles,
  Tablet,
  Watch,
  type LucideIcon,
} from 'lucide-react';
import {
  siBruno,
  siBun,
  siCloudflare,
  siCloudflareworkers,
  siCursor,
  siDocker,
  siGithub,
  siGitlab,
  siGnu,
  siIterm2,
  siNodedotjs,
  siNotion,
  siObsstudio,
  siOneplus,
  siRaspberrypi,
  siRustdesk,
  siSpotify,
  siVlcmediaplayer,
  siZedindustries,
  siZenbrowser,
  type SimpleIcon,
} from 'simple-icons';

type UsesItem = {
  name: string;
  icon: SimpleIcon | LucideIcon;
  tag?: string;
  detail?: string;
};

type UsesSection = {
  title: string;
  icon: LucideIcon;
  pillTags?: boolean;
  items: UsesItem[];
};

const pageMetadata = {
  title: 'Uses',
  description: 'Everything I use, day in and day out; updated when something changes.'
};

const usesSections: UsesSection[] = [
  {
    title: 'Hardware',
    icon: Laptop,
    items: [
      { name: 'MacBook Pro', icon: Laptop, detail: 'Primary workhorse.' },
      { name: 'Mac mini', icon: Computer, detail: 'M4, 10C/10G, 512GB. Secondary workstation for android dev or local ML workloads.' },
      { name: 'Samsung 27" Curved', icon: Monitor, detail: '27-inch, 100Hz, 1800R. Primary display.' },
      { name: 'BenQ GW2790', icon: Monitor, detail: '27-inch FHD IPS, 100Hz. Secondary display.' },
      { name: 'OnePlus 11R', icon: siOneplus, detail: 'Main phone.' },
      { name: 'iPad', icon: Tablet, detail: 'A16, 11-inch. iOS app testing or reading book.' },
      { name: 'CMF Watch', icon: Watch, detail: 'Nothing CMF. Used for fitness tracking and notifications.' },
      { name: 'CozyBuds W17 Pro', icon: Headphones, detail: 'Remax CozyBuds W17 Pro wireless earbuds. Daily headphones.' },
      { name: 'soundcore Q20i', icon: Headphones, detail: 'Wireless headphone. For music only.' },
      { name: 'Apple EarPods', icon: Headphones, detail: 'Wired earphone. General purpose.' },
      { name: 'Portronics Toad One', icon: Mouse, detail: 'Ambidextrous optical mouse. Preferred everyday mouse.' },
      { name: 'Raspberry Pi 5', icon: siRaspberrypi, detail: '2.4GHz quad-core 64-bit Arm Cortex-A76, 8 GB RAM. Tinkering purposes.' },
    ]
  },
  {
    title: 'Software',
    icon: LayoutGrid,
    items: [
      { name: 'Zen', icon: siZenbrowser, tag: 'Browser', detail: 'Primary browser. Aggressively move away from Chrome.' },
      { name: 'iTerm2', icon: siIterm2, tag: 'Terminal', detail: 'iTerm2 terminal emulator with Zsh shell.' },
      { name: 'Bruno', icon: siBruno, tag: 'API client', detail: 'Used for API dev and testing.' },
      { name: 'RustDesk', icon: siRustdesk, tag: 'Remote', detail: 'Used for remote desktop access.' },
      { name: 'OBS Studio', icon: siObsstudio, tag: 'Recording', detail: 'Used for screen recording and streaming.' },
      { name: 'Notion', icon: siNotion, tag: 'Notes', detail: 'For note-taking, management, & general organization.' },
      { name: 'Spotify', icon: siSpotify, tag: 'Music', detail: 'Used for music streaming.' },
      { name: 'VLC', icon: siVlcmediaplayer, tag: 'Media', detail: 'Used for media playback.' },
      { name: 'DbGate', icon: Database, tag: 'DB GUI', detail: 'GUI for DB.' },
      { name: 'Docker', icon: siDocker, tag: 'Containers', detail: 'Docker Desktop. Used for container management and development.' },
      { name: 'Mole', icon: Sparkles, tag: 'Cleanup', detail: 'Mac maintenance tool. Deep clean and optimize your Mac.' },
    ]
  },
  {
    title: 'Editor',
    icon: CodeXml,
    pillTags: true,
    items: [
      { name: 'Cursor', icon: siCursor, tag: 'primary', detail: 'Main editor.' },
      { name: 'Zed', icon: siZedindustries, tag: 'secondary', detail: 'Main editor.' },
      { name: 'nano', icon: siGnu, tag: 'remote', detail: 'Used over SSH instead of Vim.' },
    ]
  },
  {
    title: 'Runtime',
    icon: Play,
    pillTags: true,
    items: [
      { name: 'Node.js', icon: siNodedotjs, tag: 'primary', detail: 'Main runtime, typically LTS.' },
      { name: 'Bun', icon: siBun, tag: 'sometimes', detail: 'Used where it fits.' },
      { name: 'CF Workers', icon: siCloudflareworkers, tag: 'edge', detail: 'Cloudflare Workers. For serverless and edge workloads.' },
    ]
  },
  {
    title: 'Services',
    icon: Server,
    items: [
      { name: 'Cloudflare', icon: siCloudflare, tag: 'DNS', detail: 'DNS and hosting. Core edge and hosting layer.' },
      { name: 'VPS', icon: Server, tag: 'Self-host', detail: 'Personal VPS. For self-hosted applications and services.' },
      { name: 'GitHub', icon: siGithub, tag: 'Code', detail: 'Source hosting and collaboration.' },
      { name: 'GitLab', icon: siGitlab, tag: 'Code', detail: 'Some of my projects are hosted on GitLab.' },
    ]
  }
];

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/uses/'
});

const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'] });

const ICON_SIZE = 18;

function isSimpleIcon(icon: UsesItem['icon']): icon is SimpleIcon {
  return typeof icon === 'object' && icon !== null && 'path' in icon;
}

function brandColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.05 ? 'var(--color-foreground)' : `#${hex}`;
}

function ItemIcon({ icon }: { icon: UsesItem['icon'] }) {
  if (isSimpleIcon(icon)) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width={ICON_SIZE} height={ICON_SIZE} fill={brandColor(icon.hex)} className="shrink-0">
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return (
    <Icon
      aria-hidden="true"
      size={ICON_SIZE + 2}
      strokeWidth={1.75}
      className="-m-px shrink-0"
      style={{ color: 'color-mix(in srgb, var(--color-foreground) 85%, transparent)' }}
    />
  );
}

export default function UsesPage() {
  return (
    <div className="text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle={pageMetadata.title}
        contentSlug="uses"
      />
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <div className={`${mono.className} mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:-mx-32 lg:grid-cols-3`}>
        {COLUMNS.map((column) => (
          <UsesColumn key={column.join()} titles={column} />
        ))}
      </div>
    </div>
  );
}

const COLUMNS = [['Hardware'], ['Software'], ['Editor', 'Runtime', 'Services']];

function UsesColumn({ titles }: { titles: string[] }) {
  const sections = titles
    .map((title) => usesSections.find((s) => s.title === title))
    .filter((s): s is UsesSection => s !== undefined);

  return (
    <div className="min-w-0">
      {sections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <section key={section.title} className="mb-8">
            <h2
              className="mb-3 flex items-center gap-3 border-b pb-3 text-[11px] font-normal uppercase leading-none tracking-[0.14em]"
              style={{ color: 'var(--color-muted-foreground)', borderColor: 'var(--color-border)' }}
            >
              <SectionIcon aria-hidden="true" size={15} strokeWidth={1.75} />
              {section.title}
            </h2>
            <ul className="m-0 grid list-none grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-x-3 p-0">
              {section.items.map((item) => (
                <li key={item.name} title={item.detail} className="col-span-2 grid grid-cols-subgrid items-center py-[6px]">
                  <span className={`flex min-w-0 items-center gap-3 ${item.tag ? '' : 'col-span-2'}`}>
                    <ItemIcon icon={item.icon} />
                    <span className="min-w-0 truncate text-[13px]" style={{ color: 'var(--color-foreground)' }}>
                      {item.name}
                    </span>
                  </span>
                  {item.tag && (
                    <span className="flex min-w-0 items-center">
                      {section.pillTags ? (
                        <span
                          className="inline-block max-w-full truncate rounded-full px-2.5 py-[3px] text-[11px] leading-none"
                          style={{
                            color: 'var(--color-muted-foreground)',
                            backgroundColor: 'color-mix(in srgb, var(--color-foreground) 8%, transparent)',
                          }}
                        >
                          {item.tag}
                        </span>
                      ) : (
                        <span className="block truncate text-[12px] opacity-60" style={{ color: 'var(--color-muted-foreground)' }}>
                          {item.tag}
                        </span>
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
