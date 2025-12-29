'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface TweetProps {
  /**
   * Full tweet URL, e.g. `https://x.com/user/status/123...`
   * or `https://twitter.com/user/status/123...`
   */
  url: string;
  /**
   * Visual theme for the embedded tweet.
   * Note: the platform script decides final rendering.
   */
  theme?: 'light' | 'dark';
  /**
   * Hide the conversation thread.
   */
  conversation?: 'none' | 'all';
  /**
   * Do-not-track hint to the embed (best effort).
   */
  dnt?: boolean;
}

export function Tweet({
  url,
  theme = 'dark',
  conversation = 'none',
  dnt = true,
}: TweetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(180);
  const [isLoading, setIsLoading] = useState(true);

  const uniqueId = useMemo(
    () =>
      `tweet-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`,
    []
  );

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const safeUrl = (() => {
      try {
        const u = new URL(url);
        // Support x.com and twitter.com; keep path intact
        if (u.hostname === 'x.com' || u.hostname.endsWith('.x.com')) return u.toString();
        if (u.hostname === 'twitter.com' || u.hostname.endsWith('.twitter.com')) return u.toString();
        return url;
      } catch {
        return url;
      }
    })();

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <base target="_blank">
          <style>
            html, body { margin: 0; padding: 0; background: transparent; }
            body { overflow: hidden; }
          </style>
        </head>
        <body>
          <blockquote
            class="twitter-tweet"
            data-theme="${theme}"
            data-conversation="${conversation}"
            data-dnt="${dnt ? 'true' : 'false'}"
          >
            <a href="${safeUrl}"></a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <script>
            const tweetId = '${uniqueId}';
            function sendHeight() {
              const h = Math.max(
                document.documentElement.scrollHeight || 0,
                document.body.scrollHeight || 0
              );
              window.parent.postMessage({ type: 'tweet-resize', id: tweetId, height: h }, '*');
            }

            // Resize on layout changes
            const ro = new ResizeObserver(() => sendHeight());
            ro.observe(document.documentElement);

            // Poll a bit while widgets.js hydrates
            let attempts = 0;
            const t = setInterval(() => {
              attempts++;
              sendHeight();
              if (attempts > 80) clearInterval(t);
            }, 100);

            // A couple delayed nudges
            setTimeout(sendHeight, 250);
            setTimeout(sendHeight, 750);
            setTimeout(sendHeight, 1500);
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = html;

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'tweet-resize') return;
      if (event.data?.id !== uniqueId) return;
      const next = Number(event.data?.height);
      if (!Number.isFinite(next)) return;
      setHeight(Math.max(next, 120));
      setIsLoading(false);
    };

    window.addEventListener('message', onMessage);
    const timeout = setTimeout(() => setIsLoading(false), 7000);

    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(timeout);
    };
  }, [url, theme, conversation, dnt, uniqueId]);

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
      {isLoading && (
        <div
          style={{
            padding: '1rem',
            textAlign: 'center',
            color: 'var(--color-muted-foreground)',
            fontSize: '0.75rem',
          }}
        >
          Loading tweet...
        </div>
      )}
      <iframe
        ref={iframeRef}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          display: isLoading ? 'none' : 'block',
          transition: 'height 0.2s ease',
        }}
        title="Embedded tweet"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}





