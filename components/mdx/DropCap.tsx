interface DropCapProps {
  children: string;
}

export function DropCap({ children }: DropCapProps) {
  // Extract first letter and rest of the text
  const text = typeof children === 'string' ? children : String(children);
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);

  return (
    <p
      style={{
        fontSize: '0.6875rem',
        lineHeight: '1.7',
        marginBottom: '1rem',
        color: 'var(--color-muted-foreground)'
      }}
    >
      <span
        className="first-letter"
        style={{
          float: 'left',
          fontSize: '3.5em',
          lineHeight: '0.9',
          marginRight: '0.1em',
          marginTop: '0.05em',
          fontWeight: 700,
          color: 'var(--color-foreground)'
        }}
      >
        {firstLetter}
      </span>
      {restOfText}
    </p>
  );
}
