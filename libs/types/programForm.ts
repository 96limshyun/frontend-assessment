import { SessionInfoSchema } from "./sectionInfo";
import { z } from "zod";
import {
  CONTENT_TITLE_MIN_LENGTH,
  CONTENT_TITLE_MAX_LENGTH,
} from "@/app/constants";

export enum ActivityType {
  ONLINE = "online",
  OFFLINE = "offline",
}

export const ProgramFormStateSchema = z.object({
  mainImage: z.instanceof(File).nullable(),
  additionalImages: z.array(z.instanceof(File)),
  categories: z.array(z.string()),
  contentTitle: z
    .string()
    .min(CONTENT_TITLE_MIN_LENGTH)
    .max(CONTENT_TITLE_MAX_LENGTH)
    .refine((value) => value.trim() !== "", {
      message: `${CONTENT_TITLE_MIN_LENGTH}자 이상 입력해주세요.`,
    }),
  activityType: z.nativeEnum(ActivityType).nullable(),
  sessionInfo: z.array(SessionInfoSchema),
});

export type ProgramFormState = z.infer<typeof ProgramFormStateSchema>;
