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
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Separate clients into active and past
  const activeClients = clients.filter(client => client.status === 'active');
  const pastClients = clients.filter(client => client.status === 'past');

  const renderClient = (client: Client, index: number, isActive: boolean, baseIndex: number) => {
    const uniqueKey = `${client.name}-${index}`;
    const isHovered = hoveredIndex === uniqueKey;
    
    const content = (
      <div
        className="clientele-card relative group"
        style={{
          animationDelay: `${baseIndex * 30}ms`,
          opacity: isActive ? 1 : 0.5,
        }}
        onMouseEnter={() => setHoveredIndex(uniqueKey)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className={`
            relative flex items-center justify-center transition-colors duration-150
            ${client.url ? 'cursor-pointer' : ''}
          `}
          style={{
            backgroundColor: 'var(--color-card)',
            border: `1px solid ${isHovered ? 'var(--color-link)' : 'rgba(0, 0, 0, 0.2)'}`,
            borderRadius: '4px',
            padding: '0.75rem',
            minHeight: '60px',
          }}
        >
          {/* Status - always visible */}
          {client.status && (
            <div
              className="absolute top-1 left-1 text-xs"
              style={{
                color: isActive ? 'var(--color-link)' : 'var(--color-muted-foreground)',
                fontSize: '0.6rem',
                fontFamily: 'var(--code-font-family)',
                opacity: 0.7,
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
        key={uniqueKey}
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
      <div key={uniqueKey}>
        {content}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Active Clients */}
      {activeClients.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {activeClients.map((client, index) => renderClient(client, index, true, index))}
          </div>
        </div>
      )}

      {/* Past Clients */}
      {pastClients.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {pastClients.map((client, index) => renderClient(client, index, false, activeClients.length + index))}
          </div>
        </div>
      )}
    </div>
  );
}
