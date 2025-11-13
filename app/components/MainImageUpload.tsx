"use client";

import { ImageUploadCard, SectionCard } from "@/libs/ui";

interface MainImageUploadProps {
  mainImage: File | null;
  setMainImage: (image: File | null) => void;
}

export default function MainImageUpload({ mainImage, setMainImage }: MainImageUploadProps) {
  return (
    <SectionCard title="대표 이미지">
      <ImageUploadCard file={mainImage} setFile={setMainImage} />
    </SectionCard>
  );
}
