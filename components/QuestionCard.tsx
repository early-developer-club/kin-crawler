'use client';

import { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  keyword: string;
  index: number;
}

export default function QuestionCard({ question, keyword, index }: QuestionCardProps) {
  return (
    <a
      href={question.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border-2 border-border bg-card hover:shadow-[8px_8px_0px_#000] dark:hover:shadow-[8px_8px_0px_#FFF] transition-shadow animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-bold uppercase">{keyword}</span>
        <span className="font-mono">{question.date}</span>
      </div>
      <h2 className="text-lg font-bold mt-2 line-clamp-2">
        {question.title}
      </h2>
    </a>
  );
}
