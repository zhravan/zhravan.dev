'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: string;
  iconName: string;
  title: string;
  showArrow?: boolean;
}

export function ProcessStep({ number, iconName, title, showArrow = true }: ProcessStepProps) {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;

  return (
    <>
      <div className="flex-1 w-full md:w-auto">
        <div
          className="p-4 border rounded-lg h-full flex flex-col"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'var(--color-muted)',
                border: '1px solid var(--color-border)',
                borderWidth: '1px',
                opacity: 0.6,
              }}
            >
              {IconComponent && (
                <IconComponent
                  size={14}
                  strokeWidth={1.5}
                  style={{
                    color: 'var(--color-link)',
                    opacity: 0.7,
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

