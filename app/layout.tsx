import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { PageTrail } from '@/components/navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CommandPaletteWithButton } from '@/components/CommandPaletteWithButton';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeStyleTag from '@/components/ThemeStyleTag';
import { Analytics } from '@/components/Analytics';
import { PostHogProvider } from '@/components/PostHogProvider';
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
import { getNewsletterListItems } from '@/lib/newsletter-feeds';
import { LinkTracker } from '@/components/LinkTracker';
import { SearchAnalytics } from '@/components/SearchAnalytics';
import { SubscribeWidget } from '@/components/SubscribeWidget';
import { SiteFooterLicense } from '@/components/SiteFooterLicense';
import { SiteSocials } from '@/components/SiteSocials';
import { QuickLaunch } from '@/components/QuickLaunch';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

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

  // Add static pages at the end
  items.push({ name: 'Services', path: '/services' });
  items.push({ name: 'Uses', path: '/uses' });
  items.push({ name: 'About', path: '/about' });
  items.push({ name: 'Contact', path: '/contact' });

  return items;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLabels = Object.fromEntries(getNavItems().map((item) => [item.path, item.name]));
  
  // Get all content items for command palette
  const blogPosts = getAllPosts();
  const allContentTypes = getAllContentTypes();
  
  // MDX-backed types except newsletter (merged separately with RSS below)
  const otherContentItems = allContentTypes
    .filter(ct => ct.id !== 'blog' && ct.contentDir)
    .flatMap(ct => (ct.id === 'newsletter' ? [] : getContentByType(ct.id)));

  const newsletterList = await getNewsletterListItems();

  const allContentItems = [...blogPosts, ...otherContentItems, ...newsletterList];
  const filteredContentItems = filterDrafts(allContentItems);
  
  function getContentItemPath(item: ContentItem): string {
    if (item.externalUrl) {
      return item.externalUrl;
    }
    if (item.contentType) {
      const contentType = getContentTypeById(item.contentType);
      if (contentType) {
        const basePath = contentType.id === 'blog' ? '/blogs' : contentType.path || '';
        return `${basePath}/${item.slug}`;
      }
    }
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
    <html lang="en" className={`${inter.className} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeStyleTag />
        <StructuredData data={[websiteStructuredData, personStructuredData]} />
      </head>
      <body className="antialiased">
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
            <div className="mx-auto max-w-[640px] px-6 pt-16 pb-24 sm:pt-24">
              <PageTrail labels={navLabels} />
              <main>{children}</main>
              <footer className="mt-16 space-y-6">
                <div className="flex flex-col items-center gap-2">
                  <SiteSocials socialLinks={socialLinks} />
                  <p
                    className="m-0 whitespace-nowrap text-center text-[12px] opacity-70"
                    style={{ color: 'var(--color-muted-foreground)' }}
                  >
                    © 2019 OhMyScript <span aria-hidden="true">·</span> <SiteFooterLicense />
                  </p>
                </div>
              </footer>
            </div>
            {commandPaletteConfig && (
              <CommandPaletteWithButton
                contentItems={contentItemsWithPaths}
                fuzzyThreshold={commandPaletteConfig.fuzzyThreshold}
                showPages={commandPaletteConfig.showPages}
                showPosts={commandPaletteConfig.showPosts}
              />
            )}
            <SubscribeWidget />
            <QuickLaunch />
            {scrollToTopConfig && (
              <ScrollToTop
                showAfter={scrollToTopConfig.showAfter}
                position={scrollToTopConfig.position}
                smooth={scrollToTopConfig.smooth}
              />
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
