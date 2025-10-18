'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="min-h-screen">{children}</div>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p>네이버 지식인 AI 크롤러</p>
              <p className="text-xs">ChatGPT, Gemini, Claude, AI 에이전트 관련 질문</p>
            </div>

            <div className="flex space-x-6 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                GitHub
              </a>
              <a
                href="https://kin.naver.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                네이버 지식인
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
