"use client";

import { Header, SectionLayout } from "@/libs/design-system";
import {
  AdditionalImagesUpload,
  MainImageUpload,
  CategorySection,
  ContentTitleSection,
  ActivityTypeSection,
} from "@/app/components";

export default function Home() {
  return (
    <>
      <Header />
      <SectionLayout
        leftTop={<MainImageUpload />}
        leftBottom={<AdditionalImagesUpload />}
        right={
          <div className="flex flex-col">
            <CategorySection />
            <ContentTitleSection />
            <ActivityTypeSection />
          </div>
        }
      />
    </>
  );
}
