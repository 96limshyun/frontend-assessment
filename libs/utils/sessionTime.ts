import { TimeInfo } from "@/libs/types/sectionInfo";
import { v4 as uuidv4 } from "uuid";
import { SessionInfo } from "@/libs/types/sectionInfo";

export const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export const addDays = (date: Date, days: number): Date => {
  const base = normalizeDate(date);
  const result = new Date(base);
  result.setDate(base.getDate() + days);
  return result;
};

export const convertTo24Hour = (time: TimeInfo): number => {
  const hour = parseInt(time.hour, 10);
  const minute = parseInt(time.minute, 10);

  if (time.period === "오후" && hour !== 12) {
    return (hour + 12) * 60 + minute;
  }

  if (time.period === "오전" && hour === 12) {
    return minute;
  }

  return hour * 60 + minute;
};

export const convertTo12Hour = (totalMinutes: number): TimeInfo => {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  let period: TimeInfo["period"] = "오전";
  let hour12 = hour24;

  if (hour24 >= 12) {
    period = "오후";
    if (hour24 > 12) {
      hour12 = hour24 - 12;
    }
  } else if (hour24 === 0) {
    hour12 = 12;
  }

  return {
    period,
    hour: hour12.toString().padStart(2, "0"),
    minute: minute.toString().padStart(2, "0"),
  };
};

export const addOneHour = (time: TimeInfo): TimeInfo => {
  const totalMinutes = convertTo24Hour(time);
  const newTotalMinutes = (totalMinutes + 60) % 1440;
  return convertTo12Hour(newTotalMinutes);
};

export const createDefaultSessionInfo = (): SessionInfo => ({
  sessionId: uuidv4(),
  sessionDate: null,
  sessionTimeStart: {
    period: "오전",
    hour: "10",
    minute: "00",
  },
  sessionTimeEnd: {
    period: "오전",
    hour: "11",
    minute: "00",
  },
  activityContent: "",
});

export const sanitizeTimeInput = (value: string) =>
  value.replace(/\D/g, "").slice(0, 2);

export const formatSessionDate = (date: Date | null) => {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
