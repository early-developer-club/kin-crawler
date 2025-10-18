import { create } from 'zustand';
import { KeywordQuestions, KEYWORDS } from '@/lib/types';
import axios from 'axios';

interface KinState {
  // 데이터
  data: KeywordQuestions[];

  // 로딩 상태
  isLoading: boolean;
  isRefreshing: boolean;

  // 에러 상태
  error: string | null;

  // 마지막 업데이트 시간
  lastUpdated: Date | null;

  // 액션
  fetchAllQuestions: () => Promise<void>;
  fetchKeywordQuestions: (keyword: string) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export const useKinStore = create<KinState>((set, get) => ({
  // 초기 상태
  data: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  lastUpdated: null,

  // 모든 키워드 질문 가져오기
  fetchAllQuestions: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<KeywordQuestions[]>('/api/crawl', {
        timeout: 60000, // 60초 타임아웃
      });

      set({
        data: response.data,
        isLoading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch questions';
      set({
        error: errorMessage,
        isLoading: false,
      });
      console.error('Error fetching all questions:', error);
    }
  },

  // 특정 키워드 질문 가져오기
  fetchKeywordQuestions: async (keyword: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<KeywordQuestions>('/api/crawl', {
        params: { keyword },
        timeout: 30000,
      });

      // 기존 데이터에서 해당 키워드만 업데이트
      const currentData = get().data;
      const updatedData = currentData.filter(item => item.keyword !== keyword);
      updatedData.push(response.data);

      set({
        data: updatedData,
        isLoading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Failed to fetch ${keyword} questions`;
      set({
        error: errorMessage,
        isLoading: false,
      });
      console.error(`Error fetching ${keyword} questions:`, error);
    }
  },

  // 데이터 새로고침
  refresh: async () => {
    set({ isRefreshing: true, error: null });

    try {
      const response = await axios.get<KeywordQuestions[]>('/api/crawl', {
        timeout: 60000,
      });

      set({
        data: response.data,
        isRefreshing: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh questions';
      set({
        error: errorMessage,
        isRefreshing: false,
      });
      console.error('Error refreshing questions:', error);
    }
  },

  // 에러 초기화
  clearError: () => set({ error: null }),
}));
