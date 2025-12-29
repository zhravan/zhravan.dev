'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: string;
  iconName: string;
  title: string;
  description: string;
  showArrow?: boolean;
}

export function ProcessStep({ number, iconName, title, description, showArrow = true }: ProcessStepProps) {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;

  return (
    <>
      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-medium"
            style={{
              color: 'var(--color-link)',
              fontFamily: 'var(--code-font-family)',
            }}
          >
            {number}
          </span>
          {IconComponent && (
            <IconComponent
              size={18}
              strokeWidth={1.5}
              style={{
                color: 'var(--color-link)',
              }}
            />
          )}
        </div>
        <h3 className="text-sm mb-1 font-semibold" style={{ color: 'var(--color-foreground)' }}>
          {title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.7rem' }}>
          {description}
        </p>
      </div>
      {showArrow && (
        <div className="hidden md:flex items-center justify-center px-2">
          <span style={{ color: 'var(--color-muted-foreground)', opacity: 0.5 }}>→</span>
        </div>
      )}
    </>
  );
}

