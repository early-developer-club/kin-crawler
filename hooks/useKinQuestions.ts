import { useEffect } from 'react';
import { useKinStore } from '@/store/useKinStore';
import { Keyword } from '@/lib/types';

/**
 * 네이버 지식인 질문 데이터를 관리하는 커스텀 훅
 *
 * @param autoFetch - 컴포넌트 마운트 시 자동으로 데이터 가져올지 여부 (기본값: true)
 * @returns 질문 데이터 및 상태 관리 함수들
 */
export function useKinQuestions(autoFetch: boolean = true) {
  const {
    data,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    fetchAllQuestions,
    fetchKeywordQuestions,
    refresh,
    clearError,
  } = useKinStore();

  // 컴포넌트 마운트 시 자동으로 데이터 가져오기
  useEffect(() => {
    if (autoFetch && data.length === 0 && !isLoading && !error) {
      fetchAllQuestions();
    }
  }, [autoFetch, data.length, isLoading, error, fetchAllQuestions]);

  /**
   * 특정 키워드의 질문 가져오기
   */
  const getQuestionsByKeyword = (keyword: Keyword) => {
    return data.find(item => item.keyword === keyword);
  };

  /**
   * 모든 질문의 개수
   */
  const totalQuestionsCount = data.reduce((sum, item) => sum + item.questions.length, 0);

  return {
    // 데이터
    data,
    totalQuestionsCount,
    getQuestionsByKeyword,

    // 상태
    isLoading,
    isRefreshing,
    error,
    lastUpdated,

    // 액션
    fetchAll: fetchAllQuestions,
    fetchKeyword: fetchKeywordQuestions,
    refresh,
    clearError,
  };
}
