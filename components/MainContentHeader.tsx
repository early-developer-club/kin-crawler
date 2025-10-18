'use client';

import SortOptions, { SortType } from './SortOptions';
import { Button } from '@/components/ui/button';

interface MainContentHeaderProps {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  itemCount: number;
}

export default function MainContentHeader({
  sortBy,
  onSortChange,
  onRefresh,
  isRefreshing,
  itemCount,
}: MainContentHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <h1 className="text-xl font-bold">Questions ({itemCount})</h1>
      <div className="flex items-center justify-end gap-2">
        <SortOptions sortBy={sortBy} onSortChange={onSortChange} />
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
  );
}
