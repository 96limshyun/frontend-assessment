"use client";

import { useMemo } from "react";

import { SessionInfo } from "@/libs/types/sectionInfo";
import { addDays, normalizeDate } from "@/libs/utils/sessionTime";

export interface SessionDateLimit {
  minDate?: Date;
  maxDate?: Date;
}

export const useSessionDateLimits = (
  sessions: SessionInfo[],
  today: Date
): SessionDateLimit[] =>
  useMemo(
    () =>
      sessions.map((_, index) => {
        const previousSessionDate =
          index > 0 ? sessions[index - 1]?.sessionDate : null;
        const nextSessionDate =
          index < sessions.length - 1 ? sessions[index + 1]?.sessionDate : null;

        const minDate = previousSessionDate
          ? addDays(previousSessionDate, 1)
          : today;
        const maxDate = nextSessionDate
          ? addDays(nextSessionDate, -1)
          : undefined;

        return {
          minDate: minDate ? normalizeDate(minDate) : undefined,
          maxDate: maxDate ? normalizeDate(maxDate) : undefined,
        };
      }),
    [sessions, today]
  );
