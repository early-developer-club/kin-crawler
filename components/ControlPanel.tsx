'use client';

import { Keyword, KEYWORDS } from '@/lib/types';
import TabNavigation from './TabNavigation';
import SearchBar from './SearchBar';
import SortOptions, { SortType } from './SortOptions';

interface ControlPanelProps {
  activeTab: Keyword | 'all';
  onTabChange: (tab: Keyword | 'all') => void;
  questionCounts?: Record<string, number>;
  searchQuery: string;
  onSearch: (query: string) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  searchResultCount: number;
}

import { Button } from '@/components/ui/button';

interface ControlPanelProps {
  activeTab: Keyword | 'all';
  onTabChange: (tab: Keyword | 'all') => void;
  questionCounts?: Record<string, number>;
  searchQuery: string;
  onSearch: (query: string) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  searchResultCount: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date | null;
}

export default function ControlPanel({
  activeTab,
  onTabChange,
  questionCounts,
  searchQuery,
  onSearch,
  sortBy,
  onSortChange,
  searchResultCount,
  onRefresh,
  isRefreshing,
  lastUpdated,
}: ControlPanelProps) {
  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-4 space-y-4 py-4">
        <div className="flex justify-between items-center">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={onTabChange}
            questionCounts={questionCounts}
          />
          <div className="flex items-center gap-2">
            {lastUpdated && (
                <div className="hidden md:block text-sm text-muted-foreground">
                  Last updated: {lastUpdated.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </div>
            )}
            {onRefresh && (
              <Button onClick={onRefresh} disabled={isRefreshing} size="sm" variant="outline">
                <svg
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M3 21v-5h5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                </svg>
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <SearchBar onSearch={onSearch} placeholder="질문 제목 또는 내용으로 검색..." />
          <div className="flex items-center gap-4">
            <SortOptions sortBy={sortBy} onSortChange={onSortChange} />
            {searchQuery && (
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{searchResultCount}개</span>의 검색 결과
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
