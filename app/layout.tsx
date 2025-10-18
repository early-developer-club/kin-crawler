import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "네이버 지식인 AI 크롤러 | ChatGPT, Gemini, Claude 질문 모음",
  description: "네이버 지식인에서 AI 관련 키워드(ChatGPT, Gemini, Claude, AI 에이전트)를 실시간으로 크롤링하여 최신 질문 50개씩 보기 좋게 제공하는 웹 서비스입니다.",
  keywords: ["네이버 지식인", "ChatGPT", "Gemini", "Claude", "AI", "인공지능", "질문", "크롤러", "검색"],
  authors: [{ name: "Early Developer Club" }],
  openGraph: {
    title: "네이버 지식인 AI 크롤러",
    description: "AI 관련 최신 질문을 한눈에 확인하세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "네이버 지식인 AI 크롤러",
    description: "AI 관련 최신 질문을 한눈에 확인하세요",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
