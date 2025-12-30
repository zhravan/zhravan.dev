'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  infinity?: boolean;
}

export function AnimatedCounter({ end, duration = 2000, suffix = '+', infinity = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (infinity) {
      return;
    }

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, infinity]);

  if (infinity) {
    return <span>∞</span>;
  }

  return <span>{count}{suffix}</span>;
}

