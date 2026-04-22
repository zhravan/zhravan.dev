interface OhMyScriptProps {
  className?: string;
}

export function OhMyScript({ className = '' }: OhMyScriptProps) {
  return (
    <span
      className={`ohmyscript-wordmark page-title ${className}`.trim()}
      data-text="<OhMyScript/>"
    >
      {"<OhMyScript/>"}
    </span>
  );
}
