export type TaskKind = 'video' | 'reading' | 'exercise' | 'review' | 'rest';

export type Task = {
  day: number;
  partNumber: 1 | 2 | 3;
  partTitle: string;
  sourceId: string;
  sourceName: string;
  title: string;
  kind: TaskKind;
  url?: string;
  noLink?: boolean;
  durationMin?: number;
  whyItMatters: string;
};

export type Status = 'pending' | 'done' | 'skipped' | 'postponed';

export type DayProgress = {
  status: Status;
  completedAt?: string;
  note?: string;
};

export type Progress = {
  currentDay: number;
  days: Record<number, DayProgress>;
};
