'use client';

import { getHighlightedParts } from '@/utils/highlight';

interface HighlightedTextProps {
  text: string;
  query: string;
  className?: string;
}

export default function HighlightedText({ text, query, className = '' }: HighlightedTextProps) {
  const parts = getHighlightedParts(text, query);

  return (
    <span className={className}>
      {parts.map((part, index) => (
        part.highlight ? (
          <mark
            key={index}
            className="bg-yellow-200 dark:bg-yellow-900/50 text-slate-900 dark:text-white font-medium px-0.5 rounded"
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      ))}
    </span>
  );
}
