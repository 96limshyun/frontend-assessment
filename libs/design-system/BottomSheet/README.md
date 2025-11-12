# BottomSheet

컴파운드 패턴을 사용한 BottomSheet 컴포넌트입니다. Vaul 라이브러리를 기반으로 만들어졌습니다.

## 기본 사용법

```tsx
import { BottomSheet } from "@/libs/design-system";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <BottomSheet.Root open={open} onOpenChange={setOpen}>
      <BottomSheet.Trigger asChild>
        <button>BottomSheet 열기</button>
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <BottomSheet.Header 
          title="제목" 
          onClose={() => setOpen(false)} 
        />
        <div className="p-4">
          <p>여기에 내용을 넣으세요</p>
        </div>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
```

## 컴포넌트 구조

### BottomSheet.Root

BottomSheet의 최상위 컨테이너입니다.

**Props:**
- `open?: boolean` - BottomSheet의 열림/닫힘 상태
- `onOpenChange?: (open: boolean) => void` - 상태 변경 핸들러
- `defaultOpen?: boolean` - 초기 열림 상태

### BottomSheet.Trigger

BottomSheet를 여는 트리거 버튼입니다.

**Props:**
- `asChild?: boolean` - 자식 요소를 트리거로 사용 (기본: false)
- `className?: string` - 추가 스타일

### BottomSheet.Content

BottomSheet의 메인 컨텐츠 영역입니다.

**Props:**
- `className?: string` - 추가 스타일

### BottomSheet.Header

BottomSheet 헤더 영역입니다. 왼쪽에 닫기 버튼, 중앙에 제목이 표시됩니다.

**Props:**
- `title?: string` - 헤더 중앙에 표시될 제목
- `onClose?: () => void` - 닫기 버튼 클릭 핸들러
- `className?: string` - 추가 스타일

### BottomSheet.Overlay

오버레이 컴포넌트입니다. (일반적으로 Content 내부에서 자동으로 렌더링됩니다)

**Props:**
- `className?: string` - 추가 스타일

## 고급 사용법

### 헤더 없이 사용

```tsx
<BottomSheet.Root open={open} onOpenChange={setOpen}>
  <BottomSheet.Trigger asChild>
    <button>열기</button>
  </BottomSheet.Trigger>

  <BottomSheet.Content>
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">커스텀 헤더</h2>
      <p>내용...</p>
    </div>
  </BottomSheet.Content>
</BottomSheet.Root>
```

### 커스텀 스타일링

```tsx
<BottomSheet.Content className="max-h-[80vh]">
  <BottomSheet.Header 
    title="설정" 
    onClose={() => setOpen(false)}
    className="bg-gray-50"
  />
  <div className="p-4">
    내용...
  </div>
</BottomSheet.Content>
```

### 제어되지 않는 컴포넌트로 사용

```tsx
<BottomSheet.Root defaultOpen={false}>
  <BottomSheet.Trigger asChild>
    <button>열기</button>
  </BottomSheet.Trigger>

  <BottomSheet.Content>
    <BottomSheet.Header title="제목" />
    <div className="p-4">내용</div>
  </BottomSheet.Content>
</BottomSheet.Root>
```

## 스타일 커스터마이징

모든 컴포넌트는 `className` prop을 통해 스타일을 커스터마이징할 수 있습니다.

```tsx
<BottomSheet.Content className="rounded-t-[24px] shadow-2xl">
  <BottomSheet.Header 
    title="제목" 
    className="border-b-2 border-blue-500"
  />
</BottomSheet.Content>
```

