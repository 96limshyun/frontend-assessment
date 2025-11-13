"use client";

import { useState } from "react";

import { ImageUploadCard, SectionCard } from "@/libs/ui";

export default function MainImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <SectionCard title="대표 이미지">
      <ImageUploadCard file={file} setFile={setFile} />
    </SectionCard>
  );
}
