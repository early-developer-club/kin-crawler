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
      className="block p-6 bg-card border rounded-lg hover:shadow-md transition-shadow animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <span className="font-semibold uppercase text-primary">{keyword}</span>
        <span>{question.date}</span>
      </div>
      <h2 className="text-lg font-semibold line-clamp-2">
        {question.title}
      </h2>
    </a>
  );
}
