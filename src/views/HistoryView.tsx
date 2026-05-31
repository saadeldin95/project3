import { useMemo, useState } from 'react';
import type { AppState, LessonRecord, LessonStatus } from '../lib/types';
import { LESSON_BY_ID } from '../data/lessons';
import { dateKey, formatDayHeader } from '../lib/session';

type Entry = { id: string; record: LessonRecord };
type DayGroup = {
  date: string;
  entries: Entry[];
  doneCount: number;
  skippedCount: number;
  postponedCount: number;
};

const STATUS_LABEL: Record<LessonStatus, string> = {
  pending: '·',
  done: '✓ Done',
  skipped: '⤵ Skipped',
  postponed: '→ Postponed',
};

const STATUS_COLOR: Record<LessonStatus, string> = {
  pending: 'text-muted',
  done: 'text-accent',
  skipped: 'text-muted',
  postponed: 'text-amber-400',
};

export function HistoryView({ state }: { state: AppState; today: string }) {
  const [query, setQuery] = useState('');
  const [openDay, setOpenDay] = useState<string | null>(null);

  const groups: DayGroup[] = useMemo(() => {
    const byDay = new Map<string, Entry[]>();
    for (const [id, record] of Object.entries(state.records)) {
      if (record.status === 'pending') continue;
      if (!LESSON_BY_ID[id]) continue;
      const dk = dateKey(record.updatedAt);
      const arr = byDay.get(dk) ?? [];
      arr.push({ id, record });
      byDay.set(dk, arr);
    }
    const out: DayGroup[] = [];
    for (const [date, entries] of byDay.entries()) {
      entries.sort((a, b) => (b.record.updatedAt > a.record.updatedAt ? 1 : -1));
      let doneCount = 0;
      let skippedCount = 0;
      let postponedCount = 0;
      for (const e of entries) {
        if (e.record.status === 'done') doneCount += 1;
        else if (e.record.status === 'skipped') skippedCount += 1;
        else if (e.record.status === 'postponed') postponedCount += 1;
      }
      out.push({ date, entries, doneCount, skippedCount, postponedCount });
    }
    out.sort((a, b) => (b.date > a.date ? 1 : -1));
    return out;
  }, [state.records]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? groups
        .map((g) => ({
          ...g,
          entries: g.entries.filter((e) => {
            const lesson = LESSON_BY_ID[e.id];
            return (
              lesson.title.toLowerCase().includes(q) ||
              lesson.sourceShort.toLowerCase().includes(q) ||
              (e.record.note ?? '').toLowerCase().includes(q)
            );
          }),
        }))
        .filter((g) => g.entries.length > 0)
    : groups;

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      <h1 className="text-2xl font-semibold mb-6">History</h1>

      <input
        type="search"
        placeholder="Search title or note text..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-panel border border-border rounded-md px-3 py-2 text-sm text-fg outline-none focus:border-accent mb-6"
      />

      {groups.length === 0 && (
        <div className="rounded-xl border border-border bg-panel p-8 text-center text-sm text-muted">
          Nothing here yet. Finish a session and it'll show up the next day.
        </div>
      )}

      {filtered.length === 0 && groups.length > 0 && (
        <div className="text-sm text-muted">No matches.</div>
      )}

      <ul className="flex flex-col gap-3">
        {filtered.map((g) => {
          const isOpen = openDay === g.date;
          return (
            <li key={g.date} className="rounded-xl border border-border bg-panel overflow-hidden">
              <button
                onClick={() => setOpenDay(isOpen ? null : g.date)}
                className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-bg/40"
              >
                <div>
                  <div className="text-sm text-fg">{formatDayHeader(g.date)}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {summary(g)}
                  </div>
                </div>
                <div className="text-xs text-muted">{isOpen ? '−' : '+'}</div>
              </button>
              {isOpen && (
                <ul className="border-t border-border divide-y divide-border">
                  {g.entries.map(({ id, record }) => {
                    const lesson = LESSON_BY_ID[id];
                    return (
                      <li key={id} className="px-5 py-4">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-fg">{lesson.title}</div>
                            <div className="text-xs text-muted mt-0.5">{lesson.sourceShort}</div>
                          </div>
                          <div className={'text-xs whitespace-nowrap pt-0.5 ' + STATUS_COLOR[record.status]}>
                            {STATUS_LABEL[record.status]}
                          </div>
                        </div>
                        {record.note ? (
                          <p className="text-sm text-fg whitespace-pre-wrap bg-bg border border-border rounded-md px-3 py-2 mb-2">
                            {record.note}
                          </p>
                        ) : (
                          <p className="text-xs text-muted italic mb-2">No note written.</p>
                        )}
                        {lesson.url && !lesson.noLink && (
                          <a
                            href={lesson.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 rounded-md border border-border text-xs hover:border-accent hover:text-accent"
                          >
                            Re-open task →
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function summary(g: DayGroup): string {
  const bits: string[] = [];
  bits.push(`${g.doneCount} lesson${g.doneCount === 1 ? '' : 's'} completed`);
  if (g.skippedCount > 0) bits.push(`${g.skippedCount} skipped`);
  if (g.postponedCount > 0) bits.push(`${g.postponedCount} postponed`);
  return bits.join(' · ');
}
