export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* 헤더 스켈레톤 */}
          <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-slate-300 dark:bg-slate-600 rounded"></div>
              <div className="h-6 w-16 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
            </div>
          </div>

          {/* 리스트 스켈레톤 */}
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {[1, 2, 3].map(j => (
              <div key={j} className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
