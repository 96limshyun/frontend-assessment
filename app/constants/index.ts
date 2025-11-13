import { ProgramFormState } from "@/libs/types/programForm";

export const ACTIVITY_CONTENT_MIN_LENGTH = 8;
export const ACTIVITY_CONTENT_MAX_LENGTH = 800;

export const MAX_ADDITIONAL_IMAGES = 4;

export const CATEGORIES = [
  "용돈 벌기",
  "디지털",
  "그림",
  "글쓰기/독서",
  "건강/운동",
  "동기부여/성장",
  "취미힐링",
  "외국어",
];
export const MAX_SELECTED_CATEGORIES = 2;

export const CONTENT_TITLE_MIN_LENGTH = 8;
export const CONTENT_TITLE_MAX_LENGTH = 80;


export const INITIAL_PROGRAM_FORM_STATE: ProgramFormState = {
  mainImage: null,
  additionalImages: [],
  categories: [],
  contentTitle: "",
  activityType: null,
  sessionInfo: [],
};