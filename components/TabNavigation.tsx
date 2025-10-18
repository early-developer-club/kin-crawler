'use client';

import { Keyword, KEYWORDS } from '@/lib/types';

interface TabNavigationProps {
  activeTab: Keyword | 'all';
  onTabChange: (tab: Keyword | 'all') => void;
  questionCounts?: Record<string, number>;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
  questionCounts,
}: TabNavigationProps) {
  const tabs: Array<{ id: Keyword | 'all'; label: string }> = [
    { id: 'all', label: '전체' },
    ...KEYWORDS.map(keyword => ({ id: keyword, label: keyword })),
  ];

  return (
    <div className="w-full border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const count = tab.id === 'all'
              ? Object.values(questionCounts || {}).reduce((sum, n) => sum + n, 0)
              : questionCounts?.[tab.id] || 0;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-100'
                  }
                `}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    className={`
                      rounded-full px-2 py-0.5 text-xs
                      ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }
                    `}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
