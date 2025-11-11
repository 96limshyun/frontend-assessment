"use client";

import { useState } from "react";
import { SectionCard, TextArea } from "@/libs/design-system";

const MIN_LENGTH = 8;
const MAX_LENGTH = 80;

export default function ContentTitleSection() {
  const [title, setTitle] = useState("");

  return (
    <SectionCard title="콘텐츠 제목">
      <TextArea.Root>
        <TextArea.Input
          value={title}
          onChange={setTitle}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
          placeholder="제목을 입력해주세요"
          className="h-[138px]"
          counterLabel="최소 8자"
        />
        <TextArea.Footer>
          {title.length > 0 && title.length < MIN_LENGTH && (
            <TextArea.Error minLength={MIN_LENGTH} />
          )}
        </TextArea.Footer>
      </TextArea.Root>
    </SectionCard>
  );
}
