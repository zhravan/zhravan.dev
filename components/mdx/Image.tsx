interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  width?: number | string;
  height?: number | string;
  href?: string;
}

export function Image({ src, alt, title, caption, width, height, href }: ImageProps) {
  if (!src) return null;

  const figure = (
    <figure
      style={{
        margin: '1.5rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <img
        src={src}
        alt={alt || ''}
        title={title}
        width={width}
        height={height}
        style={{
          maxWidth: '100%',
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

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
        {figure}
      </a>
    );
  }

  return figure;
}

