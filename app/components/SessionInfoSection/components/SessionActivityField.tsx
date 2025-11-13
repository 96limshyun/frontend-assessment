import { TextArea } from "@/libs/ui";

interface SessionActivityFieldProps {
  value: string;
  minLength: number;
  maxLength: number;
  onChange: (value: string) => void;
}

const SessionActivityField = ({
  value,
  minLength,
  maxLength,
  onChange,
}: SessionActivityFieldProps) => {
  return (
    <TextArea.Root>
      <TextArea.Input
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        placeholder="활동 내용을 간단히 입력해주세요"
        onChange={onChange}
      />
      <TextArea.Footer>
        {value.length > 0 && value.length < minLength && (
          <TextArea.Error minLength={minLength} />
        )}
      </TextArea.Footer>
    </TextArea.Root>
  );
};

export default SessionActivityField;
