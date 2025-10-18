'use client';

export type SortType = 'latest' | 'oldest';

interface SortOptionsProps {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
}

export default function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">정렬:</span>
      <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1">
        <button
          onClick={() => onSortChange('latest')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            sortBy === 'latest'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => onSortChange('oldest')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            sortBy === 'oldest'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          오래된순
        </button>
      </div>
    </div>
  );
}
