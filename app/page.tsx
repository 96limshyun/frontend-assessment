"use client";
import { useState } from "react";

import { Header, SectionCard, SectionLayout } from "@/libs/design-system";
import ImageUploadCard from "./components/ImageUploadCard";

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  return (
    <>
      <Header />
      <SectionLayout
        leftTop={<ImageUploadCard />}
        leftBottom={
          <SectionCard
            title="추가 이미지 (선택)"
            subtitle="최대 4장까지 등록할 수 있어요"
          >
            <div className="flex h-[240px] items-center justify-center rounded-[12px] border border-dashed border-[#BABABA] text-[#8F8F8F]">
              가이드 콘텐츠
            </div>
          </SectionCard>
        }
        right={<SectionCard title="카테고리"></SectionCard>}
      />
    </>
  );
}
