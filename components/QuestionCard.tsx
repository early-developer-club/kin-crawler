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
    <li
      className="group px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <a
        href={question.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                {keyword}
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              <HighlightedText text={question.title} query={searchQuery} />
            </h3>
            {question.preview && question.preview !== question.date && (
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                <HighlightedText text={question.preview} query={searchQuery} />
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {question.date}
            </span>
            <svg
              className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
}
