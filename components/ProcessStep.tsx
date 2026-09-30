'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: string;
  iconName: string;
  title: string;
}

export function ProcessStep({ number, iconName, title }: ProcessStepProps) {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;

  return (
    <div className="min-w-0">
      <div
        className="p-3 border rounded-lg h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <div className="flex items-center gap-2">
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
            <h3 className="text-xs font-semibold leading-tight" style={{ color: 'var(--color-foreground)', fontSize: '0.7rem' }}>
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
