"use client";

import { useState } from "react";

import {
  SectionCard,
  ImageUploadCard,
  EmptyAdditionalImageView,
} from "@/libs/design-system";

const MAX_FILES = 4;

export default function AdditionalImagesUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleMultipleFiles = (newFiles: File[]) => {
    setFiles((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, MAX_FILES);
    });
  };

  const remainingSlots = MAX_FILES - files.length;

  return (
    <SectionCard
      title="추가 이미지 (선택)"
      subtitle="최대 4장까지 등록할 수 있어요"
    >
      <div className="grid grid-cols-2 gap-4">
        {files.length < MAX_FILES && (
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
        )}
        {files.map((file, index) => (
          <ImageUploadCard
            key={`${file.name}-${index}`}
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
        ))}
      </div>
    </SectionCard>
  );
}
