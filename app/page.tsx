"use client";

import { Header, SectionLayout, NextButton } from "@/libs/ui";
import {
  AdditionalImagesUpload,
  MainImageUpload,
  CategorySection,
  ContentTitleSection,
  ActivityTypeSection,
  SessionInfoSection,
} from "@/app/components";
import { useProgramForm } from "@/app/hooks/useProgramForm";
import type { ProgramFormState } from "@/libs/types/programForm";

export default function Home() {
  const {
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
  } = useProgramForm();

  const onSubmit = (data: ProgramFormState) => {
    console.log("Form submitted:", data);
    // 여기에 폼 제출 로직 추가
  };

  const onError = (errors: unknown) => {
    console.log("Form errors:", errors);
    // 에러 처리 로직 추가
  };

  return (
    <>
      <Header
        selectedCategories={programFormState.categories}
        onClick={handleNextClick}
      />
      <SectionLayout
        leftTop={
          <MainImageUpload
            mainImage={programFormState.mainImage}
            setMainImage={handleMainImageChange}
          />
        }
        leftBottom={
          <AdditionalImagesUpload
            additionalImages={programFormState.additionalImages}
            onChange={handleAdditionalImagesChange}
          />
        }
        right={
          <div className="flex flex-col pb-[93px] md:pb-0">
            <CategorySection
              open={categoriesOpen}
              setOpen={setCategoriesOpen}
              selectedCategories={programFormState.categories}
              onChange={handleCategoriesChange}
            />
            <ContentTitleSection
              contentTitle={programFormState.contentTitle}
              onChange={handleContentTitleChange}
              contentError={formState.errors.contentTitle}
            />
            <ActivityTypeSection
              activityType={programFormState.activityType}
              onChange={handleActivityTypeChange}
            />
            <SessionInfoSection
              onChange={handleSessionInfoChange}
              sessionInfoContentError={formState.errors.sessionInfo}
            />
          </div>
        }
      />

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-5 py-[10px] z-100">
        <NextButton
          isEnabled={isCategoriesSelected}
          onClick={handleSubmit(onSubmit, onError)}
          variant="bottom"
        />
      </div>
    </>
  );
}
