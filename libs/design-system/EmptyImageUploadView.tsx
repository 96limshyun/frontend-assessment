"use client";

import { splitTextIntoParagraphs } from "@/libs/utils";

interface EmptyImageUploadViewProps {
  onUploadClick: () => void;
}

export default function EmptyImageUploadView({
  onUploadClick,
}: EmptyImageUploadViewProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <div className="text-center text-black text-body-14 font-bold text-[20px] md:text-[28px] leading-[130%] tracking-[-0.02em]">
          {splitTextIntoParagraphs("콘텐츠 대표 이미지를\n등록해주세요!", "\n")}
        </div>
        <div className="text-center text-[#8F8F8F] text-body-14 font-medium text-[16px] md:text-[22px] leading-[130%] tracking-[-0.02em]">
          1:1 비율의 정사각형 이미지를 추천합니다
        </div>
      </div>

      <button
        className="text-[20px] mt-[20px] h-[58px] w-[160px] rounded-[8px] bg-[#323232] px-5 py-4 text-base leading-[130%] tracking-[-0.02em] text-white transition-colors hover:bg-[#121212] text-primary-500 text-body-14 font-bold cursor-pointer"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onUploadClick();
        }}
      >
        이미지 업로드
      </button>
    </div>
  );
}
