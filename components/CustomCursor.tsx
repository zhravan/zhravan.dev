'use client';

import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const updateCursor = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle updates with requestAnimationFrame
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(positionRef.current);
          setIsVisible(true);
          rafRef.current = null;
        });
      }

      // Simple hover check - just check if target is interactive
      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive = !!(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('.project-card')
        );
        setIsHovering(isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor-paw ${isHovering ? 'hover' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={isHovering ? '/images/cursor-paw-hover.svg' : '/images/cursor-paw.svg'}
        alt=""
        className="paw-image"
        width={isHovering ? 20 : 16}
        height={isHovering ? 20 : 16}
      />
    </div>
  );
}

