import { useState } from 'react';
import type { Task, DayProgress } from '../lib/types';

const ICON: Record<Task['kind'], string> = {
  video: '🎥',
  reading: '📖',
  exercise: '💻',
  review: '📝',
  rest: '☕',
};

const KIND_LABEL: Record<Task['kind'], string> = {
  video: 'Video',
  reading: 'Reading',
  exercise: 'Exercise',
  review: 'Review',
  rest: 'Rest day',
};

type Props = {
  task: Task;
  totalDays: number;
  progress?: DayProgress;
  onComplete: (note: string | undefined) => void;
  onPostpone: () => void;
  onSkip: () => void;
};

export function TodayCard({ task, totalDays, progress, onComplete, onPostpone, onSkip }: Props) {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');

  const isRest = task.kind === 'rest';
  const isDone = progress?.status === 'done' || progress?.status === 'skipped';

  const handleComplete = () => {
    if (isRest) {
      onComplete(undefined);
      return;
    }
    setShowNote(true);
  };

  const saveAndAdvance = () => {
    onComplete(note.trim() || undefined);
    setNote('');
    setShowNote(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-16 pb-24">
      <div className="flex items-center justify-between mb-8 text-xs text-muted">
        <div className="uppercase tracking-widest">
          Day {task.day} <span className="text-border">/</span> {totalDays}
        </div>
        <div>Part {task.partNumber} · {task.partTitle}</div>
      </div>

      <div className="rounded-2xl border border-border bg-panel p-8">
        <div className="flex items-center gap-3 text-xs text-muted mb-6">
          <span className="text-base leading-none">{ICON[task.kind]}</span>
          <span className="uppercase tracking-widest">{KIND_LABEL[task.kind]}</span>
          {task.durationMin && !isRest && (
            <>
              <span className="text-border">·</span>
              <span>~{task.durationMin} min</span>
            </>
          )}
          {task.sourceId !== 'rest' && (
            <>
              <span className="text-border">·</span>
              <span className="truncate">{task.sourceName}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-4">{task.title}</h1>

        <p className="text-sm text-muted leading-relaxed mb-8">{task.whyItMatters}</p>

        {task.url && !task.noLink && !isRest && (
          <a
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-base"
          >
            Open {task.kind === 'video' ? 'video' : 'task'} →
          </a>
        )}

        {task.noLink && (
          <div className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-base cursor-default select-none">
            Open Coursera
          </div>
        )}

        {isRest && (
          <div className="text-sm text-muted italic">
            No task today. Close the tab.
          </div>
        )}

        {isDone && (
          <div className="mt-6 text-xs text-accent uppercase tracking-widest">
            ✓ Marked {progress?.status === 'skipped' ? 'skipped' : 'complete'}
          </div>
        )}
      </div>

      {!isDone && (
        <div className="mt-6 flex flex-col md:flex-row gap-2">
          <button
            onClick={handleComplete}
            className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-panel hover:border-accent hover:text-accent text-sm font-medium"
          >
            ✓ Mark complete
          </button>
          {!isRest && (
            <>
              <button
                onClick={onPostpone}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-panel hover:border-fg text-muted hover:text-fg text-sm"
              >
                → Postpone
              </button>
              <button
                onClick={onSkip}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-panel hover:border-fg text-muted hover:text-fg text-sm"
              >
                ⤵ Skip
              </button>
            </>
          )}
        </div>
      )}

      {showNote && (
        <div className="mt-6 rounded-lg border border-border bg-panel p-5">
          <label className="block text-xs uppercase tracking-widest text-muted mb-3">
            What's the key thing you learned? (1–2 lines, optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoFocus
            rows={3}
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm text-fg outline-none focus:border-accent resize-none"
            placeholder="The one thing worth remembering..."
          />
          <div className="mt-3 flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowNote(false);
                setNote('');
              }}
              className="px-3 py-1.5 text-sm text-muted hover:text-fg"
            >
              Cancel
            </button>
            <button
              onClick={saveAndAdvance}
              className="px-4 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-sm font-medium"
            >
              Save & advance →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
