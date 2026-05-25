import { useMemo, useState } from 'react';
import type { AppState } from '../lib/types';
import { LESSON_BY_ID, SOURCE_ORDER } from '../data/lessons';
import { formatDate } from '../lib/session';

type Note = {
  id: string;
  text: string;
  updatedAt: string;
  lessonTitle: string;
  sourceShort: string;
  sourceId: string;
  url?: string;
  noLink?: boolean;
};

type SortMode = 'date' | 'source';

export function NotesView({ state }: { state: AppState }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('date');

  const notes: Note[] = useMemo(() => {
    const out: Note[] = [];
    for (const [id, record] of Object.entries(state.records)) {
      if (!record.note || !record.note.trim()) continue;
      const lesson = LESSON_BY_ID[id];
      if (!lesson) continue;
      out.push({
        id,
        text: record.note,
        updatedAt: record.updatedAt,
        lessonTitle: lesson.title,
        sourceShort: lesson.sourceShort,
        sourceId: lesson.sourceId,
        url: lesson.url,
        noLink: lesson.noLink,
      });
    }
    return out;
  }, [state.records]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? notes.filter(
        (n) =>
          n.lessonTitle.toLowerCase().includes(q) ||
          n.text.toLowerCase().includes(q) ||
          n.sourceShort.toLowerCase().includes(q),
      )
    : notes;

  const grouped = useMemo(() => {
    if (sort === 'date') {
      const sorted = [...filtered].sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1));
      return [{ label: 'All notes', notes: sorted }];
    }
    const bySource = new Map<string, Note[]>();
    for (const n of filtered) {
      const arr = bySource.get(n.sourceId) ?? [];
      arr.push(n);
      bySource.set(n.sourceId, arr);
    }
    return SOURCE_ORDER.filter((s) => bySource.has(s.id)).map((s) => ({
      label: s.short,
      notes: bySource.get(s.id)!.sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1)),
    }));
  }, [filtered, sort]);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      <div className="flex items-baseline justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <div className="text-xs text-muted">{notes.length} total</div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-panel border border-border rounded-md px-3 py-2 text-sm text-fg outline-none focus:border-accent"
        />
        <div className="flex gap-1 border border-border rounded-md p-1 bg-panel">
          {(['date', 'source'] as SortMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setSort(m)}
              className={
                'px-3 py-1 rounded text-xs ' +
                (sort === m ? 'bg-bg text-fg' : 'text-muted hover:text-fg')
              }
            >
              By {m}
            </button>
          ))}
        </div>
      </div>

      {notes.length === 0 && (
        <div className="rounded-xl border border-border bg-panel p-8 text-center text-sm text-muted">
          No notes yet. Write a line after marking a lesson complete and it'll appear here.
        </div>
      )}

      {filtered.length === 0 && notes.length > 0 && (
        <div className="text-sm text-muted">No matches.</div>
      )}

      <div className="flex flex-col gap-8">
        {grouped.map((g) => (
          <section key={g.label}>
            {sort === 'source' && (
              <h2 className="text-xs uppercase tracking-widest text-muted mb-3">{g.label}</h2>
            )}
            <div className="flex flex-col gap-3">
              {g.notes.map((n) => (
                <article key={n.id} className="rounded-lg border border-border bg-panel p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-sm font-medium text-fg truncate">{n.lessonTitle}</h3>
                    <span className="text-xs text-muted whitespace-nowrap">{formatDate(n.updatedAt)}</span>
                  </div>
                  <div className="text-xs text-muted mb-3">{n.sourceShort}</div>
                  <p className="text-sm text-fg whitespace-pre-wrap leading-relaxed">{n.text}</p>
                  {n.url && !n.noLink && (
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-xs text-muted hover:text-accent"
                    >
                      Open source →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
