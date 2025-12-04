'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleDocumentMouseEnter = () => setIsVisible(true);
    const handleDocumentMouseLeave = () => setIsVisible(false);

    // Check for interactive elements
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Check if target or any parent is interactive
      let element: HTMLElement | null = target;
      let isInteractive = false;
      
      // Walk up the DOM tree to find interactive elements
      while (element && !isInteractive) {
        const tagName = element.tagName?.toLowerCase();
        const computedStyle = window.getComputedStyle(element);
        
        // Check various conditions for interactivity
        isInteractive = 
          tagName === 'a' ||
          tagName === 'button' ||
          element.closest('a') !== null ||
          element.closest('button') !== null ||
          element.closest('.project-card') !== null ||
          element.closest('nav')?.querySelector('a') !== null ||
          computedStyle.cursor === 'pointer' ||
          element.onclick !== null ||
          element.getAttribute('role') === 'button' ||
          element.getAttribute('role') === 'link' ||
          element.hasAttribute('href') ||
          (element.parentElement?.tagName?.toLowerCase() === 'a');
        
        // Special check for navigation area - if we're inside nav, check for links
        if (!isInteractive && element.closest('nav')) {
          const navElement = element.closest('nav');
          if (navElement) {
            const linkElements = navElement.querySelectorAll('a');
            linkElements.forEach(link => {
              if (link.contains(element)) {
                isInteractive = true;
              }
            });
          }
        }
        
        element = element.parentElement;
      }
      
      setIsHovering(isInteractive);
    };
    
    // Also listen for mouseover/mouseout on interactive elements
    const handleInteractiveMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (
        target.tagName === 'A' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.project-card') !== null ||
        target.closest('nav a') !== null
      )) {
        setIsHovering(true);
      }
    };
    
    const handleInteractiveMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (
        target.tagName === 'A' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.project-card') !== null ||
        target.closest('nav a') !== null
      )) {
        setIsHovering(false);
      }
    };

    // Handler for navigation links specifically
    const handleNavLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('nav a')) {
        setIsHovering(true);
      }
    };
    
    const handleNavLinkLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest('nav a')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseenter', handleDocumentMouseEnter);
    document.addEventListener('mouseleave', handleDocumentMouseLeave);
    document.addEventListener('mouseover', handleInteractiveMouseOver);
    document.addEventListener('mouseout', handleInteractiveMouseOut);
    document.addEventListener('mouseover', handleNavLinkHover, true);
    document.addEventListener('mouseout', handleNavLinkLeave, true);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseenter', handleDocumentMouseEnter);
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      document.removeEventListener('mouseover', handleInteractiveMouseOver);
      document.removeEventListener('mouseout', handleInteractiveMouseOut);
      document.removeEventListener('mouseover', handleNavLinkHover, true);
      document.removeEventListener('mouseout', handleNavLinkLeave, true);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className={`custom-cursor-dot ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

