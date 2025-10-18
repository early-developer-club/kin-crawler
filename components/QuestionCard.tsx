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
      className="block p-4 border-b hover:bg-accent transition-colors animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <span className="font-semibold text-primary">{keyword}</span>
        <span className="mx-2">·</span>
        <span>{question.date}</span>
      </div>
      <h2 className="text-lg font-semibold line-clamp-2 mb-2">
        {question.title}
      </h2>
      {question.preview && question.preview !== question.date && (
        <p className="text-sm text-muted-foreground line-clamp-3">
          {question.preview}
        </p>
      )}
    </a>
  );
}
