'use client';

import { KeywordQuestions } from '@/lib/types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  data: KeywordQuestions[];
}

export default function QuestionList({ data }: QuestionListProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {data.map(keywordData => (
        <div
          key={keywordData.keyword}
          className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* 키워드 헤더 */}
          <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {keywordData.keyword}
              </h2>
              <span className="inline-flex items-center rounded-full bg-white dark:bg-slate-900 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                {keywordData.questions.length}개 질문
              </span>
            </div>
          </div>

          {/* 질문 리스트 */}
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {keywordData.questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                keyword={keywordData.keyword}
                index={index}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
