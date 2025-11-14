"use client";

import { SectionCard, ToggleButton } from "@/libs/ui";
import { ActivityType } from "@/libs/types/programForm";
interface ActivityTypeSectionProps {
  activityType: ActivityType | null;
  onChange: (activityType: ActivityType) => void;
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
          isSelected={activityType === ActivityType.ONLINE}
          onClick={() => onChange(ActivityType.ONLINE)}
        >
          온라인
        </ToggleButton>
        <ToggleButton
          isSelected={activityType === ActivityType.OFFLINE}
          onClick={() => onChange(ActivityType.OFFLINE)}
        >
          직접 만나기
        </ToggleButton>
      </div>
    </SectionCard>
  );
}
