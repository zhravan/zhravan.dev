import { ReactNode } from 'react';

interface ImageRowProps {
  children: ReactNode;
  gap?: string;
}

export function ImageRow({ children, gap = '1rem' }: ImageRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: '1.5rem 0',
      }}
    >
      {children}
    </div>
  );
}

interface ImageColProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
}

export function ImageCol({ src, alt, caption, width = '48%' }: ImageColProps) {
  return (
    <figure
      style={{
        margin: 0,
        flex: `1 1 ${width}`,
        minWidth: '280px',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={src}
        alt={alt || ''}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '0.5rem',
          display: 'block',
        }}
        loading="lazy"
      />
      {caption && (
        <figcaption
          style={{
            marginTop: '0.5rem',
            fontSize: '0.625rem',
            color: 'var(--color-muted-foreground)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}






