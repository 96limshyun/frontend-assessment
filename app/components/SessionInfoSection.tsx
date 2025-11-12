import { SectionCard } from "@/libs/design-system";
import { twc } from "react-twc";
import { TextArea } from "@/libs/design-system";
import Image from "next/image";
import { TimeRangeForm } from "@/libs/design-system";
import {
  ACTIVITY_CONTENT_MIN_LENGTH,
  ACTIVITY_CONTENT_MAX_LENGTH,
} from "@/app/constants";
import { useSessionInfo } from "@/app/hooks/useSessionInfo";

export default function SessionInfoSection() {
  const {
    sessionInfo,
    handleDeleteSession,
    handleStartPeriodToggle,
    handleStartTimeChange,
    handleStartTimeBlur,
    handleEndPeriodToggle,
    handleEndTimeChange,
    handleEndTimeBlur,
    handleActivityContentChange,
    handleAddSession,
  } = useSessionInfo();

  return (
    <>
      <SectionCard title="상세 정보">
        <div className="flex flex-col gap-[20px]">
          {sessionInfo.map((session, index) => (
            <SessionInfoContainer key={session.sessionId}>
              <SessionHeader>
                <SessionTitle>
                  {sessionInfo.length === 1
                    ? "회차 정보"
                    : `${index + 1}회차 정보`}
                </SessionTitle>
                {sessionInfo.length > 1 && (
                  <CloseButton
                    onClick={() => handleDeleteSession(session.sessionId)}
                  >
                    <Image src="/close.svg" alt="닫기" width={68} height={68} />
                  </CloseButton>
                )}
              </SessionHeader>
              <SessionContent>
                <div className="flex flex-col gap-[12px] md:gap-[16px] w-full">
                  <div>
                    <span>날짜 선택</span>
                    <span>{session.sessionDate.toLocaleDateString()}</span>
                  </div>
                  <TimeRangeForm.Field>
                    <TimeRangeForm.Label>시작 시간</TimeRangeForm.Label>
                    <TimeRangeForm.TimeGroup>
                      <TimeRangeForm.PeriodButton
                        onClick={() =>
                          handleStartPeriodToggle(
                            session.sessionId,
                            session.sessionTimeStart.period
                          )
                        }
                      >
                        {session.sessionTimeStart.period}
                      </TimeRangeForm.PeriodButton>
                      <TimeRangeForm.TimeInput
                        value={session.sessionTimeStart.hour}
                        min={0}
                        max={12}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleStartTimeChange(
                            session.sessionId,
                            "hour",
                            event.target.value
                          )
                        }
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleStartTimeBlur(
                            session.sessionId,
                            "hour",
                            event.target.value
                          )
                        }
                      />
                      <TimeRangeForm.TimeSeparator>
                        :
                      </TimeRangeForm.TimeSeparator>
                      <TimeRangeForm.TimeInput
                        value={session.sessionTimeStart.minute}
                        min={0}
                        max={59}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleStartTimeChange(
                            session.sessionId,
                            "minute",
                            event.target.value
                          )
                        }
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleStartTimeBlur(
                            session.sessionId,
                            "minute",
                            event.target.value
                          )
                        }
                      />
                    </TimeRangeForm.TimeGroup>
                  </TimeRangeForm.Field>
                  <TimeRangeForm.Field>
                    <TimeRangeForm.Label>종료 시간</TimeRangeForm.Label>
                    <TimeRangeForm.TimeGroup>
                      <TimeRangeForm.PeriodButton
                        onClick={() => {
                          handleEndPeriodToggle(
                            session.sessionId,
                            session,
                            session.sessionTimeEnd.period
                          );
                        }}
                      >
                        {session.sessionTimeEnd.period}
                      </TimeRangeForm.PeriodButton>
                      <TimeRangeForm.TimeInput
                        value={session.sessionTimeEnd.hour}
                        min={0}
                        max={12}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleEndTimeChange(
                            session.sessionId,
                            "hour",
                            event.target.value
                          )
                        }
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleEndTimeBlur(
                            session.sessionId,
                            session,
                            "hour",
                            event.target.value
                          )
                        }
                      />
                      <TimeRangeForm.TimeSeparator>
                        :
                      </TimeRangeForm.TimeSeparator>
                      <TimeRangeForm.TimeInput
                        value={session.sessionTimeEnd.minute}
                        min={0}
                        max={59}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleEndTimeChange(
                            session.sessionId,
                            "minute",
                            event.target.value
                          )
                        }
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                          handleEndTimeBlur(
                            session.sessionId,
                            session,
                            "minute",
                            event.target.value
                          )
                        }
                      />
                    </TimeRangeForm.TimeGroup>
                  </TimeRangeForm.Field>
                </div>
              </SessionContent>
              <ActivityContent>
                <SessionTitle>활동 내용</SessionTitle>
                <SubTitle>날짜별 활동 내용을 간단히 적어주세요</SubTitle>
                <TextArea.Root>
                  <TextArea.Input
                    minLength={ACTIVITY_CONTENT_MIN_LENGTH}
                    maxLength={ACTIVITY_CONTENT_MAX_LENGTH}
                    value={session.activityContent}
                    placeholder="활동 내용을 간단히 입력해주세요"
                    onChange={(value: string) =>
                      handleActivityContentChange(session.sessionId, value)
                    }
                  />
                  <TextArea.Footer>
                    {session.activityContent.length > 0 &&
                      session.activityContent.length <
                        ACTIVITY_CONTENT_MIN_LENGTH && (
                        <TextArea.Error
                          minLength={ACTIVITY_CONTENT_MIN_LENGTH}
                        />
                      )}
                  </TextArea.Footer>
                </TextArea.Root>
              </ActivityContent>
            </SessionInfoContainer>
          ))}
        </div>
      </SectionCard>
      <AddSessionButton onClick={() => handleAddSession()}>
        회차 추가하기
      </AddSessionButton>
    </>
  );
}

const SessionInfoContainer = twc.div`md:w-[510px] md:h-[555px] w-[328px] h-[487px] rounded-[8px] bg-[#F7F7F8] px-[20px] py-[28px] gap-[32px] flex flex-col`;

const SessionHeader = twc.div`flex items-center justify-between w-full`;

const CloseButton = twc.button`w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity`;

const SessionContent = twc.div`flex flex-col gap-[12px] md:gap-[16px] w-full`;

const ActivityContent = twc.div`flex flex-col gap-[12px] md:gap-[16px] w-full`;

const SessionTitle = twc.h1`
  font-bold text-[20px] md:text-[24px] leading-[130%] tracking-[-0.02em] text-[#121212]
`;

const SubTitle = twc.h2`
  font-medium text-[16px] md:text-[18px] leading-[130%] tracking-[-0.02em] text-[#565656]
`;

const AddSessionButton = twc.button`
  w-full h-[60px] md:w-[510px] rounded-[8px] bg-[#121212]
  text-white text-[18px] md:text-[20px] font-semibold
  leading-[130%] tracking-[-0.02em]
  cursor-pointer hover:bg-[#2a2a2a] transition-colors
  mt-[24px]
`;
