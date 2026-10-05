# Weave:ive

> 하고 싶은 것을 정하고, 한 것을 기록하고, 원하는 나를 골라 보여주는 제너럴리스트의 경험 아카이브.

Weave:ive는 여러 분야를 넘나드는 사람이 자신의 관심사와 목표를 관리하고, 활동에서 얻은 경험을 꾸준히 기록하며, 축적된 경험을 목적에 맞는 관점으로 조합해 공유할 수 있도록 돕는 개인 경험 관리 서비스입니다.

하나의 직무나 정해진 포트폴리오 양식에 자신을 맞추는 대신, 경험을 원본 데이터로 보존하고 필요할 때 서로 다른 모습으로 보여주는 것을 목표로 합니다.

이름 **Weave:ive**는 `Weave + Archive`의 조합입니다. 여러 방향으로 뻗어나가는 경험을 하나의 아카이브에 축적하고, 필요한 맥락에 맞춰 다시 꺼내 보여준다는 의미를 담고 있습니다.

## 왜 Weave:ive인가요?

수업, 프로젝트, 연구, 동아리, 취미와 개인 학습에서 생긴 기록은 여러 기기와 서비스에 흩어지기 쉽습니다. 이렇게 분산된 자료는 시간이 지나면 다시 찾기 어렵고, 포트폴리오가 필요할 때마다 이미 했던 경험을 처음부터 재구성해야 합니다.

특히 관심 분야가 많은 제너럴리스트의 경험은 하나의 카테고리나 직무로 정리하기 어렵습니다. 하나의 프로젝트가 동시에 Web, XR, UX, Research, Exhibition에 해당할 수도 있기 때문입니다.

Weave:ive는 이 문제를 다음 원칙으로 해결합니다.

- 경험은 포트폴리오를 위해 작성하는 항목이 아니라 계속 축적하는 원본 데이터입니다.
- 하나의 경험은 여러 관심 분야, 목표, 활동과 연결될 수 있습니다.
- 포트폴리오와 개인 홈페이지는 별도 데이터가 아니라 같은 경험 DB의 서로 다른 View입니다.
- 같은 경험도 공유 목적에 따라 다른 내용과 관점을 강조할 수 있습니다.
- 작은 경험도 먼저 기록하고, 그 가치는 나중에 발견할 수 있도록 합니다.

## 핵심 흐름

```text
Interest → Goal → Activity → Experience → Archive → Share
```

| 단계 | 의미 |
| --- | --- |
| Interest | 내가 관심을 두고 있는 분야 |
| Goal | 앞으로 이루거나 시도하고 싶은 것 |
| Activity | 현재 진행하고 있는 프로젝트와 활동 |
| Experience | 활동 과정에서 실제로 한 일과 얻은 경험 |
| Archive | 경험, 회고, 결과물과 자료가 축적되는 개인 DB |
| Share | 목적에 맞는 경험과 관점을 선택해 만드는 공개 View |

이 흐름은 완료된 기록뿐 아니라 과거, 현재, 미래의 나를 하나의 시스템에서 연결합니다.

## 핵심 기능

### Dashboard

관심 분야와 목표, 진행 중인 활동, 최근 기록, 완료된 경험을 한곳에서 관리하는 개인 공간입니다.

- 관심 분야와 분야별 목표 관리
- 현재 진행 중인 활동 확인
- 최근 기록과 완료된 경험 탐색
- 기록이 필요한 활동 확인
- 공개 상태와 공유 Preset 관리

Dashboard는 단순한 포트폴리오 관리 화면이 아니라 개인의 경험과 방향을 관리하는 Personal OS를 지향합니다.

### Experience Archive

경험을 중심으로 관련 정보와 자료를 축적합니다.

하나의 Experience에는 다음과 같은 정보가 포함될 수 있습니다.

- 제목, 기간, 상태
- 관련 관심 분야와 태그
- 한 일, 역할, 과정과 결과
- 배운 점과 회고
- 관련 Goal, Activity, Project
- 사용 기술
- 이미지, 파일, 링크와 코드

경험은 하나의 폴더에만 속하지 않습니다. 여러 관심 분야 및 목표와 다대다 관계로 연결됩니다.

### Share Preset

Archive에 저장된 경험을 목적별로 선택하고, 보여줄 내용과 강조점을 조절해 공유 View를 만듭니다.

예를 들어 동일한 사용자가 다음과 같은 Preset을 가질 수 있습니다.

- Personal Home
- Game Developer
- XR / HCI
- Frontend
- Public Archive
- Project Collection

각 Preset은 다음 요소를 독립적으로 가질 수 있습니다.

- 공개할 Experience 선택
- Experience 내부 블록별 공개 여부
- 같은 경험에서 강조할 역할, 기술, 과정 또는 성과
- 레이아웃과 디자인
- 독립적인 공유 링크

동일한 프로젝트도 Frontend Preset에서는 UI 구현과 기술적 문제 해결을, XR Preset에서는 공간 인터랙션과 사용자 경험을 중심으로 보여줄 수 있습니다.

## 제품 구조

```text
                            ┌─ Private Dashboard
                            ├─ Personal Home
                            ├─ Public Archive
[ Experience Database ] ────┼─ Game Developer Preset
                            ├─ XR / HCI Preset
                            └─ Frontend Preset
```

Weave:ive에서 Portfolio는 별도로 복제되는 데이터가 아니라 Experience Database에 적용되는 View입니다.

**One DB → Multiple Views**

원본 경험을 한 번 수정하면, 그 경험을 사용하는 여러 View에도 변경 사항을 일관되게 반영할 수 있는 구조를 지향합니다.

## 공개와 편집

관리자 페이지와 공개 사이트를 완전히 분리하지 않습니다. 같은 페이지에서 권한에 따라 보이는 기능과 정보가 달라지는 방식을 지향합니다.

- 소유자: 전체 기록, 비공개 정보, 편집 및 관리 기능 사용
- 방문자: 현재 View에서 공개된 정보만 열람

페이지를 보는 경험과 기록을 편집하는 경험을 자연스럽게 연결하고, 콘텐츠 또는 블록 단위로 공개 범위를 제어할 수 있도록 설계합니다.

## 디자인 방향

Weave:ive는 기업용 생산성 도구보다 기록을 둘러보는 재미가 있는 개인 공간을 지향합니다.

- 개인의 취향을 드러낼 수 있는 독특하고 장식적인 UI
- 기록 열람과 편집이 자연스럽게 이어지는 인터랙션
- Preset의 목적과 맥락에 맞는 서로 다른 표현 방식
- 다양한 콘텐츠를 담을 수 있는 블록 기반 페이지

## 개발 단계

현재는 제품 구조와 MVP 범위를 구체화하는 초기 기획 단계입니다.

### 기술 방향

초기 구현은 다음 구성을 기준으로 검토합니다.

```text
Frontend   Next.js · React · TypeScript
UI         Tailwind CSS · shadcn/ui
Backend    Supabase PostgreSQL · Auth · Storage
Deploy     Vercel · Supabase
```

공개 Share 페이지의 서버 렌더링과 비공개 Dashboard의 높은 상호작용성을 한 애플리케이션에서 다루기 위해 React 기반 Next.js를 우선 사용합니다.

### 기술 학습 목표

Weave:ive는 제품 구현과 함께 다음 프론트엔드 역량을 실제 문제를 통해 익히는 프로젝트를 지향합니다.

- React의 컴포넌트 설계, 상태 관리, 렌더링과 생명주기 이해
- Next.js의 Server/Client Component, 라우팅, 데이터 패칭과 렌더링 전략 이해
- TypeScript를 활용한 도메인 모델, 컴포넌트 Props와 API 응답의 타입 안정성 확보
- 모듈 그래프, 번들링, 코드 분할, Tree Shaking과 환경별 빌드에 대한 이해
- Webpack과 Turbopack의 역할 및 설정 방식 비교
- Vue의 반응성 및 컴포넌트 모델을 React와 비교하는 별도 실습

제품 코드는 React와 Vue를 동시에 혼용하지 않습니다. React/Next.js를 주력으로 깊이 있게 사용하고, Vue는 작은 비교용 화면이나 별도 실습 브랜치에서 같은 기능을 구현해 차이를 학습합니다.

### MVP

- Interest, Goal, Activity, Experience의 기본 데이터 모델
- Experience 생성, 조회, 수정과 연결 관계 관리
- 개인 Dashboard와 Archive 탐색
- 공개/비공개 설정
- Share Preset 생성 및 경험 선택
- Preset별 공유 페이지

### 이후 확장 후보

- 이미지, PDF, 코드 및 파일 뷰어
- 블록 기반 상세 페이지 편집
- Preset별 레이아웃과 테마 편집
- PDF 및 PPTX 내보내기
- AI 기반 요약과 문체 조절
- 다국어 폰트, 번역 및 원문 전환

## 프로젝트 상태

> Planning / Pre-development

현재 저장소에는 서비스의 최신 통합 기획을 기준으로 제품 요구사항과 구현 범위를 정리하고 있습니다. 메인 구현은 Next.js·React·TypeScript와 Supabase를 기준으로 시작하며, Vue와 Webpack은 비교 학습용 실습으로 분리합니다.

## Repository

```text
apps/web                 Next.js · React · TypeScript 메인 애플리케이션
labs/vue-comparison      Vue · Vite · TypeScript 비교 실습
labs/webpack-basics      React · TypeScript · Webpack 번들러 실습
supabase/migrations      PostgreSQL 스키마와 RLS 마이그레이션
docs/learning            기술 비교 기록
assets/brand             원본 브랜드 자산
```

### 시작하기

```bash
npm install
copy apps\web\.env.example apps\web\.env.local
npm run dev
```

`.env.local`에는 Supabase 프로젝트의 URL과 publishable key를 입력합니다. 로컬 Supabase 전체 스택을 사용할 때는 Docker 실행 후 다음 명령을 사용합니다.

```bash
npm run supabase:start
npm run supabase:reset
npm run supabase:types
```

비교 실습은 각각 `npm run dev:vue`, `npm run dev:webpack`으로 실행합니다. 자세한 비교 항목은 `docs/learning/frontend-comparison.md`에 기록합니다.

배포 대상인 메인 Next.js 앱은 `npm run build`로 빌드합니다. 모든 비교 실습 workspace까지 검증하려면 `npm run build:all`을 사용합니다. Vercel에서도 메인 앱만 빌드하도록 구성해 Vue/Vite 비교 실습의 플랫폼별 네이티브 번들이 서비스 배포를 방해하지 않도록 합니다.

### UI 프로토타입과 로그인

현재 메인 앱에는 실제 Supabase 이메일·비밀번호 로그인과 샘플 데이터 기반 UI 프로토타입이 포함되어 있습니다. Google OAuth 코드도 추후 활성화할 수 있도록 유지하지만, 초기 테스트에는 별도의 Google Cloud 설정이 필요 없는 이메일 로그인을 사용합니다.

```text
/login                 이메일 로그인 및 테스트 계정 생성
/dashboard             개인 Dashboard
/archive               Experience Archive
/experiences/new       기록 작성 프로토타입
/goals                 관심 분야별 목표
/presets               공유 프리셋
/share/demo/frontend   공개 페이지 예시
```

Supabase Dashboard에서 Email Provider는 기본으로 활성화되어 있습니다. 회원가입 시 이메일 확인을 사용하는 경우 앱의 인증 완료 주소는 로컬에서 `http://localhost:3000/auth/callback`, 배포 환경에서 `https://weave-ive.vercel.app/auth/callback`을 사용합니다.

## 핵심 문장

> 하나의 직무로 나를 정의하지 않는다.

Weave:ive는 다양한 관심과 경험을 하나로 압축하지 않고 있는 그대로 축적한 뒤, 필요한 순간에 원하는 관점의 나를 꺼내 보여주기 위한 서비스입니다.
