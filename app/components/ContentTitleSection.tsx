"use client";

import { useState } from "react";
import { SectionCard, TextArea } from "@/libs/design-system";

import {
  CONTENT_TITLE_MIN_LENGTH,
  CONTENT_TITLE_MAX_LENGTH,
} from "@/app/constants";

export default function ContentTitleSection() {
  const [title, setTitle] = useState("");

  return (
    <SectionCard title="콘텐츠 제목">
      <TextArea.Root>
        <TextArea.Input
          value={title}
          onChange={setTitle}
          minLength={CONTENT_TITLE_MIN_LENGTH}
          maxLength={CONTENT_TITLE_MAX_LENGTH}
          placeholder="제목을 입력해주세요"
          className="h-[138px]"
          counterLabel="최소 8자"
        />
        <TextArea.Footer>
          {title.length > 0 && title.length < CONTENT_TITLE_MIN_LENGTH && (
            <TextArea.Error minLength={CONTENT_TITLE_MIN_LENGTH} />
          )}
        </TextArea.Footer>
      </TextArea.Root>
    </SectionCard>
  );
}
