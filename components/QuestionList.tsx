'use client';

import { KeywordQuestions } from '@/lib/types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  data: KeywordQuestions[];
  searchQuery?: string;
}

export default function QuestionList({ data, searchQuery = '' }: QuestionListProps) {
  const allQuestions = data.flatMap(keywordData => 
    keywordData.questions.map(question => ({ ...question, keyword: keywordData.keyword }))
  );

  if (allQuestions.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allQuestions.map((question, index) => (
        <QuestionCard
          key={`${question.keyword}-${index}`}
          question={question}
          keyword={question.keyword}
          index={index}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
