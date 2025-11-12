import { SectionCard } from "@/libs/design-system";
import { useState } from "react";
import { twc } from "react-twc";
import { TextArea } from "@/libs/design-system";

const MIN_LENGTH = 8;
const MAX_LENGTH = 800;

interface SessionInfo {
  sessionId: string;
  sessionName: string;
  sessionDate: Date;
  sessionTime: string;
  sessionLocation: string;
  sessionLocationDetail: string;
  activityContent: string;
}

export default function SessionInfoSection() {
  const [sessionInfo, setSessionInfo] = useState({
    sessionId: "",
    sessionName: "",
    sessionDate: "",
    sessionTime: "",
    sessionLocation: "",
    activityContent: "",
  });

  return (
    <SectionCard title="상세 정보">
      <SessionInfoContainer>
        <ActivityContent>
          <SessionTitle>활동 내용</SessionTitle>
          <SubTitle>날짜별 활동 내용을 간단히 적어주세요</SubTitle>
          <TextArea.Root>
            <TextArea.Input
              minLength={MIN_LENGTH}
              maxLength={MAX_LENGTH}
              value={sessionInfo.activityContent}
              placeholder="활동 내용을 간단히 입력해주세요"
              onChange={(value: string) =>
                setSessionInfo({ ...sessionInfo, activityContent: value })
              }
            />
            <TextArea.Footer>
              {sessionInfo.activityContent.length > 0 && sessionInfo.activityContent.length < MIN_LENGTH && (
                <TextArea.Error minLength={MIN_LENGTH} />
              )}
            </TextArea.Footer>
          </TextArea.Root>
        </ActivityContent>
      </SessionInfoContainer>
    </SectionCard>
  );
}

const SessionInfoContainer = twc.div`md:w-[510px] md:h-[555px] w-[328px] h-[487px] rounded-[8px] bg-[#F7F7F8] px-[20px] py-[28px] gap-[32px]`;

const ActivityContent = twc.div`flex flex-col gap-[12px] md:gap-[16px] w-full`;

const SessionTitle = twc.h1`
  font-bold text-[20px] md:text-[24px] leading-[130%] tracking-[-0.02em] text-[#121212]
`;

const SubTitle = twc.h2`
  font-medium text-[16px] md:text-[18px] leading-[130%] tracking-[-0.02em] text-[#565656]
`;
