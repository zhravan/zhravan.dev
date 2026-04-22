interface OhMyScriptProps {
  className?: string;
}

export function OhMyScript({ className = '' }: OhMyScriptProps) {
  return <span className={className}>{"<OhMyScript/>"}</span>;
}
