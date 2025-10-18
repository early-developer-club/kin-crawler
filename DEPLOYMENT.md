# 배포 가이드

## Vercel 배포 방법

### 1. Vercel 계정 준비
1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인

### 2. 프로젝트 배포

#### 방법 1: Vercel 웹사이트에서 배포
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 리포지토리 `early-developer-club/kin-crawler` 선택
3. 프로젝트 설정:
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 설정됨)
   - **Output Directory**: `.next` (자동 설정됨)
4. 환경 변수 설정 (선택사항):
   - 현재 프로젝트는 환경변수가 필수가 아니므로 생략 가능
5. "Deploy" 클릭

#### 방법 2: Vercel CLI로 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 3. 배포 확인
배포가 완료되면 Vercel이 자동으로 URL을 생성합니다:
- **프리뷰 URL**: `https://kin-crawler-xxx.vercel.app`
- **프로덕션 URL**: `https://kin-crawler.vercel.app` (커스텀 도메인 설정 가능)

### 4. 자동 배포 설정
Vercel은 기본적으로 다음과 같이 자동 배포됩니다:
- **main 브랜치 푸시**: 자동으로 프로덕션 배포
- **다른 브랜치 푸시**: 자동으로 프리뷰 배포 생성
- **Pull Request 생성**: 자동으로 프리뷰 URL 코멘트 추가

## 환경 변수 설정 (선택사항)

Vercel 대시보드에서 프로젝트 설정 → Environment Variables에서 추가:

```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
CRAWL_PAGES_PER_KEYWORD=5
API_TIMEOUT=60000
NODE_ENV=production
```

## 커스텀 도메인 설정

1. Vercel 프로젝트 설정 → Domains
2. 도메인 입력 및 DNS 설정
3. Vercel이 제공하는 DNS 레코드를 도메인 제공업체에 추가

## 배포 후 체크리스트

- [ ] 메인 페이지 정상 작동 확인
- [ ] 새로고침 버튼으로 데이터 로딩 테스트
- [ ] 검색 기능 테스트
- [ ] 정렬 기능 테스트
- [ ] 모바일 반응형 확인
- [ ] 다크모드 작동 확인
- [ ] SEO 메타 태그 확인 (페이지 소스 보기)
- [ ] API 라우트 정상 작동 확인 (`/api/crawl`)

## 트러블슈팅

### 빌드 실패 시
1. 로컬에서 `npm run build` 실행하여 빌드 오류 확인
2. `package.json`의 dependencies 확인
3. Vercel 빌드 로그 확인

### API 라우트 오류 시
1. Vercel Functions 로그 확인
2. 타임아웃 설정 확인 (기본 10초, Hobby plan은 60초로 증가 가능)
3. 크롤링 URL이 접근 가능한지 확인

### CORS 이슈 시
- Next.js App Router는 서버 사이드에서 크롤링하므로 CORS 이슈가 없어야 함
- 만약 발생 시 `/api/proxy` 라우트 사용

## 성능 최적화

Vercel은 자동으로 다음을 제공합니다:
- **CDN**: 전 세계 엣지 네트워크
- **캐싱**: 정적 파일 자동 캐싱
- **이미지 최적화**: Next.js Image 컴포넌트 자동 최적화
- **HTTP/2**: 기본 지원

## 모니터링

Vercel 대시보드에서 확인 가능:
- **Analytics**: 트래픽 및 성능 지표
- **Logs**: 함수 실행 로그
- **Speed Insights**: 페이지 성능 분석
