"use client";

import { useState } from "react";

import {
  SectionCard,
  ImageUploadCard,
  EmptyAdditionalImageView,
} from "@/libs/ui";

import { MAX_ADDITIONAL_IMAGES } from "@/app/constants";

export default function AdditionalImagesUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleMultipleFiles = (newFiles: File[]) => {
    setFiles((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, MAX_ADDITIONAL_IMAGES);
    });
  };

  const remainingSlots = MAX_ADDITIONAL_IMAGES - files.length;

  return (
    <SectionCard
      title="추가 이미지 (선택)"
      subtitle="최대 4장까지 등록할 수 있어요"
    >
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-x-visible">
        {files.length < MAX_ADDITIONAL_IMAGES && (
          <div className="shrink-0 w-[160px] md:w-auto">
            <ImageUploadCard
              file={null}
              size="small"
              setFile={(newFile) => {
                if (newFile) setFiles((prev) => [...prev, newFile]);
              }}
              setFiles={handleMultipleFiles}
              emptyFileView={<EmptyAdditionalImageView />}
              multiple={true}
              maxFiles={remainingSlots}
            />
          </div>
        )}
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="shrink-0 w-[160px] md:w-auto"
          >
            <ImageUploadCard
              file={file}
              size="small"
              setFile={(newFile) => {
                if (newFile) {
                  setFiles((prev) => {
                    const updated = [...prev];
                    updated[index] = newFile;
                    return updated;
                  });
                } else {
                  setFiles((prev) => prev.filter((_, i) => i !== index));
                }
              }}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
