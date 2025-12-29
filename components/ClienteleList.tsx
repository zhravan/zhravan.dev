'use client';

interface Client {
  name: string;
  url?: string;
}

interface ClienteleListProps {
  clients: Client[];
}

export function ClienteleList({ clients }: ClienteleListProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {clients.map((client, index) => {
        const content = (
          <span
            className="px-4 py-3 border rounded text-xs transition-opacity hover:opacity-70 text-center block"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-card)',
              color: 'var(--color-muted-foreground)',
            }}
          >
            {client.name}
          </span>
        );

        return client.url ? (
          <a
            key={index}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            {content}
          </a>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );
}

