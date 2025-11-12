"use client";

import { Header, SectionLayout } from "@/libs/design-system";
import {
  AdditionalImagesUpload,
  MainImageUpload,
  CategorySection,
  ContentTitleSection,
  ActivityTypeSection,
} from "@/app/components";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <Header selectedCategories={selectedCategories} setOpen={setOpen} />
      <SectionLayout
        leftTop={<MainImageUpload />}
        leftBottom={<AdditionalImagesUpload />}
        right={
          <div className="flex flex-col">
            <CategorySection
              open={open}
              setOpen={setOpen}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <ContentTitleSection />
            <ActivityTypeSection />
          </div>
        }
      />
    </>
  );
}
