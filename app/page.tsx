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
import { useState } from "react";
import { ProgramFormState } from "@/libs/types/programForm";
import { INITIAL_PROGRAM_FORM_STATE } from "@/app/constants";

export default function Home() {
  const [programFormState, setProgramFormState] = useState<ProgramFormState>(
    INITIAL_PROGRAM_FORM_STATE
  );
  const [open, setOpen] = useState(false);

  const isCategoriesSelected = programFormState.categories.length > 0;
  const isActivitySelected = programFormState.activityType !== null;

  const handleNextClick = () => {
    if (isCategoriesSelected && isActivitySelected) {
      setOpen(false);
    }
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
            setMainImage={(image) =>
              setProgramFormState((prev) => ({ ...prev, mainImage: image }))
            }
          />
        }
        leftBottom={
          <AdditionalImagesUpload
            additionalImages={programFormState.additionalImages}
            onChange={(images) =>
              setProgramFormState((prev) => ({
                ...prev,
                additionalImages: images,
              }))
            }
          />
        }
        right={
          <div className="flex flex-col pb-[93px] md:pb-0">
            <CategorySection
              open={open}
              setOpen={setOpen}
              selectedCategories={programFormState.categories}
              onChange={(categories) =>
                setProgramFormState((prev) => ({ ...prev, categories }))
              }
            />
            <ContentTitleSection />
            <ActivityTypeSection
              activityType={programFormState.activityType}
              onChange={(activityType) =>
                setProgramFormState((prev) => ({ ...prev, activityType }))
              }
            />
            <SessionInfoSection />
          </div>
        }
      />

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-5 py-[10px] z-100">
        <NextButton
          isEnabled={isCategoriesSelected && isActivitySelected}
          onClick={handleNextClick}
          variant="bottom"
        />
      </div>
    </>
  );
}
