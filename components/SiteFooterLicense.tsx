/** Footer: code vs. content licensing. */
export function SiteFooterLicense() {
  return (
    <p
      className="text-center max-w-md mx-auto"
      style={{ color: 'var(--color-muted-foreground)', fontSize: '0.65rem' }}
    >
      Code is{' '}
      <a
        href="https://opensource.org/licenses/MIT"
        target="_blank"
        rel="noopener noreferrer"
        className="border-b-0 pb-0 transition-opacity hover:opacity-70"
      >
        free
      </a>
      . Ideas are{' '}
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer license"
        className="border-b-0 pb-0 transition-opacity hover:opacity-70"
      >
        shared
      </a>
      . Build on either, cite if you remix.
    </p>
  );
}
