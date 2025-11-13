"use client";

import { SectionCard, TextArea } from "@/libs/ui";

import {
  CONTENT_TITLE_MIN_LENGTH,
  CONTENT_TITLE_MAX_LENGTH,
} from "@/app/constants";

interface ContentTitleSectionProps {
  contentTitle: string;
  onChange: (contentTitle: string) => void;
}
export default function ContentTitleSection({
  contentTitle,
  onChange,
}: ContentTitleSectionProps) {
  return (
    <SectionCard title="콘텐츠 제목">
      <TextArea.Root>
        <TextArea.Input
          value={contentTitle}
          onChange={onChange}
          minLength={CONTENT_TITLE_MIN_LENGTH}
          maxLength={CONTENT_TITLE_MAX_LENGTH}
          placeholder="제목을 입력해주세요"
          className="h-[138px]"
          counterLabel="최소 8자"
        />
        <TextArea.Footer>
          {contentTitle.length > 0 && contentTitle.length < CONTENT_TITLE_MIN_LENGTH && (
            <TextArea.Error minLength={CONTENT_TITLE_MIN_LENGTH} />
          )}
        </TextArea.Footer>
      </TextArea.Root>
    </SectionCard>
  );
}
