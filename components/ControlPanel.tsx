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

export default function ControlPanel({
  activeTab,
  onTabChange,
  questionCounts,
  searchQuery,
  onSearch,
  sortBy,
  onSortChange,
  searchResultCount,
}: ControlPanelProps) {
  return (
    <div className="sticky top-14 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 space-y-4 py-4">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={onTabChange}
          questionCounts={questionCounts}
        />
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
