import type { CSSProperties } from 'react';

interface Client {
  name: string;
  url?: string;
  logo?: string;
  status?: 'active' | 'perennial' | 'past';
}

interface ClienteleListProps {
  clients: Client[];
}

const STATUS_ORDER = { active: 0, perennial: 1, past: 2 } as const;
const STATUS_LABEL = { active: 'Active', perennial: 'Perennial', past: 'Past' } as const;
const SECONDS_PER_CLIENT = 3.5;

function StatusIndicator({ status }: { status: NonNullable<Client['status']> }) {
  return (
    <span className={`status-indicator status-indicator--${status}`}>
      <span className="status-indicator__tip" aria-hidden="true">
        {STATUS_LABEL[status]}
      </span>
      <span className="sr-only">{STATUS_LABEL[status]} client:</span>
    </span>
  );
}

function ClientMark({ client, hidden }: { client: Client; hidden: boolean }) {
  const mark = client.logo ? (
    <img src={client.logo} alt={client.name} className="marquee__logo" loading="lazy" />
  ) : (
    <span>{client.name}</span>
  );

  const className = `marquee__item marquee__item--${client.status ?? 'active'}`;

  if (client.url) {
    return (
      <a
        href={client.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        tabIndex={hidden ? -1 : undefined}
      >
        {mark}
      </a>
    );
  }

  return <span className={className}>{mark}</span>;
}

export function ClienteleList({ clients }: ClienteleListProps) {
  const ordered = [...clients].sort(
    (a, b) => STATUS_ORDER[a.status ?? 'active'] - STATUS_ORDER[b.status ?? 'active'],
  );
  const style = { '--marquee-duration': `${ordered.length * SECONDS_PER_CLIENT}s` } as CSSProperties;

  return (
    <div className="marquee" style={style}>
      <div className="marquee__track">
        {[false, true].map((hidden) => (
          <ul key={String(hidden)} className="marquee__group" aria-hidden={hidden || undefined}>
            {ordered.map((client) => (
              <li key={client.name} className="marquee__entry">
                {client.status && <StatusIndicator status={client.status} />}
                <ClientMark client={client} hidden={hidden} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
