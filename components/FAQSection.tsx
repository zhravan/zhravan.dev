'use client';

import { useState } from 'react';
import { FAQItem } from './FAQItem';

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer: "MVPs: 4-8 weeks. Complex systems: 2-4 months. I'll give you an accurate estimate after our discovery call."
  },
  {
    question: "What if the project overruns scope?",
    answer: "We'll discuss scope changes upfront. Additional work is billed separately, and I'll always get your approval before proceeding."
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Absolutely. I love working with founders who have a clear vision. I offer flexible engagement models for pre-funded startups."
  },
  {
    question: "Can you work with my existing team?",
    answer: "Yes. I integrate seamlessly with existing teams, whether as a lead architect or hands-on contributor."
  },
  {
    question: "What's your communication style?",
    answer: "Async-first with regular syncs. You'll get daily updates on active projects and demos every week."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes. Retainer packages include maintenance, bug fixes, and feature development at discounted pay."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="animate-fade-up" style={{ animationDelay: '250ms' }}>
      <div className="mb-6">
        <h2 className="text-sm mb-2">FAQ</h2>
        <div className="h-px w-12" style={{ backgroundColor: 'var(--color-border)' }}></div>
      </div>

      <div>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}

