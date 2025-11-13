import Image from "next/image";

import {
  ActivityContent,
  CloseButton,
  SessionContent,
  SessionHeader,
  SessionInfoContainer,
  SessionTitle,
  SubTitle,
} from "@/app/components/SessionInfoSection/styles";
import SessionActivityField from "./SessionActivityField";
import SessionDateField from "./SessionDateField";
import SessionTimeField, { TimeFieldKey } from "./SessionTimeField";
import type { SessionInfo } from "@/libs/types/sectionInfo";

interface SessionInfoCardProps {
  session: SessionInfo;
  index: number;
  totalSessions: number;
  fallbackSelectedDate: Date;
  minDate?: Date;
  maxDate?: Date;
  isCalendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  onDelete: () => void;
  onStartPeriodToggle: () => void;
  onStartTimeChange: (field: TimeFieldKey, value: string) => void;
  onStartTimeBlur: (field: TimeFieldKey, value: string) => void;
  onEndPeriodToggle: () => void;
  onEndTimeChange: (field: TimeFieldKey, value: string) => void;
  onEndTimeBlur: (field: TimeFieldKey, value: string) => void;
  onActivityContentChange: (value: string) => void;
  onDateChange: (date: Date) => void;
  onCompleteSessionDate: () => void;
  activityMinLength: number;
  activityMaxLength: number;
}

const SessionInfoCard = ({
  session,
  index,
  totalSessions,
  fallbackSelectedDate,
  minDate,
  maxDate,
  isCalendarOpen,
  onCalendarOpenChange,
  onDelete,
  onStartPeriodToggle,
  onStartTimeChange,
  onStartTimeBlur,
  onEndPeriodToggle,
  onEndTimeChange,
  onEndTimeBlur,
  onActivityContentChange,
  onDateChange,
  onCompleteSessionDate,
  activityMinLength,
  activityMaxLength,
}: SessionInfoCardProps) => {
  const title = totalSessions === 1 ? "회차 정보" : `${index + 1}회차 정보`;

  return (
    <SessionInfoContainer>
      <SessionHeader>
        <SessionTitle>{title}</SessionTitle>
        {totalSessions > 1 && (
          <CloseButton onClick={onDelete}>
            <Image src="/close.svg" alt="닫기" width={68} height={68} />
          </CloseButton>
        )}
      </SessionHeader>
      <SessionContent>
        <SessionDateField
          date={session.sessionDate}
          selectedDate={fallbackSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
          isOpen={isCalendarOpen}
          onOpenChange={onCalendarOpenChange}
          onDateChange={onDateChange}
          onComplete={onCompleteSessionDate}
        />
        <SessionTimeField
          label="시작 시간"
          time={session.sessionTimeStart}
          onPeriodToggle={onStartPeriodToggle}
          onTimeChange={onStartTimeChange}
          onTimeBlur={onStartTimeBlur}
        />
        <SessionTimeField
          label="종료 시간"
          time={session.sessionTimeEnd}
          onPeriodToggle={onEndPeriodToggle}
          onTimeChange={onEndTimeChange}
          onTimeBlur={onEndTimeBlur}
        />
      </SessionContent>
      <ActivityContent>
        <SessionTitle>활동 내용</SessionTitle>
        <SubTitle>날짜별 활동 내용을 간단히 적어주세요</SubTitle>
        <SessionActivityField
          value={session.activityContent}
          minLength={activityMinLength}
          maxLength={activityMaxLength}
          onChange={onActivityContentChange}
        />
      </ActivityContent>
    </SessionInfoContainer>
  );
};

export default SessionInfoCard;
