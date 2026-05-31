export type LessonKind = 'video' | 'reading' | 'exercise' | 'review' | 'project';
export type LessonStatus = 'pending' | 'done' | 'skipped' | 'postponed';

export type Lesson = {
  id: string;
  kind: LessonKind;
  title: string;
  sourceId: string;
  sourceName: string;
  sourceShort: string;
  partNumber: 1 | 2 | 3;
  partTitle: string;
  url?: string;
  noLink?: boolean;
  durationMin: number;
  durationEstimated?: boolean;
  whyItMatters: string;
  extraNote?: string;
};

export type LessonRecord = {
  status: LessonStatus;
  updatedAt: string;
  note?: string;
};

export type BudgetMin = 30 | 60 | 120 | 180 | 240;

export type SessionLock = {
  date: string;
  endedAt?: string;
};

export type AppState = {
  version: 2;
  records: Record<string, LessonRecord>;
  budgetMin: BudgetMin;
  session: SessionLock | null;
};

export type ViewKey = 'today' | 'history' | 'notes' | 'progress' | 'settings';

export type Theme = 'dark' | 'light';
