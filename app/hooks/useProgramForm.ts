"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { INITIAL_PROGRAM_FORM_STATE } from "@/app/constants";
import type { ProgramFormState, ActivityType } from "@/libs/types/programForm";
import type { SessionInfo } from "@/libs/types/sectionInfo";

interface UseProgramFormReturn {
  programFormState: ProgramFormState;
  categoriesOpen: boolean;
  setCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [programFormState, setProgramFormState] =
    useState<ProgramFormState>(initialState);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const isCategoriesSelected = useMemo(
    () => programFormState.categories.length > 0,
    [programFormState.categories]
  );

  const handleNextClick = useCallback(() => {
    if (isCategoriesSelected) {
      setCategoriesOpen(false);
    }
  }, [isCategoriesSelected]);

  const handleMainImageChange = useCallback((image: File | null) => {
    setProgramFormState((prev) => ({ ...prev, mainImage: image }));
  }, []);

  const handleAdditionalImagesChange = useCallback((images: File[]) => {
    setProgramFormState((prev) => ({ ...prev, additionalImages: images }));
  }, []);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setProgramFormState((prev) => ({ ...prev, categories }));
  }, []);

  const handleContentTitleChange = useCallback((contentTitle: string) => {
    setProgramFormState((prev) => ({ ...prev, contentTitle }));
  }, []);

  const handleActivityTypeChange = useCallback((activityType: ActivityType) => {
    setProgramFormState((prev) => ({ ...prev, activityType }));
  }, []);

  const handleSessionInfoChange = useCallback((sessionInfo: SessionInfo[]) => {
    setProgramFormState((prev) => ({ ...prev, sessionInfo }));
  }, []);

  return {
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

