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
      className="block p-6 border rounded-lg hover:shadow-lg hover:scale-105 transition-all animate-fadeIn bg-card"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <span className="font-semibold text-primary">{keyword}</span>
        <span className="mx-2">·</span>
        <span>{question.date}</span>
      </div>
      <h2 className="text-xl font-bold line-clamp-3 mb-3">
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
