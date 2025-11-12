"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import EmptyImageUploadView from "./EmptyImageUploadView";

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 15 * 1024 * 1024;

interface ImageUploadCardProps {
  file: File | null;
  setFile: (file: File | null) => void;
  setFiles?: (files: File[]) => void;
  emptyFileView?: React.ReactNode;
  size?: "large" | "small";
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUploadCard({
  file,
  setFile,
  setFiles,
  emptyFileView,
  size = "large",
  multiple = false,
  maxFiles = 4,
}: ImageUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    // Blob URL은 외부 리소스이므로 effect에서 state 업데이트가 필요
    // eslint-disable-next-line
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      setPreviewUrl(null);
    };
  }, [file]);

  const openFileDialog = () => inputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (selectedFiles.length === 0) {
      return;
    }

    if (multiple && setFiles) {
      const validFiles = selectedFiles
        .filter((file) => ACCEPTED_MIME_TYPES.includes(file.type))
        .filter((file) => file.size <= MAX_FILE_SIZE)
        .slice(0, maxFiles);

      if (validFiles.length > 0) {
        setFiles(validFiles);
      }
    } else {
      const [selected] = selectedFiles;

      if (!ACCEPTED_MIME_TYPES.includes(selected.type)) {
        setFile(null);
        return;
      }

      if (selected.size > MAX_FILE_SIZE) {
        setFile(null);
        return;
      }

      setFile(selected);
    }
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
      {file && previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="image"
          className="w-full h-full object-cover rounded-[16px]"
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
        multiple={multiple}
      />
    </div>
  );
}
