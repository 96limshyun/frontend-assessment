import { ChangeEvent } from "react";

import { TimeRangeForm } from "@/libs/ui";
import type { TimeInfo } from "@/libs/types/sectionInfo";

export type TimeFieldKey = Extract<keyof TimeInfo, "hour" | "minute">;

interface SessionTimeFieldProps {
  label: string;
  time: TimeInfo;
  onPeriodToggle: () => void;
  onTimeChange: (field: TimeFieldKey, value: string) => void;
  onTimeBlur: (field: TimeFieldKey, value: string) => void;
}

const SessionTimeField = ({
  label,
  time,
  onPeriodToggle,
  onTimeChange,
  onTimeBlur,
}: SessionTimeFieldProps) => {
  const handleChange =
    (field: TimeFieldKey) => (event: ChangeEvent<HTMLInputElement>) =>
      onTimeChange(field, event.target.value);
  const handleBlur =
    (field: TimeFieldKey) => (event: ChangeEvent<HTMLInputElement>) =>
      onTimeBlur(field, event.target.value);

  return (
    <TimeRangeForm.Field>
      <TimeRangeForm.Label>{label}</TimeRangeForm.Label>
      <TimeRangeForm.TimeGroup>
        <TimeRangeForm.PeriodButton onClick={onPeriodToggle}>
          {time.period}
        </TimeRangeForm.PeriodButton>
        <TimeRangeForm.TimeInput
          value={time.hour}
          min={0}
          max={12}
          onChange={handleChange("hour")}
          onBlur={handleBlur("hour")}
        />
        <TimeRangeForm.TimeSeparator>:</TimeRangeForm.TimeSeparator>
        <TimeRangeForm.TimeInput
          value={time.minute}
          min={0}
          max={59}
          onChange={handleChange("minute")}
          onBlur={handleBlur("minute")}
        />
      </TimeRangeForm.TimeGroup>
    </TimeRangeForm.Field>
  );
};

export default SessionTimeField;
