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
      className="block p-4 border-b hover:bg-accent transition-colors animate-fadeIn group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-muted-foreground truncate">{keyword}</span>
        <span className="text-muted-foreground flex-shrink-0">{question.date}</span>
      </div>
      <h2 className="text-md font-medium line-clamp-2 mt-1 group-hover:text-primary group-hover:underline">
        {question.title}
      </h2>
    </a>
  );
}
