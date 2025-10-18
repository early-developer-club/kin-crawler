import { Keyword, KEYWORDS } from '@/lib/types';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface TabNavigationProps {
  activeTab: Keyword | 'all';
  onTabChange: (tab: Keyword | 'all') => void;
  questionCounts?: Record<string, number>;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const tabs: Array<{ id: Keyword | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    ...KEYWORDS.map(keyword => ({ id: keyword, label: keyword })),
  ];

  return (
    <ToggleGroup
      type="single"
      value={activeTab}
      onValueChange={(value) => {
        if (value) onTabChange(value as Keyword | 'all');
      }}
      className="justify-start"
    >
      {tabs.map(tab => (
        <ToggleGroupItem key={tab.id} value={tab.id} aria-label={`Select ${tab.label}`}>
          {tab.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
