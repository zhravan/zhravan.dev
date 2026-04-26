interface OhMyScriptProps {
  className?: string;
}

export function OhMyScript({ className = '' }: OhMyScriptProps) {
  return (
    <span className={`page-title ${className}`.trim()}>
      {"<OhMyScript/>"}
    </span>
  );
}
