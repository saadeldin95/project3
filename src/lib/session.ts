import type { AppState, Lesson, LessonRecord } from './types';

export function activeQueue(
  queue: Lesson[],
  records: Record<string, LessonRecord>,
): Lesson[] {
  const pending: Lesson[] = [];
  const postponed: Lesson[] = [];
  for (const l of queue) {
    const r = records[l.id];
    if (!r || r.status === 'pending') pending.push(l);
    else if (r.status === 'postponed') postponed.push(l);
  }
  return [...pending, ...postponed];
}

export function pickSessionLessons(active: Lesson[], budgetMin: number): Lesson[] {
  const out: Lesson[] = [];
  let used = 0;
  for (const l of active) {
    if (used + l.durationMin > budgetMin) break;
    out.push(l);
    used += l.durationMin;
  }
  return out;
}

export type SessionView = {
  completedToday: Lesson[];
  pendingPicks: Lesson[];
  active: Lesson[];
  usedMin: number;
  remainingMin: number;
};

export function computeTodaySession(
  queue: Lesson[],
  records: Record<string, LessonRecord>,
  budgetMin: number,
  today: string,
): SessionView {
  const completedToday: Lesson[] = [];
  let usedMin = 0;
  for (const l of queue) {
    const r = records[l.id];
    if (!r) continue;
    if (r.status !== 'done' && r.status !== 'skipped') continue;
    if (dateKey(r.updatedAt) !== today) continue;
    completedToday.push(l);
    if (r.status === 'done') usedMin += l.durationMin;
  }
  const remainingMin = Math.max(0, budgetMin - usedMin);
  const active = activeQueue(queue, records);
  const pendingPicks = remainingMin > 0 ? pickSessionLessons(active, remainingMin) : [];
  return { completedToday, pendingPicks, active, usedMin, remainingMin };
}

export function sessionMinutes(lessons: Lesson[]): number {
  return lessons.reduce((s, l) => s + l.durationMin, 0);
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h} hr`;
  return `${h}h ${m}m`;
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

export function dateKey(iso: string): string {
  return todayKey(new Date(iso));
}

export function todayDateLabel(d = new Date()): string {
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDayHeader(yyyymmdd: string): string {
  const [y, m, d] = yyyymmdd.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function isTodayEnded(state: AppState, today: string): boolean {
  const s = state.session;
  return Boolean(s && s.date === today && s.endedAt);
}
