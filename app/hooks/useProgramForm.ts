"use client";

import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { INITIAL_PROGRAM_FORM_STATE } from "@/app/constants";
import type { ProgramFormState } from "@/libs/types/programForm";
import type { SessionInfo } from "@/libs/types/sectionInfo";

import {
  useForm,
  useWatch,
  type Control,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
  type FormState,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProgramFormStateSchema, ActivityType } from "@/libs/types/programForm";

interface UseProgramFormReturn {
  register: UseFormRegister<ProgramFormState>;
  control: Control<ProgramFormState>;
  setValue: UseFormSetValue<ProgramFormState>;
  watch: UseFormWatch<ProgramFormState>;
  handleSubmit: UseFormHandleSubmit<ProgramFormState>;
  formState: FormState<ProgramFormState>;
  programFormState: ProgramFormState;
  categoriesOpen: boolean;
  setCategoriesOpen: Dispatch<SetStateAction<boolean>>;
  isCategoriesSelected: boolean;
  handleNextClick: () => void;
  handleMainImageChange: (image: File | null) => void;
  handleAdditionalImagesChange: (images: File[]) => void;
  handleCategoriesChange: (categories: string[]) => void;
  handleContentTitleChange: (contentTitle: string) => void;
  handleActivityTypeChange: (activityType: ActivityType) => void;
  handleSessionInfoChange: (sessionInfo: SessionInfo[]) => void;
}

export const useProgramForm = (
  initialState: ProgramFormState = INITIAL_PROGRAM_FORM_STATE
): UseProgramFormReturn => {
  const { register, control, setValue, watch, handleSubmit, formState } =
    useForm<ProgramFormState>({
      resolver: zodResolver(ProgramFormStateSchema),
      defaultValues: initialState,
      mode: "onChange",
    });
  const programFormState = useWatch<ProgramFormState>({
    control,
    defaultValue: initialState,
  }) as ProgramFormState;

  const categories = useWatch<ProgramFormState, "categories">({
    control,
    name: "categories",
    defaultValue: initialState.categories,
  }) as string[];
  const isCategoriesSelected = categories ? categories.length > 0 : false;

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleNextClick = useCallback(() => {
    if (isCategoriesSelected) {
      setCategoriesOpen(false);
    }
  }, [isCategoriesSelected]);

  const handleMainImageChange = useCallback(
    (image: File | null) => {
      setValue("mainImage", image);
    },
    [setValue]
  );

  const handleAdditionalImagesChange = useCallback(
    (images: File[]) => {
      setValue("additionalImages", images);
    },
    [setValue]
  );

  const handleCategoriesChange = useCallback(
    (categories: string[]) => {
      setValue("categories", categories);
    },
    [setValue]
  );

  const handleContentTitleChange = useCallback(
    (contentTitle: string) => {
      setValue("contentTitle", contentTitle);
    },
    [setValue]
  );

  const handleActivityTypeChange = useCallback(
    (activityType: ActivityType) => {
      setValue("activityType", activityType);
    },
    [setValue]
  );

  const handleSessionInfoChange = useCallback(
    (sessionInfo: SessionInfo[]) => {
      setValue("sessionInfo", sessionInfo);
    },
    [setValue]
  );

  return {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState,
    programFormState,
    categoriesOpen,
    setCategoriesOpen,
    isCategoriesSelected,
    handleNextClick,
    handleMainImageChange,
    handleAdditionalImagesChange,
    handleCategoriesChange,
    handleContentTitleChange,
    handleActivityTypeChange,
    handleSessionInfoChange,
  };
};
