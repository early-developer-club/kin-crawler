import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naver 지식인 크롤러",
  description: "AI 관련 키워드로 네이버 지식인을 검색합니다",
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
