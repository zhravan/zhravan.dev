"use client";

import { useEffect, useRef, useState } from 'react';
import { Bell, CrossIcon, X } from 'lucide-react';

const EMBED_WIDTH = 404;
const EMBED_HEIGHT = 143;

export function SubscribeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mobileScale, setMobileScale] = useState(1);
  const [isEmbedReady, setIsEmbedReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    updateIsMobile(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateIsMobile);
      return () => mediaQuery.removeEventListener('change', updateIsMobile);
    }

    mediaQuery.addListener(updateIsMobile);
    return () => mediaQuery.removeListener(updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => setIsEmbedReady(true), 50);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isMobile) {
      return;
    }

    const updateScale = () => {
      const safeHorizontalPadding = 24;
      const maxDrawerHeight = window.innerHeight * 0.7;
      const availableWidth = Math.max(0, window.innerWidth - safeHorizontalPadding * 2);
      const availableHeight = Math.max(0, maxDrawerHeight - 56);
      const widthScale = availableWidth / EMBED_WIDTH;
      const heightScale = availableHeight / EMBED_HEIGHT;
      const nextScale = Math.min(1, widthScale, heightScale);

      setMobileScale(Number.isFinite(nextScale) ? Math.max(0.6, nextScale) : 1);
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => window.removeEventListener('resize', updateScale);
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 h-full w-full"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onClick={() => setIsOpen(false)}
            aria-label="Close subscribe drawer"
          />
          <div
            id="subscribe-widget"
            className="fixed bottom-0 left-0 right-0 rounded-t-lg border-t border-l border-r shadow-lg"
            style={{
              backgroundColor: 'var(--color-background)',
              borderColor: 'var(--color-border)',
              overflow: 'hidden'
            }}
          >
            <div className="flex items-center justify-end px-3 py-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-muted-foreground)' }}
                aria-label="Close subscribe drawer"
              >
                <X />
              </button>
            </div>
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: 8
              }}
            >
              <div
                style={{
                  width: (EMBED_WIDTH - 48) * mobileScale,
                  height: (EMBED_HEIGHT - 12) * mobileScale,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: EMBED_WIDTH - 48,
                    height: EMBED_HEIGHT - 12,
                    overflow: 'hidden',
                    transform: `scale(${mobileScale})`,
                    transformOrigin: 'top left'
                  }}
                >
                  {isEmbedReady && (
                    <iframe
                      src="https://subscribe-forms.beehiiv.com/c88407a4-7de6-40b9-8ce4-e4dabc062f21"
                      className="beehiiv-embed"
                      data-test-id="beehiiv-embed"
                      frameBorder={0}
                      scrolling="no"
                      style={{
                        width: EMBED_WIDTH,
                        height: EMBED_HEIGHT,
                        marginLeft: -8,
                        marginTop: 0,
                        borderRadius: 0,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        display: 'block',
                        border: 0
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMobile && isOpen && (
        <div
          id="subscribe-widget"
          className="rounded-md border p-2 shadow-lg"
          style={{
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div className="flex items-center justify-between gap-3 px-2 py-1">
            <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
              Subscribe
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-muted-foreground)' }}
              aria-label="Close subscribe form"
            >
              Close
            </button>
          </div>
          <div
            style={{
              width: EMBED_WIDTH - 20,
              height: EMBED_HEIGHT,
              overflow: 'hidden'
            }}
          >
            {isEmbedReady && (
              <iframe
                src="https://subscribe-forms.beehiiv.com/c88407a4-7de6-40b9-8ce4-e4dabc062f21"
                className="beehiiv-embed"
                data-test-id="beehiiv-embed"
                frameBorder={0}
                scrolling="no"
                style={{
                  width: EMBED_WIDTH,
                  height: EMBED_HEIGHT,
                  marginLeft: -10,
                  borderRadius: 0,
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  display: 'block',
                  border: 0
                }}
              />
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 transition-opacity hover:opacity-80"
        style={{
          backgroundColor: 'var(--color-muted)',
          color: 'var(--color-foreground)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          lineHeight: '1'
        }}
        aria-expanded={isOpen}
        aria-controls="subscribe-widget"
        aria-label={isOpen ? 'Hide subscribe' : 'Subscribe'}
      >
        <Bell size={14} aria-hidden="true" />
      </button>
    </div>
  );
}