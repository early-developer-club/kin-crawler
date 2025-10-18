'use client';

import { useKinQuestions } from '@/hooks/useKinQuestions';
import { KEYWORDS } from '@/lib/types';

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

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          네이버 지식인 AI 크롤러
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          ChatGPT, Gemini, Claude, AI 에이전트 관련 최신 질문을 확인하세요
        </p>

        {/* 상태 표시 */}
        <div className="mb-8 text-center">
          {isLoading && (
            <p className="text-blue-600">데이터를 불러오는 중...</p>
          )}

          {isRefreshing && (
            <p className="text-blue-600">데이터를 새로고침하는 중...</p>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">에러: </strong>
              <span className="block sm:inline">{error}</span>
              <button
                onClick={clearError}
                className="ml-4 underline"
              >
                닫기
              </button>
            </div>
          )}

          {lastUpdated && !isLoading && !error && (
            <div className="text-sm text-gray-500">
              마지막 업데이트: {lastUpdated.toLocaleString('ko-KR')}
            </div>
          )}
        </div>

        {/* 새로고침 버튼 */}
        <div className="mb-8 text-center">
          <button
            onClick={refresh}
            disabled={isLoading || isRefreshing}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isRefreshing ? '새로고침 중...' : '데이터 새로고침'}
          </button>
        </div>

        {/* 통계 */}
        {data.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {KEYWORDS.map(keyword => {
              const keywordData = getQuestionsByKeyword(keyword);
              return (
                <div key={keyword} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="font-bold text-lg mb-2">{keyword}</h3>
                  <p className="text-2xl text-blue-600">
                    {keywordData?.questions.length || 0}개
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* 전체 통계 */}
        {totalQuestionsCount > 0 && (
          <div className="text-center mb-8">
            <p className="text-xl">
              총 <span className="font-bold text-blue-600">{totalQuestionsCount}</span>개의 질문
            </p>
          </div>
        )}

        {/* 질문 목록 미리보기 */}
        {data.length > 0 && (
          <div className="space-y-6">
            {KEYWORDS.map(keyword => {
              const keywordData = getQuestionsByKeyword(keyword);
              if (!keywordData) return null;

              return (
                <div key={keyword} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-4">{keyword}</h2>
                  <ul className="space-y-2">
                    {keywordData.questions.slice(0, 5).map((question, index) => (
                      <li key={index} className="border-b pb-2">
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {question.title}
                        </a>
                        <span className="text-sm text-gray-500 ml-2">
                          {question.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {keywordData.questions.length > 5 && (
                    <p className="text-sm text-gray-500 mt-2">
                      외 {keywordData.questions.length - 5}개 질문
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
