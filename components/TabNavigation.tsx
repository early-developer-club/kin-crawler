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

  const totalCount = Object.values(questionCounts || {}).reduce((sum, n) => sum + n, 0);

  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as Keyword | 'all')} className="w-full">
          <TabsList className="overflow-x-auto scrollbar-hide h-auto">
            {tabs.map(tab => {
              const count = tab.id === 'all'
                ? totalCount
                : questionCounts?.[tab.id] || 0;

              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                  <span>{tab.label}</span>
                  {count > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
