interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = '데이터가 없습니다',
  description = '새로고침 버튼을 눌러 데이터를 불러오세요',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-6 mb-4">
        <svg
          className="h-12 w-12 text-slate-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
        {description}
      </p>
    </div>
  );
}
