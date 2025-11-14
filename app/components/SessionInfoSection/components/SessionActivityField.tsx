import { TextArea } from "@/libs/ui";
import type { FieldError } from "react-hook-form";
interface SessionActivityFieldProps {
  value: string;
  minLength: number;
  maxLength: number;
  onChange: (value: string) => void;
  activityContentError?: FieldError;
}

const SessionActivityField = ({
  value,
  minLength,
  maxLength,
  onChange,
  activityContentError,
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
        {activityContentError && (
          <TextArea.Error>{activityContentError.message}</TextArea.Error>
        )}
      </TextArea.Footer>
    </TextArea.Root>
  );
};

export default SessionActivityField;
