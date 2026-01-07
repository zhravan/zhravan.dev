import { PageHeader } from '@/components/PageHeader';
import { getPageMetadata } from '@/lib/seo';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { 
  Mail, 
  Calendar, 
  Github, 
  Gitlab, 
  Linkedin, 
  Youtube
} from 'lucide-react';
import type { Metadata } from 'next';

// Brand icon components
function TwitterXIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function TwitchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
  );
}
function StackOverflowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.24 19.399v-4.804h1.6V21H4.381v-6.405h1.6v4.804h11.258zM7.582 17.8h8.854v-1.6H7.582v1.6zm.195-3.641l8.854 1.861.351-1.68-8.854-1.861-.351 1.68zm1.193-3.472l8.22 3.823.702-1.517-8.22-3.823-.702 1.517zm2.151-3.304l7.128 5.647 1.053-1.33-7.128-5.647-1.053 1.33zm4.064-3.014l-4.85 7.07 1.347.925 4.85-7.07-1.347-.925z"/>
    </svg>
  );
}

function DevToIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm7.14-7.95h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.58 0-1.64-.01-1.92-.22l-.3-.19v-3.1l.31-.18c.26-.16.35-.17 1.8-.17h1.51v1.28zm3.41 3.45c-.17-.43-.64-.79-1-.79-.18 0-.26.03-.32.12l-.14.19c-.18.43-.01.81.39 1.02.39.2.85.1 1.07-.54z"/>
    </svg>
  );
}

function SpotifyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.419.36-.78.78-.66 4.56.96 7.8 1.56 10.92 1.86.42.18.72.66.54 1.14zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

const pageMetadata = {
  title: 'Contact',
  description: 'Get in touch with me.'
};

export const metadata: Metadata = getPageMetadata({
  title: pageMetadata.title,
  description: pageMetadata.description,
  path: '/contact/'
});

interface ContactItem {
  username: string;
  url: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }> | React.ComponentType<{ size?: number }>;
}

const contactItems: ContactItem[] = [
  {
    username: 'hi@ohmyscript.com',
    url: 'mailto:hi@ohmyscript.com',
    icon: Mail
  },
  {
    username: 'cal.com/zhravan',
    url: 'https://cal.com/zhravan',
    icon: Calendar
  },
  {
    username: 'zhravan',
    url: 'https://github.com/zhravan',
    icon: Github
  },
  {
    username: 'zhravan',
    url: 'https://gitlab.com/zhravan',
    icon: Gitlab
  },
  {
    username: 'shravan_20',
    url: 'https://gitlab.com/shravan_20',
    icon: Gitlab
  },
  {
    username: 'zhravan',
    url: 'https://www.linkedin.com/in/zhravan/',
    icon: Linkedin
  },
  {
    username: '@zhravan',
    url: 'https://x.com/zhravan',
    icon: TwitterXIcon
  },
  {
    username: '@ohmycuriosity',
    url: 'https://www.youtube.com/@ohmycuriosity',
    icon: Youtube
  },
  {
    username: 'zhravan',
    url: 'https://www.twitch.tv/zhravan',
    icon: TwitchIcon
  },
  {
    username: 'zhravan',
    url: 'https://stackoverflow.com/users/11899809/zhravan',
    icon: StackOverflowIcon
  },
  {
    username: 'zhravan',
    url: 'https://dev.to/zhravan',
    icon: DevToIcon
  },
  {
    username: 'zhravan',
    url: 'https://open.spotify.com/user/31fwuia2mxmmftz44wdw35bldw64',
    icon: SpotifyIcon
  }
];

export default function Contact() {
  return (
    <div className="space-y-4 text-xxs">
      <AnalyticsTracker
        contentType="page"
        contentTitle={pageMetadata.title}
        contentSlug="contact"
      />
      <PageHeader metadata={pageMetadata} hideTitle={true} />

      <div className="animate-fade-up" style={{ animationDelay: '50ms' }}>
        <p 
          className="text-xxs mb-4" 
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Currently available for freelance projects and consulting engagements. Response time is typically within 24-48 hours.
        </p>
      </div>

      <div className="animate-fade-up space-y-1" style={{ animationDelay: '100ms' }}>
        {contactItems.map((item) => {
          const Icon = item.icon;
          const isBrandIcon = Icon === StackOverflowIcon || Icon === DevToIcon || Icon === SpotifyIcon || Icon === TwitterXIcon || Icon === TwitchIcon;
          
          return (
            <a
              key={item.url}
              href={item.url}
              target={item.url.startsWith('http') ? '_blank' : undefined}
              rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                color: 'var(--color-link)',
                textDecoration: 'none',
                borderBottom: 'none',
                paddingBottom: 0,
              }}
            >
              {isBrandIcon ? (
                <Icon size={14} />
              ) : (
                <Icon size={14} strokeWidth={2} />
              )}
              <span className="text-xxs">{item.username}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
