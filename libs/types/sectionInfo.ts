export type SessionPeriod = "오전" | "오후";

export interface TimeInfo {
  period: SessionPeriod;
  hour: string;
  minute: string;
}

export interface SessionInfo {
  sessionId: string;
  sessionDate: Date | null;
  sessionTimeStart: TimeInfo;
  sessionTimeEnd: TimeInfo;
  activityContent: string;
}
