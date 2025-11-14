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
import { overlay } from "overlay-kit";
import { splitTextIntoParagraphs } from "@/libs/utils";
import Dialog from "@/libs/ui/Dialog";
import type { FieldError } from "react-hook-form";
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
  activityContentError?: FieldError;
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
  activityContentError,
}: SessionInfoCardProps) => {
  const title = totalSessions === 1 ? "회차 정보" : `${index + 1}회차 정보`;

  const handleDelete = () => {
    overlay.open(({ isOpen, close }) => {
      if (!isOpen) return null;

      return (
        <Dialog
          title={splitTextIntoParagraphs(
            "작성된 내용을\n삭제하시겠어요?",
            "\n"
          )}
          description="삭제한 내용은 복구할 수 없습니다."
          onDelete={onDelete}
          onCancel={close}
        />
      );
    });
  };

  return (
    <SessionInfoContainer>
      <SessionHeader>
        <SessionTitle>{title}</SessionTitle>
        {totalSessions > 1 && (
          <CloseButton onClick={handleDelete}>
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
          activityContentError={activityContentError}
        />
      </ActivityContent>
    </SessionInfoContainer>
  );
};

export default SessionInfoCard;
