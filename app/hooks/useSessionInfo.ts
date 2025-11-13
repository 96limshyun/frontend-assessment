import { useState } from "react";

import { TimeInfo, SessionInfo, SessionPeriod } from "@/libs/types/sectionInfo";
import {
  addOneHour,
  convertTo24Hour,
  createDefaultSessionInfo,
  sanitizeTimeInput,
  normalizeDate,
} from "@/libs/utils/sessionTime";
import { showToast } from "@/libs/utils/toast";

interface UseSessionInfoReturn {
  sessionInfo: SessionInfo[];
  handleDeleteSession: (sessionId: string) => void;
  handleStartPeriodToggle: (
    sessionId: string,
    currentPeriod: SessionPeriod
  ) => void;
  handleStartTimeChange: (
    sessionId: string,
    field: keyof TimeInfo,
    value: string
  ) => void;
  handleStartTimeBlur: (
    sessionId: string,
    field: keyof TimeInfo,
    value: string
  ) => void;
  handleEndPeriodToggle: (
    sessionId: string,
    session: SessionInfo,
    currentPeriod: SessionPeriod
  ) => void;
  handleEndTimeChange: (
    sessionId: string,
    field: keyof TimeInfo,
    value: string
  ) => void;
  handleEndTimeBlur: (
    sessionId: string,
    session: SessionInfo,
    field: keyof TimeInfo,
    value: string
  ) => void;
  handleActivityContentChange: (sessionId: string, value: string) => void;
  handleAddSession: () => void;
  handleSessionDateChange: (sessionId: string, date: Date) => void;
  handleCompleteSessionDate: () => void;
  openedCalendarId: string | null;
  setOpenedCalendarId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useSessionInfo = (): UseSessionInfoReturn => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo[]>([
    createDefaultSessionInfo(),
  ]);

  const [openedCalendarId, setOpenedCalendarId] = useState<string | null>(null);

  const handleSessionDateChange = (sessionId: string, date: Date) => {
    setSessionInfo((prev) =>
      prev.map((item) =>
        item.sessionId === sessionId
          ? { ...item, sessionDate: normalizeDate(date) }
          : item
      )
    );
  };

  const handleCompleteSessionDate = () => {
    setOpenedCalendarId(null);
  };

  const updateSessionEndTime = (sessionId: string, endTime: TimeInfo) => {
    setSessionInfo((prev) =>
      prev.map((item) =>
        item.sessionId === sessionId
          ? { ...item, sessionTimeEnd: endTime }
          : item
      )
    );
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessionInfo((prev) =>
      prev.filter((item) => item.sessionId !== sessionId)
    );
  };

  const handleStartPeriodToggle = (
    sessionId: string,
    currentPeriod: SessionPeriod
  ) => {
    const newPeriod: SessionPeriod = currentPeriod === "오전" ? "오후" : "오전";
    setSessionInfo((prev) =>
      prev.map((item) => {
        if (item.sessionId !== sessionId) {
          return item;
        }

        const newStartTime: TimeInfo = {
          ...item.sessionTimeStart,
          period: newPeriod,
        };

        return {
          ...item,
          sessionTimeStart: newStartTime,
          sessionTimeEnd: { ...item.sessionTimeEnd, period: newPeriod },
        };
      })
    );
  };

  const handleStartTimeChange = (
    sessionId: string,
    field: keyof TimeInfo,
    value: string
  ) => {
    const sanitizedInput = sanitizeTimeInput(value);

    setSessionInfo((prev) =>
      prev.map((item) => {
        if (item.sessionId !== sessionId) {
          return item;
        }

        const newStartTime: TimeInfo = {
          ...item.sessionTimeStart,
          [field]: sanitizedInput,
        };
        const newEndTime = addOneHour(newStartTime);

        return {
          ...item,
          sessionTimeStart: newStartTime,
          sessionTimeEnd: newEndTime,
        };
      })
    );
  };

  const handleStartTimeBlur = (
    sessionId: string,
    field: keyof TimeInfo,
    value: string
  ) => {
    const sanitizedValue =
      field === "hour" || field === "minute" ? value.padStart(2, "0") : value;

    setSessionInfo((prev) =>
      prev.map((item) => {
        if (item.sessionId !== sessionId) {
          return item;
        }

        const sanitizedStartTime: TimeInfo = {
          ...item.sessionTimeStart,
          [field]: sanitizedValue,
        };

        return {
          ...item,
          sessionTimeStart: sanitizedStartTime,
          sessionTimeEnd: addOneHour(sanitizedStartTime),
        };
      })
    );
  };

  const handleEndPeriodToggle = (
    sessionId: string,
    session: SessionInfo,
    currentPeriod: SessionPeriod
  ) => {
    const newPeriod: SessionPeriod = currentPeriod === "오전" ? "오후" : "오전";
    const newEndTime: TimeInfo = {
      ...session.sessionTimeEnd,
      period: newPeriod,
    };

    const startMinutes = convertTo24Hour(session.sessionTimeStart);
    const endMinutes = convertTo24Hour(newEndTime);

    if (endMinutes <= startMinutes) {
      showToast("시작 시간보다 종료시간은 빠를 수 없습니다.");
      updateSessionEndTime(sessionId, addOneHour(session.sessionTimeStart));
      return;
    }

    updateSessionEndTime(sessionId, newEndTime);
  };

  const handleEndTimeChange = (
    sessionId: string,
    field: keyof TimeInfo,
    value: string
  ) => {
    const sanitizedInput = sanitizeTimeInput(value);

    setSessionInfo((prev) =>
      prev.map((item) =>
        item.sessionId === sessionId
          ? {
              ...item,
              sessionTimeEnd: {
                ...item.sessionTimeEnd,
                [field]: sanitizedInput,
              },
            }
          : item
      )
    );
  };

  const handleEndTimeBlur = (
    sessionId: string,
    session: SessionInfo,
    field: keyof TimeInfo,
    value: string
  ) => {
    const sanitizedValue =
      field === "hour" || field === "minute" ? value.padStart(2, "0") : value;

    const newEndTime: TimeInfo = {
      ...session.sessionTimeEnd,
      [field]: sanitizedValue,
    };

    const startMinutes = convertTo24Hour(session.sessionTimeStart);
    const endMinutes = convertTo24Hour(newEndTime);

    if (endMinutes <= startMinutes) {
      showToast("시작 시간보다 종료시간은 빠를 수 없습니다.");
      updateSessionEndTime(sessionId, addOneHour(session.sessionTimeStart));
      return;
    }

    updateSessionEndTime(sessionId, newEndTime);
  };

  const handleActivityContentChange = (sessionId: string, value: string) => {
    setSessionInfo((prev) =>
      prev.map((item) =>
        item.sessionId === sessionId
          ? { ...item, activityContent: value }
          : item
      )
    );
  };

  const handleAddSession = () => {
    setSessionInfo((prev) => [...prev, createDefaultSessionInfo()]);
  };

  return {
    sessionInfo,
    handleDeleteSession,
    handleStartPeriodToggle,
    handleStartTimeChange,
    handleStartTimeBlur,
    handleEndPeriodToggle,
    handleEndTimeChange,
    handleEndTimeBlur,
    handleActivityContentChange,
    handleAddSession,
    handleSessionDateChange,
    handleCompleteSessionDate,
    openedCalendarId,
    setOpenedCalendarId,
  };
};
