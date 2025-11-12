export type SessionPeriod = "오전" | "오후";

export interface TimeInfo {
  period: SessionPeriod;
  hour: string;
  minute: string;
}

export interface SessionInfo {
  sessionId: string;
  sessionName: string;
  sessionDate: Date | null;
  sessionTimeStart: TimeInfo;
  sessionTimeEnd: TimeInfo;
  sessionLocation: string;
  sessionLocationDetail: string;
  activityContent: string;
}
