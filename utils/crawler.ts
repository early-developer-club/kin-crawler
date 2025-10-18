import axios from 'axios';
import * as cheerio from 'cheerio';
import { Question, KeywordQuestions, Keyword } from '@/lib/types';

/**
 * 키워드를 URL 인코딩하여 네이버 지식인 검색 URL 생성
 */
export function generateSearchUrl(keyword: string, page: number = 1): string {
  const encodedKeyword = encodeURIComponent(keyword);
  const start = (page - 1) * 10 + 1;
  return `https://kin.naver.com/search/list.naver?query=${encodedKeyword}&sort=date&start=${start}`;
}

/**
 * 한 페이지의 질문 데이터 추출
 */
async function crawlPage(keyword: string, page: number): Promise<Question[]> {
  const url = generateSearchUrl(keyword, page);

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Referer': 'https://kin.naver.com',
    },
    timeout: 10000,
  });

  const html = response.data;
  const $ = cheerio.load(html);
  const questions: Question[] = [];

  // 네이버 지식인 검색 결과 파싱
  $('.basic1 li').each((_, element) => {
    const $elem = $(element);
    const $titleLink = $elem.find('dt a');
    const title = $titleLink.text().trim();
    const link = $titleLink.attr('href') || '';

    // 날짜 추출
    const dateText = $elem.find('.txt_inline').text().trim();
    const date = extractDate(dateText);

    // 미리보기 텍스트 추출
    const preview = $elem.find('dd').first().text().trim();

    if (title && link) {
      questions.push({
        title,
        link: link.startsWith('http') ? link : `https://kin.naver.com${link}`,
        date,
        preview: preview || undefined,
      });
    }
  });

  return questions;
}

/**
 * 네이버 지식인 검색 결과를 크롤링하여 질문 데이터 추출
 * 최대 50개까지 가져오기 (5페이지)
 */
export async function crawlKinQuestions(keyword: Keyword): Promise<KeywordQuestions> {
  try {
    const allQuestions: Question[] = [];
    const uniqueLinks = new Set<string>();
    const maxPages = 5; // 50개를 가져오기 위해 5페이지

    for (let page = 1; page <= maxPages; page++) {
      const pageQuestions = await crawlPage(keyword, page);

      for (const question of pageQuestions) {
        if (!uniqueLinks.has(question.link)) {
          uniqueLinks.add(question.link);
          allQuestions.push(question);
        }
      }

      if (allQuestions.length >= 50) {
        break;
      }

      if (pageQuestions.length === 0) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return {
      keyword,
      questions: allQuestions.slice(0, 50),
    };
  } catch (error) {
    console.error(`Error crawling keyword "${keyword}":`, error);
    throw new Error(`Failed to crawl questions for keyword: ${keyword}`);
  }
}

/**
 * 날짜 텍스트에서 날짜 추출
 */
function extractDate(text: string): string {
  // "2025.10.18" 형식의 날짜 추출
  const dateMatch = text.match(/\d{4}\.\d{2}\.\d{2}/);
  if (dateMatch) {
    return dateMatch[0];
  }

  // "1시간 전", "2일 전" 등의 상대 시간 처리
  if (text.includes('시간 전') || text.includes('분 전')) {
    return new Date().toISOString().split('T')[0].replace(/-/g, '.');
  }

  if (text.includes('일 전')) {
    const daysAgo = parseInt(text);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  }

  return text;
}

/**
 * 모든 키워드에 대해 크롤링 실행
 */
export async function crawlAllKeywords(keywords: Keyword[]): Promise<KeywordQuestions[]> {
  const results = await Promise.allSettled(
    keywords.map(keyword => crawlKinQuestions(keyword))
  );

  return results
    .filter((result): result is PromiseFulfilledResult<KeywordQuestions> =>
      result.status === 'fulfilled'
    )
    .map(result => result.value);
}
