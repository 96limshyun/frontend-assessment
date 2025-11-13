"use client";

import { SectionCard, ToggleButton } from "@/libs/ui";
import type { ActivityType } from "@/libs/types/programForm";

interface ActivityTypeSectionProps {
  activityType: ActivityType | null;
  onChange: (type: ActivityType) => void;
}

export default function ActivityTypeSection({
  activityType,
  onChange,
}: ActivityTypeSectionProps) {
  return (
    <SectionCard
      title="활동 방식 선택"
      subtitle="만남을 어떤 방식으로 진행하시겠어요?"
    >
      <div className="flex gap-[8px]">
        <ToggleButton
          isSelected={activityType === "online"}
          onClick={() => onChange("online")}
        >
          온라인
        </ToggleButton>
        <ToggleButton
          isSelected={activityType === "offline"}
          onClick={() => onChange("offline")}
        >
          직접 만나기
        </ToggleButton>
      </div>
    </SectionCard>
  );
}
