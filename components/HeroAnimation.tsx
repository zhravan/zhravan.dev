'use client';

import { useEffect, useState } from 'react';

const lines = [
  'I am an engineer',
  'I am a strategist',
  'I am a pragmatic product builder',
  'I help breaking down and solving complex problems',
  'I help founders & teams to build product 0 to 1.',
  'I help systems to scale from 10 to 10m',
  'I am a freelancer',
];

export function HeroAnimation() {
  const [showCommand, setShowCommand] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show command
    const timer1 = setTimeout(() => setShowCommand(true), 300);

    // Start showing text after command
    const timer2 = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Transition to next line after delay
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setLineIndex(prev => (prev + 1) % lines.length);
        setIsVisible(true);
      }, 300); // Fade out duration
    }, 2500); // Show each line for 2.5 seconds

    return () => clearTimeout(timer);
  }, [lineIndex, isVisible]);

  return (
    <div className="mb-12 pb-8">
      {/* Title */}
      {showCommand && (
        <div className="mb-6">
          <h2 className="text-sm mb-2">Who am I</h2>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
        </div>
      )}

      <div className="max-w-3xl">
        <div style={{ minHeight: '3rem' }}>
          <h1
            className="text-sm leading-tight font-light transition-opacity duration-300"
            style={{
              color: 'var(--color-foreground)',
              opacity: isVisible ? 1 : 0,
            }}
          >
            {lines[lineIndex]}
          </h1>
        </div>
      </div>
    </div>
  );
}
