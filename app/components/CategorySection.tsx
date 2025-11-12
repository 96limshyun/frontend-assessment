"use client";

import {
  SectionCard,
  BottomSheet,
  SelectTrigger,
  OptionButton,
} from "@/libs/design-system";
import { splitTextIntoParagraphs, showToast } from "@/libs/utils";

interface CategorySectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CATEGORIES = [
  "용돈 벌기",
  "디지털",
  "그림",
  "글쓰기/독서",
  "건강/운동",
  "동기부여/성장",
  "취미힐링",
  "외국어",
];

export default function CategorySection({
  open,
  setOpen,
  selectedCategories,
  setSelectedCategories,
}: CategorySectionProps) {
  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < 2) {
        setSelectedCategories([...selectedCategories, category]);
      } else {
        showToast("최대 2개까지 선택 가능해요");
      }
    }
  };

  return (
    <SectionCard title="카테고리">
      <BottomSheet.Root open={open} onOpenChange={setOpen}>
        <BottomSheet.Trigger asChild>
          <SelectTrigger
            placeholder="주제를 선택해주세요"
            value={
              selectedCategories.length > 0
                ? selectedCategories.join(", ")
                : undefined
            }
          />
        </BottomSheet.Trigger>

        <BottomSheet.Content>
          <BottomSheet.Header
            title="카테고리 선택"
            onClose={() => setOpen(false)}
          />
          <div className="w-full px-4 mx-auto md:max-w-[1100px] md:px-0">
            <SectionCard
              title={splitTextIntoParagraphs(
                "어떤 카테고리의\n콘텐츠를 만드시나요?",
                "\n"
              )}
              subtitle="최대 2개까지 선택 가능합니다."
            >
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((category) => (
                  <OptionButton
                    key={category}
                    selected={selectedCategories.includes(category)}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </OptionButton>
                ))}
              </div>
            </SectionCard>
          </div>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </SectionCard>
  );
}
