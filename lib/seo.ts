import fs from "fs";
import path from "path";
import YAML from "yaml";
import type { Metadata, Viewport } from "next";

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

function normalizePath(input: string): string {
  if (!input) return "/";
  return input.startsWith("/") ? input : `/${input}`;
}

function normalizeCanonicalPath(input: string): string {
  // For canonical URLs, ensure trailing slash matches Next.js trailingSlash: true config
  // Homepage should be "/" (single slash), all other paths should end with "/"
  if (!input || input === "/") return "/";
  const normalized = input.startsWith("/") ? input : `/${input}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

type TwitterCard = "summary" | "summary_large_image" | "app" | "player";

type OGType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

interface YamlSEOConfig {
  siteUrl: string;
  title: string;
  titleTemplate?: string;
  description: string;
  keywords?: string[];
  author?: {
    name?: string;
    url?: string;
  };
  themeColor?: string;
  backgroundColor?: string;
  openGraph?: {
    type?: OGType;
    image?: string;
    locale?: string;
  };
  twitter?: {
    card?: TwitterCard;
    site?: string;
    creator?: string;
  };
  social?: {
    github?: string;
    gitlab?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const seoConfigPath = path.join(process.cwd(), "config", "seo.yaml");

let cached: YamlSEOConfig | null = null;

export function loadSeoConfig(): YamlSEOConfig {
  if (cached) return cached;

  if (!fs.existsSync(seoConfigPath)) {
    // Provide sensible defaults if file doesn't exist
    cached = {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
      title: "Your Name",
      description: "Engineer, writer, and creator."
    };
    return cached;
  }

  const file = fs.readFileSync(seoConfigPath, "utf8");
  const data = YAML.parse(file) as Partial<YamlSEOConfig> | null;

  const siteUrl = (
    data?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://example.com"
  ).replace(/\/$/, "");

  cached = {
    siteUrl,
    title: data?.title || "Your Name",
    titleTemplate: data?.titleTemplate,
    description: data?.description || "Engineer, writer, and creator.",
    keywords: data?.keywords,
    author: data?.author,
    themeColor: data?.themeColor,
    backgroundColor: data?.backgroundColor,
    openGraph: {
      type: data?.openGraph?.type || "website",
      image: data?.openGraph?.image,
      locale: data?.openGraph?.locale || "en_US"
    },
    twitter: {
      card: data?.twitter?.card || "summary_large_image",
      site: data?.twitter?.site,
      creator: data?.twitter?.creator
    },
    social: data?.social
  };

  return cached;
}

export function getSocialLinks() {
  const cfg = loadSeoConfig();
  return cfg.social || {};
}

export function getDefaultMetadata(): Metadata {
  const cfg = loadSeoConfig();

  const title: Metadata["title"] = cfg.titleTemplate
    ? { default: cfg.title, template: cfg.titleTemplate }
    : { default: cfg.title, template: `%s | ${cfg.title}` };

  const ogImages = cfg.openGraph?.image
    ? [
        {
          url: cfg.openGraph.image.startsWith("http")
            ? cfg.openGraph.image
            : `${cfg.siteUrl}${cfg.openGraph.image}`
        }
      ]
    : undefined;

  return {
    metadataBase: new URL(cfg.siteUrl),
    title,
    description: cfg.description,
    keywords: cfg.keywords,
    authors: cfg.author?.name
      ? [{ name: cfg.author.name, url: cfg.author.url }]
      : undefined,
    alternates: {
      canonical: "/",
      languages: { "en-US": cfg.siteUrl }
    },
    openGraph: {
      type: (cfg.openGraph?.type || "website") as OGType,
      locale: cfg.openGraph?.locale,
      title: cfg.title,
      description: cfg.description,
      url: cfg.siteUrl,
      siteName: cfg.title,
      images: ogImages
    },
    twitter: {
      card: cfg.twitter?.card || "summary_large_image",
      site: cfg.twitter?.site,
      creator: cfg.twitter?.creator,
      title: cfg.title,
      description: cfg.description,
      images: ogImages as any
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/assets/zhravan.png", sizes: "512x512", type: "image/png" }
      ],
      apple: [
        { url: "/assets/zhravan.png", sizes: "512x512", type: "image/png" }
      ]
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: cfg.themeColor ? "black-translucent" : "default",
      title: cfg.title
    },
    other: cfg.backgroundColor
      ? {
          "msapplication-TileColor": cfg.backgroundColor
        }
      : undefined
  } satisfies Metadata;
}

export function getDefaultViewport(): Viewport {
  const cfg = loadSeoConfig();

  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: cfg.themeColor || "#000000",
    colorScheme: "light dark"
  };
}

export function getPostMetadata({
  title,
  description,
  slug,
  path,
  date,
  tags,
  ogImage,
  modifiedTime
}: {
  title: string;
  description: string;
  /**
   * @deprecated Prefer passing `path` to avoid incorrect URL generation.
   */
  slug?: string;
  /**
   * Canonical path for the post, e.g. `/blogs/my-post` or `/musings/my-post`
   */
  path: string;
  date?: string;
  tags?: string[];
  ogImage?: string;
  modifiedTime?: string;
}): Metadata {
  const cfg = loadSeoConfig();
  const canonicalPath = normalizeCanonicalPath(path || (slug ? `/blogs/${slug}` : "/"));
  const url = `${cfg.siteUrl}${canonicalPath}`;
  const pageTitle: Metadata["title"] = cfg.titleTemplate
    ? { default: cfg.title, template: cfg.titleTemplate.replace("%s", title) }
    : { default: cfg.title, template: `${title} | ${cfg.title}` };

  // Build keywords from tags and default keywords
  const keywords =
    tags && tags.length > 0 ? [...(cfg.keywords || []), ...tags] : cfg.keywords;

  // Handle OG image - prefer post-specific, fallback to default
  const ogImages = ogImage
    ? [
        {
          url: ogImage.startsWith("http") ? ogImage : `${cfg.siteUrl}${ogImage}`
        }
      ]
    : cfg.openGraph?.image
    ? [
        {
          url: cfg.openGraph.image.startsWith("http")
            ? cfg.openGraph.image
            : `${cfg.siteUrl}${cfg.openGraph.image}`
        }
      ]
    : undefined;

  // Parse dates for article metadata
  const publishedTime = date ? new Date(date).toISOString() : undefined;
  const modifiedTimeISO = modifiedTime
    ? new Date(modifiedTime).toISOString()
    : publishedTime;

  return {
    metadataBase: new URL(cfg.siteUrl),
    title: pageTitle,
    description,
    keywords,
    authors: cfg.author?.name
      ? [{ name: cfg.author.name, url: cfg.author.url }]
      : undefined,
    alternates: {
      canonical: canonicalPath,
      languages: { "en-US": url }
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: cfg.title,
      locale: cfg.openGraph?.locale,
      publishedTime,
      modifiedTime: modifiedTimeISO,
      authors: cfg.author?.name ? [cfg.author.name] : undefined,
      tags: tags,
      images: ogImages
    },
    twitter: {
      card: cfg.twitter?.card || "summary_large_image",
      site: cfg.twitter?.site,
      creator: cfg.twitter?.creator,
      title,
      description,
      images: ogImages as any
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  } satisfies Metadata;
}

export function getPersonStructuredData(): StructuredData {
  const cfg = loadSeoConfig();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cfg.author?.name || cfg.title,
    url: cfg.siteUrl,
    sameAs: cfg.author?.url ? [cfg.author.url] : undefined
  };
}

export function getArticleStructuredData({
  title,
  description,
  slug,
  path,
  date,
  modifiedTime,
  tags,
  ogImage
}: {
  title: string;
  description: string;
  /**
   * @deprecated Prefer passing `path` to avoid incorrect URL generation.
   */
  slug?: string;
  /**
   * Canonical path for the post, e.g. `/blogs/my-post` or `/musings/my-post`
   */
  path: string;
  date?: string;
  modifiedTime?: string;
  tags?: string[];
  ogImage?: string;
}): StructuredData {
  const cfg = loadSeoConfig();
  const canonicalPath = normalizeCanonicalPath(path || (slug ? `/blogs/${slug}` : "/"));
  const url = `${cfg.siteUrl}${canonicalPath}`;
  const publishedTime = date ? new Date(date).toISOString() : undefined;
  const modifiedTimeISO = modifiedTime
    ? new Date(modifiedTime).toISOString()
    : publishedTime;

  const article: StructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished: publishedTime,
    dateModified: modifiedTimeISO,
    author: {
      "@type": "Person",
      name: cfg.author?.name || cfg.title,
      url: cfg.author?.url || cfg.siteUrl
    },
    publisher: {
      "@type": "Person",
      name: cfg.author?.name || cfg.title,
      url: cfg.siteUrl
    }
  };

  if (tags && tags.length > 0) {
    article.keywords = tags.join(", ");
  }

  if (ogImage) {
    const imageUrl = ogImage.startsWith("http")
      ? ogImage
      : `${cfg.siteUrl}${ogImage}`;
    article.image = imageUrl;
  } else if (cfg.openGraph?.image) {
    const imageUrl = cfg.openGraph.image.startsWith("http")
      ? cfg.openGraph.image
      : `${cfg.siteUrl}${cfg.openGraph.image}`;
    article.image = imageUrl;
  }

  return article;
}

export function getWebsiteStructuredData(): StructuredData {
  const cfg = loadSeoConfig();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: cfg.title,
    url: cfg.siteUrl,
    description: cfg.description,
    author: {
      "@type": "Person",
      name: cfg.author?.name || cfg.title,
      url: cfg.author?.url || cfg.siteUrl
    }
  };
}

export function getPageMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const cfg = loadSeoConfig();

  const canonicalPath = normalizeCanonicalPath(path);
  const url = `${cfg.siteUrl}${canonicalPath}`;
  const pageTitle: Metadata["title"] = cfg.titleTemplate
    ? { default: cfg.title, template: cfg.titleTemplate.replace("%s", title) }
    : { default: cfg.title, template: `${title} | ${cfg.title}` };

  const ogImages = cfg.openGraph?.image
    ? [
        {
          url: cfg.openGraph.image.startsWith("http")
            ? cfg.openGraph.image
            : `${cfg.siteUrl}${cfg.openGraph.image}`
        }
      ]
    : undefined;

  return {
    metadataBase: new URL(cfg.siteUrl),
    title: pageTitle,
    description,
    keywords: cfg.keywords,
    authors: cfg.author?.name
      ? [{ name: cfg.author.name, url: cfg.author.url }]
      : undefined,
    alternates: {
      canonical: canonicalPath,
      languages: { "en-US": url }
    },
    openGraph: {
      type: (cfg.openGraph?.type || "website") as OGType,
      locale: cfg.openGraph?.locale,
      title,
      description,
      url,
      siteName: cfg.title,
      images: ogImages
    },
    twitter: {
      card: cfg.twitter?.card || "summary_large_image",
      site: cfg.twitter?.site,
      creator: cfg.twitter?.creator,
      title,
      description,
      images: ogImages as any
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  } satisfies Metadata;
}
