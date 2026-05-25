import type { Progress, DayProgress, Status } from './types';

const KEY = 'summer-tracker:progress:v1';

const empty = (): Progress => ({ currentDay: 1, days: {} });

export function loadProgress(): Progress {
  if (typeof localStorage === 'undefined') return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed.currentDay || !parsed.days) return empty();
    return parsed;
  } catch {
    return empty();
  }
}

export function saveProgress(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function setDay(p: Progress, day: number, patch: Partial<DayProgress> & { status: Status }): Progress {
  const next: Progress = {
    ...p,
    days: { ...p.days, [day]: { ...p.days[day], ...patch } },
  };
  return next;
}

export function advance(p: Progress, total: number): Progress {
  return { ...p, currentDay: Math.min(p.currentDay + 1, total) };
}

export function postpone(p: Progress, day: number): Progress {
  return setDay(p, day, { status: 'postponed' });
}
