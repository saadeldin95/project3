import { useMemo } from 'react';
import type { AppState } from '../lib/types';
import { LESSON_QUEUE, SOURCE_ORDER } from '../data/lessons';
import { formatMinutes } from '../lib/session';

export function ProgressView({ state }: { state: AppState }) {
  const stats = useMemo(() => {
    let totalDone = 0;
    let minutesInvested = 0;
    const bySource = new Map<string, { done: number; total: number; minutes: number }>();
    for (const s of SOURCE_ORDER) bySource.set(s.id, { done: 0, total: 0, minutes: 0 });

    for (const lesson of LESSON_QUEUE) {
      const slot = bySource.get(lesson.sourceId);
      if (slot) slot.total += 1;
      const r = state.records[lesson.id];
      if (r && (r.status === 'done' || r.status === 'skipped')) {
        totalDone += 1;
        if (r.status === 'done') {
          minutesInvested += lesson.durationMin;
          if (slot) slot.minutes += lesson.durationMin;
        }
        if (slot) slot.done += 1;
      }
    }
    const activeDays = new Set<string>();
    for (const r of Object.values(state.records)) {
      if (r.status === 'done' && r.updatedAt) {
        activeDays.add(r.updatedAt.slice(0, 10));
      }
    }
    return {
      totalDone,
      total: LESSON_QUEUE.length,
      minutesInvested,
      bySource,
      streak: computeStreak(activeDays),
    };
  }, [state.records]);

  const pct = stats.total === 0 ? 0 : Math.round((stats.totalDone / stats.total) * 100);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      <h1 className="text-2xl font-semibold mb-6">Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <Stat label="Lessons complete" value={`${stats.totalDone} / ${stats.total}`} sub={`${pct}%`} />
        <Stat label="Time invested" value={formatMinutes(stats.minutesInvested)} sub="across completed lessons" />
        <Stat label="Streak" value={`${stats.streak} day${stats.streak === 1 ? '' : 's'}`} sub="consecutive active days" />
      </div>

      <div className="rounded-xl border border-border bg-panel p-6">
        <h2 className="text-xs uppercase tracking-widest text-muted mb-4">By source</h2>
        <div className="flex flex-col gap-4">
          {SOURCE_ORDER.map((s) => {
            const slot = stats.bySource.get(s.id)!;
            const sp = slot.total === 0 ? 0 : (slot.done / slot.total) * 100;
            return (
              <div key={s.id}>
                <div className="flex items-baseline justify-between text-sm mb-1.5">
                  <span className="text-fg">{s.short}</span>
                  <span className="text-muted text-xs">
                    {slot.done} / {slot.total}
                    {slot.minutes > 0 && (
                      <span className="ml-2">· {formatMinutes(slot.minutes)}</span>
                    )}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-bg overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all"
                    style={{ width: `${sp}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-5">
      <div className="text-xs uppercase tracking-widest text-muted mb-2">{label}</div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      <div className="text-xs text-muted">{sub}</div>
    </div>
  );
}

function computeStreak(days: Set<string>): number {
  if (days.size === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  const cursor = new Date(today);
  // Allow today to be inactive — count back from yesterday in that case
  if (!days.has(toKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(toKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function toKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}
