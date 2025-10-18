# 네이버 지식인 AI 크롤러

네이버 지식인에서 AI 관련 키워드('ChatGPT', 'Gemini', 'Claude', 'AI 에이전트')를 크롤링하여 최신 질문 50개씩 보기 좋게 표시하는 웹 서비스입니다.

## 🚀 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: TailwindCSS 4
- **상태관리**: Zustand
- **크롤링**: Axios + Cheerio
- **배포 예정**: Vercel

## 📝 개발 진행 기록

### Task 1: 프로젝트 초기 설정 및 기술 스택 결정 ✅

**날짜**: 2025-10-18

#### 실행 내용

1. **프로젝트 초기화**
   ```bash
   npm init -y
   ```

2. **Next.js 및 React 설치**
   ```bash
   npm install next@latest react@latest react-dom@latest
   ```

3. **TypeScript 및 개발 도구 설치**
   ```bash
   npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next
   ```

4. **크롤링 라이브러리 설치**
   ```bash
   npm install axios cheerio
   npm install -D @types/cheerio
   ```

5. **상태 관리 라이브러리 설치**
   ```bash
   npm install zustand
   ```

6. **프로젝트 구조 생성**
   - `app/` - Next.js App Router 디렉토리
   - `components/` - React 컴포넌트
   - `lib/` - 유틸리티 및 라이브러리
   - `utils/` - 헬퍼 함수

7. **설정 파일 생성**
   - `tsconfig.json` - TypeScript 설정
   - `next.config.ts` - Next.js 설정
   - `tailwind.config.ts` - TailwindCSS 설정
   - `postcss.config.mjs` - PostCSS 설정
   - `.eslintrc.json` - ESLint 설정

8. **기본 페이지 생성**
   - `app/layout.tsx` - 루트 레이아웃
   - `app/page.tsx` - 홈페이지
   - `app/globals.css` - 글로벌 스타일

#### 결과물
- ✅ 초기화된 프로젝트 폴더
- ✅ package.json에 필요한 dependencies 설치 완료
- ✅ 기본 개발 서버 실행 가능한 상태

## 🛠️ 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📦 설치된 주요 패키지

```json
{
  "dependencies": {
    "next": "^15.5.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "axios": "^1.12.2",
    "cheerio": "^1.1.2",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "tailwindcss": "^4.1.14",
    "@types/cheerio": "^0.22.35"
  }
}
```

### Task 2: 크롤링 로직 구현 ✅

**날짜**: 2025-10-18

#### 실행 내용

1. **타입 정의 생성**
   - `lib/types.ts` - Question, KeywordQuestions 인터페이스 정의
   - 키워드 타입 및 상수 정의

2. **크롤러 유틸리티 구현**
   - `utils/crawler.ts` 생성
   - `generateSearchUrl()` - 키워드별 검색 URL 생성 (페이지네이션 지원)
   - `crawlPage()` - 한 페이지의 질문 데이터 추출
   - `crawlKinQuestions()` - 키워드당 50개 질문 크롤링 (5페이지)
   - `crawlAllKeywords()` - 모든 키워드 크롤링
   - `extractDate()` - 날짜 텍스트 파싱

3. **API 라우트 생성**
   - `app/api/proxy/route.ts` - CORS 우회용 프록시 (선택적 사용)
   - `app/api/crawl/route.ts` - 크롤링 API 엔드포인트
     - `GET /api/crawl` - 모든 키워드 크롤링
     - `GET /api/crawl?keyword=ChatGPT` - 특정 키워드 크롤링

4. **페이지네이션 구현**
   - 네이버 지식인 페이지당 10개 제한 대응
   - 5페이지 순차 크롤링으로 50개 데이터 수집
   - 과도한 요청 방지를 위한 500ms 딜레이

#### 테스트 결과
```bash
# 단일 키워드 테스트
curl "http://localhost:3000/api/crawl?keyword=ChatGPT" | jq '.questions | length'
# 결과: 50

# 모든 키워드 테스트
curl "http://localhost:3000/api/crawl" | jq -r '.[] | "\(.keyword): \(.questions | length)개"'
# 결과:
# ChatGPT: 50개
# Gemini: 50개
# Claude: 50개
# AI 에이전트: 50개
```

#### 결과물
- ✅ `utils/crawler.ts` - 크롤링 핵심 로직
- ✅ `lib/types.ts` - TypeScript 타입 정의
- ✅ `app/api/crawl/route.ts` - REST API 엔드포인트
- ✅ `app/api/proxy/route.ts` - CORS 우회 프록시
- ✅ 키워드당 최신순 50개 제한 로직 구현
- ✅ 에러 핸들링 포함

## 🎯 다음 단계

- [x] Task 1: 프로젝트 초기 설정 및 기술 스택 결정
- [x] Task 2: 크롤링 로직 구현
- [ ] Task 3: 데이터 관리 및 상태 관리
- [ ] Task 4: UI 컴포넌트 개발 - 레이아웃
- [ ] Task 5: UI 컴포넌트 개발 - 질문 리스트
- [ ] Task 6: 검색 및 필터링 기능
- [ ] Task 7: 배포 준비 및 최적화
- [ ] Task 8: Vercel/Netlify 배포
