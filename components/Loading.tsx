'use client';

import { useEffect, useState } from 'react';

const loadingMessages = [
  'Brewing coffee for the server...',
  'Teaching AI to think...',
  'Debugging the matrix...',
  'Compiling thoughts...',
  'Reticulating splines...',
  'Convincing electrons to cooperate...',
  'Summoning the code spirits...',
  'Untangling the web...',
  'Optimizing for curiosity...',
  'Loading brilliance...',
  'Fetching wisdom from the void...',
  'Assembling pixels with care...',
  'Negotiating with the database...',
  'Herding cats... I mean, data...',
  'Calculating meaning of life...',
  'Warming up the quantum processor...',
  'Tuning the algorithm orchestra...',
  'Consulting with rubber ducks...',
  'Spinning up the hamster wheels...',
  'Defragmenting creativity...',
];

export function Loading() {
  const [message, setMessage] = useState(loadingMessages[0]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Rotate messages every 2 seconds
    const messageInterval = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-md px-8 text-center">
        {/* Animated loader */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24">
            {/* Outer spinning ring */}
            <div 
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{ 
                borderTopColor: 'var(--color-primary)',
                animationDuration: '1.5s'
              }}
            />
            
            {/* Middle spinning ring (opposite direction) */}
            <div 
              className="absolute inset-2 rounded-full border-4 border-transparent animate-spin-reverse"
              style={{ 
                borderRightColor: 'var(--color-accent)',
                animationDuration: '2s'
              }}
            />
            
            {/* Inner pulsing dot */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: 'var(--color-muted-foreground)',
                  animationDuration: '1s'
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading message */}
        <div 
          className="text-sm font-mono mb-2"
          style={{ color: 'var(--color-foreground)' }}
        >
          {message}{dots}
        </div>

        {/* Subtle hint */}
        <div 
          className="text-xs opacity-50"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Worth the wait, promise ✨
        </div>

        {/* Progress bar (indeterminate) */}
        <div 
          className="mt-6 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-muted)' }}
        >
          <div 
            className="h-full rounded-full animate-progress"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              width: '30%'
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Minimal inline loading for smaller contexts
export function InlineLoading({ message = 'Loading' }: { message?: string }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div 
          className="w-5 h-5 rounded-full border-2 border-transparent animate-spin"
          style={{ 
            borderTopColor: 'var(--color-primary)',
            borderRightColor: 'var(--color-primary)'
          }}
        />
        <span 
          className="text-sm"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          {message}{dots}
        </span>
      </div>
    </div>
  );
}
