interface PageHeaderProps {
  metadata: {
    title: string;
    description?: string;
  };
  hideTitle?: boolean;
}

export function PageHeader({ metadata, hideTitle = false }: PageHeaderProps) {
  return (
    <section className="animate-fade-in">
      {!hideTitle && <h1 className="page-title text-2xl sm:text-3xl mb-4">{metadata.title}</h1>}
      {metadata.description && (
        <p className={hideTitle ? 'mb-0' : 'mb-6'} style={{ color: 'var(--color-muted-foreground)' }}>
          {metadata.description}
        </p>
      )}
    </section>
  );
}
