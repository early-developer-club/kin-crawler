export interface Question {
  title: string;
  link: string;
  date: string;
  preview?: string;
}

export interface KeywordQuestions {
  keyword: string;
  questions: Question[];
}

export type Keyword = 'ChatGPT' | 'Gemini' | 'Claude' | 'AI 에이전트';

export const KEYWORDS: Keyword[] = ['ChatGPT', 'Gemini', 'Claude', 'AI 에이전트'];
