# 🤖 AGENTS.md — Here-it-book

## 프로젝트 개요

Here-it-book은 도서 검색, 도서 상세 조회, 서고 위치 확인, 서고 LED 점등/소등 기능을 제공하는 서고관리 웹 애플리케이션입니다.

이 문서는 에이전트가 이 저장소에서 작업할 때 따라야 하는 공통 작업 원칙을 정의합니다.  
도메인 규칙, API 명세, 테스트 상세 규칙은 아래 문서를 참고합니다.

- `docs/domain-rules.md`
- `docs/api-spec.md`
- `docs/testing-guide.md`

---

## 기술 스택 및 기본 원칙

### ESM & 버전 준수

- 모든 코드는 **ESM(ECMAScript Modules)** 방식으로 작성합니다.
- `require`, `module.exports` 사용을 금지합니다.
- `import`, `export`만 사용합니다.

### 프레임워크 / 런타임

- **Next.js 16**
  - App Router 구조를 따릅니다.
  - 가능한 경우 Server Component를 우선합니다.
  - 명확한 이점이 있는 경우 Server Actions를 활용합니다.
- **React 19**
  - 불필요한 `useMemo`, `useCallback` 남용을 피합니다.
  - React Compiler를 신뢰하되, 복잡한 데이터 처리와 상태 흐름은 구조적으로 해결합니다.
- **TypeScript**
  - 엄격하게 사용합니다.
  - `any`는 가능한 한 사용하지 않습니다.

### 스타일 / UI

- **Tailwind CSS 4**를 사용합니다.
- CSS 변수 기반 스타일링을 우선합니다.
- 컴포넌트는 가능한 경우 **Atomic Design(atoms / molecules / organisms)** 원칙을 따릅니다.
- shadcn/ui는 Button, Input, Select, Dialog, Card, Badge, Skeleton 등 공통 UI에 한정해 사용하고, 도서 검색/상세/LED 제어처럼 도메인 로직이 강한 컴포넌트는 프로젝트 요구사항에 맞게 직접 구현합니다.

---

## 프로젝트 구조 규칙

- 모든 import 경로는 **절대 경로**를 우선 사용합니다.
  - 예: `@/components/...`

주요 디렉터리:

- `/src/app`: Next.js App Router 레이아웃 및 페이지
- `/src/components`: UI 컴포넌트 및 Storybook 스토리
- `/src/hooks`: 커스텀 훅
- `/src/mocks`: MSW 핸들러 및 mock 설정
- `/src/lib`: 공통 유틸, API 클라이언트, 도메인 로직
- `/tests/unit`: 단위 테스트
- `/tests/e2e`: E2E 테스트
- `/.storybook`: Storybook 설정

규칙:

- 기존 폴더 구조와 네이밍 패턴을 먼저 따릅니다.
- 명시적 요청이 없는 한 대규모 폴더 이동이나 전역 리팩터링은 하지 않습니다.

---

## 통합 개발 워크플로우 (Atomic Task)

새로운 기능 또는 UI를 개발할 때, 가능한 경우 다음 과정을 하나의 **원자적 작업(Atomic Task)** 으로 수행합니다.

### Step 1: Mocking (MSW v2)

- `src/mocks/handlers.ts`에 MSW 핸들러를 추가/수정합니다.
- `http` 메서드와 `HttpResponse`를 사용합니다.
- mock 데이터는 실제 API 명세와 일치해야 합니다.

### Step 2: Documentation (Storybook 10)

- 컴포넌트와 함께 `.stories.tsx` 파일을 작성합니다.
- 가능한 상태를 스토리로 정의합니다.
  - `Loading`
  - `Error`
  - `Empty`
  - `Success`
  - 필요 시 도메인 상태 포함

### Step 3: Development (TSX)

- Tailwind CSS 4 기반으로 구현합니다.
- UI 로직과 도메인 로직을 분리합니다.
- 검색 목록과 상세 페이지의 책임을 분리합니다.
- API 응답 타입을 명확히 선언합니다.

### Step 4: Automated Testing

- **Logic:** `[name].test.ts` 또는 `[name].test.tsx` 파일을 작성하여 Vitest로 검증합니다.
- **Interaction:** Storybook `play` 함수 또는 `@storybook/test` 기반 테스트를 활용합니다.
- 테스트는 가능한 경우 `src/mocks/handlers.ts`를 재사용합니다.

---

## 작업 워크플로우

- 여러 파일에 걸친 변경이나 구조 변경이 필요한 경우, 바로 수정하지 말고 먼저 짧은 작업 계획을 제시합니다.
- 구현 전에 기존 코드 패턴과 타입 구조를 먼저 확인합니다.
- 명세에 없는 동작은 추측으로 구현하지 말고, 필요한 경우 가정을 명시합니다.
- 요청 범위를 벗어나는 리팩터링은 하지 않습니다.
- 관련 없는 파일은 수정하지 않습니다.

---

## 구현 원칙

- API 응답 타입을 명시적으로 선언합니다.
- 검색 API 타입과 상세 API 타입은 분리합니다.
- 공통 필드는 필요 시 베이스 타입으로 추출할 수 있지만, 각 응답의 책임 차이는 유지합니다.
- UI 로직과 도메인 로직을 분리합니다.
- 재사용 가능한 로직은 훅 또는 유틸로 분리합니다.
- 커스텀 훅은 테스트를 함께 작성합니다.
- 브라우저 API를 사용하는 컴포넌트는 클라이언트 컴포넌트로 작성합니다.
- 서버 컴포넌트에는 브라우저 전용 로직을 넣지 않습니다.

예시 타입 이름:

- `BookSearchItem`
- `BookSearchResponse`
- `BookDetailResponse`
- `BookLedResponse`

---

## 상태 처리 원칙

- 검색 목록 상태와 상세 조회 상태를 분리합니다.
- LED 상태는 단순 boolean 하나로만 다루지 않습니다.
- 요청 상태까지 포함해 명확한 상태로 표현합니다.

예시 상태:

- `idle`
- `loading`
- `on`
- `turningOff`
- `off`
- `error`

규칙:

- 점등 요청 중 중복 요청을 막습니다.
- 소등 요청 중 중복 요청을 막습니다.
- 자동 소등 반영 방식이 명시되어 있지 않다면, 존재하지 않는 API를 가정하지 않습니다.
- 자동 소등 UX가 필요하면 현재 프로젝트의 기존 패턴을 우선 따릅니다.

---

## UI 구현 원칙

- 검색 페이지는 목록, 페이지네이션, 검색 조건, 정렬 상태를 명확히 관리합니다.
- 검색 결과 컴포넌트는 요약 정보 렌더링에 집중합니다.
- 상세 페이지는 상세 정보와 LED 제어를 담당합니다.
- 점등 가능 상태와 소등 가능 상태를 UI에서 명확히 구분합니다.
- 로딩, 에러, 빈 결과 상태를 반드시 고려합니다.
- 이미지가 없거나 깨진 경우 fallback 처리를 고려합니다.
- 요청되지 않은 전면적인 디자인 변경은 하지 않습니다.

---

## 테스트 / 검증 정책

작업 완료 전에는 변경 범위에 맞는 최소 검증을 수행합니다.

기본 검증:

- `pnpm lint`
- `pnpm test:unit:run`

변경 성격에 따른 추가 검증:

- UI 변경 시: `pnpm storybook` 또는 관련 Storybook 렌더링 확인
- E2E 영향이 있는 경우: `pnpm test:e2e`
- API 응답 구조 / mock 변경 시: MSW 핸들러 및 관련 테스트 확인

최종 설명에는 반드시 아래를 포함합니다.

- 무엇을 변경했는지
- 무엇을 검증했는지
- 검증하지 못한 것은 무엇인지
- 어떤 가정을 두었는지

---

## 브랜치 / 커밋 정책

- 브랜치 전략은 `master ← dev ← dev-fe ← feat/fe-{기능명}`을 따릅니다.
- 기능 개발은 반드시 `dev-fe` 브랜치에서 분기한 기능 브랜치에서 진행합니다.
- 기능 브랜치명은 `feat/fe-{기능명}` 형식을 사용합니다.
- 직접 `master` 또는 `dev` 브랜치에 작업하지 않습니다.
- 커밋 메시지는 가능하면 Conventional Commits 형식을 따릅니다.

예:

- `feat/fe-도서검색`
- `feat/fe-도서상세조회`

- 하나의 커밋에는 하나의 논리적 변경만 담습니다.
- lint/test가 깨진 상태로 커밋하지 않습니다.

---

## 금지사항

- `require`, `module.exports`를 사용하지 않습니다.
- 명세에 없는 API 필드나 엔드포인트를 임의로 추가하지 않습니다.
- 자동 소등용 별도 API를 임의로 만들지 않습니다.
- 검색 API와 상세 API 응답 구조를 임의로 합치지 않습니다.
- 관련 없는 전역 설정을 요청 없이 수정하지 않습니다.
- 테스트를 삭제해서 실패를 숨기지 않습니다.
- 불필요한 의존성을 추가하지 않습니다.

---

## 완료 기준

다음 조건을 만족하면 작업 완료로 간주합니다.

- 요청한 기능 또는 수정 사항이 반영됨
- API 명세와 도메인 규칙이 유지됨
- 타입, UI, 상태 흐름이 일관됨
- 필요한 테스트, Storybook, MSW가 함께 갱신됨
- 가정, 한계, 미검증 사항이 최종 설명에 포함됨
