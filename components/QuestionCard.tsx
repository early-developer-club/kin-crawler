'use client';

import { Question } from '@/lib/types';
import HighlightedText from './HighlightedText';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
      className="block group transition-all duration-200 animate-fadeIn hover:bg-accent rounded-lg border bg-card text-card-foreground shadow-sm"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-4">
          <Badge variant="secondary">{keyword}</Badge>
          <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
            <span>{question.date}</span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </div>
        </div>
        <CardTitle className="text-base mt-2 group-hover:text-primary transition-colors line-clamp-2">
          <HighlightedText text={question.title} query={searchQuery} />
        </CardTitle>
      </CardHeader>
      {question.preview && question.preview !== question.date && (
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            <HighlightedText text={question.preview} query={searchQuery} />
          </p>
        </CardContent>
      )}
    </a>
  );
}
