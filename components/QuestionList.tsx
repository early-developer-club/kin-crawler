'use client';

import { KeywordQuestions } from '@/lib/types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  data: KeywordQuestions[];
  searchQuery?: string;
}

export default function QuestionList({ data, searchQuery = '' }: QuestionListProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {data.map(keywordData => (
        <div key={keywordData.keyword}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {keywordData.keyword}
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              {keywordData.questions.length} questions
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {keywordData.questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                keyword={keywordData.keyword}
                index={index}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
