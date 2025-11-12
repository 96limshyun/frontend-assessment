"use client";

import { Header, SectionLayout, NextButton } from "@/libs/design-system";
import {
  AdditionalImagesUpload,
  MainImageUpload,
  CategorySection,
  ContentTitleSection,
  ActivityTypeSection,
  SessionInfoSection,
} from "@/app/components";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const isCategoriesSelected = selectedCategories.length > 0;

  const handleNextClick = () => {
    if (isCategoriesSelected) {
      setOpen(false);
    }
  };

  return (
    <>
      <Header
        selectedCategories={selectedCategories}
        onClick={handleNextClick}
      />
      <SectionLayout
        leftTop={<MainImageUpload />}
        leftBottom={<AdditionalImagesUpload />}
        right={
          <div className="flex flex-col pb-[93px] md:pb-0">
            <CategorySection
              open={open}
              setOpen={setOpen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <ContentTitleSection />
            <ActivityTypeSection />
            <SessionInfoSection />
          </div>
        }
      />

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-5 py-[10px] z-100">
        <NextButton
          isEnabled={isCategoriesSelected}
          onClick={handleNextClick}
          variant="bottom"
        />
      </div>
    </>
  );
}
