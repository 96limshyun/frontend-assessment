import { DatePicker } from "@/libs/ui";

import { DatePickerField } from "@/app/components/SessionInfoSection/styles";

interface SessionDateFieldProps {
  date: Date | null;
  selectedDate: Date;
  minDate?: Date;
  maxDate?: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDateChange: (date: Date) => void;
  onComplete: () => void;
}

const SessionDateField = ({
  date,
  selectedDate,
  minDate,
  maxDate,
  isOpen,
  onOpenChange,
  onDateChange,
  onComplete,
}: SessionDateFieldProps) => {
  return (
    <DatePickerField>
      <DatePicker.Label>날짜 선택</DatePicker.Label>
      <DatePicker.Root
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedDate={selectedDate}
        onChange={onDateChange}
        minDate={minDate}
        maxDate={maxDate}
        onComplete={onComplete}
        className="flex-1"
      >
        <DatePicker.Trigger>
          <DatePicker.SelectedDateText
            date={date}
            placeholder="날짜를 선택해주세요"
          />
        </DatePicker.Trigger>
        <DatePicker.Content>
          <DatePicker.Calendar />
        </DatePicker.Content>
      </DatePicker.Root>
    </DatePickerField>
  );
};

export default SessionDateField;

