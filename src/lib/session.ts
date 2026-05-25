import type { Lesson, LessonRecord } from './types';

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

export function computeSession(active: Lesson[], budgetMin: number): Lesson[] {
  if (active.length === 0) return [];
  const first = active[0];
  if (first.durationMin > budgetMin) return [first];
  const out: Lesson[] = [];
  let used = 0;
  for (const l of active) {
    if (used + l.durationMin > budgetMin) break;
    out.push(l);
    used += l.durationMin;
  }
  return out;
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

export function todayDateLabel(d = new Date()): string {
  return d.toLocaleDateString(undefined, {
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
