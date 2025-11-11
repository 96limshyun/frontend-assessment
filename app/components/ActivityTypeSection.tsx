"use client";

import { useState } from "react";
import { SectionCard } from "@/libs/design-system";

export default function ActivityTypeSection() {
  const [activityType, setActivityType] = useState<"online" | "offline" | null>(
    null
  );

  return (
    <SectionCard title="활동 방식 선택">
      <div className="flex flex-col gap-3">
        <p className="text-base leading-[150%] tracking-[-0.02em] text-[#565656]">
          만남을 어떤 방식으로 진행하시겠어요?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setActivityType("online")}
            className={`flex h-[58px] flex-1 items-center justify-center rounded-[8px] border text-base font-semibold leading-[140%] tracking-[-0.02em] transition-colors ${
              activityType === "online"
                ? "border-[#121212] bg-[#121212] text-white"
                : "border-[#E5E5E5] bg-white text-[#121212] hover:border-[#BABABA]"
            }`}
          >
            온라인
          </button>
          <button
            onClick={() => setActivityType("offline")}
            className={`flex h-[58px] flex-1 items-center justify-center rounded-[8px] border text-base font-semibold leading-[140%] tracking-[-0.02em] transition-colors ${
              activityType === "offline"
                ? "border-[#121212] bg-[#121212] text-white"
                : "border-[#E5E5E5] bg-white text-[#121212] hover:border-[#BABABA]"
            }`}
          >
            직접 만나기
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
