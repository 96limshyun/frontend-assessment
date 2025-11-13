"use client";

import { useState } from "react";
import { SectionCard, ToggleButton } from "@/libs/design-system";

type ActivityType = "online" | "offline";

export default function ActivityTypeSection() {
  const [activityType, setActivityType] = useState<ActivityType | null>(null);

  return (
    <SectionCard
      title="활동 방식 선택"
      subtitle="만남을 어떤 방식으로 진행하시겠어요?"
    >
      <div className="flex gap-[8px]">
        <ToggleButton
          isSelected={activityType === "online"}
          onClick={() => setActivityType("online")}
        >
          온라인
        </ToggleButton>
        <ToggleButton
          isSelected={activityType === "offline"}
          onClick={() => setActivityType("offline")}
        >
          직접 만나기
        </ToggleButton>
      </div>
    </SectionCard>
  );
}
