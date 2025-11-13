import { SectionCard } from "@/libs/design-system";
import {
  ACTIVITY_CONTENT_MIN_LENGTH,
  ACTIVITY_CONTENT_MAX_LENGTH,
} from "@/app/constants";
import { useSessionInfo } from "@/app/hooks/useSessionInfo";
import { useSessionDateLimits } from "@/app/hooks/useSessionDateLimits";
import { useMemo } from "react";
import { normalizeDate } from "@/libs/utils/sessionTime";
import {
  SessionInfoCard,
  TimeFieldKey,
} from "@/app/components/SessionInfoSection/components";
import {
  AddSessionButton,
  SessionsWrapper,
} from "@/app/components/SessionInfoSection/styles";

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
    handleSessionDateChange,
    handleCompleteSessionDate,
    openedCalendarId,
    setOpenedCalendarId,
  } = useSessionInfo();

  const today = useMemo(() => normalizeDate(new Date()), []);
  const sessionDateLimits = useSessionDateLimits(sessionInfo, today);

  return (
    <>
      <SectionCard title="상세 정보">
        <SessionsWrapper>
          {sessionInfo.map((session, index) => {
            const { minDate, maxDate } = sessionDateLimits[index] ?? {};
            const fallbackSelectedDate =
              session.sessionDate ?? minDate ?? today;
            const isCalendarOpen = openedCalendarId === session.sessionId;

            return (
              <SessionInfoCard
                key={session.sessionId}
                session={session}
                index={index}
                totalSessions={sessionInfo.length}
                fallbackSelectedDate={fallbackSelectedDate}
                minDate={minDate}
                maxDate={maxDate}
                isCalendarOpen={isCalendarOpen}
                onCalendarOpenChange={(open: boolean) =>
                  setOpenedCalendarId(open ? session.sessionId : null)
                }
                onDelete={() => handleDeleteSession(session.sessionId)}
                onStartPeriodToggle={() =>
                  handleStartPeriodToggle(
                    session.sessionId,
                    session.sessionTimeStart.period
                  )
                }
                onStartTimeChange={(field: TimeFieldKey, value: string) =>
                  handleStartTimeChange(session.sessionId, field, value)
                }
                onStartTimeBlur={(field: TimeFieldKey, value: string) =>
                  handleStartTimeBlur(session.sessionId, field, value)
                }
                onEndPeriodToggle={() =>
                  handleEndPeriodToggle(
                    session.sessionId,
                    session,
                    session.sessionTimeEnd.period
                  )
                }
                onEndTimeChange={(field: TimeFieldKey, value: string) =>
                  handleEndTimeChange(session.sessionId, field, value)
                }
                onEndTimeBlur={(field: TimeFieldKey, value: string) =>
                  handleEndTimeBlur(session.sessionId, session, field, value)
                }
                onActivityContentChange={(value: string) =>
                  handleActivityContentChange(session.sessionId, value)
                }
                onDateChange={(date: Date) =>
                  handleSessionDateChange(session.sessionId, date)
                }
                onCompleteSessionDate={handleCompleteSessionDate}
                activityMinLength={ACTIVITY_CONTENT_MIN_LENGTH}
                activityMaxLength={ACTIVITY_CONTENT_MAX_LENGTH}
              />
            );
          })}
        </SessionsWrapper>
      </SectionCard>
      <AddSessionButton onClick={() => handleAddSession()}>
        회차 추가하기
      </AddSessionButton>
    </>
  );
}
