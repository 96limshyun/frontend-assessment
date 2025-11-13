## 프로젝트 개요

Next.js 16 기반의 `frontend-assessment`는 프로그램(클래스/콘텐츠) 등록 흐름을 설계하는 과제를 위해 만들어진 싱글 페이지 애플리케이션입니다. 메인 화면에서 대표 이미지와 추가 이미지 업로드, 카테고리 선택, 콘텐츠 제목 입력, 활동 방식(온라인/오프라인) 설정, 회차별 상세 정보 입력을 순차적으로 진행할 수 있도록 UI와 상태 관리 로직이 구성돼 있습니다.

본 문서는 과제 평가자가 프로젝트 구조와 핵심 구현 포인트를 빠르게 이해하고, 실행/확장에 필요한 정보를 제공하기 위해 작성되었습니다.

## 기술 스택

- Next.js 16(App Router) & React 19
- TypeScript 5
- Tailwind CSS 4(alpha) with `react-twc` + `tailwind-merge`
- 상태 관리: React hooks(`useState`, `useMemo`, `useCallback`) 기반 로컬 상태
- UI 유틸: `overlay-kit`를 이용한 토스트, `vaul` 기반 Bottom Sheet
- 기타: `uuid`(session id 생성), `class-variance-authority`와 `clsx`(스타일 분기)

## 실행 방법

```bash
npm install
npm dev      # http://localhost:3000

```

## 디렉터리 구조 하이라이트

```
app/
  page.tsx                  # 화면 엔트리. 모든 섹션을 조합해 레이아웃 구성
  layout.tsx                # Next.js 루트 레이아웃
  globals.css               # Tailwind CSS 초기화 및 전역 스타일
  components/               # 화면을 구성하는 도메인 컴포넌트
  hooks/                    # 프로그램/회차 상태 관리용 커스텀 훅
  constants/                # UX 제약(길이, 선택 제한 등) 및 초기 상태

libs/
  ui/                       # 재사용 가능한 디자인 시스템 레벨 UI 컴포넌트
  utils/                    # 텍스트/시간 처리, 토스트 등 비즈니스 유틸
  types/                    # `ProgramFormState`, `SessionInfo` 등 타입 선언
```

> 위 구조는 Next.js(App Router)에서 권장하는 `app/` 중심 라우팅 구조와 공용 모듈 분리를 그대로 따릅니다.

### `app/` 도메인 로직

- `page.tsx`: 폼 상태를 조합해 화면을 렌더링하는 엔트리.
- `components/`: 이미지 업로드, 카테고리, 제목, 활동 방식, 회차 입력 등 주요 폼 섹션.
- `hooks/`: `useProgramForm`, `useSessionInfo`, `useSessionDateLimits`로 폼 상태와 날짜/시간 규칙 처리.
- `constants/index.ts`: 길이·개수 제한과 초기 상태 정의.

### `libs/` 재사용 레이어

- `libs/ui`: 헤더, 섹션 카드, 업로드 카드, 토글, 바텀시트, 캘린더, 토스트 등 공통 컴포넌트.
- `libs/utils`: 회차 시간 계산, 토스트 호출, 텍스트 분리 같은 헬퍼 함수.
- `libs/types`: `ProgramFormState`, `SessionInfo` 등의 타입 선언.

## 과제 요구사항 체크리스트

- [x] 대표 이미지 1장 업로드 컴포넌트
- [x] 추가 이미지 최대 4장 업로드 및 관리
- [x] 카테고리 선택(최대 2개, 초과 시 토스트 안내)
- [x] 콘텐츠 제목 8~80자 입력 및 길이 검증
- [x] 활동 방식(온라인/오프라인) 토글
- [x] 회차별 일정/내용 입력 카드 + 회차 추가/삭제
- [x] 회차 날짜 순서 제약 및 캘린더 입력
- [x] 시간 입력 자동 보정(시작/종료)과 검증
- [x] 회차 활동 내용 최소/최대 길이 설정
- [x] 모바일 하단 고정 Next 버튼(카테고리 선택 시 활성화)

## 문의

과제 리뷰 중 궁금한 점이 있으시면, 과제 제출 안내에 포함된 메일로 문의해 주세요.

