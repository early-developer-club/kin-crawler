'use client';

import { Question } from '@/lib/types';
import HighlightedText from './HighlightedText';

interface QuestionCardProps {
  question: Question;
  keyword: string;
  index: number;
  searchQuery?: string;
}

export default function QuestionCard({ question, keyword, index, searchQuery = '' }: QuestionCardProps) {
  return (
    <a
      href={question.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-6 group animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <span>{keyword}</span>
        <span className="mx-2">·</span>
        <span>{question.date}</span>
      </div>
      <h2 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 mb-2">
        <HighlightedText text={question.title} query={searchQuery} />
      </h2>
      {question.preview && question.preview !== question.date && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          <HighlightedText text={question.preview} query={searchQuery} />
        </p>
      )}
    </a>
  );
}
