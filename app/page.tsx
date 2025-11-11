"use client";

import { Header, SectionCard, SectionLayout } from "@/libs/design-system";
import { AdditionalImagesUpload, MainImageUpload } from "@/app/components";

export default function Home() {
  return (
    <>
      <Header />
      <SectionLayout
        leftTop={<MainImageUpload />}
        leftBottom={<AdditionalImagesUpload />}
        right={<SectionCard title="카테고리"></SectionCard>}
      />
    </>
  );
}
