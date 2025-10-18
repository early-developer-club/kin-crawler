'use client';

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date | null;
}

export default function Header({ onRefresh, isRefreshing, lastUpdated }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 및 타이틀 */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                네이버 지식인 AI 크롤러
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI 관련 최신 질문 모음
              </p>
            </div>
          </div>

          {/* 새로고침 버튼 및 마지막 업데이트 시간 */}
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <div className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
                마지막 업데이트: {lastUpdated.toLocaleString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            )}

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {isRefreshing ? '새로고침 중...' : '새로고침'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
