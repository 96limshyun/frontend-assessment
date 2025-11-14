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
import { showToast, splitTextIntoParagraphs } from "@/libs/utils";
import type { FieldErrors } from "react-hook-form";

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
  handleActivityContentChange: (sessionInfo: SessionInfo[]) => void;
  onSubmit: () => void;
  onError: (errors: FieldErrors<ProgramFormState>) => void;
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
      setValue("contentTitle", contentTitle, {
        shouldValidate: true,
        shouldDirty: true,
      });
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

  const handleActivityContentChange = useCallback(
    (sessionInfo: SessionInfo[]) => {
      setValue("sessionInfo", sessionInfo, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue]
  );

  const onSubmit = () => {
    showToast("콘텐츠가 등록되었어요");
  };

  const onError = (errors: FieldErrors<ProgramFormState>) => {
    const messages = [
      errors.contentTitle?.message,
      ...(Array.isArray(errors.sessionInfo)
        ? errors.sessionInfo
            .map(
              (activity, index) =>
                activity?.activityContent?.message &&
                `${index + 1}. ${activity.activityContent.message}`
            )
            .filter(Boolean)
        : []),
    ].filter((m): m is string => !!m);

    if (messages.length > 0) {
      showToast(splitTextIntoParagraphs(messages.join("\n"), "\n"));
    } else {
      showToast("입력 정보를 확인해주세요.");
    }
  };

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
    handleActivityContentChange,
    onSubmit,
    onError,
  };
};
