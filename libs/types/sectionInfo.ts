export type SessionPeriod = "오전" | "오후";

import { z } from "zod";
import {
  ACTIVITY_CONTENT_MIN_LENGTH,
  ACTIVITY_CONTENT_MAX_LENGTH,
} from "@/app/constants";

export const TimeInfoSchema = z.object({
  period: z.enum(["오전", "오후"]),
  hour: z.string(),
  minute: z.string(),
});

export const SessionInfoSchema = z.object({
  sessionId: z.string(),
  sessionDate: z.date().nullable(),
  sessionTimeStart: TimeInfoSchema,
  sessionTimeEnd: TimeInfoSchema,
  activityContent: z
    .string()
    .min(ACTIVITY_CONTENT_MIN_LENGTH, {
      message: `활동 내용은 ${ACTIVITY_CONTENT_MIN_LENGTH}자 이상 입력해주세요.`,
    })
    .max(ACTIVITY_CONTENT_MAX_LENGTH, {
      message: `활동 내용은 ${ACTIVITY_CONTENT_MAX_LENGTH}자 이하로 입력해주세요.`,
    })
    .refine((value) => value.trim() !== "", {
      message: `활동 내용을 입력해주세요.`,
    }),
});

export type SessionInfo = z.infer<typeof SessionInfoSchema>;
