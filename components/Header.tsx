'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date | null;
}

export default function Header({ onRefresh, isRefreshing, lastUpdated }: HeaderProps) {
  return (
    <header className="w-full">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M15 12h6"/>
              <path d="M15 6h6"/>
              <path d="M15 18h6"/>
              <path d="M4 18h1"/>
              <path d="M4 12h3"/>
              <path d="M4 6h5"/>
              <path d="M3 6V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2"/>
            </svg>
            <span className="hidden font-bold sm:inline-block">Kin Crawler</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {lastUpdated && (
            <div className="hidden md:block text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
          {onRefresh && (
            <Button onClick={onRefresh} disabled={isRefreshing} size="sm">
              <svg
                className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
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
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}