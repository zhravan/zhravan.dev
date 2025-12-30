'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  iconName: string;
  title: string;
  description: string;
  tag: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}

export function ServiceCard({ iconName, title, description, tag, bgColor, borderColor, iconColor }: ServiceCardProps) {
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;

  return (
    <div
      className="p-5 border rounded-lg relative h-full flex flex-col"
      style={{
        backgroundColor: bgColor,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {/* Tag in top-right corner */}
      <span
        className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-xs font-medium"
        style={{
          backgroundColor: 'var(--color-muted)',
          color: iconColor,
          fontFamily: 'var(--code-font-family)',
          border: '1px solid var(--color-border)',
          fontSize: '0.65rem',
        }}
      >
        {tag}
      </span>

      <div className="flex items-center gap-2.5 mb-4">
        {IconComponent && (
          <div className="flex-shrink-0">
            <IconComponent
              size={20}
              strokeWidth={1.5}
              style={{
                color: iconColor,
                opacity: 0.7,
              }}
            />
          </div>
        )}
        <h3 className="pr-12 whitespace-nowrap flex-1 font-semibold" style={{ color: 'var(--color-foreground)', fontSize: '0.75rem' }}>
          {title}
        </h3>
      </div>
      <p className="leading-relaxed text-left flex-1" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.65rem', lineHeight: '1.5', letterSpacing: '0.01em' }}>
        {description}
      </p>
    </div>
  );
}

