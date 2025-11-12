import {
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { twc } from "react-twc";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const generateCalendarMatrix = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: Array<Array<Date | null>> = [];
  let currentDay = 1;

  for (let week = 0; week < 6; week += 1) {
    const weekDays: Array<Date | null> = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      if (week === 0 && dayIndex < firstDayOfMonth) {
        weekDays.push(null);
      } else if (currentDay > daysInMonth) {
        weekDays.push(null);
      } else {
        weekDays.push(new Date(year, month, currentDay));
        currentDay += 1;
      }
    }

    weeks.push(weekDays);
  }

  return weeks;
};

export default function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);

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

  return (
    <CalendarContainer>
      <Header>
        <NavButton
          type="button"
          onClick={goToPreviousMonth}
          aria-label="이전 달"
        >
          <NavIcon src="/chevron-left.svg" alt="이전 달" />
        </NavButton>
        <Title>
          {currentYear}년 {currentMonth + 1}월
        </Title>
        <NavButton type="button" onClick={goToNextMonth} aria-label="다음 달">
          <NavIcon src="/chevron-right.svg" alt="다음 달" />
        </NavButton>
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

                const isToday = isSameDay(date, today);
                const isSelected = isSameDay(date, selectedDate);

                return (
                  <DateCell key={date.toISOString()}>
                    <DateButton
                      type="button"
                      isToday={isToday}
                      isSelected={isSelected}
                      onClick={() => setSelectedDate(date)}
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
    </CalendarContainer>
  );
}

const CalendarContainer = twc.div`
  w-[330px] h-[370px] rounded-[8px] border border-[#E5E5E5] shadow-[0px_4px_15px_-1px_#0000001A,0px_2px_8px_-2px_#0000001A] p-[16px] bg-[#FFFFFF]
  absolute top-full left-1/2 z-100 -translate-x-1/2
`;

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

const TableRow = twc.tr``;

const TableHeaderCell = twc.th`
  text-[13px] font-semibold text-[#565656] pb-[12px]
`;

const DateCell = twc.td`
  text-center h-[44px] align-middle
`;

const EmptyCell = twc.td`
  h-[44px]
`;

const DateButtonBase = twc.button`
  w-[44px] h-[44px] rounded-[8px] flex items-center justify-center
  text-[14px] font-medium transition-colors border border-transparent text-[#121212]
  cursor-pointer hover:bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#121212]/20
`;

interface DateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isToday: boolean;
  isSelected: boolean;
  children: ReactNode;
}

function DateButton({
  isToday,
  isSelected,
  className,
  children,
  ...props
}: DateButtonProps) {
  const states = [
    isToday ? "border-[#121212]" : "",
    isSelected ? "bg-[#00B564] text-[#FFFFFF] border-[#00B564]" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DateButtonBase {...props} className={states}>
      {children}
    </DateButtonBase>
  );
}
