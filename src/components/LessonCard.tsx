import { useState } from 'react';
import type { Lesson, LessonRecord } from '../lib/types';
import { formatMinutes } from '../lib/session';
import { QuizModal } from './QuizModal';

const ICON: Record<Lesson['kind'], string> = {
  video: '🎥',
  reading: '📖',
  exercise: '💻',
  review: '📝',
  project: '🛠',
};

const KIND_LABEL: Record<Lesson['kind'], string> = {
  video: 'Video',
  reading: 'Reading',
  exercise: 'Exercise',
  review: 'Review',
  project: 'Project',
};

type Props = {
  lesson: Lesson;
  record?: LessonRecord;
  oversize?: boolean;
  onComplete: (note: string | undefined) => void;
  onSkip: () => void;
  onPostpone: () => void;
};

export function LessonCard({ lesson, record, oversize, onComplete, onSkip, onPostpone }: Props) {
  const isDone = record?.status === 'done' || record?.status === 'skipped';
  const isPostponed = record?.status === 'postponed';
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState(record?.note ?? '');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleComplete = () => {
    setShowNote(true);
  };

  const save = () => {
    onComplete(note.trim() || undefined);
    setShowNote(false);
    if (lesson.quiz && lesson.quiz.length > 0) {
      setShowQuiz(true);
    }
  };

  const cancel = () => {
    setShowNote(false);
    setNote(record?.note ?? '');
  };

  return (
    <div
      className={
        'rounded-xl border bg-panel p-6 ' +
        (isDone ? 'border-border opacity-60' : 'border-border')
      }
    >
      <div className="flex items-center gap-3 text-xs text-muted mb-3 flex-wrap">
        <span className="text-base leading-none">{ICON[lesson.kind]}</span>
        <span className="uppercase tracking-widest">{KIND_LABEL[lesson.kind]}</span>
        <span className="text-border">·</span>
        <span>
          {lesson.durationEstimated ? '~' : ''}
          {formatMinutes(lesson.durationMin)}
          {lesson.durationEstimated ? ' est' : ''}
        </span>
        <span className="text-border">·</span>
        <span className="truncate">{lesson.sourceShort}</span>
        {isPostponed && (
          <>
            <span className="text-border">·</span>
            <span className="text-amber-400">postponed</span>
          </>
        )}
      </div>

      <h3 className="text-lg md:text-xl font-semibold leading-snug mb-2">{lesson.title}</h3>

      <p className="text-sm text-muted leading-relaxed mb-3">{lesson.whyItMatters}</p>

      {oversize && (
        <p className="text-xs text-amber-400/80 mb-3">
          This one alone is ~{formatMinutes(lesson.durationMin)} — longer than your session budget. Do what you can.
        </p>
      )}

      {lesson.extraNote && (
        <p className="text-xs text-muted italic mb-3">{lesson.extraNote}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {lesson.url && !lesson.noLink && (
          <a
            href={lesson.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm"
          >
            Open {lesson.kind === 'video' ? 'video' : lesson.kind === 'project' ? 'datasets' : 'task'} →
          </a>
        )}
        {lesson.noLink && (
          <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm cursor-default select-none">
            Open Coursera
          </div>
        )}
      </div>

      {!isDone && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleComplete}
            className="px-3 py-1.5 rounded-md border border-border hover:border-accent hover:text-accent text-sm"
          >
            ✓ Mark complete
          </button>
          <button
            onClick={onPostpone}
            className="px-3 py-1.5 rounded-md border border-border hover:border-fg text-muted hover:text-fg text-sm"
          >
            → Postpone
          </button>
          <button
            onClick={onSkip}
            className="px-3 py-1.5 rounded-md border border-border hover:border-fg text-muted hover:text-fg text-sm"
          >
            ⤵ Skip
          </button>
        </div>
      )}

      {isDone && (
        <div className="text-xs text-accent uppercase tracking-widest">
          ✓ {record?.status === 'skipped' ? 'Skipped' : 'Complete'}
          {record?.note && <span className="ml-3 normal-case tracking-normal text-muted">— note saved</span>}
        </div>
      )}

      {showNote && (
        <div className="mt-4 rounded-lg border border-border bg-bg p-4">
          <label className="block text-xs uppercase tracking-widest text-muted mb-3">
            {lesson.kind === 'project'
              ? 'Paste the link to your notebook / repo (optional)'
              : "What's the key thing you learned? (1–2 lines, optional)"}
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
            <button onClick={cancel} className="px-3 py-1.5 text-sm text-muted hover:text-fg">
              Cancel
            </button>
            <button
              onClick={save}
              className="px-4 py-1.5 rounded-md bg-accent hover:bg-accent-hover text-white text-sm font-medium"
            >
              Save & complete
            </button>
          </div>
        </div>
      )}

      {showQuiz && lesson.quiz && (
        <QuizModal
          questions={lesson.quiz}
          lessonTitle={lesson.title}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
