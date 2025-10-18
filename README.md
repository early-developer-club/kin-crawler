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

### Task 3: 데이터 관리 및 상태 관리 ✅

**날짜**: 2025-10-18

#### 실행 내용

1. **Zustand 스토어 생성**
   - `store/useKinStore.ts` - 전역 상태 관리 스토어
   - 4개 키워드 데이터 동시 관리
   - 로딩/에러 상태 관리
   - 마지막 업데이트 시간 추적

2. **상태 관리 기능**
   - `fetchAllQuestions()` - 모든 키워드 데이터 가져오기
   - `fetchKeywordQuestions()` - 특정 키워드만 가져오기
   - `refresh()` - 데이터 새로고침
   - `clearError()` - 에러 상태 초기화

3. **커스텀 훅 구현**
   - `hooks/useKinQuestions.ts` - 편리한 데이터 접근 훅
   - 자동 데이터 fetching 기능
   - `getQuestionsByKeyword()` - 키워드별 데이터 조회
   - `totalQuestionsCount` - 전체 질문 개수 계산

4. **홈페이지 UI 업데이트**
   - `app/page.tsx` - 상태 관리 통합
   - 로딩/에러 상태 표시
   - 데이터 새로고침 버튼
   - 키워드별 통계 카드
   - 질문 목록 미리보기 (각 키워드당 5개)

#### 주요 기능
```typescript
// Zustand 스토어 사용 예시
const {
  data,                    // 모든 키워드 데이터
  isLoading,              // 로딩 상태
  isRefreshing,           // 새로고침 상태
  error,                  // 에러 메시지
  lastUpdated,            // 마지막 업데이트 시간
  fetchAll,               // 모든 데이터 가져오기
  fetchKeyword,           // 특정 키워드 가져오기
  refresh,                // 새로고침
  clearError,             // 에러 초기화
} = useKinQuestions();
```

#### 결과물
- ✅ `store/useKinStore.ts` - Zustand 전역 상태 관리
- ✅ `hooks/useKinQuestions.ts` - 커스텀 훅
- ✅ `app/page.tsx` - 상태 관리 통합 UI
- ✅ 로딩/에러 상태 처리 완료
- ✅ 데이터 새로고침 기능 구현
- ✅ 60초 타임아웃 설정 (크롤링 시간 고려)

### Task 4: UI 컴포넌트 개발 - 레이아웃 ✅

**날짜**: 2025-10-18

#### 실행 내용

1. **모던한 디자인 시스템 적용**
   - `app/globals.css` - CSS 변수 기반 테마 시스템
   - 라이트/다크 모드 자동 지원
   - 그라디언트 배경 스타일
   - 글래스모피즘 효과 추가

2. **헤더 컴포넌트** (`components/Header.tsx`)
   - Sticky 헤더 (상단 고정)
   - 로고 및 타이틀
   - 새로고침 버튼 (애니메이션 포함)
   - 마지막 업데이트 시간 표시
   - 반응형 디자인 (모바일/데스크톱)

3. **탭 네비게이션** (`components/TabNavigation.tsx`)
   - 전체/키워드별 탭 전환
   - 각 탭에 질문 개수 배지 표시
   - 가로 스크롤 지원 (모바일)
   - Active 상태 시각적 표시

4. **레이아웃 컴포넌트** (`components/Layout.tsx`)
   - 그라디언트 배경
   - Footer 추가
   - 반응형 컨테이너

5. **홈페이지 UI 개선** (`app/page.tsx`)
   - 탭 기반 필터링 구현
   - 키워드별 질문 카드 (그라디언트 헤더)
   - 로딩 스피너 애니메이션
   - 빈 상태(Empty State) 디자인
   - Hover 효과 및 마이크로 인터랙션

#### 디자인 특징
- **컬러 시스템**: Slate 기반 (라이트/다크 모드)
- **타이포그래피**: Inter 폰트
- **그라디언트**: Blue → Purple
- **반응형**: Mobile-first 디자인
- **애니메이션**: Smooth transitions

#### 결과물
- ✅ `components/Header.tsx` - 헤더 컴포넌트
- ✅ `components/TabNavigation.tsx` - 탭 네비게이션
- ✅ `components/Layout.tsx` - 레이아웃 컴포넌트
- ✅ `app/globals.css` - 모던 디자인 시스템
- ✅ `app/page.tsx` - 개선된 홈페이지
- ✅ 모바일/태블릿/데스크톱 반응형 지원
- ✅ 다크모드 완벽 지원

### Task 5: UI 컴포넌트 개발 - 질문 리스트 ✅

**날짜**: 2025-10-18

#### 실행 내용

1. **QuestionCard 컴포넌트** (`components/QuestionCard.tsx`)
   - 개별 질문 카드 UI
   - 키워드 배지 표시
   - 질문 제목 및 미리보기 (line-clamp-2)
   - 날짜 정보 표시
   - 외부 링크 아이콘 (hover 시 표시)
   - Staggered fadeIn 애니메이션 (index * 50ms)
   - Hover 효과 (배경색 전환, 텍스트 색상 변경)

2. **QuestionList 컴포넌트** (`components/QuestionList.tsx`)
   - 키워드별 질문 그룹 렌더링
   - 그라디언트 헤더 (Blue → Purple)
   - 질문 개수 배지
   - QuestionCard 통합

3. **LoadingSkeleton 컴포넌트** (`components/LoadingSkeleton.tsx`)
   - 로딩 중 Skeleton UI
   - 4개 키워드 섹션 × 3개 아이템 구조
   - Pulse 애니메이션
   - 다크모드 지원

4. **EmptyState 컴포넌트** (`components/EmptyState.tsx`)
   - 데이터 없을 때 빈 상태 UI
   - 커스터마이징 가능한 title/description
   - 아이콘 기반 디자인
   - 중앙 정렬 레이아웃

5. **애니메이션 시스템** (`app/globals.css`)
   - `@keyframes fadeIn` - 페이드인 + 위로 슬라이드
   - `@keyframes slideIn` - 왼쪽에서 슬라이드
   - `@keyframes scaleIn` - 스케일 확대 효과
   - 유틸리티 클래스: `.animate-fadeIn`, `.animate-slideIn`, `.animate-scaleIn`
   - 스크롤바 숨김 유틸리티: `.scrollbar-hide`
   - Line-clamp 유틸리티: `.line-clamp-2`

6. **홈페이지 통합** (`app/page.tsx`)
   - QuestionList, LoadingSkeleton, EmptyState 컴포넌트 통합
   - 기존 인라인 코드 제거 (간결한 코드)
   - 로딩/에러/빈 상태 처리 개선

#### 주요 기능
```tsx
// QuestionCard 사용 예시
<QuestionCard
  question={question}
  keyword={keywordData.keyword}
  index={index}  // 애니메이션 딜레이용
/>

// Staggered Animation
style={{ animationDelay: `${index * 50}ms` }}
```

#### 애니메이션 효과
- **fadeIn**: 부드러운 페이드인 + 아래→위 이동 (0.4s)
- **slideIn**: 왼쪽→오른쪽 슬라이드 (0.3s)
- **scaleIn**: 작게→크게 스케일 (0.3s)
- **Staggered**: 각 카드가 50ms 간격으로 순차 등장

#### 결과물
- ✅ `components/QuestionCard.tsx` - 질문 카드 컴포넌트
- ✅ `components/QuestionList.tsx` - 질문 리스트 컴포넌트
- ✅ `components/LoadingSkeleton.tsx` - 로딩 스켈레톤
- ✅ `components/EmptyState.tsx` - 빈 상태 컴포넌트
- ✅ `app/globals.css` - 애니메이션 시스템 추가
- ✅ `app/page.tsx` - 새 컴포넌트 통합
- ✅ 부드러운 인터랙션 및 마이크로 애니메이션
- ✅ 모바일 최적화 (line-clamp, responsive)

### Task 6: 검색 및 필터링 기능 ✅

**날짜**: 2025-10-18

#### 실행 내용

1. **SearchBar 컴포넌트** (`components/SearchBar.tsx`)
   - 실시간 검색 기능
   - 검색어 입력 시 자동 필터링
   - Clear 버튼 (검색어 초기화)
   - 검색어 표시 및 애니메이션
   - 반응형 디자인

2. **SortOptions 컴포넌트** (`components/SortOptions.tsx`)
   - 최신순/오래된순 정렬 토글
   - 버튼 스타일 전환 애니메이션
   - Active 상태 시각적 표시

3. **검색 하이라이팅 시스템**
   - `utils/highlight.ts` - 하이라이팅 유틸리티 함수
     - `getHighlightedParts()` - 텍스트를 검색어로 분할
     - `matchesSearchQuery()` - 검색 매칭 로직
   - `components/HighlightedText.tsx` - 하이라이트 텍스트 렌더링
     - 검색어를 노란색 배경으로 강조
     - 다크모드 지원

4. **QuestionCard 업데이트**
   - `searchQuery` prop 추가
   - 제목 및 미리보기에 하이라이팅 적용
   - HighlightedText 컴포넌트 통합

5. **QuestionList 업데이트**
   - `searchQuery` prop 전달
   - 하위 QuestionCard에 검색어 전달

6. **홈페이지 통합** (`app/page.tsx`)
   - 검색 상태 관리 (`searchQuery`)
   - 정렬 상태 관리 (`sortBy`)
   - `useMemo`로 필터링/검색/정렬 최적화
   - 검색 결과 개수 표시
   - 검색 결과 없음 상태 처리
   - 날짜 기반 정렬 로직 (최신순/오래된순)

#### 주요 기능

```tsx
// 검색 및 필터링 로직
const processedData = useMemo(() => {
  // 1. 탭 필터링
  let filtered = activeTab === 'all' ? data : data.filter(...);

  // 2. 검색 필터링
  if (searchQuery.trim()) {
    filtered = filtered.map(keywordData => ({
      ...keywordData,
      questions: keywordData.questions.filter(q =>
        matchesSearchQuery(q.title, q.preview, searchQuery)
      ),
    })).filter(keywordData => keywordData.questions.length > 0);
  }

  // 3. 정렬 (날짜 기준)
  const sorted = filtered.map(keywordData => ({
    ...keywordData,
    questions: [...keywordData.questions].sort((a, b) => {
      const dateA = new Date(a.date.replace(/\./g, '-')).getTime();
      const dateB = new Date(b.date.replace(/\./g, '-')).getTime();
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    }),
  }));

  return sorted;
}, [data, activeTab, searchQuery, sortBy]);
```

#### 검색 하이라이팅

```tsx
// HighlightedText 사용 예시
<HighlightedText
  text={question.title}
  query={searchQuery}
  className="..."
/>

// 결과: "ChatGPT 사용법" 검색 시 "ChatGPT" 부분이 노란색으로 강조됨
```

#### 결과물
- ✅ `components/SearchBar.tsx` - 검색바 컴포넌트
- ✅ `components/SortOptions.tsx` - 정렬 옵션 컴포넌트
- ✅ `components/HighlightedText.tsx` - 하이라이트 텍스트 컴포넌트
- ✅ `utils/highlight.ts` - 하이라이팅 유틸리티
- ✅ `components/QuestionCard.tsx` - 하이라이팅 적용
- ✅ `components/QuestionList.tsx` - searchQuery 전달
- ✅ `app/page.tsx` - 검색/필터/정렬 통합
- ✅ 실시간 검색 및 하이라이팅
- ✅ 최신순/오래된순 정렬
- ✅ 검색 결과 개수 표시
- ✅ 빈 검색 결과 처리

## 🎯 다음 단계

- [x] Task 1: 프로젝트 초기 설정 및 기술 스택 결정
- [x] Task 2: 크롤링 로직 구현
- [x] Task 3: 데이터 관리 및 상태 관리
- [x] Task 4: UI 컴포넌트 개발 - 레이아웃
- [x] Task 5: UI 컴포넌트 개발 - 질문 리스트
- [x] Task 6: 검색 및 필터링 기능
- [ ] Task 7: 배포 준비 및 최적화
- [ ] Task 8: Vercel/Netlify 배포
