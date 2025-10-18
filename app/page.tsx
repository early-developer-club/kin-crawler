'use client';

import { useState, useMemo } from 'react';
import { useKinQuestions } from '@/hooks/useKinQuestions';
import { Keyword, KEYWORDS, KeywordQuestions } from '@/lib/types';
import Sidebar from '@/components/Sidebar';
import MainContentHeader from '@/components/MainContentHeader';
import QuestionList from '@/components/QuestionList';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const {
    data,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refresh,
    clearError,
  } = useKinQuestions();

  const [activeTab, setActiveTab] = useState<Keyword | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  const processedData = useMemo(() => {
    let filtered = activeTab === 'all'
      ? data
      : data.filter(item => item.keyword === activeTab);

    const sorted: KeywordQuestions[] = filtered.map(keywordData => ({
      ...keywordData,
      questions: [...keywordData.questions].sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-')).getTime();
        const dateB = new Date(b.date.replace(/\./g, '-')).getTime();
        return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
      }),
    }));

    return sorted;
  }, [data, activeTab, sortBy]);

  const totalItemCount = useMemo(() => {
    return processedData.reduce((total, keywordData) => total + keywordData.questions.length, 0);
  }, [processedData]);

  return (
    <>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">
        <MainContentHeader 
          sortBy={sortBy} 
          onSortChange={setSortBy} 
          onRefresh={refresh} 
          isRefreshing={isRefreshing}
          itemCount={totalItemCount}
        />

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-red-800 dark:text-red-200">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}

        {!isLoading && data.length === 0 && (
          <EmptyState
            title="아직 데이터가 없습니다"
            description="새로고침 버튼을 눌러 네이버 지식인 질문을 불러오세요"
          />
        )}

        {!isLoading && processedData.length === 0 && (
          <EmptyState
            title="결과가 없습니다"
            description="다른 키워드를 선택해보세요."
          />
        )}

        {!isLoading && processedData.length > 0 && (
          <QuestionList data={processedData} />
        )}
      </main>
    </>
  );
}
