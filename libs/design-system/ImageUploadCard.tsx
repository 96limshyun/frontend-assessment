"use client";

import { ChangeEvent, useRef, useState } from "react";

import EmptyImageUploadView from "./EmptyImageUploadView";

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 15 * 1024 * 1024;

interface ImageUploadCardProps {
  file: File | null;
  setFile: (file: File | null) => void;
  emptyFileView?: React.ReactNode;
  size?: "large" | "small";
}

export default function ImageUploadCard({
  file,
  setFile,
  emptyFileView,
  size = "large",
}: ImageUploadCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => inputRef.current?.click();

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [selected] = event.target.files ?? [];
    event.target.value = "";

    if (!selected) {
      return;
    }

    if (!ACCEPTED_MIME_TYPES.includes(selected.type)) {
      setFile(null);
      clearPreview();
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFile(null);
      clearPreview();
      return;
    }

    setFile(selected);
    setPreviewUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return URL.createObjectURL(selected);
    });
  };

  const handleUploadButtonClick = () => {
    openFileDialog();
  };

  const maxWidth = size === "large" ? "max-w-[510px]" : "max-w-[251px]";

  return (
    <div
      className={`flex aspect-square w-full ${maxWidth} items-center justify-center rounded-[16px] border border-[#E5E5E5] bg-[#F7F7F8] text-[#8F8F8F] cursor-pointer`}
      role="button"
      tabIndex={0}
      onClick={handleUploadButtonClick}
    >
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="image"
          className="w-full h-full object-cover"
        />
      ) : emptyFileView ? (
        emptyFileView
      ) : (
        <EmptyImageUploadView onUploadClick={handleUploadButtonClick} />
      )}
      <input
        type="file"
        ref={inputRef}
        accept=".jpg, .png"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
