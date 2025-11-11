"use client";

import { ChangeEvent, useRef, useState } from "react";

import { SectionCard } from "@/libs/design-system";
import { splitTextIntoParagraphs } from "@/libs/utils";

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 15 * 1024 * 1024;

export default function ImageUploadCard() {
  const [file, setFile] = useState<File | null>(null);
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

  return (
    <SectionCard title="대표 이미지">
      <div
        className="flex aspect-square w-full max-w-[510px] items-center justify-center rounded-[16px] border border-[#E5E5E5] bg-[#F7F7F8] text-[#8F8F8F] cursor-pointer"
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
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="text-center text-black text-body-14 font-bold text-[28px] leading-[130%] tracking-[-0.02em]">
                {splitTextIntoParagraphs(
                  "콘텐츠 대표 이미지를\n등록해주세요!",
                  "\n"
                )}
              </div>
              <div className="text-center text-[#8F8F8F] text-body-14 font-medium text-[22px] leading-[130%] tracking-[-0.02em]">
                1:1 비율의 정사각형 이미지를 추천합니다
              </div>
            </div>

            <button
              className="text-[20px] mt-[20px] h-[58px] w-[160px] rounded-[8px] bg-[#323232] px-5 py-4 text-base leading-[130%] tracking-[-0.02em] text-white transition-colors hover:bg-[#121212] text-primary-500 text-body-14 font-bold cursor-pointer"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUploadButtonClick();
              }}
            >
              이미지 업로드
            </button>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          accept=".jpg, .png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </SectionCard>
  );
}
