"use client";

import { useState } from "react";
import { SectionCard } from "@/libs/design-system";

export default function ActivityContentSection() {
  const [content, setContent] = useState("");
  const MAX_LENGTH = 800;

  return (
    <SectionCard title="활동 내용">
      <div className="flex flex-col gap-3">
        <p className="text-base leading-[150%] tracking-[-0.02em] text-[#565656]">
          날짜별 활동 내용을 간단히 적어주세요
        </p>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_LENGTH) {
                setContent(e.target.value);
              }
            }}
            placeholder="활동 내용을 간단히 입력해주세요"
            className="h-[240px] w-full resize-none rounded-[8px] border border-[#E5E5E5] bg-white px-5 py-4 text-base leading-[150%] tracking-[-0.02em] text-[#121212] placeholder:text-[#8F8F8F] focus:outline-none focus:ring-2 focus:ring-[#121212]"
          />
          <div className="mt-2 text-right text-sm text-[#8F8F8F]">
            {content.length} / {MAX_LENGTH}자 (최소 8자)
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
