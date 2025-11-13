import { SessionInfo } from "./sectionInfo";

export type ActivityType = "online" | "offline";

export interface ProgramFormState {
  mainImage: File | null;
  additionalImages: File[];
  categories: string[];
  contentTitle: string;
  activityType: ActivityType | null;
  sessionInfo: SessionInfo[];
}