'use client';

import { KeywordQuestions } from '@/lib/types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  data: KeywordQuestions[];
}

export default function QuestionList({ data }: QuestionListProps) {
  const allQuestions = data.flatMap(keywordData => 
    keywordData.questions.map(question => ({ ...question, keyword: keywordData.keyword }))
  );

  if (allQuestions.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
      {allQuestions.map((question, index) => (
        <QuestionCard
          key={`${question.keyword}-${index}`}
          question={question}
          keyword={question.keyword}
          index={index}
        />
      ))}
    </div>
  );
}
