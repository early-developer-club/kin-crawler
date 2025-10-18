'use client';

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type SortType = 'latest' | 'oldest';

interface SortOptionsProps {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
}

export default function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  return (
    <ToggleGroup
      type="single"
      value={sortBy}
      onValueChange={(value) => {
        if (value) onSortChange(value as SortType);
      }}
      aria-label="Sort questions"
    >
      <ToggleGroupItem value="latest" aria-label="Sort by latest">
        최신순
      </ToggleGroupItem>
      <ToggleGroupItem value="oldest" aria-label="Sort by oldest">
        오래된순
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
