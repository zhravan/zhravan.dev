interface RedditProps {
  /**
   * Post URL, e.g. `https://www.reddit.com/r/.../comments/.../.../`
   */
  url: string;
  /**
   * Height for the iframe (Reddit doesn't auto-resize reliably).
   */
  height?: number;
}

function toRedditEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    // Prefer redditmedia embed host; it supports `embed=true`
    u.hostname = 'www.redditmedia.com';
    // Ensure we request the embeddable view
    u.searchParams.set('ref_source', 'embed');
    u.searchParams.set('ref', 'share');
    u.searchParams.set('embed', 'true');
    return u.toString();
  } catch {
    return url;
  }
}

export function Reddit({ url, height = 520 }: RedditProps) {
  const embedUrl = toRedditEmbedUrl(url);

  return (
    <div
      style={{
        margin: '1.5rem 0',
        width: '100%',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        background: 'var(--color-card)',
      }}
    >
      <iframe
        src={embedUrl}
        style={{ width: '100%', height, border: 'none' }}
        title="Embedded Reddit post"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}






