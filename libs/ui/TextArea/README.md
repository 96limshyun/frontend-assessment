# TextArea 컴포넌트

컴파운드 패턴을 사용한 유연한 TextArea 컴포넌트입니다.

## 기본 사용법

```tsx
import { TextArea } from "@/libs/ui";

function Example() {
  const [value, setValue] = useState("");

  return (
    <TextArea.Root>
      <TextArea.Input
        value={value}
        onChange={setValue}
        placeholder="내용을 입력해주세요"
      />
    </TextArea.Root>
  );
}
```

## 에러 메시지와 함께 사용

```tsx
import { TextArea } from "@/libs/ui";

function Example() {
  const [value, setValue] = useState("");
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 80;

  return (
    <TextArea.Root>
      <TextArea.Input
        value={value}
        onChange={setValue}
        minLength={MIN_LENGTH}
        maxLength={MAX_LENGTH}
        placeholder="제목을 입력해주세요"
        className="h-[138px]"
        counterLabel="최소 8자"
      />
      <TextArea.Footer>
        {value.length > 0 && value.length < MIN_LENGTH && (
          <TextArea.Error minLength={MIN_LENGTH} />
        )}
      </TextArea.Footer>
    </TextArea.Root>
  );
}
```

## 컴포넌트 구조

### TextArea.Root
전체 컨테이너 컴포넌트

### TextArea.Input
실제 textarea 입력 필드

**Props:**
- `value: string` - 입력 값 (필수)
- `onChange: (value: string) => void` - 값 변경 핸들러 (필수)
- `minLength?: number` - 최소 길이 (기본값: 0)
- `maxLength?: number` - 최대 길이 (기본값: Infinity)
- `counterLabel?: string` - 카운터 라벨 (기본값: "필수")
- `showCounter?: boolean` - 카운터 표시 여부 (기본값: true)
- `error?: boolean` - 외부 에러 상태
- `onValidationChange?: (isValid: boolean) => void` - 검증 상태 변경 콜백
- `className?: string` - 추가 스타일
- `placeholder?: string` - placeholder 텍스트

### TextArea.Footer
하단 영역 (에러 메시지 표시용)

### TextArea.Error
에러 메시지 컴포넌트

**Props:**
- `children?: React.ReactNode` - 커스텀 에러 메시지
- `minLength?: number` - 최소 길이 (기본 메시지에 사용)

### TextArea.Counter
글자 수 카운터 (Input 내부에 자동 표시됨)


