'use client';

import { Keyword, KEYWORDS } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    { id: 'all', label: 'All' },
    ...KEYWORDS.map(keyword => ({ id: keyword, label: keyword })),
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
