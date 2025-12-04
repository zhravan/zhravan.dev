'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface GistProps {
  id: string;
  file?: string;
}

export function Gist({ id, file }: GistProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate unique ID for this gist instance to handle multiple gists
  const uniqueId = useMemo(() => `gist-${id.replace(/\//g, '-')}-${Math.random().toString(36).substr(2, 9)}`, [id]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Create HTML content for the iframe
    const gistUrl = `https://gist.github.com/${id}.js${file ? `?file=${file}` : ''}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { 
              background: transparent !important;
              overflow: hidden;
            }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .gist { margin: 0 !important; }
            .gist .gist-file { 
              border: none !important; 
              margin-bottom: 0 !important; 
              border-radius: 0 !important;
            }
            .gist .gist-data { 
              border-bottom: none !important; 
              background: #f6f8fa !important;
            }
            .gist .gist-meta { 
              padding: 8px 10px !important; 
              font-size: 12px !important;
              background: #f6f8fa !important;
              border-top: 1px solid #e1e4e8 !important;
            }
            .gist .blob-wrapper { 
              overflow-x: auto !important;
              border-radius: 0 !important;
            }
            .gist .blob-code { 
              padding: 0 10px !important;
            }
            .gist table { 
              margin: 0 !important;
            }
          </style>
        </head>
        <body>
          <script src="${gistUrl}"></script>
          <script>
            const gistId = '${uniqueId}';
            
            // Send height to parent
            function sendHeight() {
              const gist = document.querySelector('.gist');
              if (gist) {
                const rect = gist.getBoundingClientRect();
                const height = Math.ceil(rect.height);
                window.parent.postMessage({ 
                  type: 'gist-resize', 
                  id: gistId, 
                  height: height 
                }, '*');
              }
            }
            
            // Check for gist loading and send height
            let attempts = 0;
            const checkGist = setInterval(() => {
              const gist = document.querySelector('.gist');
              attempts++;
              if (gist) {
                clearInterval(checkGist);
                // Wait for styles to apply
                setTimeout(sendHeight, 50);
                setTimeout(sendHeight, 200);
                setTimeout(sendHeight, 500);
              } else if (attempts > 100) {
                clearInterval(checkGist);
              }
            }, 50);
            
            // Also observe for any size changes
            const observer = new ResizeObserver(() => {
              sendHeight();
            });
            
            // Observe body for changes
            setTimeout(() => {
              const gist = document.querySelector('.gist');
              if (gist) {
                observer.observe(gist);
              }
            }, 500);
          </script>
        </body>
      </html>
    `;

    // Set iframe content
    iframe.srcdoc = html;

    // Listen for height messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'gist-resize' && event.data.id === uniqueId && event.data.height) {
        const newHeight = Math.max(event.data.height, 50);
        setHeight(newHeight);
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // Timeout fallback
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, [id, file, uniqueId]);

  return (
    <div 
      className="gist-wrapper"
      style={{ 
        margin: '1.5rem 0',
        width: '100%',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        background: 'var(--color-card)',
        position: 'relative',
      }}
    >
      {isLoading && (
        <div style={{ 
          padding: '1rem', 
          textAlign: 'center', 
          color: 'var(--color-muted-foreground)',
        }}>
          Loading gist...
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
        title={`GitHub Gist: ${id}`}
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}

