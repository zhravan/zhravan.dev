'use client';

import { ExternalLink } from 'lucide-react';

interface Client {
  name: string;
  url?: string;
}

interface ClienteleListProps {
  clients: Client[];
}

export function ClienteleList({ clients }: ClienteleListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {clients.map((client, index) => {
        const content = (
          <div
            className={`px-5 py-2.5 rounded-lg transition-all duration-300 relative group inline-flex items-center justify-between ${
              client.url 
                ? 'cursor-pointer hover:opacity-80' 
                : ''
            }`}
            style={{
              backgroundColor: 'var(--color-card)',
            }}
          >
            <span 
              className="text-xs font-medium text-left"
              style={{ 
                color: 'var(--color-foreground)',
                fontSize: '0.7rem',
                letterSpacing: '0.01em'
              }}
            >
              {client.name}
            </span>
            {client.url && (
              <ExternalLink
                size={14}
                strokeWidth={2}
                className="opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex-shrink-0 ml-2"
                style={{ color: 'var(--color-link)' }}
              />
            )}
          </div>
        );

        return client.url ? (
          <a
            key={index}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
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

