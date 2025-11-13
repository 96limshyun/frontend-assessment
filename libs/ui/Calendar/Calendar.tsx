"use client";

import {
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { twc } from "react-twc";

import { twx } from "@/libs/utils";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const generateCalendarMatrix = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const weeks: Array<Array<Date>> = [];
  let dayPointer = 1 - firstDayOfMonth;

  for (let week = 0; week < 6; week += 1) {
    const weekDays: Array<Date> = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = new Date(year, month, dayPointer);
      date.setHours(0, 0, 0, 0);
      weekDays.push(date);
      dayPointer += 1;
    }

    weeks.push(weekDays);
  }

  return weeks;
};

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onComplete: () => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export default function Calendar({
  selectedDate,
  onDateChange,
  onComplete,
  minDate,
  maxDate,
  className,
}: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const weeks = useMemo(
    () => generateCalendarMatrix(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const isSameDay = (dateA: Date, dateB: Date) =>
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();

  const containerClassName = twx(
    "w-[330px] rounded-[8px] border border-[#E5E5E5] shadow-[0px_4px_15px_-1px_#0000001A,0px_2px_8px_-2px_#0000001A] p-[16px] bg-[#FFFFFF]",
    className
  );

  return (
    <div className={containerClassName}>
      <Header>
        <Title>
          {currentYear}년 {currentMonth + 1}월
        </Title>
        <div className="flex items-center gap-[8px]">
          <NavButton
            type="button"
            onClick={goToPreviousMonth}
            aria-label="이전 달"
          >
            <NavIcon src="/chevron-left.svg" alt="이전 달" />
          </NavButton>
          <NavButton type="button" onClick={goToNextMonth} aria-label="다음 달">
            <NavIcon src="/chevron-right.svg" alt="다음 달" />
          </NavButton>
        </div>
      </Header>
      <CalendarTable>
        <thead>
          <TableRow>
            {WEEK_DAYS.map((day) => (
              <TableHeaderCell key={day}>{day}</TableHeaderCell>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <TableRow key={`week-${weekIndex}`}>
              {week.map((date, dayIndex) => {
                if (!date) {
                  return <EmptyCell key={`empty-${weekIndex}-${dayIndex}`} />;
                }

                const monthStart = new Date(currentYear, currentMonth, 1);
                const nextMonthStart = new Date(
                  currentYear,
                  currentMonth + 1,
                  1
                );

                const isToday = isSameDay(date, today);
                const isSelected = isSameDay(date, selectedDate);
                const isCurrentMonth =
                  date >= monthStart && date < nextMonthStart;
                const isPreviousMonth = date < monthStart;
                const isNextMonth = date >= nextMonthStart;

                const isDisabled =
                  (minDate && date < minDate) ||
                  (maxDate && date > maxDate) ||
                  isPreviousMonth;

                return (
                  <DateCell key={`${weekIndex}-${dayIndex}`}>
                    <DateButton
                      type="button"
                      isToday={isToday}
                      isSelected={isSelected}
                      isPreviousMonth={isPreviousMonth}
                      isCurrentMonth={isCurrentMonth}
                      isNextMonth={isNextMonth}
                      onClick={() => onDateChange(date)}
                      disabled={isDisabled}
                    >
                      {date.getDate()}
                    </DateButton>
                  </DateCell>
                );
              })}
            </TableRow>
          ))}
        </tbody>
      </CalendarTable>
      <CompleteButton type="button" onClick={onComplete}>
        선택 완료
      </CompleteButton>
    </div>
  );
}

const Header = twc.div`
  flex items-center justify-between w-full h-[30px] mb-[16px]
`;

const Title = twc.h2`
  text-[16px] font-semibold leading-[130%] tracking-[-0.02em] text-[#121212]
`;

const NavButton = twc.button`
  w-[32px] h-[32px] rounded-[8px] border border-[#E5E5E5] bg-[#FFFFFF]
  flex items-center justify-center cursor-pointer transition-colors
  hover:bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#121212]/20
`;

const NavIcon = twc.img`
  w-[20px] h-[20px]
`;

const CalendarTable = twc.table`
  w-full border-collapse
`;

const TableRow = twc.tr`
  text-[16px] font-semibold leading-[130%] tracking-[-0.02em] text-[#121212] text-center
`;

const TableHeaderCell = twc.th`
  text-[16px] font-semibold leading-[130%] tracking-[-0.02em] text-[#565656] pb-[12px]
`;

const DateCell = twc.td`
  text-center h-[44px] align-middle
`;

const EmptyCell = twc.td`
  h-[44px]
`;

const DateButtonBase = twc.button`
  w-[44px] h-[44px] rounded-[8px] flex items-center justify-center
  text-[18px] font-medium border border-transparent text-[#121212]
  cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#121212]/20
`;

interface DateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isToday: boolean;
  children: ReactNode;
  isSelected: boolean;
  isPreviousMonth: boolean;
  isCurrentMonth: boolean;
  isNextMonth: boolean;
  disabled: boolean;
}

function DateButton({
  isToday,
  className,
  children,
  isSelected,
  isPreviousMonth,
  isCurrentMonth,
  isNextMonth,
  disabled,
  ...props
}: DateButtonProps) {
  const states = [
    isCurrentMonth ? "text-[#121212]" : "",
    isPreviousMonth ? "text-[#E5E5E5]" : "",
    isNextMonth ? "text-[#8F8F8F]" : "",
    isToday ? "bg-[#03C124] text-[#FFFFFF] border-[#03C124] font-bold" : "",
    isSelected ? "bg-[#03C124] text-[#FFFFFF] border-[#03C124] font-bold" : "",
    disabled ? "text-[#E5E5E5] cursor-not-allowed" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DateButtonBase {...props} className={states} disabled={disabled}>
      {children}
    </DateButtonBase>
  );
}

const CompleteButton = twc.button`
  w-full h-[48px] p-[12px] mt-[16px] text-[20px] font-semibold leading-[130%] tracking-[-0.02em] text-[#FFFFFF] bg-[#03C124] rounded-[6px] cursor-pointer
`;
