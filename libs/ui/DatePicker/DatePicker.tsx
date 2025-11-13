"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { twc } from "react-twc";

import { Calendar } from "@/libs/ui/Calendar";
import { twx } from "@/libs/utils";
import { formatSessionDate } from "@/libs/utils/sessionTime";

interface DatePickerContextValue {
  isOpen: boolean;
  selectedDate: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateChange: (date: Date) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  onComplete?: () => void;
}

const DatePickerContext = createContext<DatePickerContextValue | null>(null);

const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error("DatePicker compound components must be used within Root");
  }

  return context;
};

interface DatePickerRootProps {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  onComplete?: () => void;
  className?: string;
}

const DatePickerRoot = ({
  children,
  isOpen,
  onOpenChange,
  selectedDate,
  onChange,
  minDate,
  maxDate,
  onComplete,
  className,
}: DatePickerRootProps) => {
  const open = useCallback(() => onOpenChange(true), [onOpenChange]);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const toggle = useCallback(
    () => onOpenChange(!isOpen),
    [isOpen, onOpenChange]
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      selectedDate,
      minDate,
      maxDate,
      onDateChange: onChange,
      open,
      close,
      toggle,
      onComplete,
    }),
    [
      isOpen,
      selectedDate,
      minDate,
      maxDate,
      onChange,
      open,
      close,
      toggle,
      onComplete,
    ]
  );

  return (
    <DatePickerContext.Provider value={contextValue}>
      <div className={twx("relative w-full", className)}>{children}</div>
    </DatePickerContext.Provider>
  );
};

const Label = twc.label`
  text-[18px] leading-[130%] tracking-[-0.02em] text-[#121212]
`;

interface TriggerProps {
  children: ReactNode;
  className?: string;
}

const TriggerButton = twc.button`
  w-full flex justify-around items-center h-[60px] text-[20px]
  rounded-[8px] border border-[#E5E5E5] bg-white py-[8px]
  cursor-pointer hover:bg-[#F5F5F5] transition-colors
`;

const Trigger = ({ children, className }: TriggerProps) => {
  const { toggle, isOpen } = useDatePickerContext();

  return (
    <TriggerButton
      type="button"
      onClick={toggle}
      aria-expanded={isOpen}
      className={className}
    >
      {children}
    </TriggerButton>
  );
};

interface ContentProps {
  children: ReactNode;
  className?: string;
}

const ContentWrapper = twc.div`
  absolute right-0 top-full z-10
  flex justify-end md:justify-start
  shadow-[0px_12px_32px_rgba(0,0,0,0.08)]
`;

const Content = ({ children, className }: ContentProps) => {
  const { isOpen } = useDatePickerContext();

  if (!isOpen) {
    return null;
  }

  return (
    <ContentWrapper
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={className}
    >
      {children}
    </ContentWrapper>
  );
};

interface SelectedDateTextProps {
  date: Date | null;
  placeholder: string;
}

const SelectedDateText = ({ date, placeholder }: SelectedDateTextProps) => {
  return (
    <span className={twx("text-[20px]", !date && "text-[#8F8F8F]")}>
      {date ? formatSessionDate(date) : placeholder}
    </span>
  );
};

interface CalendarProps {
  className?: string;
}

const DatePickerCalendar = ({ className }: CalendarProps) => {
  const { selectedDate, minDate, maxDate, onDateChange, close, onComplete } =
    useDatePickerContext();

  return (
    <Calendar
      selectedDate={selectedDate}
      minDate={minDate}
      maxDate={maxDate}
      onDateChange={onDateChange}
      onComplete={() => {
        onComplete?.();
        close();
      }}
      className={className}
    />
  );
};

const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  Label,
  Trigger,
  Content,
  Calendar: DatePickerCalendar,
  SelectedDateText,
});

export default DatePicker;
