'use client';

import { Keyword, KEYWORDS } from '@/lib/types';

interface SidebarProps {
  activeTab: Keyword | 'all';
  onTabChange: (tab: Keyword | 'all') => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems: Array<{ id: Keyword | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    ...KEYWORDS.map(keyword => ({ id: keyword, label: keyword })),
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-card p-6 hidden md:flex flex-col">
      <div className="font-bold text-lg mb-8">Kin Crawler</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`px-4 py-2 text-left text-sm font-medium rounded-md transition-colors ${
              activeTab === item.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            }`}>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
