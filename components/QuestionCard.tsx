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
    <Card
      className="group transition-all duration-200 animate-fadeIn hover:border-primary"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <a
        href={question.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{keyword}</Badge>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {question.date}
            </span>
          </div>
          <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors line-clamp-2">
            <HighlightedText text={question.title} query={searchQuery} />
          </CardTitle>
        </CardHeader>
        {question.preview && question.preview !== question.date && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              <HighlightedText text={question.preview} query={searchQuery} />
            </p>
          </CardContent>
        )}
        <CardFooter>
            <svg
              className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
        </CardFooter>
      </a>
    </Card>
  );
}
