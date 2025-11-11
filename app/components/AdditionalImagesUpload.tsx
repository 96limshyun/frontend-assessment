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
            emptyFileView={<EmptyAdditionalImageView />}
          />
        )}
        {files.map((file) => (
          <ImageUploadCard
            key={file.name}
            file={file}
            size="small"
            setFile={(newFile) =>
              setFiles((prev) => [...prev, newFile ?? file])
            }
          />
        ))}
      </div>
    </SectionCard>
  );
}
