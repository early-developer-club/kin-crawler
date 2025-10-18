# Naver 지식인 크롤링 서비스 개발 태스크

## 📋 프로젝트 개요
Naver 지식인에서 AI 관련 키워드('ChatGPT', 'gemini', 'claude', 'ai 에이전트')를 크롤링하여 최신 질문 50개씩 보기 좋게 표시하는 웹 클라이언트 개발

---

## Task 1: 프로젝트 초기 설정 및 기술 스택 결정

### 목표
프로젝트의 기본 구조를 설정하고 필요한 기술 스택을 구성합니다.

### 요구사항
- React + Vite 또는 Next.js 기반 프로젝트 생성
- TailwindCSS 설정 (트렌디한 UI를 위해)
- 크롤링을 위한 라이브러리 선택 및 설치
  - axios 또는 fetch API
  - cheerio 또는 puppeteer (필요시)
- 배포 플랫폼 결정 (Vercel, Netlify, GitHub Pages 등)
- 각 단계별로 실행 기록을 README.md 파일에 기록함
- 모든 task 별로 git push 실행할 것.

### 결과물
- 초기화된 프로젝트 폴더
- package.json에 필요한 dependencies 설치 완료
- 기본 개발 서버 실행 가능한 상태

---

## Task 2: 크롤링 로직 구현

### 목표
Naver 지식인 검색 결과를 크롤링하는 핵심 로직을 구현합니다.

### 요구사항
- 키워드별 검색 URL 생성 함수 작성
  - 예: `https://kin.naver.com/search/list.naver?query=${keyword}&sort=date`
- HTML 파싱하여 질문 데이터 추출
  - 질문 제목
  - 질문 링크
  - 작성 시간
- CORS 문제 해결 방안 적용
  - 프록시 서버 또는 CORS-anywhere 활용
  - 또는 브라우저 익스텐션 형태로 구현 고려
- 각 키워드당 최신순 50개 제한 로직

### 결과물
- `src/utils/crawler.js` 또는 `crawler.ts` 파일
- 키워드를 입력받아 질문 리스트를 반환하는 함수
- 에러 핸들링 포함

### 참고사항
```javascript
// 예상 데이터 구조
{
  keyword: 'ChatGPT',
  questions: [
    {
      title: '질문 제목',
      link: 'https://kin.naver.com/...',
      date: '2025.10.18',
      preview: '질문 내용 미리보기...'
    },
    // ... 50개
  ]
}
```

---

## Task 3: 데이터 관리 및 상태 관리

### 목표
크롤링한 데이터를 효율적으로 관리하고 UI에 전달합니다.

### 요구사항
- 4개 키워드에 대한 데이터를 동시에 관리
- React Context API 또는 Zustand 등을 활용한 상태 관리
- 로딩 상태, 에러 상태 처리
- 데이터 새로고침 기능
- 로컬 스토리지에 캐싱 (선택사항)

### 결과물
- `src/store/` 또는 `src/context/` 폴더
- 전역 상태 관리 로직
- 커스텀 훅 (예: `useKinQuestions`)

---

## Task 4: UI 컴포넌트 개발 - 레이아웃

### 목표
트렌디하고 깔끔한 전체 레이아웃을 구성합니다.

### 요구사항
- 모던한 디자인 시스템 적용
  - 다크모드 지원
  - 그라디언트, 글래스모피즘 또는 뉴모피즘 스타일
- 반응형 디자인 (모바일, 태블릿, 데스크탑)
- 상단 헤더
  - 서비스 로고/타이틀
  - 새로고침 버튼
  - 다크모드 토글
- 키워드 탭 또는 필터링 UI

### 결과물
- `src/components/Layout.jsx`
- `src/components/Header.jsx`
- `src/components/TabNavigation.jsx`
- TailwindCSS 커스텀 설정 (tailwind.config.js)

---

## Task 5: UI 컴포넌트 개발 - 질문 리스트

### 목표
질문 목록을 보기 좋게 표시하는 컴포넌트를 개발합니다.

### 요구사항
- 카드 형태의 질문 아이템
  - 질문 제목 (클릭 시 원문으로 이동)
  - 작성 시간
  - 질문 미리보기
  - 키워드 배지
- 애니메이션 효과 (Fade-in, Hover 효과)
- 무한 스크롤 또는 페이지네이션 (50개 고정이므로 스크롤만)
- 로딩 스켈레톤 UI
- 빈 상태(Empty State) 디자인

### 결과물
- `src/components/QuestionCard.jsx`
- `src/components/QuestionList.jsx`
- `src/components/LoadingSkeleton.jsx`
- `src/components/EmptyState.jsx`

---

## Task 6: 검색 및 필터링 기능

### 목표
사용자가 질문을 쉽게 찾을 수 있도록 검색/필터 기능을 추가합니다.

### 요구사항
- 전체 질문 내 검색 기능
- 키워드별 필터링 (탭 또는 드롭다운)
- 날짜순 정렬 옵션
- 검색 결과 하이라이팅

### 결과물
- `src/components/SearchBar.jsx`
- `src/components/FilterPanel.jsx`
- 검색/필터 로직 구현

---

## Task 7: 배포 준비 및 최적화

### 목표
프로덕션 배포를 위한 최적화 작업을 수행합니다.

### 요구사항
- 코드 스플리팅 및 레이지 로딩
- 이미지 최적화
- SEO 메타 태그 설정
- 성능 최적화 (Lighthouse 점수 90+ 목표)
- 환경변수 설정 (프록시 URL 등)
- README.md 작성

### 결과물
- 최적화된 빌드 파일
- 환경 설정 파일
- 프로젝트 문서

---

## Task 8: Vercel/Netlify 배포

### 목표
Public하게 접근 가능한 웹사이트로 배포합니다.

### 요구사항
- GitHub 리포지토리 연결
- Vercel에 배포
- CI/CD 파이프라인 구성
- 배포 후 테스트

### 결과물
- 배포된 웹사이트 URL
- 자동 배포 설정 완료
- 배포 문서 업데이트

---

## 🎯 추가 고려사항

### CORS 이슈 해결 방안
1. **서버리스 함수 활용**: Vercel/Netlify의 서버리스 함수를 프록시로 사용
2. **CORS Proxy**: cors-anywhere 같은 서비스 활용
3. **브라우저 익스텐션**: Chrome Extension으로 개발하여 CORS 우회

### 추천 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: TailwindCSS + shadcn/ui
- **상태관리**: Zustand
- **크롤링**: Cheerio + Axios
- **배포**: Vercel
- **애니메이션**: Framer Motion

### 디자인 트렌드 적용
- 그라디언트 배경
- 글래스모피즘 카드
- 마이크로 인터랙션
- 다크모드 우선
- 깔끔한 타이포그래피

---

## 📝 Task 실행 순서
1. Task 1 → Task 2 → Task 3 (핵심 기능)
2. Task 4 → Task 5 (UI 개발)
3. Task 6 (부가 기능)
4. Task 7 → Task 8 (배포)

각 Task를 완료할 때마다 체크하고 다음 단계로 진행하세요!