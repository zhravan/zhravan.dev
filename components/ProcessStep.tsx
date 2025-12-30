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
        <div
          className="p-4 border rounded-lg h-full flex flex-col"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              {IconComponent && (
                <IconComponent
                  size={16}
                  strokeWidth={2}
                  style={{
                    color: 'var(--color-link)',
                  }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="text-xs font-medium block mb-0.5"
                style={{
                  color: 'var(--color-link)',
                  fontFamily: 'var(--code-font-family)',
                  fontSize: '0.65rem',
                }}
              >
                {number}
              </span>
              <h3 className="text-xs font-semibold truncate" style={{ color: 'var(--color-foreground)', fontSize: '0.7rem' }}>
                {title}
              </h3>
            </div>
          </div>
          <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.65rem', lineHeight: '1.5' }}>
            {description}
          </p>
        </div>
      </div>
      {showArrow && (
        <div className="hidden md:flex items-center justify-center px-1">
          <span style={{ color: 'var(--color-muted-foreground)', opacity: 0.4, fontSize: '1.2rem' }}>→</span>
        </div>
      )}
    </>
  );
}

