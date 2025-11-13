"use client";

import {
  SectionCard,
  BottomSheet,
  SelectTrigger,
  OptionButton,
} from "@/libs/ui";
import { splitTextIntoParagraphs, showToast } from "@/libs/utils";
import { CATEGORIES, MAX_SELECTED_CATEGORIES } from "@/app/constants";

interface CategorySectionProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}
export default function CategorySection({
  open,
  setOpen,
  selectedCategories,
  onChange,
}: CategorySectionProps) {
  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      if (selectedCategories.length < MAX_SELECTED_CATEGORIES) {
        onChange([...selectedCategories, category]);
      } else {
        showToast(`최대 ${MAX_SELECTED_CATEGORIES}개까지 선택 가능해요`);
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
            title="카테고리"
            onClose={() => setOpen(false)}
          />
          <div className="w-full px-4 mx-auto md:max-w-[1100px] md:px-0">
            <SectionCard
              title={splitTextIntoParagraphs(
                "어떤 카테고리의\n콘텐츠를 만드시나요?",
                "\n"
              )}
              subtitle={`최대 ${MAX_SELECTED_CATEGORIES}개까지 선택 가능합니다.`}
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
