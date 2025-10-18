'use client';

import { useState } from 'react';
import { useKinQuestions } from '@/hooks/useKinQuestions';
import { Keyword, KEYWORDS } from '@/lib/types';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';

export default function Home() {
  const {
    data,
    totalQuestionsCount,
    getQuestionsByKeyword,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refresh,
    clearError,
  } = useKinQuestions();

  const [activeTab, setActiveTab] = useState<Keyword | 'all'>('all');

  // 키워드별 질문 개수
  const questionCounts = KEYWORDS.reduce((acc, keyword) => {
    const keywordData = getQuestionsByKeyword(keyword);
    acc[keyword] = keywordData?.questions.length || 0;
    return acc;
  }, {} as Record<string, number>);

  // 필터링된 데이터
  const filteredData = activeTab === 'all'
    ? data
    : data.filter(item => item.keyword === activeTab);

  return (
    <Layout>
      {/* 헤더 */}
      <Header
        onRefresh={refresh}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* 탭 네비게이션 */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        questionCounts={questionCounts}
      />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        {/* 에러 메시지 */}
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

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">데이터를 불러오는 중...</p>
          </div>
        )}

        {/* 데이터가 없을 때 */}
        {!isLoading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">아직 데이터가 없습니다</p>
          </div>
        )}

        {/* 질문 목록 */}
        {!isLoading && filteredData.length > 0 && (
          <div className="space-y-4">
            {filteredData.map(keywordData => (
              <div key={keywordData.keyword} className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* 키워드 헤더 */}
                <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 px-6 py-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {keywordData.keyword}
                    <span className="ml-2 text-sm font-normal text-slate-600 dark:text-slate-400">
                      ({keywordData.questions.length}개)
                    </span>
                  </h2>
                </div>

                {/* 질문 리스트 */}
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {keywordData.questions.map((question, index) => (
                    <li key={index} className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="flex-1 text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {question.title}
                          </h3>
                          <span className="flex-shrink-0 text-xs text-slate-500 dark:text-slate-400">
                            {question.date}
                          </span>
                        </div>
                        {question.preview && (
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {question.preview}
                          </p>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
