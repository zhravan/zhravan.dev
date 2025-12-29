'use client';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b pb-4 mb-4" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between gap-2 group"
      >
        <h3 className="text-xs font-semibold flex-1" style={{ color: 'var(--color-foreground)' }}>
          {question}
        </h3>
        <span
          className="text-xs transition-transform duration-200 flex-shrink-0"
          style={{
            color: 'var(--color-muted-foreground)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ↓
        </span>
      </button>
      {isOpen && (
        <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.7rem' }}>
          {answer}
        </p>
      )}
    </div>
  );
}

