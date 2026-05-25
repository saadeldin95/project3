import { useMemo, useState } from 'react';
import type { AppState, LessonRecord, LessonStatus } from '../lib/types';
import { LESSON_BY_ID } from '../data/lessons';
import { formatDate } from '../lib/session';

type Entry = { id: string; record: LessonRecord };

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

export function HistoryView({ state }: { state: AppState }) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const entries: Entry[] = useMemo(() => {
    const out: Entry[] = [];
    for (const [id, record] of Object.entries(state.records)) {
      if (record.status === 'pending') continue;
      if (!LESSON_BY_ID[id]) continue;
      out.push({ id, record });
    }
    out.sort((a, b) => (b.record.updatedAt > a.record.updatedAt ? 1 : -1));
    return out;
  }, [state.records]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? entries.filter((e) => {
        const lesson = LESSON_BY_ID[e.id];
        return (
          lesson.title.toLowerCase().includes(q) ||
          lesson.sourceShort.toLowerCase().includes(q) ||
          (e.record.note ?? '').toLowerCase().includes(q)
        );
      })
    : entries;

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

      {entries.length === 0 && (
        <div className="rounded-xl border border-border bg-panel p-8 text-center text-sm text-muted">
          Nothing here yet. Complete or postpone a lesson and it'll show up.
        </div>
      )}

      {filtered.length === 0 && entries.length > 0 && (
        <div className="text-sm text-muted">No matches.</div>
      )}

      <ul className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
        {filtered.map(({ id, record }) => {
          const lesson = LESSON_BY_ID[id];
          const isOpen = expanded === id;
          return (
            <li key={id} className="bg-panel">
              <button
                onClick={() => setExpanded(isOpen ? null : id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-bg/40"
              >
                <div className="text-xs text-muted w-24 shrink-0 pt-0.5">
                  {formatDate(record.updatedAt)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-fg truncate">{lesson.title}</div>
                  <div className="text-xs text-muted mt-0.5">{lesson.sourceShort}</div>
                </div>
                <div className={'text-xs whitespace-nowrap pt-0.5 ' + STATUS_COLOR[record.status]}>
                  {STATUS_LABEL[record.status]}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-32 -mt-2">
                  {record.note ? (
                    <p className="text-sm text-fg whitespace-pre-wrap bg-bg border border-border rounded-md px-3 py-2 mb-3">
                      {record.note}
                    </p>
                  ) : (
                    <p className="text-xs text-muted italic mb-3">No note written.</p>
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
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
