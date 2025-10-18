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
    <div className="border-t">
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
