import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { NavPill, MobileNav } from '@/components/navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CommandPaletteWithButton } from '@/components/CommandPaletteWithButton';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeStyleTag from '@/components/ThemeStyleTag';
import { Analytics } from '@/components/Analytics';
import { PostHogProvider } from '@/components/PostHogProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { getAllPosts } from '@/lib/blog';
import { getContentByType, ContentItem } from '@/lib/content';
import { getAllContentTypes, getContentTypeById } from '@/lib/content-types';
import { getDefaultMetadata, getDefaultViewport, getWebsiteStructuredData, getPersonStructuredData, getSocialLinks } from '@/lib/seo';
import { StructuredData } from '@/components/StructuredData';
import { getCommandPaletteConfig } from '@/lib/plugins/command-palette';
import { getScrollProgressConfig } from '@/lib/plugins/scroll-progress';
import { getScrollToTopConfig } from '@/lib/plugins/scroll-to-top';
import { getPostHogConfig } from '@/lib/plugins/analytics';
import { getNavigationContentTypes } from '@/lib/content-types';
import { filterDrafts } from '@/lib/plugins/drafts';
import { LinkTracker } from '@/components/LinkTracker';
import { SearchAnalytics } from '@/components/SearchAnalytics';
import { OhMyScript } from '@/components/OhMyScript';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = getDefaultMetadata();
export const viewport: Viewport = getDefaultViewport();

// Build navigation items dynamically from content types
function getNavItems() {
  const contentTypes = getNavigationContentTypes();
  const items: Array<{ name: string; path: string; icon?: string | null }> = [
    { name: 'Home', path: '/' }
  ];

  contentTypes.forEach(ct => {
    items.push({
      name: ct.label,
      path: ct.path,
      icon: ct.icon
    });
  });

  // Add Services, About and Contact at the end (static pages)
  items.push({ name: 'Services', path: '/services' });
  items.push({ name: 'About', path: '/about' });
  items.push({ name: 'Contact', path: '/contact' });

  return items;
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = getNavItems();
  
  // Get all content items for command palette
  const blogPosts = getAllPosts();
  const allContentTypes = getAllContentTypes();
  
  // Get other content types (talks, musings, second-brain)
  const otherContentItems = allContentTypes
    .filter(ct => ct.id !== 'blog' && ct.contentDir) // Only content types with MDX files
    .flatMap(ct => getContentByType(ct.id));
  
  // Combine all content items
  const allContentItems = [...blogPosts, ...otherContentItems];
  const filteredContentItems = filterDrafts(allContentItems);
  
  // Compute paths for each content item (server-side)
  function getContentItemPath(item: ContentItem): string {
    if (item.contentType) {
      const contentType = getContentTypeById(item.contentType);
      if (contentType) {
        // The "blog" content type lists at /writing, but detail routes live at /blogs/[slug]
        const basePath = contentType.id === 'blog' ? '/blogs' : contentType.path || '';
        return `${basePath}/${item.slug}`;
      }
    }
    // Fallback
    return `/blogs/${item.slug}`;
  }
  
  // Map content items to include computed paths
  const contentItemsWithPaths = filteredContentItems.map(item => ({
    slug: item.slug,
    title: item.title,
    date: item.date,
    description: item.description,
    path: getContentItemPath(item)
  }));

  // Load plugin configurations
  const commandPaletteConfig = getCommandPaletteConfig();
  const scrollProgressConfig = getScrollProgressConfig();
  const scrollToTopConfig = getScrollToTopConfig();
  const postHogConfig = getPostHogConfig();

  const websiteStructuredData = getWebsiteStructuredData();
  const personStructuredData = getPersonStructuredData();
  const socialLinks = getSocialLinks();

  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <ThemeStyleTag />
        <StructuredData data={[websiteStructuredData, personStructuredData]} />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <Analytics />
        <PostHogProvider config={postHogConfig} />
        <LinkTracker />
        <SearchAnalytics />
        <ThemeProvider>
          <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
            {scrollProgressConfig && (
              <ScrollProgress
                position={scrollProgressConfig.position}
                height={scrollProgressConfig.height}
              />
            )}
            <header>
              <nav aria-label="Main navigation">
                <div className="max-w-2xl mx-auto px-4 sm:px-8 py-4 sm:py-5 md:pb-2 md:border-b" style={{ borderColor: 'hsla(220, 12%, 15%, 0.4)' }}>
                  {/* Desktop Navigation */}
                  <div className="hidden md:block">
                    <div className="mb-5">
                      <Link
                        href="/"
                        className="text-base font-medium transition-opacity hover:opacity-90 focus:opacity-90 inline-block"
                        style={{
                          color: 'var(--color-foreground)',
                          textDecoration: 'none',
                          borderBottom: 'none',
                          paddingBottom: 0
                        }}
                      >
                        <OhMyScript />
                      </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                      {navItems.map((item) => (
                        <NavPill key={item.path} href={item.path}>
                          {item.name}
                        </NavPill>
                      ))}
                    </div>
                  </div>
                  {/* Mobile Navigation */}
                  <div className="md:hidden">
                    <div className="mb-5">
                      <Link
                        href="/"
                        className="text-sm font-medium transition-opacity hover:opacity-90 focus:opacity-90 inline-block"
                        style={{
                          color: 'var(--color-foreground)',
                          textDecoration: 'none',
                          borderBottom: 'none',
                          paddingBottom: 0
                        }}
                      >
                        <OhMyScript />
                      </Link>
                    </div>
                    <div className="flex items-center justify-start">
                      <MobileNav items={navItems} />
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <main className="max-w-2xl mx-auto px-4 sm:px-8 pt-12 pb-8 sm:pt-16 sm:pb-16">{children}</main>
            <footer className="mt-12 md:mt-24 pb-8">
              <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.65rem' }}>
                    © 2019 • OhMyScript
                  </p>
                  <div className="flex items-center gap-4">
                    {socialLinks.github && (
                      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="border-0 p-0 transition-opacity hover:opacity-70" aria-label="GitHub">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-muted-foreground)' }}>
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    )}
                    {socialLinks.gitlab && (
                      <a href={socialLinks.gitlab} target="_blank" rel="noopener noreferrer" className="border-0 p-0 transition-opacity hover:opacity-70" aria-label="GitLab">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-muted-foreground)' }}>
                          <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"></path>
                        </svg>
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="border-0 p-0 transition-opacity hover:opacity-70" aria-label="X (Twitter)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-muted-foreground)' }}>
                          <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                        </svg>
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="border-0 p-0 transition-opacity hover:opacity-70" aria-label="LinkedIn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-muted-foreground)' }}>
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    )}
                    <a href="/feed.xml" className="border-0 p-0 transition-opacity hover:opacity-70" aria-label="RSS Feed">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-muted-foreground)' }}>
                        <path d="M4 11a9 9 0 0 1 9 9"></path>
                        <path d="M4 4a16 16 0 0 1 16 16"></path>
                        <circle cx="5" cy="19" r="1"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
            {scrollToTopConfig && (
              <ScrollToTop
                showAfter={scrollToTopConfig.showAfter}
                position={scrollToTopConfig.position}
                smooth={scrollToTopConfig.smooth}
              />
            )}
            {commandPaletteConfig && (
              <CommandPaletteWithButton
                contentItems={contentItemsWithPaths}
                fuzzyThreshold={commandPaletteConfig.fuzzyThreshold}
                showPages={commandPaletteConfig.showPages}
                showPosts={commandPaletteConfig.showPosts}
              />
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
