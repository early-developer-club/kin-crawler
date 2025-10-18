import { NextRequest, NextResponse } from 'next/server';
import { crawlAllKeywords, crawlKinQuestions } from '@/utils/crawler';
import { KEYWORDS, Keyword } from '@/lib/types';

/**
 * 네이버 지식인 크롤링 API
 * GET /api/crawl - 모든 키워드 크롤링
 * GET /api/crawl?keyword=ChatGPT - 특정 키워드 크롤링
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');

    if (keyword) {
      // 특정 키워드만 크롤링
      if (!KEYWORDS.includes(keyword as Keyword)) {
        return NextResponse.json(
          { error: `Invalid keyword. Allowed: ${KEYWORDS.join(', ')}` },
          { status: 400 }
        );
      }

      const result = await crawlKinQuestions(keyword as Keyword);
      return NextResponse.json(result);
    }

    // 모든 키워드 크롤링
    const results = await crawlAllKeywords(KEYWORDS);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Crawl API error:', error);
    return NextResponse.json(
      { error: 'Failed to crawl data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
