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

export default function Home() {
  const {
    handleSubmit,
    formState,
    programFormState,
    categoriesOpen,
    setCategoriesOpen,
    isCategoriesSelected,
    handleMainImageChange,
    handleAdditionalImagesChange,
    handleCategoriesChange,
    handleContentTitleChange,
    handleActivityTypeChange,
    handleSessionInfoChange,
    handleActivityContentChange,
    onSubmit,
    onError,
  } = useProgramForm();

  return (
    <>
      <Header
        selectedCategories={programFormState.categories}
        onClick={handleSubmit(onSubmit, onError)}
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
              onActivityContentChange={handleActivityContentChange}
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
