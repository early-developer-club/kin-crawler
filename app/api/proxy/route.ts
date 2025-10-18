import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * CORS 우회를 위한 프록시 API
 * 클라이언트에서 직접 네이버 지식인에 요청하면 CORS 에러가 발생하므로
 * 서버사이드에서 요청을 대신 수행
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // 네이버 지식인 URL인지 검증
    if (!url.includes('kin.naver.com')) {
      return NextResponse.json(
        { error: 'Only Naver KIN URLs are allowed' },
        { status: 403 }
      );
    }

    // 네이버 지식인 페이지 가져오기
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://kin.naver.com',
      },
      timeout: 10000,
    });

    // HTML 데이터 반환
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: 'Failed to fetch data', message: error.message },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
