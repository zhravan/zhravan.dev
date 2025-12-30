'use client';

import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Client {
  name: string;
  url?: string;
  logo?: string;
  status?: 'active' | 'past';
}

interface ClienteleListProps {
  clients: Client[];
}

export function ClienteleList({ clients }: ClienteleListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {clients.map((client, index) => {
        const isHovered = hoveredIndex === index;
        const isActive = client.status === 'active';
        
        const content = (
          <div
            className="clientele-card relative group"
            style={{
              animationDelay: `${index * 30}ms`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`
                relative flex items-center justify-center transition-colors duration-150
                ${client.url ? 'cursor-pointer' : ''}
              `}
              style={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid ${isHovered ? 'var(--color-link)' : 'var(--color-border)'}`,
                borderRadius: '4px',
                padding: '0.75rem',
                minHeight: '60px',
              }}
            >
              {/* Status - shows on hover */}
              {client.status && (
                <div
                  className="absolute top-1 left-1 text-xs transition-opacity duration-150"
                  style={{
                    color: isActive ? 'var(--color-link)' : 'var(--color-muted-foreground)',
                    opacity: isHovered ? 1 : 0,
                    fontSize: '0.6rem',
                    fontFamily: 'var(--code-font-family)',
                  }}
                >
                  {isActive ? 'Active' : 'Past'}
                </div>
              )}

              {/* Content */}
              {client.logo ? (
                <div className="w-full h-8 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <span
                  className="text-xs text-center"
                  style={{
                    color: 'var(--color-foreground)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {client.name}
                </span>
              )}
              
              {client.url && (
                <div
                  className="absolute top-1 right-1 transition-opacity duration-150"
                  style={{
                    opacity: isHovered ? 0.5 : 0,
                  }}
                >
                  <ExternalLink
                    size={10}
                    strokeWidth={1.5}
                    style={{
                      color: 'var(--color-link)',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );

        return client.url ? (
          <a
            key={index}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline block"
            style={{
              borderBottom: 'none',
              paddingBottom: '0',
            }}
          >
            {content}
          </a>
        ) : (
          <div key={index}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
